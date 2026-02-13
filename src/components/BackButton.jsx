import { Link } from "react-router-dom";

export default function BackButton({ to = "/", label = "חזרה לדף הבית" }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface px-5 py-2.5 text-sm text-slate-300 transition-all duration-300 hover:border-indigo-500/40 hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
    >
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&#8594;</span>
      {label}
    </Link>
  );
}
