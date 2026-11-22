import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Github, Play, X } from 'lucide-react';
import { CaseStudy } from '../types';

interface Props {
  study: CaseStudy | null;
  onClose: () => void;
  onStartSimilar: (study: CaseStudy) => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

const CaseStudyModal: React.FC<Props> = ({ study, onClose, onStartSimilar }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!study) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [study, onClose]);

  const labels = study?.featured
    ? { problem: 'The challenge', solution: 'The solution', impact: 'Business value' }
    : { problem: 'Problem', solution: 'Solution', impact: 'Impact' };

  const safeVideo = study?.videoUrl && /^https:\/\//.test(study.videoUrl) ? study.videoUrl : '';

  return (
    <AnimatePresence>
      {study && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            className="relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto bg-white border border-line rounded-t-3xl sm:rounded-3xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close case study"
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 border border-line hover:border-brand hover:text-brand transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`h-24 sm:h-32 bg-gradient-to-br ${study.accent} border-b border-line`} />

            <div className="p-6 sm:p-9 space-y-8">
              <header className="space-y-3">
                <p className="kicker">{study.category}</p>
                <h3 id="case-study-title" className="text-2xl sm:text-4xl font-bold tracking-tight">
                  {study.title}
                </h3>
                <p className="text-body leading-relaxed">{study.summary}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {study.stack.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </header>

              {/* Video walkthrough slot */}
              <div className="rounded-2xl overflow-hidden border border-line bg-soft aspect-video">
                {safeVideo ? (
                  <iframe
                    src={safeVideo}
                    title={`${study.title} walkthrough`}
                    className="w-full h-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-center p-6 border-2 border-dashed border-line">
                    <div className="space-y-2">
                      <Play className="w-8 h-8 mx-auto text-body" />
                      <p className="text-sm text-body">Video walkthrough coming soon</p>
                      {import.meta.env.DEV && (
                        <p className="font-mono text-xs text-brand">
                          [TODO] set videoUrl for “{study.title}” in constants.tsx
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-7">
                <section>
                  <h4 className="kicker mb-2">{labels.problem}</h4>
                  <p className="text-body leading-relaxed">{study.problem}</p>
                </section>
                <section>
                  <h4 className="kicker mb-3">{labels.solution}</h4>
                  <ul className="space-y-2.5">
                    {study.solution.map((s) => (
                      <li key={s} className="flex gap-3 text-body leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h4 className="kicker mb-3">{labels.impact}</h4>
                  <ul className="space-y-2.5">
                    {study.impact.map((s) => (
                      <li key={s} className="flex gap-3 text-body leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 border-t border-line">
                <button onClick={() => onStartSimilar(study)} className="btn btn-primary mt-6">
                  Start a similar project <ArrowRight className="w-4 h-4" />
                </button>
                {study.liveUrl && (
                  <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-6">
                    Visit live site <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
                {study.repoUrl && (
                  <a href={study.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-6">
                    <Github className="w-4 h-4" /> View on GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaseStudyModal;
