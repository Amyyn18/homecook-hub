import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShoppingBag, ArrowLeft, Minus, Plus, Trash2, CheckCircle2, Phone } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import type { PaymentMethod } from "@/hooks/useOrders";
import { toast } from "sonner";
import { useState } from "react";

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
  const { items, updateQuantity, removeItem, clearCart, subtotal, totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate({ from: "/panier" });
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("livraison");
  const [d17Phone, setD17Phone] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const fraisLivraison = 5;
  const total = subtotal > 0 ? subtotal + fraisLivraison : 0;
  const digitsOnly = (value: string) => value.replace(/\D/g, "");

  const handleCheckout = () => {
    if (!isAuthenticated || !user) {
      toast.error("Veuillez vous connecter pour passer commande");
      navigate({ to: "/login" });
      return;
    }
    
    if (!phone || phone.length < 8) {
      toast.error("Veuillez entrer un numéro de téléphone valide pour la livraison");
      return;
    }

    if (paymentMethod === "d17") {
      const cleanedD17 = digitsOnly(d17Phone);
      if (!/^\d{8}$/.test(cleanedD17)) {
        toast.error("Veuillez saisir un numéro D17 valide (8 chiffres).");
        return;
      }
    }

    if (paymentMethod === "carte-bancaire") {
      const cleanedCardNumber = digitsOnly(cardNumber);
      const cleanedCvv = digitsOnly(cardCvv);
      if (!cardHolder.trim()) {
        toast.error("Veuillez saisir le nom du titulaire de la carte.");
        return;
      }
      if (!/^\d{16}$/.test(cleanedCardNumber)) {
        toast.error("Veuillez saisir un numéro de carte valide (16 chiffres).");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        toast.error("Veuillez saisir une date d'expiration au format MM/AA.");
        return;
      }
      if (!/^\d{3,4}$/.test(cleanedCvv)) {
        toast.error("Veuillez saisir un CVV valide.");
        return;
      }
    }
    
    addOrder({
      clientName: user.name,
      clientPhone: phone,
      paymentMethod,
      paymentInfo:
        paymentMethod === "d17"
          ? `D17: ${digitsOnly(d17Phone)}`
          : paymentMethod === "carte-bancaire"
            ? `Carte: **** **** **** ${digitsOnly(cardNumber).slice(-4)}`
            : undefined,
      items,
      total,
    });

    clearCart();
    toast.success("Commande validée avec succès ! Votre cuisinier a été notifié.", {
      icon: <CheckCircle2 className="h-5 w-5 text-success" />
    });
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/plats" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Continuer mes achats
        </Link>

        {items.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-border bg-card p-12 text-center shadow-soft">
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
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <h1 className="font-display text-2xl font-bold">Mon panier ({totalItems} articles)</h1>
                <div className="mt-8 divide-y divide-border">
                  {items.map(({ dish, quantity }) => (
                    <div key={dish.id} className="flex gap-4 py-6 first:pt-0 last:pb-0 sm:gap-6">
                      <img
                        src={dish.image}
                        alt={dish.nom}
                        className="h-24 w-24 rounded-2xl object-cover sm:h-32 sm:w-32"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="font-display text-lg font-bold sm:text-xl">
                              <Link to={`/plats/${dish.id}`} className="hover:text-primary transition-smooth">
                                {dish.nom}
                              </Link>
                            </h3>
                            <p className="font-bold text-primary">{dish.prix * quantity} DT</p>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">Par {dish.cuisinier}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 rounded-full border border-border px-3 py-1 text-sm font-medium">
                            <button
                              onClick={() => updateQuantity(dish.id, quantity - 1)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-4 text-center">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(dish.id, quantity + 1)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(dish.id)}
                            className="text-muted-foreground transition-smooth hover:text-destructive"
                            aria-label="Supprimer"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <h2 className="font-display text-xl font-bold">Récapitulatif</h2>
                <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span className="font-medium text-foreground">{subtotal} DT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frais de livraison</span>
                    <span className="font-medium text-foreground">{fraisLivraison} DT</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-between border-t border-border pt-6 font-display text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-primary">{total} DT</span>
                </div>
                
                <div className="mt-8">
                  <label className="text-sm font-medium">Votre numéro de téléphone</label>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2 shadow-sm transition-smooth focus-within:border-primary">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="2X XXX XXX"
                      className="flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Le chef vous appellera pour confirmer.</p>
                </div>

                <div className="mt-6">
                  <label className="text-sm font-medium">Méthode de paiement</label>
                  <div className="mt-2 space-y-2 rounded-xl border border-input bg-background p-3 text-sm">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="payment-method"
                        value="d17"
                        checked={paymentMethod === "d17"}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      />
                      D17
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="payment-method"
                        value="carte-bancaire"
                        checked={paymentMethod === "carte-bancaire"}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      />
                      Carte bancaire
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="payment-method"
                        value="livraison"
                        checked={paymentMethod === "livraison"}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      />
                      Paiement à la livraison
                    </label>
                  </div>
                </div>

                {paymentMethod === "d17" && (
                  <div className="mt-4">
                    <label className="text-sm font-medium">Numéro D17</label>
                    <input
                      type="tel"
                      value={d17Phone}
                      onChange={(e) => setD17Phone(e.target.value)}
                      placeholder="XX XXX XXX"
                      className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                    />
                  </div>
                )}

                {paymentMethod === "carte-bancaire" && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="text-sm font-medium">Titulaire de la carte</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Nom et prénom"
                        className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Numéro de carte</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Expiration</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/AA"
                          className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="***"
                          className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  className="mt-6 h-14 w-full rounded-full bg-gradient-warm font-semibold text-primary-foreground shadow-warm transition-smooth hover:opacity-90"
                >
                  Valider la commande
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
