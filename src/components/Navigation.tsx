import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Bayon } from "next/font/google";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const bayon = Bayon({
  variable: "--font-bayon",
  subsets: ["latin"],
  weight: "400",
});

export const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "HOME", path: "home" },
    { name: "EVENTS", path: "events" },
    { name: "TEAM", path: "team" },
    { name: "MERCH", path: "merch" },
    // { name: "SPONSORS", path: "sponsors" },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b-[1px] border-[#ffffff] bg-[#000000] backdrop-blur-md text-xl  ${bayon.className}`}
    >
      <div className="mx-auto hidden h-16 max-w-[95vw] items-center md:flex">
        {/* Left - Navigation Links */}
        <div className="flex flex-1 items-center gap-6 justify-start">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={cn(
                "uppercase tracking-wide text-white transition-colors duration-200 hover:text-[#00ff00]",
                currentPage === item.path && "text-[#00ff00]"
              )}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Center - Logos */}
        <div
          className="flex flex-none items-center gap-3 justify-center cursor-pointer"
          onClick={() => handleNavClick("home")}
        >
          <img
            src="/technoVit25-new.png"
            alt="TechnoVIT Logo"
            className="h-16 w-auto object-contain"
          />
          <img
            src="/dot.png"
            alt="Separator Dot"
            className="h-2 w-auto object-contain"
          />
          <img
            src="/VIT logo.png"
            alt="VIT Logo"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Right - Get Started Button */}
        <div className="flex flex-1 items-center justify-end">
          <button
            onClick={() => handleNavClick("events")}
            className="bg-[#70E081] px-4 py-2 uppercase text-black hover:bg-[#70E081]/90 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        {/* Mobile Logos */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavClick("home")}
        >
          <img
            src="/technoVit25-new.png"
            alt="TechnoVIT Logo"
            className="h-8 w-auto object-contain"
          />
          <img
            src="/dot.png"
            alt="Separator Dot"
            className="h-1.5 w-auto object-contain"
          />
          <img
            src="/vitlogo.png"
            alt="VIT Logo"
            className="h-6 w-auto object-contain"
          />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[#00ff00]/20 bg-black md:hidden">
          <div className="flex flex-col px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={cn(
                  "text-left uppercase text-white px-3 py-2 transition-colors",
                  currentPage === item.path
                    ? "bg-[#00ff00]/20 text-[#00ff00]"
                    : "hover:bg-[#00ff00]/10 hover:text-[#00ff00]"
                )}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("events")}
              className="mt-2 w-full bg-[#00ff00] px-4 py-2 uppercase text-black hover:bg-[#00ff00]/90"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
