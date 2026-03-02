const STORAGE_KEYS = {
  songwriters: "sessionSync.songwriters",
  sessions: "sessionSync.sessions",
  googleSettings: "sessionSync.googleSettings",
  sharedSettings: "sessionSync.sharedSettings",
  supabaseSettings: "sessionSync.supabaseSettings",
  scheduleRequests: "sessionSync.scheduleRequests",
  briefs: "sessionSync.briefs",
};

const MIN_FIT_SCORE = 40;
const GOOGLE_CAL_SCOPE =
  "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events";
const PAIRING_STATUS = {
  pending: "pending-approval",
  approved: "approved",
  declined: "declined",
  moved: "moved-to-schedule",
};
const PAIRING_RESULTS_PAGE_SIZE = 10;

const songwriterForm = document.getElementById("songwriter-form");
const sessionForm = document.getElementById("session-form");
const sessionLocationInput = document.getElementById("session-location");
const appShell = document.querySelector(".app-shell");
const authOpenButton = document.getElementById("auth-open");
const authLogoutButton = document.getElementById("auth-logout");
const authModal = document.getElementById("auth-modal");
const authCloseButton = document.getElementById("auth-close");
const authSignInButton = document.getElementById("auth-sign-in");
const authSignUpButton = document.getElementById("auth-sign-up");
const authEmailInput = document.getElementById("auth-email");
const authPasswordInput = document.getElementById("auth-password");
const authStatus = document.getElementById("auth-status");
const authUserEmail = document.getElementById("auth-user-email");

const songwriterStatus = document.getElementById("songwriter-status");
const sessionStatus = document.getElementById("session-status");
const sessionLocationStatus = document.getElementById("session-location-status");
const scheduleStatus = document.getElementById("schedule-status");
const pairingQueueStatus = document.getElementById("pairing-queue-status");
const pairingResultsCard = document.getElementById("pairing-results-card");

const sessionsList = document.getElementById("sessions-list");
const songwriterList = document.getElementById("songwriter-list");
const scheduleList = document.getElementById("schedule-list");
const checkAllAvailabilityButton = document.getElementById("check-all-availability");
const openPairingsList = document.getElementById("open-pairings-list");
const openPairingsCard = document.getElementById("open-pairings-card");

const writerSearchInput = document.getElementById("writer-search");
const toggleAllSongwritersButton = document.getElementById("toggle-all-songwriters");
const calendarWriterList = document.getElementById("calendar-writer-list");
const calendarEventsList = document.getElementById("calendar-events-list");
const calendarEventsStatus = document.getElementById("calendar-events-status");
const calendarEventsTitle = document.getElementById("calendar-events-title");
const refreshCalendarEventsButton = document.getElementById("refresh-calendar-events");
const calendarKeywordSearchInput = document.getElementById("calendar-keyword-search");
const runCalendarKeywordSearchButton = document.getElementById("run-calendar-keyword-search");
const generateCalendarKeywordReportButton = document.getElementById("generate-calendar-keyword-report");
const calendarSearchResults = document.getElementById("calendar-search-results");
const calendarReportPanel = document.getElementById("calendar-report-panel");
const calendarReportOutput = document.getElementById("calendar-report-output");
const downloadCalendarReportLink = document.getElementById("download-calendar-report");
const briefSearchInput = document.getElementById("brief-search");
const briefList = document.getElementById("brief-list");
const briefForm = document.getElementById("brief-form");
const briefStatus = document.getElementById("brief-status");
const briefTypeInput = document.getElementById("brief-type");
const briefNeedLevelInput = document.getElementById("brief-need-level");
const toggleAddBriefButton = document.getElementById("toggle-add-brief");
const clearBriefFormButton = document.getElementById("clear-brief-form");
const autoAssignBriefsButton = document.getElementById("auto-assign-briefs");

const toggleAddSongwriterButton = document.getElementById("toggle-add-songwriter");
const toggleBulkImportButton = document.getElementById("toggle-bulk-import");
const bulkImportTools = document.getElementById("bulk-import-tools");
const saveSongwriterButton = document.getElementById("save-songwriter");
const cancelEditButton = document.getElementById("cancel-edit");

const songwriterCsvInput = document.getElementById("songwriter-csv");
const importSongwritersButton = document.getElementById("import-songwriters");
const exportSongwritersButton = document.getElementById("export-songwriters");

const generateReportButton = document.getElementById("generate-report");
const refreshPairingButton = document.getElementById("refresh-pairing");
const refreshSessionBriefButton = document.getElementById("refresh-session-brief");
const seeMorePairingResultsButton = document.getElementById("see-more-pairing-results");

const scheduleModeInput = document.getElementById("schedule-mode");
const specificDateGroup = document.getElementById("specific-date-group");
const rangeDateGroup = document.getElementById("range-date-group");
const sessionDateSpecificInput = document.getElementById("session-date-specific");
const sessionDateStartInput = document.getElementById("session-date-start");
const sessionDateEndInput = document.getElementById("session-date-end");
const allowWeekendsInput = document.getElementById("allow-weekends");
const includePublishedInput = document.getElementById("include-published");
const publishedOnlyInput = document.getElementById("published-only");
const publishedScopeOptions = document.getElementById("published-scope-options");
const publishedSlotInline = document.getElementById("published-slot-inline");
const seekingInputs = Array.from(document.querySelectorAll('input[name="session-seeking"]'));
const publishedRoleMinInputs = Array.from(document.querySelectorAll('select[name="published-role-min"]'));
const briefSeekingInputs = Array.from(document.querySelectorAll('input[name="brief-seeking"]'));
const writerRoleInputs = Array.from(document.querySelectorAll('input[name="writer-role"]'));

const googleClientIdInput = document.getElementById("google-client-id");
const studioCalendarIdsInput = document.getElementById("studio-calendar-ids");
const icloudProxyUrlInput = document.getElementById("icloud-proxy-url");
const connectGoogleButton = document.getElementById("connect-google");
const disconnectGoogleButton = document.getElementById("disconnect-google");
const calendarStatus = document.getElementById("calendar-status");
const sharedApiUrlInput = document.getElementById("shared-api-url");
const sharedSyncStatus = document.getElementById("shared-sync-status");
const supabaseUrlInput = document.getElementById("supabase-url");
const supabaseAnonKeyInput = document.getElementById("supabase-anon-key");
const calendarMenuToggleButton = document.getElementById("calendar-menu-toggle");
const calendarMenuPanel = document.getElementById("calendar-menu-panel");
const calendarDropdown = document.querySelector(".calendar-dropdown");
const writerCalendarProviderInput = document.getElementById("writer-calendar-provider");
const writerCalendarIdInput = document.getElementById("writer-calendar-id");
const writerCalendarNameInput = document.getElementById("writer-calendar-name");
const writerGoogleCalendarTools = document.getElementById("writer-google-calendar-tools");
const loadSharedCalendarsButton = document.getElementById("load-shared-calendars");
const writerSharedCalendarSelect = document.getElementById("writer-shared-calendar-select");
const writerCalendarStatus = document.getElementById("writer-calendar-status");

const reportPanel = document.getElementById("report-panel");
const reportOutput = document.getElementById("report-output");
const downloadReportLink = document.getElementById("download-report");

const sessionTemplate = document.getElementById("session-template");
const candidateTemplate = document.getElementById("candidate-template");
const songwriterTemplate = document.getElementById("songwriter-template");
const scheduleTemplate = document.getElementById("schedule-template");
const openPairingTemplate = document.getElementById("open-pairing-template");
const briefTemplate = document.getElementById("brief-template");

const viewButtons = Array.from(document.querySelectorAll(".view-btn"));
const views = Object.fromEntries(
  ["pairing", "songwriters", "calendar", "schedule"]
    .map((key) => [key, document.getElementById(`${key}-view`)])
    .filter(([, el]) => Boolean(el))
);

let editingSongwriterId = null;
let inlineEditingWriterId = null;
let showAllSongwriters = false;
let latestRenderedSessionId = null;
let latestRenderedCandidates = [];
let latestRenderCycle = 0;
let showLatestPairingResults = true;
let visiblePairingResultsCount = PAIRING_RESULTS_PAGE_SIZE;
let activeCandidateFilterKey = "";
let isAddSongwriterFormOpen = false;
let isBulkImportOpen = false;
let isAddBriefOpen = false;
let selectedBriefForSessionId = null;
let selectedCalendarWriterId = null;
const writerCalendarEventsCache = new Map();
let lastCalendarKeywordSearch = "";
let lastCalendarKeywordSearchResults = [];
let lastCalendarKeywordSearchMeta = { scanned: 0, withCalendars: 0, matchedWriters: 0, skippedNoCalendar: 0 };
let lastCalendarKeywordSearchScopeLabel = "all published writers";

let googleTokenClient = null;
let googleAccessToken = "";
let googleTokenExpiryMs = 0;
let googleAuthPrompt = "consent";
let googleAutoReconnectAttempted = false;
let sharedGoogleCalendars = [];
let remoteSyncIntervalId = null;
let remoteSyncInFlight = false;
let lastRemoteSongwriterVersion = 0;
let remotePushTimeout = null;
let supabaseClient = null;
let supabaseUser = null;
let supabasePollIntervalId = null;
let supabaseSyncInFlight = false;
let lastSupabaseSyncMs = 0;
let supabasePushTimeout = null;
const ALL_CALENDAR_WRITERS_ID = "__all_published_writers__";

const STOP_WORDS = new Set([
  "the",
  "and",
  "with",
  "for",
  "that",
  "this",
  "from",
  "into",
  "your",
  "their",
  "our",
  "artist",
  "record",
  "track",
  "song",
  "session",
  "need",
  "needs",
  "looking",
  "want",
  "must",
  "have",
  "around",
  "style",
  "type",
  "very",
  "more",
  "less",
  "some",
  "high",
  "low",
]);

const PHRASE_TAG_MAP = [
  ["dance pop", "dance pop"],
  ["drum and bass", "drum and bass"],
  ["tech house", "tech house"],
  ["indie dance", "indie dance"],
  ["producer-writer", "producer-writer"],
  ["producer writer", "producer-writer"],
  ["los angeles", "los angeles"],
  ["new york", "new york"],
  ["week nights", "weeknights"],
  ["weeknights", "weeknights"],
  ["weekends", "weekends"],
  ["weekdays", "weekdays"],
  ["topliner", "topliner"],
  ["lyricist", "lyricist"],
  ["melody writer", "melody writer"],
  ["songwriter", "songwriter"],
  ["producer", "producer"],
  ["writer", "writer"],
  ["singer", "singer"],
  ["vocalist", "vocalist"],
  ["engineer", "engineer"],
  ["dj", "dj"],
  ["k-pop", "kpop"],
  ["kpop", "kpop"],
  ["r&b", "r&b"],
  ["techno", "techno"],
  ["house", "house"],
  ["edm", "edm"],
  ["dance", "dance"],
  ["electronic", "electronic"],
  ["remote", "remote"],
  ["london", "london"],
  ["nashville", "nashville"],
  ["croatia", "croatia"],
  ["brazil", "brazil"],
];

const DIRECT_TAG_MAP = new Set([
  "pop",
  "edm",
  "rap",
  "r&b",
  "rnb",
  "house",
  "techno",
  "trance",
  "drill",
  "trap",
  "kpop",
  "k-pop",
  "hip-hop",
  "hiphop",
  "indie",
  "dance",
  "afro",
  "afrobeat",
]);

const normalizeList = (text) =>
  String(text || "")
    .split(",")
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean);

const normalizeTagField = (text) =>
  String(text || "")
    .split(/[|,]/)
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean);

const unique = (arr) => Array.from(new Set(arr));

const SEEKING_OPTIONS = [
  "topliner",
  "artist",
  "producer",
  "co-producer",
  "co-writer",
  "multi-instrumentalist",
  "rapper",
  "spoken-word",
  "singer",
];

const normalizeRoles = (values) =>
  unique((values || []).map((x) => String(x || "").trim().toLowerCase()).filter((x) => SEEKING_OPTIONS.includes(x)));

const ROLE_SEARCH_EQUIVALENTS = {
  topliner: ["topliner", "singer"],
  singer: ["singer", "topliner"],
};

const normalizeCalendarIds = (text) =>
  String(text || "")
    .split(/[\n,]/)
    .map((x) => x.trim())
    .filter(Boolean);

const parseBoolean = (value) => {
  const v = String(value || "").trim().toLowerCase();
  return v === "true" || v === "yes" || v === "1" || v === "y";
};

const MAJOR_CITY_CLUSTERS = [
  {
    city: "los angeles",
    aliases: [
      "los angeles", "la", "l a", "west hollywood", "hollywood", "santa monica", "venice",
      "culver city", "pasadena", "burbank", "glendale", "beverly hills", "long beach",
      "orange county", "irvine", "anaheim", "newport beach",
    ],
  },
  {
    city: "new york",
    aliases: [
      "new york", "nyc", "manhattan", "brooklyn", "queens", "bronx", "staten island",
      "jersey city", "hoboken", "newark",
    ],
  },
  {
    city: "nashville",
    aliases: ["nashville", "franklin", "brentwood", "murfreesboro"],
  },
  {
    city: "london",
    aliases: ["london", "camden", "hackney", "islington", "shoreditch", "westminster"],
  },
  {
    city: "miami",
    aliases: ["miami", "miami beach", "fort lauderdale", "ft lauderdale"],
  },
  {
    city: "atlanta",
    aliases: ["atlanta", "decatur", "marietta", "alpharetta"],
  },
  {
    city: "chicago",
    aliases: ["chicago", "evanston", "oak park"],
  },
  {
    city: "dallas",
    aliases: ["dallas", "fort worth", "ft worth", "plano", "frisco"],
  },
  {
    city: "toronto",
    aliases: ["toronto", "mississauga", "brampton", "vaughan"],
  },
];

const normalizeLocationText = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ");

const locationAliasMatches = (normalizedLocation, alias) => {
  const location = normalizeLocationText(normalizedLocation);
  const aliasNorm = normalizeLocationText(alias);
  if (!location || !aliasNorm) return false;
  const haystack = ` ${location} `;
  const needle = ` ${aliasNorm} `;
  return haystack.includes(needle);
};

const getMajorCityCategory = (location) => {
  const normalized = normalizeLocationText(location);
  if (!normalized) return "";
  for (const cluster of MAJOR_CITY_CLUSTERS) {
    if (cluster.aliases.some((alias) => locationAliasMatches(normalized, alias))) return cluster.city;
  }
  return "";
};

const formatLocationLabel = (value) =>
  String(value || "")
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const isNeutralLocation = (location) =>
  ["anywhere", "any", "global"].includes(String(location || "").trim().toLowerCase());

const isRemoteLocation = (location) =>
  ["remote", "virtual", "online"].includes(String(location || "").trim().toLowerCase());

const writerMatchesSessionLocation = (writer, sessionLocation) => {
  const requestedRaw = normalizeLocationText(sessionLocation);
  if (!requestedRaw || isNeutralLocation(requestedRaw)) return true;

  const writerLocationRaw = normalizeLocationText(writer.location || "");
  const writerTags = (writer.tags || []).map((tag) => normalizeLocationText(tag));

  if (isRemoteLocation(requestedRaw)) {
    return (
      writerLocationRaw.includes("remote") ||
      writerTags.some((tag) => tag.includes("remote"))
    );
  }

  const requestedMajorCity = getMajorCityCategory(requestedRaw) || requestedRaw;
  const writerMajorCity = getMajorCityCategory(writerLocationRaw);

  if (writerMajorCity && writerMajorCity === requestedMajorCity) return true;
  if (writerLocationRaw.includes(requestedMajorCity)) return true;
  if (writerTags.includes(requestedMajorCity)) return true;

  return false;
};

const ensureLocationTag = (tags, location) => {
  const normalizedLocation = String(location || "").trim().toLowerCase();
  if (!normalizedLocation) return tags;
  if (isNeutralLocation(normalizedLocation)) return tags;
  const majorCity = getMajorCityCategory(normalizedLocation);
  const locationTag = majorCity || normalizedLocation;
  if (tags.includes(locationTag)) return tags;
  return [...tags, locationTag];
};

const looksLikeEmail = (value) => /.+@.+\..+/.test(String(value || "").trim());

const cleanPhone = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const keepPlus = raw.startsWith("+");
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return "";
  return keepPlus ? `+${digits}` : digits;
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isIcloudLikeCalendarUrl = (value) => {
  const v = String(value || "").trim().toLowerCase();
  return v.startsWith("http://") || v.startsWith("https://") || v.startsWith("webcal://");
};

const setCalendarStatus = (message, isError = false) => {
  calendarStatus.textContent = message;
  calendarStatus.classList.toggle("error", isError);
};

const setSharedSyncStatus = (message, isError = false) => {
  if (!sharedSyncStatus) return;
  sharedSyncStatus.textContent = message;
  sharedSyncStatus.classList.toggle("error", isError);
};

const normalizeApiBaseUrl = (value) => String(value || "").trim().replace(/\/+$/, "");

const loadSharedSettings = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.sharedSettings);
  if (!raw) return { apiBaseUrl: "" };
  try {
    const parsed = JSON.parse(raw);
    return { apiBaseUrl: normalizeApiBaseUrl(parsed.apiBaseUrl || "") };
  } catch (_error) {
    return { apiBaseUrl: "" };
  }
};

const saveSharedSettings = (settings) => {
  localStorage.setItem(STORAGE_KEYS.sharedSettings, JSON.stringify(settings));
};

const getSharedApiBaseUrl = () => loadSharedSettings().apiBaseUrl || "";

const setAuthStatus = (message, isError = false) => {
  if (!authStatus) return;
  authStatus.textContent = message;
  authStatus.classList.toggle("error", isError);
};

const setAuthModalOpen = (isOpen) => {
  if (!authModal) return;
  authModal.classList.toggle("hidden", !isOpen);
};

const DEFAULT_SUPABASE_SETTINGS = {
  url: String(supabaseUrlInput?.value || "").trim(),
  anonKey: String(supabaseAnonKeyInput?.value || "").trim(),
};

const loadSupabaseSettings = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.supabaseSettings);
  if (!raw) return { ...DEFAULT_SUPABASE_SETTINGS };
  try {
    const parsed = JSON.parse(raw);
    return {
      url: String(parsed.url || DEFAULT_SUPABASE_SETTINGS.url).trim(),
      anonKey: String(parsed.anonKey || DEFAULT_SUPABASE_SETTINGS.anonKey).trim(),
    };
  } catch (_error) {
    return { ...DEFAULT_SUPABASE_SETTINGS };
  }
};

const saveSupabaseSettings = (settings) => {
  localStorage.setItem(STORAGE_KEYS.supabaseSettings, JSON.stringify(settings));
};

const hydrateSupabaseSettingsUi = () => {
  const settings = loadSupabaseSettings();
  if (supabaseUrlInput) supabaseUrlInput.value = settings.url;
  if (supabaseAnonKeyInput) supabaseAnonKeyInput.value = settings.anonKey;
};

const persistSupabaseSettingsFromUi = () => {
  const settings = {
    url: String(supabaseUrlInput?.value || "").trim(),
    anonKey: String(supabaseAnonKeyInput?.value || "").trim(),
  };
  saveSupabaseSettings(settings);
  return settings;
};

const setAuthUi = () => {
  const loggedIn = Boolean(supabaseUser);
  if (authOpenButton) authOpenButton.classList.toggle("hidden", loggedIn);
  if (authLogoutButton) authLogoutButton.classList.toggle("hidden", !loggedIn);
  if (authUserEmail) authUserEmail.textContent = loggedIn ? supabaseUser.email || "Signed in" : "";
  if (document.body) {
    document.body.classList.toggle("auth-required", !loggedIn);
  }
  if (appShell) {
    appShell.setAttribute("aria-hidden", loggedIn ? "false" : "true");
  }
  if (authCloseButton) {
    authCloseButton.classList.toggle("hidden", !loggedIn);
  }
  setAuthModalOpen(!loggedIn);
  if (!loggedIn) {
    setAuthStatus("Sign in required.", true);
  } else {
    setAuthStatus("");
  }
};

const setScheduleStatus = (message, isError = false) => {
  if (!scheduleStatus) return;
  scheduleStatus.textContent = message;
  scheduleStatus.classList.toggle("error", isError);
};

const setPairingQueueStatus = (message, isError = false) => {
  if (!pairingQueueStatus) return;
  pairingQueueStatus.textContent = message;
  pairingQueueStatus.classList.toggle("error", isError);
};

