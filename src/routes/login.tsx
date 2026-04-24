import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "sonner";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate({ from: "/login" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const isAdminLogin = email.trim().toLowerCase() === "admin@admin" && password === "123321";
    const name = isAdminLogin ? "Admin" : email.split("@")[0];
    const role = isAdminLogin ? "admin" : email.toLowerCase().includes("chef") ? "cuisinier" : "client";
    login(email, name, role);
    toast.success("Connexion réussie !");
    navigate({ to: isAdminLogin ? "/admin" : "/" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
          <h1 className="font-display text-3xl font-bold">Bon retour !</h1>
          <p className="mt-2 text-sm text-muted-foreground">Connectez-vous pour commander.</p>
          <p className="mt-1 text-xs text-muted-foreground">Admin test: admin@admin / 123321</p>

          <form className="mt-8 space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@email.com"
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
