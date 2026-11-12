import { AmbientBackground } from './components/AmbientBackground';
import { BookingProvider } from './components/BookingModal';
import { Faq } from './components/Faq';
import { FloatingDock } from './components/FloatingDock';
import { Footer } from './components/Footer';
import { Founders } from './components/Founders';
import { Hero } from './components/Hero';
import { LeadForm } from './components/LeadForm';
import { Navbar } from './components/Navbar';
import { Pricing } from './components/Pricing';
import { Process } from './components/Process';
import ClickSpark from './components/reactbits/ClickSpark';
import { Services } from './components/Services';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { StudioRibbon } from './components/StudioRibbon';
import { Work } from './components/Work';

export default function App() {
  return (
    <SmoothScrollProvider>
      <BookingProvider>
        <ClickSpark
          sparkColor={['#FF6B4A', '#147D7C', '#FFB49A']}
          shape="streak"
          sparkSize={11}
          sparkRadius={24}
          sparkCount={8}
          duration={420}
          randomness={0.25}
        >
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
            <StudioRibbon />
            <Work />
            <Founders />
            <Services />
            <Process />
            <Pricing />
            <Faq />
            <LeadForm />
          </main>

          <FloatingDock />

          <div className="relative z-10">
            <Footer />
          </div>
        </ClickSpark>
      </BookingProvider>
    </SmoothScrollProvider>
  );
}
