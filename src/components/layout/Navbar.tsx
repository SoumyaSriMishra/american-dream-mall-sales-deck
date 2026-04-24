import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out ${
          scrolled
            ? 'bg-[#1c1b19e6] backdrop-blur-[20px] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container flex items-center justify-between">
          <a
            href="#hero"
            className={`font-display font-normal tracking-[0.2em] text-[1.0625rem] uppercase transition-colors duration-400 ${
              scrolled ? 'text-amber' : 'text-ivory'
            }`}
          >
            American Dream Mall
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { name: 'About', href: '#about' },
              { name: 'Brands', href: '#retail' },
              { name: 'Events', href: '#events' },
              { name: 'Leasing', href: '#sponsorship' },
              { name: 'Contact', href: '#contact' }
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body text-[0.75rem] font-normal tracking-[0.18em] text-ivory uppercase hover:text-amber transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute left-0 right-0 bottom-[-4px] h-[1px] bg-amber transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-ivory hover:text-amber transition-colors p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <Menu size={24} strokeWidth={1} />
          </button>
        </div>

      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
