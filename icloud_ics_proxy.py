#!/usr/bin/env python3
import sys
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer


HOST = "127.0.0.1"
PORT = 8787


class IcsProxyHandler(BaseHTTPRequestHandler):
  def _send_cors(self):
    self.send_header("Access-Control-Allow-Origin", "*")
    self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
    self.send_header("Access-Control-Allow-Headers", "Content-Type")

  def do_OPTIONS(self):
    self.send_response(204)
    self._send_cors()
    self.end_headers()

  def do_GET(self):
    parsed = urllib.parse.urlparse(self.path)
    if parsed.path != "/ics":
      self.send_response(404)
      self._send_cors()
      self.end_headers()
      self.wfile.write(b"Not Found")
      return

    params = urllib.parse.parse_qs(parsed.query)
    target = params.get("url", [""])[0].strip()
    if not target:
      self.send_response(400)
      self._send_cors()
      self.end_headers()
      self.wfile.write(b"Missing 'url' query parameter.")
      return

    if target.startswith("webcal://"):
      target = "https://" + target[len("webcal://") :]

    if not (target.startswith("http://") or target.startswith("https://")):
      self.send_response(400)
      self._send_cors()
      self.end_headers()
      self.wfile.write(b"URL must start with http://, https://, or webcal://")
      return

    try:
      req = urllib.request.Request(
        target,
        headers={
          "User-Agent": "SessionMatchmakerICSProxy/1.0",
          "Accept": "text/calendar,text/plain,*/*",
        },
      )
      with urllib.request.urlopen(req, timeout=20) as res:
        body = res.read()
        content_type = res.headers.get("Content-Type", "text/calendar; charset=utf-8")

      self.send_response(200)
      self._send_cors()
      self.send_header("Content-Type", content_type)
      self.end_headers()
      self.wfile.write(body)
    except Exception as exc:
      msg = f"Fetch failed: {exc}".encode("utf-8", errors="replace")
      self.send_response(502)
      self._send_cors()
      self.send_header("Content-Type", "text/plain; charset=utf-8")
      self.end_headers()
      self.wfile.write(msg)

  def log_message(self, fmt, *args):
    sys.stdout.write("%s - - [%s] %s\n" % (self.address_string(), self.log_date_time_string(), fmt % args))


def main():
  server = ThreadingHTTPServer((HOST, PORT), IcsProxyHandler)
  print(f"iCloud ICS proxy running at http://{HOST}:{PORT}/ics?url=")
  server.serve_forever()


if __name__ == "__main__":
  main()
