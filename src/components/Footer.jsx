import Flower from "./Flower";
import { footerLine } from "../data/content";

export default function Footer({ calm, onToggleCalm }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Flower size={26} variant="white" />
        <p className="footer-line">{footerLine}</p>
        <button
          className="calm-toggle"
          aria-pressed={calm}
          onClick={onToggleCalm}
          title="Reduces decorative movement"
        >
          Calm mode: {calm ? "On" : "Off"}
        </button>
      </div>
    </footer>
  );
}
