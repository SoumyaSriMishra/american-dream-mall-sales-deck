import { motion } from 'framer-motion';
import { fadeUp, fadeIn, staggerContainer } from '../../../lib/animations';
import { mediaAssets } from '../../../data/mediaAssets';

export default function HeroSlide() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-charcoal">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ transform: 'scale(1.05)' }} 
        poster={mediaAssets.heroVideo.poster}
        onError={(e) => {
          console.error('Video loading error:', e);
        }}
      >
        <source src={mediaAssets.heroVideo.primary} type="video/mp4" />
        <source src={mediaAssets.heroVideo.fallback} type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-10 flex flex-col justify-center lg:justify-end py-12 sm:py-16 lg:py-20"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full lg:max-w-[1000px]">
          <motion.p
            className="font-body text-[10px] sm:text-[11px] lg:text-[12px] font-medium tracking-[0.25em] sm:tracking-[0.3em] text-amber uppercase mb-4 sm:mb-6 lg:mb-8"
            variants={fadeIn}
          >
            EAST RUTHERFORD · NEW JERSEY
          </motion.p>
          
          <motion.h1
            className="font-display font-light leading-[0.8] sm:leading-[0.85] lg:leading-[0.9] text-ivory flex flex-col"
            style={{ fontSize: 'clamp(2rem, 8vw, 6rem)', letterSpacing: '-0.02em' }}
            variants={fadeUp}
          >
            <span>AMERICAN</span>
            <span>DREAM MALL</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-6 sm:mt-8 lg:mt-10"
          >
            <button className="cta-link text-[11px] sm:text-sm lg:text-base">
              EXPLORE THE EXPERIENCE
            </button>
          </motion.div>

        </div>
      </motion.div>

    </div>
  );
}
