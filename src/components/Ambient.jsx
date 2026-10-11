import { useMemo } from "react";

/** Gently falling white and plum petals (pure CSS, lightweight). */
export function Petals({ count = 12, className = "" }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        dur: 12 + Math.random() * 10,
        size: 9 + Math.random() * 9,
        plum: i % 3 === 0,
        sway: Math.random() * 60 - 30,
      })),
    [count]
  );

  return (
    <div className={`petals ${className}`} aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.id}
          className={`petal ${p.plum ? "petal-plum" : "petal-white"}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.35,
            animationDuration: `${p.dur}s`,
            animationDelay: `-${p.delay}s`,
            "--sway": `${p.sway}px`,
          }}
        />
      ))}
    </div>
  );
}

/** Softly twinkling background stars. */
export function Stars({ count = 40, className = "" }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.4,
        delay: Math.random() * 4,
        dur: 2.5 + Math.random() * 3,
      })),
    [count]
  );

  return (
    <div className={`stars ${className}`} aria-hidden="true">
      {items.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.dur}s`,
            animationDelay: `-${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