const setWriterCalendarStatus = (message, isError = false) => {
  if (!writerCalendarStatus) return;
  writerCalendarStatus.textContent = message;
  writerCalendarStatus.classList.toggle("error", isError);
};

const setBriefStatus = (message, isError = false) => {
  if (!briefStatus) return;
  briefStatus.textContent = message;
  briefStatus.classList.toggle("error", isError);
};

const setAddSongwriterFormOpen = (isOpen) => {
  isAddSongwriterFormOpen = Boolean(isOpen);
  songwriterForm.classList.toggle("hidden", !isAddSongwriterFormOpen);
  if (toggleAddSongwriterButton) {
    toggleAddSongwriterButton.classList.toggle("active", isAddSongwriterFormOpen);
    toggleAddSongwriterButton.setAttribute("aria-expanded", isAddSongwriterFormOpen ? "true" : "false");
  }
};

const setBulkImportOpen = (isOpen) => {
  isBulkImportOpen = Boolean(isOpen);
  if (bulkImportTools) {
    bulkImportTools.classList.toggle("hidden", !isBulkImportOpen);
  }
  if (toggleBulkImportButton) {
    toggleBulkImportButton.classList.toggle("active", isBulkImportOpen);
    toggleBulkImportButton.setAttribute("aria-expanded", isBulkImportOpen ? "true" : "false");
  }
};

const setNewPairingOpen = () => {
  if (sessionForm) sessionForm.classList.remove("hidden");
};

const setAddBriefOpen = (isOpen) => {
  isAddBriefOpen = Boolean(isOpen);
  if (briefForm) briefForm.classList.toggle("hidden", !isAddBriefOpen);
  if (toggleAddBriefButton) {
    toggleAddBriefButton.classList.toggle("active", isAddBriefOpen);
    toggleAddBriefButton.setAttribute("aria-expanded", isAddBriefOpen ? "true" : "false");
  }
};

const setCalendarMenuOpen = (isOpen) => {
  if (!calendarMenuPanel || !calendarMenuToggleButton) return;
  calendarMenuPanel.classList.toggle("hidden", !isOpen);
  calendarMenuToggleButton.classList.toggle("active", isOpen);
  calendarMenuToggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
};

const setWriterCalendarProviderUi = () => {
  const provider = writerCalendarProviderInput?.value || "icloud";
  if (writerGoogleCalendarTools) {
    writerGoogleCalendarTools.classList.toggle("hidden", provider !== "google");
  }
  if (provider !== "google") {
    setWriterCalendarStatus("");
  }
};

const normalizeSongwriterRecord = (writer) => {
  const createdAt = Number(writer?.createdAt) || Date.now();
  const updatedAt = Number(writer?.updatedAt) || createdAt;
  return {
    ...writer,
    createdAt,
    updatedAt,
  };
};

const getSharedApiUrl = (path) => {
  const base = getSharedApiBaseUrl();
  if (!base) return "";
  return `${base}${path}`;
};

const remoteSongwriterUpsert = async (items) => {
  const endpoint = getSharedApiUrl("/api/songwriters/upsert");
  if (!endpoint || !Array.isArray(items) || !items.length) return null;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) {
    throw new Error(`Shared sync failed (${res.status}).`);
  }
  const payload = await res.json();
  if (payload?.version) lastRemoteSongwriterVersion = Math.max(lastRemoteSongwriterVersion, Number(payload.version) || 0);
  return payload;
};

const queueRemoteSongwriterPush = (songwriters) => {
  if (!getSharedApiBaseUrl()) return;
  if (remotePushTimeout) clearTimeout(remotePushTimeout);
  const snapshot = (songwriters || []).map(normalizeSongwriterRecord);
  remotePushTimeout = setTimeout(async () => {
    remotePushTimeout = null;
    try {
      await remoteSongwriterUpsert(snapshot);
      setSharedSyncStatus("Shared sync active.");
    } catch (error) {
      setSharedSyncStatus(error.message || "Shared sync failed.", true);
    }
  }, 220);
};

const saveSongwriters = (songwriters, options = {}) => {
  const normalized = (songwriters || []).map(normalizeSongwriterRecord);
  localStorage.setItem(STORAGE_KEYS.songwriters, JSON.stringify(normalized));
  writerCalendarEventsCache.clear();
  if (!options.skipSupabase) {
    queueSupabaseSongwriterPush(normalized);
  }
  if (!options.skipRemote && !supabaseUser) {
    queueRemoteSongwriterPush(normalized);
  }
};

const loadSongwriters = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.songwriters);
  const list = raw ? JSON.parse(raw) : [];
  let changed = false;

  const normalized = list.map((writer) => {
    let next = normalizeSongwriterRecord(writer);

    if (!next.bio || !next.bio.trim()) {
      changed = true;
      next = { ...next, bio: "Bio pending update." };
    }
    if (typeof next.published !== "boolean") {
      changed = true;
      next = { ...next, published: false };
    }
    if (typeof next.calendarId !== "string") {
      changed = true;
      next = { ...next, calendarId: "" };
    }
    if (typeof next.calendarName !== "string") {
      changed = true;
      next = { ...next, calendarName: "" };
    }
    if (typeof next.roster !== "string") {
      changed = true;
      next = { ...next, roster: "" };
    }
    const normalizedRoles = Array.isArray(next.roles)
      ? normalizeRoles(next.roles)
      : normalizeRoles((next.tags || []).filter((tag) => SEEKING_OPTIONS.includes(tag)));
    const forceCoWriterNames = new Set(["brieanna grace", "benni ola"]);
    const normalizedName = String(next.name || "").trim().toLowerCase();
    const withOverrides = forceCoWriterNames.has(normalizedName)
      ? normalizeRoles([...normalizedRoles, "co-writer"])
      : normalizedRoles;

    if (JSON.stringify(withOverrides) !== JSON.stringify(next.roles || [])) {
      changed = true;
      next = { ...next, roles: withOverrides };
    }
    if (!["google", "icloud"].includes(next.calendarProvider)) {
      changed = true;
      next = { ...next, calendarProvider: "icloud" };
    }
    if (next.calendarProvider === "google" && isIcloudLikeCalendarUrl(next.calendarId)) {
      changed = true;
      next = { ...next, calendarProvider: "icloud" };
    }
    if (!["email", "text"].includes(next.preferredContact)) {
      changed = true;
      next = { ...next, preferredContact: "email" };
    }
    const withLocationTag = ensureLocationTag(Array.isArray(next.tags) ? next.tags : [], next.location || "");
    if (JSON.stringify(withLocationTag) !== JSON.stringify(next.tags || [])) {
      changed = true;
      next = { ...next, tags: withLocationTag };
    }

    return next;
  });

  if (changed) saveSongwriters(normalized, { skipRemote: true, skipSupabase: true });
  return normalized;
};

const loadBriefs = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.briefs);
  const list = raw ? JSON.parse(raw) : [];
  return list.map((brief) => ({
    ...brief,
    seeking: normalizeRoles(brief.seeking || []),
    requiredTags: Array.isArray(brief.requiredTags) ? brief.requiredTags : [],
    status: brief.status || "open",
    briefType: brief.briefType || "hybrid",
    needLevel: brief.needLevel || "medium",
    plan: brief.plan && typeof brief.plan === "object" ? brief.plan : null,
    assignedSessionId: brief.assignedSessionId || "",
    createdSessionId: brief.createdSessionId || "",
    createdAt: brief.createdAt || Date.now(),
  }));
};

const saveBriefs = (briefs) => {
  localStorage.setItem(STORAGE_KEYS.briefs, JSON.stringify(briefs));
};

const loadSessions = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.sessions);
  const list = raw ? JSON.parse(raw) : [];
  let changed = false;

  const normalized = list.map((session) => {
    let next = session;
    if (!next.status) {
      changed = true;
      next = { ...next, status: PAIRING_STATUS.pending };
    }
    if (!Array.isArray(next.auditTrail)) {
      changed = true;
      next = { ...next, auditTrail: [] };
    }
    if (typeof next.movedToScheduleAt !== "number" && next.movedToScheduleAt !== null) {
      changed = true;
      next = { ...next, movedToScheduleAt: null };
    }
    if (!Array.isArray(next.candidateWriterIds)) {
      changed = true;
      next = { ...next, candidateWriterIds: [] };
    }
    if (typeof next.includePublished !== "boolean") {
      changed = true;
      next = { ...next, includePublished: false };
    }
    if (typeof next.publishedOnly !== "boolean") {
      changed = true;
      next = { ...next, publishedOnly: false };
    }
    const normalizedPublishedRoleMinimums = normalizePublishedRoleMinimums(next.publishedRoleMinimums);
    if (JSON.stringify(normalizedPublishedRoleMinimums) !== JSON.stringify(next.publishedRoleMinimums || {})) {
      changed = true;
      next = { ...next, publishedRoleMinimums: normalizedPublishedRoleMinimums };
    }
    return next;
  });

  if (changed) saveSessions(normalized);
  return normalized;
};

const saveSessions = (sessions) => {
  localStorage.setItem(STORAGE_KEYS.sessions, JSON.stringify(sessions));
};

const appendSessionAudit = (session, message) => [
  ...(session.auditTrail || []),
  { at: Date.now(), message },
];

const updateSession = (sessionId, updater) => {
  const sessions = loadSessions();
  const idx = sessions.findIndex((s) => s.id === sessionId);
  if (idx === -1) return null;
  const updated = updater(sessions[idx]);
  sessions[idx] = updated;
  saveSessions(sessions);
  return updated;
};

const getOpenPairings = () =>
  loadSessions()
    .filter(
      (s) =>
        !s.movedToScheduleAt &&
        (s.status === PAIRING_STATUS.pending || s.status === PAIRING_STATUS.approved)
    )
    .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

const loadScheduleRequests = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.scheduleRequests);
  const list = raw ? JSON.parse(raw) : [];
  return list.map((request) => ({
    ...request,
    availabilityStatus: request.availabilityStatus || "not-checked",
    availabilitySummary: request.availabilitySummary || "Not checked yet.",
    availabilityCheckedAt: request.availabilityCheckedAt || null,
    availabilityFirstDate: request.availabilityFirstDate || "",
    calendarEventId: request.calendarEventId || "",
    calendarEventLink: request.calendarEventLink || "",
    calendarEventCreatedAt: request.calendarEventCreatedAt || null,
  }));
};

const saveScheduleRequests = (requests) => {
  localStorage.setItem(STORAGE_KEYS.scheduleRequests, JSON.stringify(requests));
};

const loadGoogleSettings = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.googleSettings);
  if (!raw) return { clientId: "", studioCalendarIds: [], icloudProxyUrl: "" };
  try {
    const parsed = JSON.parse(raw);
    return {
      clientId: String(parsed.clientId || "").trim(),
      studioCalendarIds: Array.isArray(parsed.studioCalendarIds)
        ? parsed.studioCalendarIds.map((x) => String(x).trim()).filter(Boolean)
        : [],
      icloudProxyUrl: String(parsed.icloudProxyUrl || "").trim(),
    };
  } catch (_error) {
    return { clientId: "", studioCalendarIds: [], icloudProxyUrl: "" };
  }
};

const saveGoogleSettings = (settings) => {
  localStorage.setItem(STORAGE_KEYS.googleSettings, JSON.stringify(settings));
};

const hydrateGoogleSettingsUi = () => {
  const settings = loadGoogleSettings();
  if (googleClientIdInput) googleClientIdInput.value = settings.clientId;
  if (studioCalendarIdsInput) studioCalendarIdsInput.value = settings.studioCalendarIds.join(", ");
  if (icloudProxyUrlInput) icloudProxyUrlInput.value = settings.icloudProxyUrl || "";
};

const persistGoogleSettingsFromUi = () => {
  const settings = {
    clientId: googleClientIdInput?.value?.trim() || "",
    studioCalendarIds: normalizeCalendarIds(studioCalendarIdsInput?.value || ""),
    icloudProxyUrl: icloudProxyUrlInput?.value?.trim() || "",
  };
  saveGoogleSettings(settings);
  return settings;
};

const hydrateSharedSettingsUi = () => {
  const settings = loadSharedSettings();
  if (sharedApiUrlInput) sharedApiUrlInput.value = settings.apiBaseUrl || "";
};

const persistSharedSettingsFromUi = () => {
  const settings = {
    apiBaseUrl: normalizeApiBaseUrl(sharedApiUrlInput?.value || ""),
  };
  saveSharedSettings(settings);
  return settings;
};

const mergeSongwritersByFreshness = (localItems, remoteItems) => {
  const mergedById = new Map();
  (localItems || []).forEach((writer) => {
    if (!writer?.id) return;
    mergedById.set(writer.id, normalizeSongwriterRecord(writer));
  });
  (remoteItems || []).forEach((writer) => {
    if (!writer?.id) return;
    const incoming = normalizeSongwriterRecord(writer);
    const existing = mergedById.get(incoming.id);
    if (!existing || incoming.updatedAt >= existing.updatedAt) {
      mergedById.set(incoming.id, incoming);
    }
  });
  return Array.from(mergedById.values());
};

const syncSongwritersFromRemote = async () => {
  const endpoint = getSharedApiUrl("/api/songwriters");
  if (!endpoint || remoteSyncInFlight) return;
  remoteSyncInFlight = true;
  try {
    const res = await fetch(endpoint, { method: "GET" });
    if (!res.ok) throw new Error(`Shared sync unavailable (${res.status}).`);
    const payload = await res.json();
    const remoteItems = Array.isArray(payload?.items) ? payload.items : [];
    const remoteVersion = Number(payload?.version) || 0;
    if (remoteVersion > lastRemoteSongwriterVersion) {
      lastRemoteSongwriterVersion = remoteVersion;
      const localItems = loadSongwriters();
      const merged = mergeSongwritersByFreshness(localItems, remoteItems);
      const before = JSON.stringify(localItems);
      const after = JSON.stringify(merged);
      if (before !== after) {
        saveSongwriters(merged, { skipRemote: true });
        renderSongwriters();
        renderLatestSessionResult();
        renderCalendarWriterList();
      }
    }
    setSharedSyncStatus("Shared sync active.");
  } catch (error) {
    setSharedSyncStatus(error.message || "Shared sync unavailable.", true);
  } finally {
    remoteSyncInFlight = false;
  }
};

const startRemoteSongwriterSync = () => {
  if (remoteSyncIntervalId) {
    clearInterval(remoteSyncIntervalId);
    remoteSyncIntervalId = null;
  }
  if (!getSharedApiBaseUrl() || supabaseUser) {
    setSharedSyncStatus("");
    return;
  }
  syncSongwritersFromRemote();
  remoteSyncIntervalId = setInterval(() => {
    syncSongwritersFromRemote();
  }, 8000);
};

const stopSupabasePolling = () => {
  if (supabasePollIntervalId) {
    clearInterval(supabasePollIntervalId);
    supabasePollIntervalId = null;
  }
};

const canUseSupabase = () =>
  Boolean(supabaseClient && supabaseUser);

const mergeSongwritersForSupabase = (localItems, remoteItems) => {
  const mergedById = new Map();
  (localItems || []).forEach((writer) => {
    if (!writer?.id) return;
    mergedById.set(writer.id, normalizeSongwriterRecord(writer));
  });
  (remoteItems || []).forEach((writer) => {
    if (!writer?.id) return;
    const existing = mergedById.get(writer.id);
    const incoming = normalizeSongwriterRecord(writer);
    if (!existing || incoming.updatedAt >= existing.updatedAt) {
      mergedById.set(writer.id, incoming);
    }
  });
  return Array.from(mergedById.values());
};

const pullSongwritersFromSupabase = async () => {
  if (!canUseSupabase() || supabaseSyncInFlight) return;
  supabaseSyncInFlight = true;
  try {
    const { data, error } = await supabaseClient
      .from("songwriters")
      .select("id,data,updated_at")
      .eq("owner_id", supabaseUser.id);
    if (error) throw error;
    const remoteItems = (data || [])
      .map((row) => normalizeSongwriterRecord({ ...(row.data || {}), id: row.id, updatedAt: row.updated_at || Date.now() }));
    const localItems = loadSongwriters();
    const merged = mergeSongwritersForSupabase(localItems, remoteItems);
    if (JSON.stringify(localItems) !== JSON.stringify(merged)) {
      saveSongwriters(merged, { skipRemote: true, skipSupabase: true });
      renderSongwriters();
      renderLatestSessionResult();
      renderCalendarWriterList();
    }
    lastSupabaseSyncMs = Date.now();
    setSharedSyncStatus("Supabase sync active.");
  } catch (error) {
    setSharedSyncStatus(error.message || "Supabase sync failed.", true);
  } finally {
    supabaseSyncInFlight = false;
  }
};

const pushSongwritersToSupabase = async (items) => {
  if (!canUseSupabase()) return;
  const rows = (items || []).map((writer) => {
    const record = normalizeSongwriterRecord(writer);
    return {
      owner_id: supabaseUser.id,
      id: record.id,
      data: record,
      updated_at: record.updatedAt,
    };
  });
  if (!rows.length) return;
  const { error } = await supabaseClient
    .from("songwriters")
    .upsert(rows, { onConflict: "owner_id,id" });
  if (error) throw error;
};

const queueSupabaseSongwriterPush = (songwriters) => {
  if (!canUseSupabase()) return;
  if (supabasePushTimeout) clearTimeout(supabasePushTimeout);
  const snapshot = (songwriters || []).map(normalizeSongwriterRecord);
  supabasePushTimeout = setTimeout(async () => {
    supabasePushTimeout = null;
    try {
      await pushSongwritersToSupabase(snapshot);
      setSharedSyncStatus("Supabase sync active.");
    } catch (error) {
      setSharedSyncStatus(error.message || "Supabase sync failed.", true);
    }
  }, 220);
};

const startSupabasePolling = () => {
  stopSupabasePolling();
  if (!canUseSupabase()) return;
  pullSongwritersFromSupabase();
  supabasePollIntervalId = setInterval(() => {
    pullSongwritersFromSupabase();
  }, 8000);
};

const initSupabaseClient = async () => {
  const settings = loadSupabaseSettings();
  if (!settings.url || !settings.anonKey || !window.supabase?.createClient) {
    supabaseClient = null;
    supabaseUser = null;
    setAuthUi();
    stopSupabasePolling();
    startRemoteSongwriterSync();
    return;
  }
  try {
    supabaseClient = window.supabase.createClient(settings.url, settings.anonKey);
    const { data } = await supabaseClient.auth.getSession();
    supabaseUser = data?.session?.user || null;
    setAuthUi();
    if (supabaseUser) {
      stopSupabasePolling();
      startSupabasePolling();
    } else {
      startRemoteSongwriterSync();
    }
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      supabaseUser = session?.user || null;
      setAuthUi();
      if (supabaseUser) {
        stopSupabasePolling();
        startSupabasePolling();
      } else {
        stopSupabasePolling();
        startRemoteSongwriterSync();
      }
    });
  } catch (error) {
    supabaseClient = null;
    supabaseUser = null;
    setAuthUi();
    setSharedSyncStatus(error.message || "Supabase init failed.", true);
  }
};

const hasLiveGoogleToken = () => {
  if (!googleAccessToken) return false;
  return Date.now() < googleTokenExpiryMs;
};

const ensureGoogleTokenClient = () => {
  const clientId = googleClientIdInput.value.trim();
  if (!clientId) {
    setCalendarStatus("Add your Google OAuth Client ID first.", true);
    return false;
  }
  if (!window.google?.accounts?.oauth2) {
    setCalendarStatus("Google OAuth library did not load.", true);
    return false;
  }

  googleTokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: GOOGLE_CAL_SCOPE,
    callback: (tokenResponse) => {
      if (tokenResponse?.error) {
        if (googleAuthPrompt === "") {
          setCalendarStatus("Google Calendar not connected.");
        } else {
          setCalendarStatus(`Google connection failed: ${tokenResponse.error}`, true);
        }
        return;
      }
      googleAccessToken = tokenResponse.access_token || "";
      googleTokenExpiryMs = Date.now() + Number(tokenResponse.expires_in || 0) * 1000;
      setCalendarStatus("Google Calendar connected.");
    },
  });

  return true;
};

const connectGoogleCalendar = () => {
  const settings = persistGoogleSettingsFromUi();
  if (!settings.clientId) {
    setCalendarStatus("Add your Google OAuth Client ID first.", true);
    return;
  }
  if (!ensureGoogleTokenClient()) return;
  googleAuthPrompt = "consent";
  googleTokenClient.requestAccessToken({ prompt: "consent" });
};

