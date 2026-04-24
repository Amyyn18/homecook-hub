import { Star, Clock, MapPin, ShoppingBag, Check } from "lucide-react";
import { getChefReviews, type Dish } from "@/data/dishes";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DishCard({ dish }: { dish: Dish }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const chefReviews = getChefReviews(dish.cuisinier);

  const handleAddToCart = () => {
    addItem(dish, quantity);
    toast.success(`${quantity}x ${dish.nom} ajouté au panier`, {
      icon: <Check className="h-4 w-4 text-success" />,
    });
    setOpen(false);
    setQuantity(1);
    setNotes("");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div
          onClick={() => setOpen(true)}
          className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-card text-left"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
            <img
              src={dish.image}
              alt={dish.nom}
              loading="lazy"
              width={800}
              height={600}
              className="h-full w-full object-cover transition-smooth duration-500 group-hover:scale-105"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setReviewsOpen(true);
              }}
              className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-xs font-semibold shadow-soft backdrop-blur transition-smooth hover:bg-background"
            >
              <Star className="h-3 w-3 fill-primary text-primary" />
              {dish.note}
              <span className="text-muted-foreground">({dish.avis})</span>
            </button>
          </div>

          <div className="flex flex-1 flex-col p-4 w-full">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold leading-tight">{dish.nom}</h3>
              <span className="shrink-0 font-display text-lg font-bold text-primary">{dish.prix} DT</span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{dish.description}</p>

            <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-muted-foreground">
              <span className="font-medium text-foreground/80">{dish.cuisinier}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {dish.temps}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {dish.ville}
              </span>
            </div>
          </div>
        </div>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{dish.nom}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6 py-4">
            <div className="flex items-center gap-4">
              <img src={dish.image} alt={dish.nom} className="h-20 w-20 rounded-xl object-cover" />
              <div>
                <p className="font-bold text-primary text-xl">{dish.prix} DT</p>
                <p className="text-sm text-muted-foreground">Cuisiné par {dish.cuisinier}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Quantité</label>
              <div className="mt-2 flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-lg font-medium transition-smooth hover:border-primary hover:text-primary"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-lg font-medium transition-smooth hover:border-primary hover:text-primary"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Instructions spéciales (Optionnel)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Sans oignons, moins épicé..."
                rows={2}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-warm font-semibold text-primary-foreground shadow-warm transition-smooth hover:opacity-90"
            >
              <ShoppingBag className="h-4 w-4" />
              Ajouter au panier ({dish.prix * quantity} DT)
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={reviewsOpen} onOpenChange={setReviewsOpen}>
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
        </DialogContent>
      </Dialog>
    </>
  );
}
