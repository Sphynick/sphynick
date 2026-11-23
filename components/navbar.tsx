import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { scrollToId } from '../lib/scroll';

const NAV_LINKS = [
  { name: 'About', path: '/about', id: 'about' },
  { name: 'Work', path: '/work', id: 'work' },
  { name: 'Process', path: '/process', id: 'process' },
  { name: 'Services', path: '/services', id: 'services' },
  { name: 'Writing', path: '/writing', id: 'updates' },
  { name: 'Contact', path: '/contact', id: 'contact' },
];
type NavLink = (typeof NAV_LINKS)[number];
const CONTACT = NAV_LINKS[5];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    setActive('');
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname === link.path) scrollToId(link.id);
    else navigate(link.path);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        isScrolled || isMenuOpen ? 'shadow-[0_6px_24px_-12px_rgba(12,26,61,0.25)]' : ''
      } border-b border-line`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setIsMenuOpen(false)}>
          <span className="w-9 h-9 rounded-md bg-brand text-white grid place-items-center font-extrabold">N</span>
          <span className="font-extrabold text-navy tracking-tight text-lg">Nick Njau</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.name}
              href={l.path}
              onClick={(e) => handleNavClick(e, l)}
              aria-current={active === l.id ? 'true' : undefined}
              className={`px-3 py-2 text-sm font-bold transition-colors border-b-2 ${
                active === l.id
                  ? 'text-brand border-brand'
                  : 'text-navy border-transparent hover:text-brand'
              }`}
            >
              {l.name}
            </a>
          ))}
          <a href="/contact" onClick={(e) => handleNavClick(e, CONTACT)} className="btn btn-primary ml-4 !py-2.5 !px-5 !text-sm">
            Book a call
          </a>
        </div>

        <button
          className="lg:hidden p-2 rounded-md border border-line text-navy"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-line px-4 pb-5 pt-2">
          {NAV_LINKS.map((l) => (
            <a
              key={l.name}
              href={l.path}
              onClick={(e) => handleNavClick(e, l)}
              className="block py-3 text-lg font-bold border-b border-line text-navy"
            >
              {l.name}
            </a>
          ))}
          <a href="/contact" onClick={(e) => handleNavClick(e, CONTACT)} className="btn btn-primary w-full mt-4">
            Book a Discovery Call
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
