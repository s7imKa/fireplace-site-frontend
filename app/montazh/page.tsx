import type { Metadata } from "next";
import { MontazhPage } from "@/components/pages/MontazhPage";
import { faqItems } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Монтаж камінів і димохідних систем",
  description:
    "Професійний монтаж камінів, камінних топок, печей і димоходів: консультація, замір, встановлення та перший розпал.",
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MontazhPage />
    </>
  );
}
