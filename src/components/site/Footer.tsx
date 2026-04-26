import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-surface-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/20">
                <span className="h-3 w-3 rounded-full bg-primary" />
              </div>
              <span className="text-lg font-semibold tracking-tight">medilens</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Empowering healthcare providers to make faster, more accurate
              decisions — improving patient outcomes & lives through AI-driven
              medical imaging.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/catalog" className="hover:text-foreground">Catalog</Link></li>
              <li><Link to="/categories" className="hover:text-foreground">Categories</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>hello@medilens.bio</li>
              <li>+1 (555) 0123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} MediLens, Inc. All rights reserved.</p>
          <p>Built for the future of diagnostics.</p>
        </div>
      </div>
    </footer>
  );
}
