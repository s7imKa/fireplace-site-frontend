import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

const pillars: { icon: IconName; title: string; text: string }[] = [
  { icon: "stove", title: "Обладнання", text: "Каміни, печі, топки, біокаміни та димоходи" },
  { icon: "tools", title: "Монтаж", text: "Встановлення з урахуванням вимог безпеки" },
  { icon: "consult", title: "Супровід", text: "Консультуємо до і після покупки" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y scroll-mt-20 bg-white">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-3 text-accent">Про нас</p>
          <h2 id="about-title" className="text-[28px] leading-[1.15] font-bold sm:text-4xl lg:text-[40px]">
            Наша місія — тепло у кожен дім
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-text-secondary sm:text-base">
            Ми спеціалізуємося на продажу камінів, печей, камінних топок та димохідних систем, а також на їх професійному
            монтажі. Допомагаємо пройти весь шлях: від вибору моделі до моменту, коли у вашій вітальні вперше запалає вогонь.
          </p>

          <ul className="mt-9 divide-y divide-border border-y border-border">
            {pillars.map((p) => (
              <li key={p.title} className="flex items-center gap-4 py-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-md bg-accent/10 text-accent">
                  <Icon name={p.icon} size={21} />
                </span>
                <span>
                  <span className="block font-display text-[15px] font-semibold">{p.title}</span>
                  <span className="text-sm text-text-secondary">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>

          <ButtonLink href="/montazh" variant="outline" className="mt-9" arrow>
            Дізнатися більше
          </ButtonLink>
        </div>

        {/* Асиметрична фотокомпозиція */}
        <div className="relative lg:col-span-7 lg:pl-10">
          <div className="relative aspect-[4/3.3] overflow-hidden rounded-lg sm:aspect-[4/3]">
            <Image
              src="/images/about-interior.jpg"
              alt="Світлий інтер’єр з вбудованим каміном і дровником"
              fill
              sizes="(min-width:1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 left-0 hidden w-[38%] overflow-hidden rounded-lg border-[6px] border-white shadow-lift sm:block lg:-left-2">
            <div className="relative aspect-[4/4.6]">
              <Image src="/images/interior-corner.jpg" alt="Камінна топка в мінімалістичному інтер’єрі" fill sizes="260px" className="object-cover" />
            </div>
          </div>
          <div className="absolute top-6 -right-2 hidden rounded-lg bg-warm-beige px-5 py-4 sm:block lg:-right-4">
            <p className="font-display text-sm font-semibold text-text-primary">Від вибору до першого вогню</p>
            <p className="text-[13px] text-text-primary/60">в одній команді</p>
          </div>
        </div>
      </div>
    </section>
  );
}
