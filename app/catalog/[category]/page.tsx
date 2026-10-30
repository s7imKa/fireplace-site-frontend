import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/data/categories";
import { CatalogPage } from "@/components/pages/CatalogPage";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/catalog/[category]">): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  return cat ? { title: `${cat.title} — купити з монтажем`, description: cat.description } : {};
}

export default async function Page({ params }: PageProps<"/catalog/[category]">) {
  const { category } = await params;
  if (!getCategory(category)) notFound();
  return <CatalogPage category={category} />;
}
