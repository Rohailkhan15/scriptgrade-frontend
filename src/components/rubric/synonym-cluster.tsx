import type { MagicConcept } from "@/lib/types";
import { EmptyState } from "@/components/ui/empty-state";
import { Network } from "lucide-react";

export function SynonymCluster({ concepts }: { concepts: MagicConcept[] }) {
  if (concepts.length === 0) {
    return (
      <EmptyState
        icon={Network}
        title="No synonym clusters yet"
        description="Synonym groups appear once concepts are extracted or added manually."
      />
    );
  }

  return (
    <ul className="divide-border divide-y">
      {concepts.map((c) => (
        <li
          key={c.id}
          className="grid grid-cols-[minmax(0,1fr)] gap-1 py-2.5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-3"
        >
          <span className="text-foreground truncate text-sm font-medium">
            {c.keyword}
          </span>
          <span className="flex min-w-0 flex-wrap gap-1.5">
            {c.synonyms.length === 0 ? (
              <span className="text-muted-foreground text-xs italic">
                No synonyms mapped
              </span>
            ) : (
              c.synonyms.map((s) => (
                <span
                  key={s}
                  className="bg-muted text-muted-foreground border-border rounded-sm border px-1.5 py-0.5 font-mono text-xs"
                >
                  {s}
                </span>
              ))
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
