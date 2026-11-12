# VELTRIX DIGITAL — Agency Portfolio

Award-calibre, conversion-focused agency site for **VELTRIX DIGITAL** (co-founders: Agnish & Ayush). Light-mode, funded-SaaS design language (Linear/Stripe/Notion calibre): white canvas, soft neutral elevations, one confident indigo→violet→sky accent, generous whitespace, heavy brand presence — no dark hacker aesthetics, no terminal/emoji gimmicks.

## Stack

| Layer         | Tech                                                        |
| ------------- | ----------------------------------------------------------- |
| Framework     | React 19 + TypeScript (strict) + Vite 7                     |
| Styling       | Tailwind CSS v4 (CSS-variable design tokens, `@theme inline`)|
| Animation     | **Framer Motion** (`motion/react`) · **GSAP** ScrollTrigger · **Lenis** smooth scroll |
| Icons         | lucide-react (+ inline brand SVGs)                          |
| SEO           | Semantic HTML5, JSON-LD (`Organization` + `ProfessionalService` + `WebSite`), OG/Twitter meta |

## Commands

```bash
npm run dev        # dev server
npm run build      # typecheck + production build
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
```

## Structure

```
src/
  lib/
    data.ts        # ← ALL site content: projects, services, process,
                   #    testimonials, comparison rows, nav, contact email
    motion.ts      # shared easing + reveal variants
    gsap.ts        # GSAP + ScrollTrigger registration
  components/
    Navbar.tsx         # sticky white-glass nav, scroll progress bar,
                       # mobile overlay menu
    Hero.tsx           # per-line masked headline reveal, coral underline
                       # accent, social-proof avatar cluster, magnetic CTAs,
                       # rolling counters, client marquee
    Work.tsx           # filterable case-study grid (CSS device mockups,
                       # result badges, tech pills)
    Philosophy.tsx     # 3 principle cards
    Founders.tsx       # Agnish & Ayush spotlight + shared quote
    Services.tsx       # cursor-lit border + spotlight service cards
    Process.tsx        # 4-step protocol on DEEP-TEAL dark band,
                       # GSAP-scrubbed progress rail
    Pricing.tsx        # 3 engagement tiers, featured "Signature" card
    Faq.tsx            # animated accordion (FAQPage JSON-LD in index.html)
    Testimonials.tsx   # autoplay carousel with progress bar
    Comparison.tsx     # VELTRIX DIGITAL vs agencies vs template builders
    LeadForm.tsx       # professional scope/inquiry form
    BookingModal.tsx   # 2-step strategy-call scheduler (context provider)
    Footer.tsx         # semantic sitemap, socials, giant brand wordmark,
                       # live UTC clock
    AmbientBackground.tsx  # soft tint blobs + faint light grid
    Magnetic.tsx / Tilt.tsx / Counter.tsx  # interaction primitives
```

## Motion system

- **Framer Motion**: masked per-line headline reveal, staggered reveals, modal +
  menu transitions, filter grid, carousel with autoplay progress bar, FAQ
  accordion, counters, magnetic buttons, 3D tilt cards, cursor spotlight,
  client-logo marquee (pauses on hover).
- **GSAP ScrollTrigger**: Process-section progress rail (scrubbed) + node ignition.
- **Lenis**: smooth scrolling driven from the shared `gsap.ticker`.
- `prefers-reduced-motion` disables ambient canvas, GSAP scrubs and autoplay.

## Notes

- Form submissions (inquiry form + booking modal) currently **simulate**
  transmission client-side — wire `LeadForm.tsx` `submit()` and
  `BookingModal.tsx` `confirm()` to your CRM/email endpoint before going live.
- Update `canonical` / `og:url` / JSON-LD URLs in `index.html` when the real
  domain is chosen.
- Brand icons (GitHub, LinkedIn, X, Dribbble) are inline SVGs in
  `SocialIcons.tsx` (lucide-react no longer ships brand glyphs).
