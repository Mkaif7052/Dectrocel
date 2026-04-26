import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/types";
import { resolveProductImage } from "@/lib/product-images";
import { ArrowUpRight } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-border transition-smooth hover:ring-primary/30 hover:shadow-elevated"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-mint">
        <img
          src={resolveProductImage(product.cover_image_url)}
          alt={product.name}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-contain p-8 transition-smooth group-hover:scale-105"
        />
        {product.category && (
          <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md">
            {product.category.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{product.name}</h3>
            {product.tagline && (
              <p className="mt-0.5 text-xs uppercase tracking-wider text-primary">{product.tagline}</p>
            )}
          </div>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.short_description}
        </p>
      </div>
    </Link>
  );
}
