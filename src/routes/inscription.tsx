import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChefHat, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Inscription — Diary" },
      { name: "description", content: "Créez votre compte Diary, client ou cuisinier." },
    ],
  }),
  component: InscriptionPage,
});

function InscriptionPage() {
  const [role, setRole] = useState<"client" | "cuisinier">("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate({ from: "/inscription" });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    // Mock signup logic (just logs them in)
    login(email, name, role);
    toast.success(`Compte ${role} créé avec succès !`);
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
          <h1 className="font-display text-3xl font-bold">Rejoindre Diary</h1>
          <p className="mt-2 text-sm text-muted-foreground">Créez votre compte en 1 minute.</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {([
              { id: "client", label: "Client", icon: User, desc: "Je commande" },
              { id: "cuisinier", label: "Cuisinier", icon: ChefHat, desc: "Je vends" },
            ] as const).map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-smooth ${
                  role === r.id
                    ? "border-primary bg-primary/5 shadow-soft"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <r.icon className={`h-5 w-5 ${role === r.id ? "text-primary" : "text-muted-foreground"}`} />
                <span className="font-display text-base font-semibold">{r.label}</span>
                <span className="text-xs text-muted-foreground">{r.desc}</span>
              </button>
            ))}
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="text-sm font-medium">Nom complet</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sami Ben Ali"
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary"
              />
            </div>
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
              <label className="text-sm font-medium">Téléphone</label>
              <input
                type="tel"
                placeholder="+216 ..."
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
            <button
              type="submit"
              className="h-12 w-full rounded-full bg-gradient-warm font-semibold text-primary-foreground shadow-warm transition-smooth hover:opacity-90"
            >
              Créer mon compte {role === "cuisinier" && "cuisinier"}
            </button>
            {role === "cuisinier" && (
              <p className="text-center text-xs text-muted-foreground">
                Votre dossier sera vérifié par notre équipe avant activation.
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Déjà inscrit ?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
