import { motion } from 'framer-motion';
import { fadeUp, fadeIn, staggerContainer } from '../../lib/animations';
import { mediaAssets } from '../../data/mediaAssets';

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-charcoal">
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
        className="relative z-10 w-full h-full container mx-auto px-10 flex flex-col justify-end pb-32"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-[800px]">
          <motion.p
            className="font-body text-[11px] font-medium tracking-[0.35em] text-amber uppercase mb-6"
            variants={fadeIn}
          >
            EAST RUTHERFORD · NEW JERSEY
          </motion.p>
          
          <motion.h1
            className="font-display font-light leading-[0.9] text-ivory flex flex-col"
            style={{ fontSize: 'var(--text-display-xl)', letterSpacing: '-0.01em' }}
            variants={fadeUp}
          >
            <span>AMERICAN</span>
            <span>DREAM MALL</span>
          </motion.h1>

        </div>
      </motion.div>

    </section>
  );
}
