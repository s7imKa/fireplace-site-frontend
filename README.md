# fireplace-site-frontend

Next.js (App Router) frontend.

## Запуск

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL, default: local backend
npm run dev
```

Відкрити [http://localhost:3000](http://localhost:3000).

## Deploy

Deployed to [Vercel](https://vercel.com) from `main`. Required variable: `NEXT_PUBLIC_API_URL` (backend URL with `/api`). It is inlined at build time, so redeploy after changing it. CI runs in GitHub Actions (`.github/workflows/ci.yml`).

## Структура

```
app/            маршрути: / , /catalog, /catalog/[category], /product/[slug], /montazh
components/
  ui/           Button, Icon (єдиний набір лінійних іконок), Primitives (SectionHeading, Breadcrumbs, StockStatus…)
  layout/       Header, Footer, Logo, SearchOverlay, CartDrawer
  home/         секції головної
  catalog/      CatalogView — фільтри, сортування, «Показати ще», мобільна панель фільтрів
  product/      ProductCard, ProductGallery, ProductPurchase, ProductTabs
  montazh/      FAQ
  forms/        CallbackForm — POST /callback-requests (лише name + phone)
  pages/        композиції сторінок; файли в app/ — тонкі обгортки з метаданими
lib/
  api.ts        apiFetch
  site.ts       контакти та навігація
  cart.tsx      кошик (useSyncExternalStore + localStorage)
  data/         категорії, товари, відгуки, галерея, FAQ
public/images/  фото
```

Дизайн-правила — `docs/UI-UX.md`. Токени — `@theme` у `app/globals.css`.

## Тимчасовий контент (замінити перед релізом)

- **Товари** (`lib/data/products.ts`) — демо-дані: назви, ціни й характеристики вигадані для верстки. Замінити на дані з API, коли з'явиться ендпоінт каталогу; інтерфейс `Product` і функції `getProduct`, `getProductsByCategory` можна зберегти.
- **Фото** (`public/images/`) — тимчасові, низької роздільності. Замінити на реальні з тими самими іменами файлів.
- **Контакти** (`lib/site.ts`) — значення з дизайн-референсу.
- **Відгуки** (`lib/data/content.ts`) — порожні свідомо; блок показує запрошення залишити відгук.
- **Галерея монтажу** — позначена в інтерфейсі як ілюстративна (`works.illustrative`).
- **Оформлення замовлення** — поки бекенд не приймає замовлення, кнопка в кошику відкриває форму зворотного дзвінка.
