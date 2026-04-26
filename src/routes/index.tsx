import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Activity,
  Target,
  FileText,
  Zap,
  Eye,
  CheckCircle2,
  Search,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import lungs from "@/assets/product-lungs.jpg";
import { ProductCard } from "@/components/site/ProductCard";
import { fetchCategories, fetchProducts } from "@/lib/queries";
import type { Category, Product } from "@/lib/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dectrocel® — Revolutionising Respiratory Healthcare in X-ray AI" },
      { name: "description", content: "Fast and accurate AI-powered chest X-ray and CT Thorax diagnostics. 19 X-ray conditions, TB, pneumonia, COPD, ILD, lung cancer with TNM staging." },
      { property: "og:title", content: "Dectrocel® — Revolutionising Respiratory Healthcare in X-ray AI" },
      { property: "og:description", content: "Check your lung health now — simple, fast, and reliable." },
    ],
  }),
  component: Index,
});

const conditions = [
  "TUBERCULOSIS", "PNEUMONIA", "COPD", "ILD", "LUNG CANCER",
  "PLEURAL EFFUSION", "PNEUMOTHORAX", "NODULES", "FIBROSIS", "EMPHYSEMA",
];

const howItWorks = [
  {
    Icon: Target,
    title: "Detect Location",
    points: ["Generates heatmaps and contour maps", "Pinpoints exact lesion location", "Helps precise diagnosis"],
  },
  {
    Icon: Activity,
    title: "Abnormality Score",
    points: ["Quantifies lesion probability", "Helps prioritize urgent cases", "Streamlined workflow"],
  },
  {
    Icon: FileText,
    title: "AI Report",
    points: ["Comprehensive case report", "Analysis results", "Condition overview", "Better decision making"],
  },
];

const benefits = [
  { Icon: Zap, title: "Fast Triage", desc: "Prioritize urgent cases in seconds." },
  { Icon: Eye, title: "Efficient Reading", desc: "AI overlays accelerate radiologist review." },
  { Icon: CheckCircle2, title: "Improved Accuracy", desc: "Clinically validated deep-learning models." },
  { Icon: Search, title: "Reduced Overlooked Cases", desc: "Catch subtle findings the eye can miss." },
];

const faqs = [
  {
    q: "Is Dectrocel compatible with analog and digital X-ray images?",
    a: "Yes. Dectrocel works seamlessly with both analog (digitised film) and digital chest X-ray images, integrating into your existing radiology workflow.",
  },
  {
    q: "How accurate is Dectrocel in detecting abnormalities?",
    a: "Dectrocel's models are clinically validated and trained on large, diverse datasets. They achieve high sensitivity across 19 chest X-ray conditions including TB, pneumonia, and lung cancer — consistently delivering accuracy on par with sub-specialist radiologists in published evaluations.",
  },
  {
    q: "Can Dectrocel detect early-stage lung cancer?",
    a: "Yes. Dectrocel's CT Thorax analysis includes lung cancer detection with TNM staging support and ILD sub-typing, helping clinicians flag early, treatable disease for further work-up.",
  },
];

const technicalTeam = [
  { name: "Saumya Shukla", role: "CEO" },
  { name: "Dr. Ankit Shukla", role: "Technical Director" },
  { name: "Nikhil Mishra", role: "CTO" },
];

const clinicalTeam = [
  { name: "Dr. Randeep Guleria", role: "Ex Director, AIIMS New Delhi" },
  { name: "Dr. Alok Nath", role: "Professor & Head, SGPGI Lucknow" },
  { name: "Dr. Zia Hashim", role: "Professor, SGPGI Lucknow" },
  { name: "Dr. Ajmal Khan", role: "Professor, SGPGI Lucknow" },
  { name: "Dr. Prasanth Areekkara Poduvattil", role: "Assistant Professor, SGPGI Lucknow" },
];

