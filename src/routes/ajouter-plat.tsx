import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useDishes } from "@/hooks/useDishes";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { ChefHat, PlusCircle, CheckCircle2 } from "lucide-react";
import { categories } from "@/data/dishes";
import { regions } from "@/data/regions";

export const Route = createFileRoute("/ajouter-plat")({
  head: () => ({
    meta: [
      { title: "Ajouter un plat — Diary" },
    ],
  }),
  component: AjouterPlatPage,
});

function AjouterPlatPage() {
  const { isAuthenticated, user } = useAuth();
  const { addDish } = useDishes();
  const navigate = useNavigate({ from: "/ajouter-plat" });

  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("plat");
  const [ville, setVille] = useState(regions[0]);
  const [temps, setTemps] = useState("30 min");

  if (!isAuthenticated || user?.role !== "cuisinier") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-3xl font-bold">Accès refusé</h1>
        <p className="mt-2 text-muted-foreground">Seuls les cuisiniers peuvent ajouter un plat.</p>
        <button onClick={() => navigate({ to: "/login" })} className="mt-6 inline-flex h-12 items-center rounded-full bg-gradient-warm px-8 font-semibold text-primary-foreground shadow-warm">
          Se connecter
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !prix || !description) {
      toast.error("Veuillez remplir les champs obligatoires.");
      return;
    }

    addDish({
      nom,
      prix: Number(prix),
      description,
      categorie,
      ville,
      temps,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop", // placeholder
      note: 5.0,
      avis: 0,
      cuisinier: user?.name || "Chef",
      cuisinierBio: "Nouveau chef sur Diary",
      ingredients: ["Ingrédients frais"],
      allergenes: [],
    });

    toast.success("Votre plat a été ajouté avec succès !", {
      icon: <CheckCircle2 className="h-5 w-5 text-success" />
    });
    navigate({ to: "/plats" });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card sm:p-12">
          <div className="flex items-center gap-4 border-b border-border pb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-warm shadow-warm">
              <ChefHat className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">Ajouter un plat</h1>
              <p className="mt-1 text-sm text-muted-foreground">Proposez votre nouvelle recette à la communauté.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="text-sm font-medium">Nom du plat *</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Ex: Couscous au poisson"
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary"
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Prix (DT) *</label>
                <input
                  type="number"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                  placeholder="Ex: 15"
                  min="1"
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Temps de préparation</label>
                <input
                  type="text"
                  value={temps}
                  onChange={(e) => setTemps(e.target.value)}
                  placeholder="Ex: 45 min"
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Catégorie</label>
                <select
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary"
                >
                  {categories.filter(c => c.id !== "all").map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Ville</label>
                <select
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary"
                >
                  {regions.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre plat, les ingrédients, la préparation..."
                rows={4}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-warm font-semibold text-primary-foreground shadow-warm transition-smooth hover:opacity-90"
            >
              <PlusCircle className="h-5 w-5" />
              Mettre en ligne
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
