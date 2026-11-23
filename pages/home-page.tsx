import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Github,
  Globe,
  LayoutDashboard,
  Mail,
  MessageSquare,
} from 'lucide-react';
import {
  CASE_STUDIES,
  FAQS,
  PROCESS,
  PRODUCTS,
  SERVICES,
  SITE,
  STATS,
  TESTIMONIALS,
  TRUST_POINTS,
  waLink,
} from '../constants';
import { CaseStudy, ServiceChoice, ServiceId, ServiceTier } from '../types';
import CaseStudyModal from '../components/case-study-modal';
import IntakeForm from '../components/intake-form';
import AnimatedNumber from '../components/animated-number';
import Newsletter from '../components/newsletter';
import { SECTION_BY_PATH, scrollToId } from '../lib/scroll';

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
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4, ease: 'easeOut' as const },
};

const SectionHeading: React.FC<{ kicker: string; title: string; sub?: string; center?: boolean }> = ({
  kicker,
  title,
  sub,
  center,
}) => (
  <div className={`max-w-2xl mb-12 ${center ? 'mx-auto text-center' : ''}`}>
    <p className="kicker mb-3">{kicker}</p>
    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{title}</h2>
    {sub && <p className="mt-4 leading-relaxed">{sub}</p>}
  </div>
);

