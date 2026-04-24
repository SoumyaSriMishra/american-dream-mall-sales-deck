import { motion } from 'framer-motion';
import { Building, MonitorPlay, Ticket, ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '../../lib/animations';
import { config } from '../../data/ctaConfig';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-charcoal pt-16 flex flex-col justify-between min-h-screen">
      <div className="container flex-1">
        
        {/* Top Editorial */}
        <motion.div 
          className="mb-12 mix-blend-lighten"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={viewportOnce}
        >
          <h2 className="font-display font-light text-ivory mb-8 leading-[0.9]" style={{ fontSize: 'var(--text-display-xl)' }}>
            Let's build<br />
            something<br />
            <em className="text-amber italic">here.</em>
          </h2>
                  </motion.div>

        {/* Action Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {[{
            icon: Building,
            label: 'RETAIL LEASING',
            title: 'Secure Your Space',
            desc: 'Become a partner and reach 45+ million annual visitors. Luxury, mid-tier, flagship, and pop-up opportunities available.',
            linkText: 'Contact Leasing',
            href: `mailto:${config.leasingEmail}`
          }, {
            icon: MonitorPlay,
            label: 'SPONSORSHIP',
            title: 'Brand Partnerships',
            desc: 'Connect with our audience through digital media, experiential activations, and naming rights across the property.',
            linkText: 'Explore Sponsorship',
            href: `mailto:${config.partnershipEmail}`
          }, {
            icon: Ticket,
            label: 'EVENT BOOKING',
            title: 'Host an Event',
            desc: 'Access 185,000 square feet of dynamic event space for conferences, galas, brand launches, and global moments.',
            linkText: 'Book the Venue',
            href: `mailto:${config.eventsEmail}`
          }].map((card, i) => (
            <motion.a
              key={i}
              href={card.href}
              className="group border border-dark-border hover:border-amber p-10 transition-colors duration-400 block"
              variants={staggerItem}
              whileHover={{ y: -4 }}
            >
              <div className="text-amber mb-6"><card.icon size={24} strokeWidth={1} /></div>
              <p className="font-body text-[10px] tracking-[0.25em] text-warm-grey uppercase mb-3">{card.label}</p>
              <h3 className="font-display font-light text-ivory text-2xl mb-4">{card.title}</h3>
              <p className="font-body font-light text-[0.875rem] text-ivory/50 leading-relaxed mb-8 h-[4.5rem]">
                {card.desc}
              </p>
              <span className="font-body text-[11px] tracking-[0.18em] uppercase text-ivory group-hover:text-amber transition-colors flex items-center gap-2">
                {card.linkText} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
