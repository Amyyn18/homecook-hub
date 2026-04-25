import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Mon panier — Diary" },
      { name: "description", content: "Votre panier de plats faits maison sur Diary." },
    ],
  }),
  component: PanierPage,
});

function PanierPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link to="/plats" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Continuer mes achats
        </Link>

        <div className="mt-10 rounded-3xl border border-border bg-card p-12 text-center shadow-soft">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold">Votre panier est vide</h1>
          <p className="mt-3 text-muted-foreground">
            Découvrez nos plats faits maison et commencez votre commande.
          </p>
          <Link
            to="/plats"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-gradient-warm px-7 font-semibold text-primary-foreground shadow-warm transition-smooth hover:opacity-90"
          >
            Découvrir les plats
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
