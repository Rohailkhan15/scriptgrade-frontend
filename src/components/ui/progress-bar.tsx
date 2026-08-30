import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max = 100,
  label,
  tone = "brand",
  className,
}: {
  value: number;
  max?: number;
  label?: string;
  tone?: "brand" | "pass" | "warn";
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const fill = {
    brand: "bg-primary",
    pass: "bg-pass",
    warn: "bg-warn",
  }[tone];

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="text-caption text-muted-foreground mb-1.5 flex items-center justify-between">
          <span className="min-w-0 truncate">{label}</span>
          <span className="tabular shrink-0">{Math.round(pct)}%</span>
        </div>
      )}
      <div
        className="bg-muted h-2 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-500", fill)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
