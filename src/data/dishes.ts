import couscous from "@/assets/dish-couscous.jpg";
import tajine from "@/assets/dish-tajine.jpg";
import brik from "@/assets/dish-brik.jpg";
import lablabi from "@/assets/dish-lablabi.jpg";
import makroudh from "@/assets/dish-makroudh.jpg";
import salade from "@/assets/dish-salade.jpg";
import ojja from "@/assets/dish-ojja.jpg";

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
    id: "lablabi",
    nom: "Lablabi",
    prix: 7,
    description: "Soupe traditionnelle aux pois chiches, harissa, cumin et œuf poché. Le réconfort à l'état pur.",
    image: lablabi,
    categorie: "soupe",
    note: 4.9,
    avis: 203,
    cuisinier: "Mama Leila",
    cuisinierBio: "30 ans d'expérience en cuisine tunisienne traditionnelle.",
    ville: "Tunis",
    temps: "20 min",
    ingredients: ["Pois chiches", "Pain", "Harissa", "Cumin", "Œuf", "Huile d'olive"],
    allergenes: ["Gluten", "Œufs"],
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
];

export const getDish = (id: string) => dishes.find((d) => d.id === id);
