import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-manrope",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const BASE_URL = "https://kodus.studio";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "Kodus — Sites que vendem", template: "%s · Kodus" },
  description:
    "Estúdio digital paulistano. Landing pages, sites institucionais, e-commerce e sistemas sob demanda — focados em conversão.",
  keywords: [
    "landing page",
    "site institucional",
    "e-commerce",
    "desenvolvimento web",
    "Next.js",
    "São Paulo",
    "conversão",
    "kodus",
  ],
  authors: [{ name: "Kodus Estúdio Digital", url: BASE_URL }],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Kodus — Sites que vendem",
    description: "Estúdio digital. Mais conversão. Menos atrito.",
    url: BASE_URL,
    siteName: "Kodus",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodus — Sites que vendem",
    description: "Estúdio digital. Mais conversão. Menos atrito.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} ${manrope.variable}`}
    >
      <body>
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
