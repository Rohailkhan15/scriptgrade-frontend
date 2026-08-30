import type {
  DebuggerReport,
  Exam,
  LanguageCode,
  MagicConcept,
  Paper,
  PaperSource,
  PaperStatus,
} from "./types";

export const dashboardMetrics = {
  total_exams: 24,
  accuracy_pct: 94.2,
  hours_saved: 316,
};

export const exams: Exam[] = [
  {
    id: "exm-bio-101",
    name: "Biology 101 — Photosynthesis",
    subject: "Biology",
    created_at: "2026-08-19",
    paper_count: 50,
    status: "completed",
    avg_score: 7.84,
    max_score: 10,
  },
  {
    id: "exm-chem-mid",
    name: "Chemistry Midterm — Bonding",
    subject: "Chemistry",
    created_at: "2026-07-28",
    paper_count: 35,
    status: "processing",
    avg_score: null,
    max_score: 10,
  },
  {
    id: "exm-phy-term",
    name: "Physics Term 2 — Optics",
    subject: "Physics",
    created_at: "2026-07-11",
    paper_count: 42,
    status: "needs_review",
    avg_score: 6.9,
    max_score: 10,
  },
  {
    id: "exm-urdu-comp",
    name: "Urdu Composition — Essay",
    subject: "Urdu",
    created_at: "2026-06-30",
    paper_count: 61,
    status: "completed",
    avg_score: 8.1,
    max_score: 10,
  },
  {
    id: "exm-cs-quiz",
    name: "Computer Science Quiz 3",
    subject: "Computer Science",
    created_at: "2026-06-14",
    paper_count: 28,
    status: "draft",
    avg_score: null,
    max_score: 10,
  },
];

export const scoreBands = [
  { band: "0–20%", count: 2 },
  { band: "21–40%", count: 5 },
  { band: "41–60%", count: 11 },
  { band: "61–80%", count: 19 },
  { band: "81–100%", count: 13 },
];

export const extractedConcepts: MagicConcept[] = [
  {
    id: "c1",
    keyword: "Sunlight",
    points: 3,
    synonyms: ["solar energy", "radiation", "light energy"],
  },
  {
    id: "c2",
    keyword: "Chlorophyll",
    points: 3,
    synonyms: ["green pigment", "pigment"],
  },
  { id: "c3", keyword: "Glucose", points: 2, synonyms: ["sugar", "C6H12O6"] },
  { id: "c4", keyword: "CO₂", points: 1, synonyms: ["carbon dioxide"] },
  { id: "c5", keyword: "Oxygen", points: 1, synonyms: ["O₂"] },
];

const baseDebuggers = (score: number, max: number): DebuggerReport => ({
  garbage: {
    flagged: score < max * 0.5,
    relevance_score: score < max * 0.5 ? 0.61 : 0.02,
    threshold: 0.35,
    sentences_checked: 2,
    notes:
      score < max * 0.5
        ? "2 of 4 sentences repeat prompt text without adding rubric content."
        : "No filler, padding, or copied prompt text detected.",
  },
  negation: {
    flagged: false,
    tokens_scanned: ["not", "never", "fails to", "without"],
    negation_count: 0,
    flagged_phrases: [],
  },
  synonym: {
    matches: [
      { token: "solar energy", concept: "Sunlight", similarity: 0.94 },
      { token: "green pigment", concept: "Chlorophyll", similarity: 0.91 },
    ],
  },
  spelling: {
    corrections: [
      { original: "photosinthesis", corrected: "photosynthesis", levenshtein: 0.92 },
    ],
  },
  sequence: {
    strict_enabled: true,
    steps: [
      { label: "Sunlight Absorption", ok: true },
      { label: "Chlorophyll Activation", ok: true },
      { label: "CO₂ Fixation", ok: score >= max * 0.6 },
      { label: "Glucose Synthesis", ok: score >= max * 0.6 },
    ],
    transitions_validated: score >= max * 0.6 ? "4/4" : "2/4",
  },
  vision: {
    confidence: 91.3,
    elements: [
      { label: "Chloroplast", box: [112, 88, 240, 195], conf: 93.1 },
      { label: "Arrow: CO₂ → Leaf", box: [300, 140, 410, 160], conf: 89.5 },
    ],
  },
  density: {
    ratio: score >= max * 0.6 ? 88.5 : 31.2,
    threshold: 30,
    keyword_hits: score >= max * 0.6 ? 5 : 2,
    word_count: 28,
  },
  aggregator: {
    rows: [
      { concept: "Sunlight", award: 3, max: 3, match: "synonym" },
      { concept: "Chlorophyll", award: 3, max: 3, match: "synonym" },
      {
        concept: "Glucose",
        award: score >= max * 0.6 ? 2 : 0,
        max: 2,
        match: score >= max * 0.6 ? "exact" : "missed",
      },
      { concept: "CO₂", award: 1, max: 1, match: "exact" },
      {
        concept: "Oxygen",
        award: score >= max * 0.6 ? 1 : 0,
        max: 1,
        match: score >= max * 0.6 ? "fuzzy" : "missed",
      },
    ],
    total: score,
    max,
  },
});

