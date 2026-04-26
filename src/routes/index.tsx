import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import heroHeart from "@/assets/hero-heart.jpg";
import { ProductCard } from "@/components/site/ProductCard";
import { fetchCategories, fetchFeaturedProducts } from "@/lib/queries";
import type { Category, Product } from "@/lib/types";
import { categoryImages } from "@/lib/product-images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediLens — AI-Powered Medical Diagnostics" },
      { name: "description", content: "Self-supervised AI for medical imaging. Empowering healthcare providers to make faster, more accurate decisions." },
      { property: "og:title", content: "MediLens — AI-Powered Medical Diagnostics" },
      { property: "og:description", content: "Self-supervised AI for medical imaging. Faster decisions. Better outcomes." },
    ],
  }),
  component: Index,
});

function Index() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchFeaturedProducts().then(setFeatured).catch(console.error);
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-hero" aria-hidden />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-20">
          <div className="lg:col-span-6 lg:pt-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Self-Supervised Learning <span className="text-primary">*</span>
            </div>
            <h1 className="text-display mt-6 text-5xl text-balance sm:text-6xl lg:text-7xl animate-fade-up">
              We empower healthcare providers to faster, more accurate decisions.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Revolutionizing medical diagnostics with AI-driven imaging
              solutions. Precise. Fast. Intelligent.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/catalog" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-smooth hover:opacity-90">
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium transition-smooth hover:border-primary/40">
                <Play className="h-4 w-4" /> Try Demo
              </Link>
            </div>
            <div className="mt-12 flex items-end gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <span className="text-display text-6xl text-foreground sm:text-7xl">112.3</span>
              <span className="text-display pb-3 text-3xl text-primary">%</span>
              <span className="ml-3 max-w-[12rem] pb-2 text-xs leading-snug text-muted-foreground">
                Diagnostic precision improvement vs traditional methods.
              </span>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-gradient-mint shadow-elevated">
              <img
                src={heroHeart}
                alt="3D anatomical heart visualization"
                width={1280}
                height={1280}
                className="h-full w-full object-contain p-8"
              />
              <button className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-background/70 backdrop-blur-md transition-smooth hover:scale-110">
                <Play className="ml-1 h-6 w-6 text-foreground" fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONDITIONS MARQUEE */}
      <section className="border-y border-border bg-gradient-mint py-8 overflow-hidden">
        <div className="mx-auto flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 text-2xl font-semibold tracking-tight text-foreground/70 sm:text-3xl lg:text-4xl">
          {["PARKINSON'S", "CARDIOVASCULAR", "COLORECTAL", "ALZHEIMER'S", "MULTIPLE SCLEROSIS", "GLAUCOMA", "OSTEOPOROSIS", "MELANOMA", "THYROID DISORDERS"].map((c) => (
            <span key={c} className="flex items-center gap-3">
              {c}
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">+</span>
            </span>
          )).reduce<React.ReactNode[]>((acc, el, i, arr) => {
            acc.push(el);
            if (i < arr.length - 1) acc.push(<span key={`sep-${i}`} className="text-muted-foreground/40">/</span>);
            return acc;
          }, [])}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary">Key AI Features</p>
            <h2 className="text-display mt-3 text-4xl sm:text-5xl">Featured products.</h2>
          </div>
          <Link to="/catalog" className="hidden items-center gap-1 text-sm font-medium text-foreground hover:text-primary sm:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-10">
        <div className="rounded-[2rem] bg-surface p-8 ring-1 ring-border sm:p-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary">Specialties</p>
              <h2 className="text-display mt-3 text-3xl sm:text-4xl">Browse by category.</h2>
            </div>
            <Link to="/categories" className="hidden text-sm font-medium hover:text-primary sm:inline-flex">All categories →</Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="group flex items-center gap-4 rounded-2xl bg-background p-4 ring-1 ring-border transition-smooth hover:ring-primary/40"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-mint">
                  <img src={categoryImages[c.slug] ?? heroHeart} alt={c.name} className="h-full w-full object-contain p-1.5" loading="lazy" width={56} height={56} />
                </div>
                <div className="min-w-0">
                  <p className="font-medium">{c.name}</p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{c.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] bg-foreground p-10 text-background sm:p-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary">Get in touch</p>
              <h2 className="text-display mt-3 text-4xl sm:text-5xl">Ready to transform your diagnostics?</h2>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <p className="text-base text-background/70">
                MediLens is already making waves in hospitals, clinics, and research labs across the globe. Join a growing network of medical professionals.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-smooth hover:opacity-90">
                  Request a demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/catalog" className="inline-flex items-center gap-2 rounded-full border border-background/20 px-6 py-3 text-sm font-medium text-background transition-smooth hover:bg-background/10">
                  Browse catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
