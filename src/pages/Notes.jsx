import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Shuffle } from "lucide-react";
import TextReveal from "../components/TextReveal";
import Reveal from "../components/Reveal";
import { loveNotes } from "../data/content";

function Envelope({ note, index, open, highlight, onToggle }) {
  return (
    <div id={`note-${index}`} className={`envelope-wrap ${highlight ? "highlight" : ""}`}>
      <button
        className={`envelope ${open ? "is-open" : ""}`}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`letter-${index}`}
        aria-label={`Envelope ${index + 1}. ${open ? "Close" : "Open"} the note`}
      >
        <span className="env-back" />
        <motion.span
          id={`letter-${index}`}
          className="letter"
          initial={false}
          animate={{ y: open ? -150 : 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: open ? 0.45 : 0 }}
        >
          <span className="letter-no">
            <Heart size={12} /> Note {String(index + 1).padStart(2, "0")}
          </span>
          <span className="letter-text">{note.text}</span>
        </motion.span>
        <span className="env-front" />
        <span className="env-flap" />
      </button>
    </div>
  );
}

export default function Notes() {
  const [openIndex, setOpenIndex] = useState(null);
  const [highlight, setHighlight] = useState(null);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const surpriseMe = () => {
    let i = Math.floor(Math.random() * loveNotes.length);
    if (loveNotes.length > 1) {
      while (i === openIndex) i = Math.floor(Math.random() * loveNotes.length);
    }
    setOpenIndex(i);
    setHighlight(i);
    timers.current.push(
      setTimeout(() => {
        document.getElementById(`note-${i}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 250),
      setTimeout(() => setHighlight(null), 2600)
    );
  };

  return (
    <section className="page-section notes">
      <div className="container center">
        <p className="eyebrow">Little love notes</p>
        <h1 className="display">
          <TextReveal text="A Few Words for You" />
        </h1>
        <Reveal delay={0.3}>
          <p className="lead">Tap an envelope to open it. Or let a random note find you.</p>
        </Reveal>
        <button className="btn-glow" onClick={surpriseMe}>
          <Shuffle size={18} /> Surprise Me
        </button>
      </div>

      <div className="notes-grid">
        {loveNotes.map((note, i) => (
          <Reveal key={note.id} delay={(i % 3) * 0.1}>
            <Envelope
              note={note}
              index={i}
              open={openIndex === i}
              highlight={highlight === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
