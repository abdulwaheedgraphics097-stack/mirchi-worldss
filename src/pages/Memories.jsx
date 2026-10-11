import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Flower from "../components/Flower";
import Reveal from "../components/Reveal";
import TextReveal from "../components/TextReveal";
import { memories, timeline } from "../data/content";

// Soft, original artwork used until real photos are added
function Art({ kind }) {
  return (
    <div className={`art art-${kind}`} aria-hidden="true">
      <span className="art-orb" />
      <span className="art-cloud ac-1" />
      <span className="art-cloud ac-2" />
      {kind === "flowers" && (
        <>
          <Flower className="art-f1" size={120} variant="white" />
          <Flower className="art-f2" size={86} variant="plum" />
        </>
      )}
      {kind === "stars" &&
        Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="art-star"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${i * 0.3}s` }}
          />
        ))}
      {kind === "lake" && <span className="art-lake" />}
      {kind === "petals" &&
        Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            className={`petal art-p ${i % 2 ? "petal-white" : "petal-plum"}`}
            style={{ left: `${(i * 29) % 90}%`, top: `${(i * 41) % 80}%`, width: 14, height: 19 }}
          />
        ))}
    </div>
  );
}

// Shows a real photo if src is set; if it fails to load, the artwork stays visible
function Photo({ item }) {
  return (
    <div className="photo-frame">
      <Art kind={item.kind} />
      {item.src && (
        <img
          src={item.src}
          alt={item.caption}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
    </div>
  );
}

export default function Memories() {
  const [active, setActive] = useState(null);

  const prev = () => setActive((i) => (i - 1 + memories.length) % memories.length);
  const next = () => setActive((i) => (i + 1) % memories.length);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const current = active !== null ? memories[active] : null;

  return (
    <section className="page-section memories">
      <div className="container center">
        <p className="eyebrow">Memory garden</p>
        <h1 className="display">
          <TextReveal text="Little Moments, Beautiful Feelings" />
        </h1>
        <Reveal delay={0.3}>
          <p className="lead">
            These are placeholder visuals. Replace the captions anytime, or add your own photos in the data file.
          </p>
        </Reveal>
      </div>

      <div className="polaroid-grid">
        {memories.map((item, i) => (
          <Reveal key={item.id} delay={(i % 3) * 0.12}>
            <button
              className="polaroid"
              style={{ "--r": `${(i % 2 ? 1 : -1) * (1 + (i % 3) * 0.6)}deg` }}
              onClick={() => setActive(i)}
              aria-label={`Open memory: ${item.caption}`}
            >
              <Photo item={item} />
              <span className="polaroid-caption">{item.caption}</span>
              <span className="polaroid-date">{item.date}</span>
            </button>
          </Reveal>
        ))}
      </div>

      <div className="timeline-wrap">
        <Reveal>
          <h2 className="section-title">Timeline of Special Dates</h2>
          <p className="lead small">Add special dates and moments here later.</p>
        </Reveal>
        <ol className="timeline">
          {timeline.map((t, i) => (
            <li key={t.id} className="timeline-item">
              <Reveal delay={i * 0.12}>
                <span className="dot" aria-hidden="true" />
                <span className="t-date">{t.date}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {createPortal(
        <AnimatePresence>
          {current && (
            <motion.div
              className="modal-backdrop"
              role="dialog"
              aria-modal="true"
              aria-label={current.caption}
              onClick={() => setActive(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.figure
                className="modal-card"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.92, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Photo item={current} />
                <figcaption>
                  <h3>{current.caption}</h3>
                  <p>{current.date}</p>
                </figcaption>
                <div className="modal-nav">
                  <button onClick={prev} aria-label="Previous memory">
                    <ChevronLeft size={22} />
                  </button>
                  <button onClick={next} aria-label="Next memory">
                    <ChevronRight size={22} />
                  </button>
                </div>
                <button className="modal-close" onClick={() => setActive(null)} aria-label="Close gallery">
                  <X size={20} />
                </button>
              </motion.figure>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
