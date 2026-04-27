# Dectrocel®

> **Revolutionising Respiratory Healthcare with X-ray AI**

Dectrocel is a modern web application that showcases AI-powered chest X-ray and CT Thorax diagnostic products. It provides fast, accurate detection of 19+ respiratory conditions — including TB, pneumonia, COPD, ILD, and lung cancer with TNM staging — through clinically validated deep-learning models.

---

## 🩺 Features

- **Product Catalog** — Browse and filter AI diagnostic products by category
- **Condition Detection** — Covers 19+ respiratory conditions (Tuberculosis, Pneumonia, COPD, ILD, Lung Cancer, Pleural Effusion, Pneumothorax, Nodules, Fibrosis, Emphysema, and more)
- **AI Capabilities Showcase** — Heatmaps & contour maps, abnormality scoring, and AI-generated reports
- **Product Detail Pages** — Full descriptions, image galleries, specifications, and brochure PDF downloads
- **Inquiry System** — Contact forms tied to specific products, stored in Supabase
- **Admin Panel** — Role-based access (admin/user) to manage categories, products, and inquiries
- **Responsive Design** — Mobile-first layout with a bottom navigation bar on small screens

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) + React 19 |
| Routing | [TanStack Router](https://tanstack.com/router) |
| Data Fetching | [TanStack Query](https://tanstack.com/query) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) + Radix UI |
| Backend / Auth | [Supabase](https://supabase.com/) (PostgreSQL + Auth + RLS) |
| Charts | [Recharts](https://recharts.org/) |
| Forms | React Hook Form + Zod |
| Build Tool | [Vite](https://vitejs.dev/) |
| Deployment | [Cloudflare Workers](https://workers.cloudflare.com/) |
| Package Manager | Bun |

---

## 📁 Project Structure

```
src/
├── assets/          # Static images
├── components/
│   ├── site/        # Shared layout components (Header, Footer, ProductCard, etc.)
│   └── ui/          # shadcn/ui primitive components
├── hooks/           # Custom React hooks
├── integrations/    # Supabase client & generated types
├── lib/             # Query helpers, types, utilities
├── routes/          # File-based routes (TanStack Router)
│   ├── index.tsx        # Home / landing page
│   ├── catalog.tsx      # Product catalog
│   ├── categories.tsx   # Category listing
│   ├── categories.$slug.tsx  # Category detail
│   ├── products.$slug.tsx    # Product detail
│   ├── about.tsx
│   ├── contact.tsx
│   └── settings.tsx
└── styles.css       # Global styles

supabase/
└── migrations/      # SQL migration files
```

---

## 🗄️ Database Schema

The Supabase database contains the following tables:

- **`categories`** — Product categories with slug, name, description, icon, and display order
- **`products`** — Full product records with name, tagline, descriptions, images, features, specifications (JSONB), brochure PDF URL, and publish/featured flags
- **`inquiries`** — Contact form submissions linked to products
- **`profiles`** — User profiles linked to Supabase Auth
- **`user_roles`** — Role-based access control (`admin` / `user`)

Row Level Security (RLS) is enabled with a `has_role()` security-definer function to prevent privilege escalation.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ or [Bun](https://bun.sh/)
- A [Supabase](https://supabase.com/) project
- A [Cloudflare](https://cloudflare.com/) account (for deployment)

### 1. Clone the repository

```bash
git clone https://github.com/Mkaif7052/Dectrocel.git
cd Dectrocel
```

### 2. Install dependencies

```bash
bun install
# or
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Apply database migrations

```bash
supabase db push
```

Or run the SQL files in `supabase/migrations/` manually in your Supabase SQL editor.

### 5. Start the development server

```bash
bun run dev
# or
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start the development server |
| `bun run build` | Build for production |
| `bun run build:dev` | Build in development mode |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Lint the codebase with ESLint |
| `bun run format` | Format code with Prettier |

---

## ☁️ Deployment

This project is configured for deployment on **Cloudflare Workers** using the `@cloudflare/vite-plugin`.

```bash
bun run build
npx wrangler deploy
```

Ensure your `wrangler.jsonc` is configured with your Cloudflare account and Worker name.

---

## 🔐 Admin Access

Admin functionality is protected by Supabase Auth with role-based access control. To create an admin user:

1. Sign up via Supabase Auth
2. Insert a row into `public.user_roles` with `role = 'admin'` for that user's UUID

---

## 📄 License

This project is private. All rights reserved © Dectrocel®.
