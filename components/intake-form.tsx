import React, { useState } from 'react';
import { Check, Send } from 'lucide-react';
import { SERVICES, SITE, waLink } from '../constants';
import { ServiceChoice } from '../types';

const TIMELINES = ['As soon as possible', 'Within 1 month', '1–2 months', '3+ months', 'Flexible / not sure'];
const BUDGETS = [
  'Under KES 50,000',
  'KES 50,000 – 150,000',
  'KES 150,000 – 400,000',
  'KES 400,000+',
  'Not sure, advise me',
];

interface Props {
  service: ServiceChoice;
  onServiceChange: (s: ServiceChoice) => void;
}

interface Fields {
  name: string;
  organization: string;
  contact: string;
  timeline: string;
  budget: string;
  summary: string;
}

const EMPTY: Fields = { name: '', organization: '', contact: '', timeline: '', budget: '', summary: '' };
type Status = 'idle' | 'sending' | 'sent' | 'handoff' | 'error';

const serviceLabel = (s: ServiceChoice) =>
  s === 'not-sure' ? 'Not sure yet' : SERVICES.find((x) => x.id === s)?.name ?? s;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = (v: string) => /^[+\d][\d\s()-]+$/.test(v) && v.replace(/\D/g, '').length >= 9 && v.replace(/\D/g, '').length <= 15;

const IntakeForm: React.FC<Props> = ({ service, onServiceChange }) => {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  const buildMessage = () =>
    [
      'New project enquiry (nicknjau.shop)',
      `Name: ${fields.name}`,
      `Organization: ${fields.organization || '-'}`,
      `Contact: ${fields.contact}`,
      `Project type: ${serviceLabel(service)}`,
      `Timeline: ${fields.timeline || '-'}`,
      `Budget: ${fields.budget || '-'}`,
      `Summary: ${fields.summary}`,
    ].join('\n');

  const validate = () => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) e.name = 'Please tell me your name.';
    const c = fields.contact.trim();
    if (!c) e.contact = 'Add an email or WhatsApp number.';
    else if (!isEmail(c) && !isPhone(c)) e.contact = 'Enter a valid email or phone/WhatsApp number.';
    if (fields.summary.trim().length < 15) e.summary = 'A couple of sentences about the project helps a lot.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (honeypot) return; // bots fill the hidden field
    if (!validate()) return;

    const message = buildMessage();

    if (SITE.formEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(SITE.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: fields.name,
            organization: fields.organization,
            contact: fields.contact,
            projectType: serviceLabel(service),
            timeline: fields.timeline,
            budget: fields.budget,
            summary: fields.summary,
            message,
          }),
        });
        if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
        setStatus('sent');
        setFields(EMPTY);
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
      return;
    }

    // No endpoint configured: hand the brief to WhatsApp (synchronous so popup blockers allow it).
    window.open(waLink(message), '_blank', 'noopener,noreferrer');
    setStatus('handoff');
  };

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent('Project enquiry')}&body=${encodeURIComponent(buildMessage())}`;

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`err-${k}`} className="text-xs text-red-600 mt-1.5">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={submit} noValidate className="card p-6 sm:p-8 space-y-5" aria-labelledby="intake-heading">
      <div>
        <h3 id="intake-heading" className="text-xl font-bold tracking-tight">
          Tell me about your project
        </h3>
        <p className="text-sm text-body mt-1">Takes about two minutes. I reply within one business day.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="f-name" className="label">Your name *</label>
          <input id="f-name" className="field" value={fields.name} onChange={set('name')} autoComplete="name"
            aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} />
          {err('name')}
        </div>
        <div>
          <label htmlFor="f-org" className="label">Organization</label>
          <input id="f-org" className="field" value={fields.organization} onChange={set('organization')} autoComplete="organization" />
        </div>
      </div>

      <div>
        <label htmlFor="f-contact" className="label">Email or WhatsApp *</label>
        <input id="f-contact" className="field" value={fields.contact} onChange={set('contact')}
          placeholder="you@company.com or 07XX XXX XXX" autoComplete="email"
          aria-invalid={!!errors.contact} aria-describedby={errors.contact ? 'err-contact' : undefined} />
        {err('contact')}
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="f-type" className="label">Project type</label>
          <select id="f-type" className="field" value={service} onChange={(e) => onServiceChange(e.target.value as ServiceChoice)}>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="f-timeline" className="label">Timeline</label>
          <select id="f-timeline" className="field" value={fields.timeline} onChange={set('timeline')}>
            <option value="">Select…</option>
            {TIMELINES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="f-budget" className="label">Budget range</label>
          <select id="f-budget" className="field" value={fields.budget} onChange={set('budget')}>
            <option value="">Select…</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="f-summary" className="label">Project summary *</label>
        <textarea id="f-summary" rows={5} className="field resize-y" value={fields.summary} onChange={set('summary')}
          placeholder="What are you trying to achieve? Who is it for? What is not working today?"
          aria-invalid={!!errors.summary} aria-describedby={errors.summary ? 'err-summary' : undefined} />
        {err('summary')}
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
        <label>
          Leave this empty
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : SITE.formEndpoint ? 'Send project brief' : 'Send brief via WhatsApp'}
        <Send className="w-4 h-4" />
      </button>

      <div role="status" aria-live="polite">
        {status === 'sent' && (
          <p className="flex items-start gap-2 text-sm text-emerald-700">
            <Check className="w-4 h-4 mt-0.5 shrink-0" /> Thanks. Your brief is in and I will reply within one business day.
          </p>
        )}
        {status === 'handoff' && (
          <p className="text-sm text-emerald-700">
            WhatsApp opened with your brief prefilled. Press send there to finish. Prefer email?{' '}
            <a href={mailto} className="underline">Send it by email instead</a>.
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-600">
            That did not go through. Please{' '}
            <a href={waLink(buildMessage())} target="_blank" rel="noopener noreferrer" className="underline">send it on WhatsApp</a>{' '}
            or <a href={mailto} className="underline">by email</a>.
          </p>
        )}
      </div>
    </form>
  );
};

export default IntakeForm;
