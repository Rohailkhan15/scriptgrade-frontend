import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Paper } from "@/lib/types";
import { LanguageBadge } from "@/components/ui/language-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Users } from "lucide-react";

export function StudentSidebar({
  papers,
  activeId,
  search,
  flaggedOnly,
  onSearch,
  onToggleFlagged,
  onSelect,
}: {
  papers: Paper[];
  activeId: string | null;
  search: string;
  flaggedOnly: boolean;
  onSearch: (v: string) => void;
  onToggleFlagged: () => void;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="border-border bg-card flex flex-col rounded-lg border">
      <div className="border-border space-y-2 border-b p-3">
        <label htmlFor="student-search" className="sr-only">
          Search students
        </label>
        <div className="relative">
          <Search
            size={14}
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2"
            aria-hidden
          />
          <input
            id="student-search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search student ID"
            className="border-border bg-background focus:border-primary w-full rounded-md border py-1.5 pr-2 pl-8 text-sm outline-none"
          />
        </div>
        <label className="text-muted-foreground flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={flaggedOnly}
            onChange={onToggleFlagged}
            className="accent-primary size-3.5"
          />
          Flagged only
        </label>
      </div>

      <ul className="max-h-72 overflow-y-auto lg:max-h-[26rem]">
        {papers.length === 0 ? (
          <li className="p-3">
            <EmptyState
              icon={Users}
              title="No papers match"
              description="Adjust the search or clear the flagged filter."
            />
          </li>
        ) : (
          papers.map((p) => {
            const isActive = p.student_id === activeId;
            const flagged = p.status === "needs_review";
            return (
              <li key={p.id}>
                <button
                  onClick={() => onSelect(p.student_id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "border-border grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b px-3 py-2.5 text-left transition-colors",
                    isActive ? "bg-accent" : "hover:bg-muted",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      className={cn(
                        "size-2 shrink-0 rounded-full",
                        p.status === "needs_review"
                          ? "bg-warn"
                          : p.score === null
                            ? "bg-muted-foreground"
                            : "bg-pass",
                      )}
                      aria-hidden
                    />
                    <span className="min-w-0">
                      <span className="text-foreground block truncate text-sm font-medium">
                        {p.student_id}
                      </span>
                      <LanguageBadge language={p.language} className="mt-0.5" />
                    </span>
                  </span>
                  <span
                    className={cn(
                      "tabular shrink-0 font-mono text-xs",
                      flagged ? "text-warn-strong" : "text-muted-foreground",
                    )}
                  >
                    {p.score === null ? "—" : `${p.score}/${p.max_score}`}
                  </span>
                </button>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
