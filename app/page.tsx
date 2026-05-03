import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { About } from './components/About';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Capabilities } from './components/Capabilities';
import { CtaBand } from './components/CtaBand';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollProgress />
      <main>
        <Hero />
        <MarqueeStrip />
        <About />
        <Services />
        <Process />
        <Capabilities />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
