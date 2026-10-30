import { site } from "@/lib/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CallbackForm } from "@/components/forms/CallbackForm";

export function Contacts() {
  const rows: { icon: IconName; label: string; value: string; href?: string }[] = [
    { icon: "phone", label: site.hours, value: site.phone, href: site.phoneHref },
    { icon: "mail", label: "Електронна пошта", value: site.email, href: `mailto:${site.email}` },
    { icon: "pin", label: "Адреса", value: site.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}` },
  ];

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="section-y scroll-mt-16 bg-warm-bg">
      <div className="container-x">
        <div className="grid gap-10 rounded-lg bg-white p-6 shadow-card sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div>
            <p className="eyebrow mb-3 text-accent">Контакти</p>
            <h2 id="contacts-title" className="text-[26px] leading-tight font-bold sm:text-[34px]">
              Зв’яжіться з нами — ми допоможемо обрати
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-secondary">
              Розкажіть про приміщення та ваші побажання — порадимо обладнання і зорієнтуємо щодо монтажу.
            </p>

            <ul className="mt-9 space-y-6">
              {rows.map((r) => (
                <li key={r.value} className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md bg-accent/10 text-accent">
                    <Icon name={r.icon} size={20} />
                  </span>
                  <span>
                    {r.href ? (
                      <a
                        href={r.href}
                        className="block font-display text-[17px] font-semibold transition-colors hover:text-accent"
                        {...(r.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        {r.value}
                      </a>
                    ) : (
                      <span className="block font-display text-[17px] font-semibold">{r.value}</span>
                    )}
                    <span className="text-sm text-text-secondary">{r.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border p-5 sm:p-8">
            <h3 className="font-display text-xl font-semibold">Передзвоніть мені</h3>
            <p className="mt-1 mb-6 text-sm text-text-secondary">Залиште ім’я та телефон — ми зателефонуємо й допоможемо з вибором.</p>
            <CallbackForm />
          </div>
        </div>
      </div>
    </section>
  );
}
