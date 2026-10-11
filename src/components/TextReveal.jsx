import { motion } from "framer-motion";

/** Reveals text word by word with a soft blur-fade. */
export default function TextReveal({ text, as: Tag = "span", className = "", delay = 0 }) {
  const words = text.split(" ");
  return (
    <Tag className={`reveal-text ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="reveal-word"
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: delay + i * 0.08, ease: "easeOut" }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
