import Image from "next/image";
import { getCategory } from "@/lib/data/categories";
import { getProduct, getSimilarProducts } from "@/lib/data/products";
import { Breadcrumbs, StockStatus } from "@/components/ui/Primitives";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductPage({ slug }: { slug: string }) {
  const product = getProduct(slug);
  if (!product) return <NotFoundBlock />;
  const cat = getCategory(product.category)!;
  const similar = getSimilarProducts(product);

  const trust: { icon: IconName; title: string; text: string }[] = [
    { icon: "truck", title: "Доставка", text: "по всій Україні" },
    { icon: "shield", title: "Гарантія", text: product.warrantyMonths ? `${product.warrantyMonths} міс. від виробника` : "умови уточнюйте" },
    { icon: "tools", title: "Монтаж", text: "професійне встановлення" },
  ];

  return (
    <>
      <section className="bg-warm-bg pt-6 pb-12 lg:pt-10 lg:pb-16">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "Головна", href: "/" },
              { label: "Каталог", href: "/catalog" },
              { label: cat.title, href: `/catalog/${cat.slug}` },
              { label: product.name },
            ]}
          />

          <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-[1.12fr_1fr] lg:gap-14">
            <ProductGallery images={product.images} name={product.name} />

            <div className="lg:py-2">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="eyebrow text-text-secondary">{cat.short}</span>
                {product.badge && <span className="rounded-md bg-warm-beige px-2 py-0.5 text-[11.5px] font-semibold">{product.badge}</span>}
              </div>
              <h1 className="mt-3 text-[28px] leading-tight font-bold sm:text-[36px]">{product.name}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <StockStatus inStock={product.inStock} />
                <span className="text-text-secondary">
                  Виробник: <span className="text-text-primary">{product.manufacturer ?? "уточнюйте у менеджера"}</span>
                </span>
              </div>

              <ul className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
                {product.specs.slice(0, 4).map((s) => (
                  <li key={s.label} className="bg-white px-4 py-3">
                    <span className="block text-xs text-text-secondary">{s.label}</span>
                    <span className="font-display text-[15px] font-semibold">{s.value}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <ProductPurchase product={product} />
              </div>

              <ul className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6">
                {trust.map((t) => (
                  <li key={t.title} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <Icon name={t.icon} size={22} className="shrink-0 text-text-primary/70" />
                    <span className="text-[12.5px] leading-tight">
                      <span className="block font-semibold">{t.title}</span>
                      <span className="text-text-secondary">{t.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-bg pb-6">
        <div className="container-x">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* Темний блок монтажу — зв’язок магазину з сервісом */}
      <section className="bg-warm-bg pb-16 lg:pb-20">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-lg bg-graphite text-white">
            <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
              <Image src="/images/montage-master.jpg" alt="" fill sizes="50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/40 to-transparent" />
            </div>
            <div className="relative max-w-xl p-7 sm:p-10 lg:p-12">
              <p className="eyebrow text-accent">Монтаж під ключ</p>
              <h2 className="mt-3 text-2xl leading-tight font-bold sm:text-3xl">Встановимо {cat.short.toLowerCase()} з дотриманням вимог безпеки</h2>
              <p className="mt-3 text-[15px] text-white/65">Виїзд на об’єкт, підбір димоходу, монтаж і перший розпал — однією командою.</p>
              <ButtonLink href="/montazh#order" className="mt-7" arrow>
                Замовити монтаж
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="similar-title" className="border-t border-border bg-white py-14 lg:py-20">
        <div className="container-x">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="similar-title" className="text-2xl font-bold sm:text-[30px]">
              Схожі товари
            </h2>
            <div className="hidden sm:block">
              <ArrowLink href={`/catalog/${cat.slug}`}>Усі {cat.title.toLowerCase()}</ArrowLink>
            </div>
          </div>
          <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:px-0 lg:grid-cols-4 lg:gap-6">
            {similar.map((p) => (
              <li key={p.slug} className="w-[74%] shrink-0 snap-start sm:w-[46%] md:w-auto">
                <ProductCard product={p} className="h-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function NotFoundBlock() {
  return (
    <section className="container-x py-24 text-center">
      <h1 className="text-3xl font-bold">Товар не знайдено</h1>
      <p className="mt-3 text-text-secondary">Можливо, його вже немає в каталозі.</p>
      <ButtonLink href="/catalog" className="mt-8" arrow>
        До каталогу
      </ButtonLink>
    </section>
  );
}
