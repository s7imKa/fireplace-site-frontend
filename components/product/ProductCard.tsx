"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/data/products";
import { useCart } from "@/lib/cart";
import { formatPrice, cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { StockStatus } from "@/components/ui/Primitives";

export function ProductCard({ product, priority, className }: { product: Product; priority?: boolean; className?: string }) {
  const { add } = useCart();
  const href = `/product/${product.slug}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-white transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lift",
        className,
      )}
    >
      <Link href={href} className="relative block aspect-[4/3.4] overflow-hidden bg-warm-bg" aria-label={product.name} tabIndex={-1}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          loading={priority ? "eager" : "lazy"}
          sizes="(min-width:1280px) 300px, (min-width:768px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {(product.badge || product.oldPrice) && (
          <span className="absolute top-3 left-3 rounded-md bg-white/95 px-2.5 py-1 font-display text-[11px] font-semibold text-text-primary shadow-sm">
            {product.oldPrice ? `−${Math.round((1 - product.price / product.oldPrice) * 100)}%` : product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <StockStatus inStock={product.inStock} className="mb-2 text-[12px]" />
        <h3 className="font-display text-[15px] leading-snug font-semibold sm:text-base">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] hover:text-accent">
            {product.name}
          </Link>
        </h3>

        <dl className="mt-3 hidden space-y-1 text-[13px] sm:block">
          {product.specs.slice(0, 3).map((s) => (
            <div key={s.label} className="flex justify-between gap-3">
              <dt className="text-text-secondary">{s.label}</dt>
              <dd className="text-right text-text-primary/85">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            {product.oldPrice && <p className="text-xs text-text-secondary line-through">{formatPrice(product.oldPrice)}</p>}
            <p className="font-display text-[17px] font-bold sm:text-lg">{formatPrice(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => add(product.slug)}
            aria-label={`Додати ${product.name} до кошика`}
            className="relative z-10 grid size-10 shrink-0 place-items-center rounded-md bg-accent text-white transition-colors hover:bg-accent-hover sm:size-11"
          >
            <Icon name="cart" size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
