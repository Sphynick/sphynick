import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Calendar,
  Check,
  Github,
  Globe,
  LayoutDashboard,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { CASE_STUDIES, FAQS, PRODUCTS, SERVICES, SITE, TESTIMONIALS, TRUST_POINTS, waLink } from '../constants';
import { CaseStudy, ServiceChoice, ServiceId, ServiceTier } from '../types';
import CaseStudyModal from '../components/case-study-modal';
import IntakeForm from '../components/intake-form';
import { scrollToId } from '../lib/scroll';

const ICONS: Record<ServiceTier['icon'], React.ElementType> = {
  globe: Globe,
  app: LayoutDashboard,
  bot: Bot,
};

const STACK_GROUPS: { label: string; items: string[] }[] = [
  { label: 'Web', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'] },
  { label: 'Apps & payments', items: ['Node.js', 'Dashboards & portals', 'M-Pesa', 'Stripe'] },
  { label: 'AI & automation', items: ['Gemini API', 'OpenAI', 'Prompt design', 'Apps Script'] },
];

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.35, ease: 'easeOut' as const },
};

const SectionHeading: React.FC<{ eyebrow: string; title: string; sub?: string }> = ({ eyebrow, title, sub }) => (
  <div className="max-w-2xl mb-12">
    <p className="eyebrow mb-3">{eyebrow}</p>
    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
    {sub && <p className="text-mute mt-4 leading-relaxed">{sub}</p>}
  </div>
);

