#!/usr/bin/env python3
import argparse
import json
import sqlite3
import sys
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse


def now_ms() -> int:
  return int(time.time() * 1000)


class SongwriterStore:
  def __init__(self, db_path: str):
    self.db_path = db_path
    self._init_db()

  def _connect(self):
    conn = sqlite3.connect(self.db_path, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

  def _init_db(self):
    with self._connect() as conn:
      conn.execute(
        """
        CREATE TABLE IF NOT EXISTS songwriters (
          id TEXT PRIMARY KEY,
          payload TEXT NOT NULL,
          updated_at INTEGER NOT NULL
        )
        """
      )
      conn.execute(
        """
        CREATE TABLE IF NOT EXISTS meta (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL
        )
        """
      )
      conn.execute(
        """
        INSERT INTO meta(key, value)
        VALUES ('version', '0')
        ON CONFLICT(key) DO NOTHING
        """
      )
      conn.commit()

  def version(self) -> int:
    with self._connect() as conn:
      row = conn.execute("SELECT value FROM meta WHERE key='version'").fetchone()
      if not row:
        return 0
      try:
        return int(row["value"])
      except Exception:
        return 0

  def _bump_version(self, conn) -> int:
    next_version = now_ms()
    conn.execute(
      "INSERT INTO meta(key, value) VALUES ('version', ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
      (str(next_version),),
    )
    return next_version

  def list_songwriters(self):
    with self._connect() as conn:
      rows = conn.execute("SELECT payload FROM songwriters ORDER BY updated_at DESC").fetchall()
      items = [json.loads(row["payload"]) for row in rows]
      version = self.version()
      return {"items": items, "version": version}

  def upsert_songwriters(self, items):
    if not isinstance(items, list):
      return {"updated": 0, "version": self.version()}

    updated = 0
    with self._connect() as conn:
      for raw in items:
        if not isinstance(raw, dict):
          continue
        writer_id = str(raw.get("id") or "").strip()
        if not writer_id:
          continue

        incoming_updated_at = raw.get("updatedAt") or now_ms()
        try:
          incoming_updated_at = int(incoming_updated_at)
        except Exception:
          incoming_updated_at = now_ms()

        existing = conn.execute(
          "SELECT updated_at FROM songwriters WHERE id = ?",
          (writer_id,),
        ).fetchone()
        if existing and int(existing["updated_at"]) > incoming_updated_at:
          continue

        payload = dict(raw)
        payload["id"] = writer_id
        payload["updatedAt"] = incoming_updated_at
        payload.setdefault("createdAt", incoming_updated_at)

        conn.execute(
          """
          INSERT INTO songwriters(id, payload, updated_at)
          VALUES (?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            payload = excluded.payload,
            updated_at = excluded.updated_at
          """,
          (writer_id, json.dumps(payload), incoming_updated_at),
        )
        updated += 1

      version = self._bump_version(conn) if updated else self.version()
      conn.commit()

    return {"updated": updated, "version": version}


class Handler(BaseHTTPRequestHandler):
  store = None

  def _send_cors(self):
    self.send_header("Access-Control-Allow-Origin", "*")
    self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    self.send_header("Access-Control-Allow-Headers", "Content-Type")

  def _json(self, status, body):
    encoded = json.dumps(body).encode("utf-8")
    self.send_response(status)
    self._send_cors()
    self.send_header("Content-Type", "application/json; charset=utf-8")
    self.send_header("Content-Length", str(len(encoded)))
    self.end_headers()
    self.wfile.write(encoded)

  def _read_json(self):
    try:
      length = int(self.headers.get("Content-Length", "0"))
    except ValueError:
      length = 0
    raw = self.rfile.read(length) if length > 0 else b"{}"
    try:
      return json.loads(raw.decode("utf-8"))
    except Exception:
      return {}

  def do_OPTIONS(self):
    self.send_response(204)
    self._send_cors()
    self.end_headers()

  def do_GET(self):
    path = urlparse(self.path).path
    if path == "/api/health":
      self._json(200, {"ok": True, "service": "songwriter-shared-backend"})
      return
    if path == "/api/songwriters":
      self._json(200, Handler.store.list_songwriters())
      return
    if path == "/api/songwriters/version":
      self._json(200, {"version": Handler.store.version()})
      return
    self._json(404, {"ok": False, "error": "Not found"})

  def do_POST(self):
    path = urlparse(self.path).path
    if path == "/api/songwriters/upsert":
      payload = self._read_json()
      items = payload.get("items")
      if not isinstance(items, list):
        one = payload.get("item")
        items = [one] if isinstance(one, dict) else []
      result = Handler.store.upsert_songwriters(items)
      self._json(200, {"ok": True, **result})
      return
    self._json(404, {"ok": False, "error": "Not found"})

  def log_message(self, fmt, *args):
    sys.stdout.write("%s - - [%s] %s\n" % (self.address_string(), self.log_date_time_string(), fmt % args))


def main():
  parser = argparse.ArgumentParser(description="Shared Songwriter Backend")
  parser.add_argument("--host", default="0.0.0.0")
  parser.add_argument("--port", type=int, default=5051)
  parser.add_argument("--db", default="./songwriters_shared.db")
  args = parser.parse_args()

  Handler.store = SongwriterStore(args.db)
  server = ThreadingHTTPServer((args.host, args.port), Handler)
  print(f"Shared songwriter backend running on http://{args.host}:{args.port}")
  print("Endpoints: GET /api/health, GET /api/songwriters, POST /api/songwriters/upsert")
  server.serve_forever()


if __name__ == "__main__":
  main()
