import { useEffect, useState } from "react";
import { toast } from "sonner";

export function OverridePanel({
  studentId,
  currentScore,
  maxScore,
  onApply,
}: {
  studentId: string;
  currentScore: number;
  maxScore: number;
  onApply: (score: number, note: string) => void;
}) {
  const [score, setScore] = useState(currentScore);
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setScore(currentScore);
    setNote("");
  }, [studentId, currentScore]);

  const invalid = Number.isNaN(score) || score < 0 || score > maxScore;

  const submit = () => {
    if (invalid) return;
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      onApply(score, note);
      toast.success(`Override applied to ${studentId}`, {
        description: `Final score recorded as ${score} / ${maxScore}.`,
      });
    }, 700);
  };

  return (
    <section className="border-border bg-card space-y-3 rounded-lg border p-4">
      <h2 className="text-caption text-muted-foreground uppercase">Teacher Override</h2>

      <div className="space-y-1.5">
        <label htmlFor="override-score" className="text-foreground text-sm font-medium">
          Score override
        </label>
        <div className="flex items-center gap-2">
          <input
            id="override-score"
            type="number"
            min={0}
            max={maxScore}
            value={Number.isNaN(score) ? "" : score}
            onChange={(e) => setScore(Number(e.target.value))}
            aria-invalid={invalid}
            className="border-border bg-background focus:border-primary w-20 rounded-md border px-2 py-1 text-center font-mono text-lg outline-none"
          />
          <span className="text-muted-foreground text-sm">/ {maxScore}</span>
        </div>
        {invalid && (
          <p className="text-alert-strong text-caption" role="alert">
            Enter a score between 0 and {maxScore}.
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="override-note" className="text-foreground text-sm font-medium">
          Moderation note
        </label>
        <textarea
          id="override-note"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add moderation note for audit record…"
          className="border-border bg-background focus:border-primary w-full resize-none rounded-md border p-2 text-sm outline-none"
        />
      </div>

      <button
        onClick={submit}
        disabled={pending || invalid}
        className="bg-primary text-primary-foreground hover:bg-brand-light w-full rounded-md py-2 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50"
      >
        {pending ? "Saving…" : "Confirm Override"}
      </button>
    </section>
  );
}
