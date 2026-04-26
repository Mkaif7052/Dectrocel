import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Download, Mail, Share2, Check } from "lucide-react";
import { toast } from "sonner";
import { ProductCard } from "@/components/site/ProductCard";
import { fetchProductBySlug, fetchProductsByCategory } from "@/lib/queries";
import type { Product } from "@/lib/types";
import { resolveProductImage } from "@/lib/product-images";

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ params }) => {
    const product = await fetchProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.product
      ? [
          { title: `${loaderData.product.name} — MediLens` },
          { name: "description", content: loaderData.product.short_description },
          { property: "og:title", content: `${loaderData.product.name} — MediLens` },
          { property: "og:description", content: loaderData.product.short_description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Product not found</h1>
      <Link to="/catalog" className="mt-4 inline-block text-primary">Back to catalog</Link>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [related, setRelated] = useState<Product[]>([]);
  const cover = resolveProductImage(product.cover_image_url);
  const gallery = product.gallery_urls.length > 0 ? product.gallery_urls.map(resolveProductImage) : [cover];

  useEffect(() => {
    if (product.category_id) {
      fetchProductsByCategory(product.category_id)
        .then((items) => setRelated(items.filter((p) => p.id !== product.id).slice(0, 3)))
        .catch(console.error);
    }
  }, [product.category_id, product.id]);

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, text: product.short_description, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch { /* user dismissed */ }
  };

  const onDownload = () => {
    if (product.brochure_pdf_url) {
      window.open(product.brochure_pdf_url, "_blank");
    } else {
      toast.info("Brochure PDF coming soon — contact us for materials.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
      <Link to="/catalog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-square overflow-hidden rounded-[2rem] bg-gradient-mint shadow-card">
            <img src={gallery[0]} alt={product.name} width={1200} height={1200} className="h-full w-full object-contain p-10" />
          </div>
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.slice(1, 5).map((g, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-gradient-mint">
                  <img src={g} alt="" className="h-full w-full object-contain p-3" loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.category && (
            <Link to="/categories/$slug" params={{ slug: product.category.slug }} className="text-xs uppercase tracking-wider text-primary hover:underline">
              {product.category.name}
            </Link>
          )}
          <h1 className="text-display mt-3 text-4xl sm:text-5xl">{product.name}</h1>
          {product.tagline && <p className="mt-2 text-xl text-muted-foreground">{product.tagline}</p>}
          <p className="mt-6 text-base leading-relaxed text-foreground/80">{product.full_description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" search={{ product: product.slug }} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-smooth hover:opacity-90">
              <Mail className="h-4 w-4" /> Inquire about this
            </Link>
            <button onClick={onDownload} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium hover:border-primary/40">
              <Download className="h-4 w-4" /> Download brochure
            </button>
            <button onClick={onShare} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface hover:border-primary/40" aria-label="Share">
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {product.features.length > 0 && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Key features</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Object.keys(product.specifications).length > 0 && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Specifications</h2>
              <dl className="mt-4 divide-y divide-border rounded-2xl bg-surface ring-1 ring-border">
                {Object.entries(product.specifications).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-medium text-right">{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-display text-3xl">Related products.</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
