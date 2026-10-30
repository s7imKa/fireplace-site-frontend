import type { CategorySlug } from "./categories";

/**
 * ⚠️ ДЕМО-ДАНІ.
 * Назви, ціни та характеристики нижче — тимчасовий контент для верстки,
 * а не дані реальних товарів. Замініть їх на дані з вашого API/CMS
 * (функції getProducts / getProduct залишаться тими самими).
 */

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  oldPrice?: number;
  /** true — в наявності, false — під замовлення, undefined — невідомо */
  inStock?: boolean;
  manufacturer?: string;
  images: string[];
  /** Перші 3 характеристики показуються у картці товару */
  specs: Spec[];
  description: string;
  /** Комплектація. Якщо відсутня — вкладка показує підказку звернутися до менеджера */
  package?: string[];
  warrantyMonths?: number;
  powerKw: number;
  badge?: string;
}

const IMG = {
  kaminy: "/images/category-kaminy.jpg",
  pechi: "/images/category-pechi.jpg",
  topky: "/images/category-topky.jpg",
  insert: "/images/product-insert.jpg",
  bio: "/images/category-biokaminy.jpg",
  living: "/images/interior-living.jpg",
  about: "/images/about-interior.jpg",
  corner: "/images/interior-corner.jpg",
  wood: "/images/interior-wood.jpg",
};

const s = (power: number, eff: number, flue: string | null, weight: number): Spec[] =>
  [
    { label: "Потужність", value: `${power} кВт` },
    { label: "ККД", value: `${eff}%` },
    flue ? { label: "Діаметр димоходу", value: flue } : { label: "Димохід", value: "Не потрібен" },
    { label: "Вага", value: `${weight} кг` },
  ];

export const products: Product[] = [
  {
    slug: "kaminna-topka-linea-70",
    name: "Камінна топка Linea 70",
    category: "topky",
    price: 82500,
    inStock: true,
    images: [IMG.insert, IMG.topky, IMG.living, IMG.about],
    specs: [...s(12, 78, "200 мм", 180), { label: "Скло", value: "Пряме" }],
    powerKw: 12,
    description:
      "Сучасна камінна топка для вбудовування в облицювання. Пряме скло відкриває вид на полум’я, а система подачі повітря допомагає підтримувати скло чистим. Підходить для вітальні та заміського будинку.",
    package: ["Топка", "Регулятор подачі повітря", "Рукавиця", "Інструкція з монтажу та експлуатації"],
    warrantyMonths: 24,
    badge: "Хіт продажу",
  },
  {
    slug: "kamin-arco-90",
    name: "Камін Arco 90",
    category: "kaminy",
    price: 118000,
    inStock: true,
    images: [IMG.kaminy, IMG.about, IMG.living],
    specs: [...s(14, 80, "200 мм", 240)],
    powerKw: 14,
    description:
      "Пристінний камін у мінімалістичному облицюванні під камінь. Широке скло та глибока камера згоряння створюють виразне полум’я.",
    warrantyMonths: 24,
  },
  {
    slug: "pich-tondo-8",
    name: "Піч Tondo 8",
    category: "pechi",
    price: 34900,
    inStock: true,
    images: [IMG.pechi, IMG.wood],
    specs: [...s(8, 77, "150 мм", 115)],
    powerKw: 8,
    description:
      "Компактна окремо стояча піч на ніжці з поворотною основою. Підходить для будинку, дачі або студії до 80 м².",
    package: ["Піч", "Рукавиця", "Інструкція"],
    warrantyMonths: 24,
  },
  {
    slug: "biokamin-terra-100",
    name: "Біокамін Terra 100",
    category: "biokaminy",
    price: 21400,
    inStock: false,
    images: [IMG.bio, IMG.corner],
    specs: [...s(3, 95, null, 38)],
    powerKw: 3,
    description:
      "Підлоговий біокамін для тераси чи вітальні. Не потребує димоходу — достатньо стандартної вентиляції приміщення.",
    warrantyMonths: 12,
    badge: "Без димоходу",
  },
  {
    slug: "kaminna-topka-prisma-60",
    name: "Камінна топка Prisma 60",
    category: "topky",
    price: 64800,
    inStock: true,
    images: [IMG.topky, IMG.insert, IMG.corner],
    specs: [...s(9, 79, "180 мм", 140), { label: "Скло", value: "Пряме" }],
    powerKw: 9,
    description: "Компактна топка для невеликих вітальнь та кутових порталів.",
    warrantyMonths: 24,
  },
  {
    slug: "kamin-quadro-120",
    name: "Камін Quadro 120",
    category: "kaminy",
    price: 156000,
    oldPrice: 168000,
    inStock: false,
    images: [IMG.about, IMG.kaminy, IMG.living],
    specs: [...s(16, 81, "250 мм", 310)],
    powerKw: 16,
    description: "Широкоформатний камін для просторих вітальнь із високою стелею.",
    warrantyMonths: 24,
  },
  {
    slug: "pich-nordline-11",
    name: "Піч Nordline 11",
    category: "pechi",
    price: 47500,
    inStock: true,
    images: [IMG.wood, IMG.pechi],
    specs: [...s(11, 78, "150 мм", 160)],
    powerKw: 11,
    description: "Піч із вбудованою нішею для дров та великим склом.",
    warrantyMonths: 24,
  },
  {
    slug: "biokamin-slim-60",
    name: "Біокамін Slim 60",
    category: "biokaminy",
    price: 18000,
    inStock: true,
    images: [IMG.corner, IMG.bio],
    specs: [...s(2, 95, null, 22)],
    powerKw: 2,
    description: "Вбудований біокамін-пальник для меблевих стінок і порталів.",
    warrantyMonths: 12,
  },
  {
    slug: "kaminna-topka-corner-75",
    name: "Камінна топка Corner 75",
    category: "topky",
    price: 91200,
    inStock: false,
    images: [IMG.corner, IMG.insert],
    specs: [...s(13, 78, "200 мм", 195), { label: "Скло", value: "Кутове" }],
    powerKw: 13,
    description: "Кутова топка з Г-подібним склом для кутових та пристінних порталів.",
    warrantyMonths: 24,
  },
  {
    slug: "kamin-stone-80",
    name: "Камін Stone 80",
    category: "kaminy",
    price: 45000,
    inStock: true,
    images: [IMG.living, IMG.kaminy],
    specs: [...s(10, 76, "180 мм", 205)],
    powerKw: 10,
    description: "Класичний пристінний камін у кам’яному облицюванні.",
    warrantyMonths: 24,
  },
  {
    slug: "pich-cube-6",
    name: "Піч Cube 6",
    category: "pechi",
    price: 28000,
    inStock: undefined,
    images: [IMG.pechi],
    specs: [...s(6, 75, "120 мм", 90)],
    powerKw: 6,
    description: "Невелика піч для приміщень до 60 м².",
  },
  {
    slug: "biokamin-garden-140",
    name: "Біокамін Garden 140",
    category: "biokaminy",
    price: 39600,
    inStock: true,
    images: [IMG.bio],
    specs: [...s(4, 95, null, 64)],
    powerKw: 4,
    description: "Вуличний біокамін-лава для тераси та саду.",
    warrantyMonths: 12,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getProductsByCategory = (cat?: string) =>
  cat ? products.filter((p) => p.category === cat) : products;

export const getPopularProducts = () =>
  ["kaminna-topka-linea-70", "kamin-arco-90", "pich-tondo-8", "biokamin-terra-100"]
    .map((slug) => getProduct(slug))
    .filter(Boolean) as Product[];

export const getSimilarProducts = (product: Product, limit = 4) =>
  products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, limit);
