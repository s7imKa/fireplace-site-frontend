import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { mainNav, site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-graphite text-white/70">
      {/* Смуга-заклик до монтажу */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col items-start justify-between gap-5 py-9 md:flex-row md:items-center">
          <p className="max-w-xl font-display text-xl leading-snug font-semibold text-white sm:text-2xl">
            Підберемо камін і змонтуємо його <span className="text-accent">під ключ</span>
          </p>
          <Link
            href="/montazh#order"
            className="group inline-flex h-12 items-center gap-2 rounded-md bg-accent px-6 font-display text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Замовити монтаж
            <Icon name="arrowRight" size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Продаж камінів, печей, камінних топок і біокамінів. Професійний монтаж та димохідні системи.
          </p>
          {site.socials.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="text-sm hover:text-white" target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <FooterCol title="Каталог">
          {categories.map((c) => (
            <FooterLink key={c.slug} href={`/catalog/${c.slug}`}>
              {c.title}
            </FooterLink>
          ))}
          <FooterLink href="/catalog">Усі товари</FooterLink>
        </FooterCol>

        <FooterCol title="Компанія">
          {mainNav
            .filter((n) => n.href !== "/catalog")
            .map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
        </FooterCol>

        <FooterCol title="Контакти">
          <li>
            <a href={site.phoneHref} className="flex items-center gap-2.5 font-display font-semibold text-white hover:text-accent">
              <Icon name="phone" size={17} className="text-accent" />
              {site.phone}
            </a>
          </li>
          <li className="flex items-center gap-2.5 text-sm">
            <Icon name="mail" size={17} className="text-accent" />
            <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
          </li>
          <li className="flex items-start gap-2.5 text-sm">
            <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-accent" />
            {site.address}
          </li>
          <li className="flex items-center gap-2.5 text-sm">
            <Icon name="clock" size={17} className="text-accent" />
            {site.hours}
          </li>
        </FooterCol>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-text-secondary-dark sm:flex-row sm:justify-between">
          <p>© {year} FireHome. Усі права захищено.</p>
          <p>Ціни на сайті вказані в гривнях.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-5 font-display text-sm font-semibold tracking-wide text-white">{title}</h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