const disconnectGoogleCalendar = () => {
  if (googleAccessToken && window.google?.accounts?.oauth2?.revoke) {
    window.google.accounts.oauth2.revoke(googleAccessToken, () => {});
  }
  googleAccessToken = "";
  googleTokenExpiryMs = 0;
  setCalendarStatus("Google Calendar disconnected.");
};

const tryAutoReconnectGoogleCalendar = () => {
  if (googleAutoReconnectAttempted) return;
  googleAutoReconnectAttempted = true;

  const settings = loadGoogleSettings();
  if (!settings.clientId) {
    setCalendarStatus("iCloud mode active.");
    return;
  }
  if (!ensureGoogleTokenClient()) return;

  googleAuthPrompt = "";
  googleTokenClient.requestAccessToken({ prompt: "" });
};

const fetchFreeBusy = async (calendarIds, timeMin, timeMax) => {
  const response = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin,
      timeMax,
      items: calendarIds.map((id) => ({ id })),
    }),
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      googleAccessToken = "";
      googleTokenExpiryMs = 0;
    }
    throw new Error(`Google free/busy failed (${response.status}).`);
  }

  return response.json();
};

const fetchSharedGoogleCalendars = async () => {
  if (!hasLiveGoogleToken()) {
    throw new Error("Connect Google Calendar first.");
  }

  const calendars = [];
  let pageToken = "";

  do {
    const url = new URL("https://www.googleapis.com/calendar/v3/users/me/calendarList");
    url.searchParams.set("maxResults", "250");
    url.searchParams.set("showHidden", "false");
    url.searchParams.set("minAccessRole", "reader");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        googleAccessToken = "";
        googleTokenExpiryMs = 0;
      }
      throw new Error(`Calendar list failed (${response.status}).`);
    }

    const data = await response.json();
    const items = Array.isArray(data.items) ? data.items : [];
    items.forEach((item) => {
      const id = String(item.id || "").trim();
      const name = String(item.summaryOverride || item.summary || "").trim();
      if (!id || !name) return;
      calendars.push({ id, name });
    });

    pageToken = String(data.nextPageToken || "").trim();
  } while (pageToken);

  return calendars;
};

const populateWriterSharedCalendars = (calendars) => {
  if (!writerSharedCalendarSelect) return;
  writerSharedCalendarSelect.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "select a shared calendar";
  writerSharedCalendarSelect.append(placeholderOption);
  writerSharedCalendarSelect.classList.add("placeholder");

  calendars.forEach((cal) => {
    const option = document.createElement("option");
    option.value = cal.id;
    option.textContent = cal.name;
    writerSharedCalendarSelect.append(option);
  });

  const currentId = writerCalendarIdInput?.value || "";
  if (currentId && calendars.some((cal) => cal.id === currentId)) {
    writerSharedCalendarSelect.value = currentId;
    writerSharedCalendarSelect.classList.remove("placeholder");
  }
};

