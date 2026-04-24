import { motion } from 'framer-motion';
import { fadeUp, fadeIn, staggerContainer } from '../../../lib/animations';
import { entertainmentChapters } from '../../../data/mallData';

export default function EntertainmentSlide() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate to-charcoal overflow-hidden">
      <div className="h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
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
              ENTERTAINMENT DESTINATION
            </motion.p>
            
            <motion.h2
              className="font-display font-light text-ivory mb-6 leading-[1.1]"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
              variants={fadeUp}
            >
              World-class attractions<br />
              under <em className="italic">one</em> roof.
            </motion.h2>
          </motion.div>

          {/* Automatic Conveyor Belt for Entertainment Images */}
          <motion.div 
            className="overflow-hidden whitespace-nowrap py-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex gap-4 sm:gap-6"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              {[...entertainmentChapters, ...entertainmentChapters].map((chapter, index) => (
                <div key={`${chapter.name}-${index}`} className="flex-shrink-0 w-48 sm:w-56 lg:w-64">
                  <div className="relative h-32 sm:h-36 lg:h-40 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={chapter.image}
                      alt={chapter.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-2 left-2">
                      <div className="text-2xl font-impact text-amber/60">
                        {chapter.number}
                      </div>
                    </div>
                  </div>
                  <h4 className="font-display text-sm text-ivory">{chapter.name}</h4>
                  <p className="font-body text-xs text-amber/80">{chapter.type}</p>
                  <p className="font-body text-xs text-ivory/60 mt-1">{chapter.stat}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
