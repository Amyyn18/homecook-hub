import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

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
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="hidden items-center gap-2 sm:flex ml-2">
              {user?.role === "cuisinier" && (
                <>
                  <Link
                    to="/commandes"
                    className="hidden h-9 items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 text-xs font-semibold text-primary transition-smooth hover:bg-primary/10 sm:flex"
                  >
                    Commandes
                  </Link>
                  <Link
                    to="/ajouter-plat"
                    className="hidden h-9 items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 text-xs font-semibold text-primary transition-smooth hover:bg-primary/10 sm:flex"
                  >
                    + Ajouter
                  </Link>
                </>
              )}
              {user?.role === "admin" && (
                <a
                  href="/admin"
                  className="hidden h-9 items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 text-xs font-semibold text-primary transition-smooth hover:bg-primary/10 sm:flex"
                >
                  Admin
                </a>
              )}
              <span className="text-sm font-medium ml-2">Salut, {user?.name.split(" ")[0]}</span>
              <button
                onClick={logout}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition-smooth hover:border-destructive hover:text-destructive ml-1"
                aria-label="Déconnexion"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium transition-smooth hover:border-primary hover:text-primary sm:flex ml-2"
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}
