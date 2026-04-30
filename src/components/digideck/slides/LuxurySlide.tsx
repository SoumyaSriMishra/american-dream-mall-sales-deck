import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, fadeIn, staggerContainer } from '../../../lib/animations';
import { mediaAssets } from '../../../data/mediaAssets';

// LUXURY PANEL — HOTEL POLAROID WALL
// Trigger: "VIEW THE WORLD" button click
// Batch 1: hotels[0-11] → 5s display → fade out
// Batch 2: hotels[12-22] → 5s display → fade out 
// Loop: Returns to Batch 1 infinitely until cancelled
// Layout: grid-cell scatter (no overlap) + random rotation ±12deg
// Animation: throwPhoto keyframe, 120ms stagger per card
// Background: #3D2314 warm brown with radial gradient depth

const HOTELS = [
  { name: "SpringHill Suites Marriott", distance: "1.04 miles", price: "$127/night", url: "https://marriott.com/ewrer" },
  { name: "Residence Inn Marriott", distance: "1.5 miles", price: "$152/night", url: "https://marriott.com/ewrrt" },
  { name: "Fairfield Inn Marriott", distance: "1.6 miles", price: "$118/night", url: "https://marriott.com/ewrrf" },
  { name: "Homewood Suites Hilton", distance: "Local", price: "$161/night", url: "https://hilton.com/homewood" },
  { name: "Courtyard Marriott Lyndhurst", distance: "1.74 miles", price: "$125/night", url: "https://marriott.com/ewrld" },
  { name: "Courtyard Marriott Secaucus", distance: "1.9 miles", price: "$155/night", url: "https://marriott.com/ewrsc" },
  { name: "Residence Inn Secaucus", distance: "2.08 miles", price: "$169/night", url: "https://marriott.com/ewrri" },
  { name: "Hyatt Place Secaucus", distance: "2.15 miles", price: "$169/night", url: "https://hyatt.com/seczs" },
  { name: "Meadowlands Plaza Hotel", distance: "2.2 miles", price: "$110/night", url: "https://meadowlandsplazahotel.com" },
  { name: "Harmony Suites", distance: "2.8 miles", price: "$134/night", url: "https://harmonysuites.com" },
  { name: "Renaissance Meadowlands", distance: "2.9 miles", price: "$159/night", url: "https://marriott.com/ewrrn" },
  { name: "Best Western Premier NYC Gateway", distance: "2.9 miles", price: "$135/night", url: "https://bestwestern.com/gateway" },
  { name: "Hilton Garden Inn Secaucus", distance: "3.4 miles", price: "$169/night", url: "https://hilton.com/hgi-secaucus" },
  { name: "Hilton Garden Inn Ridgefield Park", distance: "5.1 miles", price: "$145/night", url: "https://hilton.com/hgi-ridgefield" },
  { name: "Holiday Inn Hasbrouck Heights", distance: "3.5 miles", price: "$108/night", url: "https://ihg.com/holidayinn" },
  { name: "Best Western Plus Meadowlands", distance: "3.5 miles", price: "$143/night", url: "https://bestwestern.com/plus" },
  { name: "Aloft Secaucus Meadowlands", distance: "3.6 miles", price: "$152/night", url: "https://marriott.com/ewral" },
  { name: "Courtyard Marriott Edgewater", distance: "4.2 miles", price: "$192/night", url: "https://marriott.com/ewreg" },
  { name: "Hilton Hasbrouck Heights", distance: "4.3 miles", price: "$158/night", url: "https://hilton.com/hasbrouck" },
  { name: "La Quinta Inn Clifton", distance: "5 miles", price: "$114/night", url: "https://wyndhamhotels.com/laquinta" },
  { name: "W Hoboken", distance: "5.3 miles", price: "$296/night", url: "https://marriott.com/ewrwh" },
  { name: "EnVue Autograph Collection", distance: "5.7 miles", price: "$242/night", url: "https://marriott.com/ewren" },
  { name: "Fairfield Inn North Bergen", distance: "5.8 miles", price: "$134/night", url: "https://marriott.com/ewrnb" }
];

