import { forwardRef } from "react";

const CARD_COLORS = [
  { gradient: "from-indigo-500 to-purple-600",  glow: "rgba(99,102,241,0.3)",  accent: "#818cf8", bg: "rgba(99,102,241,0.08)"  },
  { gradient: "from-pink-500 to-rose-600",      glow: "rgba(236,72,153,0.3)",  accent: "#f472b6", bg: "rgba(236,72,153,0.08)"  },
  { gradient: "from-amber-500 to-orange-600",   glow: "rgba(245,158,11,0.3)",  accent: "#fbbf24", bg: "rgba(245,158,11,0.08)"  },
  { gradient: "from-emerald-500 to-teal-600",   glow: "rgba(16,185,129,0.3)",  accent: "#34d399", bg: "rgba(16,185,129,0.08)"  },
  { gradient: "from-cyan-500 to-blue-600",      glow: "rgba(6,182,212,0.3)",   accent: "#22d3ee", bg: "rgba(6,182,212,0.08)"   },
  { gradient: "from-violet-500 to-fuchsia-600", glow: "rgba(139,92,246,0.3)",  accent: "#a78bfa", bg: "rgba(139,92,246,0.08)"  },
  { gradient: "from-red-500 to-pink-600",       glow: "rgba(239,68,68,0.3)",   accent: "#fb7185", bg: "rgba(239,68,68,0.08)"   },
  { gradient: "from-sky-500 to-indigo-600",     glow: "rgba(14,165,233,0.3)",  accent: "#38bdf8", bg: "rgba(14,165,233,0.08)"  },
];

export { CARD_COLORS };

const ButtonCard = forwardRef(function ButtonCard({ button, index, onClick }, ref) {
  const color = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="animate-fade-in-up gradient-border group relative block cursor-pointer overflow-hidden rounded-xl border border-white/[0.06] bg-surface p-6 transition-all duration-400 hover:scale-[1.04] hover:border-transparent"
      style={{
        animationDelay: `${index * 100 + 200}ms`,
        "--card-color": color.accent,
      }}
    >
      {/* Hover glow background */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 70% 50%, ${color.bg}, transparent 70%)` }}
      />

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${color.gradient} opacity-0 transition-all duration-500 group-hover:opacity-100`}
      />

      <div className="relative flex items-center gap-4">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color.gradient} text-sm font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
          style={{ boxShadow: `0 4px 15px ${color.glow}` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-lg font-semibold text-white transition-colors duration-300">
          <span className="group-hover:hidden">{button.title}</span>
          <span
            className="hidden bg-clip-text text-transparent group-hover:inline"
            style={{ backgroundImage: `linear-gradient(135deg, ${color.accent}, white)` }}
          >
            {button.title}
          </span>
        </h3>
      </div>

      {/* Arrow */}
      <div
        className="absolute left-5 top-1/2 -translate-y-1/2 text-lg opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100"
        style={{ color: color.accent }}
      >
        &#8592;
      </div>
    </div>
  );
});

export default ButtonCard;
