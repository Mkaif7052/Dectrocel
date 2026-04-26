import { createFileRoute, Link } from "@tanstack/react-router";
import heart from "@/assets/hero-heart.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MediLens" },
      { name: "description", content: "MediLens is pioneering self-supervised AI for medical imaging." },
      { property: "og:title", content: "About — MediLens" },
      { property: "og:description", content: "Pioneering self-supervised AI for medical imaging." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-wider text-primary">About us</p>
          <h1 className="text-display mt-3 text-5xl sm:text-6xl">Reinforcement Learning for medicine.</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            MediLens is already making waves in hospitals, clinics, and research labs across the globe. We empower medical professionals with self-supervised AI that learns from every scan, surfacing patterns the human eye can miss.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Our mission is simple: faster, more accurate decisions — improving patient outcomes and lives.
          </p>

          <dl className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
            <Stat value="92.1%" label="LLM Precision Accuracy" />
            <Stat value="48h" label="Average response time" />
            <Stat value="200+" label="Partner institutions" />
          </dl>

          <div className="mt-10">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90">
              Partner with us
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="aspect-square overflow-hidden rounded-[2rem] bg-gradient-mint shadow-elevated">
            <img src={heart} alt="MediLens" className="h-full w-full object-contain p-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-display text-3xl sm:text-4xl">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
