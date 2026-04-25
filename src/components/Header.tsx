import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-warm shadow-warm">
            <span className="font-display text-lg font-bold text-primary-foreground">D</span>
          </div>
          <span className="font-display text-2xl font-bold tracking-tight">Diary</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-foreground/80 transition-smooth hover:text-primary"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-primary" }}
          >
            Accueil
          </Link>
          <Link
            to="/plats"
            className="text-sm font-medium text-foreground/80 transition-smooth hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Plats
          </Link>
          <Link
            to="/cuisinier"
            className="text-sm font-medium text-foreground/80 transition-smooth hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Devenir cuisinier
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/plats"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-smooth hover:bg-muted hover:text-primary sm:flex"
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            to="/panier"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-smooth hover:bg-muted hover:text-primary"
            aria-label="Panier"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
          <Link
            to="/login"
            className="hidden h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium transition-smooth hover:border-primary hover:text-primary sm:flex"
          >
            <User className="h-4 w-4" />
            Connexion
          </Link>
          <Link
            to="/inscription"
            className="hidden h-10 items-center rounded-full bg-gradient-warm px-5 text-sm font-semibold text-primary-foreground shadow-warm transition-smooth hover:opacity-90 md:flex"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </header>
  );
}
