import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '../../lib/animations';
import { eventCards } from '../../data/mallData';
import { mediaAssets } from '../../data/mediaAssets';

export default function EventsSection() {
  return (
    <section id="events" className="bg-charcoal section-padding">
      <div className="container">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={viewportOnce}
        >
          <p className="label text-amber mb-6">EVENTS & PLATFORM</p>
          <h2 className="font-display font-light text-ivory leading-[1.1] mb-6" style={{ fontSize: 'var(--text-display-lg)' }}>
            A Platform for the World's<br />Biggest Moments
          </h2>
          <p className="font-display italic text-ivory/60 text-[1.5rem] font-light">
            "More than a venue. A global stage."
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 md:mb-32 max-w-[1100px] mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {eventCards.map((card, i) => (
            <motion.div key={i} className="relative aspect-[3/4] overflow-hidden group" variants={staggerItem}>
              <img 
                src={mediaAssets.events[i]} 
                alt={card.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" 
              />
              <div 
                className="absolute inset-0" 
                style={{ background: 'linear-gradient(to top, rgba(28,27,25,0.95) 0%, transparent 100%)' }} 
              />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <p className="font-body text-[11px] tracking-[0.2em] text-amber uppercase mb-3">{card.date}</p>
                <h3 className="font-display font-light text-ivory text-2xl mb-2">{card.name}</h3>
                <p className="font-body text-sm text-ivory/50">{card.stat}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Capacity Stats */}
        <motion.div 
          className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {[
            { value: '185,000', label: 'Sq Ft Event Space' },
            { value: '10,000', label: 'Person Capacity' },
            { value: '365', label: 'Days of Programming' },
          ].map((stat, i) => (
            <motion.div key={i} className="text-center" variants={staggerItem}>
              <div className="font-impact text-amber text-5xl md:text-6xl mb-2 tracking-wider">{stat.value}</div>
              <p className="font-body text-[11px] tracking-[0.15em] text-ivory/60 uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          viewport={{ once: true }}
          initial="hidden"
          whileInView="visible"
          className="text-center mt-12"
        >
          <Link to="/events" className="cta-link">
            Explore Event Capabilities
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
