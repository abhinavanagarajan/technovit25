import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "home" },
    { name: "Team", path: "team" },
    { name: "About", path: "about" },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#00ff00]/20 bg-black/90 backdrop-blur-md">
      <div className="mx-auto hidden h-20 max-w-[95vw] items-center justify-between md:flex">
        <div
          className="flex flex-shrink-0 cursor-pointer items-center gap-4"
          onClick={() => handleNavClick("home")}
        >
          <img
            src="/VIT logo.png"
            alt="VIT Logo"
            className="h-12 w-auto object-contain"
          />
          <img
            src="/Black Background Techno Logo.png"
            alt="TechnoVIT Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={cn(
                "group relative px-4 py-2 text-sm font-subheading uppercase tracking-wide text-white transition-colors duration-300 hover:text-[#00ff00]",
                currentPage === item.path && "text-[#00ff00]"
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 w-0 bg-[#00ff00] transition-all duration-300 group-hover:w-full",
                  currentPage === item.path ? "w-full" : "w-0"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 py-3 md:hidden">
        <div
          className="flex cursor-pointer items-center justify-center gap-4"
          onClick={() => handleNavClick("home")}
        >
          <img
            src="/Black Background Techno Logo.png"
            alt="TechnoVIT Logo"
            className="h-10 w-auto object-contain"
          />
          <img
            src="/VIT logo.png"
            alt="VIT Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        <button
          className="text-white transition-colors hover:text-[#00ff00] mt-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[#00ff00]/20 bg-black md:hidden">
          <div className="space-y-2 px-4 py-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={cn(
                  "block w-full border-l-4 px-4 py-3 text-left text-base font-subheading uppercase text-white transition-all duration-300",
                  currentPage === item.path
                    ? "border-[#00ff00] bg-[#00ff00]/10 text-[#00ff00]"
                    : "border-transparent hover:border-[#00ff00] hover:bg-[#00ff00]/5 hover:text-[#00ff00]"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
