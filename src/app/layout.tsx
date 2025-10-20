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
  title: "technoVIT 2025",
  description: "Join technoVIT'25",
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
