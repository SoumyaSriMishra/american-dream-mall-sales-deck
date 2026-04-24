import { motion } from 'framer-motion';
import { fadeUp, fadeIn, staggerContainer } from '../../../lib/animations';
import { mediaAssets } from '../../../data/mediaAssets';
import { diningConcepts } from '../../../data/mallData';

export default function DiningSlide() {
  return (
    <div className="relative w-full h-screen bg-charcoal overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <img 
          src={mediaAssets.sections.diningHero}
          alt="Dining Experience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center mb-8 lg:mb-12"
          >
            <motion.p
              className="label mb-4 text-amber text-xs sm:text-sm"
              variants={fadeIn}
            >
              CULINARY EXCELLENCE
            </motion.p>
            
            <motion.h2
              className="font-display font-light text-ivory mb-6 leading-[1.1]"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
              variants={fadeUp}
            >
              A global dining<br />
              destination <em className="italic">unlike</em><br />
              any other.
            </motion.h2>
          </motion.div>

          {/* Automatic Conveyor Belt for Dining Images */}
          <motion.div 
            className="overflow-hidden whitespace-nowrap py-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex gap-4 sm:gap-6"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...diningConcepts, ...diningConcepts].map((concept, index) => (
                <div key={`${concept.name}-${index}`} className="flex-shrink-0 w-48 sm:w-56 lg:w-64">
                  <div className="relative h-32 sm:h-36 lg:h-40 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={concept.image}
                      alt={concept.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <h4 className="font-display text-sm text-ivory">{concept.name}</h4>
                  <p className="font-body text-xs text-amber/80">{concept.cuisine}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
