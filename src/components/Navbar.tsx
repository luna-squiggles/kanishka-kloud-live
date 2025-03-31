import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-[#DB2650] z-50">
      <div className="w-full">
        <div className="flex items-center justify-between h-24">
          <a href="https://kloud.allhandsontech.uk" className="flex items-center h-full">
            <img
              src="/src/data/logo.webp"
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
              href="https://kloud.allhandsontech.uk"
              className="font-ultrabold hover:text-black/80 transition-colors text-white whitespace-nowrap"
            >
              Home
            </a>
            <a
              href="https://kloud.allhandsontech.uk/about"
              className="font-ultrabold hover:text-black/80 transition-colors text-white whitespace-nowrap"
            >
              About
            </a>
            <a
              href="https://kloud.allhandsontech.uk/vale-accelerator"
              className="font-ultrabold hover:text-black/80 transition-colors text-white whitespace-nowrap"
            >
              Vale Accelerator
            </a>
            <a
              href="https://kloud.allhandsontech.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-ultrabold hover:text-black/80 transition-colors text-black whitespace-nowrap"
            >
              Kanishka Kloud
            </a>
            <a
              href="https://kloud.allhandsontech.uk/podcast"
              className="font-ultrabold hover:text-black/80 transition-colors text-white whitespace-nowrap"
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
              href="https://kloud.allhandsontech.uk"
              className="block font-ultrabold hover:text-black/80 transition-colors text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="https://kloud.allhandsontech.uk/about"
              className="block font-ultrabold hover:text-black/80 transition-colors text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="https://kloud.allhandsontech.uk/vale-accelerator"
              className="block font-ultrabold hover:text-black/80 transition-colors text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Vale Accelerator
            </a>
            <a
              href="https://kloud.allhandsontech.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-ultrabold hover:text-black/80 transition-colors text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Kanishka Kloud
            </a>
            <a
              href="https://kloud.allhandsontech.uk/podcast"
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