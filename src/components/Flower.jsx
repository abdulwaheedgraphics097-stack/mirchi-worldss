import { motion } from "framer-motion";

const PALETTE = {
  white: { petal: "#FFFFFF", edge: "#C9D6E8", inner: "#F2F8FF", center: "#704567", dot: "#F2F8FF" },
  plum: { petal: "#B99AB8", edge: "#704567", inner: "#EEE6F2", center: "#F2F8FF", dot: "#704567" },
};

const ANGLES = [0, 72, 144, 216, 288];

/**
 * A soft, layered SVG flower (white or plum). Pass bloom to animate it opening.
 */
export default function Flower({
  variant = "white",
  size = 120,
  bloom = false,
  glow = false,
  className = "",
}) {
  const c = PALETTE[variant] ?? PALETTE.white;
  const bloomProps = bloom
    ? {
        initial: { scale: 0.05, rotate: -120, opacity: 0 },
        animate: { scale: 1, rotate: 0, opacity: 1 },
        transition: { duration: 2.2, ease: [0.2, 0.8, 0.2, 1] },
      }
    : {};

  return (
    <motion.svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={`flower ${glow ? "flower-glow" : ""} ${className}`}
      aria-hidden="true"
      focusable="false"
      {...bloomProps}
    >
      {ANGLES.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path
            d="M0,0 C-16,-10 -16,-38 0,-44 C16,-38 16,-10 0,0Z"
            fill={c.petal}
            stroke={c.edge}
            strokeWidth="0.8"
          />
          <path
            d="M0,-4 C-7,-12 -7,-30 0,-36 C7,-30 7,-12 0,-4Z"
            fill={c.inner}
            opacity="0.6"
          />
        </g>
      ))}
      <circle r="9" fill={c.center} />
      <circle r="3.5" fill={c.dot} opacity="0.85" />
    </motion.svg>
  );
}
