import Link from "next/link";
import { cn } from "@/lib/format";

export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="FireHome — на головну" className={cn("group inline-flex items-center gap-2", className)}>
      <svg width="22" height="26" viewBox="0 0 22 26" aria-hidden="true" className="shrink-0">
        <path
          d="M11 25.5C5.2 25.5 1.5 21.8 1.5 16.6c0-3.9 2.3-6.6 4.6-9.2.5 2.4 1.7 4.1 3.4 4.9-.4-4.5 1.4-8.8 5.2-11.8-.3 3.7 1.1 6.3 3.3 8.8 1.7 2 2.7 4.3 2.7 7 0 5.5-4 9.2-9.7 9.2Z"
          fill="#F56B00"
        />
        <path
          d="M11 25.5c-2.5 0-4-1.5-4-3.6 0-2 1.4-3.4 2.9-4.8.4 1.4 1.3 2.3 2.4 2.6 1.3.4 2.6 1.6 2.6 3.1 0 1.6-1.6 2.7-3.9 2.7Z"
          fill="#FFB067"
        />
      </svg>
      <span className={cn("font-display text-[19px] font-bold tracking-tight", light ? "text-white" : "text-text-primary")}>
        Fire<span className="text-accent">Home</span>
      </span>
    </Link>
  );
}
