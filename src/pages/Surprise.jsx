import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Home } from "lucide-react";
import Flower from "../components/Flower";
import { Petals } from "../components/Ambient";
import { finalIntro, finalMessage, finalSignature } from "../data/content";

// Heart outline drawn as an SVG path (parametric heart curve)
const HEART_PATH = (() => {
  const parts = [];
  for (let i = 0; i <= 120; i++) {
    const t = (i / 120) * Math.PI * 2;
    const x = 16 * Math.sin(t) ** 3;
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    parts.push(`${i ? "L" : "M"}${(x * 5).toFixed(2)} ${(y * 5).toFixed(2)}`);
  }
  return parts.join(" ") + "Z";
})();

export default function Surprise() {
  const [phase, setPhase] = useState("idle"); // idle | open

  // Star trail particles shown once when the surprise opens
  const trail = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        return { id: i, x: Math.cos(angle) * 42, y: Math.sin(angle) * 36, delay: i * 0.05 };
      }),
    []
  );

  return (
    <section className={`page-section surprise ${phase}`}>
      <div className="surprise-bg" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {phase === "idle" ? (
          <motion.div
            key="idle"
            className="surprise-center"
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.7 } }}
          >
            <motion.div
              className="glow-flower"
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Flower size={170} variant="white" glow />
            </motion.div>
            <motion.p
              className="final-intro"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {finalIntro}
            </motion.p>
            <motion.button
              className="btn-glow"
              onClick={() => setPhase("open")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Open Your Surprise
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            className="surprise-center open-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Petals count={30} className="surprise-petals" />

            <div className="trail" aria-hidden="true">
              {trail.map((p) => (
                <motion.span
                  key={p.id}
                  className="trail-star"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: `${p.x}vmin`, y: `${p.y}vmin`, opacity: 0, scale: 0.2 }}
                  transition={{ duration: 1.8, delay: p.delay, ease: "easeOut" }}
                />
              ))}
            </div>

            <div className="heart-wrap" aria-hidden="true">
              <svg viewBox="-100 -100 200 200" className="heart-svg">
                <motion.path
                  d={HEART_PATH}
                  fill="rgba(220,235,250,0.12)"
                  stroke="#DCEBFA"
                  strokeWidth="1.6"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 1 }}
                  transition={{ pathLength: { duration: 2.6, ease: "easeInOut" }, fillOpacity: { delay: 2, duration: 1 } }}
                />
              </svg>
              <motion.div
                className="heart-flower"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 1.4 }}
              >
                <Flower size={90} variant="plum" />
              </motion.div>
            </div>

            <motion.div
              className="final-card glass"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 1.1 }}
            >
              <p className="final-message">{finalMessage}</p>
            </motion.div>

            <motion.p
              className="final-signature"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.6, duration: 1.2 }}
            >
              {finalSignature}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 1 }}
            >
              <Link to="/" className="btn-ghost">
                <Home size={16} /> Return to Home
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
