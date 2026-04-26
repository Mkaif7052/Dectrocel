import heart from "@/assets/hero-heart.jpg";
import brain from "@/assets/product-brain.jpg";
import lungs from "@/assets/product-lungs.jpg";
import spine from "@/assets/product-spine.jpg";
import dna from "@/assets/product-dna.jpg";
import eye from "@/assets/product-eye.jpg";
import foot from "@/assets/product-foot.jpg";
import stomach from "@/assets/product-stomach.jpg";

const map: Record<string, string> = {
  "hero-heart": heart,
  "product-brain": brain,
  "product-lungs": lungs,
  "product-spine": spine,
  "product-dna": dna,
  "product-eye": eye,
  "product-foot": foot,
  "product-stomach": stomach,
};

/**
 * Resolve a product image. The DB stores either a slug (referring to a bundled
 * asset) or a full URL (uploaded via storage). Falls back to the hero image.
 */
export function resolveProductImage(value?: string | null): string {
  if (!value) return heart;
  if (value.startsWith("http") || value.startsWith("/")) return value;
  return map[value] ?? heart;
}

export const categoryImages: Record<string, string> = {
  cardiovascular: heart,
  neurological: brain,
  pulmonary: lungs,
  orthopedic: spine,
  genomics: dna,
  ophthalmology: eye,
  gastroenterology: stomach,
};
