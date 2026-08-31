import { ScoreDisplay } from "@/components/ui/score-display";
import { LanguageBadge } from "@/components/ui/language-badge";
import { SourceBadge } from "@/components/ui/source-badge";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Paper } from "@/lib/types";

export function ScoreWidget({ paper }: { paper: Paper }) {
  return (
    <section className="border-border bg-card rounded-lg border p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="text-caption text-muted-foreground uppercase">Final score</p>
          <ScoreDisplay score={paper.score} max={paper.max_score} size="lg" />
        </div>
        <StatusBadge status={paper.status} />
      </div>

      <dl className="border-border mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t pt-3">
        <div className="min-w-0">
          <dt className="text-caption text-muted-foreground">OCR confidence</dt>
          <dd className="tabular font-mono text-sm">
            {paper.ocr_confidence.toFixed(1)}%
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-caption text-muted-foreground">Word count</dt>
          <dd className="tabular font-mono text-sm">{paper.word_count} words</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-caption text-muted-foreground">Density ratio</dt>
          <dd className="tabular font-mono text-sm">{paper.density_ratio.toFixed(1)}%</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-caption text-muted-foreground">Language</dt>
          <dd className="mt-0.5">
            <LanguageBadge language={paper.language} />
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-caption text-muted-foreground">Source</dt>
          <dd className="mt-0.5">
            <SourceBadge source={paper.source} />
          </dd>
        </div>
      </dl>
    </section>
  );
}
