import { cn } from "@/lib/utils";
import { isRTL } from "@/lib/mock-data";
import type { Paper } from "@/lib/types";
import { BoundingBoxOverlay } from "./bounding-box-overlay";

export function DocumentViewer({
  paper,
  viewMode,
  onViewModeChange,
  showBoxes,
}: {
  paper: Paper;
  viewMode: "scan" | "ocr";
  onViewModeChange: (m: "scan" | "ocr") => void;
  showBoxes: boolean;
}) {
  const rtl = isRTL(paper.language);

  return (
    <section className="border-border bg-card flex min-h-0 flex-1 flex-col rounded-lg border">
      <div className="border-border grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b px-3 py-2">
        <h2 className="text-caption text-muted-foreground min-w-0 truncate uppercase">
          Document Viewer · {paper.student_id}
        </h2>
        <div
          className="border-border flex shrink-0 rounded-md border p-0.5"
          role="group"
          aria-label="Document view mode"
        >
          {(["scan", "ocr"] as const).map((m) => (
            <button
              key={m}
              onClick={() => onViewModeChange(m)}
              aria-pressed={viewMode === m}
              className={cn(
                "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                viewMode === m
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m === "scan" ? "Scan" : "OCR Text"}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[22rem] flex-1 overflow-auto p-3">
        {viewMode === "scan" ? (
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md">
            <div className="border-border bg-muted/40 absolute inset-0 overflow-hidden rounded-md border">
              <div className="text-muted-foreground space-y-2 p-6">
                <p className="text-caption uppercase">Answer sheet · high-res scan</p>
                <p
                  dir={rtl ? "rtl" : "ltr"}
                  lang={paper.language}
                  className={cn(
                    "text-foreground text-sm leading-loose",
                    rtl && "font-nastaliq",
                  )}
                >
                  {paper.ocr_text}
                </p>
                <div className="border-border mt-4 grid grid-cols-2 gap-2">
                  <div className="border-border h-24 rounded-sm border border-dashed" />
                  <div className="border-border h-24 rounded-sm border border-dashed" />
                </div>
              </div>
            </div>
            {showBoxes && <BoundingBoxOverlay elements={paper.debuggers.vision.elements} />}
          </div>
        ) : (
          <div
            dir={rtl ? "rtl" : "ltr"}
            lang={paper.language}
            className={cn(
              "bg-muted/50 text-foreground rounded-md p-4 leading-loose whitespace-pre-wrap",
              rtl ? "font-nastaliq text-base" : "font-mono text-sm",
            )}
          >
            {paper.ocr_text}
          </div>
        )}
      </div>

      <div className="border-border text-caption text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 border-t px-3 py-2">
        <span>OCR confidence {paper.ocr_confidence.toFixed(1)}%</span>
        <span>{paper.word_count} words</span>
        <span>{rtl ? "RTL script" : "LTR script"}</span>
      </div>
    </section>
  );
}
