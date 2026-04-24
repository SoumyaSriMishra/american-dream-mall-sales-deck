import { motion } from 'framer-motion';
import { fadeUp, fadeIn, staggerContainer } from '../../../lib/animations';
import { mediaAssets } from '../../../data/mediaAssets';

export default function LuxurySlide() {
  return (
    <div className="relative w-full h-screen bg-charcoal overflow-hidden">
      {/* Background Image */}
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

      <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p 
              className="label mb-4 text-amber text-xs sm:text-sm" 
              variants={fadeIn}
            >
              THE LUXURY QUARTER
            </motion.p>
            
            <motion.h2 
              className="font-display font-light text-ivory mb-6 leading-[1.1]" 
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
              variants={fadeUp}
            >
              An elevated<br />world <em className="italic">within</em><br />a world.
            </motion.h2>

            <motion.div 
              className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-8" 
              variants={fadeUp}
            >
              {['Curated Flagships', 'Private Clienteling', 'Luxury Concierge'].map(feature => (
                <span 
                  key={feature} 
                  className="border border-amber/40 text-amber font-body text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase px-4 sm:px-5 py-2 sm:py-3"
                >
                  {feature}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