const HomePage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [openStudy, setOpenStudy] = useState<CaseStudy | null>(null);
  const [service, setService] = useState<ServiceChoice>('web-platform');

  const closeStudy = useCallback(() => setOpenStudy(null), []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  const chooseService = (id: ServiceId) => {
    setService(id);
    // Small delay so the modal (if open) finishes unlocking page scroll first.
    window.setTimeout(() => scrollToId('intake'), 30);
  };

  const startSimilar = (study: CaseStudy) => {
    setOpenStudy(null);
    chooseService(study.serviceId);
  };

  const featured = CASE_STUDIES.find((c) => c.featured) ?? CASE_STUDIES[0];
  const others = CASE_STUDIES.filter((c) => c.id !== featured.id);

  const bookingHref = SITE.bookingUrl || waLink("Hi Nick, I'd like to book a discovery call.");

  return (
    <div className="text-paper">
      {/* ------------------------------ HERO ------------------------------ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(60% 50% at 80% 0%, rgba(255,180,84,0.16), transparent 70%)' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-[1.25fr_1fr] gap-12 items-center">
          <div className="space-y-7">
            <p className="inline-flex items-center gap-2 text-sm text-mint">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" /> Taking on new projects
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
              Websites, apps and AI systems that <span className="text-amber">grow revenue</span> and cut manual work.
            </h1>
            <p className="text-lg text-mute max-w-xl leading-relaxed">
              I&apos;m Nick Njau, a Software Engineer &amp; AI Systems Builder in Nairobi. I help businesses and
              institutions increase revenue and admissions and automate operations.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href="#contact" onClick={(e) => go(e, 'contact')} className="btn btn-primary">
                <Calendar className="w-4 h-4" /> Book a Discovery Call
              </a>
              <a href="#work" onClick={(e) => go(e, 'work')} className="btn btn-ghost">
                See Case Studies <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-3 text-sm text-mute">
              {TRUST_POINTS.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setOpenStudy(featured)}
            className="card p-6 sm:p-7 text-left space-y-5 hover:border-amber transition-colors group"
            aria-label={`Open case study: ${featured.title}`}
          >
            <p className="eyebrow">Featured case study</p>
            <div className={`h-28 rounded-xl bg-gradient-to-br ${featured.accent} border border-line grid place-items-center`}>
              <span className="text-2xl font-bold tracking-tight">{featured.title}</span>
            </div>
            <ul className="space-y-2.5 text-sm text-mute">
              <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-amber shrink-0" /> Mobile-first, fast on phones</li>
              <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-amber shrink-0" /> Clear CBE pathways &amp; admissions flow</li>
              <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-amber shrink-0" /> Staff publish news without a developer</li>
            </ul>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber">
              View case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* ------------------------------ WORK ------------------------------ */}
      <section id="work" className="py-24 bg-panel border-y border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Case studies"
            sub="Each project follows the same story: the problem, how I solved it, and what changed for the people using it."
          />

          <div className="grid md:grid-cols-2 gap-6">
            {/* Featured */}
            <motion.button
              {...reveal}
              onClick={() => setOpenStudy(featured)}
              className="md:col-span-2 text-left bg-ink border border-line rounded-3xl overflow-hidden grid md:grid-cols-[1fr_1.2fr] hover:border-amber transition-colors group"
            >
              <div className={`min-h-[180px] bg-gradient-to-br ${featured.accent} p-7 flex flex-col justify-between`}>
                <span className="chip self-start bg-ink/70">Flagship</span>
                <span className="text-3xl font-bold tracking-tight">{featured.title}</span>
              </div>
              <div className="p-7 space-y-4">
                <p className="eyebrow">{featured.category}</p>
                <p className="text-paper/90 leading-relaxed">{featured.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {featured.stack.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber">
                  Read the case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.button>

            {others.map((p) => (
              <motion.button
                key={p.id}
                {...reveal}
                onClick={() => setOpenStudy(p)}
                className="text-left bg-ink border border-line rounded-3xl overflow-hidden hover:border-amber transition-colors group flex flex-col"
              >
                <div className={`h-28 bg-gradient-to-br ${p.accent} p-5 flex items-end`}>
                  <span className="text-xl font-bold tracking-tight">{p.title}</span>
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col">
                  <p className="eyebrow">{p.category}</p>
                  <p className="text-sm text-mute leading-relaxed">{p.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {p.stack.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <p className="mt-8 text-sm text-mute">
            More projects and experiments on{' '}
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="text-amber underline underline-offset-4 inline-flex items-center gap-1">
              GitHub <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            .
          </p>
        </div>
      </section>

      {/* ---------------------------- SERVICES ---------------------------- */}
      <section id="services" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Services"
            title="Three clear ways to work together"
            sub="Pick the package closest to your goal. Every project is scoped properly on a short discovery call before any work starts."
          />
          <div className="grid lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <motion.article key={s.id} {...reveal} className="card p-7 flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-amber/10 text-amber grid place-items-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{s.name}</h3>
                  <p className="text-mute mt-2 leading-relaxed">{s.tagline}</p>

                  <div className="mt-6">
                    <h4 className="eyebrow mb-2">Best for</h4>
                    <p className="text-sm text-paper/90 leading-relaxed">{s.bestFor}</p>
                  </div>

                  <div className="mt-6">
                    <h4 className="eyebrow mb-3">Deliverables</h4>
                    <ul className="space-y-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex gap-2.5 text-sm text-paper/90">
                          <Check className="w-4 h-4 mt-0.5 text-mint shrink-0" /> {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 border-t border-line flex items-center justify-between text-sm">
                    <span className="text-mute">Typical timeline</span>
                    <span className="font-semibold">{s.timeline}</span>
                  </div>

                  <button onClick={() => chooseService(s.id)} className="btn btn-primary w-full mt-6">
                    Start with this package <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------- TESTIMONIALS -------------------------- */}
      <section id="testimonials" className="py-24 bg-panel border-y border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Client words" title="What clients say" />
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <motion.figure
                key={t.id}
                {...reveal}
                className={`bg-ink rounded-2xl p-6 flex flex-col gap-5 ${
                  t.isPlaceholder ? 'border-2 border-dashed border-amber/50' : 'border border-line'
                }`}
              >
                {t.isPlaceholder && (
                  <span className="self-start font-mono text-xs text-amber bg-amber/10 px-2 py-1 rounded">
                    [Editable Placeholder]
                  </span>
                )}
                <blockquote className="leading-relaxed text-paper/90">“{t.quote}”</blockquote>
                <figcaption className="text-sm mt-auto">
                  <span className="font-semibold">{t.author}</span>
                  <span className="text-mute"> · {t.role}, {t.company}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ ABOUT ----------------------------- */}
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12">
          <div>
            <SectionHeading eyebrow="About" title="Engineering that answers to the business" />
            <motion.div {...reveal} className="space-y-5 text-mute leading-relaxed -mt-4">
              <p>
                I&apos;m <span className="text-paper">Nick Njau</span>, a software engineer and AI systems builder in
                Nairobi. I started out helping NGOs grow their digital reach, which taught me that the best technology is
                the kind people barely notice because it just works.
              </p>
              <p>
                Today I build fast web platforms, custom apps and AI workflows. I measure the work by what it does
                for you: more enquiries and admissions, fewer repetitive tasks, and a team that can run things
                without waiting on a developer.
              </p>
              <p>Outside the screen: chess, long-form writing, and fixing things with my hands.</p>
            </motion.div>
          </div>

          <motion.div {...reveal} className="card p-7 self-start space-y-6">
            <h3 className="eyebrow">What I work with</h3>
            {STACK_GROUPS.map((g) => (
              <div key={g.label}>
                <p className="text-sm text-mute mb-2">{g.label}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((i) => <span key={i} className="chip">{i}</span>)}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ------------------------- WRITING & UPDATES ---------------------- */}
      <section id="updates" className="py-24 bg-panel border-y border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Writing & updates" title="Notes and publications" />
          <div className="grid md:grid-cols-2 gap-6">
            {PRODUCTS.map((p) => {
              const live = p.link !== '#';
              const Tag = live ? 'a' : 'div';
              return (
                <motion.div key={p.id} {...reveal}>
                  <Tag
                    {...(live ? { href: p.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`block h-full bg-ink border border-line rounded-2xl p-6 space-y-3 ${
                      live ? 'hover:border-amber transition-colors' : ''
                    }`}
                  >
                    <div className="flex gap-3 text-sm">
                      <span className="text-amber font-medium">{p.category}</span>
                      <span className="text-mute">· {p.price}</span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">{p.name}</h3>
                    <p className="text-sm text-mute leading-relaxed">{p.description}</p>
                    {live && (
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber">
                        Read <ArrowUpRight className="w-4 h-4" />
                      </span>
                    )}
                  </Tag>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------- FAQ ------------------------------ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.question} className="card">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center gap-4"
                  aria-expanded={activeFaq === i}
                >
                  <span className="font-medium">{f.question}</span>
                  <span className="text-amber text-xl leading-none">{activeFaq === i ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-mute leading-relaxed">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- CONTACT ---------------------------- */}
      <section id="contact" className="py-24 bg-panel border-t border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Start a project"
            title="Let's scope your project"
            sub="Book a call if you want to talk it through, or send the brief and I will come back with a clear plan."
          />
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
            <div id="intake" className="scroll-mt-24">
              <IntakeForm service={service} onServiceChange={setService} />
            </div>

            <div className="space-y-6">
              <div id="book" className="card p-7 space-y-4">
                <div className="w-11 h-11 rounded-xl bg-amber/10 text-amber grid place-items-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Book a discovery call</h3>
                <p className="text-sm text-mute leading-relaxed">
                  A short, no-pressure call to understand your goals, the problem you want solved, and whether I am the
                  right fit. You leave with a clear next step.
                </p>
                <a href={bookingHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                  Pick a time <ArrowUpRight className="w-4 h-4" />
                </a>
                {!SITE.bookingUrl && import.meta.env.DEV && (
                  <p className="font-mono text-xs text-amber">
                    [TODO] set SITE.bookingUrl in constants.tsx. Until then this opens WhatsApp.
                  </p>
                )}
              </div>

              <div className="card p-7 space-y-3">
                <h3 className="eyebrow">Reach me directly</h3>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-amber transition-colors">
                  <MessageSquare className="w-4 h-4" /> WhatsApp · {SITE.whatsappDisplay}
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-sm hover:text-amber transition-colors">
                  <Mail className="w-4 h-4" /> {SITE.email}
                </a>
                <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-amber transition-colors">
                  <Github className="w-4 h-4" /> github.com/sphynick
                </a>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-amber transition-colors">
                  <ArrowUpRight className="w-4 h-4" /> Instagram · {SITE.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-mute">
          <span>© {new Date().getFullYear()} Nick Njau · Software Engineer &amp; AI Systems Builder · Nairobi, Kenya</span>
          <span className="flex gap-5">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-amber">GitHub</a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-amber">Instagram</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-amber">WhatsApp</a>
          </span>
        </div>
      </footer>

      <CaseStudyModal study={openStudy} onClose={closeStudy} onStartSimilar={startSimilar} />
    </div>
  );
};

export default HomePage;
