import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harin Bhavsar | AI & Data Analytics Portfolio",
  description:
    "Explore the portfolio of Harin Bhavsar — an AI & Data Analytics professional building intelligent solutions through Artificial Intelligence, Machine Learning, and Business Intelligence.",
  keywords: [
    "Harin Bhavsar",
    "AI Portfolio",
    "Data Analytics",
    "Machine Learning",
    "Business Intelligence",
    "Python",
    "Artificial Intelligence",
  ],
  authors: [{ name: "Harin Bhavsar" }],
  openGraph: {
    title: "Harin Bhavsar | AI & Data Analytics",
    description:
      "Building intelligent solutions through AI, Data Analytics & Business Intelligence.",
    type: "website",
    locale: "en_US",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        {children}
      </body>
    </html>
  );
}
