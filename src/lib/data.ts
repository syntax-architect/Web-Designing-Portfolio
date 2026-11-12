/** Central content model for the VELTRIX DIGITAL site. */

export type ProjectCategory = 'saas' | 'ecommerce' | 'local';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  summary: string;
  stack: string[];
  result: string;
  mock: 'dashboard' | 'commerce' | 'landing';
  from: string;
  to: string;
}

export const CATEGORY_TABS = [
  { id: 'all', label: 'All' },
  { id: 'saas', label: 'SaaS & Web Apps' },
  { id: 'ecommerce', label: 'E-Commerce & Brands' },
  { id: 'local', label: 'Local & High-Ticket Services' },
] as const;

export const PROJECTS: Project[] = [
  {
    id: 'nimbus',
    title: 'Nimbus Analytics',
    category: 'saas',
    categoryLabel: 'SaaS Platform',
    year: '2026',
    summary:
      'Realtime product-analytics suite with streaming dashboards, seat-based billing and a sub-second query engine.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Framer Motion'],
    result: '+240% organic traffic',
    mock: 'dashboard',
    from: '#147D7C',
    to: '#6FB5B3',
  },
  {
    id: 'aurelia',
    title: 'Aurelia Atelier',
    category: 'ecommerce',
    categoryLabel: 'Luxury E-Commerce',
    year: '2025',
    summary:
      'Headless storefront for a couture house — cinematic product reveals, 3D lookbook and one-tap checkout.',
    stack: ['Shopify Hydrogen', 'Tailwind CSS', 'GSAP', 'Sanity'],
    result: '+168% conversion rate',
    mock: 'commerce',
    from: '#FF6B4A',
    to: '#FF9E7A',
  },
  {
    id: 'sterling',
    title: 'Sterling & Co. Realty',
    category: 'local',
    categoryLabel: 'High-Ticket Local',
    year: '2025',
    summary:
      'Lead engine for a luxury brokerage — neighbourhood landing pages, schema-rich listings and instant valuation funnels.',
    stack: ['Astro', 'TypeScript', 'Schema.org', 'GA4'],
    result: 'Rank #1 — “luxury realtor austin”',
    mock: 'landing',
    from: '#0F3D3E',
    to: '#2C6E6D',
  },
  {
    id: 'fluxboard',
    title: 'Fluxboard',
    category: 'saas',
    categoryLabel: 'B2B SaaS',
    year: '2024',
    summary:
      'Ops-command dashboard unifying six data sources into one reactive canvas with drag-and-drop reporting.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'WebSocket'],
    result: '0.4s first contentful paint',
    mock: 'dashboard',
    from: '#FF8A5C',
    to: '#FF6B4A',
  },
  {
    id: 'marrow',
    title: 'Marrow Coffee Roasters',
    category: 'ecommerce',
    categoryLabel: 'DTC Brand',
    year: '2025',
    summary:
      'Direct-to-consumer storefront with subscription flows, brew-guides and a flavour-profile recommender.',
    stack: ['Next.js', 'Stripe', 'Sanity', 'Framer Motion'],
    result: '2.1× average order value',
    mock: 'commerce',
    from: '#2C6E6D',
    to: '#FF8A5C',
  },
  {
    id: 'apex',
    title: 'Apex Dental Studio',
    category: 'local',
    categoryLabel: 'Local Practice',
    year: '2024',
    summary:
      'Trust-first practice site with online booking, insurance checker and location SEO for three clinics.',
    stack: ['Next.js', 'Tailwind CSS', 'OpenGraph', 'GSC'],
    result: '+92% booked calls',
    mock: 'landing',
    from: '#147D7C',
    to: '#FF6B4A',
  },
];

export interface Service {
  id: string;
  index: string;
  title: string;
  body: string;
  points: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'apps',
    index: '01',
    title: 'Custom Web Applications',
    body: 'Ultra-responsive, dynamic interfaces engineered with zero bloated code — every interaction deliberate, every millisecond accounted for.',
    points: ['Reactive UI frameworks', 'Scalable data layers', 'Sub-second budgets'],
  },
  {
    id: 'portals',
    index: '02',
    title: 'High-Conversion Business Portals',
    body: 'Tailor-made for local giants, service businesses and personal brands that need instant trust and airtight lead capture.',
    points: ['Trust-first layouts', 'Lead-capture funnels', 'Instant-load portals'],
  },
  {
    id: 'seo',
    index: '03',
    title: 'Google Domination & Technical SEO',
    body: 'Schema markup injection, semantic HTML5, localized SEO structures and dynamic OpenGraph tagging engineered to hit Google Page 1.',
    points: ['JSON-LD schema', 'Local SEO silos', 'Dynamic OG tagging'],
  },
  {
    id: 'motion',
    index: '04',
    title: 'Interactive 3D & Micro-Experience Design',
    body: 'Spring-physics motion and immersive micro-experiences that keep bounce rates near zero — without sacrificing mobile performance.',
    points: ['Spring-physics motion', 'Scroll choreography', 'Mobile-safe 3D'],
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  body: string;
}

