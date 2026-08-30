import { cn } from "@/lib/utils";

export function ScoreDisplay({
  score,
  max,
  size = "md",
  className,
}: {
  score: number | null;
  max: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const pct = score === null ? 0 : score / max;
  const tone =
    score === null
      ? "text-muted-foreground"
      : pct >= 0.7
        ? "text-pass-strong"
        : pct >= 0.5
          ? "text-warn-strong"
          : "text-alert-strong";

  const sizes = {
    sm: "text-body",
    md: "text-heading-1",
    lg: "text-display-lg",
  } as const;

  return (
    <span
      className={cn(
        "font-display tabular leading-none font-bold",
        sizes[size],
        tone,
        className,
      )}
    >
      {score === null ? "—" : score}
      <span
        className={cn(
          "text-muted-foreground font-medium",
          size === "lg" ? "text-heading-1" : "text-caption",
        )}
      >
        {" "}
        / {max}
      </span>
    </span>
  );
}
