import { Smartphone } from "lucide-react";

// Deterministic decorative QR-style matrix (mock pairing code).
const cells = Array.from({ length: 21 * 21 }, (_, i) => {
  const x = i % 21;
  const y = Math.floor(i / 21);
  const finder =
    (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)
      ? (x === 0 || x === 6 || y === 0 || y === 6 || (x > 1 && x < 5 && y > 1 && y < 5)) &&
        !(x > 13 && y > 13)
      : ((x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0);
  return finder;
});

export function MobileQRSync({ received }: { received: number }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="border-border bg-card rounded-md border p-3"
        role="img"
        aria-label="Pairing QR code for the ScriptGrade mobile app"
      >
        <div className="grid grid-cols-21 gap-px" style={{ width: 126 }}>
          {cells.map((on, i) => (
            <span
              key={i}
              className={on ? "bg-foreground" : "bg-transparent"}
              style={{ width: 5, height: 5 }}
            />
          ))}
        </div>
      </div>
      <p className="text-foreground mt-3 text-sm font-medium">
        Scan with the ScriptGrade App
      </p>
      <p className="text-muted-foreground mt-1 text-xs">
        Pair a phone to sync captured papers wirelessly.
      </p>
      <p className="border-pass/30 bg-pass-soft text-pass-strong text-caption mt-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1">
        <span className="bg-pass size-1.5 animate-pulse rounded-full" aria-hidden />
        <Smartphone size={11} aria-hidden />
        {received} papers received
      </p>
    </div>
  );
}
