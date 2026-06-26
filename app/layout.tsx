import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LexAI — Юридическая защита онлайн",
  description: "Профессиональные юридические документы за минуты. Заявления, жалобы, исковые заявления — составим грамотно и быстро.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${playfair.variable} ${inter.variable} antialiased font-inter`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
