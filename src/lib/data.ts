/** Central content model for the studio site. */

export type ProjectCategory = 'web' | 'ecommerce' | 'growth';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  summary: string;
  stack: string[];
  tag: string;
  mock: 'dashboard' | 'commerce' | 'landing';
  from: string;
  to: string;
}

export const CATEGORY_TABS = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web Apps & SaaS' },
  { id: 'ecommerce', label: 'Storefronts' },
  { id: 'growth', label: 'Lead & Brand Sites' },
] as const;

export const PROJECTS: Project[] = [
  {
    id: 'pulseboard',
    title: 'Pulseboard Workspace',
    category: 'web',
    categoryLabel: 'Web App Concept',
    year: '2026',
    summary:
      'Operations dashboard concept combining live order tracking, team permissions, and clean reporting in one fast React interface.',
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    tag: 'Full-Stack Build',
    mock: 'dashboard',
    from: '#147D7C',
    to: '#6FB5B3',
  },
  {
    id: 'kora-studio',
    title: 'Kora Goods Storefront',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce Concept',
    year: '2026',
    summary:
      'Minimal product storefront built for mobile shoppers with fast variant switching, clean cart drawer, and distraction-free checkout.',
    stack: ['Next.js', 'Stripe', 'Tailwind CSS', 'Motion'],
    tag: 'Mobile-First Shop',
    mock: 'commerce',
    from: '#FF6B4A',
    to: '#FF9E7A',
  },
  {
    id: 'verve-clinic',
    title: 'Dental & Clinic Lead Funnel',
    category: 'growth',
    categoryLabel: 'Local Business',
    year: '2026',
    summary:
      'High-trust clinic landing system pairing local search pages, instant appointment booking, and social ad landing flows.',
    stack: ['React', 'Local SEO', 'Schema Markup', 'Meta Ads'],
    tag: 'Web + Lead Gen',
    mock: 'landing',
    from: '#0F3D3E',
    to: '#2C6E6D',
  },
  {
    id: 'trackdesk',
    title: 'TrackDesk Client Portal',
    category: 'web',
    categoryLabel: 'B2B Web App',
    year: '2025',
    summary:
      'Client portal for agencies and service teams to share project milestones, invoices, and deliverables without messy email threads.',
    stack: ['TypeScript', 'Node.js', 'REST API', 'Tailwind CSS'],
    tag: 'Client Portal',
    mock: 'dashboard',
    from: '#FF8A5C',
    to: '#FF6B4A',
  },
  {
    id: 'roast-club',
    title: 'Roast Club D2C',
    category: 'ecommerce',
    categoryLabel: 'D2C Brand',
    year: '2025',
    summary:
      'Subscription-ready D2C storefront paired with Instagram reel landing pages and automated WhatsApp follow-up flows.',
    stack: ['Next.js', 'Payments', 'Meta Pixel', 'Motion'],
    tag: 'D2C + Socials',
    mock: 'commerce',
    from: '#2C6E6D',
    to: '#FF8A5C',
  },
  {
    id: 'urban-fit',
    title: 'Creator & Fitness Brand Hub',
    category: 'growth',
    categoryLabel: 'Brand & Social Funnel',
    year: '2025',
    summary:
      'Link-in-bio hub, lead magnet funnel, and booking calendar built to convert Instagram and YouTube traffic into paying clients.',
    stack: ['React', 'Analytics', 'Social Funnel', 'CRM'],
    tag: 'Social Growth',
    mock: 'landing',
    from: '#147D7C',
    to: '#FF6B4A',
  },
];

