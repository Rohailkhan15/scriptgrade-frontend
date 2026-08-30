import { AlertTriangle, CheckCircle, Clock, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExamStatus, PaperStatus } from "@/lib/types";

type AnyStatus = ExamStatus | PaperStatus;

const config: Record<
  AnyStatus,
  { label: string; className: string; icon: typeof CheckCircle; spin?: boolean }
> = {
  completed: {
    label: "Completed",
    className: "bg-pass-soft text-pass-strong border-pass/30",
    icon: CheckCircle,
  },
  finalized: {
    label: "Finalized",
    className: "bg-pass-soft text-pass-strong border-pass/30",
    icon: CheckCircle,
  },
  evaluated: {
    label: "Evaluated",
    className: "bg-pass-soft text-pass-strong border-pass/30",
    icon: CheckCircle,
  },
  scored: {
    label: "Scored",
    className: "bg-pass-soft text-pass-strong border-pass/30",
    icon: CheckCircle,
  },
  processing: {
    label: "Processing",
    className: "bg-brand-soft text-brand-strong border-primary/30",
    icon: Loader2,
    spin: true,
  },
  queued: {
    label: "Queued",
    className: "bg-muted text-muted-foreground border-border",
    icon: Clock,
  },
  needs_review: {
    label: "Needs Review",
    className: "bg-warn-soft text-warn-strong border-warn/40",
    icon: AlertTriangle,
  },
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground border-border",
    icon: FileText,
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: AnyStatus;
  className?: string;
}) {
  const c = config[status];
  const Icon = c.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-caption whitespace-nowrap",
        c.className,
        className,
      )}
    >
      <Icon size={12} className={cn("shrink-0", c.spin && "animate-spin")} aria-hidden />
      {c.label}
    </span>
  );
}
