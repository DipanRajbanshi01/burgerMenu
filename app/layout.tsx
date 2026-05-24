import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import { OrderProvider } from "@/context/OrderContext";
import { config } from "@/data/config";
import "./globals.css";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${config.brandName} · ${config.tagline}`,
  description:
    "Cloud-kitchen burgers in Kathmandu — buff, chicken, veg and combos delivered hot. Order on WhatsApp, Foodmandu or Pathao Food.",
  keywords: [
    "burger",
    "Kathmandu",
    "buff burger",
    "cloud kitchen",
    "Nepal food delivery",
    "Foodmandu",
    "Pathao Food",
    config.brandName,
  ],
  openGraph: {
    title: config.brandName,
    description: config.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1614",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased">
        <OrderProvider>{children}</OrderProvider>
      </body>
    </html>
  );
}
