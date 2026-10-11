import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Flower from "../components/Flower";
import TextReveal from "../components/TextReveal";
import { Petals } from "../components/Ambient";
import { gardenFlowers, secretMessage } from "../data/content";

const isSmall = typeof window !== "undefined" && window.innerWidth < 640;
const BASE_SIZE = isSmall ? 70 : 118;

// Gentle stem with two leaves in soft blue tones
function Stem({ height }) {
  return (
    <svg className="stem" viewBox="0 0 40 160" style={{ height }} aria-hidden="true">
      <path d="M20 0 C 26 50, 14 110, 20 160" stroke="#78A9E8" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M20 110 C 6 100, 4 84, 14 78 C 22 92, 24 100, 20 110Z" fill="#78A9E8" opacity="0.45" />
      <path d="M20 80 C 34 70, 36 54, 26 48 C 18 62, 16 70, 20 80Z" fill="#DCEBFA" opacity="0.4" />
    </svg>
  );
}

// One flower that sways with the cursor. Each flower has its own depth.
function FlowerSpot({ flower, index, sway, onOpen, bloom = false }) {
  const depth = 0.6 + (index % 3) * 0.25;
  const rotate = useTransform(sway, (v) => v * 8 * depth);
  const x = useTransform(sway, (v) => v * 12 * depth);
  const size = Math.round(BASE_SIZE * flower.scale);

  return (
    <motion.button
      className="spot"
      style={{ left: `${flower.x}%`, top: `${flower.y}%`, marginLeft: -size / 2, x, rotate, width: size }}
      onClick={() => onOpen(flower)}
      aria-label={flower.secret ? "A hidden flower" : `Flower ${index + 1}, tap to read its note`}
    >
      <Flower size={size} variant={flower.variant} bloom={bloom} className="flower-spot" />
      <Stem height={size * 1.1} />
    </motion.button>
  );
}

export default function Garden() {
  const mx = useMotionValue(0);
  const sway = useSpring(mx, { stiffness: 50, damping: 14 });
  const [active, setActive] = useState(null);
  const [blooms, setBlooms] = useState([]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
  };

  const makeBloom = () => {
    const pick = gardenFlowers.filter((f) => !f.secret);
    const source = pick[Math.floor(Math.random() * pick.length)];
    const flower = {
      id: `bloom-${Date.now()}`,
      x: 12 + Math.random() * 76,
      y: 62 + Math.random() * 22,
      scale: 0.7 + Math.random() * 0.4,
      variant: Math.random() > 0.5 ? "plum" : "white",
      message: source.message,
    };
    setBlooms((b) => [...b, flower]);
    setActive(flower);
  };

  const noteText = active ? (active.secret ? secretMessage : active.message) : "";

  return (
    <section className="page-section garden" onMouseMove={onMove} onMouseLeave={() => mx.set(0)}>
      <Petals count={16} />
      <div className="moon-glow" aria-hidden="true" />

      <div className="container center">
        <p className="eyebrow">A dreamy garden</p>
        <h1 className="display">
          <TextReveal text="Flowers for Mirchi" />
        </h1>
        <p className="lead">
          Move your cursor to sway the garden, and tap a flower to read its note.
        </p>
        <button className="btn-glow" onClick={makeBloom}>
          Make a Flower Bloom
        </button>
      </div>

      <div className="garden-field">
        <motion.div
          className="centerpiece"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6 }}
          style={{ x: useTransform(sway, (v) => v * -10) }}
        >
          <Flower size={isSmall ? 170 : 260} variant="white" glow />
        </motion.div>

        {gardenFlowers.map((f, i) => (
          <FlowerSpot key={f.id} flower={f} index={i} sway={sway} onOpen={setActive} />
        ))}
        {blooms.map((f, i) => (
          <FlowerSpot key={f.id} flower={f} index={i} sway={sway} onOpen={setActive} bloom />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            className="flower-note glass"
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <p>{noteText}</p>
            <button className="text-btn" onClick={() => setActive(null)}>
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
