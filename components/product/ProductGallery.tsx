"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = (i: number) => {
    const idx = (i + images.length) % images.length;
    setActive(idx);
    const el = trackRef.current;
    if (el) el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active) setActive(idx);
  };

  return (
    <div className="flex flex-col-reverse gap-3 self-start lg:sticky lg:top-[100px] lg:flex-row lg:items-start lg:gap-4">
      {images.length > 1 && (
        <ul className="no-scrollbar flex gap-2.5 overflow-x-auto lg:w-[84px] lg:shrink-0 lg:flex-col lg:overflow-visible" aria-label="Мініатюри">
          {images.map((src, i) => (
            <li key={src + i} className="shrink-0">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Фото ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "relative block size-[68px] overflow-hidden rounded-md border-2 bg-white transition-colors lg:size-[84px]",
                  i === active ? "border-accent" : "border-transparent opacity-75 hover:opacity-100",
                )}
              >
                <Image src={src} alt="" fill sizes="84px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="relative min-w-0 flex-1 overflow-hidden rounded-lg bg-white">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar flex aspect-square snap-x snap-mandatory overflow-x-auto sm:aspect-[5/4.4]"
        >
          {images.map((src, i) => (
            <div key={src + i} className="relative h-full w-full shrink-0 snap-center">
              <Image
                src={src}
                alt={i === 0 ? name : `${name} — фото ${i + 1}`}
                fill
                loading={i === 0 ? "eager" : "lazy"}
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/35 px-2.5 py-1.5 backdrop-blur sm:hidden">
              {images.map((_, i) => (
                <span key={i} className={cn("size-1.5 rounded-full", i === active ? "bg-white" : "bg-white/45")} />
              ))}
            </div>
            <div className="absolute right-4 bottom-4 hidden gap-1.5 sm:flex">
              {(["arrowLeft", "arrowRight"] as const).map((n, k) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => goTo(active + (k ? 1 : -1))}
                  aria-label={k ? "Наступне фото" : "Попереднє фото"}
                  className="grid size-10 place-items-center rounded-md bg-white/90 text-text-primary shadow-card backdrop-blur transition-colors hover:bg-white"
                >
                  <Icon name={n} size={18} />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
