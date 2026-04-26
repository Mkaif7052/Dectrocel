import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { fetchCategories, fetchProducts } from "@/lib/queries";
import type { Category, Product } from "@/lib/types";
import { categoryImages } from "@/lib/product-images";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Dectrocel®" },
      { name: "description", content: "Browse Dectrocel products grouped by existing and upcoming AI modalities." },
      { property: "og:title", content: "Categories — Dectrocel®" },
      { property: "og:description", content: "Browse Dectrocel AI products by category." },
    ],
  }),
  component: Categories,
});

function Categories() {
  const [cats, setCats] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchCategories().then(setCats).catch(console.error);
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-wider text-primary">Lineup</p>
        <h1 className="text-display mt-3 text-5xl sm:text-6xl">Categories.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Available today, and what's coming next from Dectrocel.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        {cats.map((c) => {
          const count = products.filter((p) => p.category_id === c.id).length;
          return (
            <Link
              key={c.id}
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="group flex items-center gap-6 rounded-3xl bg-surface p-6 ring-1 ring-border transition-smooth hover:ring-primary/40 hover:shadow-card"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-mint">
                <img src={categoryImages[c.slug]} alt={c.name} loading="lazy" width={80} height={80} className="h-full w-full object-contain p-2" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold tracking-tight">{c.name}</h2>
                <p className="line-clamp-1 text-sm text-muted-foreground">{c.description}</p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-xs text-muted-foreground">Products</p>
                <p className="text-lg font-semibold">{count}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-smooth group-hover:translate-x-1 group-hover:text-foreground" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
