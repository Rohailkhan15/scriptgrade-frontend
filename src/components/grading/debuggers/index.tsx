import type { DebuggerReport } from "@/lib/types";
import { DataTable, MetricRow, PanelBody, PanelStatus } from "../panel-primitives";
import { EmptyState } from "@/components/ui/empty-state";
import { ShieldCheck } from "lucide-react";

export function GarbageTextPanel({ data }: { data: DebuggerReport["garbage"] }) {
  return (
    <PanelBody>
      <PanelStatus
        tone={data.flagged ? "alert" : "pass"}
        label={
          data.flagged
            ? `Garbage text flagged (score: ${data.relevance_score.toFixed(2)})`
            : `Clean (score: ${data.relevance_score.toFixed(2)})`
        }
      />
      <dl>
        <MetricRow
          label="Contextual relevance score (low = good)"
          value={`${data.relevance_score.toFixed(2)} / 1.00`}
        />
        <MetricRow label="Flag threshold" value={data.threshold.toFixed(2)} />
        <MetricRow label="Sentences checked" value={data.sentences_checked} />
      </dl>
      <p className="text-muted-foreground text-sm">{data.notes}</p>
    </PanelBody>
  );
}

export function NegationPanel({ data }: { data: DebuggerReport["negation"] }) {
  return (
    <PanelBody>
      <PanelStatus
        tone={data.flagged ? "alert" : "pass"}
        label={
          data.flagged
            ? `${data.negation_count} negation(s) detected`
            : "No negation detected"
        }
      />
      <dl>
        <MetricRow
          label="Negation tokens bound to rubric concepts"
          value={data.negation_count}
        />
      </dl>
      <div>
        <p className="text-caption text-muted-foreground mb-1.5">Tokens scanned</p>
        <div className="flex flex-wrap gap-1.5">
          {data.tokens_scanned.map((t) => (
            <span
              key={t}
              className="bg-muted border-border rounded-sm border px-1.5 py-0.5 font-mono text-xs"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      {data.flagged_phrases.length === 0 ? (
        <p className="text-muted-foreground text-sm">Flagged phrases: none</p>
      ) : (
        <DataTable
          head={["Flagged phrase"]}
          rows={data.flagged_phrases.map((p) => [p])}
          caption="Flagged negation phrases"
        />
      )}
    </PanelBody>
  );
}

export function SynonymPanel({ data }: { data: DebuggerReport["synonym"] }) {
  if (data.matches.length === 0) {
    return (
      <EmptyState
        icon={ShieldCheck}
        title="No synonym substitutions"
        description="All rubric concepts were matched by exact tokens."
      />
    );
  }
  return (
    <PanelBody>
      <PanelStatus tone="pass" label={`${data.matches.length} synonyms resolved`} />
      <DataTable
        head={["Student token", "Rubric concept", "Similarity"]}
        rows={data.matches.map((m) => [m.token, m.concept, m.similarity.toFixed(2)])}
        caption="Semantic matches"
      />
      <p className="text-muted-foreground text-xs">
        Method: pgvector cosine-similarity semantic search
      </p>
    </PanelBody>
  );
}

export function SpellingPanel({ data }: { data: DebuggerReport["spelling"] }) {
  if (data.corrections.length === 0) {
    return (
      <EmptyState
        icon={ShieldCheck}
        title="No corrections applied"
        description="Every token matched the rubric vocabulary exactly."
      />
    );
  }
  return (
    <PanelBody>
      <PanelStatus
        tone="warn"
        label={`${data.corrections.length} auto-correction applied (no deduction)`}
      />
      <DataTable
        head={["Original token", "Corrected token", "Levenshtein"]}
        rows={data.corrections.map((c) => [
          c.original,
          c.corrected,
          `${c.levenshtein.toFixed(2)} (≥0.85)`,
        ])}
        caption="Fuzzy spelling corrections"
      />
    </PanelBody>
  );
}

export function SequenceDagPanel({ data }: { data: DebuggerReport["sequence"] }) {
  const allOk = data.steps.every((s) => s.ok);
  return (
    <PanelBody>
      <PanelStatus
        tone={allOk ? "pass" : "warn"}
        label={allOk ? "Correct order" : "Sequence mismatch detected"}
      />
      <ol className="divide-border divide-y">
        {data.steps.map((s) => (
          <li
            key={s.label}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2"
          >
            <span className="min-w-0 truncate font-mono text-xs">{s.label}</span>
            <span
              className={
                s.ok ? "text-pass-strong text-xs" : "text-warn-strong text-xs"
              }
            >
              {s.ok ? "matched" : "out of order"}
            </span>
          </li>
        ))}
      </ol>
      <dl>
        <MetricRow label="DAG transitions validated" value={data.transitions_validated} />
        <MetricRow
          label="Strict order toggle"
          value={data.strict_enabled ? "ENABLED" : "DISABLED"}
        />
      </dl>
    </PanelBody>
  );
}

export function VisionPanel({ data }: { data: DebuggerReport["vision"] }) {
  return (
    <PanelBody>
      <PanelStatus
        tone="vision"
        label={`Vision verified (confidence: ${data.confidence.toFixed(1)}%)`}
      />
      <p className="text-muted-foreground text-xs">
        Bounding boxes are overlaid on the scan in the document viewer while this tab is
        active.
      </p>
      <DataTable
        head={["Label", "Bounding box", "Conf."]}
        rows={data.elements.map((e) => [
          e.label,
          `[${e.box.join(", ")}]`,
          `${e.conf.toFixed(1)}%`,
        ])}
        caption="Detected diagram elements"
      />
    </PanelBody>
  );
}

export function DensityPanel({ data }: { data: DebuggerReport["density"] }) {
  const ok = data.ratio >= data.threshold;
  return (
    <PanelBody>
      <PanelStatus
        tone={ok ? "pass" : "warn"}
        label={ok ? "High density" : "Low density — fluff flagged"}
      />
      <dl>
        <MetricRow label="Density ratio" value={`${data.ratio.toFixed(1)}%`} />
        <MetricRow label="Threshold" value={`${data.threshold}%`} />
        <MetricRow label="Valid keyword hits" value={data.keyword_hits} />
        <MetricRow label="Total word count" value={data.word_count} />
      </dl>
      <p className="bg-muted text-muted-foreground rounded-md p-2 font-mono text-xs">
        ({data.keyword_hits} / {data.word_count}) × 100 ={" "}
        {((data.keyword_hits / data.word_count) * 100).toFixed(2)}% → normalized{" "}
        {data.ratio.toFixed(1)}%
      </p>
    </PanelBody>
  );
}

export function AggregatorPanel({ data }: { data: DebuggerReport["aggregator"] }) {
  const full = data.total >= data.max;
  return (
    <PanelBody>
      <PanelStatus
        tone={full ? "pass" : "warn"}
        label={`${full ? "Full match" : "Partial match"} (${data.total}/${data.max})`}
      />
      <DataTable
        head={["Concept", "Award", "Max", "Match type"]}
        rows={data.rows.map((r) => [r.concept, r.award, r.max, r.match])}
        caption="Rubric aggregation"
      />
      <p className="text-foreground font-mono text-sm">
        Total: {data.total.toFixed(1)} / {data.max.toFixed(1)}
      </p>
    </PanelBody>
  );
}