const normalizeIcsUrl = (url) => {
  const raw = String(url || "")
    .trim()
    .replace(/^["']+|["']+$/g, "");
  if (!raw) return "";
  if (raw.startsWith("webcal://")) return `https://${raw.slice("webcal://".length)}`;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  if (/^[\w.-]+\.icloud\.com\//i.test(raw)) return `https://${raw}`;
  return raw;
};

const buildProxyUrl = (proxy, targetUrl) => {
  if (!proxy) return targetUrl;
  if (proxy.includes("{url}")) return proxy.replace("{url}", encodeURIComponent(targetUrl));
  if (proxy.endsWith("=")) return `${proxy}${encodeURIComponent(targetUrl)}`;
  return `${proxy}${proxy.includes("?") ? "&" : "?"}url=${encodeURIComponent(targetUrl)}`;
};

const fetchIcloudIcsText = async (icsUrl) => {
  const targetUrl = normalizeIcsUrl(icsUrl);
  if (!targetUrl) throw new Error("Missing iCloud ICS URL.");

  const settings = loadGoogleSettings();
  const fetchUrl = buildProxyUrl(settings.icloudProxyUrl, targetUrl);
  let response;
  try {
    response = await fetch(fetchUrl, { method: "GET" });
  } catch (_error) {
    throw new Error(
      "Unable to fetch iCloud calendar from browser. Set iCloud ICS Proxy URL (example: http://localhost:8787/ics?url=)."
    );
  }
  if (!response.ok) {
    let detail = "";
    try {
      detail = (await response.text()).trim();
    } catch (_error) {
      detail = "";
    }
    throw new Error(
      `iCloud calendar fetch failed (${response.status})${detail ? `: ${detail}` : ""}.`
    );
  }
  return response.text();
};

const unfoldIcsLines = (icsText) => {
  const lines = String(icsText || "").replace(/\r\n/g, "\n").split("\n");
  const unfolded = [];
  lines.forEach((line) => {
    if (!line) return;
    if ((line.startsWith(" ") || line.startsWith("\t")) && unfolded.length) {
      unfolded[unfolded.length - 1] += line.trim();
      return;
    }
    unfolded.push(line.trim());
  });
  return unfolded;
};

const parseIcsDateValue = (value) => {
  const v = String(value || "").trim();
  if (!v) return null;
  if (/^\d{8}$/.test(v)) {
    const y = Number(v.slice(0, 4));
    const m = Number(v.slice(4, 6)) - 1;
    const d = Number(v.slice(6, 8));
    return new Date(y, m, d, 0, 0, 0, 0);
  }
  if (/^\d{8}T\d{6}Z$/.test(v)) {
    const y = Number(v.slice(0, 4));
    const m = Number(v.slice(4, 6)) - 1;
    const d = Number(v.slice(6, 8));
    const hh = Number(v.slice(9, 11));
    const mm = Number(v.slice(11, 13));
    const ss = Number(v.slice(13, 15));
    return new Date(Date.UTC(y, m, d, hh, mm, ss));
  }
  if (/^\d{8}T\d{6}$/.test(v)) {
    const y = Number(v.slice(0, 4));
    const m = Number(v.slice(4, 6)) - 1;
    const d = Number(v.slice(6, 8));
    const hh = Number(v.slice(9, 11));
    const mm = Number(v.slice(11, 13));
    const ss = Number(v.slice(13, 15));
    return new Date(y, m, d, hh, mm, ss);
  }
  const parsed = new Date(v);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const weekdayFromRRule = (code) => {
  const map = {
    SU: 0,
    MO: 1,
    TU: 2,
    WE: 3,
    TH: 4,
    FR: 5,
    SA: 6,
  };
  return map[String(code || "").trim().toUpperCase()];
};

const parseRRule = (ruleText) => {
  const parts = String(ruleText || "")
    .split(";")
    .map((p) => p.trim())
    .filter(Boolean);
  const out = {};
  parts.forEach((part) => {
    const [k, v] = part.split("=");
    if (!k || v === undefined) return;
    out[k.toUpperCase()] = v;
  });
  return out;
};

const addDays = (date, n) => {
  const next = new Date(date);
  next.setDate(next.getDate() + n);
  return next;
};

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

const expandRecurringBusyEvents = (
  start,
  end,
  rruleText,
  exdateValues,
  windowStart,
  windowEnd
) => {
  const rrule = parseRRule(rruleText);
  const freq = String(rrule.FREQ || "").toUpperCase();
  const interval = Math.max(1, Number(rrule.INTERVAL || 1) || 1);
  const countLimit = Math.max(0, Number(rrule.COUNT || 0) || 0);
  const until = rrule.UNTIL ? parseIcsDateValue(rrule.UNTIL) : null;
  const durationMs = Math.max(1, (end?.getTime?.() || 0) - (start?.getTime?.() || 0));

  const exdates = new Set(
    (exdateValues || [])
      .map((v) => parseIcsDateValue(v))
      .filter(Boolean)
      .map((d) => d.getTime())
  );

  const expanded = [];
  if (!start || !windowStart || !windowEnd) return expanded;
  if (!freq) return expanded;

  if (freq === "DAILY") {
    let occurrenceStart = new Date(start);
    let emitted = 0;
    let guard = 0;
    while (guard < 1000) {
      guard += 1;
      if (until && occurrenceStart > until) break;
      if (countLimit && emitted >= countLimit) break;
      const occurrenceEnd = new Date(occurrenceStart.getTime() + durationMs);
      if (occurrenceEnd > windowStart && occurrenceStart < windowEnd && !exdates.has(occurrenceStart.getTime())) {
        expanded.push({ start: new Date(occurrenceStart), end: occurrenceEnd });
      }
      emitted += 1;
      occurrenceStart = addDays(occurrenceStart, interval);
      if (occurrenceStart > windowEnd && (!until || occurrenceStart > until)) break;
    }
    return expanded;
  }

  if (freq === "WEEKLY") {
    const bydayRaw = String(rrule.BYDAY || "").trim();
    const bydays = bydayRaw
      ? bydayRaw
          .split(",")
          .map((x) => weekdayFromRRule(x))
          .filter((x) => Number.isInteger(x))
      : [start.getDay()];
    const startDow = start.getDay();
    const day0 = startOfDay(start);
    const windowDayStart = startOfDay(windowStart);
    const windowDayEnd = startOfDay(windowEnd);
    const timeMsFromMidnight = start.getTime() - day0.getTime();

    let emitted = 0;
    let guard = 0;
    for (let day = new Date(windowDayStart); day <= windowDayEnd && guard < 2000; day = addDays(day, 1)) {
      guard += 1;
      if (day < day0) continue;
      const deltaDays = Math.floor((day.getTime() - day0.getTime()) / (24 * 60 * 60 * 1000));
      const weekIndex = Math.floor(deltaDays / 7);
      if (weekIndex % interval !== 0) continue;
      if (!bydays.includes(day.getDay())) continue;

      const dayShift = (day.getDay() - startDow + 7) % 7;
      if (weekIndex === 0 && dayShift < 0) continue;

      const occurrenceStart = new Date(day.getTime() + timeMsFromMidnight);
      if (until && occurrenceStart > until) break;
      if (countLimit && emitted >= countLimit) break;
      if (occurrenceStart < start) continue;

      const occurrenceEnd = new Date(occurrenceStart.getTime() + durationMs);
      if (occurrenceEnd > windowStart && occurrenceStart < windowEnd && !exdates.has(occurrenceStart.getTime())) {
        expanded.push({ start: occurrenceStart, end: occurrenceEnd });
      }
      emitted += 1;
    }
    return expanded;
  }

  return expanded;
};

const parseIcsBusyEventsWithIcalJs = (icsText, windowStart, windowEnd) => {
  if (!window.ICAL) return null;
  const jcal = window.ICAL.parse(String(icsText || ""));
  const comp = new window.ICAL.Component(jcal);
  const vevents = comp.getAllSubcomponents("vevent");
  const events = [];
  const windowStartMs = windowStart ? windowStart.getTime() : Number.NEGATIVE_INFINITY;
  const windowEndMs = windowEnd ? windowEnd.getTime() : Number.POSITIVE_INFINITY;

  vevents.forEach((vevent) => {
    const status = String(vevent.getFirstPropertyValue("status") || "").toUpperCase();
    if (status === "CANCELLED") return;
    const transp = String(vevent.getFirstPropertyValue("transp") || "").toUpperCase();
    if (transp === "TRANSPARENT") return;

    const event = new window.ICAL.Event(vevent);

    const addOccurrence = (startDate, endDate) => {
      if (!startDate || !endDate) return;
      const start = startDate.toJSDate();
      const end = endDate.toJSDate();
      if (!(start instanceof Date) || Number.isNaN(start.getTime())) return;
      if (!(end instanceof Date) || Number.isNaN(end.getTime())) return;
      const safeEnd = end > start ? end : new Date(start.getTime() + 60 * 60 * 1000);
      if (safeEnd.getTime() > windowStartMs && start.getTime() < windowEndMs) {
        events.push({ start, end: safeEnd });
      }
    };

    if (event.isRecurring()) {
      const iter = event.iterator();
      let count = 0;
      while (count < 2000) {
        count += 1;
        const occ = iter.next();
        if (!occ) break;
        const details = event.getOccurrenceDetails(occ);
        const occStart = details?.startDate?.toJSDate?.();
        if (occStart instanceof Date && occStart.getTime() > windowEndMs) break;
        addOccurrence(details?.startDate, details?.endDate);
      }
      return;
    }

    addOccurrence(event.startDate, event.endDate);
  });

  return events;
};

const parseIcsBusyEvents = (icsText, windowStart, windowEnd) => {
  try {
    const parsedByLibrary = parseIcsBusyEventsWithIcalJs(icsText, windowStart, windowEnd);
    if (Array.isArray(parsedByLibrary)) return parsedByLibrary;
  } catch (_error) {
    // Fall back to lightweight parser below.
  }

  const lines = unfoldIcsLines(icsText);
  const events = [];
  let inEvent = false;
  let start = null;
  let end = null;
  let rrule = "";
  let exdateValues = [];
  let status = "";
  let transp = "";

  lines.forEach((line) => {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      start = null;
      end = null;
      rrule = "";
      exdateValues = [];
      status = "";
      transp = "";
      return;
    }
    if (line === "END:VEVENT") {
      if (inEvent && start) {
        if (String(status || "").toUpperCase() === "CANCELLED") {
          inEvent = false;
          return;
        }
        if (String(transp || "").toUpperCase() === "TRANSPARENT") {
          inEvent = false;
          return;
        }
        const safeEnd = end && end > start ? end : new Date(start.getTime() + 60 * 60 * 1000);
        if (rrule) {
          const expanded = expandRecurringBusyEvents(
            start,
            safeEnd,
            rrule,
            exdateValues,
            windowStart,
            windowEnd
          );
          expanded.forEach((evt) => events.push(evt));
        } else if (
          !windowStart ||
          !windowEnd ||
          overlaps(start, safeEnd, windowStart, windowEnd)
        ) {
          events.push({ start, end: safeEnd });
        }
      }
      inEvent = false;
      return;
    }
    if (!inEvent) return;

    if (line.startsWith("DTSTART")) {
      const idx = line.indexOf(":");
      if (idx !== -1) start = parseIcsDateValue(line.slice(idx + 1));
      return;
    }
    if (line.startsWith("DTEND")) {
      const idx = line.indexOf(":");
      if (idx !== -1) end = parseIcsDateValue(line.slice(idx + 1));
      return;
    }
    if (line.startsWith("RRULE")) {
      const idx = line.indexOf(":");
      if (idx !== -1) rrule = line.slice(idx + 1).trim();
      return;
    }
    if (line.startsWith("EXDATE")) {
      const idx = line.indexOf(":");
      if (idx !== -1) {
        const ex = line
          .slice(idx + 1)
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        exdateValues = exdateValues.concat(ex);
      }
      return;
    }
    if (line.startsWith("STATUS")) {
      const idx = line.indexOf(":");
      if (idx !== -1) status = line.slice(idx + 1).trim();
      return;
    }
    if (line.startsWith("TRANSP")) {
      const idx = line.indexOf(":");
      if (idx !== -1) transp = line.slice(idx + 1).trim();
    }
  });

  return events;
};

const overlaps = (eventStart, eventEnd, slotStart, slotEnd) =>
  eventStart < slotEnd && eventEnd > slotStart;

const decodeIcsTextValue = (value) =>
  String(value || "")
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");

const parseIcsCalendarEventsWithIcalJs = (icsText, windowStart, windowEnd) => {
  if (!window.ICAL) return null;
  const jcal = window.ICAL.parse(String(icsText || ""));
  const comp = new window.ICAL.Component(jcal);
  const vevents = comp.getAllSubcomponents("vevent");
  const events = [];
  const windowStartMs = windowStart ? windowStart.getTime() : Number.NEGATIVE_INFINITY;
  const windowEndMs = windowEnd ? windowEnd.getTime() : Number.POSITIVE_INFINITY;

  vevents.forEach((vevent) => {
    const status = String(vevent.getFirstPropertyValue("status") || "").toUpperCase();
    if (status === "CANCELLED") return;

    const event = new window.ICAL.Event(vevent);
    const summary = decodeIcsTextValue(event.summary || vevent.getFirstPropertyValue("summary") || "Untitled");
    const location = decodeIcsTextValue(vevent.getFirstPropertyValue("location") || "");
    const description = decodeIcsTextValue(vevent.getFirstPropertyValue("description") || "");

    const pushOccurrence = (startDate, endDate) => {
      if (!startDate || !endDate) return;
      const start = startDate.toJSDate();
      const end = endDate.toJSDate();
      if (!(start instanceof Date) || Number.isNaN(start.getTime())) return;
      if (!(end instanceof Date) || Number.isNaN(end.getTime())) return;
      const safeEnd = end > start ? end : new Date(start.getTime() + 60 * 60 * 1000);
      if (safeEnd.getTime() <= windowStartMs || start.getTime() >= windowEndMs) return;
      events.push({
        start,
        end: safeEnd,
        allDay: Boolean(startDate.isDate),
        summary,
        location,
        description,
      });
    };

    if (event.isRecurring()) {
      const iter = event.iterator();
      let count = 0;
      while (count < 2000) {
        count += 1;
        const occ = iter.next();
        if (!occ) break;
        const details = event.getOccurrenceDetails(occ);
        const occStart = details?.startDate?.toJSDate?.();
        if (occStart instanceof Date && occStart.getTime() > windowEndMs) break;
        pushOccurrence(details?.startDate, details?.endDate);
      }
      return;
    }

    pushOccurrence(event.startDate, event.endDate);
  });

  return events;
};

const parseIcsCalendarEvents = (icsText, windowStart, windowEnd) => {
  try {
    const parsedByLibrary = parseIcsCalendarEventsWithIcalJs(icsText, windowStart, windowEnd);
    if (Array.isArray(parsedByLibrary)) {
      return parsedByLibrary.sort((a, b) => a.start - b.start);
    }
  } catch (_error) {
    // Fall through to basic parser.
  }

  const lines = unfoldIcsLines(icsText);
  const events = [];
  let inEvent = false;
  let start = null;
  let end = null;
  let summary = "";
  let location = "";
  let description = "";
  let status = "";

  lines.forEach((line) => {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      start = null;
      end = null;
      summary = "";
      location = "";
      description = "";
      status = "";
      return;
    }
    if (line === "END:VEVENT") {
      if (inEvent && start && String(status || "").toUpperCase() !== "CANCELLED") {
        const safeEnd = end && end > start ? end : new Date(start.getTime() + 60 * 60 * 1000);
        if (!windowStart || !windowEnd || overlaps(start, safeEnd, windowStart, windowEnd)) {
          events.push({
            start,
            end: safeEnd,
            allDay: false,
            summary: decodeIcsTextValue(summary || "Untitled"),
            location: decodeIcsTextValue(location),
            description: decodeIcsTextValue(description),
          });
        }
      }
      inEvent = false;
      return;
    }
    if (!inEvent) return;

    if (line.startsWith("DTSTART")) {
      const idx = line.indexOf(":");
      if (idx !== -1) start = parseIcsDateValue(line.slice(idx + 1));
      return;
    }
    if (line.startsWith("DTEND")) {
      const idx = line.indexOf(":");
      if (idx !== -1) end = parseIcsDateValue(line.slice(idx + 1));
      return;
    }
    if (line.startsWith("SUMMARY")) {
      const idx = line.indexOf(":");
      if (idx !== -1) summary = line.slice(idx + 1).trim();
      return;
    }
    if (line.startsWith("LOCATION")) {
      const idx = line.indexOf(":");
      if (idx !== -1) location = line.slice(idx + 1).trim();
      return;
    }
    if (line.startsWith("DESCRIPTION")) {
      const idx = line.indexOf(":");
      if (idx !== -1) description = line.slice(idx + 1).trim();
      return;
    }
    if (line.startsWith("STATUS")) {
      const idx = line.indexOf(":");
      if (idx !== -1) status = line.slice(idx + 1).trim();
    }
  });

  return events.sort((a, b) => a.start - b.start);
};

const setCalendarEventsStatus = (message, isError = false) => {
  if (!calendarEventsStatus) return;
  calendarEventsStatus.textContent = message;
  calendarEventsStatus.classList.toggle("error", isError);
};

const formatCalendarEventDateRange = (event) => {
  if (!(event?.start instanceof Date) || Number.isNaN(event.start.getTime())) return "Unknown date";
  const sameDay =
    event.end instanceof Date &&
    !Number.isNaN(event.end.getTime()) &&
    event.start.toDateString() === event.end.toDateString();
  if (event.allDay) {
    return event.start.toLocaleDateString(undefined, { month: "numeric", day: "numeric", year: "numeric" });
  }
  if (sameDay) {
    return `${event.start.toLocaleDateString()} • ${event.start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}–${event.end.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  }
  return `${event.start.toLocaleString()} → ${event.end?.toLocaleString?.() || ""}`;
};

const getSharedCalendarId = () => {
  const settings = loadGoogleSettings();
  return settings.studioCalendarIds[0] || "";
};

const createSharedCalendarEvent = async (request) => {
  if (!hasLiveGoogleToken()) {
    return { ok: false, reason: "Connect Google Calendar first." };
  }

  const sharedCalendarId = getSharedCalendarId();
  if (!sharedCalendarId) {
    return { ok: false, reason: "Add at least one shared Studio Calendar ID." };
  }

  const schedule = request.schedule || {};
  const toDateOnly = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

  let eventDate = request.availabilityFirstDate || "";
  if (!eventDate && schedule.mode === "specific") eventDate = schedule.specificDate || "";
  if (!eventDate) eventDate = schedule.startDate || "";
  if (!eventDate) return { ok: false, reason: "Schedule date missing for this request." };

  const dayStart = new Date(`${eventDate}T00:00:00`);
  if (Number.isNaN(dayStart.getTime())) return { ok: false, reason: "Schedule dates are invalid." };
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);

  const dayBusyCheck = await fetchFreeBusy([sharedCalendarId], dayStart.toISOString(), dayEnd.toISOString());
  const busyEntries = dayBusyCheck?.calendars?.[sharedCalendarId]?.busy || [];
  if (busyEntries.length > 0) {
    return { ok: false, reason: "Shared calendar already has a session that day. Not adding another." };
  }

  const eventPayload = {
    summary: `Session: ${request.writerName}`,
    location: request.location || "",
    description: [
      `Writer: ${request.writerName}`,
      `Session brief: ${request.sessionBrief || ""}`,
      `Preferred outreach: ${request.writerPreferredContact || "email"}`,
      `Personal contact: ${request.writerPersonalContact || "n/a"}`,
      `Manager contact: ${request.writerManagerContact || "n/a"}`,
      "",
      "Created by Session Matchmaker",
    ].join("\n"),
    start: { date: eventDate },
    end: { date: toDateOnly(dayEnd) },
  };

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(sharedCalendarId)}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventPayload),
    }
  );

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      googleAccessToken = "";
      googleTokenExpiryMs = 0;
    }
    return { ok: false, reason: `Calendar event create failed (${response.status}).` };
  }

  const created = await response.json();
  return {
    ok: true,
    eventId: created.id || "",
    eventLink: created.htmlLink || "",
  };
};

const getModeSlots = (schedule) => {
  const slots = [];
  const toDayStart = (dateText) => {
    const dt = new Date(`${dateText}T00:00:00`);
    if (Number.isNaN(dt.getTime())) return null;
    return dt;
  };

  if (schedule.mode === "specific") {
    const day = toDayStart(schedule.specificDate);
    if (!day) return [];
    if (!schedule.allowWeekends && (day.getDay() === 0 || day.getDay() === 6)) return [];
    const next = new Date(day);
    next.setDate(next.getDate() + 1);
    return [{ start: day, end: next }];
  }

  if (schedule.mode === "anytime") {
    const today = new Date();
    const startDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    const horizon = 60;
    for (let i = 0; i < horizon; i += 1) {
      const dayStart = new Date(startDay);
      dayStart.setDate(startDay.getDate() + i);
      if (!schedule.allowWeekends && (dayStart.getDay() === 0 || dayStart.getDay() === 6)) continue;
      const nextDay = new Date(dayStart);
      nextDay.setDate(dayStart.getDate() + 1);
      slots.push({ start: dayStart, end: nextDay });
    }
    return slots;
  }

  const startDay = toDayStart(schedule.startDate);
  const endDay = toDayStart(schedule.endDate);
  if (!startDay || !endDay || endDay < startDay) return [];

  for (let day = new Date(startDay); day <= endDay; day.setDate(day.getDate() + 1)) {
    if (!schedule.allowWeekends && (day.getDay() === 0 || day.getDay() === 6)) continue;
    const dayStart = new Date(day);
    const nextDay = new Date(dayStart);
    nextDay.setDate(nextDay.getDate() + 1);
    slots.push({ start: dayStart, end: nextDay });
  }

  return slots;
};

const getGoogleAvailabilityForWriter = async (writer, schedule, studioCalendarIds) => {
  if (!writer.calendarId) {
    return { status: "missing-calendar", summary: "No linked writer calendar." };
  }
  if (!hasLiveGoogleToken()) {
    return { status: "no-auth", summary: "Google not connected." };
  }

  const slots = getModeSlots(schedule).slice(0, 31);
  if (!slots.length) {
    return { status: "invalid-window", summary: "Invalid scheduling window." };
  }

  const calendarIds = [writer.calendarId, ...studioCalendarIds];
  const availableSlots = [];

  for (const slot of slots) {
    const data = await fetchFreeBusy(calendarIds, slot.start.toISOString(), slot.end.toISOString());
    const calendars = data.calendars || {};
    const allFree = calendarIds.every((id) => Array.isArray(calendars[id]?.busy) && calendars[id].busy.length === 0);
    if (allFree) {
      availableSlots.push(slot);
      if (availableSlots.length >= 3) break;
    }
  }

  if (!availableSlots.length) {
    return { status: "busy", summary: "No shared opening in selected window." };
  }

  const preview = availableSlots
    .map((slot) => `${slot.start.toLocaleDateString()}`)
    .join(" | ");

  return {
    status: "available",
    summary: `Available slots: ${preview}`,
    slots: availableSlots,
  };
};

const getIcloudAvailabilityForWriter = async (writer, schedule, studioCalendarIds) => {
  if (!writer.calendarId) {
    return { status: "missing-calendar", summary: "No linked iCloud calendar URL." };
  }

  const slots = getModeSlots(schedule).slice(0, 31);
  if (!slots.length) {
    return { status: "invalid-window", summary: "Invalid scheduling window." };
  }

  let icsText = "";
  try {
    icsText = await fetchIcloudIcsText(writer.calendarId);
  } catch (error) {
    return {
      status: "error",
      summary: error.message || "Unable to read iCloud calendar (consider local ICS proxy).",
    };
  }

  const windowStart = slots[0]?.start || null;
  const windowEnd = slots[slots.length - 1]?.end || null;
  const busyEvents = parseIcsBusyEvents(icsText, windowStart, windowEnd);
  const availableSlots = [];

  for (const slot of slots) {
    const writerBusy = busyEvents.some((evt) => overlaps(evt.start, evt.end, slot.start, slot.end));
    if (writerBusy) continue;
    availableSlots.push(slot);
    if (availableSlots.length >= 3) break;
  }

  if (!availableSlots.length) {
    return { status: "busy", summary: "No shared opening in selected window." };
  }

  const preview = availableSlots.map((slot) => `${slot.start.toLocaleDateString()}`).join(" | ");

  return {
    status: "available",
    summary: `Available slots: ${preview}`,
    slots: availableSlots,
  };
};

const getAvailabilityForWriter = async (writer, schedule, studioCalendarIds) => {
  return getIcloudAvailabilityForWriter(writer, schedule, studioCalendarIds);
};

const setScheduleModeUi = () => {
  const mode = scheduleModeInput.value;
  const isSpecific = mode === "specific";
  const isRangeLike = mode === "range";

  scheduleModeInput.classList.toggle("placeholder", !mode);
  specificDateGroup.classList.toggle("hidden", !isSpecific);
  rangeDateGroup.classList.toggle("hidden", !isRangeLike);
};

const bindDateInputOpenOnClick = (input) => {
  if (!input) return;

  const openPicker = () => {
    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
      } catch (_error) {
        // Ignore when browser blocks programmatic open; native behavior still works.
      }
    }
  };

  input.addEventListener("click", openPicker);
  input.addEventListener("focus", openPicker);
};

const setSongwriterFormMode = (isEditing) => {
  saveSongwriterButton.textContent = isEditing ? "Save Songwriter" : "Add Songwriter";
  if (toggleAddSongwriterButton) {
    toggleAddSongwriterButton.textContent = isEditing ? "Edit Songwriter" : "Add Songwriter";
  }
  cancelEditButton.classList.toggle("hidden", !isEditing);
};

const setWriterRoleInputs = (roles) => {
  const selected = new Set(normalizeRoles(roles));
  writerRoleInputs.forEach((input) => {
    input.checked = selected.has(String(input.value || "").toLowerCase());
  });
};

const getWriterRolesFromInputs = () =>
  normalizeRoles(writerRoleInputs.filter((input) => input.checked).map((input) => input.value));

const resetSongwriterForm = () => {
  songwriterForm.reset();
  editingSongwriterId = null;
  setSongwriterFormMode(false);
  document.getElementById("writer-preferred-contact").value = "email";
  document.getElementById("writer-calendar-provider").value = "icloud";
  setWriterRoleInputs([]);
  if (writerSharedCalendarSelect) {
    writerSharedCalendarSelect.value = "";
    writerSharedCalendarSelect.classList.add("placeholder");
  }
  setWriterCalendarStatus("");
  setWriterCalendarProviderUi();
};

const resetBriefForm = () => {
  if (!briefForm) return;
  briefForm.reset();
  setBriefSeekingInputs([]);
  if (briefTypeInput) briefTypeInput.value = "hybrid";
  if (briefNeedLevelInput) briefNeedLevelInput.value = "medium";
  setBriefStatus("");
};

const populateSongwriterForm = (writer) => {
  document.getElementById("writer-name").value = writer.name || "";
  document.getElementById("writer-location").value = writer.location || "";
  document.getElementById("writer-personal-contact").value = writer.personalContact || "";
  document.getElementById("writer-manager-contact").value = writer.managerContact || "";
  document.getElementById("writer-preferred-contact").value = writer.preferredContact || "email";
  document.getElementById("writer-calendar-provider").value = writer.calendarProvider || "icloud";
  document.getElementById("writer-tags").value = (writer.tags || []).join(", ");
  setWriterRoleInputs(writer.roles || []);
  document.getElementById("writer-published").checked = Boolean(writer.published);
  document.getElementById("writer-bio").value = writer.bio || "";
  document.getElementById("writer-notes").value = writer.notes || "";
  document.getElementById("writer-roster").value = writer.roster || "";
  document.getElementById("writer-calendar-name").value = writer.calendarName || "";
  document.getElementById("writer-calendar-id").value = writer.calendarId || "";
  if (writerSharedCalendarSelect) {
    writerSharedCalendarSelect.value = writer.calendarId || "";
    writerSharedCalendarSelect.classList.toggle("placeholder", !writerSharedCalendarSelect.value);
  }
  setWriterCalendarProviderUi();
};

const parseCsvLine = (line) => {
  const cells = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += char;
    }
  }

  cells.push(cell.trim());
  return cells;
};

const toCsvCell = (value) => {
  const text = String(value ?? "");
  const escaped = text.replace(/"/g, '""');
  return `"${escaped}"`;
};

const buildSongwriterExportCsv = (writers) => {
  const headers = [
    "name",
    "location",
    "personal_contact",
    "manager_contact",
    "tags",
    "bio",
    "notes",
    "roster",
    "preferred_contact",
    "calendar_provider",
    "calendar_name",
    "roles",
    "published",
    "calendar_id",
  ];

  const lines = [headers.join(",")];

  (writers || []).forEach((writer) => {
    const row = [
      writer.name || "",
      writer.location || "",
      writer.personalContact || "",
      writer.managerContact || "",
      Array.isArray(writer.tags) ? writer.tags.join(", ") : "",
      writer.bio || "",
      writer.notes || "",
      writer.roster || "",
      writer.preferredContact || "email",
      writer.calendarProvider || "icloud",
      writer.calendarName || "",
      Array.isArray(writer.roles) ? writer.roles.join(", ") : "",
      writer.published ? "true" : "false",
      writer.calendarId || "",
    ];
    lines.push(row.map(toCsvCell).join(","));
  });

  return `${lines.join("\n")}\n`;
};

const parseSongwriterCsv = (content) => {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return { imported: [], skipped: 0, reason: "CSV is empty." };

  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
  const nameIndex = headers.indexOf("name");
  const locationIndex = headers.indexOf("location");
  const personalContactIndex = headers.indexOf("personal_contact");
  const managerContactIndex = headers.indexOf("manager_contact");
  const preferredContactIndex = headers.indexOf("preferred_contact");
  const calendarProviderIndex = headers.indexOf("calendar_provider");
  const calendarNameIndex = headers.indexOf("calendar_name");
  const rolesIndex = headers.indexOf("roles");
  const tagsIndex = headers.indexOf("tags");
  const publishedIndex = headers.indexOf("published");
  const bioIndex = headers.indexOf("bio");
  const notesIndex = headers.indexOf("notes");
  const rosterIndex = headers.indexOf("roster");
  const calendarIdIndex = headers.indexOf("calendar_id");

  if (
    nameIndex === -1 ||
    locationIndex === -1 ||
    personalContactIndex === -1 ||
    managerContactIndex === -1 ||
    tagsIndex === -1 ||
    bioIndex === -1
  ) {
    return {
      imported: [],
      skipped: 0,
      reason: "CSV must include headers: name,location,personal_contact,manager_contact,tags,bio (optional: notes,roster,preferred_contact,calendar_provider,calendar_name,roles,published,calendar_id).",
    };
  }

  const imported = [];
  let skipped = 0;

  for (let i = 1; i < lines.length; i += 1) {
    const row = parseCsvLine(lines[i]);
    const name = (row[nameIndex] || "").trim();
    const location = (row[locationIndex] || "").trim().toLowerCase();
    const personalContact = (row[personalContactIndex] || "").trim();
    const managerContact = (row[managerContactIndex] || "").trim();
    const preferredContactRaw = (preferredContactIndex >= 0 ? row[preferredContactIndex] : "") || "";
    const preferredContact = String(preferredContactRaw).trim().toLowerCase() === "text" ? "text" : "email";
    const calendarProviderRaw = (calendarProviderIndex >= 0 ? row[calendarProviderIndex] : "") || "";
    const calendarProvider = String(calendarProviderRaw).trim().toLowerCase() === "google" ? "google" : "icloud";
    const calendarName = calendarNameIndex >= 0 ? (row[calendarNameIndex] || "").trim() : "";
    const tags = ensureLocationTag(normalizeTagField(row[tagsIndex] || ""), location);
    const roles = rolesIndex >= 0
      ? normalizeRoles(normalizeTagField(row[rolesIndex] || ""))
      : normalizeRoles(tags.filter((tag) => SEEKING_OPTIONS.includes(tag)));
    const bio = (row[bioIndex] || "").trim();
    const notes = notesIndex >= 0 ? (row[notesIndex] || "").trim() : "";
    const roster = rosterIndex >= 0 ? (row[rosterIndex] || "").trim() : "";
    const calendarId = calendarIdIndex >= 0 ? (row[calendarIdIndex] || "").trim() : "";

    const published = publishedIndex >= 0 ? parseBoolean(row[publishedIndex]) : false;
    if (!name || !location || !personalContact || !managerContact || !tags.length || !bio) {
      skipped += 1;
      continue;
    }
    imported.push({
      id: crypto.randomUUID(),
      name,
      location,
      personalContact,
      managerContact,
      preferredContact,
      calendarProvider,
      calendarName,
      roles,
      published,
      tags,
      bio,
      notes,
      roster,
      calendarId,
      createdAt: Date.now() + i,
    });
  }

  return { imported, skipped, reason: "" };
};

const extractTagsFromBrief = (brief) => {
  const text = String(brief || "").toLowerCase();
  const tags = new Set();

  PHRASE_TAG_MAP.forEach(([phrase, tag]) => {
    if (text.includes(phrase)) tags.add(tag);
  });

  const tokens = text
    .replace(/[^a-z0-9&+\s-]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);

  tokens.forEach((token) => {
    if (DIRECT_TAG_MAP.has(token)) {
      tags.add(token === "rnb" ? "r&b" : token);
    }
  });

  const keywordLike = tokens.filter((t) => t.length >= 4 && !STOP_WORDS.has(t) && !/^\d+$/.test(t));
  keywordLike.slice(0, 10).forEach((t) => tags.add(t));

  return Array.from(tags);
};

const getSelectedSeeking = () =>
  normalizeRoles(
    seekingInputs
      .filter((input) => input.checked)
      .map((input) => String(input.value || "").trim().toLowerCase())
  );

const syncSessionSeekingPills = () => {
  seekingInputs.forEach((input) => {
    const pill = input.closest(".session-seeking-pill");
    if (!pill) return;
    pill.classList.toggle("active", Boolean(input.checked));
  });
};

const syncPublishedRosterSlotsUi = () => {
  if (!publishedSlotInline || !publishedOnlyInput || !includePublishedInput) return;
  const selectedSeeking = new Set(getSelectedSeeking());
  const hasSeeking = selectedSeeking.size > 0;
  const includePublished = Boolean(includePublishedInput.checked);
  const onlyPublished = Boolean(publishedOnlyInput.checked);
  const showPublishedSlots = includePublished && !onlyPublished;

  if (publishedScopeOptions) {
    publishedScopeOptions.classList.toggle("hidden", !hasSeeking);
  }

  if (!hasSeeking) {
    includePublishedInput.checked = false;
    publishedOnlyInput.checked = false;
  }

  let hasVisibleRole = false;

  publishedRoleMinInputs.forEach((input) => {
    const role = String(input.dataset.role || "").trim().toLowerCase();
    const row = input.closest(".role-count-row");
    const shouldShow = showPublishedSlots && hasSeeking && selectedSeeking.has(role);
    if (row) row.classList.toggle("hidden", !shouldShow);
    if (!shouldShow) input.value = "0";
    if (shouldShow) hasVisibleRole = true;
  });

  publishedSlotInline.classList.toggle("hidden", !hasVisibleRole);
};

const getPublishedRoleMinimums = () => {
  const out = {};
  publishedRoleMinInputs.forEach((input) => {
    const role = String(input.dataset.role || "").trim().toLowerCase();
    const count = Math.max(0, Number.parseInt(input.value || "0", 10) || 0);
    if (SEEKING_OPTIONS.includes(role) && count > 0) out[role] = count;
  });
  return out;
};

const normalizePublishedRoleMinimums = (minimums) => {
  const out = {};
  if (!minimums || typeof minimums !== "object") return out;
  Object.entries(minimums).forEach(([role, raw]) => {
    const normalizedRole = String(role || "").trim().toLowerCase();
    const count = Math.max(0, Number.parseInt(String(raw || 0), 10) || 0);
    if (SEEKING_OPTIONS.includes(normalizedRole) && count > 0) out[normalizedRole] = count;
  });
  return out;
};

const summarizePublishedRoleMinimums = (minimums) =>
  Object.entries(normalizePublishedRoleMinimums(minimums))
    .map(([role, count]) => `${count} ${role}`)
    .join(", ");

const normalizeTagMatchText = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");

const tagMatchesQuery = (writerTag, queryTag) => {
  const candidate = normalizeTagMatchText(writerTag);
  const query = normalizeTagMatchText(queryTag);
  if (!candidate || !query) return false;
  if (candidate === query) return true;
  if (candidate.includes(query) || query.includes(candidate)) return true;

  const candidateWords = candidate.split(" ");
  const queryWords = query.split(" ");
  return queryWords.every((word) => candidateWords.includes(word));
};

const getSelectedBriefSeeking = () =>
  normalizeRoles(
    briefSeekingInputs
      .filter((input) => input.checked)
      .map((input) => String(input.value || "").trim().toLowerCase())
  );

const setBriefSeekingInputs = (roles) => {
  const selected = new Set(normalizeRoles(roles));
  briefSeekingInputs.forEach((input) => {
    input.checked = selected.has(String(input.value || "").toLowerCase());
  });
};

const switchView = (viewKey) => {
  if (!views[viewKey]) return;
  Object.entries(views).forEach(([key, el]) => {
    el.classList.toggle("active", key === viewKey);
  });
  viewButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.view === viewKey));
  if (calendarDropdown) {
    calendarDropdown.classList.toggle("hidden", viewKey !== "calendar");
    if (viewKey !== "calendar") setCalendarMenuOpen(false);
  }
  if (viewKey === "calendar") {
    renderCalendarWriterList();
    loadSelectedWriterCalendarEvents();
  }
};

const matchesSearch = (writer, query) => {
  if (!query) return true;
  const haystack = [
    writer.name || "",
    writer.location || "",
    writer.personalContact || "",
    writer.managerContact || "",
    writer.preferredContact || "",
    writer.calendarProvider || "",
    writer.calendarName || "",
    writer.calendarId || "",
    writer.bio || "",
    writer.notes || "",
    ...(writer.roles || []),
    ...(writer.tags || []),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
};

const matchesBriefSearch = (brief, query) => {
  if (!query) return true;
  const haystack = [
    brief.title || "",
    brief.source || "",
    brief.requester || "",
    brief.location || "",
    brief.briefText || "",
    brief.status || "",
    ...(brief.seeking || []),
    ...(brief.requiredTags || []),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
};

const renderSongwriters = () => {
  const songwriters = loadSongwriters();
  renderSessionLocationOptions(songwriters);
  const query = (writerSearchInput.value || "").trim().toLowerCase();
  songwriterList.innerHTML = "";
  renderCalendarWriterList();

  if (!query && !showAllSongwriters) {
    songwriterList.innerHTML = "";
    return;
  }

  const filtered = songwriters
    .filter((writer) => showAllSongwriters || matchesSearch(writer, query))
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  if (!filtered.length) {
    songwriterList.innerHTML = "<p class='hint'>No songwriters found.</p>";
    return;
  }

  filtered.forEach((writer) => {
    const node = songwriterTemplate.content.cloneNode(true);
    const item = node.querySelector(".songwriter-item");
    const editButton = node.querySelector(".edit-writer");
    const deleteButton = node.querySelector(".delete-writer");
    const isInlineEditing = inlineEditingWriterId === writer.id;
    const inlineEditor = node.querySelector(".inline-editor");
    const readOnly = node.querySelector(".songwriter-readonly");

    item.dataset.writerId = writer.id;
    node.querySelector(".songwriter-name").textContent = writer.name;
    editButton.dataset.writerId = writer.id;
    deleteButton.dataset.writerId = writer.id;
    editButton.textContent = isInlineEditing ? "Close" : "Edit";
    node.querySelector(".songwriter-meta").textContent =
      `Location: ${writer.location} | ${writer.published ? "Published" : "Unpublished"} | Roster: ${writer.roster || "n/a"} | Calendar: ${writer.calendarProvider || "icloud"}${writer.calendarName ? ` (${writer.calendarName})` : ""} | Preferred: ${writer.preferredContact} | Personal: ${writer.personalContact} | Manager: ${writer.managerContact}`;
    const roleText = SEEKING_OPTIONS.map((role) => `[${(writer.roles || []).includes(role) ? "x" : " "}] ${role}`).join("  ");
    node.querySelector(".songwriter-roles").textContent = `Roles: ${roleText}`;
    node.querySelector(".songwriter-tags").textContent = `Tags: ${(writer.tags || []).join(", ")}`;
    node.querySelector(".songwriter-bio").textContent = `Bio: ${writer.bio || "missing"}`;
    node.querySelector(".songwriter-notes").textContent = writer.notes ? `Notes: ${writer.notes}` : "Notes: none";

    readOnly.classList.toggle("hidden", isInlineEditing);
    inlineEditor.classList.toggle("hidden", !isInlineEditing);

    if (isInlineEditing) {
      node.querySelector(".inline-name").value = writer.name || "";
      node.querySelector(".inline-location").value = writer.location || "";
      node.querySelector(".inline-personal").value = writer.personalContact || "";
      node.querySelector(".inline-manager").value = writer.managerContact || "";
      node.querySelector(".inline-calendar-provider").value = writer.calendarProvider || "icloud";
      node.querySelector(".inline-preferred-contact").value = writer.preferredContact || "email";
      node.querySelector(".inline-tags").value = (writer.tags || []).join(", ");
      const inlineRoles = new Set(normalizeRoles(writer.roles || []));
      node.querySelectorAll(".inline-role").forEach((checkbox) => {
        checkbox.checked = inlineRoles.has(String(checkbox.value || "").toLowerCase());
      });
      node.querySelector(".inline-published").checked = Boolean(writer.published);
      node.querySelector(".inline-bio").value = writer.bio || "";
      node.querySelector(".inline-notes").value = writer.notes || "";
      node.querySelector(".inline-roster").value = writer.roster || "";
      node.querySelector(".inline-calendar-name").value = writer.calendarName || "";
      node.querySelector(".inline-calendar-id").value = writer.calendarId || "";
      node.querySelector(".save-inline-writer").dataset.writerId = writer.id;
      node.querySelector(".cancel-inline-writer").dataset.writerId = writer.id;
    }

    songwriterList.append(node);
  });
};

const renderSessionLocationOptions = (songwriters = loadSongwriters()) => {
  if (!sessionLocationInput) return;
  // Location is free-type by request; keep matcher case-insensitive via lowercasing on save/search.
  void songwriters;
};

const getPublishedCalendarWriters = () =>
  loadSongwriters()
    .filter((writer) => writer.published)
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));

const renderCalendarWriterList = () => {
  if (!calendarWriterList) return;
  const writers = getPublishedCalendarWriters();
  calendarWriterList.innerHTML = "";

  if (!writers.length) {
    calendarWriterList.innerHTML = "<p class='hint'>No published writers yet.</p>";
    if (calendarEventsList) {
      calendarEventsList.innerHTML = "<p class='hint'>Add published writers to use the calendar view.</p>";
    }
    if (calendarEventsTitle) calendarEventsTitle.textContent = "Calendar Events";
    setCalendarEventsStatus("");
    selectedCalendarWriterId = null;
    return;
  }

  if (
    selectedCalendarWriterId !== ALL_CALENDAR_WRITERS_ID &&
    !writers.some((w) => w.id === selectedCalendarWriterId)
  ) {
    selectedCalendarWriterId = ALL_CALENDAR_WRITERS_ID;
  }

  const allBtn = document.createElement("button");
  allBtn.type = "button";
  allBtn.className = "ghost calendar-writer-btn";
  if (selectedCalendarWriterId === ALL_CALENDAR_WRITERS_ID) allBtn.classList.add("active");
  allBtn.dataset.writerId = ALL_CALENDAR_WRITERS_ID;
  allBtn.innerHTML =
    '<span class="calendar-writer-btn-name">All Writers</span><span class="calendar-writer-btn-meta">search all calendars</span>';
  calendarWriterList.append(allBtn);

  writers.forEach((writer) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ghost calendar-writer-btn";
    if (writer.id === selectedCalendarWriterId) btn.classList.add("active");
    btn.dataset.writerId = writer.id;
    const hasCalendar = Boolean(writer.calendarId);
    btn.innerHTML = `<span class="calendar-writer-btn-name">${escapeHtml(writer.name || "Unnamed")}</span><span class="calendar-writer-btn-meta">${escapeHtml(writer.roster || "roster n/a")}${hasCalendar ? "" : " • no calendar url"}</span>`;
    calendarWriterList.append(btn);
  });
};

const renderWriterCalendarEvents = (writer, events) => {
  if (!calendarEventsList) return;
  const now = Date.now();
  const upcoming = events.filter((evt) => evt.start.getTime() >= now).slice(0, 30);
  const recent = events
    .filter((evt) => evt.start.getTime() < now)
    .sort((a, b) => b.start - a.start)
    .slice(0, 30);

  const sections = [];
  if (upcoming.length) {
    sections.push("<div class='calendar-event-section'><p class='hint'>Upcoming</p>");
    upcoming.forEach((evt) => {
      sections.push(
        `<article class="calendar-event-item"><p class="calendar-event-title">${escapeHtml(evt.summary || "Untitled")}</p><p class="calendar-event-date">${escapeHtml(formatCalendarEventDateRange(
          evt
        ))}</p>${evt.location ? `<p class="calendar-event-meta">Location: ${escapeHtml(evt.location)}</p>` : ""}</article>`
      );
    });
    sections.push("</div>");
  }
  if (recent.length) {
    sections.push("<div class='calendar-event-section'><p class='hint'>Recent</p>");
    recent.forEach((evt) => {
      sections.push(
        `<article class="calendar-event-item"><p class="calendar-event-title">${escapeHtml(evt.summary || "Untitled")}</p><p class="calendar-event-date">${escapeHtml(formatCalendarEventDateRange(
          evt
        ))}</p>${evt.location ? `<p class="calendar-event-meta">Location: ${escapeHtml(evt.location)}</p>` : ""}</article>`
      );
    });
    sections.push("</div>");
  }

  if (!sections.length) {
    calendarEventsList.innerHTML = "<p class='hint'>No events found in the current calendar window.</p>";
    return;
  }

  calendarEventsList.innerHTML = sections.join("");
  if (calendarEventsTitle) calendarEventsTitle.textContent = `${writer.name} Calendar`;
};

const loadSelectedWriterCalendarEvents = async (forceRefresh = false) => {
  if (!calendarEventsList) return;
  const writers = getPublishedCalendarWriters();
  if (selectedCalendarWriterId === ALL_CALENDAR_WRITERS_ID) {
    if (calendarEventsTitle) calendarEventsTitle.textContent = "All Published Calendars";
    calendarEventsList.innerHTML = "";
    setCalendarEventsStatus("");
    return;
  }
  const writer = writers.find((w) => w.id === selectedCalendarWriterId);

  if (!writer) {
    if (calendarEventsTitle) calendarEventsTitle.textContent = "Calendar Events";
    calendarEventsList.innerHTML = "<p class='hint'>Select a published writer to view events.</p>";
    setCalendarEventsStatus("");
    return;
  }

  if (calendarEventsTitle) calendarEventsTitle.textContent = `${writer.name} Calendar`;
  if (!writer.calendarId) {
    calendarEventsList.innerHTML = "<p class='hint'>No public iCloud calendar URL on this writer profile.</p>";
    setCalendarEventsStatus("Add a public iCloud URL in the writer profile to view events.", true);
    return;
  }

  const cached = writerCalendarEventsCache.get(writer.id);
  const nowMs = Date.now();
  if (!forceRefresh && cached && nowMs - cached.cachedAt < 5 * 60 * 1000) {
    renderWriterCalendarEvents(writer, cached.events || []);
    setCalendarEventsStatus("");
    return;
  }

  setCalendarEventsStatus("Loading calendar events...");
  calendarEventsList.innerHTML = "<p class='hint'>Loading events...</p>";

  try {
    const icsText = await fetchIcloudIcsText(writer.calendarId);
    const windowStart = new Date();
    windowStart.setMonth(windowStart.getMonth() - 4);
    const windowEnd = new Date();
    windowEnd.setMonth(windowEnd.getMonth() + 8);
    const events = parseIcsCalendarEvents(icsText, windowStart, windowEnd);
    writerCalendarEventsCache.set(writer.id, { cachedAt: Date.now(), events });
    renderWriterCalendarEvents(writer, events);
    setCalendarEventsStatus("");
  } catch (error) {
    calendarEventsList.innerHTML = "<p class='hint'>Unable to load calendar events.</p>";
    setCalendarEventsStatus(error.message || "Failed to load calendar events.", true);
  }
};

const getCalendarEventSearchText = (event) =>
  [event.summary || "", event.location || "", event.description || ""].join(" ").toLowerCase();

const formatCalendarSearchMatchLine = (event) => {
  const parts = [formatCalendarEventDateRange(event)];
  if (event.location) parts.push(`Location: ${event.location}`);
  if (event.summary) parts.push(`Event: ${event.summary}`);
  return parts.join(" | ");
};

const renderCalendarKeywordSearchResults = () => {
  if (!calendarSearchResults) return;
  if (!lastCalendarKeywordSearch.trim()) {
    calendarSearchResults.classList.add("hidden");
    calendarSearchResults.innerHTML = "";
    if (generateCalendarKeywordReportButton) generateCalendarKeywordReportButton.disabled = true;
    const writers = getPublishedCalendarWriters();
    const selected = writers.find((w) => w.id === selectedCalendarWriterId);
    if (calendarEventsTitle) {
      calendarEventsTitle.textContent =
        selectedCalendarWriterId === ALL_CALENDAR_WRITERS_ID
          ? "All Published Calendars"
          : selected
            ? `${selected.name} Calendar`
            : "Calendar Events";
    }
    return;
  }

  if (calendarEventsTitle) calendarEventsTitle.textContent = "All Published Calendars";
  calendarSearchResults.classList.remove("hidden");
  if (!lastCalendarKeywordSearchResults.length) {
    calendarSearchResults.innerHTML = `<p class="hint">No matches found for "${escapeHtml(lastCalendarKeywordSearch)}".</p>`;
    if (generateCalendarKeywordReportButton) generateCalendarKeywordReportButton.disabled = true;
    return;
  }

  const sections = [];
  sections.push(
    `<p class="hint">Keyword: "${escapeHtml(lastCalendarKeywordSearch)}" • Scope: ${escapeHtml(lastCalendarKeywordSearchScopeLabel)} • Writers scanned: ${lastCalendarKeywordSearchMeta.scanned} • With calendars: ${lastCalendarKeywordSearchMeta.withCalendars} • Matched writers: ${lastCalendarKeywordSearchMeta.matchedWriters}</p>`
  );
  if (lastCalendarKeywordSearchMeta.skippedNoCalendar > 0) {
    sections.push(
      `<p class="hint">${lastCalendarKeywordSearchMeta.skippedNoCalendar} published writer(s) skipped (no calendar URL).</p>`
    );
  }

  lastCalendarKeywordSearchResults.forEach((group) => {
    sections.push(
      `<article class="calendar-search-group"><p class="calendar-search-group-title">${escapeHtml(
        group.writerName
      )} <span class="calendar-search-count">(${group.matches.length})</span></p><p class="calendar-search-group-meta">Roster: ${escapeHtml(
        group.roster || "n/a"
      )}</p>`
    );
    group.matches.forEach((match) => {
      sections.push(
        `<p class="calendar-search-match">${escapeHtml(formatCalendarSearchMatchLine(match))}</p>`
      );
    });
    sections.push("</article>");
  });

  calendarSearchResults.innerHTML = sections.join("");
  if (generateCalendarKeywordReportButton) generateCalendarKeywordReportButton.disabled = false;
};

const buildCalendarKeywordReport = () => {
  const keyword = lastCalendarKeywordSearch.trim();
  if (!keyword) return "No calendar keyword search has been run.";
  if (!lastCalendarKeywordSearchResults.length) {
    return [
      `Keyword: ${keyword}`,
      `Scope: ${lastCalendarKeywordSearchScopeLabel}`,
      `Writers scanned: ${lastCalendarKeywordSearchMeta.scanned}`,
      `Writers with calendars: ${lastCalendarKeywordSearchMeta.withCalendars}`,
      `Matches: none`,
    ].join("\n");
  }

  const lines = [];
  lines.push(`Keyword: ${keyword}`);
  lines.push(`Scope: ${lastCalendarKeywordSearchScopeLabel}`);
  lines.push(`Writers scanned: ${lastCalendarKeywordSearchMeta.scanned}`);
  lines.push(`Writers with calendars: ${lastCalendarKeywordSearchMeta.withCalendars}`);
  lines.push(`Matched writers: ${lastCalendarKeywordSearchMeta.matchedWriters}`);
  if (lastCalendarKeywordSearchMeta.skippedNoCalendar > 0) {
    lines.push(`Skipped (no calendar URL): ${lastCalendarKeywordSearchMeta.skippedNoCalendar}`);
  }
  lines.push("");

  lastCalendarKeywordSearchResults.forEach((group, idx) => {
    lines.push(`${idx + 1}. ${group.writerName} (${group.matches.length} matching event${group.matches.length === 1 ? "" : "s"})`);
    lines.push(`Roster: ${group.roster || "n/a"}`);
    group.matches.forEach((event, eventIdx) => {
      lines.push(`  ${eventIdx + 1}) ${formatCalendarSearchMatchLine(event)}`);
      if (event.description) {
        const cleanDescription = String(event.description).replace(/\s+/g, " ").trim();
        if (cleanDescription) lines.push(`     Notes: ${cleanDescription.slice(0, 240)}`);
      }
    });
    lines.push("");
  });

  return lines.join("\n");
};

const generateCalendarKeywordReport = () => {
  if (!calendarReportPanel || !calendarReportOutput || !downloadCalendarReportLink) return false;
  const report = buildCalendarKeywordReport();
  calendarReportOutput.textContent = report;
  calendarReportPanel.classList.remove("hidden");
  const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
  downloadCalendarReportLink.href = URL.createObjectURL(blob);
  downloadCalendarReportLink.download = `calendar-keyword-report-${Date.now()}.txt`;
  return true;
};

const clearCalendarKeywordSearch = () => {
  lastCalendarKeywordSearch = "";
  lastCalendarKeywordSearchResults = [];
  lastCalendarKeywordSearchMeta = { scanned: 0, withCalendars: 0, matchedWriters: 0, skippedNoCalendar: 0 };
  if (calendarKeywordSearchInput) calendarKeywordSearchInput.value = "";
  if (calendarReportPanel) calendarReportPanel.classList.add("hidden");
  renderCalendarKeywordSearchResults();
};

const runCalendarKeywordSearch = async () => {
  const keyword = (calendarKeywordSearchInput?.value || "").trim().toLowerCase();
  if (!keyword) {
    setCalendarEventsStatus("Enter a keyword to search calendar events.", true);
    lastCalendarKeywordSearch = "";
    lastCalendarKeywordSearchResults = [];
    lastCalendarKeywordSearchMeta = { scanned: 0, withCalendars: 0, matchedWriters: 0, skippedNoCalendar: 0 };
    lastCalendarKeywordSearchScopeLabel = "all published writers";
    renderCalendarKeywordSearchResults();
    return;
  }

  const allPublishedWriters = getPublishedCalendarWriters();
  const writers =
    selectedCalendarWriterId && selectedCalendarWriterId !== ALL_CALENDAR_WRITERS_ID
      ? allPublishedWriters.filter((writer) => writer.id === selectedCalendarWriterId)
      : allPublishedWriters;
  let scanned = 0;
  let withCalendars = 0;
  let skippedNoCalendar = 0;
  const grouped = [];
  const selectedWriter = allPublishedWriters.find((writer) => writer.id === selectedCalendarWriterId);
  const scopeLabel =
    selectedCalendarWriterId && selectedCalendarWriterId !== ALL_CALENDAR_WRITERS_ID
      ? `${selectedWriter?.name || "selected writer"}`
      : "all published writers";

  setCalendarEventsStatus(`Searching ${scopeLabel} calendar${writers.length === 1 ? "" : "s"} for "${keyword}"...`);
  if (calendarReportPanel) calendarReportPanel.classList.add("hidden");

  for (const writer of writers) {
    scanned += 1;
    if (!writer.calendarId) {
      skippedNoCalendar += 1;
      continue;
    }
    withCalendars += 1;

    try {
      let events = [];
      const cached = writerCalendarEventsCache.get(writer.id);
      if (cached && Date.now() - cached.cachedAt < 5 * 60 * 1000) {
        events = cached.events || [];
      } else {
        const icsText = await fetchIcloudIcsText(writer.calendarId);
        const windowStart = new Date();
        windowStart.setMonth(windowStart.getMonth() - 12);
        const windowEnd = new Date();
        windowEnd.setMonth(windowEnd.getMonth() + 12);
        events = parseIcsCalendarEvents(icsText, windowStart, windowEnd);
        writerCalendarEventsCache.set(writer.id, { cachedAt: Date.now(), events });
      }

      const matches = events
        .filter((evt) => getCalendarEventSearchText(evt).includes(keyword))
        .sort((a, b) => a.start - b.start);
      if (matches.length) {
        grouped.push({
          writerId: writer.id,
          writerName: writer.name || "Unnamed",
          roster: writer.roster || "",
          matches,
        });
      }
    } catch (_error) {
      // Ignore individual calendar failures for keyword search; keep scanning.
    }
  }

  grouped.sort((a, b) => b.matches.length - a.matches.length || a.writerName.localeCompare(b.writerName));

  lastCalendarKeywordSearch = keyword;
  lastCalendarKeywordSearchResults = grouped;
  lastCalendarKeywordSearchMeta = {
    scanned,
    withCalendars,
    matchedWriters: grouped.length,
    skippedNoCalendar,
  };
  lastCalendarKeywordSearchScopeLabel = scopeLabel;

  renderCalendarKeywordSearchResults();
  setCalendarEventsStatus(
    grouped.length
      ? `Keyword search complete (${scopeLabel}). ${grouped.length} writer(s) matched "${keyword}".`
      : `Keyword search complete (${scopeLabel}). No matches for "${keyword}".`,
    false
  );
};

const getBriefSessionMatchScore = (brief, session) => {
  const briefTags = new Set([...(brief.requiredTags || []), ...(brief.seeking || [])]);
  const sessionTags = new Set([...(session.requiredTags || []), ...(session.seeking || [])]);
  if (!briefTags.size) return 0;
  const overlap = Array.from(briefTags).filter((tag) => sessionTags.has(tag)).length;
  const base = overlap / briefTags.size;
  const sameLocation =
    brief.location &&
    session.location &&
    String(brief.location).toLowerCase() === String(session.location).toLowerCase();
  return base + (sameLocation ? 0.15 : 0);
};

const autoAssignSingleBrief = (brief, sessions) => {
  if ((brief.briefType || "hybrid") === "song_search") {
    return { ...brief, status: "open", assignedSessionId: "" };
  }
  const sorted = [...sessions]
    .map((session) => ({ session, score: getBriefSessionMatchScore(brief, session) }))
    .sort((a, b) => b.score - a.score);
  const best = sorted[0];
  if (!best || best.score < 0.4) {
    return { ...brief, status: "open", assignedSessionId: "" };
  }
  return {
    ...brief,
    status: "assigned",
    assignedSessionId: best.session.id,
  };
};

const buildSessionFromBrief = (brief) => ({
  id: `brief:${brief.id}`,
  title: brief.title || brief.briefText || "Brief Session",
  briefText: brief.briefText || "",
  location: brief.location || "",
  seeking: normalizeRoles(brief.seeking || []),
  includePublished: false,
  publishedOnly: false,
  requiredTags: unique([...(brief.requiredTags || []), ...(brief.seeking || [])]),
  priorityTags: [],
  schedule: null,
});

const getNeedWeight = (needLevel) => {
  if (needLevel === "urgent") return 1.0;
  if (needLevel === "high") return 0.8;
  if (needLevel === "low") return 0.35;
  return 0.6;
};

const getBriefActionLabel = (action) => {
  const labels = {
    search_songs: "Search songs now",
    assign_existing_session: "Assign to existing session",
    create_session_now: "Create new session now",
    search_then_create: "Search songs, then create session",
  };
  return labels[action] || "Review brief";
};

const runBriefPlan = (brief) => {
  const sessions = loadSessions();
  const songwriters = loadSongwriters();
  const sessionLike = buildSessionFromBrief(brief);
  const candidates = getTopCandidates(sessionLike, songwriters, 8);
  const strongCandidates = candidates.filter((c) => c.score >= 55);
  const assignPreview = autoAssignSingleBrief(brief, sessions);
  const hasAssignableSession = assignPreview.status === "assigned";
  const needWeight = getNeedWeight(brief.needLevel || "medium");

  const roleCoverage = brief.seeking?.length
    ? brief.seeking.filter((role) =>
        songwriters.some((w) => (w.roles || []).includes(role))
      ).length / brief.seeking.length
    : 0.5;

  let action = "search_then_create";
  let summary = "Search existing songs first, then create a new session if no strong fit is found.";

  if (brief.briefType === "song_search") {
    action = "search_songs";
    summary = "Run catalog/song search first using this brief's direction tags and seeking roles.";
  } else if (brief.briefType === "new_session") {
    action = "create_session_now";
    summary = "Create a new session now from this brief.";
  } else {
    if (hasAssignableSession && needWeight >= 0.6) {
      action = "assign_existing_session";
      summary = "Assign to an existing open session that overlaps this brief.";
    } else if (strongCandidates.length >= 2 && roleCoverage >= 0.4) {
      action = "create_session_now";
      summary = "Talent coverage is strong enough to create a new session now.";
    }
  }

  return {
    action,
    actionLabel: getBriefActionLabel(action),
    summary,
    generatedAt: Date.now(),
    bestSessionId: hasAssignableSession ? assignPreview.assignedSessionId : "",
    strongCandidateCount: strongCandidates.length,
    roleCoverage: Math.round(roleCoverage * 100),
  };
};

const renderBriefs = () => {
  if (!briefList || !briefTemplate) return;
  const briefs = loadBriefs();
  const sessions = loadSessions();
  const query = (briefSearchInput?.value || "").trim().toLowerCase();

  briefList.innerHTML = "";
  const filtered = briefs
    .filter((brief) => matchesBriefSearch(brief, query))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  if (!filtered.length) {
    briefList.innerHTML = "<p class='hint'>No briefs found.</p>";
    return;
  }

  filtered.forEach((brief) => {
    const node = briefTemplate.content.cloneNode(true);
    const state = brief.status || "open";
    const linkedSession = sessions.find((s) => s.id === (brief.assignedSessionId || brief.createdSessionId));

    node.querySelector(".brief-title").textContent = brief.title || "Untitled brief";
    node.querySelector(".brief-state").textContent = state;
    node.querySelector(".brief-meta").textContent =
      `Source: ${brief.source || "other"} | Type: ${brief.briefType || "hybrid"} | Need: ${brief.needLevel || "medium"} | Requester: ${brief.requester || "n/a"} | Location: ${brief.location || "n/a"}`;
    node.querySelector(".brief-seeking").textContent = `Seeking: ${(brief.seeking || []).join(", ") || "none"}`;
    node.querySelector(".brief-summary").textContent = `Brief: ${brief.briefText || ""}`;
    const planSummary = brief.plan
      ? `${brief.plan.actionLabel || getBriefActionLabel(brief.plan.action)}: ${brief.plan.summary} (Role coverage: ${brief.plan.roleCoverage || 0}%, strong fits: ${brief.plan.strongCandidateCount || 0})`
      : "Plan: not run yet.";
    node.querySelector(".brief-plan").textContent = planSummary;
    node.querySelector(".brief-linkage").textContent = linkedSession
      ? `Linked session: ${linkedSession.title || "Untitled pairing"}`
      : "Linked session: none";

    node.querySelector(".brief-run-plan").dataset.briefId = brief.id;
    node.querySelector(".brief-create-session").dataset.briefId = brief.id;
    node.querySelector(".brief-assign-session").dataset.briefId = brief.id;

    briefList.append(node);
  });
};

const getTagMatchParts = (writer, session) => {
  const sessionSeeking = normalizeRoles(session.seeking || []);
  const required = (session.requiredTags || []).filter(
    (tag) => !sessionSeeking.includes(tag) && !SEEKING_OPTIONS.includes(tag)
  );
  const priority = session.priorityTags || [];
  const writerTags = writer.tags || [];
  const hasMatch = (tag) => {
    const normalizedTag = String(tag || "").trim().toLowerCase();
    if (SEEKING_OPTIONS.includes(normalizedTag)) {
      return writerMatchesSeekingRole(writer, normalizedTag);
    }
    return writerTags.some((writerTag) => tagMatchesQuery(writerTag, normalizedTag));
  };
  const seekingMatches = sessionSeeking.filter((role) => hasMatch(role));

  const requiredMatches = required.filter((tag) => hasMatch(tag));
  const priorityMatches = priority.filter((tag) => hasMatch(tag));

  const requiredCoverage = required.length ? requiredMatches.length / required.length : 0;
  const priorityCoverage = priority.length ? priorityMatches.length / priority.length : 0;
  const seekingCoverage = sessionSeeking.length ? seekingMatches.length / sessionSeeking.length : 1;

  return {
    seekingMatches,
    seekingCoverage,
    requiredMatches,
    priorityMatches,
    requiredCoverage,
    priorityCoverage,
  };
};

const getFitScore = (writer, session) => {
  const parts = getTagMatchParts(writer, session);
  const hasDirectionTags = (session.requiredTags || []).some(
    (tag) => !SEEKING_OPTIONS.includes(tag) && !normalizeRoles(session.seeking || []).includes(tag)
  );
  if (!hasDirectionTags && !(session.priorityTags || []).length) {
    return Math.round(parts.seekingCoverage * 100);
  }
  return Math.round(
    (parts.requiredCoverage * 0.7 + parts.seekingCoverage * 0.2 + parts.priorityCoverage * 0.1) * 100
  );
};

const getFitLabel = (score) => {
  if (score >= 90) return "Excellent fit";
  if (score >= 75) return "Strong fit";
  if (score >= 55) return "Good option";
  return "Stretch";
};

const summarizeReasons = (parts, session) => {
  const lines = [];
  const sessionSeeking = normalizeRoles(session.seeking || []);
  const directionTags = (session.requiredTags || []).filter(
    (tag) => !sessionSeeking.includes(tag) && !SEEKING_OPTIONS.includes(tag)
  );

  if (sessionSeeking.length) {
    if (parts.seekingMatches.length) {
      lines.push(`Seeking matched (${parts.seekingMatches.length}/${sessionSeeking.length}): ${parts.seekingMatches.join(", ")}`);
    } else {
      lines.push("Seeking matched (0): none");
    }
  }

  if (parts.requiredMatches.length) {
    lines.push(`Brief tags matched (${parts.requiredMatches.length}/${directionTags.length}): ${parts.requiredMatches.join(", ")}`);
  } else {
    lines.push("No brief tags matched.");
  }

  if (session.priorityTags.length) {
    if (parts.priorityMatches.length) {
      lines.push(`Priority tags matched (${parts.priorityMatches.length}/${session.priorityTags.length}): ${parts.priorityMatches.join(", ")}`);
    } else {
      lines.push("No priority tags matched.");
    }
  }

  return lines.join(" | ");
};

const getTopCandidates = (session, songwriters, max = Number.POSITIVE_INFINITY) => {
  const sessionSeeking = normalizeRoles(session.seeking || []);
  const publishedRoleMinimums = normalizePublishedRoleMinimums(session.publishedRoleMinimums);
  const requiredPublishedCount = Object.values(publishedRoleMinimums).reduce((sum, n) => sum + n, 0);
  const effectiveMax = Math.max(max, requiredPublishedCount || 0);
  const sessionLocationTag = (() => {
    const normalized = normalizeLocationText(session.location || "");
    if (!normalized || isNeutralLocation(normalized)) return "";
    if (isRemoteLocation(normalized)) return "remote";
    return getMajorCityCategory(normalized) || normalized;
  })();
  const briefOnlyTags = (session.requiredTags || []).filter((tag) => {
    const normalizedTag = normalizeLocationText(tag);
    if (!normalizedTag) return false;
    if (SEEKING_OPTIONS.includes(normalizedTag)) return false;
    if (sessionLocationTag && normalizedTag === sessionLocationTag) return false;
    return true;
  });
  const requiresBriefMatch = briefOnlyTags.length > 0;
  const briefOnlyTagSet = new Set(briefOnlyTags.map((tag) => normalizeLocationText(tag)));

  const scored = [...songwriters]
    .filter((writer) => (session.publishedOnly ? writer.published : true))
    .filter((writer) => writerMatchesSessionLocation(writer, session.location))
    .filter((writer) => {
      if (!sessionSeeking.length) return true;
      return sessionSeeking.some((role) => writerMatchesSeekingRole(writer, role));
    })
    .map((writer) => {
      const parts = getTagMatchParts(writer, session);
      return {
        writer,
        score: getFitScore(writer, session),
        parts,
        briefMatchCount: parts.requiredMatches.filter((matchedTag) =>
          briefOnlyTagSet.has(normalizeLocationText(matchedTag))
        ).length,
        reasons: summarizeReasons(parts, session),
      };
    })
    .filter((entry) => {
      if (requiresBriefMatch) return entry.briefMatchCount > 0;
      return entry.score >= MIN_FIT_SCORE;
    })
    .sort((a, b) => b.score - a.score);

  if (session.includePublished && !session.publishedOnly) {
    const firstPublishedIndex = scored.findIndex((entry) => entry.writer.published);
    if (firstPublishedIndex > 0) {
      const [firstPublished] = scored.splice(firstPublishedIndex, 1);
      scored.unshift(firstPublished);
    }
  }

  if (!Object.keys(publishedRoleMinimums).length) {
    return scored.slice(0, effectiveMax || max);
  }

  const selected = [];
  const selectedIds = new Set();

  Object.entries(publishedRoleMinimums).forEach(([role, count]) => {
    let added = 0;
    for (const entry of scored) {
      if (added >= count) break;
      if (selectedIds.has(entry.writer.id)) continue;
      if (!entry.writer.published) continue;
      if (!writerMatchesSeekingRole(entry.writer, role)) continue;
      selected.push(entry);
      selectedIds.add(entry.writer.id);
      added += 1;
    }
  });

  for (const entry of scored) {
    if (selected.length >= (effectiveMax || max)) break;
    if (selectedIds.has(entry.writer.id)) continue;
    selected.push(entry);
    selectedIds.add(entry.writer.id);
  }

  return selected.slice(0, effectiveMax || max);
};

const evaluatePublishedRoleMinimums = (session, candidates) => {
  const minimums = normalizePublishedRoleMinimums(session.publishedRoleMinimums);
  const entries = Object.entries(minimums);
  if (!entries.length) return { requested: 0, met: 0, unmet: [] };

  let requested = 0;
  let met = 0;
  const unmet = [];

  entries.forEach(([role, needed]) => {
    requested += needed;
    const actual = candidates.filter((entry) => {
      if (!entry.writer.published) return false;
      return writerMatchesSeekingRole(entry.writer, role);
    }).length;
    met += Math.min(actual, needed);
    if (actual < needed) unmet.push(`${role} ${actual}/${needed}`);
  });

  return { requested, met, unmet };
};

const writerMatchesSeekingRole = (writer, role) => {
  const normalizedRole = String(role || "").trim().toLowerCase();
  if (!normalizedRole) return false;
  const equivalents = ROLE_SEARCH_EQUIVALENTS[normalizedRole] || [normalizedRole];
  const roles = writer.roles || [];
  const tags = writer.tags || [];
  return equivalents.some(
    (candidateRole) =>
      roles.includes(candidateRole) ||
      tags.some((tag) => tagMatchesQuery(tag, candidateRole))
  );
};

const buildCandidateNode = (entry, index, availabilityByWriterId) => {
  const c = candidateTemplate.content.cloneNode(true);
  const availability = availabilityByWriterId.get(entry.writer.id) || {
    status: "error",
    summary: "availability check failed",
  };
  const isAvailable = availability.status === "available";
  const isCheckWithWriter = availability.status === "check-with-writer";
  const isNonPublished = availability.status === "unavailable-access";
  const availabilityLabel = isAvailable
    ? "Available"
    : isCheckWithWriter
      ? "Check with Writer"
      : "Not available";
  const availabilityDetail = availability.summary && !isCheckWithWriter ? ` (${availability.summary})` : "";
  c.querySelector(".candidate-name").textContent = `${index + 1}. ${entry.writer.name}`;
  c.querySelector(".candidate-score").textContent = `${entry.score}% ${getFitLabel(entry.score)}`;
  c.querySelector(".candidate-meta").textContent =
    `Location: ${entry.writer.location || "unknown"} | Preferred: ${entry.writer.preferredContact || "email"} | Personal: ${entry.writer.personalContact || "n/a"} | Manager: ${entry.writer.managerContact || "n/a"}`;
  const availabilityNode = c.querySelector(".candidate-availability");
  availabilityNode.textContent = isNonPublished
    ? (availability.summary || "Contact writer for Avails")
    : `Availability: ${availabilityLabel}${availabilityDetail}`;
  availabilityNode.classList.add(
    isAvailable ? "available" : isCheckWithWriter ? "pending" : "unavailable"
  );
  c.querySelector(".candidate-reason").textContent =
    `${entry.reasons} | Bio: ${entry.writer.bio || "No bio available."}`;
  return c;
};

const renderLatestSessionResult = async () => {
  const renderId = ++latestRenderCycle;
  const sessions = loadSessions();
  const latest = sessions.find((s) => s.id === latestRenderedSessionId);
  sessionsList.innerHTML = "";
  latestRenderedCandidates = [];

  if (!showLatestPairingResults || !latest || !latestRenderedSessionId) {
    generateReportButton.disabled = true;
    reportPanel.classList.add("hidden");
    sessionsList.innerHTML = "";
    if (pairingResultsCard) pairingResultsCard.classList.add("hidden");
    if (seeMorePairingResultsButton) seeMorePairingResultsButton.classList.add("hidden");
    return;
  }
  if (pairingResultsCard) pairingResultsCard.classList.remove("hidden");

  const allSongwriters = loadSongwriters();
  const allCandidates = getTopCandidates(latest, allSongwriters);
  let candidates = allCandidates.slice(0, visiblePairingResultsCount);
  const settings = loadGoogleSettings();
  const availabilityByWriterId = new Map();

  if (candidates.length) {
    const availabilityChecks = await Promise.all(
      candidates.map(async (entry) => {
        if (!entry.writer.published) {
          const roster = (entry.writer.roster || "Roster").trim();
          const personal = (entry.writer.personalContact || "n/a").trim();
          return [
            entry.writer.id,
            {
              status: "unavailable-access",
              summary: `Contact ${roster} and ${personal} for Avails`,
            },
          ];
        }
        if (!entry.writer.calendarId) {
          return [entry.writer.id, { status: "check-with-writer", summary: "Check with Writer" }];
        }
        try {
          const availability = await getAvailabilityForWriter(
            entry.writer,
            latest.schedule || {},
            settings.studioCalendarIds || []
          );
          return [entry.writer.id, availability];
        } catch (_error) {
          return [entry.writer.id, { status: "error", summary: "availability check failed" }];
        }
      })
    );
    availabilityChecks.forEach(([writerId, availability]) => {
      availabilityByWriterId.set(writerId, availability);
    });
  }

  if (renderId !== latestRenderCycle) return;

  const node = sessionTemplate.content.cloneNode(true);
  node.querySelector(".session-title").textContent = latest.title;
  node.querySelector(".score-pill").textContent = "Latest Pairing";
  node.querySelector(".session-meta").textContent = "";
  node.querySelector(".session-extra").textContent = "";

  const candidateList = node.querySelector(".candidate-list");

  if (!allSongwriters.length) {
    candidateList.innerHTML = "<p class='hint'>Add songwriters with tags to generate matches.</p>";
  } else if (!candidates.length) {
    candidateList.innerHTML = "<p class='hint'>No matches at or above 40% fit.</p>";
    activeCandidateFilterKey = "";
  } else {
    const seekingRoles = normalizeRoles(latest.seeking || []);
    if (seekingRoles.length >= 2) {
      const allRolesMatches = candidates.filter((entry) =>
        seekingRoles.every((role) => writerMatchesSeekingRole(entry.writer, role))
      );
      const combinedTitle =
        seekingRoles.length === 2
          ? `${formatLocationLabel(seekingRoles[0])} + ${formatLocationLabel(seekingRoles[1])}`
          : "All selected roles";
      const groups = [
        {
          key: "all-selected-seeking",
          title: combinedTitle,
          entries: allRolesMatches,
          empty: "No writers match all selected roles.",
        },
        ...seekingRoles.map((role) => ({
          key: `role:${role}`,
          title: formatLocationLabel(role),
          entries: candidates.filter((entry) => writerMatchesSeekingRole(entry.writer, role)),
          empty: `No ${role} matches.`,
        })),
      ];
      const filterBar = document.createElement("div");
      filterBar.className = "candidate-filter-bar";
      const list = document.createElement("div");
      list.className = "candidate-list";

      const renderGroup = (groupIndex) => {
        list.innerHTML = "";
        const group = groups[groupIndex];
        if (!group || !group.entries.length) {
          list.innerHTML = `<p class="hint">${group?.empty || "No matches."}</p>`;
          return;
        }
        group.entries.forEach((entry, index) => {
          list.append(buildCandidateNode(entry, index, availabilityByWriterId));
        });
      };

      const activeGroupIndex = Math.max(
        0,
        groups.findIndex((group) => group.key === activeCandidateFilterKey)
      );

      groups.forEach((group, groupIndex) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "ghost candidate-filter-btn";
        btn.textContent = group.title;
        if (groupIndex === activeGroupIndex) btn.classList.add("active");
        btn.addEventListener("click", () => {
          filterBar.querySelectorAll(".candidate-filter-btn").forEach((node) => {
            node.classList.remove("active");
          });
          btn.classList.add("active");
          activeCandidateFilterKey = group.key;
          renderGroup(groupIndex);
        });
        filterBar.append(btn);
      });

      activeCandidateFilterKey = groups[activeGroupIndex]?.key || "";
      renderGroup(activeGroupIndex);
      candidateList.append(filterBar);
      candidateList.append(list);
    } else {
      activeCandidateFilterKey = "";
      candidates.forEach((entry, index) => {
        candidateList.append(buildCandidateNode(entry, index, availabilityByWriterId));
      });
    }
  }

  latestRenderedCandidates = candidates;
  generateReportButton.disabled = false;
  if (seeMorePairingResultsButton) {
    const hasMore = allCandidates.length > candidates.length;
    seeMorePairingResultsButton.classList.toggle("hidden", !hasMore);
    seeMorePairingResultsButton.disabled = !hasMore;
  }
  sessionsList.append(node);
};

const buildPairingReport = (candidates) => {
  if (!candidates.length) {
    return "No candidates met the 40% fit threshold.";
  }

  const lines = [];
  candidates.forEach((entry, index) => {
    lines.push(`${index + 1}. Name: ${entry.writer.name}`);
    lines.push(`Bio: ${entry.writer.bio || "No bio provided."}`);
    lines.push("");
  });

  return lines.join("\n");
};

const renderOpenPairings = () => {
  if (!openPairingsList || !openPairingTemplate) return;
  const open = getOpenPairings();
  openPairingsList.innerHTML = "";

  if (!open.length) {
    if (openPairingsCard) openPairingsCard.classList.add("hidden");
    return;
  }

  if (openPairingsCard) openPairingsCard.classList.remove("hidden");

  open.forEach((session) => {
    const node = openPairingTemplate.content.cloneNode(true);
    node.querySelector(".open-pairing-title").textContent = session.title || "Untitled pairing";
    node.querySelector(".open-pairing-state").textContent = session.status || PAIRING_STATUS.pending;
    node.querySelector(".open-pairing-meta").textContent =
      `Created: ${new Date(session.createdAt).toLocaleString()} | Location: ${session.location} | Tags: ${(session.requiredTags || []).join(", ")}`;
    node.querySelector(".open-pairing-extra").textContent =
      session.approvalNotes ? `Approval notes: ${session.approvalNotes}` : "Awaiting approval workflow.";

    const viewBtn = node.querySelector(".view-pairing");
    const approveBtn = node.querySelector(".approve-pairing");
    const declineBtn = node.querySelector(".decline-pairing");
    const moveBtn = node.querySelector(".move-pairing-to-schedule");

    viewBtn.dataset.sessionId = session.id;
    approveBtn.dataset.sessionId = session.id;
    declineBtn.dataset.sessionId = session.id;
    moveBtn.dataset.sessionId = session.id;

    openPairingsList.append(node);
  });
};

const generateLatestPairingReport = () => {
  const latest = loadSessions().find((s) => s.id === latestRenderedSessionId);
  if (!latest) return false;

  const candidates = latestRenderedCandidates.length
    ? latestRenderedCandidates
    : getTopCandidates(latest, loadSongwriters(), visiblePairingResultsCount);

  const report = buildPairingReport(candidates);
  reportOutput.textContent = report;
  reportPanel.classList.remove("hidden");

  const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
  downloadReportLink.href = URL.createObjectURL(blob);
  downloadReportLink.download = `pairing-report-${Date.now()}.txt`;
  return true;
};

const upsertScheduleRequest = (sessionId, writerId) => {
  const session = loadSessions().find((s) => s.id === sessionId);
  const writer = loadSongwriters().find((w) => w.id === writerId);
  if (!session || !writer) return { ok: false, reason: "Session or songwriter missing." };

  const requests = loadScheduleRequests();
  const exists = requests.find((r) => r.sessionId === sessionId && r.writerId === writerId);
  if (exists) {
    return { ok: false, reason: `${writer.name} is already in Schedule.` };
  }

  requests.unshift({
    id: crypto.randomUUID(),
    sessionId,
    writerId,
    writerName: writer.name,
    writerPreferredContact: writer.preferredContact || "email",
    writerPersonalContact: writer.personalContact || "",
    writerManagerContact: writer.managerContact || "",
    location: session.location,
    sessionBrief: session.briefText || session.title,
    schedule: session.schedule || null,
    status: "approved",
    sentVia: "",
    sentAt: null,
    confirmedAt: null,
    availabilityStatus: "not-checked",
    availabilitySummary: "Not checked yet.",
    availabilityCheckedAt: null,
    availabilityFirstDate: "",
    calendarEventId: "",
    calendarEventLink: "",
    calendarEventCreatedAt: null,
    createdAt: Date.now(),
  });

  saveScheduleRequests(requests);
  return { ok: true, reason: `Added ${writer.name} to Schedule.` };
};

const movePairingToSchedule = (sessionId) => {
  const session = loadSessions().find((s) => s.id === sessionId);
  if (!session) return { ok: false, reason: "Pairing not found." };
  if (session.status === PAIRING_STATUS.declined) {
    return { ok: false, reason: "Declined pairings cannot move to schedule." };
  }

  const songwriters = loadSongwriters();
  const candidates = getTopCandidates(session, songwriters);
  if (!candidates.length) return { ok: false, reason: "No candidates available to move." };

  let moved = 0;
  candidates.forEach((entry) => {
    const result = upsertScheduleRequest(sessionId, entry.writer.id);
    if (result.ok) moved += 1;
  });

  updateSession(sessionId, (current) => ({
    ...current,
    status: PAIRING_STATUS.moved,
    movedToScheduleAt: Date.now(),
    candidateWriterIds: candidates.map((c) => c.writer.id),
    auditTrail: appendSessionAudit(current, `Moved to schedule (${moved} request(s)).`),
  }));

  return { ok: true, reason: `Moved pairing to schedule with ${moved} request(s).` };
};

const buildOutreachMessage = (request) => {
  const schedule = request.schedule || {};
  const timeLine = schedule.mode === "specific"
    ? (schedule.specificDate || "TBD")
    : schedule.startDate && schedule.endDate
      ? `${schedule.startDate} to ${schedule.endDate}`
      : "TBD";

  const subject = `Session Request: ${request.location}`;
  const body = [
    `Hi ${request.writerName},`,
    "",
    "You are requested for a writing session.",
    `Location: ${request.location}`,
    `Time window: ${timeLine}`,
    `Session brief: ${request.sessionBrief}`,
    "",
    "Please confirm your availability.",
  ].join("\n");

  return { subject, body };
};

const openPreferredOutreach = (request) => {
  const { subject, body } = buildOutreachMessage(request);
  const preferred = request.writerPreferredContact === "text" ? "text" : "email";

  const personal = request.writerPersonalContact || "";
  const manager = request.writerManagerContact || "";

  if (preferred === "email") {
    const email = looksLikeEmail(personal) ? personal : looksLikeEmail(manager) ? manager : "";
    if (!email) return { ok: false, reason: `No email found for ${request.writerName}.` };

    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_blank");
    return { ok: true, via: "email" };
  }

  const phone = cleanPhone(personal) || cleanPhone(manager);
  if (!phone) return { ok: false, reason: `No phone found for ${request.writerName}.` };

  const sms = `sms:${encodeURIComponent(phone)}?body=${encodeURIComponent(body)}`;
  window.open(sms, "_blank");
  return { ok: true, via: "text" };
};

const checkAvailabilityForRequest = async (request) => {
  const writer = loadSongwriters().find((w) => w.id === request.writerId);
  if (!writer) return { ok: false, status: "error", summary: "Songwriter record missing." };
  if (!request.schedule) return { ok: false, status: "error", summary: "Schedule window missing." };
  if (!writer.published) {
    return {
      ok: false,
      status: "unavailable-access",
      summary: "Calendar access unavailable (non-published writer).",
    };
  }
  if (!writer.calendarId) {
    return { ok: false, status: "check-with-writer", summary: "Check with Writer" };
  }
  const settings = loadGoogleSettings();
  try {
    const availability = await getAvailabilityForWriter(writer, request.schedule, settings.studioCalendarIds);
    if (availability.status === "available") {
      const firstDate = availability.slots?.[0]?.start
        ? availability.slots[0].start.toISOString().slice(0, 10)
        : "";
      return { ok: true, status: "available", summary: availability.summary, firstDate };
    }
    return {
      ok: false,
      status: availability.status || "busy",
      summary: availability.summary || "No shared opening in selected window.",
    };
  } catch (_error) {
    return { ok: false, status: "error", summary: "Availability check failed." };
  }
};

const renderSchedule = () => {
  if (!scheduleList) return;
  const requests = loadScheduleRequests().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  scheduleList.innerHTML = "";

  if (!requests.length) {
    scheduleList.innerHTML = "<p class='hint'>Approve candidates in Pairing to start schedule outreach.</p>";
    return;
  }

  requests.forEach((request) => {
    const node = scheduleTemplate.content.cloneNode(true);
    node.querySelector(".schedule-title").textContent = request.writerName;
    node.querySelector(".schedule-state").textContent = request.status;

    const schedule = request.schedule || {};
    const when = schedule.mode === "specific"
      ? (schedule.specificDate || "TBD")
      : schedule.startDate && schedule.endDate
        ? `${schedule.startDate} -> ${schedule.endDate}`
        : "TBD";

    node.querySelector(".schedule-meta").textContent =
      `Preferred outreach: ${request.writerPreferredContact} | Location: ${request.location} | Window: ${when}`;

    const statusLine = [
      `Brief: ${request.sessionBrief}`,
      `Availability: ${request.availabilitySummary || "Not checked yet."}`,
      request.sentAt ? `Sent: ${new Date(request.sentAt).toLocaleString()} (${request.sentVia})` : "Outreach not sent",
      request.confirmedAt ? `Confirmed: ${new Date(request.confirmedAt).toLocaleString()}` : "Not confirmed",
      request.calendarEventId ? "Calendar event created" : "Calendar event not created",
      request.calendarEventLink ? `Event link: ${request.calendarEventLink}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    node.querySelector(".schedule-message").textContent = statusLine;

    node.querySelector(".check-availability").dataset.requestId = request.id;
    node.querySelector(".send-outreach").dataset.requestId = request.id;
    node.querySelector(".mark-confirmed").dataset.requestId = request.id;
    node.querySelector(".remove-request").dataset.requestId = request.id;

    scheduleList.append(node);
  });
};

