export type ExamStatus = "completed" | "processing" | "needs_review" | "draft";

export type PaperStatus =
  | "queued"
  | "processing"
  | "evaluated"
  | "needs_review"
  | "scored"
  | "finalized";

export type PaperSource = "mobile" | "web_dashboard";

export type LanguageCode = "en" | "ur" | "sd" | "pa";

export interface Exam {
  id: string;
  name: string;
  subject: string;
  created_at: string;
  paper_count: number;
  status: ExamStatus;
  avg_score: number | null;
  max_score: number;
}

export interface MagicConcept {
  id: string;
  keyword: string;
  points: number;
  synonyms: string[];
}

export interface EvaluationToggles {
  spelling_correction: boolean;
  strict_dag_order: boolean;
  density_scoring: boolean;
}

export interface DebuggerReport {
  garbage: {
    flagged: boolean;
    relevance_score: number;
    threshold: number;
    sentences_checked: number;
    notes: string;
  };
  negation: {
    flagged: boolean;
    tokens_scanned: string[];
    negation_count: number;
    flagged_phrases: string[];
  };
  synonym: {
    matches: { token: string; concept: string; similarity: number }[];
  };
  spelling: {
    corrections: { original: string; corrected: string; levenshtein: number }[];
  };
  sequence: {
    strict_enabled: boolean;
    steps: { label: string; ok: boolean }[];
    transitions_validated: string;
  };
  vision: {
    confidence: number;
    elements: { label: string; box: [number, number, number, number]; conf: number }[];
  };
  density: {
    ratio: number;
    threshold: number;
    keyword_hits: number;
    word_count: number;
  };
  aggregator: {
    rows: {
      concept: string;
      award: number;
      max: number;
      match: "exact" | "synonym" | "fuzzy" | "missed";
    }[];
    total: number;
    max: number;
  };
}

export interface Paper {
  id: string;
  student_id: string;
  source: PaperSource;
  language: LanguageCode;
  status: PaperStatus;
  score: number | null;
  max_score: number;
  ocr_confidence: number;
  word_count: number;
  density_ratio: number;
  ocr_text: string;
  moderation_note?: string;
  debuggers: DebuggerReport;
}
