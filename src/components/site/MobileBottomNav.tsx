import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, Info, Mail, Settings } from "lucide-react";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/catalog", label: "Products", Icon: LayoutGrid },
  { to: "/about", label: "About", Icon: Info },
  { to: "/contact", label: "Contact", Icon: Mail },
  { to: "/settings", label: "Settings", Icon: Settings },
] as const;

/**
 * Mobile-only glass morphism bottom navigation.
 * Hidden on md+ screens.
 */
export function MobileBottomNav() {
  return (
    <>
      {/* spacer so page content isn't hidden behind the floating nav */}
      <div className="h-24 md:hidden" aria-hidden />
      <nav
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden"
        aria-label="Primary"
        style={{ width: "min(calc(100% - 1.5rem), 28rem)" }}
      >
        <div className="glass shadow-glass flex items-center justify-between rounded-full px-2 py-2">
          {items.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="group flex flex-1 flex-col items-center gap-0.5 rounded-full px-2 py-1.5 text-[10px] font-medium text-muted-foreground transition-smooth"
              activeProps={{ className: "text-primary" }}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition-smooth ${
                      isActive
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "text-muted-foreground group-hover:bg-secondary group-hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                  </span>
                  <span className={isActive ? "text-primary" : ""}>{label}</span>
                </>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
