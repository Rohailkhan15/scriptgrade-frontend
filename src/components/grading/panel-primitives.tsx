import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PanelTone = "pass" | "alert" | "warn" | "vision";

const toneClass: Record<PanelTone, string> = {
  pass: "bg-pass-soft text-pass-strong border-pass/30",
  alert: "bg-alert-soft text-alert-strong border-alert/30",
  warn: "bg-warn-soft text-warn-strong border-warn/40",
  vision: "bg-vision-soft text-vision-strong border-vision/40",
};

export function PanelStatus({ tone, label }: { tone: PanelTone; label: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium",
        toneClass[tone],
      )}
    >
      <span
        className={cn(
          "size-2 shrink-0 rounded-full",
          tone === "pass" && "bg-pass",
          tone === "alert" && "bg-alert",
          tone === "warn" && "bg-warn",
          tone === "vision" && "bg-vision",
        )}
        aria-hidden
      />
      <span className="min-w-0">{label}</span>
    </div>
  );
}

export function MetricRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="border-border grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b py-2 last:border-0">
      <dt className="text-muted-foreground min-w-0 truncate text-sm">{label}</dt>
      <dd className="text-foreground shrink-0 font-mono text-sm">{value}</dd>
    </div>
  );
}

export function DataTable({
  head,
  rows,
  caption,
}: {
  head: string[];
  rows: ReactNode[][];
  caption?: string;
}) {
  return (
    <div className="border-border overflow-x-auto rounded-md border">
      <table className="w-full text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-muted text-caption text-muted-foreground">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-3 py-2 font-medium whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} className="px-3 py-2 font-mono text-xs whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PanelBody({ children }: { children: ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}
