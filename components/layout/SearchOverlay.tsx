"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { formatPrice, cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products.filter((p) => p.name.toLowerCase().includes(term)).slice(0, 6);
  }, [q]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Пошук товарів"
      className={cn("fixed inset-0 z-50 transition-[opacity,visibility] duration-200", open ? "visible opacity-100" : "invisible opacity-0")}
    >
      <button aria-label="Закрити пошук" className="absolute inset-0 bg-graphite/60 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative bg-white shadow-lift transition-transform duration-300", open ? "translate-y-0" : "-translate-y-6")}>
        <div className="container-x py-5 lg:py-8">
          <div className="flex items-center gap-3 border-b-2 border-text-primary pb-3">
            <Icon name="search" size={24} className="text-text-secondary" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Пошук: камін, піч, біокамін…"
              aria-label="Пошуковий запит"
              className="min-w-0 flex-1 bg-transparent font-display text-lg font-medium outline-none placeholder:text-text-secondary/60 sm:text-2xl"
            />
            <button onClick={onClose} aria-label="Закрити" className="grid size-10 place-items-center rounded-md hover:bg-warm-bg">
              <Icon name="close" />
            </button>
          </div>

          {q.trim() === "" ? (
            <div className="flex flex-wrap gap-2 pt-5">
              <span className="mr-1 self-center text-sm text-text-secondary">Категорії:</span>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/catalog/${c.slug}`}
                  onClick={onClose}
                  className="rounded-md border border-border px-3.5 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          ) : results.length ? (
            <ul className="grid gap-2 pt-4 sm:grid-cols-2">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/product/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-warm-bg"
                  >
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-md bg-warm-bg">
                      <Image src={p.images[0]} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                    <span>
                      <span className="block font-display text-[15px] font-semibold">{p.name}</span>
                      <span className="text-sm text-text-secondary">{formatPrice(p.price)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="pt-5 text-text-secondary">Нічого не знайдено. Спробуйте інший запит або перегляньте каталог.</p>
          )}
        </div>
      </div>
    </div>
  );
}
