import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../lib/animations';
import { mediaAssets } from '../../data/mediaAssets';
import { diningConcepts } from '../../data/mallData';

export default function DiningSection() {
  const concepts = [...diningConcepts, ...diningConcepts];

  return (
    <section id="dining" className="bg-linen pt-12">
      <div className="container overflow-hidden pb-8">
        
        {/* Top Hero Image */}
        <motion.div 
          className="relative w-full h-[40vh] lg:h-[50vh] mb-8 lg:mb-12"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={viewportOnce}
        >
          <div className="absolute top-6 left-6 z-10 bg-linen/90 px-4 py-2 flex items-center justify-center">
            <span className="label leading-none">DINING & LIFESTYLE</span>
          </div>
          <img 
            src={mediaAssets.sections.diningHero} 
            alt="Dining and Lifestyle"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Magazine Style Header */}
        <motion.div 
          className="flex flex-col lg:flex-row gap-12 lg:gap-24"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={viewportOnce}
        >
          <div className="w-full lg:w-1/2">
            <h2 className="font-display font-light text-charcoal leading-[1.1]" style={{ fontSize: 'var(--text-display-lg)' }}>
              A culinary<br />
              curation of<br />
              <em className="italic">global</em> taste.
            </h2>
          </div>
                  </motion.div>

      </div>

      {/* HORIZONTAL SCROLL CONCEPTS */}
      <div className="relative w-full overflow-hidden pb-24 mt-4 lg:mt-12 bg-linen border-t border-border/50 pt-16">
        <motion.div 
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: diningConcepts.length * 3,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="flex items-center gap-8 md:gap-16 w-max pl-8 md:pl-24"
        >
          {concepts.map((concept, i) => (
            <div 
              key={i}
              className="group cursor-pointer w-[75vw] sm:w-[350px] md:w-[450px] flex-shrink-0"
            >
              <div className="overflow-hidden aspect-[4/3] mb-6 bg-warm-grey/20">
                <motion.img
                  src={concept.image}
                  alt={concept.name}
                  className="w-full h-full object-cover origin-center"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="h-px w-full bg-border mb-4" />
              <p className="font-body text-[11px] tracking-[0.25em] text-amber uppercase mb-2">
                {concept.cuisine}
              </p>
              <h3 className="font-display font-light text-charcoal text-[1.75rem] md:text-[2.25rem] mb-2 leading-none">
                {concept.name}
              </h3>
              <p className="font-body font-light text-sm text-slate italic leading-relaxed">
                {concept.hook}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
