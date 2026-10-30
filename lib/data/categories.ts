export type CategorySlug = "kaminy" | "pechi" | "topky" | "biokaminy";

export interface Category {
  slug: CategorySlug;
  title: string;
  /** Назва в однині — для хлібних крихт і карток */
  short: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: "kaminy",
    title: "Каміни",
    short: "Камін",
    description:
      "Пристінні, кутові та острівні каміни для вітальні й заміського будинку. Допоможемо підібрати модель під площу приміщення та стиль інтер’єру.",
    image: "/images/category-kaminy.jpg",
  },
  {
    slug: "pechi",
    title: "Печі",
    short: "Піч",
    description:
      "Окремо стоячі печі для опалення будинку, дачі чи студії. Компактні рішення з видимим полум’ям.",
    image: "/images/category-pechi.jpg",
  },
  {
    slug: "topky",
    title: "Камінні топки",
    short: "Камінна топка",
    description:
      "Топки для вбудовування в облицювання — основа сучасного каміна. Різні формати скла та способи монтажу.",
    image: "/images/category-topky.jpg",
  },
  {
    slug: "biokaminy",
    title: "Біокаміни",
    short: "Біокамін",
    description:
      "Живе полум’я без димоходу: для квартир, терас і комерційних просторів.",
    image: "/images/category-biokaminy.jpg",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
