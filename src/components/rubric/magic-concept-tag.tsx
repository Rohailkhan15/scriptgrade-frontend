import { Pencil, X } from "lucide-react";
import type { MagicConcept } from "@/lib/types";

export function MagicConceptTag({
  concept,
  onEdit,
  onDelete,
}: {
  concept: MagicConcept;
  onEdit: (c: MagicConcept) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <span className="border-primary/25 bg-brand-soft text-brand-strong inline-flex max-w-full items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm">
      <span className="min-w-0 truncate font-medium">{concept.keyword}</span>
      <span className="text-primary/70 tabular shrink-0 text-xs">
        {concept.points}
        {concept.points === 1 ? "pt" : "pts"}
      </span>
      <button
        type="button"
        onClick={() => onEdit(concept)}
        aria-label={`Edit ${concept.keyword}`}
        className="text-primary/60 hover:text-brand-strong shrink-0 rounded-sm transition-colors"
      >
        <Pencil size={12} />
      </button>
      <button
        type="button"
        onClick={() => onDelete(concept.id)}
        aria-label={`Remove ${concept.keyword}`}
        className="text-primary/60 hover:text-alert shrink-0 rounded-sm transition-colors"
      >
        <X size={12} />
      </button>
    </span>
  );
}
