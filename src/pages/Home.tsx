import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import DemographicsSection from '../components/sections/DemographicsSection';
import RetailSection from '../components/sections/RetailSection';
import LuxurySection from '../components/sections/LuxurySection';
import DiningSection from '../components/sections/DiningSection';
import EventsSection from '../components/sections/EventsSection';
import EntertainmentSection from '../components/sections/EntertainmentSection';
import SponsorshipSection from '../components/sections/SponsorshipSection';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <DemographicsSection />
        <RetailSection />
        <LuxurySection />
        <DiningSection />
        <EventsSection />
        <EntertainmentSection />
        <SponsorshipSection />
        <ContactSection />
      </main>
    </>
  );
}
