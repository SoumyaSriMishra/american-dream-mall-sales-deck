import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../lib/animations';

export default function DemographicsSection() {
  return (
    <section className="bg-espresso py-[4.5rem]">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={viewportOnce}
          className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-8"
        >
          {/* Column 1 */}
          <div className="flex flex-col items-center text-center px-8 py-4 lg:py-0">
            <div className="font-impact text-amber text-[3rem] lg:text-[4rem] leading-none mb-2">54%</div>
            <div className="font-body font-light text-[10px] lg:text-[11px] text-ivory/55 tracking-[0.2em] uppercase">Ages 18-34</div>
          </div>
          
          {/* Horizontal Separator - only on desktop */}
          <div className="hidden lg:block w-px h-[2.5rem] bg-amber" />
          
          {/* Mobile Separator - horizontal line */}
          <div className="block lg:hidden w-full h-px bg-amber/30 my-4" />
          
          {/* Column 2 */}
          <div className="flex flex-col items-center text-center px-8 py-4 lg:py-0">
            <div className="font-impact text-amber text-[3rem] lg:text-[4rem] leading-none mb-2">67%</div>
            <div className="font-body font-light text-[10px] lg:text-[11px] text-ivory/55 tracking-[0.2em] uppercase">Income $50K+</div>
          </div>
          
          {/* Horizontal Separator - only on desktop */}
          <div className="hidden lg:block w-px h-[2.5rem] bg-amber" />
          
          {/* Mobile Separator - horizontal line */}
          <div className="block lg:hidden w-full h-px bg-amber/30 my-4" />
          
          {/* Column 3 */}
          <div className="flex flex-col items-center text-center px-8 py-4 lg:py-0">
            <div className="font-impact text-amber text-[3rem] lg:text-[4rem] leading-none mb-2">82%</div>
            <div className="font-body font-light text-[10px] lg:text-[11px] text-ivory/55 tracking-[0.2em] uppercase">Visit 4x/Year</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
