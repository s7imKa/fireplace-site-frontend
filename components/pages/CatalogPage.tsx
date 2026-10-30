import Image from "next/image";
import Link from "next/link";
import { categories, getCategory, type CategorySlug } from "@/lib/data/categories";
import { cn } from "@/lib/format";
import { Breadcrumbs } from "@/components/ui/Primitives";
import { CatalogView } from "@/components/catalog/CatalogView";

export function CatalogPage({ category }: { category?: string }) {
  const cat = category ? getCategory(category) : undefined;
  const title = cat?.title ?? "Каталог";
  const description =
    cat?.description ??
    "Каміни, печі, камінні топки та біокаміни для дому, дачі й комерційних просторів. Оберіть категорію або скористайтеся фільтрами.";

  return (
    <>
      {/* Шапка категорії — світла */}
      <section className="border-b border-border bg-white">
        <div className="container-x grid items-end gap-8 pt-8 pb-8 lg:grid-cols-[1fr_auto] lg:pt-12 lg:pb-10">
          <div>
            <Breadcrumbs
              items={[
                { label: "Головна", href: "/" },
                ...(cat ? [{ label: "Каталог", href: "/catalog" }, { label: cat.title }] : [{ label: "Каталог" }]),
              ]}
            />
            <h1 className="mt-5 text-[32px] leading-tight font-bold sm:text-[44px]">{title}</h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-secondary">{description}</p>
          </div>
          {cat && (
            <div className="relative hidden aspect-[16/10] w-[300px] overflow-hidden rounded-lg lg:block">
              <Image src={cat.image} alt={cat.title} fill sizes="300px" className="object-cover" />
            </div>
          )}
        </div>

        {/* Швидкий перехід між категоріями */}
        <div className="container-x">
          <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-5 sm:mx-0 sm:px-0">
            {[{ slug: undefined, title: "Усі" }, ...categories].map((c) => {
              const active = c.slug === (cat?.slug as CategorySlug | undefined);
              return (
                <li key={c.title} className="shrink-0">
                  <Link
                    href={c.slug ? `/catalog/${c.slug}` : "/catalog"}
                    className={cn(
                      "inline-flex h-9 items-center rounded-md border px-4 text-sm font-medium transition-colors",
                      active ? "border-text-primary bg-text-primary text-white" : "border-border bg-white text-text-primary/80 hover:border-text-primary hover:text-text-primary",
                    )}
                  >
                    {c.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-warm-bg py-8 lg:py-12">
        <div className="container-x">
          <CatalogView key={cat?.slug ?? "all"} category={cat?.slug} />
        </div>
      </section>
    </>
  );
}
