import { Icon, type IconName } from "@/components/ui/Icon";

const items: { icon: IconName; title: string; text: string }[] = [
  { icon: "truck", title: "Доставка по Україні", text: "Відправляємо службами доставки. Вартість і терміни менеджер розрахує під ваше замовлення." },
  { icon: "card", title: "Зручна оплата", text: "Спосіб оплати узгоджуємо під час підтвердження замовлення." },
  { icon: "tools", title: "Монтаж разом із товаром", text: "Оформіть товар і монтаж одним замовленням — узгодимо зручний час виїзду." },
];

export function Delivery() {
  return (
    <section id="delivery" aria-labelledby="delivery-title" className="scroll-mt-20 border-y border-border bg-warm-bg">
      <div className="container-x grid gap-8 py-12 lg:grid-cols-[0.8fr_2fr] lg:items-center lg:gap-16 lg:py-14">
        <div>
          <p className="eyebrow mb-2 text-accent">Доставка та оплата</p>
          <h2 id="delivery-title" className="text-2xl leading-tight font-bold sm:text-[28px]">
            Привеземо та встановимо
          </h2>
        </div>
        <ul className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          {items.map((it) => (
            <li key={it.title}>
              <Icon name={it.icon} size={26} className="text-accent" />
              <h3 className="mt-3 font-display text-[15px] font-semibold">{it.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
