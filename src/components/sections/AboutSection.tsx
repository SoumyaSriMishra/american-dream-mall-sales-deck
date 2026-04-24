import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, viewportOnce } from '../../lib/animations';
import { mediaAssets } from '../../data/mediaAssets';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" className="bg-ivory section-padding overflow-hidden">
      <div className="container" ref={containerRef}>
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-[55%] h-[40vh] lg:h-[80vh] overflow-hidden">
            <motion.img 
              style={{ y, scale: 1.15 }}
              src={mediaAssets.sections.about} 
              alt="About American Dream Mall" 
              className="w-full h-full object-cover origin-center"
            />
          </div>
          
          <div className="w-full lg:w-[45%]">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={viewportOnce}
            >
              
              <h2 className="font-display font-light text-charcoal mb-8" style={{ fontSize: 'var(--text-display-lg)' }}>
                A destination<br />
                unlike <em className="italic">anything</em><br />
                in North America.
              </h2>
              
              <div className="w-12 h-px bg-amber my-8" />
              
              {/* Access Info */}
              <div className="border-t border-amber/20 pt-6 mb-6">
                <p className="font-body font-light text-warm-grey text-[13px] tracking-[0.08em]">
                  10 miles from Manhattan · Direct NJ Transit Access · 26,000 Parking Spaces
                </p>
              </div>
              
              {/* Google Maps Button */}
              <a 
                href="https://www.google.com/maps/search/American+Dream+Mall,+East+Rutherford,+NJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-amber text-amber font-body font-medium text-[11px] tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300 hover:bg-amber hover:text-charcoal"
              >
                View on Google Maps
              </a>
              
              
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
