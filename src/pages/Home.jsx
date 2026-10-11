import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Flower from "../components/Flower";
import { Petals, Stars } from "../components/Ambient";
import TextReveal from "../components/TextReveal";

export default function Home() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  // Parallax driven by the pointer position
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const moonX = useTransform(sx, [-1, 1], [-30, 30]);
  const moonY = useTransform(sy, [-1, 1], [-20, 20]);
  const cloudX = useTransform(sx, [-1, 1], [-50, 50]);
  const cloudX2 = useTransform(sx, [-1, 1], [40, -40]);
  const flowerX = useTransform(sx, [-1, 1], [18, -18]);
  const flowerY = useTransform(sy, [-1, 1], [12, -12]);
  const flower2X = useTransform(sx, [-1, 1], [-22, 22]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => navigate("/about"), 900);
  };

  return (
    <section ref={ref} className="hero" onMouseMove={onMove} aria-labelledby="hero-title">
      <div className="hero-sky" aria-hidden="true" />
      <motion.div className="moon" style={{ x: moonX, y: moonY }} aria-hidden="true" />
      <motion.div className="cloud cloud-1" style={{ x: cloudX }} aria-hidden="true" />
      <motion.div className="cloud cloud-2" style={{ x: cloudX2 }} aria-hidden="true" />
      <Stars count={60} />
      <Petals count={14} />

      <motion.div className="hero-flower hf-1" style={{ x: flowerX, y: flowerY }} aria-hidden="true">
        <Flower size={150} variant="white" glow />
      </motion.div>
      <motion.div className="hero-flower hf-2" style={{ x: flower2X }} aria-hidden="true">
        <Flower size={110} variant="plum" />
      </motion.div>

      <div className="hero-content">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.6, delay: 0.3 }}
        >
          a little magic
        </motion.p>

        <h1 id="hero-title" className="hero-title">
          <TextReveal text="A Little World Made Just for Mirchi." delay={0.5} />
        </h1>

        <motion.p
          className="hero-name"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <span className="hero-name-text">MIRCHI</span>
          <span className="hero-name-flower" aria-hidden="true">
            <Flower size={44} variant="plum" />
          </span>
        </motion.p>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          Some people make ordinary moments feel a little more magical.
        </motion.p>

        <motion.button
          className="btn-glow"
          onClick={enter}
          disabled={leaving}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Enter Your Little World <ArrowRight size={18} />
        </motion.button>
      </div>

      <AnimatePresence>
        {leaving && (
          <motion.div
            className="portal"
            aria-hidden="true"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 3, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
