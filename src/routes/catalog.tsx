import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { fetchCategories, fetchProducts } from "@/lib/queries";
import type { Category, Product } from "@/lib/types";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Product Catalog — MediLens" },
      { name: "description", content: "Browse all MediLens AI diagnostic products. Search and filter by category." },
      { property: "og:title", content: "Product Catalog — MediLens" },
      { property: "og:description", content: "Browse all MediLens AI diagnostic products." },
    ],
  }),
  component: Catalog,
});

const PAGE_SIZE = 8;

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCat === "all" || p.category?.slug === activeCat;
      const q = query.trim().toLowerCase();
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.short_description.toLowerCase().includes(q) || p.tagline?.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [products, activeCat, query]);

  const visible = filtered.slice(0, page * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-wider text-primary">Catalog</p>
        <h1 className="text-display mt-3 text-5xl sm:text-6xl">All products.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our complete suite of AI-powered diagnostic platforms across specialties.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-sm outline-none transition-smooth focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => { setActiveCat("all"); setPage(1); }}
          className={`rounded-full border px-4 py-1.5 text-sm transition-smooth ${activeCat === "all" ? "border-foreground bg-foreground text-background" : "border-border bg-surface hover:border-primary/40"}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => { setActiveCat(c.slug); setPage(1); }}
            className={`rounded-full border px-4 py-1.5 text-sm transition-smooth ${activeCat === c.slug ? "border-foreground bg-foreground text-background" : "border-border bg-surface hover:border-primary/40"}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {filtered.length === 0 && (
        <div className="mt-20 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          No products match your search.
        </div>
      )}

      {visible.length < filtered.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium hover:border-primary/40"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