function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tab, setTab] = useState<"existing" | "upcoming">("existing");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  const tabbedProducts = useMemo(
    () => products.filter((p) => p.category?.slug === tab),
    [products, tab],
  );

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-hero" aria-hidden />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-20">
          <div className="lg:col-span-6 lg:pt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Powered by SGPGIMS, Lucknow
            </div>
            <h1 className="text-display mt-6 text-5xl text-balance sm:text-6xl lg:text-7xl animate-fade-up">
              Revolutionising Respiratory Healthcare in <span className="text-primary">X-ray AI</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Fast and accurate AI-powered chest X-ray and CT Thorax diagnostics.
              Check your lung health now — simple, fast, and reliable.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/catalog" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-smooth hover:opacity-90">
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium transition-smooth hover:border-primary/40">
                Contact Us
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-smooth hover:opacity-90">
                Register
              </Link>
            </div>

            {/* STATS */}
            <dl className="mt-12 grid grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div>
                <dt className="text-display text-4xl text-foreground sm:text-5xl">205K<span className="text-primary">+</span></dt>
                <dd className="mt-2 text-xs text-muted-foreground">X-ray scans processed</dd>
              </div>
              <div>
                <dt className="text-display text-4xl text-foreground sm:text-5xl">90<span className="text-primary">%</span></dt>
                <dd className="mt-2 text-xs text-muted-foreground">Positive clinical rating</dd>
              </div>
            </dl>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-gradient-mint shadow-elevated">
              <img
                src={lungs}
                alt="3D anatomical lungs visualization"
                width={1280}
                height={1280}
                className="h-full w-full object-contain p-8"
              />
              <div className="absolute left-6 top-6 rounded-full glass px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-foreground">
                Chest X-ray AI
              </div>
              <div className="absolute bottom-6 right-6 rounded-2xl glass p-4 shadow-glass">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Detected</p>
                <p className="mt-1 text-sm font-semibold">19 conditions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONDITIONS MARQUEE */}
      <section className="border-y border-border bg-gradient-mint py-8 overflow-hidden">
        <div className="mx-auto flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 text-xl font-semibold tracking-tight text-foreground/70 sm:text-2xl lg:text-3xl">
          {conditions.map((c, i) => (
            <span key={c} className="flex items-center gap-3">
              <span className="flex items-center gap-3">
                {c}
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">+</span>
              </span>
              {i < conditions.length - 1 && <span className="text-muted-foreground/40">/</span>}
            </span>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-wider text-primary">How it works</p>
          <h2 className="text-display mt-3 text-4xl sm:text-5xl">From scan to insight in seconds.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {howItWorks.map(({ Icon, title, points }, i) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-3xl bg-surface p-8 ring-1 ring-border shadow-card transition-smooth hover:ring-primary/30 hover:shadow-elevated"
            >
              <div className="absolute right-6 top-6 text-6xl font-bold text-primary/10">0{i + 1}</div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS WITH TABS */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary">Our suite</p>
            <h2 className="text-display mt-3 text-4xl sm:text-5xl">Dectrocel products.</h2>
          </div>
          <Link to="/catalog" className="hidden items-center gap-1 text-sm font-medium text-foreground hover:text-primary sm:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 inline-flex rounded-full bg-secondary p-1">
          {(["existing", "upcoming"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-smooth ${
                tab === t ? "bg-background text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "existing" ? "Existing Products" : "Upcoming Products"}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tabbedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          {tabbedProducts.length === 0 && (
            <p className="text-muted-foreground">Loading products…</p>
          )}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-10">
        <div className="rounded-[2rem] bg-surface p-8 ring-1 ring-border shadow-card sm:p-12">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-wider text-primary">Benefits</p>
            <h2 className="text-display mt-3 text-3xl sm:text-4xl">Elevate your practice to new heights with AI.</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-background p-6 ring-1 ring-border transition-smooth hover:ring-primary/40">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-primary">FAQ</p>
          <h2 className="text-display mt-3 text-4xl sm:text-5xl">Common questions.</h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition-smooth hover:ring-primary/30">
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-primary">Our team</p>
          <h2 className="text-display mt-3 text-4xl sm:text-5xl">Built by experts.</h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Technical Team</h3>
            <ul className="mt-5 space-y-3">
              {technicalTeam.map((m) => <TeamCard key={m.name} {...m} />)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Clinical Team</h3>
            <ul className="mt-5 space-y-3">
              {clinicalTeam.map((m) => <TeamCard key={m.name} {...m} />)}
            </ul>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-10">
          <div className="rounded-[2rem] bg-gradient-mint p-8 ring-1 ring-border sm:p-12">
            <div className="grid gap-3 sm:grid-cols-2">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-background p-6 ring-1 ring-border transition-smooth hover:ring-primary/40"
                >
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{c.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-smooth group-hover:translate-x-1 group-hover:text-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] bg-foreground p-10 text-background sm:p-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary">Get started</p>
              <h2 className="text-display mt-3 text-4xl sm:text-5xl">Check your lung health now.</h2>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <p className="text-base text-background/70">
                Simple, fast, and reliable AI-powered respiratory diagnostics. Join hospitals and clinics across India already using Dectrocel.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-smooth hover:opacity-90">
                  Request a demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/catalog" className="inline-flex items-center gap-2 rounded-full border border-background/20 px-6 py-3 text-sm font-medium text-background transition-smooth hover:bg-background/10">
                  Browse products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamCard({ name, role }: { name: string; role: string }) {
  const initials = name.split(" ").filter(p => !p.endsWith(".")).slice(0, 2).map(p => p[0]).join("");
  return (
    <li className="flex items-center gap-4 rounded-2xl bg-surface p-4 ring-1 ring-border transition-smooth hover:ring-primary/30">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="font-medium">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{role}</p>
      </div>
    </li>
  );
}
