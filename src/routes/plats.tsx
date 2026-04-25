import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DishCard } from "@/components/DishCard";
import { dishes, categories } from "@/data/dishes";
import { Search, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/plats")({
  head: () => ({
    meta: [
      { title: "Tous les plats — Diary" },
      { name: "description", content: "Parcourez tous les plats faits maison disponibles près de chez vous sur Diary." },
      { property: "og:title", content: "Tous les plats — Diary" },
      { property: "og:description", content: "Découvrez la cuisine maison de votre quartier." },
    ],
  }),
  component: PlatsPage,
});

function PlatsPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState<"note" | "prix-asc" | "prix-desc">("note");

  let filtered = dishes.filter((d) => {
    if (cat !== "all" && d.categorie !== cat) return false;
    if (query && !d.nom.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });
  filtered = [...filtered].sort((a, b) => {
    if (sort === "note") return b.note - a.note;
    if (sort === "prix-asc") return a.prix - b.prix;
    return b.prix - a.prix;
  });

  return (
    <div className="min-h-screen">
      <Header />

      <section className="border-b border-border/60 bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Découvrez la cuisine du quartier
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {filtered.length} plat{filtered.length > 1 ? "s" : ""} fait{filtered.length > 1 ? "s" : ""} maison disponible{filtered.length > 1 ? "s" : ""}
          </p>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-full border border-border bg-card px-5 py-2 shadow-soft">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un plat..."
                className="flex-1 bg-transparent py-2 outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-soft">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="bg-transparent py-1.5 text-sm font-medium outline-none"
              >
                <option value="note">Mieux notés</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-smooth ${
                  cat === c.id
                    ? "border-primary bg-primary text-primary-foreground shadow-warm"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <span>{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">Aucun plat ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => (
              <DishCard key={d.id} dish={d} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
