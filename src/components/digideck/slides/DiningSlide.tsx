import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, fadeIn, staggerContainer } from '../../../lib/animations';
import { mediaAssets } from '../../../data/mediaAssets';
import { diningConcepts } from '../../../data/mallData';

export default function DiningSlide() {
  const [trainStarted, setTrainStarted] = useState(false);

  const TrainUnit = () => (
    <div className="train-unit">
      <div className="train-locomotive">
        <div className="train-engine-graphic mb-6 ml-2 relative">
          <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[200px] h-auto drop-shadow-[0_0_30px_rgba(200,169,110,0.2)] overflow-visible">
            <defs>
              <linearGradient id="goldTrain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DDB96A" />
                <stop offset="50%" stopColor="#C8A96E" />
                <stop offset="100%" stopColor="#8B6914" />
              </linearGradient>
              <linearGradient id="brownBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5D3A1A" />
                <stop offset="100%" stopColor="#3A2310" />
              </linearGradient>
              <style>{`
                .train-wheel { animation: rotateWheel 1.2s linear infinite; transform-origin: center; }
                .train-belt:hover .train-wheel { animation-play-state: paused; }
                @keyframes rotateWheel { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
                .wheel-spoke { stroke: #C8A96E; stroke-width: 1.5; stroke-linecap: round; }
                
                .smoke-particle { 
                  fill: url(#smokeGradient);
                  opacity: 0; 
                  animation: smokeRise 1.8s ease-out infinite; 
                  transform-origin: 40px 6px;
                  filter: blur(3px);
                }
                .train-belt:hover .smoke-particle { animation-play-state: paused; }
                
                @keyframes smokeRise {
                  0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
                  15% { opacity: 0.8; }
                  100% { transform: translate(var(--drift-x, -20px), -60px) scale(6); opacity: 0; }
                }
              `}</style>
              <radialGradient id="smokeGradient">
                <stop offset="30%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            
            {/* Volumetric Natural Smoke Particles - 1.8s Cycle */}
            <circle cx="40" cy="6" r="6" className="smoke-particle" style={{ animationDelay: '0s', '--drift-x': '-10px' } as any} />
            <circle cx="40" cy="6" r="6" className="smoke-particle" style={{ animationDelay: '0.36s', '--drift-x': '-15px' } as any} />
            <circle cx="40" cy="6" r="6" className="smoke-particle" style={{ animationDelay: '0.72s', '--drift-x': '-8px' } as any} />
            <circle cx="40" cy="6" r="6" className="smoke-particle" style={{ animationDelay: '1.08s', '--drift-x': '-20px' } as any} />
            <circle cx="40" cy="6" r="6" className="smoke-particle" style={{ animationDelay: '1.44s', '--drift-x': '-12px' } as any} />
            
            {/* Main Body - Facing Left */}
            <rect x="30" y="35" width="65" height="35" rx="4" fill="url(#brownBody)" stroke="#000" strokeWidth="0.5" />
            <rect x="30" y="45" width="65" height="6" fill="url(#goldTrain)" />
            
            {/* Boiler */}
            <rect x="30" y="25" width="35" height="15" rx="2" fill="#1A1A1A" />
            <rect x="30" y="30" width="35" height="2" fill="url(#goldTrain)" opacity="0.8" />
            
            {/* Cab */}
            <rect x="65" y="15" width="25" height="25" rx="2" fill="url(#brownBody)" stroke="url(#goldTrain)" strokeWidth="1.5" />
            <rect x="69" y="20" width="8" height="10" rx="1" fill="#000" />
            <rect x="78" y="20" width="8" height="10" rx="1" fill="#000" />
            <rect x="63" y="10" width="29" height="6" rx="2" fill="url(#goldTrain)" />
            
            {/* Chimney - Center at x=40, Top at y=6 */}
            <rect x="35" y="10" width="10" height="20" fill="#1A1A1A" />
            <rect x="33" y="6" width="14" height="4" rx="2" fill="url(#goldTrain)" />
            
            {/* Cowcatcher */}
            <path d="M30 70L12 70L30 45Z" fill="url(#goldTrain)" />
            
            {/* Wheels */}
            <g className="train-wheel" style={{ transformBox: 'fill-box' }}>
              <circle cx="35" cy="70" r="10" fill="#000" stroke="url(#goldTrain)" strokeWidth="1" />
              <line x1="35" y1="60" x2="35" y2="80" className="wheel-spoke" />
              <line x1="25" y1="70" x2="45" y2="70" className="wheel-spoke" />
              <circle cx="35" cy="70" r="3" fill="url(#goldTrain)" />
            </g>

            <g className="train-wheel" style={{ transformBox: 'fill-box' }}>
              <circle cx="55" cy="70" r="10" fill="#000" stroke="url(#goldTrain)" strokeWidth="1" />
              <line x1="55" y1="60" x2="55" y2="80" className="wheel-spoke" />
              <line x1="45" y1="70" x2="65" y2="70" className="wheel-spoke" />
              <circle cx="55" cy="70" r="3" fill="url(#goldTrain)" />
            </g>

            <g className="train-wheel" style={{ transformBox: 'fill-box' }}>
              <circle cx="80" cy="70" r="10" fill="#000" stroke="url(#goldTrain)" strokeWidth="1" />
              <line x1="80" y1="60" x2="80" y2="80" className="wheel-spoke" />
              <line x1="70" y1="70" x2="90" y2="70" className="wheel-spoke" />
              <circle cx="80" cy="70" r="3" fill="url(#goldTrain)" />
            </g>
            
            {/* Powerful Headlight */}
            <circle cx="28" cy="40" r="4" fill="#FFF" className="animate-pulse" />
            <circle cx="28" cy="40" r="12" fill="#FFD700" opacity="0.4" className="animate-pulse" />
            <path d="M28 40L0 30V50L28 40Z" fill="url(#goldTrain)" opacity="0.15" />
          </svg>
        </div>
      </div>
      
      {diningConcepts.map((concept, index) => (
        <div key={index} className="flex flex-row items-end pb-[4px]">
          <div className="compartment-connector"></div>
          <div className="dining-compartment w-40 sm:w-48 lg:w-56 flex-shrink-0">
            <div className="relative h-28 sm:h-32 lg:h-36 overflow-hidden mb-2">
              <img 
                src={concept.image}
                alt={concept.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
            <h4 className="font-display text-sm text-ivory px-2">{concept.name}</h4>
            <p className="font-body text-xs text-amber/80 px-2 pb-2">{concept.cuisine}</p>
          </div>
        </div>
      ))}
      <div style={{ width: '100vw' }}></div>
    </div>
  );

  return (
    <div className="relative w-full h-screen bg-charcoal overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={mediaAssets.sections.culinaryConveyorHero}
          alt="Dining Experience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
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
              CULINARY EXCELLENCE
            </motion.p>
            
            <motion.h2
              className="font-display font-light text-ivory mb-6 leading-[1.1]"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
              variants={fadeUp}
              layoutId="heading"
            >
              A global dining<br />
              destination <em className="italic">unlike</em><br />
              any other.
            </motion.h2>
          </motion.div>

          {/* Train Belt */}
          <div className="train-belt-wrapper">
            <AnimatePresence>
              {trainStarted && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="relative"
                >
                  <div className="train-track"></div>
                  <div className={`train-belt running`}>
                    <TrainUnit />
                    <TrainUnit />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Explore Menu Button */}
      <AnimatePresence>
        {!trainStarted && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="explore-menu-btn"
            onClick={() => setTrainStarted(true)}
          >
            Explore the Menu
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
