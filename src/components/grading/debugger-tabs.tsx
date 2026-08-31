import { cn } from "@/lib/utils";
import type { DebuggerReport } from "@/lib/types";
import {
  AggregatorPanel,
  DensityPanel,
  GarbageTextPanel,
  NegationPanel,
  SequenceDagPanel,
  SpellingPanel,
  SynonymPanel,
  VisionPanel,
} from "./debuggers";

export const debuggerMeta = [
  { n: 1, roman: "I", name: "Garbage Text", tone: "alert" },
  { n: 2, roman: "II", name: "Negation", tone: "alert" },
  { n: 3, roman: "III", name: "Synonym", tone: "pass" },
  { n: 4, roman: "IV", name: "Spelling", tone: "warn" },
  { n: 5, roman: "V", name: "Sequence DAG", tone: "warn" },
  { n: 6, roman: "VI", name: "Vision AI", tone: "vision" },
  { n: 7, roman: "VII", name: "Density", tone: "warn" },
  { n: 8, roman: "VIII", name: "Aggregator", tone: "pass" },
] as const;

const activeTone: Record<string, string> = {
  alert: "border-alert bg-alert-soft text-alert-strong",
  pass: "border-pass bg-pass-soft text-pass-strong",
  warn: "border-warn bg-warn-soft text-warn-strong",
  vision: "border-vision bg-vision-soft text-vision-strong",
};

export function DebuggerTabs({
  report,
  active,
  onChange,
}: {
  report: DebuggerReport;
  active: number;
  onChange: (n: number) => void;
}) {
  return (
    <section className="border-border bg-card rounded-lg border">
      <div className="border-border border-b p-3">
        <h2 className="text-caption text-muted-foreground mb-2 uppercase">
          8-Debugger Diagnostics
        </h2>
        <div
          role="tablist"
          aria-label="Debugger panels"
          className="grid grid-cols-2 gap-1.5 sm:grid-cols-4"
        >
          {debuggerMeta.map((d) => {
            const isActive = active === d.n;
            return (
              <button
                key={d.n}
                role="tab"
                id={`debugger-tab-${d.n}`}
                aria-selected={isActive}
                aria-controls={`debugger-panel-${d.n}`}
                onClick={() => onChange(d.n)}
                className={cn(
                  "flex min-w-0 items-center gap-1.5 rounded-md border px-2 py-1.5 text-left text-xs font-medium transition-colors",
                  isActive
                    ? activeTone[d.tone]
                    : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <span className="font-display shrink-0 font-bold">{d.roman}</span>
                <span className="min-w-0 truncate">{d.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div
        role="tabpanel"
        id={`debugger-panel-${active}`}
        aria-labelledby={`debugger-tab-${active}`}
        className="p-4"
      >
        {active === 1 && <GarbageTextPanel data={report.garbage} />}
        {active === 2 && <NegationPanel data={report.negation} />}
        {active === 3 && <SynonymPanel data={report.synonym} />}
        {active === 4 && <SpellingPanel data={report.spelling} />}
        {active === 5 && <SequenceDagPanel data={report.sequence} />}
        {active === 6 && <VisionPanel data={report.vision} />}
        {active === 7 && <DensityPanel data={report.density} />}
        {active === 8 && <AggregatorPanel data={report.aggregator} />}
      </div>
    </section>
  );
}
