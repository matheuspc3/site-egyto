import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import { siteData } from "@/data/dadosSite";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteData.siteUrl),
  title: {
    default: siteData.siteName,
    template: `%s — ${siteData.siteName}`,
  },
  description: siteData.hero.kicker,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteData.siteName,
    title: siteData.siteName,
    description: siteData.hero.kicker,
    url: siteData.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: siteData.siteName,
    description: siteData.hero.kicker,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${inter.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
