import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

export function DropZone({
  title,
  hint,
  accept = ".pdf,.png,.jpg,.jpeg",
  multiple = true,
  disabled = false,
  onFiles,
  className,
}: {
  title: string;
  hint: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  onFiles: (files: File[]) => void;
  className?: string;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (disabled) return;
        onFiles(Array.from(e.dataTransfer.files));
      }}
      className={cn(
        "border-border flex flex-col items-center justify-center rounded-lg border border-dashed px-4 py-8 text-center transition-colors",
        dragging && "border-primary bg-brand-soft",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <span className="bg-muted text-muted-foreground mb-3 grid size-10 place-items-center rounded-md">
        <UploadCloud size={18} aria-hidden />
      </span>
      <p className="text-heading-2 text-foreground">{title}</p>
      <p className="text-muted-foreground mt-1 max-w-xs text-xs">{hint}</p>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="border-border hover:bg-accent mt-4 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:pointer-events-none"
      >
        Browse Files
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        aria-label={title}
        onChange={(e) => {
          onFiles(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />
    </div>
  );
}
