import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Connexion — Diary" },
      { name: "description", content: "Connectez-vous à votre compte Diary." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
          <h1 className="font-display text-3xl font-bold">Bon retour !</h1>
          <p className="mt-2 text-sm text-muted-foreground">Connectez-vous pour commander.</p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="vous@email.com"
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary"
              />
            </div>
            <a href="#" className="block text-right text-sm text-primary hover:underline">
              Mot de passe oublié ?
            </a>
            <button
              type="submit"
              className="h-12 w-full rounded-full bg-gradient-warm font-semibold text-primary-foreground shadow-warm transition-smooth hover:opacity-90"
            >
              Se connecter
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link to="/inscription" className="font-semibold text-primary hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
