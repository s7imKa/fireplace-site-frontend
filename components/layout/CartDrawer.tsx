"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CallbackForm } from "@/components/forms/CallbackForm";

export function CartDrawer() {
  const cart = useCart();
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    if (!cart.isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cart]);

  return (
    <div
      className={cn("fixed inset-0 z-50 transition-[opacity,visibility] duration-200", cart.isOpen ? "visible opacity-100" : "invisible opacity-0")}
      role="dialog"
      aria-modal="true"
      aria-label="Кошик"
    >
      <button aria-label="Закрити кошик" className="absolute inset-0 bg-graphite/55 backdrop-blur-[2px]" onClick={cart.close} />
      <aside
        className={cn(
          "absolute top-0 right-0 flex h-full w-full max-w-[420px] flex-col bg-white shadow-lift transition-transform duration-300 ease-out",
          cart.isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-display text-lg font-bold">
            Кошик {cart.count > 0 && <span className="text-text-secondary">({cart.count})</span>}
          </h2>
          <button onClick={cart.close} aria-label="Закрити" className="grid size-10 place-items-center rounded-md hover:bg-warm-bg">
            <Icon name="close" />
          </button>
        </div>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-warm-bg text-text-secondary">
              <Icon name="cart" size={28} />
            </span>
            <p className="mt-5 font-display text-lg font-semibold">Кошик порожній</p>
            <p className="mt-2 text-sm text-text-secondary">Оберіть камін, піч чи біокамін у нашому каталозі.</p>
            <ButtonLink href="/catalog" className="mt-6" arrow>
              До каталогу
            </ButtonLink>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {cart.lines.map((l) => (
                <li key={l.slug} className="flex gap-4 py-5">
                  <Link href={`/product/${l.slug}`} onClick={cart.close} className="relative size-20 shrink-0 overflow-hidden rounded-md bg-warm-bg">
                    <Image src={l.product.images[0]} alt="" fill sizes="80px" className="object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${l.slug}`} onClick={cart.close} className="block font-display text-[14.5px] leading-snug font-semibold hover:text-accent">
                      {l.product.name}
                    </Link>
                    {l.withInstallation && (
                      <span className="mt-1 inline-flex items-center gap-1 text-xs text-accent">
                        <Icon name="tools" size={13} /> + консультація щодо монтажу
                      </span>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <QtyControl value={l.qty} onChange={(v) => cart.setQty(l.slug, v)} />
                      <span className="font-display text-[15px] font-bold">{formatPrice(l.product.price * l.qty)}</span>
                    </div>
                  </div>
                  <button onClick={() => cart.remove(l.slug)} aria-label={`Видалити ${l.product.name}`} className="self-start text-text-secondary transition-colors hover:text-text-primary">
                    <Icon name="trash" size={18} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-border px-6 py-5">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-text-secondary">Разом</span>
                <span className="font-display text-2xl font-bold">{formatPrice(cart.total)}</span>
              </div>
              {/* Поки бекенд не приймає замовлення, оформлення йде через заявку на дзвінок */}
              {checkout ? (
                <div>
                  <p className="mb-4 text-sm text-text-secondary">
                    Залиште контакти — менеджер передзвонить, уточнить замовлення та доставку.
                  </p>
                  <CallbackForm submitLabel="Оформити замовлення" />
                </div>
              ) : (
                <Button size="lg" className="w-full" arrow onClick={() => setCheckout(true)}>
                  Оформити замовлення
                </Button>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function QtyControl({ value, onChange, size = "sm" }: { value: number; onChange: (v: number) => void; size?: "sm" | "lg" }) {
  const h = size === "lg" ? "h-[52px]" : "h-9";
  const w = size === "lg" ? "w-11" : "w-8";
  return (
    <div className={cn("inline-flex items-center rounded-md border border-border bg-white", h)}>
      <button type="button" aria-label="Зменшити кількість" onClick={() => onChange(Math.max(1, value - 1))} className={cn("grid h-full place-items-center text-text-secondary hover:text-text-primary", w)}>
        <Icon name="minus" size={16} />
      </button>
      <span className="min-w-7 text-center text-sm font-semibold tabular-nums" aria-live="polite">{value}</span>
      <button type="button" aria-label="Збільшити кількість" onClick={() => onChange(value + 1)} className={cn("grid h-full place-items-center text-text-secondary hover:text-text-primary", w)}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
