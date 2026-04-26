import { supabase } from "@/integrations/supabase/client";
import type { Category, Product } from "./types";

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order");
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("is_published", true)
    .order("display_order");
  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("display_order");
  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as Product) ?? null;
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Category) ?? null;
}

export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("category_id", categoryId)
    .eq("is_published", true)
    .order("display_order");
  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}
