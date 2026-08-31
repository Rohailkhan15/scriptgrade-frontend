import { LanguageBadge } from "@/components/ui/language-badge";
import { SourceBadge } from "@/components/ui/source-badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Inbox } from "lucide-react";
import type { Paper } from "@/lib/types";

export function BatchQueueTable({ papers }: { papers: Paper[] }) {
  if (papers.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No papers in the queue"
        description="Drop scanned PDFs or sync the mobile app to start grading."
      />
    );
  }

  return (
    <div className="border-border overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[42rem] text-left text-sm">
        <caption className="sr-only">Live paper processing queue</caption>
        <thead className="bg-muted text-caption text-muted-foreground">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              #
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Student ID
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Source
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Language
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Status
            </th>
            <th scope="col" className="px-3 py-2 text-right font-medium">
              Score
            </th>
          </tr>
        </thead>
        <tbody className="divide-border bg-card divide-y">
          {papers.map((p, i) => (
            <tr key={p.id} className="hover:bg-muted/60 transition-colors">
              <td className="text-muted-foreground px-3 py-2 font-mono text-xs">
                {i + 1}
              </td>
              <td className="px-3 py-2 font-medium whitespace-nowrap">{p.student_id}</td>
              <td className="px-3 py-2">
                <SourceBadge source={p.source} />
              </td>
              <td className="px-3 py-2">
                <LanguageBadge language={p.language} />
              </td>
              <td className="px-3 py-2">
                <StatusBadge status={p.status} />
              </td>
              <td className="tabular px-3 py-2 text-right font-mono text-xs">
                {p.score === null ? "—" : `${p.score}/${p.max_score}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
