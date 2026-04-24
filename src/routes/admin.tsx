import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth, type User } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { useDishes } from "@/hooks/useDishes";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type ApprovalItem = { id: string; name: string; type: "cuisinier" | "plat"; status: "pending" | "approved" | "rejected" };
type ReportItem = { id: string; target: string; reason: string; status: "pending" | "reviewed" };
type PlatformSettings = { categories: string; commission: number };

const USERS_KEY = "diary_users_directory";
const APPROVALS_KEY = "diary_admin_approvals";
const REPORTS_KEY = "diary_admin_reports";
const SETTINGS_KEY = "diary_admin_settings";

const defaultApprovals: ApprovalItem[] = [
  { id: "ap-1", name: "Chef Mourad", type: "cuisinier", status: "pending" },
  { id: "ap-2", name: "Ojja spéciale fromage", type: "plat", status: "pending" },
  { id: "ap-3", name: "Chef Rania", type: "cuisinier", status: "pending" },
];

const defaultReports: ReportItem[] = [
  { id: "rp-1", target: "Commentaire sur Couscous", reason: "Langage inapproprie", status: "pending" },
  { id: "rp-2", target: "Profil utilisateur #u24", reason: "Spam", status: "pending" },
];

const defaultSettings: PlatformSettings = {
  categories: "Plats, Entrees, Soupes, Desserts",
  commission: 10,
};

const readLS = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeLS = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Espace Admin — Diary" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user, isAuthenticated } = useAuth();
  const { orders } = useOrders();
  const { dishes } = useDishes();
  const navigate = useNavigate({ from: "/admin" });

  const [users, setUsers] = useState<User[]>([]);
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [settings, setSettings] = useState<PlatformSettings>(defaultSettings);

  useEffect(() => {
    setUsers(readLS<User[]>(USERS_KEY, []));
    setApprovals(readLS<ApprovalItem[]>(APPROVALS_KEY, defaultApprovals));
    setReports(readLS<ReportItem[]>(REPORTS_KEY, defaultReports));
    setSettings(readLS<PlatformSettings>(SETTINGS_KEY, defaultSettings));
  }, []);

  useEffect(() => writeLS(USERS_KEY, users), [users]);
  useEffect(() => writeLS(APPROVALS_KEY, approvals), [approvals]);
  useEffect(() => writeLS(REPORTS_KEY, reports), [reports]);
  useEffect(() => writeLS(SETTINGS_KEY, settings), [settings]);

  const activeUsers = useMemo(() => users.filter((u) => u.status !== "suspended").length, [users]);
  const pendingApprovals = useMemo(() => approvals.filter((a) => a.status === "pending").length, [approvals]);
  const pendingReports = useMemo(() => reports.filter((r) => r.status === "pending").length, [reports]);

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-3xl font-bold">Accès admin refusé</h1>
        <p className="mt-2 text-muted-foreground">Connectez-vous avec un compte administrateur.</p>
        <button
          onClick={() => navigate({ to: "/login" })}
          className="mt-6 inline-flex h-12 items-center rounded-full bg-gradient-warm px-8 font-semibold text-primary-foreground shadow-warm"
        >
          Aller vers login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-4xl font-bold">Espace Admin</h1>
        <p className="mt-2 text-muted-foreground">Pilotage global de la plateforme Diary.</p>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <Metric label="Utilisateurs actifs" value={activeUsers} />
          <Metric label="Commandes totales" value={orders.length} />
          <Metric label="Plats publiés" value={dishes.length} />
          <Metric label="Demandes à valider" value={pendingApprovals} />
          <Metric label="Signalements en attente" value={pendingReports} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-xl font-semibold">Validation cuisiniers et plats</h2>
            <div className="mt-4 space-y-3">
              {approvals.map((item) => (
                <div key={item.id} className="rounded-xl border border-border p-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Type: {item.type} - Statut: {item.status}</p>
                  {item.status === "pending" && (
                    <div className="mt-2 flex gap-2">
                      <ActionButton onClick={() => setApprovals((prev) => prev.map((a) => (a.id === item.id ? { ...a, status: "approved" } : a)))} label="Valider" />
                      <ActionButton onClick={() => setApprovals((prev) => prev.map((a) => (a.id === item.id ? { ...a, status: "rejected" } : a)))} label="Rejeter" secondary />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-xl font-semibold">Gestion des utilisateurs</h2>
            <div className="mt-4 space-y-3 max-h-80 overflow-auto pr-1">
              {users.map((u) => (
                <div key={u.id} className="rounded-xl border border-border p-3">
                  <p className="font-medium">{u.name} ({u.role})</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                  <div className="mt-2 flex gap-2">
                    <ActionButton onClick={() => setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, status: "active" } : x)))} label="Activer" />
                    <ActionButton onClick={() => setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, status: "suspended" } : x)))} label="Suspendre" secondary />
                    <ActionButton onClick={() => setUsers((prev) => prev.filter((x) => x.id !== u.id))} label="Supprimer" secondary />
                  </div>
                </div>
              ))}
              {users.length === 0 && <p className="text-sm text-muted-foreground">Aucun utilisateur trouvé.</p>}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-xl font-semibold">Modération des contenus</h2>
            <div className="mt-4 space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="rounded-xl border border-border p-3">
                  <p className="font-medium">{report.target}</p>
                  <p className="text-xs text-muted-foreground">{report.reason}</p>
                  <p className="text-xs text-muted-foreground mt-1">Statut: {report.status}</p>
                  {report.status === "pending" && (
                    <div className="mt-2">
                      <ActionButton onClick={() => setReports((prev) => prev.map((r) => (r.id === report.id ? { ...r, status: "reviewed" } : r)))} label="Marquer comme traité" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-xl font-semibold">Paramètres généraux</h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-sm font-medium">Catégories</label>
                <input
                  value={settings.categories}
                  onChange={(e) => setSettings((prev) => ({ ...prev, categories: e.target.value }))}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Commission (%)</label>
                <input
                  type="number"
                  value={settings.commission}
                  onChange={(e) => setSettings((prev) => ({ ...prev, commission: Number(e.target.value) || 0 }))}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                />
              </div>
              <button
                onClick={() => toast.success("Paramètres enregistrés.")}
                className="h-10 rounded-full bg-gradient-warm px-5 text-sm font-semibold text-primary-foreground shadow-warm"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold text-primary">{value}</p>
    </div>
  );
}

function ActionButton({ label, onClick, secondary }: { label: string; onClick: () => void; secondary?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`h-8 rounded-full px-3 text-xs font-semibold transition-smooth ${
        secondary ? "border border-border bg-background text-foreground hover:bg-muted" : "bg-primary text-primary-foreground hover:opacity-90"
      }`}
    >
      {label}
    </button>
  );
}
