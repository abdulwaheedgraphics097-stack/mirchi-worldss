import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import TextReveal from "../components/TextReveal";
import { starMessages, wishMessage } from "../data/content";

// Heart shape sampled as 16 points, expressed in percentages of the sky field
const HEART = Array.from({ length: 16 }, (_, i) => {
  const t = (i / 16) * Math.PI * 2;
  const x = 16 * Math.sin(t) ** 3;
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x: 50 + x * 2, y: 48 - y * 1.8 };
});
const HEART_LINE = [...HEART, HEART[0]].map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");

export default function Starry() {
  const [formed, setFormed] = useState(false);
  const [toast, setToast] = useState("");
  const [shootKey, setShootKey] = useState(0);

  // The stars drift into a heart shortly after the page opens
  useEffect(() => {
    const t = setTimeout(() => setFormed(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const background = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.2,
        delay: Math.random() * 4,
        dur: 2 + Math.random() * 3,
      })),
    []
  );

  const scatter = useMemo(
    () => HEART.map(() => ({ left: 5 + Math.random() * 90, top: 10 + Math.random() * 80 })),
    []
  );

  const reveal = (i) => setToast(starMessages[i % starMessages.length]);

  const reform = () => {
    setFormed(false);
    setTimeout(() => setFormed(true), 500);
  };

  const wish = () => {
    setShootKey((k) => k + 1);
    setToast(wishMessage);
  };

  return (
    <section className="page-section sky">
      <div className="sky-moon" aria-hidden="true" />
      <div className="sky-cloud sc-1" aria-hidden="true" />
      <div className="sky-cloud sc-2" aria-hidden="true" />

      <div className="sky-field">
        {background.map((s) => (
          <button
            key={s.id}
            className="sky-star bg-star"
            aria-label="A star. Tap to reveal a message"
            onClick={() => reveal(s.id)}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size + 6,
              height: s.size + 6,
              marginLeft: -(s.size + 6) / 2,
              marginTop: -(s.size + 6) / 2,
              animationDuration: `${s.dur}s`,
              animationDelay: `-${s.delay}s`,
            }}
          />
        ))}

        <svg className="heart-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <motion.polyline
            points={HEART_LINE}
            fill="none"
            stroke="rgba(220,235,250,0.75)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: formed ? 1 : 0 }}
            transition={{ duration: 2.5, delay: formed ? 1.6 : 0, ease: "easeInOut" }}
          />
        </svg>

        {HEART.map((p, i) => (
          <motion.button
            key={i}
            className="sky-star heart-star"
            aria-label="A heart star. Tap to reveal a hidden message"
            onClick={() => reveal(i)}
            initial={false}
            animate={{
              left: `${formed ? p.x : scatter[i].left}%`,
              top: `${formed ? p.y : scatter[i].top}%`,
            }}
            transition={{ duration: 2.2, delay: formed ? i * 0.14 : 0, ease: "easeInOut" }}
          />
        ))}

        {shootKey > 0 && (
          <motion.span
            key={shootKey}
            className="shooting"
            aria-hidden="true"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: "70vw", y: "35vh", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, ease: "easeIn" }}
          />
        )}
      </div>

      <div className="sky-content">
        <div className="sky-head">
          <p className="eyebrow">Tonight's sky</p>
          <h1 className="display">
            <TextReveal text="A Sky Full of Stars" />
          </h1>
          <p className="lead">
            Tap a star to reveal a hidden message. Watch the stars find their way into a heart.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {toast && (
            <motion.div
              key={toast}
              className="sky-toast glass"
              role="status"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <p>{toast}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="sky-controls">
          <button className="btn-glow" onClick={wish}>
            <Sparkles size={18} /> Make a Wish
          </button>
          <button className="btn-ghost" onClick={reform}>
            Form the Heart Again
          </button>
          <Link to="/final-surprise" className="btn-ghost">
            Continue to the Surprise <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
