import { motion } from "framer-motion";
import Flower from "./Flower";

/** Opening screen: a white flower blooms and the name MIRCHI appears. */
export default function Loader() {
  return (
    <motion.div
      className="loader"
      role="status"
      aria-live="polite"
      aria-label="Loading"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Flower size={110} variant="white" glow />
      </motion.div>
      <div className="loader-name">
        {"MIRCHI".split("").map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div className="loader-bar">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
