import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/format";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "outline" | "outlineLight" | "ghostLight";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-display font-semibold tracking-[0.01em] whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white shadow-[0_8px_20px_-10px_rgb(245_107_0/0.7)] hover:bg-accent-hover",
  secondary: "bg-graphite text-white hover:bg-black",
  outline: "border border-text-primary/80 text-text-primary hover:bg-text-primary hover:text-white",
  outlineLight: "border border-white/40 text-white hover:border-white hover:bg-white hover:text-graphite",
  ghostLight: "text-white/85 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-7 text-[15px]",
};

interface Common {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

export function buttonClass({ variant = "primary", size = "md", className }: Omit<Common, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ButtonLink({ href, arrow, children, ...rest }: Common & { href: string }) {
  return (
    <Link href={href} className={cn(buttonClass(rest), "group")}>
      {children}
      {arrow && <Icon name="arrowRight" size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </Link>
  );
}

export function Button({
  arrow,
  children,
  variant,
  size,
  className,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(buttonClass({ variant, size, className }), "group")} {...rest}>
      {children}
      {arrow && <Icon name="arrowRight" size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </button>
  );
}

/** Текстове посилання зі стрілкою — «Всі категорії →» */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 font-display text-sm font-semibold text-text-primary transition-colors hover:text-accent",
        className,
      )}
    >
      {children}
      <Icon name="arrowRight" size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}
