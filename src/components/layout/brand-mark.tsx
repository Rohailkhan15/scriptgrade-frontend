import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2", className)}>
      <span
        aria-hidden
        className="bg-primary text-primary-foreground font-display grid size-8 shrink-0 place-items-center rounded-md text-sm font-extrabold"
      >
        S
      </span>
      {showWordmark && (
        <span className="font-display text-foreground truncate text-base font-bold tracking-tight">
          ScriptGrade
        </span>
      )}
    </span>
  );
}
