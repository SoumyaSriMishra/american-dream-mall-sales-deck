import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { fadeUp, fadeIn, staggerContainer } from '../../../lib/animations';
import { entertainmentChapters } from '../../../data/mallData';
import { mediaAssets } from '../../../data/mediaAssets';

// ATTRACTIONS PANEL — GLASS SHATTER REVEAL
// Phase 0: Dark canvas overlay + golden hammer (idle)
// Phase 1: Hammer click → wind-up (0-200ms)
// Phase 2: Strike → screen shake + white flash + crack rays (200-380ms)  
// Phase 3: Canvas → SVG shards (Delaunay triangles) at impact (380ms)
// Phase 4: Shards fall with gravity stagger by distance (380-1500ms)
// Phase 5: Video fully revealed, shards removed (1500ms+)
// Reset: on panel re-entry, canvas refills and hammer reappears


function inCircumcircle(p: any, a: any, b: any, c: any) {
  const ax = a.x - p.x, ay = a.y - p.y;
  const bx = b.x - p.x, by = b.y - p.y;
  const cx = c.x - p.x, cy = c.y - p.y;
  return (
    (ax * ax + ay * ay) * (bx * cy - cx * by) -
    (bx * bx + by * by) * (ax * cy - cx * ay) +
    (cx * cx + cy * cy) * (ax * by - bx * ay)
  ) > 0;
}

function delaunay(points: any[]) {
  const n = points.length;
  const coords = new Float64Array(n * 2);
  for (let i = 0; i < n; i++) {
    coords[i * 2] = points[i].x;
    coords[i * 2 + 1] = points[i].y;
  }
  
  const margin = 5000;
  const superTriangle = [
    { x: -margin, y: -margin },
    { x: coords.length * margin, y: -margin },
    { x: 0, y: coords.length * margin }
  ];
  
  let triangles = [[n, n + 1, n + 2]];
  const allPoints = [...points, ...superTriangle];
  
  for (let i = 0; i < n; i++) {
    const p = allPoints[i];
    let edges: number[][] = [];
    
    triangles = triangles.filter(tri => {
      const [a, b, c] = tri.map(idx => allPoints[idx]);
      if (inCircumcircle(p, a, b, c)) {
        edges.push([tri[0], tri[1]]);
        edges.push([tri[1], tri[2]]);
        edges.push([tri[2], tri[0]]);
        return false;
      }
      return true;
    });
    
    edges = edges.filter((e, idx) => 
      !edges.some((e2, idx2) => idx !== idx2 && 
        ((e[0] === e2[1] && e[1] === e2[0]) || (e[0] === e2[0] && e[1] === e2[1])))
    );
    
    edges.forEach(e => triangles.push([e[0], e[1], i]));
  }
  
  return triangles.filter(t => t.every(i => i < n));
}
// --- End Delaunay Utility ---

// Shard Point Generator
function generateShardPoints(cx: number, cy: number, width: number, height: number) {
  const points = [];
  points.push({x: 0, y: 0});
  points.push({x: width, y: 0});
  points.push({x: 0, y: height});
  points.push({x: width, y: height});
  points.push({x: cx, y: cy}); // Impact center
  
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.3;
    const r = 80 + Math.random() * 120;
    points.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
  }
  
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.4;
    const r = 200 + Math.random() * 250;
    points.push({
      x: Math.max(10, Math.min(width-10, cx + Math.cos(angle) * r)),
      y: Math.max(10, Math.min(height-10, cy + Math.sin(angle) * r))
    });
  }
  
  for (let i = 0; i < 20; i++) {
    points.push({ x: 20 + Math.random() * (width - 40), y: 20 + Math.random() * (height - 40) });
  }
  return points;
}

// Reusable Foreground Content Component
const ForegroundContent = ({ opacityClass }: { opacityClass: string }) => (
  <div className={`absolute inset-0 z-[4] pointer-events-none h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 transition-opacity duration-[300ms] ${opacityClass}`}>
    <div className="w-full max-w-7xl mx-auto">
      <motion.div 
        className="text-center mb-8 lg:mb-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="label mb-4 text-amber text-xs sm:text-sm" variants={fadeIn}>
          ENTERTAINMENT DESTINATION
        </motion.p>
        
        <motion.h2
          className="font-display font-light text-ivory mb-6 leading-[1.1]"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)', textShadow: '0 4px 16px rgba(0,0,0,0.6)' }}
          variants={fadeUp}
          layoutId="heading"
        >
          World-class attractions<br />
          under <em className="italic">one</em> roof.
        </motion.h2>
      </motion.div>
      
      <motion.div 
        className="overflow-hidden whitespace-nowrap py-4 pointer-events-auto"
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
            <div key={`${chapter.name}-${index}`} className="flex-shrink-0 w-64 sm:w-72 lg:w-80">
              <div className="relative h-44 sm:h-52 lg:h-60 rounded-lg overflow-hidden mb-3">
                <motion.img 
                  src={chapter.image}
                  alt={chapter.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2 left-2">
                  <div className="text-2xl font-impact text-amber/60">{chapter.number}</div>
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
);

