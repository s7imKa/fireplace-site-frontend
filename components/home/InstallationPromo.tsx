import Image from "next/image";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { CheckItem } from "@/components/ui/Primitives";

const steps = ["Консультація", "Виїзд і замір", "Монтаж", "Перший розпал"];

export function InstallationPromo() {
  return (
    <section aria-labelledby="install-title" className="relative overflow-hidden bg-graphite text-white">
      <div className="lg:grid lg:min-h-[640px] lg:grid-cols-2">
        {/* Фото — на мобільних зверху */}
        <div className="relative aspect-[16/11] lg:order-2 lg:aspect-auto">
          <Image
            src="/images/montage-master.jpg"
            alt="Майстер встановлює димохідну трубу каміна"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/10 to-transparent lg:bg-gradient-to-r lg:from-graphite lg:via-graphite/20 lg:to-transparent" />
        </div>

        <div className="relative flex items-center">
          <div className="w-full px-4 pt-2 pb-16 sm:px-6 lg:ml-auto lg:max-w-[660px] lg:py-24 lg:pr-14 lg:pl-10">
            <p className="eyebrow mb-4 text-accent">Окремий напрямок FireHome</p>
            <h2 id="install-title" className="text-[28px] leading-[1.15] font-bold sm:text-4xl lg:text-[42px]">
              Професійний монтаж камінів та димохідних систем
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/65 sm:text-base">
              Беремо на себе весь шлях — від підбору рішення під ваше приміщення до встановлення та першого розпалу.
              Працюємо з камінами, печами, топками та димоходами.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              <CheckItem dark>Допомога з підбором рішення</CheckItem>
              <CheckItem dark>Професійний підхід</CheckItem>
              <CheckItem dark>Дотримання вимог безпеки</CheckItem>
              <CheckItem dark>Консультація щодо експлуатації</CheckItem>
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/montazh#order" size="lg" arrow>
                Замовити монтаж
              </ButtonLink>
              <a href={site.phoneHref} className="group text-sm text-text-secondary-dark">
                або зателефонуйте{" "}
                <span className="font-display font-semibold text-white transition-colors group-hover:text-accent">{site.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Етапи */}
      <div className="border-t border-white/10">
        <ol className="container-x grid grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s}
              className="flex items-center gap-3 border-white/10 py-5 odd:border-r lg:border-r lg:py-7 lg:last:border-r-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
            >
              <span className="pl-0 font-display text-sm font-semibold text-accent tabular-nums sm:pl-2 lg:pl-0">0{i + 1}</span>
              <span className="font-display text-[13.5px] font-medium text-white/85 sm:text-[15px]">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