/** Portrait slot. Drop your photo at public/nick-portrait.jpg; until then initials show. */
const Portrait: React.FC = () => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border-2 border-white/30" aria-hidden="true" />
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-brand-dark border border-white/20">
        {failed ? (
          <div className="w-full h-full grid place-items-center text-8xl font-extrabold text-white/90">NN</div>
        ) : (
          <img
            src="/nick-portrait.jpg"
            alt="Portrait of Nick Njau"
            width={640}
            height={800}
            className="w-full h-full object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [openStudy, setOpenStudy] = useState<CaseStudy | null>(null);
  const [service, setService] = useState<ServiceChoice>('web-platform');
  const sliderRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Clean section URLs (/work, /contact...) scroll to their section.
  useEffect(() => {
    const id = SECTION_BY_PATH[pathname];
    if (!id) return;
    const t = window.setTimeout(() => scrollToId(id), 60);
    return () => window.clearTimeout(t);
  }, [pathname]);

  const closeStudy = useCallback(() => setOpenStudy(null), []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (pathname === path) scrollToId(SECTION_BY_PATH[path]);
    else navigate(path);
  };

  const chooseService = (id: ServiceId) => {
    setService(id);
    window.setTimeout(() => scrollToId('intake'), 30);
  };

  const startSimilar = (study: CaseStudy) => {
    setOpenStudy(null);
    chooseService(study.serviceId);
  };

  const slide = (dir: 1 | -1) =>
    sliderRef.current?.scrollBy({ left: dir * 380, behavior: 'smooth' });

  const featured = CASE_STUDIES.find((c) => c.featured) ?? CASE_STUDIES[0];
  const bookingHref = SITE.bookingUrl || waLink("Hi Nick, I'd like to book a discovery call.");

  return (
    <div>
      {/* ------------------------------ INTRO ----------------------------- */}
      <section className="bg-brand text-white relative overflow-hidden">
        <div className="absolute -right-32 -top-32 w-[28rem] h-[28rem] rounded-full bg-white/5" aria-hidden="true" />
        <div className="absolute -left-24 bottom-0 w-72 h-72 rounded-full bg-white/5" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16 md:pt-20 md:pb-24 grid md:grid-cols-[1.25fr_1fr] gap-14 items-center">
          <div>
            <p className="kicker kicker-light mb-5">Software Engineer &amp; AI Systems Builder · Nairobi</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] text-white">
              Websites, apps and AI systems that grow revenue and cut manual work.
            </h1>
            <p className="mt-6 text-lg text-brand-light max-w-xl leading-relaxed">
              I&apos;m Nick Njau. I help businesses and institutions increase revenue and admissions and automate
              operations, with software their teams can actually run.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="/contact" onClick={(e) => go(e, '/contact')} className="btn btn-white">
                <Calendar className="w-4 h-4" /> Book a Discovery Call
              </a>
              <a href="/work" onClick={(e) => go(e, '/work')} className="btn btn-outline-light">
                See Case Studies <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-brand-light">
              {TRUST_POINTS.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-white" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <Portrait />
        </div>

        <button
          onClick={() => setOpenStudy(featured)}
          className="relative w-full bg-brand-dark hover:bg-[#10328a] transition-colors text-left"
          aria-label={`Open featured case study: ${featured.title}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span>
              <span className="kicker kicker-light mr-3">Featured</span>
              <span className="font-bold text-white">{featured.title}</span>
              <span className="text-brand-light"> · a mobile-first school site staff update themselves</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-bold text-white">
              View case study <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </button>
      </section>

      {/* ------------------------------ ABOUT ----------------------------- */}
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <SectionHeading kicker="About" title="Engineering that answers to the business" />
              <motion.div {...reveal} className="space-y-5 leading-relaxed -mt-4">
                <p>
                  I&apos;m <strong className="text-navy">Nick Njau</strong>, a software engineer and AI systems
                  builder in Nairobi. I started out helping NGOs grow their digital reach, which taught me that the best
                  technology is the kind people barely notice because it just works.
                </p>
                <p>
                  Today I build fast web platforms, custom apps and AI workflows. I measure the work by what it does for
                  you: more enquiries and admissions, fewer repetitive tasks, and a team that can run things without
                  waiting on a developer.
                </p>
                <p>Outside the screen: chess, long-form writing, and fixing things with my hands.</p>
              </motion.div>
              <motion.div {...reveal} className="mt-8 space-y-4">
                {STACK_GROUPS.map((g) => (
                  <div key={g.label} className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-navy w-full sm:w-36">{g.label}</span>
                    {g.items.map((i) => <span key={i} className="chip">{i}</span>)}
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <motion.div key={s.label} {...reveal} className="bg-brand text-white rounded-xl p-6 sm:p-8">
                  <div className="text-4xl sm:text-5xl font-extrabold text-white">
                    {s.display ? s.display : <AnimatedNumber to={s.value ?? 0} prefix={s.prefix} suffix={s.suffix} />}
                  </div>
                  <div className="mt-2 text-sm text-brand-light leading-snug">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------- WORK ----------------------------- */}
      <section id="work" className="py-24 bg-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-2">
            <SectionHeading
              kicker="Selected work"
              title="Case studies"
              sub="Each project follows the same story: the problem, how I solved it, and what changed for the people using it."
            />
            <div className="flex gap-2 mb-12">
              <button onClick={() => slide(-1)} aria-label="Previous projects" className="w-11 h-11 rounded-full border-2 border-brand text-brand grid place-items-center hover:bg-brand hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => slide(1)} aria-label="Next projects" className="w-11 h-11 rounded-full border-2 border-brand text-brand grid place-items-center hover:bg-brand hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-width slider */}
        <div
          ref={sliderRef}
          className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 sm:px-6 pb-2"
          style={{ paddingLeft: 'max(1rem, calc((100vw - 72rem) / 2 + 1.5rem))', paddingRight: '1.5rem' }}
          role="list"
          aria-label="Case studies"
        >
          {CASE_STUDIES.map((p) => (
            <button
              key={p.id}
              role="listitem"
              onClick={() => setOpenStudy(p)}
              className={`group snap-start shrink-0 w-[82%] sm:w-[380px] h-[440px] relative rounded-xl overflow-hidden text-left text-white bg-gradient-to-b ${p.accent}`}
            >
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/30 transition-colors" />
              <div className="relative h-full p-7 flex flex-col justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  {p.featured && <span className="chip !bg-white !text-brand">Flagship</span>}
                  <span className="text-[11px] font-extrabold uppercase tracking-widest bg-black/30 rounded px-2 py-1">
                    {p.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/95 leading-relaxed line-clamp-3">{p.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 3).map((t) => (
                      <span key={t} className="text-[11px] font-bold bg-white/20 rounded-full px-2.5 py-0.5">{t}</span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold">
                    View case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="mt-8 text-sm">
            More projects and experiments on{' '}
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="text-brand font-bold underline underline-offset-4 inline-flex items-center gap-1">
              GitHub <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            .
          </p>
        </div>
      </section>

      {/* ------------------------------ PROCESS --------------------------- */}
      <section id="process" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            center
            kicker="How it works"
            title="A simple, predictable process"
            sub="No surprises: you know what happens next at every stage."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {PROCESS.map((p) => (
              <motion.div key={p.step} {...reveal} className="card p-8 relative overflow-hidden">
                <span className="absolute -top-2 right-4 text-8xl font-extrabold text-brand/10 select-none" aria-hidden="true">
                  {p.step}
                </span>
                <p className="kicker mb-3">Step {p.step}</p>
                <h3 className="text-xl font-extrabold">{p.title}</h3>
                <p className="mt-3 leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- SERVICES --------------------------- */}
      <section id="services" className="py-24 bg-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            center
            kicker="Services"
            title="Three clear ways to work together"
            sub="Pick the package closest to your goal. Every project is scoped on a short discovery call before any work starts."
          />
          <div className="grid lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <motion.article key={s.id} {...reveal} className="card p-8 flex flex-col">
                  <div className="w-12 h-12 rounded-lg bg-brand text-white grid place-items-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold">{s.name}</h3>
                  <p className="mt-2 leading-relaxed">{s.tagline}</p>

                  <div className="mt-6">
                    <h4 className="kicker mb-2">Best for</h4>
                    <p className="text-sm leading-relaxed">{s.bestFor}</p>
                  </div>

                  <div className="mt-6">
                    <h4 className="kicker mb-3">Deliverables</h4>
                    <ul className="space-y-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex gap-2.5 text-sm">
                          <Check className="w-4 h-4 mt-0.5 text-brand shrink-0" /> {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 border-t border-line flex items-center justify-between text-sm">
                    <span>Typical timeline</span>
                    <span className="font-extrabold text-navy">{s.timeline}</span>
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

      {/* --------------------------- TESTIMONIALS ------------------------- */}
      <section id="testimonials" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading center kicker="Client words" title="What clients say" />
          <div className="flex flex-wrap justify-center gap-6">
            {TESTIMONIALS.map((t) => (
              <motion.figure
                key={t.id}
                {...reveal}
                className={`rounded-xl p-7 flex flex-col gap-5 bg-white w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] ${
                  t.isPlaceholder ? 'border-2 border-dashed border-brand/50' : 'border border-line shadow-sm'
                }`}
              >
                {t.isPlaceholder && (
                  <span className="self-start text-xs font-bold text-yellow-900 bg-yellow-100 px-2 py-1 rounded">
                    [Editable Placeholder]
                  </span>
                )}
                <blockquote className="leading-relaxed text-navy">“{t.quote}”</blockquote>
                <figcaption className="text-sm mt-auto">
                  <span className="font-extrabold text-navy">{t.author}</span>
                  <span> · {t.role}, {t.company}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------- WRITING & UPDATES ---------------------- */}
      <section id="updates" className="py-24 bg-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading kicker="Writing & updates" title="Notes and publications" />
          <div className="grid md:grid-cols-2 gap-6">
            {PRODUCTS.map((p) => {
              const live = p.link !== '#';
              const Tag = live ? 'a' : 'div';
              return (
                <motion.div key={p.id} {...reveal}>
                  <Tag
                    {...(live ? { href: p.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`card block h-full p-7 space-y-3 ${live ? 'hover:border-brand transition-colors' : ''}`}
                  >
                    <div className="flex gap-3 text-sm">
                      <span className="text-brand font-extrabold">{p.category}</span>
                      <span>· {p.price}</span>
                    </div>
                    <h3 className="text-lg font-extrabold">{p.name}</h3>
                    <p className="text-sm leading-relaxed">{p.description}</p>
                    {live && (
                      <span className="inline-flex items-center gap-1 text-sm font-extrabold text-brand">
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

      {/* -------------------------------- FAQ ----------------------------- */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading center kicker="FAQ" title="Common questions" />
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.question} className="card">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center gap-4"
                  aria-expanded={activeFaq === i}
                >
                  <span className="font-extrabold text-navy">{f.question}</span>
                  <span className="text-brand text-2xl leading-none">{activeFaq === i ? '−' : '+'}</span>
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
                      <p className="px-6 pb-5 text-sm leading-relaxed">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ CONTACT --------------------------- */}
      <section id="contact" className="py-24 bg-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            kicker="Start a project"
            title="Let's scope your project"
            sub="Book a call if you want to talk it through, or send the brief and I will come back with a clear plan."
          />
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
            <div id="intake" className="scroll-mt-24">
              <IntakeForm service={service} onServiceChange={setService} />
            </div>

            <div className="space-y-6">
              <div id="book" className="bg-brand text-white rounded-xl p-8 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-white/15 grid place-items-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-white">Book a discovery call</h3>
                <p className="text-sm text-brand-light leading-relaxed">
                  A short, no-pressure call to understand your goals, the problem you want solved, and whether I am the
                  right fit. You leave with a clear next step.
                </p>
                <a href={bookingHref} target="_blank" rel="noopener noreferrer" className="btn btn-white w-full">
                  Pick a time <ArrowUpRight className="w-4 h-4" />
                </a>
                {!SITE.bookingUrl && import.meta.env.DEV && (
                  <p className="text-xs font-bold text-yellow-200">
                    [TODO] set SITE.bookingUrl in constants.tsx. Until then this opens WhatsApp.
                  </p>
                )}
              </div>

              <div className="card p-8 space-y-3">
                <h3 className="kicker">Reach me directly</h3>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-bold text-navy hover:text-brand transition-colors">
                  <MessageSquare className="w-4 h-4" /> WhatsApp · {SITE.whatsappDisplay}
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-sm font-bold text-navy hover:text-brand transition-colors">
                  <Mail className="w-4 h-4" /> {SITE.email}
                </a>
                <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-bold text-navy hover:text-brand transition-colors">
                  <Github className="w-4 h-4" /> github.com/sphynick
                </a>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-bold text-navy hover:text-brand transition-colors">
                  <ArrowUpRight className="w-4 h-4" /> Instagram · {SITE.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

      <CaseStudyModal study={openStudy} onClose={closeStudy} onStartSimilar={startSimilar} />
    </div>
  );
};

export default HomePage;
