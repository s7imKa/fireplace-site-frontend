import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fireplace Site",
  description: "Fireplace Site",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-warm-bg text-text-primary">{children}</body>
    </html>
  );
}
