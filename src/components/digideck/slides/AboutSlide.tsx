import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, fadeIn, staggerContainer } from '../../../lib/animations';
import { mediaAssets } from '../../../data/mediaAssets';
import { useEffect, useState, useRef } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  char: string;
  velocity: { x: number, y: number };
}

export default function AboutSlide() {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [buttonGolden, setButtonGolden] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const magnifierRef = useRef<HTMLDivElement>(null);
  const sparkleIdRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMagnifier(true);
    }, 2500);
    
    const bounceTimer = setTimeout(() => {
      setButtonGolden(true);
    }, 4500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(bounceTimer);
    };
  }, []);

  // Magical Sparkle Trail logic
  useEffect(() => {
    if (!showMagnifier) return;

    const interval = setInterval(() => {
      if (magnifierRef.current) {
        const rect = magnifierRef.current.getBoundingClientRect();
        
        if (rect.top > 0 && rect.top < window.innerHeight) {
          const chars = ['✦', '✨', '•'];
          const colors = ['#C8A96E', '#FFF', '#FFE5B4'];
          
          const newSparkle: Sparkle = {
            id: sparkleIdRef.current++,
            x: rect.left + (Math.random() * rect.width),
            y: rect.top + (Math.random() * rect.height),
            size: Math.random() * 12 + 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            char: chars[Math.floor(Math.random() * chars.length)],
            velocity: {
              x: (Math.random() - 0.5) * 2,
              y: (Math.random() * 1.5)
            }
          };
          
          setSparkles(prev => [...prev.slice(-3), newSparkle]); // Max 4 sparkles total (prev.slice(-3) + 1)
        }
      }
    }, 150); // Slower spawn rate

    return () => clearInterval(interval);
  }, [showMagnifier]);

  return (
    <div className="relative w-full h-screen bg-ivory overflow-hidden">
      <div className="h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 w-full max-w-7xl mx-auto">
          <div className="w-full lg:w-[55%] h-[40vh] lg:h-[60vh] overflow-hidden">
            <motion.img 
              initial={{ scale: 1.15, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={mediaAssets.sections.aboutOverview}
              alt="About American Dream Mall" 
              className="w-full h-full object-cover"
              layoutId="main-image"
            />
          </div>
          
          <div className="w-full lg:w-[45%]">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="h-full flex flex-col justify-center text-center lg:text-left"
            >
              <motion.p
                className="label mb-4 text-xs sm:text-sm"
                variants={fadeIn}
              >
                THE DESTINATION
              </motion.p>
              
              <motion.h2
                className="font-display font-light text-charcoal mb-6 leading-[1.1]"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
                variants={fadeUp}
                layoutId="heading"
              >
                A destination<br />
                unlike <em className="italic">anything</em><br />
                in North America.
              </motion.h2>
              
              <motion.div
                variants={fadeUp}
                className="w-8 h-px lg:w-12 bg-amber my-6 mx-auto lg:mx-0"
              />
              
              <motion.div
                variants={fadeUp}
                className="border-t border-amber/20 pt-4 mb-4"
              >
                <p className="font-body font-light text-warm-grey text-[11px] sm:text-[12px] tracking-[0.04em]">
                  10 miles from Manhattan · Direct NJ Transit Access · 26,000 Parking Spaces
                </p>
              </motion.div>
              
              <motion.a 
                href="https://www.google.com/maps/search/American+Dream+Mall,+East+Rutherford,+NJ"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block border border-amber font-body font-medium text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 ${
                  buttonGolden 
                    ? 'bg-amber text-charcoal' 
                    : 'text-amber hover:bg-amber hover:text-charcoal'
                }`}
                variants={fadeUp}
              >
                View on Google Maps
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Magical Sparkle Trail */}
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 1, scale: 0.5, x: sparkle.x, y: sparkle.y }}
            animate={{ 
              opacity: 0, 
              scale: [1, 1.2, 0], 
              x: sparkle.x + sparkle.velocity.x * 20, 
              y: sparkle.y + sparkle.velocity.y * 30,
              rotate: [0, 90, 180]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed top-0 left-0 z-[100] pointer-events-none drop-shadow-[0_0_8px_rgba(200,169,110,0.8)]"
            style={{ 
              fontSize: sparkle.size,
              color: sparkle.color,
              filter: 'blur(0.5px)'
            }}
          >
            {sparkle.char}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Golden Magnifying Glass Animation */}
      {showMagnifier && (
        <motion.div
          ref={magnifierRef}
          className="fixed z-50 drop-shadow-[0_0_20px_rgba(200,169,110,0.4)]"
          style={{ right: '10%', top: '0%', width: 120, height: 120 }}
          initial={{ x: 0, y: 0, rotate: 0, scale: 0.8, scaleX: -1 }}
          animate="fullSequence"
          variants={{
            fullSequence: {
              x: [0, -200, -200, -200, -200, -100, 100, 100],
              y: [0, window.innerHeight * 0.6, window.innerHeight * 0.55, window.innerHeight * 0.57, window.innerHeight * 0.57, window.innerHeight * 0.57, window.innerHeight * 0.57, window.innerHeight],
              rotate: [0, 180, 170, 165, 165, 165, 165, 180],
              scale: [0.8, 1, 0.95, 1, 1, 1, 1, 0.8],
              scaleX: [-1, -1, -1, -1, -1, -1, -1, -1],
              transition: {
                duration: 8,
                delay: 0,
                times: [0, 0.25, 0.35, 0.4, 0.45, 0.6, 0.8, 1],
                ease: ["easeIn", "easeOut", "easeInOut", "easeOut", "linear", "linear", "easeIn", "easeIn"]
              }
            }
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DDB96A" />
                <stop offset="50%" stopColor="#C8A96E" />
                <stop offset="100%" stopColor="#8B6914" />
              </linearGradient>
              <filter id="goldGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <circle cx="10" cy="10" r="7" stroke="url(#goldGradient)" strokeWidth="1.5" filter="url(#goldGlow)" />
            <path d="M21 21L15 15" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round" filter="url(#goldGlow)" />
            <circle cx="8" cy="8" r="2" fill="white" fillOpacity="0.3" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