const ocrSamples: Record<LanguageCode, string> = {
  en: `Photosynthesis is the process by which green plants use solar energy and the green pigment in their leaves to convert carbon dioxide and water into glucose, releasing oxygen as a by-product.`,
  ur: `فوٹو سنتھیسز وہ عمل ہے جس میں سبز پودے سورج کی روشنی اور کلوروفل کی مدد سے کاربن ڈائی آکسائیڈ اور پانی کو گلوکوز میں تبدیل کرتے ہیں اور آکسیجن خارج کرتے ہیں۔`,
  sd: `فوٽو سنٿيسز اهو عمل آهي جنهن ۾ سائي ٻوٽا سج جي روشني ۽ ڪلوروفل جي مدد سان ڪاربن ڊاءِ آڪسائيڊ ۽ پاڻي کي گلوڪوز ۾ تبديل ڪن ٿا.`,
  pa: `پودے سورج دی روشنی تے کلوروفل نال کاربن ڈائی آکسائیڈ تے پانی نوں گلوکوز وچ بدلدے نیں تے آکسیجن چھڈدے نیں۔`,
};

const seed: {
  id: string;
  source: PaperSource;
  language: LanguageCode;
  status: PaperStatus;
  score: number | null;
}[] = [
  { id: "STU-101", source: "mobile", language: "ur", status: "evaluated", score: 8 },
  { id: "STU-102", source: "web_dashboard", language: "en", status: "evaluated", score: 10 },
  { id: "STU-103", source: "mobile", language: "en", status: "needs_review", score: 4 },
  { id: "STU-104", source: "web_dashboard", language: "sd", status: "processing", score: null },
  { id: "STU-105", source: "mobile", language: "pa", status: "evaluated", score: 7 },
  { id: "STU-106", source: "web_dashboard", language: "en", status: "evaluated", score: 9 },
  { id: "STU-107", source: "mobile", language: "ur", status: "needs_review", score: 3 },
  { id: "STU-108", source: "web_dashboard", language: "en", status: "evaluated", score: 6 },
  { id: "STU-109", source: "mobile", language: "en", status: "queued", score: null },
  { id: "STU-110", source: "web_dashboard", language: "ur", status: "evaluated", score: 10 },
];

export const papers: Paper[] = seed.map((s) => ({
  id: s.id.toLowerCase(),
  student_id: s.id,
  source: s.source,
  language: s.language,
  status: s.status,
  score: s.score,
  max_score: 10,
  ocr_confidence: s.score === null ? 0 : 88 + ((s.score * 7) % 11),
  word_count: 28,
  density_ratio: s.score !== null && s.score >= 6 ? 88.5 : 31.2,
  ocr_text: ocrSamples[s.language],
  debuggers: baseDebuggers(s.score ?? 0, 10),
}));

export const queueTotals = {
  total: 50,
  processed: 48,
  flagged: 2,
};

export const languageLabels: Record<LanguageCode, string> = {
  en: "EN English",
  ur: "اردو Urdu",
  sd: "سنڌي Sindhi",
  pa: "ਪੰਜਾਬੀ Punjabi",
};

export const isRTL = (lang: LanguageCode) => lang !== "en";