export const PROCESS: ProcessStep[] = [
  {
    index: '01',
    title: 'Discovery & Keyword Architecture',
    body: 'Deep competitor audits and search-intent mapping. We chart exactly what your buyers type into Google before a single pixel is drawn.',
  },
  {
    index: '02',
    title: 'High-Fidelity Interactive Prototype',
    body: 'Interactive design iterations approved by you — real motion, real states, real device testing before production begins.',
  },
  {
    index: '03',
    title: 'Clean-Code Production',
    body: 'Handcrafted, modular code optimized for Core Web Vitals. No page-builder bloat, no plugin roulette, no technical debt handed to you.',
  },
  {
    index: '04',
    title: 'Launch, Index & Scale',
    body: 'Full Google Search Console verification, sitemap indexing, analytics deployment and a scaling roadmap for the quarters ahead.',
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Veltrix rebuilt our platform in six weeks. Organic traffic is up 240% and the dashboard finally feels instant. They operate like a product team, not a vendor.',
    name: 'Elena Marsh',
    role: 'CEO',
    company: 'Nimbus Analytics',
    metric: '+240% organic traffic',
  },
  {
    quote:
      'The storefront is cinema. Conversion nearly tripled and customers literally email us about the website. Worth every cent — twice.',
    name: 'Céleste Duarte',
    role: 'Founder',
    company: 'Aurelia Atelier',
    metric: '+168% conversion',
  },
  {
    quote:
      'We went from page four to the number-one spot for our money keyword. High-ticket clients now call us instead of the other way around.',
    name: 'James Sterling',
    role: 'Managing Partner',
    company: 'Sterling & Co. Realty',
    metric: 'Rank #1 money keyword',
  },
  {
    quote:
      'Our booking calls rose 92% in the first quarter. The site loads instantly, ranks locally, and patients compliment it weekly.',
    name: 'Dr. Priya Nandakumar',
    role: 'Clinical Director',
    company: 'Apex Dental Studio',
    metric: '+92% booked calls',
  },
];

export const COMPARISON_ROWS: Array<[string, string, string, string]> = [
  ['Median load time', '< 0.6 s', '2 – 4 s', '3 s +'],
  ['Codebase', '100% bespoke, handcrafted', 'Hybrid, plugin-heavy', 'Purchased theme'],
  ['SEO architecture', 'Engineered-in, schema-native', 'Paid add-on retainer', 'Plugin roulette'],
  ['Motion & interaction', 'Spring-physics systems', 'Rarely considered', 'Stock transitions'],
  ['Platform lock-in', 'None — you own everything', 'CMS retainers', 'Monthly subscription'],
  ['Post-launch', 'Roadmap, indexing & scaling', 'Ticket queue', 'You’re on your own'],
];

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Founders', href: '#founders' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
] as const;

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
  badge?: string;
}

export const PLANS: Plan[] = [
  {
    id: 'sprint',
    name: 'Sprint',
    tagline: 'For focused launches',
    price: '$4.5k',
    period: 'fixed · 2–3 weeks',
    features: [
      'High-conversion landing site',
      'Copy polish & page structure',
      'Core technical SEO + schema',
      'Interactive micro-motion pack',
      '2 structured revision rounds',
    ],
  },
  {
    id: 'signature',
    name: 'Signature',
    tagline: 'Our flagship engagement',
    price: '$12k',
    period: 'fixed · 4–6 weeks',
    features: [
      'Fully bespoke multi-page website',
      'Spring-physics motion systems',
      'Technical SEO + GSC indexing setup',
      'CMS or headless stack, your choice',
      'Priority support channel',
      '30-day post-launch care',
    ],
    featured: true,
    badge: 'Most popular',
  },
  {
    id: 'partner',
    name: 'Partner',
    tagline: 'For scaling teams',
    price: 'Custom',
    period: 'monthly retainer',
    features: [
      'Dedicated product pod',
      'Continuous A/B & SEO iteration',
      'Quarterly strategy audits',
      'Same-day response SLA',
      'Roadmap & analytics reviews',
    ],
  },
];

export interface FaqEntry {
  q: string;
  a: string;
}

export const FAQS: FaqEntry[] = [
  {
    q: 'How fast can we launch?',
    a: 'Sprint engagements ship in 2–3 weeks; Signature builds run 4–6 weeks. Every fixed quote comes with an exact milestone calendar — dates, not estimates.',
  },
  {
    q: 'Do you work with businesses outside tech?',
    a: 'Yes — local services, e-commerce, real estate, healthcare and hospitality. Each VELTRIX DIGITAL build is tailored to how your industry actually searches and buys.',
  },
  {
    q: 'What makes you different from template builders?',
    a: 'Every line of code is handcrafted for your business: engineered SEO architecture, spring-physics motion, zero plugin debt — and you own the entire codebase on day one.',
  },
  {
    q: 'Will the site actually rank on Google?',
    a: 'Ranking is engineered in, not bolted on: semantic HTML5, JSON-LD schema, Core Web Vitals budgets and Google Search Console indexing are part of our 4-step protocol.',
  },
  {
    q: 'Who owns the code and design?',
    a: 'You do — completely. Full repository, design files and analytics handover. No platform lock-in, no proprietary page builders, no hostage situations.',
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Every engagement includes 30 days of post-launch care. For continuous iteration, the Partner plan gives you a dedicated pod with a same-day response SLA.',
  },
];

export const CONTACT_EMAIL = 'hello@veltrix.digital';