if (briefForm) {
  briefForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("brief-title").value.trim();
    const source = document.getElementById("brief-source").value;
    const requester = document.getElementById("brief-requester").value.trim();
    const locationRaw = document.getElementById("brief-location").value.trim();
    const location = locationRaw.toLowerCase();
    const briefType = briefTypeInput?.value || "hybrid";
    const needLevel = briefNeedLevelInput?.value || "medium";
    const briefText = document.getElementById("brief-text").value.trim();
    const seeking = getSelectedBriefSeeking();

    if (!title || !briefText) {
      setBriefStatus("Brief title and session brief are required.", true);
      return;
    }

    const directionTags = extractTagsFromBrief(briefText);
    const requiredTags = location
      ? ensureLocationTag(unique([...directionTags, ...seeking]), location)
      : unique([...directionTags, ...seeking]);

    const briefs = loadBriefs();
    briefs.unshift({
      id: crypto.randomUUID(),
      title,
      source,
      requester,
      location,
      briefText,
      seeking,
      requiredTags,
      briefType,
      needLevel,
      plan: null,
      status: "open",
      assignedSessionId: "",
      createdSessionId: "",
      createdAt: Date.now(),
    });

    saveBriefs(briefs);
    setBriefStatus(`Saved brief: ${title}`);
    resetBriefForm();
    setAddBriefOpen(false);
    renderBriefs();
  });
}

songwriterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const songwriter = {
    id: editingSongwriterId || crypto.randomUUID(),
    name: document.getElementById("writer-name").value.trim(),
    location: document.getElementById("writer-location").value.trim().toLowerCase(),
    personalContact: document.getElementById("writer-personal-contact").value.trim(),
    managerContact: document.getElementById("writer-manager-contact").value.trim(),
    preferredContact: document.getElementById("writer-preferred-contact").value,
    calendarProvider: document.getElementById("writer-calendar-provider").value,
    published: document.getElementById("writer-published").checked,
    roles: getWriterRolesFromInputs(),
    tags: ensureLocationTag(
      normalizeList(document.getElementById("writer-tags").value),
      document.getElementById("writer-location").value
    ),
    bio: document.getElementById("writer-bio").value.trim(),
    notes: document.getElementById("writer-notes").value.trim(),
    roster: document.getElementById("writer-roster").value.trim(),
    calendarName: document.getElementById("writer-calendar-name").value.trim(),
    calendarId: document.getElementById("writer-calendar-id").value.trim(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const songwriters = loadSongwriters();

  if (editingSongwriterId) {
    const idx = songwriters.findIndex((w) => w.id === editingSongwriterId);
    if (idx !== -1) {
      songwriter.createdAt = songwriters[idx].createdAt || songwriter.createdAt;
      songwriter.updatedAt = Date.now();
      songwriters[idx] = songwriter;
    }
  } else {
    songwriters.push(songwriter);
  }

  saveSongwriters(songwriters);
  songwriterStatus.textContent = editingSongwriterId ? `Updated ${songwriter.name}.` : `Added ${songwriter.name}.`;
  resetSongwriterForm();
  setAddSongwriterFormOpen(false);
  renderSongwriters();
  renderLatestSessionResult();
  switchView("songwriters");
});

sessionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  persistGoogleSettingsFromUi();
  if (sessionLocationStatus) sessionLocationStatus.textContent = "";

  const brief = document.getElementById("session-title").value.trim();
  const seeking = getSelectedSeeking();
  const location = document.getElementById("session-location").value.trim().toLowerCase();
  const scheduleMode = scheduleModeInput.value;
  const specificDate = sessionDateSpecificInput.value;
  const startDate = sessionDateStartInput.value;
  const endDate = sessionDateEndInput.value;
  const allowWeekends = allowWeekendsInput.checked;
  const includePublished = Boolean(includePublishedInput?.checked);
  const publishedOnly = Boolean(publishedOnlyInput?.checked);
  const publishedRoleMinimums = getPublishedRoleMinimums();

  if (!brief) {
    sessionStatus.textContent = "Add a session brief.";
    return;
  }
  if (!seeking.length) {
    sessionStatus.textContent = "Select at least one Seeking option.";
    return;
  }
  if (includePublished && publishedOnly) {
    sessionStatus.textContent = "Choose either INCLUDE PUBLISHED WRITER or ONLY INCLUDE PUBLISHED WRITERS.";
    return;
  }
  const invalidPublishedRoleMinimum = Object.keys(publishedRoleMinimums).find(
    (role) => !seeking.includes(role)
  );
  if (invalidPublishedRoleMinimum) {
    sessionStatus.textContent = `Published roster slot "${invalidPublishedRoleMinimum}" must also be selected in Seeking.`;
    return;
  }
  if (!location) {
    if (sessionLocationStatus) {
      sessionLocationStatus.textContent = "need location";
    } else {
      sessionStatus.textContent = "need location";
    }
    sessionLocationInput?.focus();
    return;
  }
  if (!scheduleMode) {
    sessionStatus.textContent = "need date(s)";
    return;
  }
  if (scheduleMode === "specific" && !specificDate) {
    sessionStatus.textContent = "Pick a specific date.";
    return;
  }
  if (scheduleMode === "specific" && specificDate && !allowWeekends) {
    const picked = new Date(`${specificDate}T00:00:00`);
    if (picked.getDay() === 0 || picked.getDay() === 6) {
      sessionStatus.textContent = "Weekend sessions are disabled unless special case is enabled.";
      return;
    }
  }
  if (scheduleMode === "range" && (!startDate || !endDate)) {
    sessionStatus.textContent = "Pick start and end dates.";
    return;
  }
  if (scheduleMode === "range" && endDate < startDate) {
    sessionStatus.textContent = "End date must be on/after start date.";
    return;
  }

  const directionTags = extractTagsFromBrief(brief);
  const requiredTags = ensureLocationTag(unique([...directionTags]), location);

  const session = {
    id: crypto.randomUUID(),
    title: brief,
    briefText: brief,
    location,
    seeking,
    includePublished,
    publishedOnly,
    publishedRoleMinimums,
    requiredTags,
    priorityTags: [],
    schedule: {
      mode: scheduleMode,
      specificDate: scheduleMode === "specific" ? specificDate : "",
      startDate: scheduleMode === "specific" ? specificDate : startDate,
      endDate: scheduleMode === "specific" ? specificDate : endDate,
      allowWeekends,
    },
    status: PAIRING_STATUS.pending,
    approvalNotes: "",
    movedToScheduleAt: null,
    candidateWriterIds: [],
    auditTrail: [{ at: Date.now(), message: "Pairing created." }],
    createdAt: Date.now(),
  };

  saveSessions([session, ...loadSessions()]);
  latestRenderedSessionId = session.id;
  showLatestPairingResults = true;
  visiblePairingResultsCount = PAIRING_RESULTS_PAGE_SIZE;
  activeCandidateFilterKey = "";

  if (selectedBriefForSessionId) {
    const briefs = loadBriefs();
    const idx = briefs.findIndex((b) => b.id === selectedBriefForSessionId);
    if (idx !== -1) {
      briefs[idx] = {
        ...briefs[idx],
        status: "session-created",
        createdSessionId: session.id,
      };
      saveBriefs(briefs);
      renderBriefs();
    }
    selectedBriefForSessionId = null;
  }

  sessionStatus.textContent = `Pairing complete. Extracted ${session.requiredTags.length} tags from brief.`;
  reportPanel.classList.add("hidden");
  reportOutput.textContent = "";
  downloadReportLink.href = "#";

  await renderLatestSessionResult();
  renderOpenPairings();
});

importSongwritersButton.addEventListener("click", async () => {
  const file = songwriterCsvInput.files?.[0];
  if (!file) {
    songwriterStatus.textContent = "Choose a CSV file first.";
    return;
  }

  const text = await file.text();
  const result = parseSongwriterCsv(text);

  if (result.reason) {
    songwriterStatus.textContent = result.reason;
    return;
  }

  const existing = loadSongwriters();
  const seen = new Set(
    existing.map((w) => `${w.name.toLowerCase()}::${(w.location || "").toLowerCase()}::${(w.tags || []).join("|")}`)
  );

  let duplicates = 0;
  result.imported.forEach((writer) => {
    const key = `${writer.name.toLowerCase()}::${(writer.location || "").toLowerCase()}::${(writer.tags || []).join("|")}`;
    if (seen.has(key)) {
      duplicates += 1;
      return;
    }
    seen.add(key);
    existing.push(writer);
  });

  saveSongwriters(existing);
  songwriterCsvInput.value = "";
  songwriterStatus.textContent = `Imported ${result.imported.length - duplicates} songwriter(s). Skipped ${result.skipped + duplicates}.`;

  renderSongwriters();
  renderLatestSessionResult();
});

