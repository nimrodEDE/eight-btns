import { useState, useRef, useCallback } from "react";
import ButtonCard from "../components/ButtonCard";
import ExpandOverlay from "../components/ExpandOverlay";

export default function HomePage({ data }) {
  const [expanded, setExpanded] = useState(null); // { button, index, rect }
  const cardRefs = useRef({});

  const setCardRef = useCallback((id) => (el) => {
    cardRefs.current[id] = el;
  }, []);

  function handleCardClick(button, index) {
    const el = cardRefs.current[button.id];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setExpanded({ button, index, rect });
  }

  function handleClose() {
    setExpanded(null);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      {/* Top-left SVG logo */}
      <div className="fixed top-4 left-4 z-20">
        <img src={`${import.meta.env.BASE_URL}logo-dad.svg`} alt="" className="h-20 w-auto" />
      </div>

      {/* Top-right SVG logo */}
      <div className="fixed top-4 right-4 z-20">
        <img src={`${import.meta.env.BASE_URL}logo-dad-2.svg`} alt="" className="h-20 w-auto" />
      </div>

      {/* Animated background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-pulse-glow absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/[0.07] blur-[120px]" />
        <div className="animate-pulse-glow absolute bottom-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-pink-600/[0.06] blur-[120px]" style={{ animationDelay: "2s" }} />
        <div className="animate-pulse-glow absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-600/[0.05] blur-[100px]" style={{ animationDelay: "4s" }} />

        {/* Spinning ring decoration */}
        <div className="animate-spin-slow absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]" />
        <div className="animate-spin-slow absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.02]" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Title with shimmer effect */}
        <div className="animate-fade-in-down mb-14 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span
              className="animate-shimmer bg-gradient-to-r from-indigo-400 via-pink-400 to-amber-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% auto" }}
            >
              {data.mainTitle}
            </span>
          </h1>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500 animate-gradient" />
        </div>

        {/* Button grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {data.buttons.map((button, index) => (
            <ButtonCard
              key={button.id}
              ref={setCardRef(button.id)}
              button={button}
              index={index}
              onClick={() => handleCardClick(button, index)}
            />
          ))}
        </div>

        <p className="animate-fade-in mt-12 text-center text-xs text-slate-600" style={{ animationDelay: "1.5s" }}>
          <a
            href="#/admin"
            className="transition-colors duration-300 hover:text-indigo-400"
          >
            ניהול
          </a>
        </p>
      </div>

      {/* Full-screen expand overlay */}
      {expanded && (
        <ExpandOverlay
          button={expanded.button}
          index={expanded.index}
          startRect={expanded.rect}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
