import { motion } from 'framer-motion';
import { fadeUp, fadeIn, staggerContainer } from '../../../lib/animations';
import { mediaAssets } from '../../../data/mediaAssets';

export default function AboutSlide() {
  return (
    <div className="relative w-full h-screen bg-ivory overflow-hidden">
      <div className="h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 w-full max-w-7xl mx-auto">
          <div className="w-full lg:w-[55%] h-[40vh] lg:h-[60vh] overflow-hidden">
            <motion.img 
              initial={{ scale: 1.15, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={mediaAssets.sections.about} 
              alt="About American Dream Mall" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="w-full lg:w-[45%]">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="h-full flex flex-col justify-center text-center lg:text-left"
            >
              <motion.p
                className="label mb-4 text-xs sm:text-sm"
                variants={fadeIn}
              >
                THE DESTINATION
              </motion.p>
              
              <motion.h2
                className="font-display font-light text-charcoal mb-6 leading-[1.1]"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
                variants={fadeUp}
              >
                A destination<br />
                unlike <em className="italic">anything</em><br />
                in North America.
              </motion.h2>
              
              <motion.div
                variants={fadeUp}
                className="w-8 h-px lg:w-12 bg-amber my-6 mx-auto lg:mx-0"
              />
              
              <motion.div
                variants={fadeUp}
                className="border-t border-amber/20 pt-4 mb-4"
              >
                <p className="font-body font-light text-warm-grey text-[11px] sm:text-[12px] tracking-[0.04em]">
                  10 miles from Manhattan · Direct NJ Transit Access · 26,000 Parking Spaces
                </p>
              </motion.div>
              
              <motion.a 
                href="https://www.google.com/maps/search/American+Dream+Mall,+East+Rutherford,+NJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-amber text-amber font-body font-medium text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 hover:bg-amber hover:text-charcoal"
                variants={fadeUp}
              >
                View on Google Maps
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
