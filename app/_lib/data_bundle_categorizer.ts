// types
type RawPlan = {
  code: string;
  name: string;
  amount: string;
  validity?: string; // sometimes missing on MTN/Airtel
  fixedPrice?: string;
};

type NormalizedPlan = {
  network: "mtn" | "glo" | "airtel" | "unknown";
  code: string;
  title: string; // cleaned name
  priceNaira: number; // parsed amount
  days?: number; // derived duration in days (if applicable)
  hours?: number; // for hourly bundles
  sizeLabel?: string; // e.g. "1.5GB", "500MB" (best-effort from name)
  tags: Array<
    | "night"
    | "weekend"
    | "sunday"
    | "social"
    | "sme"
    | "gifting"
    | "voice"
    | "always_on"
  >;
  category:
    | "hourly"
    | "daily"
    | "multi_day" // 2–6 days
    | "weekly" // 7 days
    | "fortnight" // 14–15 days
    | "monthly" // 28–31 days
    | "quarterly" // ~60–120 days
    | "yearly" // ~300–400 days
    | "special"; // when category is ambiguous but has tags
};

// ---------- helpers

const clean = (s?: string) =>
  (s ?? "")
    .replace(/\s+/g, " ")
    .replace(/[_-]/g, " ")
    .replace(/\(.*?$/g, (m) => m) // keep bracket content; useful for social/night hints
    .trim();

const toNaira = (s: string) => {
  const num = parseFloat(s.replace(/[^\d.]/g, ""));
  return isFinite(num) ? Math.round(num) : NaN;
};

const detectNetwork = (
  code: string,
  name: string
): NormalizedPlan["network"] => {
  const t = (code + " " + name).toLowerCase();
  if (t.includes("mtn")) return "mtn";
  if (t.includes("glo")) return "glo";
  if (t.includes("airt")) return "airtel";
  return "unknown";
};

const extractSizeLabel = (title: string): string | undefined => {
  // capture e.g. "1.5GB", "500MB", "4.5TB"
  const m = title.toUpperCase().match(/(\d+(\.\d+)?)\s*(TB|GB|MB)\b/);
  return m ? `${m[1]}${m[3]}` : undefined;
};

// Parse duration from either `validity` or fallback to `name`
const extractDuration = (
  validity?: string,
  name?: string
): { days?: number; hours?: number } => {
  const src = `${validity ?? ""} ${name ?? ""}`.toLowerCase();

  // Normalize words
  const norm = src
    .replace(/monthly plan?|monthly pla/gi, "30 days")
    .replace(/weekly plan?/gi, "7 days")
    .replace(/\b1day\b/g, "1 day")
    .replace(/\b7days\b/g, "7 days")
    .replace(/\b30days\b/g, "30 days")
    .replace(/\b365days?\b/g, "365 days")
    .replace(/\b3days?\b/g, "3 days")
    .replace(/\b2days?\b/g, "2 days")
    .replace(/\b14 days?\b/g, "14 days")
    .replace(/\b15 days?\b/g, "15 days");

  // Hours first
  const mh = norm.match(/(\d+)\s*hour(s)?\b/);
  if (mh) return { hours: parseInt(mh[1], 10) };

  // Days explicit
  const md = norm.match(/(\d+)\s*day(s)?\b/);
  if (md) return { days: parseInt(md[1], 10) };

  // Weeks
  const mw = norm.match(/(\d+)\s*week(s)?\b/);
  if (mw) return { days: parseInt(mw[1], 10) * 7 };

  // Months (assume 30)
  const mm = norm.match(/(\d+)\s*month(s)?\b/);
  if (mm) return { days: parseInt(mm[1], 10) * 30 };

  // Bare numbers like "30" often mean 30 days in these APIs
  const bare = norm.match(/\b(\d{1,3})\b/);
  if (bare) {
    const n = parseInt(bare[1], 10);
    if (
      n === 1 ||
      n === 2 ||
      n === 3 ||
      n === 7 ||
      n === 14 ||
      n === 15 ||
      n === 30 ||
      n === 60 ||
      n === 90 ||
      n === 120 ||
      n === 365
    ) {
      return { days: n };
    }
  }

  return {};
};

const detectTags = (text: string): NormalizedPlan["tags"] => {
  const t = text.toLowerCase();
  const tags: NormalizedPlan["tags"] = [];
  if (t.includes("night")) tags.push("night");
  if (t.includes("weekend")) tags.push("weekend");
  if (/\bsun(day)?\b/.test(t)) tags.push("sunday");
  if (
    t.includes("social") ||
    /(whatsapp|instagram|twitter|facebook|tiktok|snapchat|threads|glo ?tv|boomplay|audiomac?k)/i.test(
      t
    )
  ) {
    tags.push("social");
  }
  if (/\bsme\b/.test(t)) tags.push("sme");
  if (t.includes("gifting")) tags.push("gifting");
  if (t.includes("voice") || t.includes("xtratalk")) tags.push("voice");
  if (
    t.includes("always on") ||
    t.includes("always-on") ||
    /daily \d+\s*mb data/.test(t)
  )
    tags.push("always_on");
  return tags;
};

const chooseCategory = (
  d: { days?: number; hours?: number },
  tags: NormalizedPlan["tags"]
): NormalizedPlan["category"] => {
  if (d.hours && d.hours > 0) return "hourly";
  if (
    tags.includes("voice") ||
    tags.includes("social") ||
    tags.includes("sme") ||
    tags.includes("gifting") ||
    tags.includes("always_on") ||
    tags.includes("night") ||
    tags.includes("weekend") ||
    tags.includes("sunday")
  ) {
    // still bucket by duration if we can, otherwise "special"
    if (d.days === 1) return "daily";
    if (d.days && d.days >= 2 && d.days <= 6) return "multi_day";
    if (d.days === 7) return "weekly";
    if (d.days && (d.days === 14 || d.days === 15)) return "fortnight";
    if (d.days && d.days >= 28 && d.days <= 31) return "monthly";
    if (d.days && d.days >= 60 && d.days <= 120) return "quarterly";
    if (d.days && d.days >= 300) return "yearly";
    return "special";
  }
  if (d.days === 1) return "daily";
  if (d.days && d.days >= 2 && d.days <= 6) return "multi_day";
  if (d.days === 7) return "weekly";
  if (d.days && (d.days === 14 || d.days === 15)) return "fortnight";
  if (d.days && d.days >= 28 && d.days <= 31) return "monthly";
  if (d.days && d.days >= 60 && d.days <= 120) return "quarterly";
  if (d.days && d.days >= 300) return "yearly";
  // default if nothing matched but amount exists
  return "special";
};

const normalizeOne = (p: RawPlan): NormalizedPlan => {
  const title = clean(p.name);
  const priceNaira = toNaira(p.amount);
  const network = detectNetwork(p.code, p.name);
  const { days, hours } = extractDuration(p.validity, p.name);
  const tags = detectTags(`${title} ${clean(p.validity)}`);
  const sizeLabel = extractSizeLabel(title);
  const category = chooseCategory({ days, hours }, tags);

  return {
    network,
    code: p.code,
    title,
    priceNaira,
    days,
    hours,
    sizeLabel,
    tags,
    category,
  };
};

// Deduplicate by (code) primarily; if GLO list reuses codes, fallback to composite key
const dedupe = (plans: NormalizedPlan[]) => {
  const seen = new Set<string>();
  const out: NormalizedPlan[] = [];
  for (const pl of plans) {
    const key = `${pl.network}|${pl.code}|${pl.priceNaira}|${
      pl.days ?? pl.hours ?? "na"
    }`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(pl);
    }
  }
  return out;
};

