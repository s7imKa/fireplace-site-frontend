import { getPopularProducts } from "@/lib/data/products";
import { ArrowLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Primitives";
import { ProductCard } from "@/components/product/ProductCard";

export function PopularProducts() {
  const items = getPopularProducts();
  return (
    <section aria-labelledby="popular-title" className="section-y border-t border-border bg-white">
      <div className="container-x">
        <div className="mb-9 flex items-end justify-between gap-6 lg:mb-12">
          <SectionHeading
            eyebrow="Обирають найчастіше"
            title={<span id="popular-title">Популярні товари</span>}
          />
          <div className="hidden shrink-0 sm:block">
            <ArrowLink href="/catalog">Весь каталог</ArrowLink>
          </div>
        </div>

        {/* Mobile: горизонтальна стрічка; md+: сітка */}
        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-4 lg:gap-6">
          {items.map((p) => (
            <li key={p.slug} className="w-[74%] shrink-0 snap-start sm:w-[46%] md:w-auto">
              <ProductCard product={p} className="h-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
