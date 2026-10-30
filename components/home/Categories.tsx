import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Primitives";

export function Categories() {
  return (
    <section aria-labelledby="cats-title" className="section-y bg-warm-bg">
      <div className="container-x">
        <div className="mb-9 flex items-end justify-between gap-6 lg:mb-12">
          <SectionHeading eyebrow="Каталог" title={<span id="cats-title">Популярні категорії</span>} />
          <div className="hidden shrink-0 sm:block">
            <ArrowLink href="/catalog">Всі категорії</ArrowLink>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {categories.map((c) => {
            const prices = products.filter((p) => p.category === c.slug).map((p) => p.price);
            const min = prices.length ? Math.min(...prices) : null;
            return (
              <li key={c.slug}>
                <Link href={`/catalog/${c.slug}`} className="group block">
                  <div className="relative aspect-[4/4.4] overflow-hidden rounded-lg bg-graphite sm:aspect-[4/4.2]">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(min-width:1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute right-3 bottom-3 grid size-10 translate-y-2 place-items-center rounded-md bg-white text-text-primary opacity-0 shadow-card transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Icon name="arrowRight" size={18} />
                    </span>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-base font-semibold transition-colors group-hover:text-accent sm:text-lg">{c.title}</h3>
                      {min !== null && <p className="mt-0.5 text-[13px] text-text-secondary">від {formatPrice(min)}</p>}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 sm:hidden">
          <ArrowLink href="/catalog">Всі категорії</ArrowLink>
        </div>
      </div>
    </section>
  );
}
