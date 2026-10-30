import Image from "next/image";
import { site } from "@/lib/site";
import { works } from "@/lib/data/content";
import { cn } from "@/lib/format";
import { Breadcrumbs, CheckItem } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { Faq } from "@/components/montazh/Faq";

const services: { icon: IconName; title: string; text: string }[] = [
  { icon: "flame", title: "Каміни", text: "Встановлення камінів і облицювання порталів" },
  { icon: "stove", title: "Камінні топки", text: "Вбудовування топок у новий чи наявний портал" },
  { icon: "home", title: "Печі", text: "Монтаж окремо стоячих печей та підключення" },
  { icon: "chimney", title: "Димохідні системи", text: "Підбір і монтаж димоходів під обладнання" },
];

const stages = [
  { title: "Заявка та консультація", text: "Обговорюємо задачу, приміщення та побажання щодо обладнання." },
  { title: "Виїзд і замір", text: "Оглядаємо об’єкт, перевіряємо умови для монтажу та димоходу." },
  { title: "Підбір рішення", text: "Пропонуємо обладнання, димохід і формат облицювання, узгоджуємо кошторис." },
  { title: "Монтаж", text: "Встановлюємо обладнання та димохідну систему з дотриманням вимог безпеки." },
  { title: "Запуск і інструктаж", text: "Проводимо перший розпал і пояснюємо правила експлуатації." },
];

const advantages: { icon: IconName; title: string; text: string }[] = [
  { icon: "compass", title: "Рішення під ваш простір", text: "Підбираємо обладнання з урахуванням площі, планування та інтер’єру." },
  { icon: "shield", title: "Безпека на першому місці", text: "Монтаж і димохід — відповідно до вимог пожежної безпеки." },
  { icon: "box", title: "Обладнання й монтаж разом", text: "Товар і роботи — в одному замовленні, без пошуку підрядників." },
  { icon: "consult", title: "Супровід після запуску", text: "Консультуємо щодо експлуатації та догляду за каміном." },
];

