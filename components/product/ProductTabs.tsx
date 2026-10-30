"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

export function ProductTabs({ product }: { product: Product }) {
  const tabs = [
    { id: "desc", label: "Опис" },
    { id: "specs", label: "Характеристики" },
    { id: "package", label: "Комплектація" },
    { id: "delivery", label: "Доставка та оплата" },
    { id: "warranty", label: "Гарантія" },
  ] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("desc");

  return (
    <div>
      <div role="tablist" aria-label="Інформація про товар" className="no-scrollbar -mx-4 flex gap-6 overflow-x-auto border-b border-border px-4 sm:mx-0 sm:gap-9 sm:px-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={cn(
              "relative shrink-0 py-4 font-display text-[14.5px] font-semibold transition-colors",
              tab === t.id ? "text-text-primary after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-accent" : "text-text-secondary hover:text-text-primary",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="max-w-3xl py-8 text-[15px] leading-relaxed text-text-primary/85">
        {tab === "desc" && <p>{product.description}</p>}

        {tab === "specs" && (
          <dl className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-white">
            {product.specs.map((s) => (
              <div key={s.label} className="grid grid-cols-2 gap-4 px-5 py-3.5 text-sm">
                <dt className="text-text-secondary">{s.label}</dt>
                <dd className="font-medium">{s.value}</dd>
              </div>
            ))}
            {product.manufacturer && (
              <div className="grid grid-cols-2 gap-4 px-5 py-3.5 text-sm">
                <dt className="text-text-secondary">Виробник</dt>
                <dd className="font-medium">{product.manufacturer}</dd>
              </div>
            )}
          </dl>
        )}

        {tab === "package" &&
          (product.package?.length ? (
            <ul className="space-y-2.5">
              {product.package.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <Icon name="check" size={18} className="text-accent" />
                  {p}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-text-secondary">Комплектацію цієї моделі уточнюйте у менеджера — вона може залежати від постачання.</p>
          ))}

        {tab === "delivery" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard icon="truck" title="Доставка">
              Доставляємо по Україні службами доставки. Вартість і терміни розраховує менеджер під час підтвердження замовлення.
            </InfoCard>
            <InfoCard icon="card" title="Оплата">
              Спосіб оплати узгоджуємо з вами при оформленні замовлення.
            </InfoCard>
          </div>
        )}

        {tab === "warranty" && (
          <div className="space-y-4">
            <p>
              {product.warrantyMonths
                ? `Гарантія виробника — ${product.warrantyMonths} міс. Умови гарантійного обслуговування надаються разом із товаром.`
                : "Умови гарантії на цю модель уточнюйте у менеджера."}
            </p>
            <p className="text-text-secondary">
              Правильний монтаж — важлива умова довговічної роботи каміна.{" "}
              <Link href="/montazh" className="font-semibold text-accent hover:underline">
                Дізнайтеся про наш монтаж
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({ icon, title, children }: { icon: "truck" | "card"; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-white p-5">
      <Icon name={icon} size={24} className="text-accent" />
      <p className="mt-3 font-display font-semibold text-text-primary">{title}</p>
      <p className="mt-1 text-sm text-text-secondary">{children}</p>
    </div>
  );
}
