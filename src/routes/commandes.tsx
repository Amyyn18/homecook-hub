import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import type { PaymentMethod } from "@/hooks/useOrders";
import { toast } from "sonner";
import { Check, X, Phone, User, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/commandes")({
  head: () => ({
    meta: [{ title: "Mes Commandes — Diary" }],
  }),
  component: CommandesPage,
});

const paymentLabels: Record<PaymentMethod, string> = {
  d17: "D17",
  "carte-bancaire": "Carte bancaire",
  livraison: "Paiement à la livraison",
};

function CommandesPage() {
  const { isAuthenticated, user } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const navigate = useNavigate({ from: "/commandes" });

  if (!isAuthenticated || user?.role !== "cuisinier") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-3xl font-bold">Accès refusé</h1>
        <p className="mt-2 text-muted-foreground">Seuls les cuisiniers peuvent voir les commandes.</p>
        <button onClick={() => navigate({ to: "/login" })} className="mt-6 inline-flex h-12 items-center rounded-full bg-gradient-warm px-8 font-semibold text-primary-foreground shadow-warm">
          Se connecter
        </button>
      </div>
    );
  }

  // Filter orders meant for this chef? 
  // In our mock, we just show all orders, but ideally we filter by dishes owned by this chef.
  // For simplicity since it's front-end mock, we show all pending/accepted orders.
  
  const handleAccept = (orderId: string) => {
    updateOrderStatus(orderId, "accepted");
    toast.success("Commande acceptée !", {
      icon: <CheckCircle2 className="h-5 w-5 text-success" />
    });
  };

  const handleReject = (orderId: string) => {
    updateOrderStatus(orderId, "rejected");
    toast.error("Commande refusée.");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold">Tableau de bord : Commandes</h1>
          <p className="mt-2 text-muted-foreground">Gérez vos demandes de commandes et contactez vos clients.</p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-12 text-center shadow-soft">
            <h2 className="font-display text-2xl font-bold">Aucune commande pour le moment</h2>
            <p className="mt-2 text-muted-foreground">Vos commandes apparaîtront ici.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                        order.status === "pending" ? "bg-amber-100 text-amber-700" :
                        order.status === "accepted" ? "bg-success/20 text-success" :
                        "bg-destructive/10 text-destructive"
                      }`}>
                        {order.status === "pending" ? "En attente" :
                         order.status === "accepted" ? "Acceptée" : "Refusée"}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {new Date(order.date).toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 rounded-2xl bg-muted/50 p-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Client</p>
                        <p className="flex items-center gap-2 font-medium">
                          <User className="h-4 w-4 text-primary" /> {order.clientName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Téléphone</p>
                        <a href={`tel:${order.clientPhone}`} className="flex items-center gap-2 font-medium text-primary hover:underline">
                          <Phone className="h-4 w-4" /> {order.clientPhone}
                        </a>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Paiement</p>
                        <p className="font-medium">{paymentLabels[order.paymentMethod]}</p>
                        {order.paymentInfo && <p className="text-xs text-muted-foreground">{order.paymentInfo}</p>}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-display text-lg font-semibold">Détails de la commande</h3>
                      <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-background">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex items-center justify-between p-3 sm:p-4">
                            <div className="flex items-center gap-3">
                              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                                {item.quantity}x
                              </span>
                              <span className="font-medium">{item.dish.nom}</span>
                            </div>
                            <span className="font-semibold text-primary">{item.dish.prix * item.quantity} DT</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex justify-between font-display text-xl font-bold">
                        <span>Total (avec livraison)</span>
                        <span className="text-primary">{order.total} DT</span>
                      </div>
                    </div>
                  </div>

                  {order.status === "pending" && (
                    <div className="flex shrink-0 flex-col gap-3 lg:w-48">
                      <button
                        onClick={() => handleAccept(order.id)}
                        className="flex h-12 items-center justify-center gap-2 rounded-full bg-success px-6 font-semibold text-white shadow-soft transition-smooth hover:opacity-90"
                      >
                        <Check className="h-5 w-5" /> Accepter
                      </button>
                      <button
                        onClick={() => handleReject(order.id)}
                        className="flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 font-semibold text-muted-foreground shadow-soft transition-smooth hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                      >
                        <X className="h-5 w-5" /> Refuser
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
