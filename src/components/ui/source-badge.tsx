import { Monitor, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaperSource } from "@/lib/types";

export function SourceBadge({
  source,
  className,
}: {
  source: PaperSource;
  className?: string;
}) {
  const isMobile = source === "mobile";
  const Icon = isMobile ? Smartphone : Monitor;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-caption whitespace-nowrap",
        isMobile
          ? "bg-mobile-soft text-mobile-strong border-mobile-strong/20"
          : "bg-web-soft text-web-strong border-web-strong/20",
        className,
      )}
    >
      <Icon size={10} className="shrink-0" aria-hidden />
      {isMobile ? "Mobile" : "Web"}
    </span>
  );
}
