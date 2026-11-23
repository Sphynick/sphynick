import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, MessageSquare } from 'lucide-react';
import { SITE, waLink } from '../constants';

const LINKS = [
  { name: 'About', path: '/about' },
  { name: 'Work', path: '/work' },
  { name: 'Process', path: '/process' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

const Footer: React.FC = () => (
  <footer className="bg-navy text-[#c6d3f5]">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-md bg-brand text-white grid place-items-center font-extrabold">N</span>
          <span className="font-extrabold text-white text-lg">Nick Njau</span>
        </div>
        <p className="text-sm leading-relaxed max-w-sm">
          Software Engineer &amp; AI Systems Builder in Nairobi, Kenya. Web platforms, custom apps and AI automation for
          businesses and institutions.
        </p>
      </div>

      <div>
        <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white mb-4">Explore</h4>
        <ul className="space-y-2 text-sm">
          {LINKS.map((l) => (
            <li key={l.name}>
              <Link to={l.path} className="hover:text-white transition-colors">
                {l.name}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white mb-4">Get in touch</h4>
        <ul className="space-y-3 text-sm">
          <li>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-white">
              <MessageSquare className="w-4 h-4" /> WhatsApp · {SITE.whatsappDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2.5 hover:text-white">
              <Mail className="w-4 h-4" /> {SITE.email}
            </a>
          </li>
          <li>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-white">
              <Github className="w-4 h-4" /> github.com/sphynick
            </a>
          </li>
          <li>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-white">
              <span className="w-4 text-center font-bold">@</span> {SITE.instagramHandle.replace('@', '')} on Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 text-xs flex flex-col sm:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} Nick Njau. All rights reserved.</span>
        <span>Built in Nairobi, Kenya</span>
      </div>
    </div>
  </footer>
);

export default Footer;
