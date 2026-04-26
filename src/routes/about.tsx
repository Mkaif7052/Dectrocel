import { createFileRoute, Link } from "@tanstack/react-router";
import lungs from "@/assets/product-lungs.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dectrocel®" },
      { name: "description", content: "Dectrocel is revolutionising respiratory healthcare in X-ray AI, powered by the Department of Pulmonary Medicine, SGPGIMS, Lucknow." },
      { property: "og:title", content: "About — Dectrocel®" },
      { property: "og:description", content: "Revolutionising respiratory healthcare in X-ray AI." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-wider text-primary">About Dectrocel</p>
          <h1 className="text-display mt-3 text-5xl sm:text-6xl">Respiratory AI, built for radiology.</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Dectrocel AI Tool delivers fast, accurate assessment of lung health
            using digital chest X-rays (19 conditions) and CT Thorax imaging.
            Powered by advanced AI/ML, it detects and triages TB, pneumonia,
            COPD, ILD (with sub-typing), lung cancer with TNM staging, and
            8+ other critical respiratory conditions.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Powered by the Department of Pulmonary Medicine, SGPGIMS, Lucknow —
            our mission is simple: faster, more accurate respiratory diagnostics
            that improve patient outcomes.
          </p>

          <dl className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
            <Stat value="205K+" label="X-ray scans processed" />
            <Stat value="19" label="X-ray conditions detected" />
            <Stat value="90%" label="Positive clinical rating" />
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90">
              Partner with us
            </Link>
            <Link to="/catalog" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium hover:border-primary/40">
              Explore products
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="aspect-square overflow-hidden rounded-[2rem] bg-gradient-mint shadow-elevated">
            <img src={lungs} alt="Dectrocel respiratory AI" className="h-full w-full object-contain p-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-display text-3xl sm:text-4xl">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