export default function LuxurySlide() {
  const [batchIndex, setBatchIndex] = useState<number>(-1);
  const [positions, setPositions] = useState<any[]>([]);
  const [fadingOut, setFadingOut] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const calculatePositions = (count: number) => {
    // Increase density to reduce empty space
    const cols = 4; 
    const rows = 2; 
    const cellWidth = window.innerWidth / cols;
    const cellHeight = window.innerHeight / rows;

    const newPositions = [];
    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      const cx = col * cellWidth + cellWidth / 2;
      const cy = row * cellHeight + cellHeight / 2;
      
      // Tightened offsets to ensure photos stay close but mostly visible
      const offsetX = (Math.random() - 0.5) * 0.4 * cellWidth;
      const offsetY = (Math.random() - 0.5) * 0.4 * cellHeight;
      const rotation = (Math.random() * 16 - 8);
      
      const finalX = cx + offsetX;
      const finalY = cy + offsetY;

      newPositions.push({
        x: finalX,
        y: finalY,
        rotation
      });
    }

    // Shuffle array so consecutive hotels are scattered
    for (let i = newPositions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPositions[i], newPositions[j]] = [newPositions[j], newPositions[i]];
    }
    
    setPositions(newPositions);
  };

  const [timeRemaining, setTimeRemaining] = useState(3000);
  const timerStartRef = useRef<number>(0);

  useEffect(() => {
    if (batchIndex !== -1) {
      const activeCount = Math.min(8, HOTELS.length - (batchIndex * 8));
      calculatePositions(activeCount);
      setFadingOut(false);
      setTimeRemaining(3000);
    }
  }, [batchIndex]);

  useEffect(() => {
    if (batchIndex === -1 || isPaused) return;

    timerStartRef.current = Date.now();

    const fadeOutTid = setTimeout(() => {
      setFadingOut(true);
    }, timeRemaining);

    const nextBatchTid = setTimeout(() => {
      setBatchIndex(prev => {
        return (prev + 1) * 8 >= HOTELS.length ? 0 : prev + 1;
      });
    }, timeRemaining + 800);

    return () => {
      clearTimeout(fadeOutTid);
      clearTimeout(nextBatchTid);
      
      const elapsed = Date.now() - timerStartRef.current;
      setTimeRemaining(prev => Math.max(500, prev - elapsed));
    };
  }, [batchIndex, isPaused, timeRemaining]);

  const handleViewWorldClick = () => {
    setBatchIndex(0);
  };

  const activeHotels = batchIndex === -1 ? [] : HOTELS.slice(batchIndex * 8, (batchIndex + 1) * 8);
  const isHotelView = batchIndex !== -1;

  return (
    <div className="relative w-full h-screen bg-charcoal overflow-hidden">
      
      {/* Background Image for Original View */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-500"
        style={{ opacity: isHotelView ? 0 : 1, pointerEvents: isHotelView ? 'none' : 'auto' }}
      >
        <motion.img 
          src={mediaAssets.sections.luxuryPolaroidWall} 
          alt="Luxury Quarter" 
          className="w-full h-full object-cover"
          layoutId="main-image"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(28, 27, 25, 0.88) 0%, rgba(28, 27, 25, 0.60) 50%, rgba(28, 27, 25, 0.82) 100%)'
          }}
        />
      </div>

      {/* Main Luxury Content */}
      <div 
        className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8 transition-opacity duration-500"
        style={{ opacity: isHotelView ? 0 : 1, pointerEvents: isHotelView ? 'none' : 'auto' }}
      >
        <div className="w-full max-w-4xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p 
              className="label mb-4 text-amber text-xs sm:text-sm" 
              variants={fadeIn}
            >
              THE LUXURY QUARTER
            </motion.p>
            
            <motion.h2 
              className="font-display font-light text-ivory mb-6 leading-[1.1]" 
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
              variants={fadeUp}
              layoutId="heading"
            >
              An elevated<br />world <em className="italic">within</em><br />a world.
            </motion.h2>

            <motion.div 
              className="flex justify-center mt-8 sm:mt-12" 
              variants={fadeUp}
            >
              <button 
                onClick={handleViewWorldClick}
                className="bg-amber border border-amber text-charcoal transition-all duration-300 font-body font-medium text-xs sm:text-sm tracking-[0.2em] uppercase px-6 py-2.5 shadow-lg active:scale-95"
              >
                View the World
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Polaroid Wall Overlay */}
      {isHotelView && (
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {activeHotels.map((hotel, idx) => {
            const pos = positions[idx];
            if (!pos) return null;
            
            return (
              <div 
                key={hotel.name + idx + batchIndex} 
                className={`polaroid-frame pointer-events-auto ${fadingOut ? '' : 'polaroid-entering'}`}
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: fadingOut 
                    ? `scale(0.9) rotate(${pos.rotation}deg)` 
                    : `rotate(${pos.rotation}deg) translate(0, 0)`,
                  opacity: fadingOut ? 0 : 1,
                  '--rotation': `${pos.rotation}deg`,
                  '--delay': idx < 4 ? '0ms' : '400ms',
                  marginLeft: '-150px', 
                  marginTop: '-180px'   
                } as any}
                onClick={() => window.open(hotel.url, '_blank', 'noopener,noreferrer')}
              >
                <div className="polaroid-photo">
                  <img src={`https://loremflickr.com/600/600/hotel,luxury?lock=${idx + batchIndex * 10}`} alt={hotel.name} className="w-full h-full object-cover" />
                </div>
                <div className="polaroid-caption">
                  <span className="hotel-name">{hotel.name}</span>
                  <span className="hotel-meta">{hotel.distance} · {hotel.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
