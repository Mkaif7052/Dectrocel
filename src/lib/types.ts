export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  display_order: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  short_description: string;
  full_description: string;
  category_id: string | null;
  cover_image_url: string | null;
  gallery_urls: string[];
  features: string[];
  specifications: Record<string, string>;
  brochure_pdf_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  category?: Category | null;
};
