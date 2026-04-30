import { motion } from 'framer-motion';
import { staggerContainer } from '../../../lib/animations';
import { mediaAssets } from '../../../data/mediaAssets';

interface HeroSlideProps {
  goToSlide: (index: number) => void;
  currentSlide: number;
}

export default function HeroSlide({ goToSlide, currentSlide }: HeroSlideProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster={mediaAssets.heroVideo.poster}
        onError={(e) => {
          console.error('Video loading error:', e);
        }}
      >
        <source src={mediaAssets.videos.mainIntro} type="video/mp4" />
        <source src={mediaAssets.videos.mainIntro} type="video/mp4" />
      </video>

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-10 flex flex-col justify-center lg:justify-end py-12 sm:py-16 lg:py-20"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full lg:max-w-[1000px]">
          {/* Content removed - now shows only video background */}
        </div>
      </motion.div>

      {/* Skip Now Button */}
      {currentSlide === 0 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          onClick={() => goToSlide(1)}
          className="fixed bottom-8 right-8 z-50 bg-amber border border-amber text-charcoal font-body font-medium text-xs sm:text-sm tracking-[0.15em] uppercase px-6 py-2.5 transition-all duration-300 shadow-lg"
        >
          Skip Now
        </motion.button>
      )}

    </div>
  );
}
