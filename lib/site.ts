/**
 * Глобальні дані сайту.
 * TODO: замініть контакти на реальні дані компанії (зараз — значення з дизайн-референсу).
 */
export const site = {
  name: "FireHome",
  tagline: "Каміни, печі та професійний монтаж",
  phone: "+38 (050) 123-45-67",
  phoneHref: "tel:+380501234567",
  email: "info@firehome.ua",
  address: "м. Київ, вул. Промислова, 12",
  hours: "Пн–Пт: 9:00–18:00",
  /** Посилання на соцмережі. Порожній масив — блок не показується. */
  socials: [] as { label: string; href: string }[],
};

export const mainNav = [
  { label: "Каталог", href: "/catalog" },
  { label: "Монтаж", href: "/montazh" },
  { label: "Про нас", href: "/#about" },
  { label: "Доставка", href: "/#delivery" },
  { label: "Контакти", href: "/#contacts" },
];
