import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '../../lib/animations';
import { mediaAssets } from '../../data/mediaAssets';

export default function LuxurySection() {
  return (
    <section id="luxury" className="relative section-padding overflow-hidden bg-charcoal">
      <div className="absolute inset-0 z-0">
        <img 
          src={mediaAssets.sections.luxuryBg} 
          alt="Luxury Quarter" 
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(28, 27, 25, 0.88) 0%, rgba(28, 27, 25, 0.60) 50%, rgba(28, 27, 25, 0.82) 100%)'
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
           className="max-w-[800px] mx-auto text-center"
           variants={staggerContainer}
           initial="hidden"
           whileInView="visible"
           viewport={viewportOnce}
        >
          <motion.p className="label text-amber mb-6" variants={staggerItem}>
            THE LUXURY QUARTER
          </motion.p>
          
          <motion.h2 
            className="font-display font-light text-ivory mb-8 leading-[1.1]" 
            style={{ fontSize: 'var(--text-display-lg)' }}
            variants={staggerItem}
          >
            An elevated<br />world <em className="italic">within</em><br />a world.
          </motion.h2>

                    
          <motion.div className="flex flex-wrap gap-4 sm:gap-6 justify-center mt-10" variants={staggerItem}>
            {['Curated Flagships', 'Private Clienteling', 'Luxury Concierge'].map(f => (
              <span key={f} className="border border-amber/40 text-amber font-body text-[11px] tracking-[0.2em] uppercase px-5 py-3">
                {f}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
