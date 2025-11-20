"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface DestinationItem {
  name: string;
  location?: string;
  href: string;
  image: string;
  region?: string;
  badge?: string; // e.g., POPULAR
  tags?: string[];
  blurDataURL?: string;
}

export default function DestinationsIndex({ items }: { items: DestinationItem[] }) {
  const [q, setQ] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [popularOnly, setPopularOnly] = useState<boolean>(false);
  const [view, setView] = useState<"advanced" | "simple">("advanced");

  const BLUR =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAQAAAC1HAwCAAAAD0lEQVR42mNgYGBgYGBgAAACXwEB7oD3xQAAAABJRU5ErkJggg==";

  const regions = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => {
      if (i.region) set.add(i.region);
      else if (i.location) {
        const r = i.location.includes(",") ? i.location.split(",")[0].trim() : i.location;
        set.add(r);
      }
    });
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [items]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => (i.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [items]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return items.filter((i) => {
      // region filter
      const region = i.region || (i.location ? (i.location.includes(",") ? i.location.split(",")[0].trim() : i.location) : undefined);
      const matchRegion = selectedRegion === "All" || (region ? region === selectedRegion : false);
      // popular filter
      const matchPopular = !popularOnly || (i.badge || "").toUpperCase() === "POPULAR";
      // tags filter (all selected must be present)
      const tags = i.tags || [];
      const matchTags = selectedTags.length === 0 || selectedTags.every((t) => tags.includes(t));
      // text filter (only in advanced view)
      const matchText = view === "simple" || t.length === 0 ||
        i.name.toLowerCase().includes(t) || (i.location || "").toLowerCase().includes(t);
      return matchRegion && matchPopular && matchTags && matchText;
    });
  }, [items, q, popularOnly, selectedRegion, selectedTags, view]);

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3">
        {/* Top controls */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="inline-flex items-center rounded-md border border-gray-300 dark:border-white/10 bg-white/70 dark:bg-white/5 p-1 text-xs">
            <button
              type="button"
              onClick={() => setView("advanced")}
              className={`px-3 py-1 rounded ${view === "advanced" ? "bg-[hsl(var(--brand-accent))]/15 text-[hsl(var(--brand-accent))]" : "text-gray-600 dark:text-gray-300"}`}
            >
              Search & Filters
            </button>
            <button
              type="button"
              onClick={() => setView("simple")}
              className={`px-3 py-1 rounded ${view === "simple" ? "bg-[hsl(var(--brand-accent))]/15 text-[hsl(var(--brand-accent))]" : "text-gray-600 dark:text-gray-300"}`}
            >
              Simple Grid
            </button>
          </div>

          {view === "advanced" && (
            <div className="flex items-center gap-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search destinations..."
                className="w-64 rounded-md border border-gray-300 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-accent))]"
                aria-label="Search destinations"
              />
              <label className="inline-flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 select-none">
                <input
                  type="checkbox"
                  checked={popularOnly}
                  onChange={(e) => setPopularOnly(e.target.checked)}
                  className="accent-[hsl(var(--brand-accent))]"
                />
                Popular only
              </label>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {view === "advanced" && (
          <div className="flex flex-wrap items-center gap-2">
              {regions.map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-2.5 py-1 rounded-full border text-xs transition-colors ${
                  selectedRegion === r
                    ? "border-[hsl(var(--brand-accent))] bg-[hsl(var(--brand-accent))]/10 text-[hsl(var(--brand-accent))]"
                    : "border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[hsl(var(--brand-accent))]/50"
                }`}
              >
                {r}
              </button>
            ))}
            {allTags.length > 0 && (
              <>
                <span className="mx-1 text-xs text-gray-500">•</span>
                {allTags.map((tag) => {
                  const active = selectedTags.includes(tag);
                    return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() =>
                        setSelectedTags((prev) =>
                          active ? prev.filter((t) => t !== tag) : [...prev, tag]
                        )
                      }
                      className={`px-2.5 py-1 rounded-full border text-xs transition-colors ${
                        active
                          ? "border-[hsl(var(--brand-accent))] bg-[hsl(var(--brand-accent))]/10 text-[hsl(var(--brand-accent))]"
                          : "border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[hsl(var(--brand-accent))]/50"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>

      <section className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {filtered.map((d) => (
          <Link
            key={d.name}
            href={d.href}
            className="focusable group rounded-lg overflow-hidden border border-gray-200/60 dark:border-white/10 hover:border-[hsl(var(--brand-accent))] hover:shadow transition-colors bg-white/70 dark:bg-white/5"
          >
            <div className="relative w-full h-28 md:h-36">
              {d.badge && (
                <span className="absolute z-10 top-2 left-2 rounded-full bg-[hsl(var(--brand-accent))] text-white text-[10px] font-semibold px-2 py-0.5 shadow">
                  {d.badge}
                </span>
              )}
              <Image
                src={d.image}
                alt={`${d.name} thumbnail`}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                placeholder="blur"
                blurDataURL={d.blurDataURL || BLUR}
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            </div>
            <div className="p-3">
              <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[hsl(var(--brand-accent))]">
                {d.name}
              </div>
              {d.location && (
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{d.location}</div>
              )}
              <div className="text-[11px] text-gray-500 dark:text-gray-500 mt-2">Explore →</div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
