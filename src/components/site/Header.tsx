import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/20 transition-smooth group-hover:scale-110">
            <span className="h-3 w-3 rounded-full bg-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight">medilens</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/catalog"
            className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted-foreground transition-smooth hover:border-primary/40 hover:text-foreground sm:flex"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search products</span>
          </Link>
          <Link
            to="/contact"
            className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-smooth hover:opacity-90 md:inline-flex"
          >
            Get in touch
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "text-foreground bg-secondary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-foreground px-4 py-3 text-center text-base font-medium text-background"
            >
              Get in touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
