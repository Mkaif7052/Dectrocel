import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProducts } from "@/lib/queries";
import type { Product } from "@/lib/types";

const searchSchema = z.object({ product: z.string().optional() });

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name required").max(200),
  email: z.string().trim().email("Invalid email").max(320),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  product_slug: z.string().optional(),
  message: z.string().trim().min(1, "Message required").max(5000),
});

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Contact — MediLens" },
      { name: "description", content: "Request a demo, ask about products, or partner with MediLens." },
      { property: "og:title", content: "Contact — MediLens" },
      { property: "og:description", content: "Request a demo or get in touch with our team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const search = Route.useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    product_slug: search.product ?? "",
    message: "",
  });

  useEffect(() => { fetchProducts().then(setProducts).catch(console.error); }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const product = products.find((p) => p.slug === result.data.product_slug);
    const { error } = await supabase.from("inquiries").insert({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      product_id: product?.id ?? null,
      message: result.data.message,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit inquiry. Please try again.");
      return;
    }
    toast.success("Thanks! We'll be in touch shortly.");
    setForm({ name: "", email: "", phone: "", product_slug: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-wider text-primary">Contact</p>
          <h1 className="text-display mt-3 text-5xl sm:text-6xl">Get in touch.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tell us about your needs. Our team will respond within 24 hours.
          </p>

          <ul className="mt-10 space-y-5 text-sm">
            <li className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary"><Mail className="h-4 w-4" /></div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">hello@medilens.bio</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary"><Phone className="h-4 w-4" /></div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground">+1 (555) 0123-4567</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary"><MapPin className="h-4 w-4" /></div>
              <div>
                <p className="font-medium">Office</p>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-7">
          <div className="rounded-3xl bg-surface p-8 ring-1 ring-border shadow-card sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" required>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Email" required>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Phone">
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Product of interest">
                <select value={form.product_slug} onChange={(e) => setForm({ ...form, product_slug: e.target.value })} className={inputCls}>
                  <option value="">— Select a product —</option>
                  {products.map((p) => <option key={p.id} value={p.slug}>{p.name}</option>)}
                </select>
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Message" required>
                <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputCls + " resize-none"} />
              </Field>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-smooth hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Sending..." : <>Send inquiry <Send className="h-4 w-4" /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary/50 focus:ring-2 focus:ring-primary/20";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}{required && <span className="text-primary"> *</span>}</span>
      {children}
    </label>
  );
}
