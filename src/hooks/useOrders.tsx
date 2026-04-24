import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "./useCart";

export type OrderStatus = "pending" | "accepted" | "rejected";
export type PaymentMethod = "d17" | "carte-bancaire" | "livraison";

export type Order = {
  id: string;
  clientName: string;
  clientPhone: string;
  paymentMethod: PaymentMethod;
  paymentInfo?: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
};

type OrdersContextType = {
  orders: Order[];
  addOrder: (orderData: Omit<Order, "id" | "status" | "date">) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("diary_orders");
    if (stored) {
      try {
        const parsedOrders = JSON.parse(stored) as Partial<Order>[];
        const normalizedOrders: Order[] = parsedOrders.map((order) => ({
          ...(order as Order),
          paymentMethod:
            order.paymentMethod === "d17" || order.paymentMethod === "carte-bancaire" || order.paymentMethod === "livraison"
              ? order.paymentMethod
              : "livraison",
        }));
        setOrders(normalizedOrders);
      } catch (e) {
        console.error("Failed to parse orders from local storage", e);
      }
    }
  }, []);

  const addOrder = (orderData: Omit<Order, "id" | "status" | "date">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      status: "pending",
      date: new Date().toISOString(),
    };
    
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem("diary_orders", JSON.stringify(updated));
      return updated;
    });
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => {
      const updated = prev.map(o => o.id === orderId ? { ...o, status } : o);
      localStorage.setItem("diary_orders", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within a OrdersProvider");
  }
  return context;
}
