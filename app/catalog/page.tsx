import type { Metadata } from "next";
import { CatalogPage } from "@/components/pages/CatalogPage";

export const metadata: Metadata = {
  title: "Каталог камінів, печей і біокамінів",
  description: "Каміни, печі, камінні топки та біокаміни з доставкою по Україні та професійним монтажем.",
};

export default function Page() {
  return <CatalogPage />;
}
