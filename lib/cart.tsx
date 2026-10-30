"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { getProduct, type Product } from "./data/products";

interface CartLine {
  slug: string;
  qty: number;
  withInstallation?: boolean;
}

/* --- Зовнішнє сховище кошика (localStorage + підписники) --- */
const KEY = "firehome-cart";
const EMPTY: CartLine[] = [];
let lines: CartLine[] | null = null;
const listeners = new Set<() => void>();

function read(): CartLine[] {
  if (lines) return lines;
  try {
    const raw = localStorage.getItem(KEY);
    lines = raw ? (JSON.parse(raw) as CartLine[]) : EMPTY;
  } catch {
    lines = EMPTY;
  }
  return lines;
}

function write(next: CartLine[]) {
  lines = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* сховище недоступне — працюємо в пам’яті */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      lines = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const cartActions = {
  add(slug: string, qty = 1, withInstallation?: boolean) {
    const cur = read();
    const found = cur.find((l) => l.slug === slug);
    write(
      found
        ? cur.map((l) =>
            l.slug === slug ? { ...l, qty: l.qty + qty, withInstallation: withInstallation ?? l.withInstallation } : l,
          )
        : [...cur, { slug, qty, withInstallation }],
    );
  },
  setQty(slug: string, qty: number) {
    write(read().map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, qty) } : l)));
  },
  remove(slug: string) {
    write(read().filter((l) => l.slug !== slug));
  },
};

/* --- Контекст --- */
interface CartCtx {
  lines: (CartLine & { product: Product })[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, qty?: number, withInstallation?: boolean) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, read, () => EMPTY);
  const [isOpen, setOpen] = useState(false);

  const value = useMemo<CartCtx>(() => {
    const withProducts = raw.flatMap((l) => {
      const product = getProduct(l.slug);
      return product ? [{ ...l, product }] : [];
    });
    return {
      lines: withProducts,
      count: withProducts.reduce((a, l) => a + l.qty, 0),
      total: withProducts.reduce((a, l) => a + l.qty * l.product.price, 0),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add: (slug, qty, withInstallation) => {
        cartActions.add(slug, qty, withInstallation);
        setOpen(true);
      },
      setQty: cartActions.setQty,
      remove: cartActions.remove,
    };
  }, [raw, isOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
