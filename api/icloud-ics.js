module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).send("Method not allowed.");
    return;
  }

  const rawUrl = String(req.query?.url || "").trim();
  if (!rawUrl) {
    res.status(400).send("Missing url query param.");
    return;
  }

  let normalizedUrl = rawUrl;
  if (normalizedUrl.startsWith("webcal://")) {
    normalizedUrl = `https://${normalizedUrl.slice("webcal://".length)}`;
  }

  if (!/^https?:\/\//i.test(normalizedUrl)) {
    res.status(400).send("URL must start with http://, https://, or webcal://.");
    return;
  }

  try {
    const response = await fetch(normalizedUrl, {
      method: "GET",
      headers: { Accept: "text/calendar,text/plain,*/*" },
    });
    if (!response.ok) {
      const detail = await response.text();
      res.status(response.status).send(detail || `Upstream error (${response.status}).`);
      return;
    }
    const ics = await response.text();
    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.status(200).send(ics);
  } catch (error) {
    res.status(502).send(error?.message || "Unable to fetch calendar URL.");
  }
};
