import { motion } from 'framer-motion';
import { fadeUp, scaleIn, fadeIn, staggerContainer } from '../../../lib/animations';
import { mediaAssets } from '../../../data/mediaAssets';
import { tenantMarquee } from '../../../data/mallData';

export default function RetailSlide() {
  return (
    <div className="relative w-full h-screen bg-parchment overflow-hidden">
      <div className="h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center w-full max-w-7xl mx-auto">
          
          <div className="w-full lg:w-1/2">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.p
                className="label mb-4 text-xs sm:text-sm"
                variants={fadeIn}
              >
                THE RETAIL EXPERIENCE
              </motion.p>
              
              <motion.h2
                className="font-display font-light text-charcoal mb-6 leading-[1.1]"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
                variants={fadeUp}
              >
                Where the world's<br />
                best brands <em className="italic">come</em><br />
                to lead.
              </motion.h2>
              
              <motion.div
                variants={fadeUp}
                className="overflow-hidden whitespace-nowrap mt-6 -ml-2 pl-2 max-w-[100vw]"
              >
                <motion.div
                  className="inline-flex gap-8 sm:gap-12"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                  {[...tenantMarquee, ...tenantMarquee].map((t, i) => (
                    <span key={i} className="font-body font-light text-xs sm:text-sm tracking-widest text-slate/60 uppercase">
                      {t}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
              
              <motion.a 
                href="mailto:leasing@americandream.com"
                className="cta-link mt-6 inline-block text-xs sm:text-sm"
                variants={fadeUp}
              >
                Inquire About Leasing
              </motion.a>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2 grid grid-cols-1 gap-4 lg:gap-6">
            <motion.div 
              className="img-zoom-wrap h-[30vh] lg:h-[35vh]"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
            >
              <img 
                src={mediaAssets.sections.retailTop} 
                alt="Retail Experience"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              className="img-zoom-wrap h-[30vh] lg:h-[35vh]"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <img 
                src={mediaAssets.sections.retailBottom} 
                alt="Retail Flagships"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
