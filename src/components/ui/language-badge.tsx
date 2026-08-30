import { cn } from "@/lib/utils";
import { languageLabels } from "@/lib/mock-data";
import type { LanguageCode } from "@/lib/types";

export function LanguageBadge({
  language,
  className,
}: {
  language: LanguageCode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-border bg-muted px-2 py-0.5 text-caption text-muted-foreground whitespace-nowrap",
        className,
      )}
      lang={language}
    >
      {languageLabels[language]}
    </span>
  );
}
