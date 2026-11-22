export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  role: string;
  tools: string[];
  impact: string[];
  link: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  link: string;
  colors?: string[];
  sizes?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  /** When true the card is rendered with an "[Editable Placeholder]" badge. */
  isPlaceholder?: boolean;
}

export type ServiceId = 'web-platform' | 'web-app' | 'ai-automation';
export type ServiceChoice = ServiceId | 'not-sure';

export interface ServiceTier {
  id: ServiceId;
  name: string;
  tagline: string;
  bestFor: string;
  deliverables: string[];
  timeline: string;
  icon: 'globe' | 'app' | 'bot';
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  featured?: boolean;
  /** Which service tier "Start a similar project" pre-selects. */
  serviceId: ServiceId;
  summary: string;
  problem: string;
  solution: string[];
  impact: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Embed URL, e.g. https://www.youtube.com/embed/VIDEO_ID. Empty = placeholder slot. */
  videoUrl?: string;
  /** Tailwind gradient classes for the card cover. */
  accent: string;
}
