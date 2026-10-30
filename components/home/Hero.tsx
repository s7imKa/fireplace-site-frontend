import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

const benefits: { icon: IconName; title: string; text: string }[] = [
  { icon: "compass", title: "Допомога у виборі", text: "Підберемо модель під ваш простір" },
  { icon: "tools", title: "Професійний монтаж", text: "Каміни та димохідні системи" },
  { icon: "consult", title: "Консультація спеціалістів", text: "Відповімо на технічні питання" },
  { icon: "truck", title: "Доставка", text: "Відправляємо по Україні" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-graphite text-white">
      {/* Фото */}
      <div className="absolute inset-0 -z-10 lg:left-[30%]">
        <Image
          src="/images/hero-living-room.jpg"
          alt="Сучасна вітальня з вбудованим каміном у кам’яному порталі"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width:1024px) 70vw, 100vw"
          className="object-cover object-[62%_center]"
        />
        {/* Затемнення для читабельності */}
        <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/70 to-graphite/5 lg:via-graphite/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-black/40" />
      </div>
      {/* Тепле світіння від вогню */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[18%] bottom-[22%] -z-10 hidden size-[420px] rounded-full bg-accent/20 blur-[120px] lg:block" />

      <div className="container-x flex min-h-[640px] flex-col pt-28 sm:min-h-[700px] lg:h-[min(92svh,860px)] lg:min-h-[720px] lg:pt-[76px]">
        <div className="flex flex-1 items-center py-10 lg:py-16">
          <div className="max-w-[620px] animate-fade-up">
            <p className="eyebrow mb-5 flex items-center gap-3 text-white/70">
              <span className="h-px w-8 bg-accent" />
              Каміни · Печі · Монтаж
            </p>
            <h1 id="hero-title" className="text-[34px] leading-[1.1] font-bold sm:text-5xl lg:text-[58px] lg:leading-[1.06]">
              Каміни, які створюють <span className="text-accent">затишок</span> у вашому домі
            </h1>
            <p className="mt-6 max-w-[500px] text-[15px] leading-relaxed text-white/75 sm:text-[17px]">
              Продаж камінів, печей та димохідних систем. Допоможемо підібрати обладнання та організуємо професійний монтаж.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/catalog" size="lg" arrow>
                Переглянути каталог
              </ButtonLink>
              <ButtonLink href="/montazh" variant="outlineLight" size="lg">
                Замовити монтаж
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Ряд переваг */}
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/12 py-7 lg:grid-cols-4 lg:gap-8 lg:py-8">
          {benefits.map((b) => (
            <li key={b.title} className="flex items-start gap-3 sm:items-center">
              <span className="grid size-10 shrink-0 place-items-center rounded-md border border-white/15 text-accent sm:size-11">
                <Icon name={b.icon} size={21} />
              </span>
              <span>
                <span className="block font-display text-[13px] leading-tight font-semibold text-white sm:text-sm">{b.title}</span>
                <span className="mt-0.5 hidden text-[12.5px] text-text-secondary-dark sm:block">{b.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
