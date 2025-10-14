import type { Metadata } from "next";
import { Bayon, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

// const bayon = Bayon({
//   variable: "--font-bayon",
//   subsets: ["latin"],
//   weight: "400",
// });

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
    </html>
  );
}
