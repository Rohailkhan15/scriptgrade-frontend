import { Settings2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { EvaluationToggles } from "@/lib/types";

const rows: {
  key: keyof EvaluationToggles;
  title: string;
  detail: string;
}[] = [
  {
    key: "spelling_correction",
    title: "Ignore Minor Spelling Mistakes",
    detail: "Levenshtein ≥ 85% · Debugger IV",
  },
  {
    key: "strict_dag_order",
    title: "Strict Procedural Order",
    detail: "DAG logic enforcement · Debugger V",
  },
  {
    key: "density_scoring",
    title: "Anti-Fluff Density Scoring",
    detail: "Min density 30% · Debugger VII",
  },
];

export function SensitivityToggles({
  toggles,
  onChange,
}: {
  toggles: EvaluationToggles;
  onChange: (key: keyof EvaluationToggles, value: boolean) => void;
}) {
  return (
    <ul className="divide-border divide-y">
      {rows.map((r) => (
        <li
          key={r.key}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 first:pt-0 last:pb-0"
        >
          <div className="flex min-w-0 items-start gap-2.5">
            <Settings2
              size={15}
              className="text-muted-foreground mt-0.5 shrink-0"
              aria-hidden
            />
            <div className="min-w-0">
              <label
                htmlFor={`toggle-${r.key}`}
                className="text-foreground block text-sm font-medium"
              >
                {r.title}
              </label>
              <p className="text-caption text-muted-foreground">{r.detail}</p>
            </div>
          </div>
          <Switch
            id={`toggle-${r.key}`}
            checked={toggles[r.key]}
            onCheckedChange={(v) => onChange(r.key, v)}
          />
        </li>
      ))}
    </ul>
  );
}
