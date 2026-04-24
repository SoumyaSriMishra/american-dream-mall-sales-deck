import { useActiveSection } from '../../hooks/useActiveSection';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'stats', label: 'Scale' },
  { id: 'retail', label: 'Retail' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'dining', label: 'Dining' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'events', label: 'Events' },
  { id: 'sponsorship', label: 'Sponsorship' },
  { id: 'contact', label: 'Contact' },
];

export default function SideNav() {
  const activeSection = useActiveSection(sections.map(s => s.id));

  return (
    <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center justify-end gap-3"
            aria-label={section.label}
          >
             <span className="font-body text-[11px] tracking-[0.2em] text-ivory/60 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               {section.label}
             </span>
             <div 
               className={`rounded-full transition-all duration-300 ${
                 isActive 
                   ? 'bg-amber w-6 h-[6px]' 
                   : 'bg-ivory/25 w-[6px] h-[6px] group-hover:bg-ivory/60'
               }`} 
             />
          </a>
        );
      })}
    </div>
  );
}
