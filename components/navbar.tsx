import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { scrollToId } from '../lib/scroll';

const NAV_LINKS = [
  { name: 'Work', href: '#work' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Writing', href: '#updates' },
  { name: 'Contact', href: '#contact' },
];

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
    const els = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    if (scrollToId(href.slice(1))) window.history.pushState(null, '', href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        isScrolled || isMenuOpen
          ? 'bg-ink/85 backdrop-blur-md border-b border-line'
          : 'bg-ink/0 border-b border-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setIsMenuOpen(false)}>
          <span className="w-8 h-8 rounded-lg bg-amber text-ink grid place-items-center font-bold text-sm">N</span>
          <span className="font-semibold tracking-tight">Nick Njau</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              aria-current={active === l.href.slice(1) ? 'true' : undefined}
              className={`px-3 py-2 text-sm rounded-full transition-colors ${
                active === l.href.slice(1) ? 'text-amber' : 'text-mute hover:text-paper'
              }`}
            >
              {l.name}
            </a>
          ))}
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="btn btn-primary ml-3 !py-2 !px-4 !text-sm">
            Book a call
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-lg border border-line"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-ink border-t border-line px-4 pb-5 pt-2">
          {NAV_LINKS.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className="block py-3 text-lg border-b border-line text-paper"
            >
              {l.name}
            </a>
          ))}
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="btn btn-primary w-full mt-4">
            Book a Discovery Call
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