if (exportSongwritersButton) {
  exportSongwritersButton.addEventListener("click", () => {
    const songwriters = loadSongwriters();
    if (!songwriters.length) {
      songwriterStatus.textContent = "No songwriters to export.";
      return;
    }

    const csv = buildSongwriterExportCsv(songwriters);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `songwriters_export_${stamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    songwriterStatus.textContent = `Exported ${songwriters.length} songwriter(s).`;
  });
}

generateReportButton.addEventListener("click", () => {
  generateLatestPairingReport();
});

seekingInputs.forEach((input) => {
  input.addEventListener("change", () => {
    syncSessionSeekingPills();
    syncPublishedRosterSlotsUi();
  });
});

if (publishedOnlyInput) {
  publishedOnlyInput.addEventListener("change", () => {
    if (publishedOnlyInput.checked && includePublishedInput) includePublishedInput.checked = false;
    syncPublishedRosterSlotsUi();
  });
}

if (includePublishedInput) {
  includePublishedInput.addEventListener("change", () => {
    if (includePublishedInput.checked && publishedOnlyInput) publishedOnlyInput.checked = false;
    syncPublishedRosterSlotsUi();
  });
}

if (seeMorePairingResultsButton) {
  seeMorePairingResultsButton.addEventListener("click", async () => {
    const previousButtonTop = seeMorePairingResultsButton.getBoundingClientRect().top;
    visiblePairingResultsCount += PAIRING_RESULTS_PAGE_SIZE;
    await renderLatestSessionResult();
    const newButtonTop = seeMorePairingResultsButton.getBoundingClientRect().top;
    window.scrollBy({ top: newButtonTop - previousButtonTop });
  });
}

refreshPairingButton.addEventListener("click", () => {
  latestRenderedSessionId = null;
  latestRenderedCandidates = [];
  showLatestPairingResults = false;
  visiblePairingResultsCount = PAIRING_RESULTS_PAGE_SIZE;
  activeCandidateFilterKey = "";
  sessionStatus.textContent = "Latest pairing results cleared. Use Open Pairings to reopen one.";
  reportPanel.classList.add("hidden");
  reportOutput.textContent = "";
  downloadReportLink.href = "#";
  generateReportButton.disabled = true;
  renderLatestSessionResult();
  renderOpenPairings();
});

refreshSessionBriefButton.addEventListener("click", () => {
  sessionForm.reset();
  selectedBriefForSessionId = null;
  scheduleModeInput.value = "";
  setScheduleModeUi();
  syncSessionSeekingPills();
  syncPublishedRosterSlotsUi();
  activeCandidateFilterKey = "";
  sessionStatus.textContent = "";
  if (sessionLocationStatus) sessionLocationStatus.textContent = "";
  hydrateGoogleSettingsUi();
});

scheduleModeInput.addEventListener("change", () => {
  setScheduleModeUi();
});

connectGoogleButton.addEventListener("click", () => {
  connectGoogleCalendar();
});

disconnectGoogleButton.addEventListener("click", () => {
  disconnectGoogleCalendar();
});

googleClientIdInput.addEventListener("change", () => {
  persistGoogleSettingsFromUi();
});

studioCalendarIdsInput.addEventListener("change", () => {
  persistGoogleSettingsFromUi();
});

icloudProxyUrlInput.addEventListener("change", () => {
  persistGoogleSettingsFromUi();
});

if (sharedApiUrlInput) {
  sharedApiUrlInput.addEventListener("change", () => {
    persistSharedSettingsFromUi();
    startRemoteSongwriterSync();
  });
}

if (supabaseUrlInput) {
  supabaseUrlInput.addEventListener("change", async () => {
    persistSupabaseSettingsFromUi();
    await initSupabaseClient();
  });
}

if (supabaseAnonKeyInput) {
  supabaseAnonKeyInput.addEventListener("change", async () => {
    persistSupabaseSettingsFromUi();
    await initSupabaseClient();
  });
}

if (authOpenButton) {
  authOpenButton.addEventListener("click", () => {
    setAuthStatus("");
    setAuthModalOpen(true);
  });
}

if (authCloseButton) {
  authCloseButton.addEventListener("click", () => {
    if (!supabaseUser) return;
    setAuthModalOpen(false);
    setAuthStatus("");
  });
}

if (authModal) {
  authModal.addEventListener("click", (event) => {
    if (event.target === authModal) {
      if (!supabaseUser) return;
      setAuthModalOpen(false);
      setAuthStatus("");
    }
  });
}

if (authSignInButton) {
  authSignInButton.addEventListener("click", async () => {
    if (!supabaseClient) {
      setAuthStatus("Set Supabase URL and anon key in Calendar Settings first.", true);
      return;
    }
    const email = String(authEmailInput?.value || "").trim();
    const password = String(authPasswordInput?.value || "").trim();
    if (!email || !password) {
      setAuthStatus("Need email and password.", true);
      return;
    }
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthStatus(error.message || "Sign in failed.", true);
      return;
    }
    setAuthModalOpen(false);
    setAuthStatus("");
    setSharedSyncStatus("Supabase sync active.");
    await pullSongwritersFromSupabase();
  });
}

if (authSignUpButton) {
  authSignUpButton.addEventListener("click", async () => {
    if (!supabaseClient) {
      setAuthStatus("Set Supabase URL and anon key in Calendar Settings first.", true);
      return;
    }
    const email = String(authEmailInput?.value || "").trim();
    const password = String(authPasswordInput?.value || "").trim();
    if (!email || !password) {
      setAuthStatus("Need email and password.", true);
      return;
    }
    const { error } = await supabaseClient.auth.signUp({ email, password });
    if (error) {
      setAuthStatus(error.message || "Create account failed.", true);
      return;
    }
    setAuthStatus("Account created. Check email confirmation if enabled.");
  });
}

if (authLogoutButton) {
  authLogoutButton.addEventListener("click", async () => {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
    setSharedSyncStatus("Signed out.");
  });
}

toggleAllSongwritersButton.addEventListener("click", () => {
  showAllSongwriters = !showAllSongwriters;
  toggleAllSongwritersButton.textContent = showAllSongwriters ? "Hide Songwriters" : "View All Songwriters";
  renderSongwriters();
});

writerSearchInput.addEventListener("input", () => {
  if (writerSearchInput.value.trim()) {
    showAllSongwriters = false;
    toggleAllSongwritersButton.textContent = "View All Songwriters";
  }
  renderSongwriters();
});

if (briefSearchInput) {
  briefSearchInput.addEventListener("input", () => {
    renderBriefs();
  });
}

if (toggleAddBriefButton) {
  toggleAddBriefButton.addEventListener("click", () => {
    setAddBriefOpen(!isAddBriefOpen);
  });
}

if (clearBriefFormButton) {
  clearBriefFormButton.addEventListener("click", () => {
    resetBriefForm();
  });
}

if (autoAssignBriefsButton) {
  autoAssignBriefsButton.addEventListener("click", () => {
    const briefs = loadBriefs();
    const sessions = loadSessions();
    let assignedCount = 0;
    const updated = briefs.map((brief) =>
      brief.status === "open" ? autoAssignSingleBrief(brief, sessions) : brief
    );
    updated.forEach((brief, idx) => {
      const previous = briefs[idx];
      if (previous?.status !== "assigned" && brief.status === "assigned") assignedCount += 1;
    });
    saveBriefs(updated);
    setBriefStatus(`Auto-assigned ${assignedCount} brief(s).`);
    renderBriefs();
  });
}

if (writerCalendarProviderInput) {
  writerCalendarProviderInput.addEventListener("change", () => {
    setWriterCalendarProviderUi();
  });
}

if (loadSharedCalendarsButton) {
  loadSharedCalendarsButton.addEventListener("click", async () => {
    try {
      setWriterCalendarStatus("Loading shared calendars...");
      sharedGoogleCalendars = await fetchSharedGoogleCalendars();
      populateWriterSharedCalendars(sharedGoogleCalendars);
      setWriterCalendarStatus(`Loaded ${sharedGoogleCalendars.length} calendar(s).`);
    } catch (error) {
      setWriterCalendarStatus(error.message || "Unable to load shared calendars.", true);
    }
  });
}

if (writerSharedCalendarSelect) {
  writerSharedCalendarSelect.addEventListener("change", () => {
    const selectedId = writerSharedCalendarSelect.value;
    writerSharedCalendarSelect.classList.toggle("placeholder", !selectedId);
    if (!selectedId) return;

    const selected = sharedGoogleCalendars.find((cal) => cal.id === selectedId);
    writerCalendarIdInput.value = selectedId;
    writerCalendarNameInput.value = selected?.name || "";
    setWriterCalendarStatus("Shared calendar selected.");
  });
}

if (writerCalendarIdInput && writerSharedCalendarSelect) {
  writerCalendarIdInput.addEventListener("input", () => {
    const id = writerCalendarIdInput.value.trim();
    if (!id) {
      writerSharedCalendarSelect.value = "";
      writerSharedCalendarSelect.classList.add("placeholder");
      return;
    }
    if (!sharedGoogleCalendars.some((cal) => cal.id === id)) {
      writerSharedCalendarSelect.value = "";
      writerSharedCalendarSelect.classList.add("placeholder");
    }
  });
}

if (briefList) {
  briefList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const briefId = target.dataset.briefId;
    if (!briefId) return;

    const briefs = loadBriefs();
    const idx = briefs.findIndex((b) => b.id === briefId);
    if (idx === -1) return;

    if (target.classList.contains("brief-assign-session")) {
      briefs[idx] = autoAssignSingleBrief(briefs[idx], loadSessions());
      saveBriefs(briefs);
      setBriefStatus(
        briefs[idx].status === "assigned"
          ? "Brief assigned to existing session."
          : "No good existing session match. Brief remains open."
      );
      renderBriefs();
      return;
    }

    if (target.classList.contains("brief-run-plan")) {
      briefs[idx] = { ...briefs[idx], plan: runBriefPlan(briefs[idx]) };
      saveBriefs(briefs);
      const nextAction = briefs[idx].plan?.actionLabel || "Review brief";
      setBriefStatus(`Plan ready: ${nextAction}.`);
      renderBriefs();
      return;
    }

    if (target.classList.contains("brief-create-session")) {
      const brief = briefs[idx];
      document.getElementById("session-title").value = brief.briefText || "";
      document.getElementById("session-location").value = brief.location || "";
      const selectedSeeking = new Set(normalizeRoles(brief.seeking || []));
      seekingInputs.forEach((input) => {
        input.checked = selectedSeeking.has(String(input.value || "").toLowerCase());
      });
      syncSessionSeekingPills();
      syncPublishedRosterSlotsUi();
      selectedBriefForSessionId = brief.id;
      setNewPairingOpen(true);
      switchView("pairing");
      sessionStatus.textContent = `Loaded brief "${brief.title}" into New Pairing. Select date(s), then Run Pairing.`;
    }
  });
}

songwriterList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.classList.contains("delete-writer")) {
    const writerId = target.dataset.writerId;
    if (!writerId) return;

    const writers = loadSongwriters();
    const writer = writers.find((w) => w.id === writerId);
    if (!writer) return;

    const confirmed = window.confirm(`Delete ${writer.name}?`);
    if (!confirmed) return;

    const nextWriters = writers.filter((w) => w.id !== writerId);
    saveSongwriters(nextWriters);
    if (inlineEditingWriterId === writerId) inlineEditingWriterId = null;
    songwriterStatus.textContent = `Deleted ${writer.name}.`;
    renderSongwriters();
    renderLatestSessionResult();
    renderCalendarWriterList();
    return;
  }

  if (target.classList.contains("edit-writer")) {
    const writerId = target.dataset.writerId;
    if (!writerId) return;
    inlineEditingWriterId = inlineEditingWriterId === writerId ? null : writerId;
    renderSongwriters();
    return;
  }

  if (target.classList.contains("cancel-inline-writer")) {
    inlineEditingWriterId = null;
    renderSongwriters();
    return;
  }

  if (target.classList.contains("save-inline-writer")) {
    const writerId = target.dataset.writerId;
    if (!writerId) return;

    const item = target.closest(".songwriter-item");
    if (!(item instanceof HTMLElement)) return;

    const name = item.querySelector(".inline-name")?.value.trim() || "";
    const locationRaw = item.querySelector(".inline-location")?.value.trim() || "";
    const personalContact = item.querySelector(".inline-personal")?.value.trim() || "";
    const managerContact = item.querySelector(".inline-manager")?.value.trim() || "";
    const calendarProvider = item.querySelector(".inline-calendar-provider")?.value || "icloud";
    const preferredContact = item.querySelector(".inline-preferred-contact")?.value || "email";
    const tagsRaw = item.querySelector(".inline-tags")?.value || "";
    const roles = normalizeRoles(
      Array.from(item.querySelectorAll(".inline-role"))
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value)
    );
    const published = Boolean(item.querySelector(".inline-published")?.checked);
    const bio = item.querySelector(".inline-bio")?.value.trim() || "";
    const notes = item.querySelector(".inline-notes")?.value.trim() || "";
    const roster = item.querySelector(".inline-roster")?.value.trim() || "";
    const calendarName = item.querySelector(".inline-calendar-name")?.value.trim() || "";
    const calendarId = item.querySelector(".inline-calendar-id")?.value.trim() || "";

    const location = locationRaw.toLowerCase();
    const tags = ensureLocationTag(normalizeList(tagsRaw), locationRaw);

    if (!name || !location || !personalContact || !managerContact || !tags.length || !bio) {
      songwriterStatus.textContent =
        "Name, location, personal contact, manager contact, tags, and bio are required.";
      return;
    }
    const writers = loadSongwriters();
    const idx = writers.findIndex((w) => w.id === writerId);
    if (idx === -1) return;

    writers[idx] = {
      ...writers[idx],
      name,
      location,
      personalContact,
      managerContact,
      preferredContact,
      calendarProvider,
      published,
      roles,
      tags,
      bio,
      notes,
      roster,
      calendarName,
      calendarId,
      updatedAt: Date.now(),
    };

    saveSongwriters(writers);
    songwriterStatus.textContent = `Updated ${name}.`;
    inlineEditingWriterId = null;
    renderSongwriters();
    renderLatestSessionResult();
  }
});

if (openPairingsList) {
  openPairingsList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const sessionId = target.dataset.sessionId;
    if (!sessionId) return;

    if (target.classList.contains("view-pairing")) {
      latestRenderedSessionId = sessionId;
      showLatestPairingResults = true;
      visiblePairingResultsCount = PAIRING_RESULTS_PAGE_SIZE;
      activeCandidateFilterKey = "";
      renderLatestSessionResult();
      switchView("pairing");
      return;
    }
  });
}

if (scheduleList) {
  scheduleList.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const requestId = target.dataset.requestId;
  if (!requestId) return;

  const requests = loadScheduleRequests();
  const idx = requests.findIndex((r) => r.id === requestId);
  if (idx === -1) return;

  if (target.classList.contains("remove-request")) {
    const [removed] = requests.splice(idx, 1);
    saveScheduleRequests(requests);
    setScheduleStatus(`Removed ${removed.writerName} from schedule queue.`);
    renderSchedule();
    renderOpenPairings();
    return;
  }

  if (target.classList.contains("check-availability")) {
    const result = await checkAvailabilityForRequest(requests[idx]);
    requests[idx].availabilityStatus = result.status;
    requests[idx].availabilitySummary = result.summary;
    requests[idx].availabilityCheckedAt = Date.now();
    requests[idx].availabilityFirstDate = result.firstDate || "";
    saveScheduleRequests(requests);
    setScheduleStatus(
      result.ok ? `${requests[idx].writerName} is available.` : `${requests[idx].writerName}: ${result.summary}`,
      !result.ok
    );
    renderSchedule();
    return;
  }

  if (target.classList.contains("mark-confirmed")) {
    const canCreateGoogleEvent = hasLiveGoogleToken() && Boolean(getSharedCalendarId());
    if (!requests[idx].calendarEventId && canCreateGoogleEvent) {
      const createResult = await createSharedCalendarEvent(requests[idx]);
      if (!createResult.ok) {
        setScheduleStatus(createResult.reason, true);
        return;
      }

      requests[idx].calendarEventId = createResult.eventId;
      requests[idx].calendarEventLink = createResult.eventLink;
      requests[idx].calendarEventCreatedAt = Date.now();
    }

    requests[idx].status = "confirmed";
    requests[idx].confirmedAt = Date.now();
    saveScheduleRequests(requests);
    setScheduleStatus(
      canCreateGoogleEvent
        ? `${requests[idx].writerName} confirmed and added to shared calendar.`
        : `${requests[idx].writerName} confirmed.`
    );
    renderSchedule();
    return;
  }

  if (target.classList.contains("send-outreach")) {
    const result = openPreferredOutreach(requests[idx]);
    if (!result.ok) {
      setScheduleStatus(result.reason, true);
      return;
    }

    requests[idx].status = "sent";
    requests[idx].sentVia = result.via;
    requests[idx].sentAt = Date.now();
    saveScheduleRequests(requests);
    setScheduleStatus(`Outreach prepared for ${requests[idx].writerName} via ${result.via}.`);
    renderSchedule();
  }
  });
}

if (checkAllAvailabilityButton) {
  checkAllAvailabilityButton.addEventListener("click", async () => {
  const requests = loadScheduleRequests();
  if (!requests.length) {
    setScheduleStatus("No schedule requests to check.", true);
    return;
  }

  let availableCount = 0;
  for (let i = 0; i < requests.length; i += 1) {
    const result = await checkAvailabilityForRequest(requests[i]);
    requests[i].availabilityStatus = result.status;
    requests[i].availabilitySummary = result.summary;
    requests[i].availabilityCheckedAt = Date.now();
    requests[i].availabilityFirstDate = result.firstDate || "";
    if (result.ok) availableCount += 1;
  }

  saveScheduleRequests(requests);
  renderSchedule();
  setScheduleStatus(`Availability checked. ${availableCount}/${requests.length} available.`);
  });
}

cancelEditButton.addEventListener("click", () => {
  resetSongwriterForm();
  setAddSongwriterFormOpen(false);
  switchView("songwriters");
});

if (toggleAddSongwriterButton) {
  toggleAddSongwriterButton.addEventListener("click", () => {
    if (isAddSongwriterFormOpen && editingSongwriterId) {
      resetSongwriterForm();
    }
    setAddSongwriterFormOpen(!isAddSongwriterFormOpen);
  });
}

if (toggleBulkImportButton) {
  toggleBulkImportButton.addEventListener("click", () => {
    setBulkImportOpen(!isBulkImportOpen);
  });
}

if (calendarWriterList) {
  calendarWriterList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest(".calendar-writer-btn");
    if (!(button instanceof HTMLElement)) return;
    const writerId = button.dataset.writerId;
    if (!writerId) return;
    selectedCalendarWriterId = writerId;
    renderCalendarWriterList();
    loadSelectedWriterCalendarEvents();
  });
}

if (refreshCalendarEventsButton) {
  refreshCalendarEventsButton.addEventListener("click", () => {
    if ((calendarKeywordSearchInput?.value || "").trim() || lastCalendarKeywordSearch.trim()) {
      clearCalendarKeywordSearch();
      setCalendarEventsStatus("Calendar search cleared.");
      loadSelectedWriterCalendarEvents();
      return;
    }
    if (selectedCalendarWriterId === ALL_CALENDAR_WRITERS_ID) {
      loadSelectedWriterCalendarEvents(true);
      return;
    }
    if (!selectedCalendarWriterId) {
      setCalendarEventsStatus("Select a published writer first.", true);
      return;
    }
    writerCalendarEventsCache.delete(selectedCalendarWriterId);
    loadSelectedWriterCalendarEvents(true);
  });
}

if (runCalendarKeywordSearchButton) {
  runCalendarKeywordSearchButton.addEventListener("click", async () => {
    await runCalendarKeywordSearch();
  });
}

if (calendarKeywordSearchInput) {
  calendarKeywordSearchInput.addEventListener("keydown", async (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    await runCalendarKeywordSearch();
  });
  calendarKeywordSearchInput.addEventListener("input", () => {
    if ((calendarKeywordSearchInput.value || "").trim()) return;
    clearCalendarKeywordSearch();
  });
}

if (sessionLocationInput) {
  sessionLocationInput.addEventListener("input", () => {
    if (sessionLocationStatus) sessionLocationStatus.textContent = "";
  });
}

if (generateCalendarKeywordReportButton) {
  generateCalendarKeywordReportButton.addEventListener("click", () => {
    generateCalendarKeywordReport();
  });
}

viewButtons.forEach((btn) => {
  btn.addEventListener("click", () => switchView(btn.dataset.view));
});

if (calendarMenuToggleButton && calendarMenuPanel) {
  calendarMenuToggleButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = calendarMenuPanel.classList.contains("hidden");
    setCalendarMenuOpen(open);
  });

  calendarMenuPanel.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    setCalendarMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setCalendarMenuOpen(false);
  });
}

setSongwriterFormMode(false);
setNewPairingOpen(false);
setAddSongwriterFormOpen(false);
setBulkImportOpen(false);
setAddBriefOpen(false);
hydrateGoogleSettingsUi();
hydrateSharedSettingsUi();
hydrateSupabaseSettingsUi();
setAuthUi();
setWriterCalendarProviderUi();
setScheduleModeUi();
bindDateInputOpenOnClick(sessionDateSpecificInput);
bindDateInputOpenOnClick(sessionDateStartInput);
bindDateInputOpenOnClick(sessionDateEndInput);
syncSessionSeekingPills();
syncPublishedRosterSlotsUi();
setCalendarMenuOpen(false);
setCalendarStatus("iCloud mode active.");
setScheduleStatus("");
setPairingQueueStatus("");
switchView("pairing");
generateReportButton.disabled = true;
showLatestPairingResults = false;
renderSongwriters();
renderBriefs();
renderCalendarWriterList();
renderCalendarKeywordSearchResults();
renderLatestSessionResult();
renderOpenPairings();
renderSchedule();
initSupabaseClient();
tryAutoReconnectGoogleCalendar();
