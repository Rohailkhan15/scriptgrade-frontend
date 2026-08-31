import type { DebuggerReport } from "@/lib/types";

// Boxes are authored in a 512x680 reference space and scaled to the viewer.
const REF_W = 512;
const REF_H = 680;

export function BoundingBoxOverlay({
  elements,
}: {
  elements: DebuggerReport["vision"]["elements"];
}) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {elements.map((e) => {
        const [x1, y1, x2, y2] = e.box;
        return (
          <div
            key={e.label}
            className="border-vision absolute border-2"
            style={{
              left: `${(x1 / REF_W) * 100}%`,
              top: `${(y1 / REF_H) * 100}%`,
              width: `${((x2 - x1) / REF_W) * 100}%`,
              height: `${(Math.max(y2 - y1, 24) / REF_H) * 100}%`,
              mixBlendMode: "multiply",
            }}
          >
            <span className="bg-vision text-caption absolute -top-5 left-0 rounded-sm px-1 text-white">
              {e.label} · {e.conf.toFixed(1)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
