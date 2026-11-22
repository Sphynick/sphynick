import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SITE } from '../constants';

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-3">
    <h2 className="text-xl font-extrabold">{title}</h2>
    <div className="space-y-3 leading-relaxed">{children}</div>
  </section>
);

const PrivacyPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-10">
    <div>
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-brand mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to home
      </Link>
      <p className="kicker mb-3">Legal</p>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy notice</h1>
      <p className="mt-3 text-sm">Last updated: November 2026</p>
    </div>

    <Block title="Who I am">
      <p>
        This website (nicknjau.shop) is run by Nick Njau, Nairobi, Kenya. For anything in this notice, contact{' '}
        <a href={`mailto:${SITE.email}`} className="text-brand font-bold underline">{SITE.email}</a>.
      </p>
    </Block>

    <Block title="What I collect and why">
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong className="text-navy">Project enquiry form:</strong> name, organization, email or WhatsApp number,
          project type, timeline, budget range and project summary. I use this only to reply to your enquiry and scope
          your project.
        </li>
        <li>
          <strong className="text-navy">Updates signup:</strong> your email address, used to send occasional updates
          about new case studies and writing.
        </li>
        <li>
          <strong className="text-navy">Chat assistant:</strong> the messages you type are sent to Google&apos;s Gemini
          service to generate a reply. Please do not share sensitive personal information in the chat.
        </li>
      </ul>
    </Block>

    <Block title="Who else handles your data">
      <p>
        If you choose WhatsApp or email, your message is handled by those services under their own policies. If a form
        service is configured on this site, your submission is processed by that provider on my behalf. The page also
        loads fonts and scripts from third-party servers (Google Fonts and the Tailwind CDN), which receive your IP
        address as part of normal web requests. I do not sell your data.
      </p>
    </Block>

    <Block title="Cookies">
      <p>This site does not set its own cookies or run advertising trackers.</p>
    </Block>

    <Block title="How long I keep it">
      <p>
        Enquiry details are kept for as long as needed to discuss and deliver a project, and for a reasonable period
        after for records. You can ask me to delete your details at any time.
      </p>
    </Block>

    <Block title="Your rights">
      <p>
        Under Kenya&apos;s Data Protection Act, 2019, you can ask to see, correct or delete the personal data I hold
        about you, and you can withdraw consent to updates emails at any time. Email me and I will respond promptly.
      </p>
    </Block>
  </div>
);

export default PrivacyPage;
