import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { addChefReview, getDish, getChefReviews } from "@/data/dishes";
import { Star, Clock, MapPin, ChefHat, ArrowLeft, ShoppingBag, ShieldCheck, Check } from "lucide-react";
import { DishCard } from "@/components/DishCard";
import { useCart } from "@/hooks/useCart";
import { useDishes } from "@/hooks/useDishes";
import { toast } from "sonner";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Route = createFileRoute("/plats/$id")({
  loader: ({ params }) => {
    const dish = getDish(params.id);
    if (!dish) throw notFound();
    return { dish };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.dish.nom} — Diary` },
          { name: "description", content: loaderData.dish.description },
          { property: "og:title", content: `${loaderData.dish.nom} — Diary` },
          { property: "og:description", content: loaderData.dish.description },
          { property: "og:image", content: loaderData.dish.image },
          { property: "twitter:image", content: loaderData.dish.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <h1 className="font-display text-4xl font-bold">Plat introuvable</h1>
        <p className="mt-4 text-muted-foreground">Ce plat n'existe pas ou n'est plus disponible.</p>
        <Link to="/plats" className="mt-6 inline-flex h-11 items-center rounded-full bg-gradient-warm px-6 font-semibold text-primary-foreground shadow-warm">
          Voir tous les plats
        </Link>
      </div>
      <Footer />
    </div>
  ),
  component: DishDetail,
});

function DishDetail() {
  const { dish } = Route.useLoaderData();
  const { dishes } = useDishes();
  const { addItem } = useCart();
  const similar = dishes.filter((d) => d.id !== dish.id && d.categorie === dish.categorie).slice(0, 3);
  const [quantity, setQuantity] = React.useState(1);
  const [chefReviews, setChefReviews] = React.useState(() => getChefReviews(dish.cuisinier));
  const [reviewName, setReviewName] = React.useState("");
  const [reviewRating, setReviewRating] = React.useState(5);
  const [reviewComment, setReviewComment] = React.useState("");

  React.useEffect(() => {
    setChefReviews(getChefReviews(dish.cuisinier));
  }, [dish.cuisinier]);

  const handleAddToCart = () => {
    addItem(dish, quantity);
    toast.success(`${quantity}x ${dish.nom} ajouté au panier`, {
      icon: <Check className="h-4 w-4 text-success" />,
      action: {
        label: "Voir panier",
        onClick: () => window.location.href = "/panier"
      }
    });
  };

  const handleAddReview = () => {
    if (!reviewName.trim()) {
      toast.error("Veuillez saisir votre nom.");
      return;
    }
    if (!reviewComment.trim()) {
      toast.error("Veuillez écrire votre avis.");
      return;
    }
    addChefReview(dish.cuisinier, {
      clientName: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
    });
    setChefReviews(getChefReviews(dish.cuisinier));
    setReviewName("");
    setReviewRating(5);
    setReviewComment("");
    toast.success("Merci, votre avis a été ajouté.");
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/plats"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Retour aux plats
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-card">
            <img
              src={dish.image}
              alt={dish.nom}
              width={800}
              height={800}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {dish.categorie}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <strong>{dish.note}</strong>
                <span className="text-muted-foreground">({dish.avis} avis)</span>
              </span>
            </div>

            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {dish.nom}
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">{dish.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {dish.temps}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {dish.ville}
              </span>
            </div>

            {/* Ingrédients */}
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold">Ingrédients</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {dish.ingredients.map((ing: string) => (
                  <span key={ing} className="rounded-full bg-secondary px-3 py-1 text-sm">{ing}</span>
                ))}
              </div>
            </div>

            {dish.allergenes.length > 0 && (
              <div className="mt-6">
                <h2 className="font-display text-lg font-semibold">Allergènes</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Contient : {dish.allergenes.join(", ")}
                </p>
              </div>
            )}

            {/* Cuisinier */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-warm shadow-warm">
                  <ChefHat className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg font-semibold">{dish.cuisinier}</p>
                    <ShieldCheck className="h-4 w-4 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground">{dish.cuisinierBio}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      {dish.note} ({dish.avis} avis) - Voir les avis clients
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Avis clients - {dish.cuisinier}</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
                      {chefReviews.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Pas encore d'avis pour ce cuisinier.</p>
                      ) : (
                        chefReviews.map((review) => (
                          <div key={review.id} className="rounded-xl border border-border bg-background p-3">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{review.clientName}</p>
                              <span className="text-xs text-muted-foreground">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-sm font-medium text-primary">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              {review.rating}/5
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="mt-4 border-t border-border pt-4">
                      <h4 className="font-medium">Ajouter un avis</h4>
                      <div className="mt-3 space-y-3">
                        <input
                          type="text"
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="Votre nom"
                          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                        />
                        <div>
                          <label className="text-sm text-muted-foreground">Votre note</label>
                          <select
                            value={reviewRating}
                            onChange={(e) => setReviewRating(Number(e.target.value))}
                            className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                          >
                            <option value={5}>5/5</option>
                            <option value={4}>4/5</option>
                            <option value={3}>3/5</option>
                            <option value={2}>2/5</option>
                            <option value={1}>1/5</option>
                          </select>
                        </div>
                        <textarea
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Écrivez votre avis..."
                          rows={3}
                          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={handleAddReview}
                          className="h-10 rounded-full bg-gradient-warm px-5 text-sm font-semibold text-primary-foreground shadow-warm transition-smooth hover:opacity-90"
                        >
                          Envoyer l'avis
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Prix</p>
                <p className="font-display text-3xl font-bold text-primary">{dish.prix} DT</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 rounded-full border border-border bg-background px-3 py-1 text-sm font-medium">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    -
                  </button>
                  <span className="w-4 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-warm px-7 text-sm font-semibold text-primary-foreground shadow-warm transition-smooth hover:opacity-90"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-3xl font-bold tracking-tight">À découvrir aussi</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((d) => (
                <DishCard key={d.id} dish={d} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
