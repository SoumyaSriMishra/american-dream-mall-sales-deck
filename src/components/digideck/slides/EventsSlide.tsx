import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fadeUp, fadeIn, staggerContainer } from '../../../lib/animations';
import { eventCards } from '../../../data/mallData';
import { mediaAssets } from '../../../data/mediaAssets';

export default function EventsSlide() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 3); // 3 slides
    }, 5000); // slow slideshow (5s)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 overflow-hidden">
        {eventCards.slice(0, 3).map((card, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === current ? 1 : 0,
              scale: index === current ? 1.05 : 1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img
              src={mediaAssets.events[index]}
              alt={card.name}
              className="w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </motion.div>
        ))}

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-8 lg:mb-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="label mb-4 text-amber text-xs sm:text-sm"
              variants={fadeIn}
            >
              EVENTS & PLATFORM
            </motion.p>
            
            <motion.h2
              className="font-display font-light text-ivory mb-6 leading-[1.1]"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
              variants={fadeUp}
            >
              A Platform for World's<br />Biggest Moments
            </motion.h2>
            
            <motion.p
              className="font-display italic text-ivory/60 text-lg sm:text-xl lg:text-2xl font-light"
              variants={fadeUp}
            >
              "More than a venue. A global stage."
            </motion.p>
          </motion.div>

          {/* Key Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-4 sm:gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              { value: '185,000', label: 'Sq Ft Space' },
              { value: '10,000', label: 'Capacity' },
              { value: '365', label: 'Days/Year' },
            ].map((stat, index) => (
              <motion.div key={index} className="text-center" variants={fadeUp}>
                <div className="font-impact text-amber text-2xl sm:text-3xl lg:text-4xl mb-1 tracking-wider">{stat.value}</div>
                <p className="font-body text-[9px] sm:text-[10px] tracking-[0.15em] text-ivory/60 uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
