import DigideckContainer from './components/digideck/DigideckContainer';
import HeroSlide from './components/digideck/slides/HeroSlide';
import AboutSlide from './components/digideck/slides/AboutSlide';
import RetailSlide from './components/digideck/slides/RetailSlide';
import DiningSlide from './components/digideck/slides/DiningSlide';
import LuxurySlide from './components/digideck/slides/LuxurySlide';
import EventsSlide from './components/digideck/slides/EventsSlide';
import EntertainmentSlide from './components/digideck/slides/EntertainmentSlide';
import SponsorshipSlide from './components/digideck/slides/SponsorshipSlide';
import ContactSlide from './components/digideck/slides/ContactSlide';

function App() {
  const slides = [
    { id: 'hero', component: HeroSlide, title: 'Welcome' },
    { id: 'about', component: AboutSlide, title: 'About' },
    { id: 'retail', component: RetailSlide, title: 'Retail' },
    { id: 'dining', component: DiningSlide, title: 'Dining' },
    { id: 'luxury', component: LuxurySlide, title: 'Luxury' },
    { id: 'events', component: EventsSlide, title: 'Events' },
    { id: 'entertainment', component: EntertainmentSlide, title: 'Entertainment' },
    { id: 'sponsorship', component: SponsorshipSlide, title: 'Sponsorship' },
    { id: 'contact', component: ContactSlide, title: 'Contact' },
  ];

  return <DigideckContainer slides={slides} />;
}

export default App;
