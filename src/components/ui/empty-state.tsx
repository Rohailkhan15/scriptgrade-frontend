import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center",
        className,
      )}
    >
      <span className="bg-muted text-muted-foreground mb-3 grid size-10 shrink-0 place-items-center rounded-md">
        <Icon size={18} aria-hidden />
      </span>
      <p className="text-heading-2 text-foreground">{title}</p>
      {description && (
        <p className="text-muted-foreground mt-1 max-w-sm text-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