// Public: feed arrays from each API, get buckets
export function bucketizeByCategory(
  glo: RawPlan[] = [],
  mtn: RawPlan[] = [],
  airtel: RawPlan[] = []
) {
  const normalized = dedupe([...glo, ...mtn, ...airtel].map(normalizeOne));

  // Main buckets
  const buckets = {
    hourly: [] as NormalizedPlan[],
    daily: [] as NormalizedPlan[],
    multi_day: [] as NormalizedPlan[],
    weekly: [] as NormalizedPlan[],
    fortnight: [] as NormalizedPlan[],
    monthly: [] as NormalizedPlan[],
    quarterly: [] as NormalizedPlan[],
    yearly: [] as NormalizedPlan[],
    special: [] as NormalizedPlan[],
    // optional convenience sub-buckets by tag
    tags: {
      night: [] as NormalizedPlan[],
      weekend: [] as NormalizedPlan[],
      sunday: [] as NormalizedPlan[],
      social: [] as NormalizedPlan[],
      sme: [] as NormalizedPlan[],
      gifting: [] as NormalizedPlan[],
      voice: [] as NormalizedPlan[],
      always_on: [] as NormalizedPlan[],
    },
  };

  for (const p of normalized) {
    (buckets as any)[p.category].push(p);
    for (const t of p.tags) {
      (buckets.tags as any)[t].push(p);
    }
  }

  return { normalized, buckets };
}
