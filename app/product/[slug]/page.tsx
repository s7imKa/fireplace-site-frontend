import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/data/products";
import { ProductPage } from "@/components/pages/ProductPage";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: p.name, description: p.description };
}

export default async function Page({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  // Структуровані дані для пошуковиків
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: p.images,
    description: p.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "UAH",
      price: p.price,
      ...(p.inStock !== undefined && {
        availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      }),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductPage slug={slug} />
    </>
  );
}