export interface Service {
  id: string;
  owner: 'Agnish' | 'Ayush';
  track: string;
  index: string;
  title: string;
  body: string;
  points: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'apps',
    owner: 'Agnish',
    track: 'Web Development',
    index: '01',
    title: 'Custom Websites & Web Apps',
    body: 'Responsive sites, dashboards, and full-stack web applications written cleanly from scratch for speed and reliability.',
    points: ['React, Next.js & TypeScript', 'Backend APIs & databases', 'Mobile-first UI & motion'],
  },
  {
    id: 'seo',
    owner: 'Agnish',
    track: 'Performance & SEO',
    index: '02',
    title: 'Speed, Hosting & Technical SEO',
    body: 'Clean semantic structure, metadata, fast load times, and reliable deployment so search engines index your site properly.',
    points: ['Core Web Vitals tuning', 'Structured schema & OG tags', 'Cloud deployment & domains'],
  },
  {
    id: 'marketing',
    owner: 'Ayush',
    track: 'Marketing & Socials',
    index: '03',
    title: 'Social Media & Brand Positioning',
    body: 'Content direction, social media presence, and messaging that builds real trust with your target audience.',
    points: ['Instagram & LinkedIn growth', 'Content & reel hooks', 'Brand voice & creatives'],
  },
  {
    id: 'sales',
    owner: 'Ayush',
    track: 'Sales & Leads',
    index: '04',
    title: 'Lead Generation & Sales Funnels',
    body: 'Turning website visitors and social traffic into qualified inquiries through outbound, ad funnels, and follow-up systems.',
    points: ['Lead capture & CRM routing', 'Outbound & cold outreach', 'Conversion copy & offers'],
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
    title: 'Goal & Offer Alignment',
    body: 'We talk through what you sell, who your buyers are, and what the website or campaign needs to achieve first.',
  },
  {
    index: '02',
    title: 'Design & Funnel Structure',
    body: 'We map out the pages, messaging, and user journey so every button and section pushes visitors toward an inquiry.',
  },
  {
    index: '03',
    title: 'Development & Creative Build',
    body: 'Agnish builds the frontend, backend, and SEO setup while Ayush prepares the launch copy, creatives, and lead tracking.',
  },
  {
    index: '04',
    title: 'Launch & Traffic Push',
    body: 'We ship to production, verify indexing and analytics, and kick off social or outreach campaigns to bring in leads.',
  },
];

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Founders', href: '#founders' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
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
    id: 'starter',
    name: 'Launch Site',
    tagline: 'For personal brands & local businesses',
    price: 'Custom',
    period: '1–2 week turnaround',
    features: [
      'Custom responsive landing page',
      'Mobile-first layout & smooth UI',
      'Basic technical SEO & analytics',
      'Lead form & WhatsApp / email routing',
      'Full source code ownership',
    ],
  },
  {
    id: 'growth',
    name: 'Website + Growth',
    tagline: 'Our complete build & lead package',
    price: 'Custom',
    period: '3–5 week turnaround',
    features: [
      'Multi-page website or web app',
      'Custom backend, CMS or booking flow',
      'Offer positioning & conversion copy',
      'Social media & lead-gen launch plan',
      'Deployment, domain & 30-day support',
    ],
    featured: true,
    badge: 'Most requested',
  },
  {
    id: 'retainer',
    name: 'Growth Retainer',
    tagline: 'Ongoing dev, socials & sales pipeline',
    price: 'Monthly',
    period: 'Flexible monthly scope',
    features: [
      'Social media management & creatives',
      'Lead generation & outreach support',
      'New landing pages & site updates',
      'Monthly performance review',
      'Direct WhatsApp / Slack access',
    ],
  },
];

export interface FaqEntry {
  q: string;
  a: string;
}

export const FAQS: FaqEntry[] = [
  {
    q: 'How do the two of you split the work?',
    a: 'Agnish handles all web design, frontend/backend development, hosting, and technical SEO. Ayush handles marketing strategy, social media, lead generation, and sales.',
  },
  {
    q: 'Can we hire you just for a website, or just for marketing?',
    a: 'Yes. Some clients only need a fast custom site or web app built, while others want the site paired with social media and lead generation.',
  },
  {
    q: 'How long does a typical build take?',
    a: 'A focused landing page usually ships in 1 to 2 weeks. Larger multi-page websites or custom web apps take 3 to 5 weeks depending on features.',
  },
  {
    q: 'Do I own the website code after launch?',
    a: 'Yes, 100%. You get the full GitHub repository, deployed site, and all design/content assets with no lock-in.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'Just fill out the scope form below or book a call. Bring your business details, goals, and any reference sites you like—we handle the rest.',
  },
];

export const CONTACT_EMAIL = 'agnighosh207@gmail.com';