export default function EntertainmentSlide() {
  const panelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hammerRef = useRef<HTMLDivElement>(null);
  
  const [shatterComplete, setShatterComplete] = useState(false);
  const [shards, setShards] = useState<any[]>([]);
  
  const shatterPhase = useRef('idle');
  const allTimeouts = useRef<number[]>([]);

  const clearAllTimeouts = () => {
    allTimeouts.current.forEach(clearTimeout);
    allTimeouts.current = [];
  };

  useEffect(() => {
    // Mount / Panel Activation Reset
    const panel = panelRef.current;
    const canvas = canvasRef.current;
    const hammer = hammerRef.current;
    if (!panel || !canvas || !hammer) return;

    clearAllTimeouts();
    shatterPhase.current = 'idle';
    setShatterComplete(false);
    setShards([]);
    
    // Draw Frosted Glass Canvas
    canvas.width = panel.offsetWidth;
    canvas.height = panel.offsetHeight;
    canvas.style.display = 'block';
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Base dark opaque tint
    ctx.fillStyle = 'rgba(8, 8, 12, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Noise/shimmer dots
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.03})`;
      ctx.fill();
    }
    
    // Glass reflection gradient
    const glassSheen = ctx.createLinearGradient(0, 0, canvas.width * 0.6, canvas.height * 0.4);
    glassSheen.addColorStop(0, 'rgba(180, 200, 255, 0.04)');
    glassSheen.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glassSheen;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Reset Golden Hammer
    hammer.style.display = 'block';
    hammer.style.opacity = '1';
    hammer.style.transition = 'none';
    hammer.style.transform = 'translateY(-50%) rotate(-30deg)';
    hammer.style.animation = 'hammerIdle 2.5s ease-in-out infinite, hammerGlow 1.8s ease-in-out infinite';
    
    return clearAllTimeouts;
  }, []);

  const triggerShatter = () => {
    if (shatterPhase.current !== 'idle') return;
    shatterPhase.current = 'windUp';
    
    const panel = panelRef.current;
    const hammer = hammerRef.current;
    const canvas = canvasRef.current;
    if (!panel || !hammer || !canvas) return;

    // Phase 1: Wind-up (0-200ms)
    hammer.style.animation = 'none';
    hammer.style.transition = 'transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    hammer.style.transform = 'rotate(-60deg) translateX(20px)';

    allTimeouts.current.push(window.setTimeout(() => {
      // Phase 2: Strike (200-380ms)
      shatterPhase.current = 'strike';
      hammer.style.transition = 'transform 180ms cubic-bezier(0.55, 0, 1, 0.45)';
      
      const panelRect = panel.getBoundingClientRect();
      hammer.style.transform = `translate(-38vw, 35vh) rotate(45deg)`;
      
      allTimeouts.current.push(window.setTimeout(() => {
        // Phase 3: Impact (380ms)
        shatterPhase.current = 'shattering';
        
        // Impact Effect: Screen Shake
        panel.style.animation = 'screenShake 400ms cubic-bezier(0.36, 0.07, 0.19, 0.97)';
        allTimeouts.current.push(window.setTimeout(() => {
          panel.style.animation = 'none';
        }, 400));
        
        // Impact Effect: White Flash
        const flash = document.createElement('div');
        flash.style.cssText = `
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,220,100,0.7) 20%, rgba(200,169,110,0.4) 40%, transparent 65%);
          z-index: 9999; pointer-events: none; opacity: 1; transition: opacity 300ms ease;
        `;
        document.body.appendChild(flash);
        requestAnimationFrame(() => {
          flash.style.opacity = '0';
          setTimeout(() => flash.remove(), 300);
        });
        
        // Impact Effect: Crack Rays
        const cx = panel.offsetWidth / 2;
        const cy = panel.offsetHeight / 2;
        for (let i = 0; i < 30; i++) {
          const angle = (i / 30) * 360;
          const len = 60 + Math.random() * 200;
          const ray = document.createElement('div');
          ray.style.cssText = `
            position: fixed; left: ${panelRect.left + cx}px; top: ${panelRect.top + cy}px;
            width: ${len}px; height: 1.5px;
            background: linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0));
            transform-origin: left center;
            --rot: ${angle}deg;
            transform: rotate(${angle}deg) scaleX(0);
            z-index: 9998; pointer-events: none;
            animation: crackRay 250ms ease forwards;
          `;
          document.body.appendChild(ray);
          setTimeout(() => ray.remove(), 300);
        }
        
        // Hammer Recoil
        hammer.style.transition = 'opacity 200ms ease, transform 200ms ease';
        hammer.style.opacity = '0';
        hammer.style.transform += ' scale(0.8)';
        allTimeouts.current.push(window.setTimeout(() => {
          hammer.style.display = 'none';
        }, 200));

        // Generate Shards & Swap Canvas for SVG
        
        const pts = generateShardPoints(cx, cy, panel.offsetWidth, panel.offsetHeight);
        const tris = delaunay(pts);
        const triPoints = tris.map(tri => {
          const [p1, p2, p3] = tri.map(idx => pts[idx]);
          const scx = (p1.x + p2.x + p3.x) / 3;
          const scy = (p1.y + p2.y + p3.y) / 3;
          const dist = Math.sqrt((scx - cx)**2 + (scy - cy)**2);
          const maxDist = Math.sqrt(cx**2 + cy**2);
          const delay = (dist / maxDist) * 300;
          
          const fallX = (Math.random() - 0.5) * 300;
          const fallY = 800 + Math.random() * 500;
          const rotZ = (Math.random() - 0.5) * 240;
          
          return {
            points: `polygon(${p1.x}px ${p1.y}px, ${p2.x}px ${p2.y}px, ${p3.x}px ${p3.y}px)`,
            cx: scx, cy: scy, delay, fallX, fallY, rotZ
          };
        });
        
        setShards(triPoints);
        canvas.style.display = 'none';
        
        allTimeouts.current.push(window.setTimeout(() => {
          shatterPhase.current = 'revealed';
          setShatterComplete(true);
          setShards([]);
        }, 3000));
      }, 180));
    }, 200));
  };

  return (
    <div ref={panelRef} className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* z-0: Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={mediaAssets.videos.entertainmentNickelodeon} type="video/mp4" />
        </video>
      </div>

      {/* z-2: Glass Canvas Overlay (Background for all content) */}
      <canvas 
        ref={canvasRef} 
        id="glass-canvas" 
        className="absolute inset-0 z-[2] w-full h-full pointer-events-none" 
      />

      {/* z-3: Mirror Shards Container */}
      {shards.length > 0 && (
        <div className="absolute inset-0 z-[3] pointer-events-none">
          {shards.map((s, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ y: 0, x: 0, rotateZ: 0, opacity: 1 }}
              animate={{ 
                y: s.fallY, 
                x: s.fallX, 
                rotateZ: s.rotZ, 
                opacity: 0 
              }}
              transition={{ 
                duration: 2.0, 
                delay: s.delay / 1000, 
                ease: [0.55, 0.055, 0.675, 0.19] 
              }}
              style={{
                clipPath: s.points,
                transformOrigin: `${s.cx}px ${s.cy}px`
              }}
            >
              {/* The "Mirror" content inside the shard */}
              <div className="absolute inset-0 w-full h-full">
                {/* 1. Dark Glass Background for this shard */}
                <div className="absolute inset-0 bg-[#08080c] shadow-inner border border-white/20" />
                {/* 2. Cloned Content */}
                <ForegroundContent opacityClass="opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* z-4: Foreground Content (Text & Carousel) */}
      <ForegroundContent opacityClass={shatterPhase.current === 'shattering' || shatterPhase.current === 'revealed' ? 'opacity-0' : 'opacity-100'} />

      {/* z-5: Golden Hammer */}
      <div 
        ref={hammerRef} 
        className="golden-hammer idle" 
        id="goldenHammer" 
        onClick={triggerShatter}
      >
        <div className="hammer-label">
          <span>Want to be</span>
          <span className="hammer-label-bold">Attracted?</span>
        </div>
        <div className="hammer-assembly">
          <div className="hammer-head">
            <div className="hammer-face"></div>
            <div className="hammer-top"></div>
          </div>
          <div className="hammer-handle"></div>
        </div>
        <div className="hammer-hint">tap to break</div>
      </div>

      {/* Completion Message (Cursive White Text) */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center transition-opacity duration-1000 ${shatterComplete ? 'opacity-100' : 'opacity-0'}`} style={{ fontFamily: "'Dancing Script', cursive" }}>
        <h2 className="text-4xl sm:text-6xl lg:text-8xl drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
          Welcome to the Attraction
        </h2>
      </div>

    </div>
  );
}
