import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "client" | "cuisinier" | "admin";
  status?: "active" | "suspended";
};

type AuthContextType = {
  user: User | null;
  login: (email: string, name: string, role: "client" | "cuisinier" | "admin") => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("diary_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const syncUserDirectory = (newUser: User) => {
    const key = "diary_users_directory";
    const raw = localStorage.getItem(key);
    const users: User[] = raw ? JSON.parse(raw) : [];
    const existing = users.find((u) => u.email.toLowerCase() === newUser.email.toLowerCase());
    const updated = existing
      ? users.map((u) => (u.email.toLowerCase() === newUser.email.toLowerCase() ? { ...u, ...newUser } : u))
      : [newUser, ...users];
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const login = (email: string, name: string, role: "client" | "cuisinier" | "admin" = "client") => {
    const newUser: User = { id: Math.random().toString(36).substring(7), email, name, role, status: "active" };
    setUser(newUser);
    localStorage.setItem("diary_user", JSON.stringify(newUser));
    syncUserDirectory(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("diary_user");
  };

  if (!isLoaded) return null; // Or a loading spinner

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
