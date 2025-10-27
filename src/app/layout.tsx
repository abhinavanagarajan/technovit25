import { Be_Vietnam_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${beVietnam.className} antialiased bg-black relative min-h-[100svh]`}
      >
        <div className="flex flex-col min-h-screen w-full">
          <Navigation />
          <main className="flex-1">
            {children}
            <ScrollToTop />
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
