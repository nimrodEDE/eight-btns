import { useState, useEffect, useRef } from "react";
import { CARD_COLORS } from "./ButtonCard";

export default function ExpandOverlay({ button, index, startRect, onClose }) {
  const color = CARD_COLORS[index % CARD_COLORS.length];
  const [phase, setPhase] = useState("start"); // start -> expanding -> open -> closing -> done
  const overlayRef = useRef(null);

  useEffect(() => {
    // Force a frame at "start" position, then trigger expansion
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase("expanding");
      });
    });
  }, []);

  useEffect(() => {
    if (phase === "expanding") {
      const timer = setTimeout(() => setPhase("open"), 600);
      return () => clearTimeout(timer);
    }
    if (phase === "closing") {
      const timer = setTimeout(() => {
        setPhase("done");
        onClose();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, onClose]);

  function handleClose() {
    setPhase("closing");
  }

  const isAtCard = phase === "start" || phase === "closing";

  const overlayStyle = isAtCard
    ? {
        position: "fixed",
        top: startRect.top,
        left: startRect.left,
        width: startRect.width,
        height: startRect.height,
        borderRadius: "12px",
        zIndex: 50,
        transition: phase === "closing" ? "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
      }
    : {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        zIndex: 50,
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        style={{
          opacity: isAtCard ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
        onClick={handleClose}
      />

      {/* Expanding panel */}
      <div
        ref={overlayRef}
        className="overflow-hidden bg-surface"
        style={overlayStyle}
      >
        {/* Top gradient bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, ${color.accent}, ${color.glow.replace("0.3", "1")})`,
            opacity: isAtCard ? 0 : 1,
            transition: "opacity 0.3s ease 0.3s",
          }}
        />

        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${color.bg}, transparent 60%)`,
            opacity: isAtCard ? 0 : 0.6,
            transition: "opacity 0.4s ease 0.2s",
          }}
        />

        {/* Scrollable content */}
        <div
          className="relative h-full overflow-y-auto"
          style={{
            opacity: phase === "open" ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <div className="mx-auto max-w-3xl px-6 py-12 sm:px-12 sm:py-16">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="animate-slide-in mb-10 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300 transition-all duration-300 hover:border-white/25 hover:text-white hover:bg-white/10"
            >
              <span>&#8594;</span>
              חזרה
            </button>

            {/* Badge */}
            <div className="animate-slide-in" style={{ animationDelay: "100ms" }}>
              <span
                className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-bold text-white shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${color.accent}, ${color.glow.replace("0.3", "0.8")})`,
                  boxShadow: `0 4px 20px ${color.glow}`,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Title */}
            <h1
              className="animate-slide-in mt-4 text-3xl font-extrabold sm:text-5xl"
              style={{ animationDelay: "200ms" }}
            >
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, white, ${color.accent})` }}
              >
                {button.title}
              </span>
            </h1>

            {/* Subtitle */}
            {button.subtitle && (
              <p
                className="animate-slide-in mt-3 text-lg sm:text-xl font-light"
                style={{ color: color.accent, animationDelay: "300ms" }}
              >
                {button.subtitle}
              </p>
            )}

            {/* Divider */}
            <div
              className="animate-slide-in mt-8 mb-8 h-px"
              style={{
                background: `linear-gradient(90deg, ${color.accent}40, transparent)`,
                animationDelay: "350ms",
              }}
            />

            {/* Image */}
            {button.image && (
              <div
                className="animate-slide-in mb-8 overflow-hidden rounded-2xl border border-white/5"
                style={{ animationDelay: "400ms" }}
              >
                <img
                  src={button.image}
                  alt={button.title}
                  className="h-auto w-full max-h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            )}

            {/* Text */}
            <div
              className="animate-slide-in max-w-none text-lg leading-relaxed text-slate-300"
              style={{ animationDelay: button.image ? "450ms" : "400ms" }}
            >
              {button.text.split("\n").map((paragraph, i) => (
                <p key={i} className={i > 0 ? "mt-5" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
