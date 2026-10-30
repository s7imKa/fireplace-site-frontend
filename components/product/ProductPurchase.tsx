"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/data/products";
import { useCart } from "@/lib/cart";
import { formatPrice, cn } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { QtyControl } from "@/components/layout/CartDrawer";
import { CallbackForm } from "@/components/forms/CallbackForm";

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [install, setInstall] = useState(false);
  const [consult, setConsult] = useState(false);

  useEffect(() => {
    if (!consult) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setConsult(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [consult]);

  return (
    <div>
      <div className="flex items-end gap-3">
        <p className="font-display text-[32px] leading-none font-bold sm:text-4xl">{formatPrice(product.price)}</p>
        {product.oldPrice && <p className="pb-1 text-text-secondary line-through">{formatPrice(product.oldPrice)}</p>}
      </div>

      {/* Опція монтажу */}
      <label
        className={cn(
          "mt-7 flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors",
          install ? "border-accent bg-accent/10" : "border-border bg-white hover:border-text-primary/30",
        )}
      >
        <input type="checkbox" checked={install} onChange={() => setInstall((v) => !v)} className="peer sr-only" />
        <span
          className={cn(
            "mt-0.5 grid size-5 shrink-0 place-items-center rounded-[5px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40",
            install ? "border-accent bg-accent text-white" : "border-border bg-white",
          )}
        >
          {install && <Icon name="check" size={13} strokeWidth={2.6} />}
        </span>
        <span className="flex-1">
          <span className="flex items-center gap-2 font-display text-[15px] font-semibold">
            <Icon name="tools" size={18} className="text-accent" />
            Додати професійний монтаж
          </span>
          <span className="mt-1 block text-[13px] leading-relaxed text-text-secondary">
            Вартість залежить від приміщення та димоходу — менеджер розрахує її після консультації.
          </span>
        </span>
      </label>

      <div className="mt-5 flex gap-3">
        <QtyControl value={qty} onChange={setQty} size="lg" />
        <Button size="lg" className="flex-1" onClick={() => add(product.slug, qty, install || undefined)}>
          <Icon name="cart" size={20} />
          Купити
        </Button>
      </div>
      <Button variant="outline" size="lg" className="mt-3 w-full" onClick={() => setConsult(true)}>
        Проконсультуватися
      </Button>

      {/* Діалог консультації */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Консультація щодо товару"
        className={cn("fixed inset-0 z-50 grid place-items-end transition-[opacity,visibility] duration-200 sm:place-items-center", consult ? "visible opacity-100" : "invisible opacity-0")}
      >
        <button aria-label="Закрити" className="absolute inset-0 bg-graphite/60 backdrop-blur-sm" onClick={() => setConsult(false)} />
        <div
          className={cn(
            "relative max-h-[92svh] w-full overflow-y-auto rounded-t-xl bg-white p-6 shadow-lift transition-transform duration-300 sm:max-w-lg sm:rounded-lg sm:p-8",
            consult ? "translate-y-0" : "translate-y-8",
          )}
        >
          <button onClick={() => setConsult(false)} aria-label="Закрити" className="absolute top-4 right-4 grid size-10 place-items-center rounded-md hover:bg-warm-bg">
            <Icon name="close" />
          </button>
          <p className="eyebrow text-accent">Консультація</p>
          <h2 className="mt-2 pr-10 text-xl font-bold sm:text-2xl">{product.name}</h2>
          <p className="mt-2 mb-6 text-sm text-text-secondary">Залиште ім’я та телефон — спеціаліст передзвонить і відповість на питання щодо моделі та монтажу.</p>
          {consult && <CallbackForm submitLabel="Отримати консультацію" />}
        </div>
      </div>
    </div>
  );
}
