import Image from "next/image";
import { reviews } from "@/lib/data/content";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Відгуки. Показує лише реальні відгуки з `reviews`.
 * Якщо їх ще немає — елегантний стан-запрошення замість вигаданих історій.
 */
export function Reviews() {
  const hasReviews = reviews.length > 0;
  return (
    <section aria-labelledby="reviews-title" className="section-y bg-white">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-lg border border-border lg:grid-cols-[1.35fr_1fr]">
          <div className="p-6 sm:p-10 lg:p-14">
            <p className="eyebrow mb-3 text-accent">Відгуки клієнтів</p>
            <h2 id="reviews-title" className="text-[26px] leading-tight font-bold sm:text-[34px]">
              Що кажуть про FireHome
            </h2>

            {hasReviews ? (
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {reviews.slice(0, 4).map((r, idx) => (
                  <li key={idx} className="rounded-lg border border-border p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-[15px] font-semibold">{r.name}</span>
                      {r.rating && (
                        <span className="flex text-accent" aria-label={`Оцінка ${r.rating} з 5`}>
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Icon key={i} name="star" size={15} fill="currentColor" />
                          ))}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-text-primary/80">{r.text}</p>
                    {r.date && (
                      <time dateTime={r.date} className="mt-3 block text-xs text-text-secondary">
                        {new Date(r.date).toLocaleDateString("uk-UA")}
                      </time>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-8 rounded-lg bg-warm-bg p-6 sm:p-8">
                <Icon name="quote" size={34} className="text-accent" />
                <p className="mt-4 max-w-md font-display text-lg leading-snug font-semibold sm:text-xl">
                  Тут з’являться історії наших клієнтів — з реальними фото їхніх камінів.
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
                  Купували у нас або замовляли монтаж? Поділіться враженнями — ваш досвід допоможе іншим зробити вибір.
                </p>
                <ButtonLink href="/#contacts" variant="outline" className="mt-6" arrow>
                  Залишити відгук
                </ButtonLink>
              </div>
            )}
          </div>
          <div className="relative min-h-[280px] lg:min-h-0">
            <Image
              src="/images/interior-wood.jpg"
              alt="Камін у кутовому порталі з дровником"
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
