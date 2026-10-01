import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sprite, CAT_ROWS, CAT_PALETTE } from './pixel-sprite';

const NAV_LINKS = [
  { name: 'Work', href: '#projects' },
  { name: 'Writing', href: '#products' },
  { name: 'Praise', href: '#testimonials' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    const el = document.getElementById(href.slice(1));
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${
        isScrolled || isMenuOpen ? 'bg-ink border-b-2 border-line' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
          <Sprite rows={CAT_ROWS} palette={CAT_PALETTE} size={2} className="group-hover:bob" />
          <span className="font-pixel text-[11px] tracking-tight">
            NICK<span className="text-amber">_</span>NJAU
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className="font-retro text-xl text-mute hover:text-amber transition-colors"
            >
              <span className="text-line">/</span>
              {l.name.toLowerCase()}
            </a>
          ))}
        </div>

        <button
          className="md:hidden font-pixel text-[10px] px-3 py-2 px-box"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? 'X' : 'MENU'}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-ink border-t-2 border-line px-4 pb-6 pt-2">
          {NAV_LINKS.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className="block font-retro text-2xl py-3 border-b-2 border-line text-paper"
            >
              <span className="text-amber">&gt;</span> {l.name.toLowerCase()}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
