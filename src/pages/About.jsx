import { motion } from "framer-motion";
import { Heart, Moon, Sparkles, Star } from "lucide-react";
import Flower from "../components/Flower";
import Reveal from "../components/Reveal";
import TextReveal from "../components/TextReveal";
import { Petals } from "../components/Ambient";
import { aboutClosing, aboutHeading, aboutLead, appreciation } from "../data/content";

const icons = [Sparkles, Star, Moon, Heart];

export default function About() {
  return (
    <>
      <section className="page-section about">
        <Petals count={10} />

        <motion.div
          className="float-deco fd-1"
          aria-hidden="true"
          animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flower size={180} variant="white" />
        </motion.div>
        <motion.div
          className="float-deco fd-2"
          aria-hidden="true"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flower size={130} variant="plum" />
        </motion.div>

        <div className="container center">
          <p className="eyebrow">About Mirchi</p>
          <h1 className="display">
            <TextReveal text={aboutHeading} />
          </h1>
          <Reveal delay={0.4}>
            <p className="lead">{aboutLead}</p>
          </Reveal>
        </div>

        <div className="card-grid">
          {appreciation.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.id} delay={i * 0.12}>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                  <article className="glass-card">
                    <div className="icon-wrap">
                      <Icon size={24} />
                    </div>
                    <h2 className="card-title">{item.title}</h2>
                    <p>{item.text}</p>
                  </article>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="closing-line">
            <Flower size={48} variant="plum" />
            <p>{aboutClosing}</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
