import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingSpinner({
  size = 16,
  className,
  label,
}: {
  size?: number;
  className?: string;
  label?: string;
}) {
  return (
    <span className={cn("text-primary inline-flex items-center gap-2", className)}>
      <Loader2 size={size} className="animate-spin" aria-hidden />
      {label && <span className="text-caption text-muted-foreground">{label}</span>}
      <span className="sr-only">Loading</span>
    </span>
  );
}
