import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://technovit.vit.ac.in"),
  title: {
    default: "technoVIT 2025",
    template: "%s | technoVIT 2025",
  },
  description:
    "Join technoVIT'25 - The official technical fest of VIT Chennai.",
  keywords: ["technoVIT", "VIT", "tech fest", "technical fest", "events"],

  openGraph: {
    title: "technoVIT 2025",
    description:
      "Join technoVIT'25 - The official technical fest of VIT Chennai.",
    url: "https://technovit.vit.ac.in",
    siteName: "technoVIT 2025",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "technoVIT 2025",
    description:
      "Join technoVIT'25 - The official technical fest of VIT Chennai.",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${beVietnam.className} antialiased`}>{children}</body>
      <Analytics />
    </html>
  );
}
