import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import { Icon } from "./Icon";

export function SectionHeading({
  eyebrow,
  title,
  text,
  dark,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  dark?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <p className={cn("eyebrow mb-3", dark ? "text-accent" : "text-accent")}>{eyebrow}</p>}
      <Tag
        className={cn(
          "text-[26px] leading-[1.18] font-bold sm:text-[32px] lg:text-[38px]",
          dark ? "text-white" : "text-text-primary",
        )}
      >
        {title}
      </Tag>
      {text && <p className={cn("mt-4 text-[15px] leading-relaxed sm:text-base", dark ? "text-white/65" : "text-text-secondary")}>{text}</p>}
    </div>
  );
}

export function StockStatus({ inStock, className }: { inStock?: boolean; className?: string }) {
  if (inStock === undefined)
    return <span className={cn("text-[13px] text-text-secondary", className)}>Наявність уточнюйте</span>;
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[13px] font-medium", inStock ? "text-success" : "text-text-secondary", className)}>
      <span className={cn("size-1.5 rounded-full", inStock ? "bg-success" : "bg-text-secondary/60")} />
      {inStock ? "В наявності" : "Під замовлення"}
    </span>
  );
}

export function Breadcrumbs({ items, dark }: { items: { label: string; href?: string }[]; dark?: boolean }) {
  return (
    <nav aria-label="Навігаційний ланцюжок" className="text-[13px]">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {it.href ? (
              <Link href={it.href} className={cn("transition-colors", dark ? "text-text-secondary-dark hover:text-white" : "text-text-secondary hover:text-text-primary")}>
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-white" : "text-text-primary"}>
                {it.label}
              </span>
            )}
            {i < items.length - 1 && <Icon name="chevronRight" size={14} className={dark ? "text-white/30" : "text-text-secondary/50"} />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CheckItem({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-white">
        <Icon name="check" size={13} strokeWidth={2.4} />
      </span>
      <span className={cn("text-[15px] leading-snug", dark ? "text-white/85" : "text-text-primary")}>{children}</span>
    </li>
  );
}
