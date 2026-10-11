import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { BackToTop, CursorGlow, RouteProgress } from "./components/Utilities";
import Home from "./pages/Home";
import About from "./pages/About";
import Garden from "./pages/Garden";
import Notes from "./pages/Notes";
import Memories from "./pages/Memories";
import Starry from "./pages/Starry";
import Music from "./pages/Music";
import Surprise from "./pages/Surprise";
import { pageMeta } from "./data/content";

const CALM_KEY = "for-mirchi-calm";

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [calm, setCalm] = useState(() => {
    try {
      return localStorage.getItem(CALM_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [canGlow] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  // Opening loader
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // Page titles, meta description and scroll reset on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
    const meta = pageMeta[location.pathname] ?? pageMeta["/"];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, [location.pathname]);

  // Remember calm mode
  useEffect(() => {
    document.documentElement.classList.toggle("calm", calm);
    try {
      localStorage.setItem(CALM_KEY, calm ? "1" : "0");
    } catch {
      /* storage unavailable, ignore */
    }
  }, [calm]);

  return (
    <MotionConfig reducedMotion={calm ? "always" : "user"}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

      <Header />
      <RouteProgress />
      <CursorGlow enabled={canGlow && !calm} />

      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={location.pathname}
          className="page"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/garden" element={<Garden />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/starry-sky" element={<Starry />} />
            <Route path="/music" element={<Music />} />
            <Route path="/final-surprise" element={<Surprise />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <Footer calm={calm} onToggleCalm={() => setCalm((c) => !c)} />
      <BackToTop />
    </MotionConfig>
  );
}
