"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Bayon } from "next/font/google";

const bayon = Bayon({
  variable: "--font-bayon",
  subsets: ["latin"],
  weight: "400",
});

const navItems = [
  { name: "HOME", path: "/" },
  { name: "EVENTS", path: "/events" },
  { name: "TEAM", path: "/team" },
  { name: "MERCH", path: "/merch" },
  { name: "SPONSORS", path: "/sponsors" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`z-50 border-b-[1px] border-[#ffffff] bg-[#000000] backdrop-blur-md text-xl ${bayon.className}`}
    >
      <div className="mx-auto hidden h-16 max-w-[95vw] items-center md:flex">
        <div className="flex flex-1 items-center gap-6 justify-start">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "uppercase tracking-wide text-white transition-colors duration-200 hover:text-[#70E081] cursor-pointer",
                  isActive && "text-[#70E081]"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <Link
          href="/"
          className="flex flex-none items-center gap-3 justify-center cursor-pointer"
        >
          <Image
            src="https://cdn.a2ys.dev/images/technoVit25-new.png"
            alt="TechnoVIT Logo"
            width={160}
            height={64}
            className="h-16 w-auto object-contain"
            priority
            onError={(e) => {
              e.currentTarget.src = e.currentTarget.src.replace(
                "https://cdn.a2ys.dev",
                "https://saving-vit.vercel.app"
              );
            }}
          />
          <Image
            src="https://cdn.a2ys.dev/images/dot.png"
            alt="Separator Dot"
            width={8}
            height={8}
            className="h-2 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.src = e.currentTarget.src.replace(
                "https://cdn.a2ys.dev",
                "https://saving-vit.vercel.app"
              );
            }}
          />
          <Image
            src="https://cdn.a2ys.dev/images/VIT logo.png"
            alt="VIT Logo"
            width={128}
            height={32}
            className="h-8 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.src = e.currentTarget.src.replace(
                "https://cdn.a2ys.dev",
                "https://saving-vit.vercel.app"
              );
            }}
          />
        </Link>

        <div className="flex flex-1 items-center justify-end">
          <Link
            href="/events"
            className="bg-[#70E081] px-4 py-2 uppercase text-black hover:bg-[#70E081]/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <Image
            src="https://cdn.a2ys.dev/images/technoVit25-new.png"
            alt="TechnoVIT Logo"
            width={100}
            height={32}
            className="h-8 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.src = e.currentTarget.src.replace(
                "https://cdn.a2ys.dev",
                "https://saving-vit.vercel.app"
              );
            }}
          />
          <Image
            src="https://cdn.a2ys.dev/images/dot.png"
            alt="Separator Dot"
            width={6}
            height={6}
            className="h-1.5 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.src = e.currentTarget.src.replace(
                "https://cdn.a2ys.dev",
                "https://saving-vit.vercel.app"
              );
            }}
          />
          <Image
            src="https://cdn.a2ys.dev/images/VIT logo.png"
            alt="VIT Logo"
            width={96}
            height={24}
            className="h-6 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.src = e.currentTarget.src.replace(
                "https://cdn.a2ys.dev",
                "https://saving-vit.vercel.app"
              );
            }}
          />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[#70E081]/20 bg-black md:hidden">
          <div className="flex flex-col px-4 py-3 space-y-2">
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={handleMobileLinkClick}
                  className={cn(
                    "text-left uppercase text-white px-3 py-2 transition-colors",
                    isActive
                      ? "bg-[#70E081]/20 text-[#70E081]"
                      : "hover:bg-[#70E081]/10 hover:text-[#70E081]"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/events"
              onClick={handleMobileLinkClick}
              className="mt-2 w-full bg-[#70E081] px-4 py-2 uppercase text-black hover:bg-[#70E081]/90 text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
