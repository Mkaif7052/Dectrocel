import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { fetchCategoryBySlug, fetchProductsByCategory } from "@/lib/queries";
import type { Category, Product } from "@/lib/types";
import { categoryImages } from "@/lib/product-images";

export const Route = createFileRoute("/categories/$slug")({
  loader: async ({ params }) => {
    const cat = await fetchCategoryBySlug(params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.cat
      ? [
          { title: `${loaderData.cat.name} — Dectrocel®` },
          { name: "description", content: loaderData.cat.description ?? "" },
          { property: "og:title", content: `${loaderData.cat.name} — Dectrocel®` },
          { property: "og:description", content: loaderData.cat.description ?? "" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Category not found</h1>
      <Link to="/categories" className="mt-4 inline-block text-primary">Back to categories</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { cat } = Route.useLoaderData() as { cat: Category };
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProductsByCategory(cat.id).then(setProducts).catch(console.error);
  }, [cat.id]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <Link to="/categories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All categories
      </Link>

      <div className="mt-8 flex flex-col items-start gap-8 lg:flex-row lg:items-center">
        <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-gradient-mint shadow-card">
          <img src={categoryImages[cat.slug]} alt={cat.name} width={128} height={128} className="h-full w-full object-contain p-3" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-primary">Category</p>
          <h1 className="text-display mt-3 text-5xl sm:text-6xl">{cat.name}.</h1>
          {cat.description && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{cat.description}</p>}
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {products.length === 0 && (
        <p className="mt-12 text-muted-foreground">No products in this category yet.</p>
      )}
    </div>
  );
}
