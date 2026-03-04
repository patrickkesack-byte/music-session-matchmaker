const ALLOWED_SEEKING = ["topliner", "artist", "producer", "co-writer"];
const ALLOWED_TOPLINER_OPTIONS = [
  "male singer",
  "female singer",
  "rapper",
  "spoken-word",
  "melodic",
  "anthemic",
  "indie",
  "country",
  "pop",
  "kpop",
];
const ALLOWED_PRODUCER_OPTIONS = ["multi-instrumentalist"];
const ALLOWED_SCHEDULE_MODES = ["anytime", "specific", "range"];
const ALLOWED_PUBLISHED_SCOPE = ["all", "include", "only"];

const normalizeList = (values) =>
  Array.from(
    new Set(
      (Array.isArray(values) ? values : [])
        .map((x) => String(x || "").trim().toLowerCase())
        .filter(Boolean)
    )
  );

const normalizeRole = (value) => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "co producer" || normalized === "co-producer") return "producer";
  if (normalized === "spoken word") return "spoken-word";
  return normalized;
};

const sanitizeDate = (value) => {
  const raw = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : "";
};

const sanitizeParsed = (parsed, prompt) => {
  const seeking = normalizeList(parsed.seeking).map(normalizeRole).filter((x) => ALLOWED_SEEKING.includes(x));
  const toplinerOptions = normalizeList(parsed.toplinerOptions)
    .map(normalizeRole)
    .filter((x) => ALLOWED_TOPLINER_OPTIONS.includes(x));
  const producerOptions = normalizeList(parsed.producerOptions)
    .map(normalizeRole)
    .filter((x) => ALLOWED_PRODUCER_OPTIONS.includes(x));
  const scheduleMode = ALLOWED_SCHEDULE_MODES.includes(String(parsed.scheduleMode || "").toLowerCase())
    ? String(parsed.scheduleMode || "").toLowerCase()
    : "anytime";
  const publishedScope = ALLOWED_PUBLISHED_SCOPE.includes(String(parsed.publishedScope || "").toLowerCase())
    ? String(parsed.publishedScope || "").toLowerCase()
    : "all";

  return {
    brief: String(parsed.brief || "").trim() || String(prompt || "").trim(),
    location: String(parsed.location || "").trim() || "anywhere",
    scheduleMode,
    specificDate: scheduleMode === "specific" ? sanitizeDate(parsed.specificDate) : "",
    startDate: scheduleMode === "range" ? sanitizeDate(parsed.startDate) : "",
    endDate: scheduleMode === "range" ? sanitizeDate(parsed.endDate) : "",
    seeking,
    toplinerOptions,
    producerOptions,
    publishedScope,
  };
};

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "OPENAI_API_KEY not configured." });
    return;
  }

  const prompt = String(req.body?.prompt || "").trim();
  const timezone = String(req.body?.timezone || "America/Los_Angeles").trim();
  const nowIso = String(req.body?.nowIso || new Date().toISOString()).trim();

  if (!prompt) {
    res.status(400).json({ error: "Missing prompt." });
    return;
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const schema = {
    name: "pairing_constraints",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        brief: { type: "string" },
        location: { type: "string" },
        scheduleMode: { type: "string", enum: ALLOWED_SCHEDULE_MODES },
        specificDate: { type: "string" },
        startDate: { type: "string" },
        endDate: { type: "string" },
        publishedScope: { type: "string", enum: ALLOWED_PUBLISHED_SCOPE },
        seeking: { type: "array", items: { type: "string" } },
        toplinerOptions: { type: "array", items: { type: "string" } },
        producerOptions: { type: "array", items: { type: "string" } },
      },
      required: [
        "brief",
        "location",
        "scheduleMode",
        "specificDate",
        "startDate",
        "endDate",
        "publishedScope",
        "seeking",
        "toplinerOptions",
        "producerOptions",
      ],
    },
  };

  const system = [
    "You extract music session matchmaking constraints from plain-language prompts.",
    `Current datetime (ISO): ${nowIso}`,
    `User timezone: ${timezone}`,
    "Return strict JSON only.",
    "Roles allowed in seeking: topliner, artist, producer, co-writer.",
    "If prompt requests rapper/spoken-word as performer, keep seeking as topliner and add those in toplinerOptions.",
    "Topliner options allowed: male singer, female singer, rapper, spoken-word, melodic, anthemic, indie, country, pop, kpop.",
    "Producer options allowed: multi-instrumentalist.",
    "For date parsing:",
    "- If exact date requested, use scheduleMode=specific and specificDate in YYYY-MM-DD.",
    "- If a range is requested, use scheduleMode=range and fill startDate/endDate in YYYY-MM-DD.",
    "- If no date constraints, use scheduleMode=anytime.",
    "For published scope:",
    "- only if prompt says only/exclusively published writers.",
    "- include if prompt says include published writers.",
    "- else all.",
    "location should be city/remote/anywhere if available in prompt, otherwise anywhere.",
    "brief should summarize the creative direction/vibe/genre intent from prompt.",
  ].join("\n");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.1,
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ],
        response_format: {
          type: "json_schema",
          json_schema: schema,
        },
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      const detail = payload?.error?.message || `OpenAI request failed (${response.status}).`;
      res.status(response.status).json({ error: detail });
      return;
    }

    const content = payload?.choices?.[0]?.message?.content;
    if (!content) {
      res.status(502).json({ error: "OpenAI returned no structured output." });
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (_error) {
      res.status(502).json({ error: "OpenAI output was not valid JSON." });
      return;
    }

    res.status(200).json(sanitizeParsed(parsed, prompt));
  } catch (error) {
    res.status(502).json({ error: error?.message || "OpenAI pairing parse failed." });
  }
};
