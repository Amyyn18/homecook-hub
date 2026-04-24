import couscous from "@/assets/dish-couscous.jpg";
import rizDjerbien from "@/assets/dish-riz-djerbien.jpg";
import tajine from "@/assets/dish-tajine.jpg";
import brik from "@/assets/dish-brik.jpg";
import loubia from "@/assets/dish-loubia.jpg";
import makroudh from "@/assets/dish-makroudh.jpg";
import salade from "@/assets/dish-salade.jpg";
import ojja from "@/assets/dish-ojja.jpg";
import kaakWarka from "@/assets/dish-kaak-warka.jpg";

export type Dish = {
  id: string;
  nom: string;
  prix: number;
  description: string;
  image: string;
  categorie: string;
  note: number;
  avis: number;
  cuisinier: string;
  cuisinierBio: string;
  ville: string;
  temps: string;
  ingredients: string[];
  allergenes: string[];
};

export type ChefReview = {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
};

export const categories = [
  { id: "all", label: "Tous", icon: "🍽️" },
  { id: "plat", label: "Plats", icon: "🥘" },
  { id: "entree", label: "Entrées", icon: "🥗" },
  { id: "soupe", label: "Soupes", icon: "🍲" },
  { id: "dessert", label: "Desserts", icon: "🍯" },
];

export const dishes: Dish[] = [
  {
    id: "couscous-agneau",
    nom: "Couscous à l'agneau",
    prix: 18,
    description: "Couscous traditionnel mijoté avec agneau tendre, légumes de saison et bouillon parfumé aux épices maison.",
    image: couscous,
    categorie: "plat",
    note: 4.9,
    avis: 142,
    cuisinier: "Mama Leila",
    cuisinierBio: "30 ans d'expérience en cuisine tunisienne traditionnelle.",
    ville: "Tunis",
    temps: "45 min",
    ingredients: ["Semoule", "Agneau", "Carottes", "Courgettes", "Pois chiches", "Épices"],
    allergenes: ["Gluten"],
  },
  {
    id: "riz-djerbien",
    nom: "Riz Djerbian",
    prix: 12,
    description: "Riz cuit à la vapeur avec des épinards, petits pois, carottes, persil et morceaux de viande, riche en saveurs.",
    image: rizDjerbien,
    categorie: "plat",
    note: 4.8,
    avis: 45,
    cuisinier: "Chef Amine",
    cuisinierBio: "Spécialiste de la cuisine djerbienne authentique.",
    ville: "Djerba",
    temps: "1h",
    ingredients: ["Riz", "Épinards", "Petits pois", "Carottes", "Persil", "Viande", "Épices"],
    allergenes: [],
  },
  {
    id: "tajine-tunisien",
    nom: "Tajine maison",
    prix: 14,
    description: "Tajine moelleux aux œufs, thon, fromage et persil. Cuit lentement pour une texture parfaite.",
    image: tajine,
    categorie: "plat",
    note: 4.8,
    avis: 98,
    cuisinier: "Chef Karim",
    cuisinierBio: "Cuisinier passionné, spécialiste des plats du terroir.",
    ville: "Sousse",
    temps: "30 min",
    ingredients: ["Œufs", "Thon", "Fromage", "Persil", "Pommes de terre"],
    allergenes: ["Œufs", "Lactose", "Poisson"],
  },
  {
    id: "brik-oeuf",
    nom: "Brik à l'œuf",
    prix: 6,
    description: "Feuille de brik croustillante garnie d'un œuf coulant, thon, câpres et persil. Servi avec citron.",
    image: brik,
    categorie: "entree",
    note: 4.7,
    avis: 76,
    cuisinier: "Sami",
    cuisinierBio: "Streetfood revisité avec amour.",
    ville: "Tunis",
    temps: "15 min",
    ingredients: ["Feuille de brik", "Œuf", "Thon", "Câpres", "Persil"],
    allergenes: ["Gluten", "Œufs", "Poisson"],
  },
  {
    id: "loubia",
    nom: "Loubia",
    prix: 11.5,
    description: "Ragoût traditionnel de haricots blancs à la viande, sauce tomate parfumée à l'ail.",
    image: loubia,
    categorie: "plat",
    note: 4.9,
    avis: 203,
    cuisinier: "Mama Leila",
    cuisinierBio: "30 ans d'expérience en cuisine tunisienne traditionnelle.",
    ville: "Tunis",
    temps: "45 min",
    ingredients: ["Haricots blancs", "Viande", "Tomates", "Ail", "Huile d'olive", "Épices"],
    allergenes: [],
  },
  {
    id: "makroudh",
    nom: "Makroudh aux dattes",
    prix: 9,
    description: "Pâtisserie tunisienne à la semoule, fourrée aux dattes et trempée dans un sirop au miel.",
    image: makroudh,
    categorie: "dessert",
    note: 4.8,
    avis: 67,
    cuisinier: "Tante Sonia",
    cuisinierBio: "Pâtisserie orientale faite maison depuis toujours.",
    ville: "Kairouan",
    temps: "1h",
    ingredients: ["Semoule", "Dattes", "Miel", "Huile d'olive", "Eau de fleur d'oranger"],
    allergenes: ["Gluten"],
  },
  {
    id: "salade-mechouia",
    nom: "Salade méchouia",
    prix: 8,
    description: "Salade de poivrons et tomates grillés au feu de bois, thon, œuf dur et olives. Saveur fumée unique.",
    image: salade,
    categorie: "entree",
    note: 4.6,
    avis: 54,
    cuisinier: "Chef Karim",
    cuisinierBio: "Cuisinier passionné, spécialiste des plats du terroir.",
    ville: "Sousse",
    temps: "25 min",
    ingredients: ["Poivrons", "Tomates", "Thon", "Œuf", "Olives", "Ail"],
    allergenes: ["Œufs", "Poisson"],
  },
  {
    id: "ojja-merguez",
    nom: "Ojja merguez",
    prix: 12,
    description: "Sauce tomate épicée mijotée avec merguez maison et œufs cassés directement dedans.",
    image: ojja,
    categorie: "plat",
    note: 4.8,
    avis: 89,
    cuisinier: "Sami",
    cuisinierBio: "Streetfood revisité avec amour.",
    ville: "Tunis",
    temps: "25 min",
    ingredients: ["Merguez", "Tomates", "Œufs", "Poivrons", "Harissa", "Ail"],
    allergenes: ["Œufs"],
  },
  {
    id: "kaak-warka",
    nom: "Kaak Warka",
    prix: 30,
    description: "Pâtisserie traditionnelle tunisienne fine à la pâte d'amande, parfumée à l'eau de l'églantine (ennesri).",
    image: kaakWarka,
    categorie: "dessert",
    note: 5.0,
    avis: 12,
    cuisinier: "mouin",
    cuisinierBio: "Pâtissier spécialisé dans les douceurs de Zaghouan.",
    ville: "Zaghouan",
    temps: "24h",
    ingredients: ["Amandes", "Sucre", "Beurre", "Farine", "Eau de l'églantine (ennesri)"],
    allergenes: ["Gluten", "Fruits à coque", "Lactose"],
  },
];

