import { AmbientBackground } from './components/AmbientBackground';
import { BookingProvider } from './components/BookingModal';
import { Comparison } from './components/Comparison';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { Founders } from './components/Founders';
import { Hero } from './components/Hero';
import { LeadForm } from './components/LeadForm';
import { Navbar } from './components/Navbar';
import { Philosophy } from './components/Philosophy';
import { Pricing } from './components/Pricing';
import { Process } from './components/Process';
import { Services } from './components/Services';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { Testimonials } from './components/Testimonials';
import { Work } from './components/Work';

export default function App() {
  return (
    <SmoothScrollProvider>
      <BookingProvider>
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <AmbientBackground />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <Work />
          <Philosophy />
          <Founders />
          <Services />
          <Pricing />
          <Process />
          <Testimonials />
          <Comparison />
          <Faq />
          <LeadForm />
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
      </BookingProvider>
    </SmoothScrollProvider>
  );
}
