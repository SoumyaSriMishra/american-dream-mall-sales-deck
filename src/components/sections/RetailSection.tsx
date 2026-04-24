import { motion } from 'framer-motion';
import { fadeUp, scaleIn, viewportOnce } from '../../lib/animations';
import { mediaAssets } from '../../data/mediaAssets';
import { tenantMarquee } from '../../data/mallData';

export default function RetailSection() {
  return (
    <section id="retail" className="bg-parchment section-padding overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={viewportOnce}
            >
              <p className="label mb-6">THE RETAIL EXPERIENCE</p>
              
              <h2 className="font-display font-light text-charcoal mb-8 leading-[1.1]" style={{ fontSize: 'var(--text-display-lg)' }}>
                Where the world's<br />
                best brands <em className="italic">come</em><br />
                to lead.
              </h2>
              
                            
              {/* Marquee Ticker */}
              <div className="overflow-hidden whitespace-nowrap mt-8 md:mt-12 -ml-4 pl-4 max-w-[100vw]">
                <motion.div
                  className="inline-flex gap-12"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                >
                  {[...tenantMarquee, ...tenantMarquee].map((t, i) => (
                    <span key={i} className="font-body font-light text-sm tracking-widest text-slate/60 uppercase">
                      {t}
                    </span>
                  ))}
                </motion.div>
              </div>
              
              {/* CTA */}
              <motion.a 
                href="mailto:leasing@americandream.com"
                className="cta-link mt-8"
                variants={fadeUp}
                viewport={{ once: true }}
              >
                Inquire About Leasing
              </motion.a>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2 grid gap-8">
            <motion.div 
              className="img-zoom-wrap h-[30vh] lg:h-[40vh]"
              initial="hidden"
              whileInView="visible"
              variants={scaleIn}
              viewport={viewportOnce}
            >
              <img 
                src={mediaAssets.sections.retailTop} 
                alt="Retail Experience"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              className="img-zoom-wrap h-[30vh] lg:h-[40vh]"
              initial="hidden"
              whileInView="visible"
              variants={scaleIn}
              viewport={viewportOnce}
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
    </section>
  );
}
