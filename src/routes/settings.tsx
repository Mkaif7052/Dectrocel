import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun, Bell, Globe, Shield, Heart } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Dectrocel®" },
      { name: "description", content: "Manage your Dectrocel app preferences — theme, notifications, language and privacy." },
      { property: "og:title", content: "Settings — Dectrocel®" },
      { property: "og:description", content: "Manage your Dectrocel app preferences." },
    ],
  }),
  component: Settings,
});

function Settings() {
  const [dark, setDark] = useState(false);
  const [notif, setNotif] = useState(true);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("theme") === "dark";
    setDark(saved);
    if (saved) document.documentElement.classList.add("dark");
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
    }
    toast.success(next ? "Dark mode enabled" : "Light mode enabled");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-10">
      <p className="text-xs uppercase tracking-wider text-primary">Preferences</p>
      <h1 className="text-display mt-3 text-5xl sm:text-6xl">Settings.</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Tailor the Dectrocel app to your workflow.
      </p>

      <div className="mt-10 space-y-3">
        <Row
          Icon={dark ? Moon : Sun}
          title="Appearance"
          desc={dark ? "Dark theme is on" : "Light theme is on"}
        >
          <Toggle on={dark} onChange={toggleDark} />
        </Row>

        <Row
          Icon={Bell}
          title="Notifications"
          desc="Email me about product updates and demos"
        >
          <Toggle on={notif} onChange={() => setNotif((v) => !v)} />
        </Row>

        <Row Icon={Globe} title="Language" desc="Choose your interface language">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </Row>

        <Row Icon={Shield} title="Privacy" desc="Manage data and consent preferences">
          <button
            onClick={() => toast.info("Privacy preferences coming soon.")}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:border-primary/40"
          >
            Manage
          </button>
        </Row>

        <Row Icon={Heart} title="About" desc="Dectrocel® — version 1.0.0">
          <span className="text-xs text-muted-foreground">SGPGIMS, Lucknow</span>
        </Row>
      </div>
    </div>
  );
}

function Row({
  Icon,
  title,
  desc,
  children,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-surface p-5 ring-1 ring-border transition-smooth hover:ring-primary/30">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="font-medium">{title}</p>
          <p className="truncate text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={on}
      className={`relative h-7 w-12 rounded-full transition-smooth ${on ? "bg-gradient-primary" : "bg-secondary"}`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-background shadow-card transition-smooth ${on ? "left-6" : "left-1"}`}
      />
    </button>
  );
}
