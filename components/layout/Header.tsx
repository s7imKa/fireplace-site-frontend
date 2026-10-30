"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { mainNav, site } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { SearchOverlay } from "./SearchOverlay";
import { CartDrawer } from "./CartDrawer";

/** Сторінки з темним Hero під прозорим хедером */
const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};
const useScrolled = () =>
  useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 24,
    () => false,
  );

const OVERLAY_ROUTES = ["/", "/montazh"];

export function Header() {
  const pathname = usePathname() ?? "/";
  const overlay = OVERLAY_ROUTES.includes(pathname);
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cart = useCart();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Прозорий хедер лише над Hero, доки не прокрутили
  const transparent = overlay && !scrolled && !menuOpen;
  const light = transparent; // світлий текст

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300",
          transparent
            ? "border-b border-white/10 bg-gradient-to-b from-black/40 to-transparent"
            : overlay
              ? "border-b border-white/5 bg-graphite/95 shadow-[0_6px_24px_-12px_rgb(0_0_0/0.5)] backdrop-blur-md"
              : "border-b border-border bg-white/95 backdrop-blur-md",
        )}
      >
        <div className="container-x flex h-16 items-center gap-6 lg:h-[76px]">
          <Logo light={light || overlay} />

          <nav aria-label="Головна навігація" className="ml-6 hidden lg:block xl:ml-10">
            <ul className="flex items-center gap-7 xl:gap-8">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative py-2 font-display text-[13.5px] font-medium transition-colors",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100",
                      overlay ? "text-white/80 hover:text-white" : "text-text-primary/75 hover:text-text-primary",
                      isActive(item.href) && (overlay ? "text-white after:scale-x-100" : "text-text-primary after:scale-x-100"),
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <a
              href={site.phoneHref}
              className={cn(
                "mr-3 hidden font-display text-[13.5px] font-semibold xl:block",
                overlay ? "text-white" : "text-text-primary",
              )}
            >
              {site.phone}
            </a>
            <IconBtn label="Пошук" dark={!overlay} onClick={() => setSearchOpen(true)}>
              <Icon name="search" size={21} />
            </IconBtn>
            <IconBtn label={`Кошик, товарів: ${cart.count}`} dark={!overlay} onClick={cart.open}>
              <Icon name="cart" size={22} />
              {cart.count > 0 && (
                <span className="absolute top-1 right-0.5 grid min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[10.5px] leading-[18px] font-bold text-white">
                  {cart.count}
                </span>
              )}
            </IconBtn>
            <div className="ml-2 hidden md:block">
              <ButtonLink href="/montazh#order" size="sm">
                Замовити монтаж
              </ButtonLink>
            </div>
            <IconBtn
              label={menuOpen ? "Закрити меню" : "Відкрити меню"}
              dark={!overlay}
              className="lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Icon name={menuOpen ? "close" : "menu"} size={23} />
            </IconBtn>
          </div>
        </div>
      </header>

      {/* Мобільне меню (поза header: backdrop-filter ламає position: fixed) */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-graphite transition-[opacity,visibility] duration-300 lg:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="container-x flex min-h-full flex-col py-8">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {mainNav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-xl font-semibold text-white"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {item.label}
                  <Icon name="chevronRight" size={20} className="text-text-secondary-dark" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-3">
            <ButtonLink href="/catalog" size="lg" className="w-full" arrow>
              Перейти до каталогу
            </ButtonLink>
            <ButtonLink href="/montazh#order" variant="outlineLight" size="lg" className="w-full">
              Замовити монтаж
            </ButtonLink>
          </div>
          <div className="mt-auto space-y-2 pt-10 text-sm text-text-secondary-dark">
            <a href={site.phoneHref} className="block font-display text-lg font-semibold text-white">
              {site.phone}
            </a>
            <p>{site.hours}</p>
            <p>{site.email}</p>
          </div>
        </div>
      </div>

      {/* Відступ під фіксований хедер для сторінок без Hero */}
      {!overlay && <div aria-hidden="true" className="h-16 lg:h-[76px]" />}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  );
}

function IconBtn({
  children,
  label,
  dark,
  className,
  ...rest
}: { label: string; dark?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "relative grid size-10 place-items-center rounded-md transition-colors",
        dark ? "text-text-primary hover:bg-warm-bg" : "text-white hover:bg-white/10",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
