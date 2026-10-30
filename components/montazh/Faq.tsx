"use client";

import { useState } from "react";
import { cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { faqItems } from "@/lib/data/content";



export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-border border-y border-border">
      {faqItems.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-[16px] font-semibold text-text-primary transition-colors hover:text-accent sm:text-lg"
              >
                {item.q}
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-md border transition-[background-color,border-color] duration-300",
                    isOpen ? "border-accent bg-accent text-white" : "border-border bg-white",
                  )}
                >
                  <Icon name="plus" size={18} className={cn("transition-transform duration-300", isOpen && "rotate-45")} />
                </span>
              </button>
            </h3>
            <div
              id={`faq-${i}`}
              className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-text-secondary">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
