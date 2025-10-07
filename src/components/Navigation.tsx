import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: 'home' },
    // { name: 'Events', path: 'events' },
    { name: 'Team', path: 'team' },
    {name: 'About', path: 'about'},
    // { name: 'Merch', path: 'merch' },
    // { name: 'Souvenir', path: 'souvenir' },
    // { name: 'Sponsors', path: 'sponsors' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-[#00ff00]/20">
      {/* Full-width row so logos can be flush-left while nav items remain centered */}
      <div className="w-full">
        <div className="flex items-center h-20">
          {/* Left logos - placed before the centered container so they sit flush to the left edge */}
          <div
            className="flex items-center cursor-pointer group ml-0"
            onClick={() => handleNavClick('home')}
          >
            <img
              src="/Black Background Techno Logo.png"
              alt="TechnoVIT Logo"
              className="h-14 md:h-16 w-auto object-contain transition-all duration-300"
            />
              <div className="w-2 h-2 bg-white rounded-full mx-3"></div>

            <img
              src="/VIT logo.png"
              alt="VIT Logo"
              className="h-10 md:h-13 w-auto object-contain ml-3"
            />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Centered container for nav items (keeps existing max width and padding) */}
          <div className="flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex justify-end items-center space-x-1">
                <div className="hidden md:flex items-center space-x-1">
                  {navItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className={`
                        px-4 py-2 text-sm font-subheading uppercase tracking-wide
                        transition-all duration-300 relative group
                        ${currentPage === item.path ? 'text-[#00ff00]' : 'text-white hover:text-[#00ff00]'}
                      `}
                    >
                      {item.name}
                      <div
                        className={`
                          absolute bottom-0 left-0 h-0.5 bg-[#00ff00] transition-all duration-300
                          ${currentPage === item.path ? 'w-full' : 'w-0 group-hover:w-full'}
                        `}
                      ></div>
                    </button>
                  ))}
                </div>

                <button
                  className="md:hidden text-white hover:text-[#00ff00] transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </div>

          </div>
        </div>

        {isOpen && (
        <div className="md:hidden bg-black border-t border-[#00ff00]/20 animate-fade-in">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`
                  block w-full text-left px-4 py-3 text-base font-subheading uppercase
                  border-l-4 transition-all duration-300
                  ${
                    currentPage === item.path
                      ? 'border-[#00ff00] text-[#00ff00] bg-[#00ff00]/10'
                      : 'border-transparent text-white hover:border-[#00ff00] hover:text-[#00ff00] hover:bg-[#00ff00]/5'
                  }
                `}
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
