import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow transition-smooth group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h3l2-6 4 12 2-8 2 4h5" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight">
          Dectrocel<span className="text-primary">®</span>
        </span>
        <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          X-ray AI
        </span>
      </div>
    </Link>
  );
}