export function MontazhPage() {
  return (
    <div className="bg-graphite text-white">
      {/* HERO */}
      <section aria-labelledby="mz-title" className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/montage-master.jpg" alt="Майстер FireHome монтує димохід" fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover object-[70%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/85 to-graphite/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-black/40" />
        </div>
        <div className="container-x flex min-h-[620px] flex-col justify-end pt-28 pb-14 lg:min-h-[740px] lg:pb-20">
          <Breadcrumbs dark items={[{ label: "Головна", href: "/" }, { label: "Монтаж" }]} />
          <div className="mt-8 max-w-2xl animate-fade-up">
            <p className="eyebrow mb-5 flex items-center gap-3 text-white/70">
              <span className="h-px w-8 bg-accent" />
              Послуги FireHome
            </p>
            <h1 id="mz-title" className="text-[34px] leading-[1.08] font-bold sm:text-5xl lg:text-[60px]">
              Монтаж камінів і&nbsp;димохідних систем <span className="text-accent">під ключ</span>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-[17px]">
              Від консультації та заміру до першого розпалу. Встановлюємо каміни, топки, печі та димоходи з дотриманням
              вимог безпеки.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/montazh#order" size="lg" arrow>
                Замовити монтаж
              </ButtonLink>
              <ButtonLink href="/montazh#order" variant="outlineLight" size="lg">
                Отримати консультацію
              </ButtonLink>
              <a href={site.phoneHref} className="inline-flex h-[52px] items-center gap-3 px-1 font-display font-semibold whitespace-nowrap text-white transition-colors hover:text-accent sm:ml-2">
                <span className="grid size-10 place-items-center rounded-full border border-white/20">
                  <Icon name="phone" size={18} />
                </span>
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ЩО МОНТУЄМО */}
      <section aria-labelledby="mz-services" className="section-y border-t border-white/10">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.5fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-3 text-accent">Що ми робимо</p>
              <h2 id="mz-services" className="text-[28px] leading-tight font-bold sm:text-4xl">
                Один підрядник для всього, що пов’язано з вогнем у домі
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-text-secondary-dark">
                Працюємо з обладнанням з нашого каталогу та підбираємо до нього димохідну систему.
              </p>
              <ButtonLink href="/catalog" variant="outlineLight" className="mt-8" arrow>
                Обрати обладнання
              </ButtonLink>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.title} className="group bg-graphite p-6 transition-colors hover:bg-dark-surface sm:p-8">
                  <span className="grid size-12 place-items-center rounded-md bg-accent/12 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary-dark">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ЕТАПИ */}
      <section aria-labelledby="mz-stages" className="section-y bg-dark-surface">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-4 lg:mb-16 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow mb-3 text-accent">Як ми працюємо</p>
              <h2 id="mz-stages" className="text-[28px] leading-tight font-bold sm:text-4xl">
                Етапи монтажу
              </h2>
            </div>
            <p className="max-w-md text-[15px] text-text-secondary-dark">Прозорий процес: ви знаєте, що відбувається на кожному кроці.</p>
          </div>
          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
            <span aria-hidden="true" className="absolute top-6 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-accent via-white/20 to-white/10 lg:block" />
            {stages.map((s, i) => (
              <li key={s.title} className="relative flex gap-5 lg:flex-col lg:gap-0">
                {i < stages.length - 1 && <span aria-hidden="true" className="absolute top-12 bottom-[-2rem] left-6 w-px bg-white/10 lg:hidden" />}
                <span
                  className={cn(
                    "relative z-10 grid size-12 shrink-0 place-items-center rounded-full font-display text-sm font-bold",
                    i === 0 ? "bg-accent text-white" : "border border-white/20 bg-dark-surface text-white",
                  )}
                >
                  0{i + 1}
                </span>
                <div className="pt-2 lg:pt-6">
                  <h3 className="font-display text-[17px] font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary-dark">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ПЕРЕВАГИ */}
      <section aria-labelledby="mz-adv" className="relative overflow-hidden">
        <div className="lg:grid lg:grid-cols-2">
          <div className="relative aspect-[16/11] lg:aspect-auto">
            <Image src="/images/interior-wood.jpg" alt="Камін із дровником у кам’яному облицюванні" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite to-transparent lg:bg-gradient-to-l" />
          </div>
          <div className="px-4 py-14 sm:px-6 lg:max-w-[640px] lg:px-14 lg:py-24">
            <p className="eyebrow mb-3 text-accent">Чому FireHome</p>
            <h2 id="mz-adv" className="text-[28px] leading-tight font-bold sm:text-4xl">
              Монтаж, якому можна довірити свій дім
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {advantages.map((a) => (
                <li key={a.title}>
                  <Icon name={a.icon} size={26} className="text-accent" />
                  <h3 className="mt-4 font-display text-[16px] font-semibold">{a.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary-dark">{a.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ */}
      <section aria-labelledby="mz-gallery" className="section-y border-t border-white/10">
        <div className="container-x">
          <div className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-3 text-accent">Галерея</p>
              <h2 id="mz-gallery" className="text-[28px] leading-tight font-bold sm:text-4xl">
                Каміни в інтер’єрі
              </h2>
            </div>
            {works.illustrative && <p className="text-xs text-text-secondary-dark">Фото ілюстративні — тут з’являться реалізовані об’єкти FireHome</p>}
          </div>
          <ul className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] lg:auto-rows-[250px] lg:grid-cols-4 lg:gap-4">
            {works.items.map((w, i) => (
              <li
                key={w.image}
                className={cn(
                  "group relative overflow-hidden rounded-lg",
                  i === 0 && "col-span-2 row-span-2",
                )}
              >
                <Image src={w.image} alt={w.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                <p className="absolute right-4 bottom-4 left-4 font-display text-[13px] font-semibold sm:text-[15px]">{w.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="mz-faq" className="section-y bg-warm-bg text-text-primary">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-3 text-accent">FAQ</p>
            <h2 id="mz-faq" className="text-[28px] leading-tight font-bold sm:text-4xl">
              Часті питання
            </h2>
            <p className="mt-4 text-[15px] text-text-secondary">Не знайшли відповідь? Зателефонуйте — розповімо детально.</p>
            <a href={site.phoneHref} className="mt-6 inline-block font-display text-xl font-semibold text-text-primary hover:text-accent">
              {site.phone}
            </a>
          </div>
          <Faq />
        </div>
      </section>

      {/* ФОРМА */}
      <section id="order" aria-labelledby="mz-order" className="section-y relative scroll-mt-16 overflow-hidden bg-graphite">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 size-[520px] rounded-full bg-accent/15 blur-[140px]" />
        <div className="container-x relative grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow mb-3 text-accent">Заявка на монтаж</p>
            <h2 id="mz-order" className="text-[30px] leading-tight font-bold sm:text-[42px]">
              Розкажіть про ваш проєкт
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-text-secondary-dark">
              Залиште ім’я та телефон — передзвонимо, уточнимо деталі та домовимося про виїзд на замір.
            </p>
            <ul className="mt-9 space-y-4">
              <CheckItem dark>Консультація щодо обладнання та димоходу</CheckItem>
              <CheckItem dark>Розрахунок вартості після заміру</CheckItem>
              <CheckItem dark>Монтаж і перший розпал</CheckItem>
            </ul>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-9">
            <CallbackForm variant="dark" layout="row" submitLabel="Замовити консультацію" />
          </div>
        </div>
      </section>
    </div>
  );
}
