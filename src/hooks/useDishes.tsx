import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Dish, dishes as staticDishes } from "@/data/dishes";

type DishesContextType = {
  dishes: Dish[];
  addDish: (dish: Omit<Dish, "id">) => void;
};

const DishesContext = createContext<DishesContextType | undefined>(undefined);

export function DishesProvider({ children }: { children: ReactNode }) {
  const [dishes, setDishes] = useState<Dish[]>(staticDishes);

  useEffect(() => {
    const stored = localStorage.getItem("diary_dishes");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) {
          setDishes(parsed);
        }
      } catch (e) {
        console.error("Failed to parse dishes from local storage", e);
      }
    }
  }, []);

  const addDish = (newDishData: Omit<Dish, "id">) => {
    const newDish: Dish = {
      ...newDishData,
      id: `dish-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    };
    
    setDishes((prev) => {
      const updated = [newDish, ...prev];
      localStorage.setItem("diary_dishes", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <DishesContext.Provider value={{ dishes, addDish }}>
      {children}
    </DishesContext.Provider>
  );
}

export function useDishes() {
  const context = useContext(DishesContext);
  if (context === undefined) {
    throw new Error("useDishes must be used within a DishesProvider");
  }
  return context;
}
