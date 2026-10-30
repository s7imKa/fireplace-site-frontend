import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x py-28 text-center">
      <p className="eyebrow text-accent">404</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Сторінку не знайдено</h1>
      <p className="mt-3 text-text-secondary">Можливо, її перемістили. Почніть з каталогу.</p>
      <ButtonLink href="/catalog" className="mt-8" arrow>
        До каталогу
      </ButtonLink>
    </section>
  );
}
