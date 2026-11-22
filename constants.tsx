import { CaseStudy, FAQItem, Product, ServiceTier, Testimonial } from './types';

/* -------------------------------------------------------------------------- */
/*  SITE SETTINGS — edit these first                                          */
/* -------------------------------------------------------------------------- */
export const SITE = {
  name: 'Nick Njau',
  url: 'https://nicknjau.shop',
  whatsappNumber: '254769504732', // international format, no "+"
  whatsappDisplay: '0769 504 732',
  email: 'sphynick@gmail.com',
  altEmail: 'nicholasnjau22@gmail.com',
  github: 'https://github.com/sphynick',
  instagram: 'https://instagram.com/sphynick',
  instagramHandle: '@sphynick',
  // [TODO] Paste your Cal.com / Calendly link here, e.g. 'https://cal.com/yourname/discovery'.
  // While empty, the "Book a Discovery Call" card opens WhatsApp with a prefilled message.
  bookingUrl: '',
  // [TODO] Optional Formspree (or similar) endpoint. Set VITE_FORM_ENDPOINT in .env.
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? '',
};

export const waLink = (message?: string) =>
  `https://wa.me/${SITE.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

/* -------------------------------------------------------------------------- */
/*  HERO TRUST STRIP                                                          */
/* -------------------------------------------------------------------------- */
export const TRUST_POINTS = [
  'Mobile-first & fast',
  'SEO-ready',
  'Easy for your team to update',
  'M-Pesa & Stripe ready',
  'AI that saves hours',
];

/* -------------------------------------------------------------------------- */
/*  CASE STUDIES (Problem → Solution → Impact)                                */
/*  [TODO] Add real, verified numbers to `impact` where you have them.        */
/* -------------------------------------------------------------------------- */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'prelan-schools',
    title: 'Prelan Junior School',
    client: 'Prelan Junior School, Nairobi',
    category: 'Institutional web platform · Education',
    featured: true,
    serviceId: 'web-platform',
    summary:
      'A fast, mobile-first school website that makes every Kenyan CBE pathway clear to parents, and lets non-technical staff publish updates on their own.',
    problem:
      'Parents research schools on their phones, and the CBE structure, from Crèche and Playgroup through Junior Secondary, is hard to follow on a small screen. The school also needed staff with no technical background to publish news and announcements without waiting on a developer.',
    solution: [
      'Fast, mobile-first architecture so pages load quickly on phones and mobile data.',
      'Clear pathway pages from Crèche/Playgroup through Junior Secondary, with a structured admissions and FAQ flow.',
      'A manageable /news section and an admin dashboard (Firebase / Firestore) where staff publish announcements and update homepage slides themselves.',
    ],
    impact: [
      'A clearer, easier mobile experience for parents researching and applying.',
      'Staff publish updates independently: no developer bottleneck for everyday content.',
      'A school-controlled site that stays fresh because updating it is simple.',
    ],
    stack: ['Mobile-first HTML/JS', 'Firebase / Firestore', 'Admin dashboard', 'SEO'],
    liveUrl: 'https://www.prelanschools.com/',
    // [TODO] Add an embed URL, e.g. 'https://www.youtube.com/embed/VIDEO_ID' or a Loom embed.
    videoUrl: '',
    accent: 'from-[#4f8bff] to-[#1b4fd1]',
  },
  {
    id: 'traceai-space',
    title: 'TraceAI Space',
    client: 'Own product',
    category: 'AI platform · Data tracing',
    serviceId: 'ai-automation',
    summary: 'An AI-powered platform for real-time monitoring and intelligent data tracing.',
    problem:
      'Decentralized ecosystems often lack transparency and real-time observability, so stakeholders struggle to trace how data flows.',
    solution: [
      'An AI-driven tracking interface built with React and Gemini AI.',
      'Data visualisation for complex datasets using D3.js.',
      'A responsive, animated UI with Tailwind CSS and Framer Motion.',
    ],
    impact: [
      'Hard-to-read data flows become something stakeholders can follow at a glance.',
      'Faster analysis through AI-assisted tracing.',
    ],
    stack: ['React', 'Gemini AI', 'D3.js', 'Tailwind CSS'],
    liveUrl: 'https://www.traceai.space/',
    accent: 'from-[#818cf8] to-[#4338ca]',
  },
  {
    id: 'yield-plus',
    title: 'Yield Plus',
    client: 'Own product',
    category: 'Fintech dashboard · Web3',
    serviceId: 'web-app',
    summary: 'A digital asset management and yield optimisation dashboard for modern investors.',
    problem:
      'Investors struggle to optimise returns across fragmented DeFi protocols because yield calculations are complex and scattered.',
    solution: [
      'Real-time yield calculation logic built for accuracy.',
      'A secure monitoring dashboard to track positions in one place.',
      'Built with Next.js, Node.js and Ethers.js.',
    ],
    impact: [
      'One place to monitor positions and compare yields.',
      'Calculation logic tested against simulated assets before real use.',
    ],
    stack: ['Next.js', 'Node.js', 'Web3', 'Ethers.js'],
    liveUrl: 'https://www.yieldplus.online/',
    accent: 'from-[#2dd4bf] to-[#0f766e]',
  },
  {
    id: 'comms-hub',
    title: 'Digital Communications Hub',
    client: 'Youth-led organisations',
    category: 'Workflow automation · NGO',
    serviceId: 'ai-automation',
    summary: 'A central platform for managing social media assets for youth-led organisations.',
    problem:
      'NGOs often lack the budget for high-end social media tools, which leads to fragmented, time-consuming digital campaigns.',
    solution: [
      'A centralised hub for planning and managing content assets.',
      'Automated content distribution across major platforms.',
      'A custom Canva-cloud sync to cut manual asset handling.',
    ],
    impact: [
      'Staff time freed from repetitive posting and file management.',
      'Campaigns consolidated in one place instead of scattered across tools.',
    ],
    stack: ['Next.js', 'Firebase', 'Canva SDK', 'Node.js'],
    repoUrl: 'https://github.com/sphynick', // [TODO] deep-link the exact repo
    accent: 'from-[#38bdf8] to-[#0e7490]',
  },
  {
    id: 'prompt-assistant',
    title: 'AI Prompt Engineer Assistant',
    client: 'Marketers',
    category: 'AI tool · Marketing',
    serviceId: 'ai-automation',
    summary: 'A tool that helps marketers generate stronger copy using tuned LLM prompts.',
    problem:
      'Writing effective AI prompts is a black box for most marketers, so output ends up generic and low quality.',
    solution: [
      'Specialised prompt structures tuned for marketing copy.',
      'Built on LLM APIs (Gemini, OpenAI) with a simple React front end.',
    ],
    impact: [
      'Higher-quality, more consistent marketing copy.',
      'Marketers get usable results without prompt-engineering skills.',
    ],
    stack: ['Gemini API', 'OpenAI', 'Node.js', 'React'],
    repoUrl: 'https://github.com/sphynick', // [TODO] deep-link the exact repo
    accent: 'from-[#1b4fd1] to-[#0c1a3d]',
  },
];

/* -------------------------------------------------------------------------- */
/*  SERVICE TIERS                                                             */
/*  [TODO] Confirm timelines match what you can deliver.                      */
/* -------------------------------------------------------------------------- */
export const SERVICES: ServiceTier[] = [
  {
    id: 'web-platform',
    name: 'Business & Institutional Web Platforms',
    tagline: 'Fast, mobile-first websites that win trust and enquiries.',
    bestFor:
      'Schools, clinics, SMEs and NGOs that need a credible site, a clear enquiry or admissions flow, and a team that can update content without a developer.',
    deliverables: [
      'Mobile-first, fast-loading design',
      'SEO-ready structure, metadata and schema',
      'Easy admin/CMS so your team publishes news and updates',
      'Admissions or enquiry flow with FAQ',
      'WhatsApp and contact integration',
      'Handover and staff walkthrough',
    ],
    timeline: '2–4 weeks',
    icon: 'globe',
  },
  {
    id: 'web-app',
    name: 'Custom Web Apps & Portals',
    tagline: 'Dashboards and tools that run the day-to-day of your business.',
    bestFor:
      'Teams outgrowing spreadsheets: booking and management tools, client or staff portals, and anyone who needs to take payments online.',
    deliverables: [
      'Scoped requirements and a clear build plan',
      'Custom dashboard or portal with user roles',
      'Booking and management workflows',
      'M-Pesa and Stripe payment integrations',
      'Secure sign-in and database (Firebase or similar)',
      'Deployment, documentation and handover',
    ],
    timeline: '4–8 weeks',
    icon: 'app',
  },
  {
    id: 'ai-automation',
    name: 'AI Agents & Workflow Automation',
    tagline: 'Assistants and automations that give your team hours back each week.',
    bestFor:
      'Businesses and institutions buried in repetitive questions, documents and follow-ups that a well-built assistant or workflow can handle.',
    deliverables: [
      'FAQ and document assistant trained on your content',
      'Lead capture and qualification flows',
      'Workflow automation across forms, email, WhatsApp and sheets',
      'Human hand-off rules and guardrails',
      'Short usage guide for your team',
    ],
    timeline: '2–6 weeks',
    icon: 'bot',
  },
];

/* -------------------------------------------------------------------------- */
/*  TESTIMONIALS — [TODO] replace placeholders with real client quotes        */
/*  Set isPlaceholder to false once a slot has a real quote.                  */
/* -------------------------------------------------------------------------- */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'Paste a real client quote here: one or two sentences about the result they got.',
    author: '[Client name]',
    role: '[Role]',
    company: '[Organisation]',
    isPlaceholder: true,
  },
  {
    id: 't2',
    quote: 'Paste a real client quote here: what changed for their team after the project.',
    author: '[Client name]',
    role: '[Role]',
    company: '[Organisation]',
    isPlaceholder: true,
  },
  {
    id: 't3',
    quote: 'Paste a real client quote here: what it was like to work with you.',
    author: '[Client name]',
    role: '[Role]',
    company: '[Organisation]',
    isPlaceholder: true,
  },
];

/* -------------------------------------------------------------------------- */
/*  WRITING & UPDATES                                                         */
/* -------------------------------------------------------------------------- */
export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Ikigai: The Book Review',
    description:
      'A deep dive into finding purpose through the lens of a developer and tradesperson. A reflection on long-term fulfilment.',
    price: 'Free read',
    category: 'Book review',
    imageUrl: '',
    link: 'https://nicholasgachuhi.blogspot.com/2024/01/ikigai-book-review.html',
  },
  {
    id: 'p2',
    name: "Kaspa's Standard",
    description:
      'An upcoming exploration of digital standards, efficiency and the future of decentralised systems.',
    price: 'Coming soon',
    category: 'Upcoming publication',
    imageUrl: '',
    link: '#',
  },
];

// Kept so pages/hoodies-page.tsx (currently not routed) still type-checks.
export const HOODIES: Product[] = [];

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */
export const FAQS: FAQItem[] = [
  {
    question: 'How do we get started?',
    answer:
      'Fill in the project intake form or book a discovery call. I will review your goals, confirm scope and timeline, and send a clear proposal before any work begins.',
  },
  {
    question: 'Can our non-technical staff update the website?',
    answer:
      'Yes. Web platforms are built with an easy admin area so your team can publish news, announcements and key content without a developer. A short walkthrough is part of handover.',
  },
  {
    question: 'How is pricing decided?',
    answer:
      'Every project is scoped after a short discovery conversation. The budget range in the intake form helps me recommend a realistic package for you.',
  },
  {
    question: 'Do you work with clients outside Nairobi?',
    answer:
      'Yes. I am based in Nairobi and work with businesses and institutions in Kenya and remotely with teams elsewhere.',
  },
  {
    question: 'Are your projects open source?',
    answer:
      'Some personal and community projects are on my GitHub profile. Client work stays private unless the client agrees otherwise.',
  },
];

/* -------------------------------------------------------------------------- */
/*  ABOUT STATS (all derived from content on this page)                       */
/* -------------------------------------------------------------------------- */
export const STATS: { label: string; value?: number; prefix?: string; suffix?: string; display?: string }[] = [
  { value: CASE_STUDIES.length, label: 'Case studies' },
  { value: SERVICES.length, label: 'Service packages' },
  { value: 24, prefix: '<', suffix: 'h', label: 'Typical first reply' },
  { display: '2–4 wks', label: 'Typical web platform launch' },
];

/* -------------------------------------------------------------------------- */
/*  PROCESS — [TODO] edit to match how you actually work                      */
/* -------------------------------------------------------------------------- */
export const PROCESS: { step: string; title: string; text: string }[] = [
  {
    step: '01',
    title: 'Discover',
    text: 'We talk through your goals, users and constraints. You get a clear scope, timeline and proposal before any work begins.',
  },
  {
    step: '02',
    title: 'Build',
    text: 'I design and build in short cycles, sharing working previews so you can give feedback early and nothing surprises you at the end.',
  },
  {
    step: '03',
    title: 'Launch & hand over',
    text: 'Go-live, a walkthrough for your team, and documentation, so you can run and update everything without a developer.',
  },
];