export const getDishes = (): Dish[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("diary_dishes");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) {}
    }
  }
  return dishes;
};

export const getDish = (id: string) => getDishes().find((d) => d.id === id);

export const chefReviews: Record<string, ChefReview[]> = {
  "Mama Leila": [
    { id: "ml-1", clientName: "Sarra B.", rating: 5, comment: "Goût authentique comme à la maison, excellent service.", date: "2026-03-19" },
    { id: "ml-2", clientName: "Youssef K.", rating: 5, comment: "Portions généreuses et très bonne présentation.", date: "2026-04-02" },
    { id: "ml-3", clientName: "Amal D.", rating: 4, comment: "Très bon couscous, livraison un peu en retard.", date: "2026-04-14" },
  ],
  "Chef Amine": [
    { id: "ca-1", clientName: "Rim H.", rating: 5, comment: "Riz djerbien super parfumé, je recommande.", date: "2026-02-28" },
    { id: "ca-2", clientName: "Nader M.", rating: 4, comment: "Très bon goût, portion correcte.", date: "2026-03-11" },
  ],
  "Chef Karim": [
    { id: "ck-1", clientName: "Lina T.", rating: 5, comment: "Tajine moelleux et bien assaisonné.", date: "2026-03-06" },
    { id: "ck-2", clientName: "Hichem J.", rating: 4, comment: "Bonne qualité globale, à refaire.", date: "2026-04-01" },
  ],
  Sami: [
    { id: "sa-1", clientName: "Nesrine A.", rating: 5, comment: "Ojja parfaite et bien épicée.", date: "2026-03-22" },
    { id: "sa-2", clientName: "Walid F.", rating: 4, comment: "Brik croustillante, top.", date: "2026-04-09" },
  ],
  "Tante Sonia": [
    { id: "ts-1", clientName: "Mouna R.", rating: 5, comment: "Makroudh délicieux et frais.", date: "2026-03-30" },
    { id: "ts-2", clientName: "Bilel Z.", rating: 4, comment: "Très bon dessert, un peu trop sucré pour moi.", date: "2026-04-07" },
  ],
  mouin: [
    { id: "mo-1", clientName: "Ines S.", rating: 5, comment: "Kaak warka raffiné, qualité premium.", date: "2026-04-12" },
    { id: "mo-2", clientName: "Skander C.", rating: 5, comment: "Très fin et savoureux.", date: "2026-04-17" },
  ],
};

const CHEF_REVIEWS_STORAGE_KEY = "diary_chef_reviews";

const getStoredChefReviews = (): Record<string, ChefReview[]> => {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(CHEF_REVIEWS_STORAGE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, ChefReview[]>;
    return parsed ?? {};
  } catch {
    return {};
  }
};

const setStoredChefReviews = (reviews: Record<string, ChefReview[]>) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHEF_REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
};

export const getChefReviews = (chefName: string): ChefReview[] => {
  const seeded = chefReviews[chefName] ?? [];
  const stored = getStoredChefReviews()[chefName] ?? [];
  return [...stored, ...seeded];
};

export const addChefReview = (chefName: string, review: Omit<ChefReview, "id" | "date">) => {
  const allStored = getStoredChefReviews();
  const chefStored = allStored[chefName] ?? [];
  const nextReview: ChefReview = {
    id: `rev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: new Date().toISOString(),
    ...review,
  };
  setStoredChefReviews({
    ...allStored,
    [chefName]: [nextReview, ...chefStored],
  });
};
