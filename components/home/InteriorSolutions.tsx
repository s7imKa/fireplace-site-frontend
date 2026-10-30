"use client";

import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/format";

const slides = [
  {
    image: "/images/interior-living.jpg",
    eyebrow: "Для вашого комфорту",
    title: "Стильні рішення для будь-якого інтер’єру",
    text: "Від класики до сучасного мінімалізму — допоможемо підібрати камін, який доповнить ваш дім, а не сперечатиметься з ним.",
    href: "/catalog/kaminy",
    cta: "Перейти до каталогу",
  },
  {
    image: "/images/about-interior.jpg",
    eyebrow: "Вбудовані рішення",
    title: "Камінна топка в кам’яному порталі",
    text: "Топка, облицювання та дровник складаються в одну архітектурну композицію. Підкажемо, як поєднати їх у вашому просторі.",
    href: "/catalog/topky",
    cta: "Обрати топку",
  },
  {
    image: "/images/interior-wood.jpg",
    eyebrow: "Тепло для будинку",
    title: "Печі, що стають центром кімнати",
    text: "Окремо стоячі печі з видимим полум’ям — для будинку, дачі чи студії.",
    href: "/catalog/pechi",
    cta: "Дивитися печі",
  },
];

export function InteriorSolutions() {
  const [i, setI] = useState(0);
  const s = slides[i];
  const next = slides[(i + 1) % slides.length];
  const go = (d: number) => setI((v) => (v + d + slides.length) % slides.length);

  return (
    <section aria-roledescription="карусель" aria-label="Рішення для інтер’єру" className="section-y bg-warm-bg">
      <div className="container-x">
        <div className="grid items-center gap-8 rounded-lg bg-white p-3 shadow-card sm:p-4 lg:grid-cols-[1.15fr_1fr_0.42fr] lg:gap-12 lg:p-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md lg:aspect-[5/4.2]">
            {slides.map((sl, idx) => (
              <Image
                key={sl.image}
                src={sl.image}
                alt={sl.title}
                fill
                sizes="(min-width:1024px) 45vw, 100vw"
                className={cn("object-cover transition-opacity duration-700", idx === i ? "opacity-100" : "opacity-0")}
              />
            ))}
          </div>

          <div className="px-2 pb-4 sm:px-4 lg:px-0 lg:py-8" aria-live="polite">
            <p className="eyebrow text-text-secondary">{s.eyebrow}</p>
            <h2 className="mt-3 text-[26px] leading-[1.18] font-bold sm:text-[32px]">{s.title}</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-secondary">{s.text}</p>
            <div className="mt-8 flex items-center justify-between gap-4">
              <ButtonLink href={s.href} variant="outline" arrow>
                {s.cta}
              </ButtonLink>
              <div className="flex items-center gap-1 lg:hidden">
                <Ctrl dir="prev" onClick={() => go(-1)} />
                <Ctrl dir="next" onClick={() => go(1)} />
              </div>
            </div>
          </div>

          <div className="hidden h-full flex-col justify-between py-2 lg:flex">
            <div className="flex items-center justify-end gap-3 font-display text-sm text-text-secondary tabular-nums">
              <span>
                <span className="font-semibold text-text-primary">{i + 1}</span> / {slides.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Наступний слайд"
              className="group relative mt-6 block aspect-[3/3.8] w-full overflow-hidden rounded-md"
            >
              <Image src={next.image} alt="" fill sizes="200px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/5" />
            </button>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Слайд ${idx + 1}`}
                    aria-current={idx === i}
                    onClick={() => setI(idx)}
                    className={cn("h-1.5 rounded-full transition-all", idx === i ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-text-secondary/50")}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                <Ctrl dir="prev" onClick={() => go(-1)} />
                <Ctrl dir="next" onClick={() => go(1)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ctrl({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Попередній слайд" : "Наступний слайд"}
      className="grid size-10 place-items-center rounded-md border border-border text-text-primary transition-colors hover:border-text-primary hover:bg-text-primary hover:text-white"
    >
      <Icon name={dir === "prev" ? "arrowLeft" : "arrowRight"} size={18} />
    </button>
  );
}
