import React from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isToolsOpen, setIsToolsOpen] = React.useState(false);
  const [isAboutOpen, setIsAboutOpen] = React.useState(false);
  const location = useLocation();

  // Create separate refs for desktop and mobile dropdowns
  const desktopAboutRef = React.useRef<HTMLDivElement>(null);
  const desktopToolsRef = React.useRef<HTMLDivElement>(null);
  const mobileAboutRef = React.useRef<HTMLDivElement>(null);
  const mobileToolsRef = React.useRef<HTMLDivElement>(null);

  // Close other dropdowns when one is opened
  const handleAboutClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAboutOpen(!isAboutOpen);
    setIsToolsOpen(false);
  };

  const handleToolsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsToolsOpen(!isToolsOpen);
    setIsAboutOpen(false);
  };

  // Check if a subsection is active
  const isAboutSubsectionActive = (path: string) => {
    return location.pathname === path;
  };

  const isAboutActive = location.pathname === '/about-kloud' || isAboutSubsectionActive('/our-team');
  const isToolsSubsectionActive = location.pathname === '/kloud';

  // Handle clicks outside dropdowns
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if click is inside any dropdown
      const isInsideDropdown = 
        (desktopAboutRef.current?.contains(target) || 
         desktopToolsRef.current?.contains(target) ||
         mobileAboutRef.current?.contains(target) ||
         mobileToolsRef.current?.contains(target));

      if (!isInsideDropdown) {
        setIsAboutOpen(false);
        setIsToolsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed w-full bg-[#DB2650] z-50">
      <div className="w-full">
        <div className="flex items-center justify-between h-24">
          <a href="https://allhandsontech.uk" className="flex items-center h-full">
            <img
              src="/images/logo.webp"
              alt="Kanishka Kloud"
              className="h-24 w-auto"
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 mr-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 pr-8 font-['PPTelegraf']">
            <a
              href="https://allhandsontech.uk"
              className="font-ultrabold hover:text-black/80 transition-colors text-white"
            >
              Home
            </a>
            <div className="relative" ref={desktopAboutRef}>
              <button
                onClick={handleAboutClick}
                className={`font-ultrabold hover:text-black/80 transition-colors flex items-center ${
                  isAboutActive ? 'text-black' : 'text-white'
                }`}
              >
                About
                <ChevronDown size={20} className={`ml-1 transition-transform duration-200 ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAboutOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#DB2650] rounded-lg shadow-lg py-2">
                  <a
                    href="https://allhandsontech.uk/about"
                    className="block px-4 py-2 text-white hover:bg-[#DB2650]/90 transition-colors font-ultrabold"
                  >
                    The Campaign
                  </a>
                  <a
                    href="https://allhandsontech.uk/our-team"
                    className="block px-4 py-2 text-white hover:bg-[#DB2650]/90 transition-colors font-ultrabold"
                  >
                    Our Team
                  </a>
                </div>
              )}
            </div>
            <a
              href="https://allhandsontech.uk/vale-accelerator"
              className="font-ultrabold hover:text-black/80 transition-colors text-white"
            >
              Vale Accelerator
            </a>
            <div className="relative" ref={desktopToolsRef}>
              <button
                onClick={handleToolsClick}
                className={`font-ultrabold hover:text-black/80 transition-colors flex items-center ${
                  isToolsSubsectionActive ? 'text-black' : 'text-black'
                }`}
              >
                Tools
                <ChevronDown size={20} className={`ml-1 transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isToolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#DB2650] rounded-lg shadow-lg py-2">
                  <a
                    href="https://kloud.allhandsontech.uk"
                    className="block px-4 py-2 text-black hover:bg-[#DB2650]/90 transition-colors font-ultrabold"
                  >
                    Kanishka Kloud
                  </a>
                </div>
              )}
            </div>
            <a
              href="https://allhandsontech.uk/podcast"
              className="font-ultrabold hover:text-black/80 transition-colors text-white"
            >
              Podcast
            </a>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64' : 'max-h-0'
          }`}
        >
          <nav className="pb-4 space-y-4 px-4 bg-[#DB2650] font-['PPTelegraf']">
            <a
              href="https://allhandsontech.uk"
              className="block font-ultrabold hover:text-black/80 transition-colors text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <div className="relative" ref={mobileAboutRef}>
              <button
                onClick={handleAboutClick}
                className={`block w-full text-left font-ultrabold hover:text-black/80 transition-colors flex items-center justify-between ${
                  isAboutActive ? 'text-black' : 'text-white'
                }`}
              >
                About
                <ChevronDown size={20} className={`transition-transform duration-200 ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAboutOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <a
                    href="https://allhandsontech.uk/about"
                    className="block font-ultrabold hover:text-black/80 transition-colors text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    The Campaign
                  </a>
                  <a
                    href="https://allhandsontech.uk/our-team"
                    className="block font-ultrabold hover:text-black/80 transition-colors text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Our Team
                  </a>
                </div>
              )}
            </div>
            <a
              href="https://allhandsontech.uk/vale-accelerator"
              className="block font-ultrabold hover:text-black/80 transition-colors text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Vale Accelerator
            </a>
            <div className="relative" ref={mobileToolsRef}>
              <button
                onClick={handleToolsClick}
                className={`block w-full text-left font-ultrabold hover:text-black/80 transition-colors flex items-center justify-between ${
                  isToolsSubsectionActive ? 'text-black' : 'text-black'
                }`}
              >
                Tools
                <ChevronDown size={20} className={`transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isToolsOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <a
                    href="https://kloud.allhandsontech.uk"
                    className="block font-ultrabold hover:text-black/80 transition-colors text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Kanishka Kloud
                  </a>
                </div>
              )}
            </div>
            <a
              href="https://allhandsontech.uk/podcast"
              className="block font-ultrabold hover:text-black/80 transition-colors text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Podcast
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
} 