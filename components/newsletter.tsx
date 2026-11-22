import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SITE } from '../constants';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');

    if (!SITE.formEndpoint) {
      // No endpoint configured: fall back to a prefilled email to Nick.
      const subject = encodeURIComponent('Subscribe me to updates');
      const body = encodeURIComponent(`Please add ${email.trim()} to your updates list.`);
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email: email.trim() }),
      });
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      setStatus('sent');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section className="bg-brand text-white" aria-labelledby="newsletter-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="kicker kicker-light mb-3">Stay in the loop</p>
          <h2 id="newsletter-heading" className="text-2xl sm:text-3xl font-extrabold text-white">
            New case studies and writing, occasionally.
          </h2>
          <p className="mt-3 text-[#dbe6ff]">Short updates on projects, lessons learned and useful tools. No spam.</p>
        </div>

        <form onSubmit={submit} noValidate>
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="nl-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              aria-invalid={!!error}
              aria-describedby="nl-msg"
              className="field !border-transparent flex-1"
            />
            <button type="submit" disabled={status === 'sending'} className="btn btn-white disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Subscribe'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }} aria-hidden="true">
            <label>
              Leave empty
              <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </label>
          </div>
          <div id="nl-msg" role="status" aria-live="polite" className="mt-3 text-sm min-h-[1.25rem]">
            {error && <span className="text-white font-semibold">{error}</span>}
            {status === 'sent' && (
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <Check className="w-4 h-4" /> Thanks, you&apos;re on the list.
              </span>
            )}
            {status === 'error' && <span className="font-semibold">That did not go through. Please try again.</span>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
