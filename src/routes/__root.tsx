import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBottomNav } from "@/components/site/MobileBottomNav";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dectrocel® — Revolutionising Respiratory Healthcare in X-ray AI" },
      { name: "description", content: "Dectrocel AI Tool delivers fast, accurate assessment of lung health using digital chest X-rays and CT Thorax imaging." },
      { name: "author", content: "Dectrocel" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Dectrocel® — Revolutionising Respiratory Healthcare in X-ray AI" },
      { name: "twitter:title", content: "Dectrocel® — Revolutionising Respiratory Healthcare in X-ray AI" },
      { property: "og:description", content: "Dectrocel AI Tool delivers fast, accurate assessment of lung health using digital chest X-rays and CT Thorax imaging." },
      { name: "twitter:description", content: "Dectrocel AI Tool delivers fast, accurate assessment of lung health using digital chest X-rays and CT Thorax imaging." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fbdd8865-c15b-4205-9e2e-4fbc3b870548/id-preview-0755c9d1--9504bdb7-b0c2-4749-a60e-046fcb0f6552.lovable.app-1777204000050.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fbdd8865-c15b-4205-9e2e-4fbc3b870548/id-preview-0755c9d1--9504bdb7-b0c2-4749-a60e-046fcb0f6552.lovable.app-1777204000050.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
      <Toaster />
    </div>
  );
}
