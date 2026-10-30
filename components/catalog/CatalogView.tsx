"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { categories, type CategorySlug } from "@/lib/data/categories";
import { getProductsByCategory, type Product } from "@/lib/data/products";
import { cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";

type Sort = "popular" | "price-asc" | "price-desc" | "name";
const SORTS: { value: Sort; label: string }[] = [
  { value: "popular", label: "За популярністю" },
  { value: "price-asc", label: "Спочатку дешевші" },
  { value: "price-desc", label: "Спочатку дорожчі" },
  { value: "name", label: "За назвою" },
];
const POWER = [
  { id: "p1", label: "До 5 кВт", min: 0, max: 5 },
  { id: "p2", label: "5–10 кВт", min: 5.01, max: 10 },
  { id: "p3", label: "10–15 кВт", min: 10.01, max: 15 },
  { id: "p4", label: "Понад 15 кВт", min: 15.01, max: Infinity },
];
const PAGE = 8;

interface Filters {
  priceFrom: string;
  priceTo: string;
  inStock: boolean;
  power: string[];
}
const EMPTY: Filters = { priceFrom: "", priceTo: "", inStock: false, power: [] };

export function CatalogView({ category }: { category?: CategorySlug }) {
  const base = useMemo(() => getProductsByCategory(category), [category]);
  const [filters, setFiltersRaw] = useState<Filters>(EMPTY);
  const [sort, setSortRaw] = useState<Sort>("popular");
  const [visible, setVisible] = useState(PAGE);
  const [drawer, setDrawer] = useState(false);

  // Зміна фільтрів чи сортування повертає до першої «сторінки»
  const setFilters = (f: Filters | ((f: Filters) => Filters)) => {
    setFiltersRaw(f);
    setVisible(PAGE);
  };
  const setSort = (v: Sort) => {
    setSortRaw(v);
    setVisible(PAGE);
  };
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const list = useMemo(() => {
    const from = Number(filters.priceFrom) || 0;
    const to = Number(filters.priceTo) || Infinity;
    let r = base.filter(
      (p) =>
        p.price >= from &&
        p.price <= to &&
        (!filters.inStock || p.inStock === true) &&
        (filters.power.length === 0 || POWER.some((g) => filters.power.includes(g.id) && p.powerKw >= g.min && p.powerKw <= g.max)),
    );
    const by: Record<Sort, (a: Product, b: Product) => number> = {
      popular: () => 0,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name, "uk"),
    };
    r = [...r].sort(by[sort]);
    return r;
  }, [base, filters, sort]);

  const activeCount =
    (filters.priceFrom ? 1 : 0) + (filters.priceTo ? 1 : 0) + (filters.inStock ? 1 : 0) + filters.power.length;

  const panel = (
    <FilterPanel
      category={category}
      filters={filters}
      setFilters={setFilters}
      counts={{ total: base.length }}
      onReset={() => setFilters(EMPTY)}
      activeCount={activeCount}
    />
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10 xl:grid-cols-[280px_1fr]">
      {/* Desktop фільтри */}
      <aside aria-label="Фільтри" className="hidden lg:block">
        <div className="sticky top-[100px]">{panel}</div>
      </aside>

      <div className="min-w-0">
        {/* Панель керування */}
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-border pb-4">
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">{list.length}</span> {plural(list.length, ["товар", "товари", "товарів"])}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-white px-3.5 text-sm font-medium lg:hidden"
            >
              <Icon name="filter" size={18} />
              Фільтри
              {activeCount > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-accent text-[11px] font-bold text-white">{activeCount}</span>
              )}
            </button>
            <label className="relative">
              <span className="sr-only">Сортування</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-11 appearance-none rounded-md border border-input-border bg-white pr-9 pl-3.5 text-sm font-medium outline-none focus:border-accent"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" size={16} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-secondary" />
            </label>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-white px-6 py-16 text-center">
            <p className="font-display text-lg font-semibold">За цими фільтрами нічого не знайдено</p>
            <p className="mt-2 text-sm text-text-secondary">Спробуйте змінити умови або скиньте фільтри.</p>
            <Button variant="outline" className="mt-6" onClick={() => setFilters(EMPTY)}>
              Скинути фільтри
            </Button>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
              {list.slice(0, visible).map((p, i) => (
                <li key={p.slug} className="animate-fade-up" style={{ animationDelay: `${(i % PAGE) * 40}ms` }}>
                  <ProductCard product={p} priority={i < 3} className="h-full" />
                </li>
              ))}
            </ul>
            {visible < list.length && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <p className="text-sm text-text-secondary">
                  Показано {Math.min(visible, list.length)} з {list.length}
                </p>
                <Button variant="outline" onClick={() => setVisible((v) => v + PAGE)}>
                  Показати ще
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile: панель фільтрів */}
      <div
        className={cn("fixed inset-0 z-50 transition-[opacity,visibility] duration-200 lg:hidden", drawer ? "visible opacity-100" : "invisible opacity-0")}
        role="dialog"
        aria-modal="true"
        aria-label="Фільтри товарів"
      >
        <button aria-label="Закрити фільтри" className="absolute inset-0 bg-graphite/55" onClick={() => setDrawer(false)} />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col rounded-t-xl bg-white transition-transform duration-300 ease-out",
            drawer ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="font-display text-lg font-bold">Фільтри</span>
            <button onClick={() => setDrawer(false)} aria-label="Закрити" className="grid size-10 place-items-center rounded-md hover:bg-warm-bg">
              <Icon name="close" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">{panel}</div>
          <div className="border-t border-border p-4">
            <Button size="lg" className="w-full" onClick={() => setDrawer(false)}>
              Показати {list.length} {plural(list.length, ["товар", "товари", "товарів"])}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterPanel({
  category,
  filters,
  setFilters,
  onReset,
  activeCount,
}: {
  category?: CategorySlug;
  filters: Filters;
  setFilters: (f: Filters | ((f: Filters) => Filters)) => void;
  counts: { total: number };
  onReset: () => void;
  activeCount: number;
}) {
  const togglePower = (id: string) =>
    setFilters((f) => ({ ...f, power: f.power.includes(id) ? f.power.filter((x) => x !== id) : [...f.power, id] }));

  return (
    <div className="space-y-7">
      <FilterGroup title="Категорія">
        <ul className="space-y-1">
          <li>
            <CatLink href="/catalog" active={!category}>
              Усі товари
            </CatLink>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <CatLink href={`/catalog/${c.slug}`} active={category === c.slug}>
                {c.title}
              </CatLink>
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Ціна, грн">
        <div className="flex items-center gap-2">
          <input
            inputMode="numeric"
            placeholder="від"
            aria-label="Ціна від"
            value={filters.priceFrom}
            onChange={(e) => setFilters((f) => ({ ...f, priceFrom: e.target.value.replace(/\D/g, "") }))}
            className="h-11 w-full min-w-0 rounded-md border border-input-border bg-white px-3 text-sm outline-none focus:border-accent"
          />
          <span className="text-text-secondary">—</span>
          <input
            inputMode="numeric"
            placeholder="до"
            aria-label="Ціна до"
            value={filters.priceTo}
            onChange={(e) => setFilters((f) => ({ ...f, priceTo: e.target.value.replace(/\D/g, "") }))}
            className="h-11 w-full min-w-0 rounded-md border border-input-border bg-white px-3 text-sm outline-none focus:border-accent"
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Наявність">
        <Check checked={filters.inStock} onChange={() => setFilters((f) => ({ ...f, inStock: !f.inStock }))}>
          Лише в наявності
        </Check>
      </FilterGroup>

      <FilterGroup title="Потужність">
        <div className="space-y-2.5">
          {POWER.map((g) => (
            <Check key={g.id} checked={filters.power.includes(g.id)} onChange={() => togglePower(g.id)}>
              {g.label}
            </Check>
          ))}
        </div>
      </FilterGroup>

      {activeCount > 0 && (
        <button type="button" onClick={onReset} className="text-sm font-semibold text-accent hover:underline">
          Скинути фільтри ({activeCount})
        </button>
      )}

      <div className="rounded-lg bg-graphite p-5 text-white">
        <Icon name="consult" size={24} className="text-accent" />
        <p className="mt-3 font-display text-[15px] font-semibold">Не знаєте, що обрати?</p>
        <p className="mt-1 text-[13px] leading-relaxed text-text-secondary-dark">Підкажемо модель під площу та інтер’єр.</p>
        <Link href="/#contacts" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-white">
          Отримати консультацію <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 font-display text-[13px] font-semibold tracking-wide text-text-primary uppercase">{title}</legend>
      {children}
    </fieldset>
  );
}

function CatLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center justify-between rounded-md px-3 py-2 text-[14.5px] transition-colors",
        active ? "bg-white font-semibold text-text-primary shadow-card" : "text-text-primary/75 hover:bg-white hover:text-text-primary",
      )}
    >
      {children}
      {active && <span className="size-1.5 rounded-full bg-accent" />}
    </Link>
  );
}

function Check({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[14.5px] text-text-primary/85 select-none">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={cn(
          "grid size-5 place-items-center rounded-[5px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40",
          checked ? "border-accent bg-accent text-white" : "border-border bg-white",
        )}
      >
        {checked && <Icon name="check" size={13} strokeWidth={2.6} />}
      </span>
      {children}
    </label>
  );
}

function plural(n: number, [one, few, many]: [string, string, string]) {
  const m10 = n % 10,
    m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}
