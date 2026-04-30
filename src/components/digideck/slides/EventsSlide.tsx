import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { fadeUp, fadeIn, staggerContainer } from '../../../lib/animations';

export default function EventsSlide() {
  const panelRef = useRef<HTMLDivElement>(null);
  const logicCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);
  const dusterRef = useRef<HTMLDivElement>(null);
  
  const [wipeComplete, setWipeComplete] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [lettersFalling, setLettersFalling] = useState(false);
  
  const dragState = useRef({
    isDragging: false,
    lastX: 0,
    lastY: 0,
    lastEraseX: 0,
    lastEraseY: 0,
    dustThrottle: 0,
    currentPathData: '',
    currentPathNode: null as SVGPathElement | null
  });

  const eraseLinePath = (x1: number, y1: number, x2: number, y2: number, radius: number) => {
    // 1. Update SVG Mask (Visuals)
    if (dragState.current.currentPathNode) {
      dragState.current.currentPathData += ` L ${x2} ${y2}`;
      dragState.current.currentPathNode.setAttribute('d', dragState.current.currentPathData);
    }

    // 2. Update Hidden Canvas (Logic)
    const canvas = logicCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = radius * 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over';
      }
    }
  };

  const spawnDustParticle = (x: number, y: number) => {
    dragState.current.dustThrottle++;
    if (dragState.current.dustThrottle % 3 !== 0) return;
    
    const particle = document.createElement('div');
    const animId = Math.floor(Math.random() * 5) + 1;
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${4 + Math.random() * 8}px;
      height: ${4 + Math.random() * 8}px;
      border-radius: 50%;
      background: rgba(200, 169, 110, ${0.3 + Math.random() * 0.4});
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      animation: dustFloat${animId} 0.8s ease-out forwards;
    `;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
  };

  const checkWipeProgress = () => {
    const canvas = logicCanvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return 0;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;
    
    // Sample every 20th pixel (actually 80 array elements)
    for (let i = 3; i < pixels.length; i += 80) {
      if (pixels[i] < 128) transparentCount++;
    }
    
    const totalSampled = pixels.length / 80;
    return transparentCount / totalSampled;
  };

  useEffect(() => {
    const canvas = logicCanvasRef.current;
    const panel = panelRef.current;
    const duster = dusterRef.current;
    if (!canvas || !panel || !duster) return;

    const fillCanvas = () => {
      // Clear SVG Mask Paths
      if (maskGroupRef.current) {
        maskGroupRef.current.innerHTML = '';
      }

      // Reset Logic Canvas
      canvas.width = panel.offsetWidth;
      canvas.height = panel.offsetHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.fillStyle = '#0A0A0A';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      setWipeComplete(false);
      
      duster.style.left = 'auto';
      duster.style.top = 'auto';
      duster.style.right = '60px';
      duster.style.bottom = '80px';
      duster.style.opacity = '1';
      duster.style.transform = 'rotate(-3deg)';
      duster.style.transition = 'none';
      duster.classList.add('idle');
    };

    fillCanvas();
    window.addEventListener('resize', fillCanvas);

    const startDrag = (e: MouseEvent | TouchEvent) => {
      if (wipeComplete) return;
      
      const isTouch = e.type === 'touchstart';
      const clientX = isTouch ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = isTouch ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      
      dragState.current.isDragging = true;
      duster.classList.add('dragging');
      duster.classList.remove('idle');
      duster.style.transition = 'none';
      
      dragState.current.lastX = clientX;
      dragState.current.lastY = clientY;
      
      const panelRect = panel.getBoundingClientRect();
      const rect = duster.getBoundingClientRect();
      
      dragState.current.lastEraseX = rect.left - panelRect.left + rect.width / 2;
      dragState.current.lastEraseY = rect.top - panelRect.top + rect.height;
      
      // Start a new SVG Path for this drag
      if (maskGroupRef.current) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'black');
        
        // Dynamic radius based on touch/mouse
        const radius = isTouch ? 70 : 80;
        path.setAttribute('stroke-width', (radius * 2).toString());
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        
        maskGroupRef.current.appendChild(path);
        dragState.current.currentPathNode = path;
        dragState.current.currentPathData = `M ${dragState.current.lastEraseX} ${dragState.current.lastEraseY}`;
        path.setAttribute('d', dragState.current.currentPathData);
      }
      
      if (isTouch) {
        document.addEventListener('touchmove', onDrag, { passive: false });
        document.addEventListener('touchend', stopDrag);
      } else {
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDrag);
      }
    };

    const onDrag = (e: MouseEvent | TouchEvent) => {
      if (!dragState.current.isDragging) return;
      
      const isTouch = e.type === 'touchmove' || e.type === 'touchstart';
      if (e.type === 'touchmove') e.preventDefault(); 
      
      const clientX = isTouch ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = isTouch ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      const radius = isTouch ? 70 : 80;
      
      const panelRect = panel.getBoundingClientRect();
      
      const newLeft = clientX - panelRect.left - duster.offsetWidth / 2;
      const newTop = clientY - panelRect.top - duster.offsetHeight / 2;
      
      const clampedLeft = Math.max(0, Math.min(newLeft, panelRect.width - duster.offsetWidth));
      const clampedTop = Math.max(0, Math.min(newTop, panelRect.height - duster.offsetHeight));
      
      duster.style.left = clampedLeft + 'px';
      duster.style.top = clampedTop + 'px';
      duster.style.bottom = 'auto';
      duster.style.right = 'auto';
      
      const eraseX = clampedLeft + duster.offsetWidth / 2;
      const eraseY = clampedTop + duster.offsetHeight;
      
      eraseLinePath(dragState.current.lastEraseX, dragState.current.lastEraseY, eraseX, eraseY, radius);
      
      const dx = clientX - dragState.current.lastX;
      const tilt = Math.max(-15, Math.min(15, dx * 0.5));
      duster.style.transform = `rotate(${tilt}deg)`;
      
      dragState.current.lastX = clientX;
      dragState.current.lastY = clientY;
      dragState.current.lastEraseX = eraseX;
      dragState.current.lastEraseY = eraseY;
      
      spawnDustParticle(clientX, clientY + duster.offsetHeight/2);
    };

    const stopDrag = () => {
      if (!dragState.current.isDragging) return;
      dragState.current.isDragging = false;
      duster.classList.remove('dragging');
      duster.classList.add('idle');
      duster.style.transform = 'rotate(-3deg)';
      
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', stopDrag);
    };

    duster.addEventListener('mousedown', startDrag);
    duster.addEventListener('touchstart', startDrag, { passive: true });

    const progressInterval = setInterval(() => {
      if (dragState.current.isDragging) {
        const percent = checkWipeProgress();
        if (percent > 0.80) {
          setWipeComplete(true);
          clearInterval(progressInterval);
          stopDrag();
          
          duster.style.transition = 'opacity 800ms ease, transform 800ms ease';
          duster.style.opacity = '0';
          duster.style.transform = 'scale(0.8)';
          duster.classList.remove('idle');
          duster.style.animation = 'none';
          
          setTimeout(() => {
            setShowCompletion(true);
            setTimeout(() => {
              setLettersFalling(true);
            }, 2000);
          }, 1000);
        }
      }
    }, 500);

    return () => {
      window.removeEventListener('resize', fillCanvas);
      duster.removeEventListener('mousedown', startDrag);
      duster.removeEventListener('touchstart', startDrag);
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', stopDrag);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div ref={panelRef} className="relative w-full h-screen overflow-hidden">
      
      {/* z-0: Background Video */}
      <div className="absolute inset-0 overflow-hidden bg-black z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover object-left scale-[1.03] -translate-x-[1.5%]"
        >
          <source src="/event-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* SVG Mask Definition */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <filter id="soft-edge">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <mask id="wipe-mask">
            <rect width="100%" height="100%" fill="white" />
            <g ref={maskGroupRef} filter="url(#soft-edge)"></g>
          </mask>
        </defs>
      </svg>

      {/* Hidden Logic Canvas */}
      <canvas 
        ref={logicCanvasRef} 
        className="absolute inset-0 z-0 pointer-events-none opacity-0"
      />

      {/* z-10: FOREGROUND CONTAINER (Masked to erase background AND text) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          WebkitMask: 'url(#wipe-mask)',
          mask: 'url(#wipe-mask)',
          opacity: wipeComplete ? 0 : 1,
          transition: 'opacity 800ms ease'
        }}
      >
        {/* Dark Overlay with CSS Vignette */}
        <div className="absolute inset-0 bg-[#0A0A0A]">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.4) 85%)' }} />
        </div>

        {/* Text Content */}
        <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
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
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)', textShadow: '0 4px 16px rgba(0,0,0,0.4)' }}
              variants={fadeUp}
              layoutId="heading"
            >
              A Platform for World's<br />Biggest Moments
            </motion.h2>
            
            <motion.p
              className="font-display italic text-ivory/80 text-lg sm:text-xl lg:text-2xl font-light"
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
                <p className="font-body text-[9px] sm:text-[10px] tracking-[0.15em] text-ivory/80 uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>

      {/* z-30: Golden Duster */}
      <div ref={dusterRef} className="golden-duster idle" id="goldenDuster">
        <div className="duster-body">
          <div className="duster-felt"></div>
          <div className="duster-label">
            <span className="duster-text">Wipe out to</span>
            <span className="duster-text-bold">live the moment</span>
          </div>
          <div className="duster-grip-lines">
            <div className="grip-line"></div>
            <div className="grip-line"></div>
            <div className="grip-line"></div>
          </div>
        </div>
        <div className="duster-shadow"></div>
      </div>

      {/* Completion Message (Cursive White Text with Falling Effect) */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] text-white text-center transition-opacity duration-1000 ${showCompletion ? 'opacity-100' : 'opacity-0'}`} 
        style={{ fontFamily: "'Dancing Script', cursive", pointerEvents: 'none' }}
      >
        <h2 className="text-4xl sm:text-6xl lg:text-8xl drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] flex justify-center items-center gap-[0.1em] whitespace-nowrap">
          {"YOU'RE IN THE MOMENT".split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={false}
              animate={lettersFalling ? {
                y: 1000,
                x: (Math.random() - 0.5) * 200,
                rotate: (Math.random() - 0.5) * 360,
                opacity: 0,
              } : { y: 0, x: 0, rotate: 0, opacity: 1 }}
              transition={{
                duration: 2.5,
                delay: i * 0.05,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h2>
      </div>
    </div>
  );
}
