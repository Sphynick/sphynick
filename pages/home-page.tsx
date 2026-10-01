import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Github, Mail, MessageSquare } from 'lucide-react';
import { PROJECTS, PRODUCTS, FAQS, TESTIMONIALS, METRICS } from '../constants';
import { PixelCat } from '../components/pixel-sprite';
import { PixelThumb, SectionTitle } from '../components/pixel-art';

const WHATSAPP = 'https://wa.me/254769504732';
const EMAIL = 'mailto:sphynick@gmail.com';
const GITHUB = 'https://github.com/one37XL';

const SKILLS: { name: string; level: number }[] = [
  { name: 'React / Next.js', level: 90 },
  { name: 'Tailwind / CSS', level: 92 },
  { name: 'TypeScript / JS', level: 80 },
  { name: 'AI tooling', level: 78 },
  { name: 'Firebase / Node', level: 70 },
];

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.35, ease: 'easeOut' as const },
};

const HomePage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  };

  return (
    <div className="text-paper">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div className="space-y-8">
            <p className="font-retro text-2xl text-mint">
              <span className="blink">▮</span> available for projects
            </p>
            <h1 className="font-pixel text-2xl sm:text-4xl leading-[1.5] uppercase">
              I build <span className="text-amber">clean</span>,
              <br />
              fast websites.
            </h1>
            <p className="text-sm sm:text-base text-mute max-w-lg leading-relaxed">
              Nick Njau. IT specialist and web developer in Nairobi. I make sites and AI tools that are
              simple to use and quick to load.
            </p>
            <div className="flex flex-wrap gap-5 pt-2">
              <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="px-btn">
                Start a project
              </a>
              <a href="#projects" onClick={(e) => scrollTo(e, 'projects')} className="px-btn px-btn-ghost">
                See work
              </a>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center gap-6">
            <div className="px-box p-8 flex flex-col items-center gap-5">
              <PixelCat size={14} className="bob" />
              <div className="font-retro text-xl text-mute text-center">
                <span className="text-amber">NICK.EXE</span> running
                <span className="blink">_</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y-2 border-line bg-panel">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {METRICS.map((m) => (
            <motion.div key={m.label} {...reveal}>
              <div className="font-pixel text-xl sm:text-2xl text-amber">{m.value}</div>
              <div className="font-retro text-xl text-mute mt-2">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionTitle index="01" title="About" />
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div {...reveal} className="space-y-5 text-sm sm:text-base text-mute leading-relaxed">
              <p>
                I started in <span className="text-paper">Nairobi</span>, working with NGOs to grow their digital
                reach. That taught me the best tech is the kind people barely notice.
              </p>
              <p>
                Today I build full-stack products, from landing pages to AI-assisted tools, and I care about the
                details: spacing, speed, and clarity.
              </p>
              <p>
                Outside the screen: chess, long-form writing, and fixing things with my hands.
              </p>
            </motion.div>

            <motion.div {...reveal} className="px-box p-6 space-y-5 self-start">
              <div className="font-pixel text-[10px] text-amber">STATS</div>
              {SKILLS.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between font-retro text-xl mb-1">
                    <span>{s.name}</span>
                    <span className="text-mute">{s.level}</span>
                  </div>
                  <div className="bar">
                    <i style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 bg-panel border-y-2 border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionTitle index="02" title="Selected work" />
          <div className="grid md:grid-cols-2 gap-10">
            {PROJECTS.map((p, i) => (
              <motion.a
                key={p.id}
                {...reveal}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-ink px-box px-hover flex flex-col"
              >
                <div className="aspect-video overflow-hidden border-b-2 border-line relative">
                  <PixelThumb seed={p.title} />
                  <span className="absolute top-3 left-3 font-pixel text-[9px] bg-ink px-2 py-1 text-amber">
                    0{i + 1}
                  </span>
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-pixel text-[11px] leading-relaxed uppercase group-hover:text-amber transition-colors">
                      {p.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 shrink-0 text-mute group-hover:text-amber" />
                  </div>
                  <p className="text-xs text-mute leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                    {p.tools.map((t) => (
                      <span key={t} className="font-retro text-lg px-2 border-2 border-line text-mute">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* WRITING */}
      <section id="products" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionTitle index="03" title="Writing" />
          <div className="grid md:grid-cols-2 gap-10">
            {PRODUCTS.map((p) => {
              const live = p.link !== '#';
              return (
                <motion.a
                  key={p.id}
                  {...reveal}
                  href={p.link}
                  target={live ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="px-box px-hover p-5 flex gap-5 items-center"
                >
                  <div className="w-24 h-24 shrink-0 border-2 border-line">
                    <PixelThumb seed={p.name} cols={12} rows={12} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-3 font-retro text-lg">
                      <span className="text-amber">{p.category}</span>
                      <span className="text-mute">· {p.price}</span>
                    </div>
                    <h3 className="font-pixel text-[11px] leading-relaxed uppercase">{p.name}</h3>
                    <p className="text-xs text-mute leading-relaxed line-clamp-2">{p.description}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-panel border-y-2 border-line">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle index="04" title="Kind words" />
          <div className="px-box bg-ink p-6 sm:p-10 min-h-[260px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <p className="text-sm sm:text-lg leading-relaxed">
                  <span className="text-amber font-pixel">"</span>
                  {TESTIMONIALS[activeTestimonial].quote}
                </p>
                <div className="font-retro text-xl">
                  <span className="text-amber">{TESTIMONIALS[activeTestimonial].author}</span>
                  <span className="text-mute">
                    {' '}
                    / {TESTIMONIALS[activeTestimonial].role}, {TESTIMONIALS[activeTestimonial].company}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-3 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={`w-4 h-4 ${i === activeTestimonial ? 'bg-amber' : 'bg-line hover:bg-mute'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle index="05" title="FAQ" />
          <div className="space-y-5">
            {FAQS.map((f, i) => (
              <div key={f.question} className="px-box">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center gap-4"
                  aria-expanded={activeFaq === i}
                >
                  <span className="text-sm">{f.question}</span>
                  <span className="font-pixel text-xs text-amber">{activeFaq === i ? '-' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-xs text-mute leading-relaxed">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-panel border-t-2 border-line grid-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <h2 className="font-pixel text-xl sm:text-3xl leading-relaxed uppercase">
            Press <span className="text-amber">start</span>
            <span className="blink">_</span>
          </h2>
          <p className="text-sm text-mute max-w-md mx-auto leading-relaxed">
            Have a project in mind? Message me on WhatsApp or send an email with a short brief and a timeline.
          </p>
          <div className="flex flex-wrap gap-5 justify-center">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="px-btn">
              <MessageSquare className="w-4 h-4" /> WhatsApp
            </a>
            <a href={EMAIL} className="px-btn px-btn-ghost">
              <Mail className="w-4 h-4" /> Email
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="px-btn px-btn-ghost">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-line py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-retro text-lg text-mute">
          <span>© {new Date().getFullYear()} Nick Njau · Built in Nairobi</span>
          <span>
            made with <span className="text-[#ff6b6b]">♥</span> and too many pixels
          </span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
