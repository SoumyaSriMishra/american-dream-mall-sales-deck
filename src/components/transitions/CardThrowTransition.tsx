// CARD THROW TRANSITION — Sponsorship → Contact
// Phase sequence:
// blackIn (0ms) → compressing (300ms) → falling (900ms) →
// bouncing (physics RAF) → resting → arrowAppear → thrown → done
// Triggered by: DeckNavigator intercepting right nav at panel index N
// Completes by: calling onComplete() which calls goToPanel(CONTACT_INDEX)

import React, { useState, useEffect, useRef } from 'react';

interface CardThrowTransitionProps {
  panelSnapshot: HTMLDivElement | null;
  onComplete: () => void;
  onCleanup: () => void;
}

type Phase = 'blackIn' | 'compressing' | 'falling' | 'bouncing' | 'resting' | 'arrowAppear' | 'thrown' | 'done';

export default function CardThrowTransition({ panelSnapshot, onComplete, onCleanup }: CardThrowTransitionProps) {
  const [phase, setPhase] = useState<Phase>('blackIn');
  const [cardTop, setCardTop] = useState(0);
  const [cardLeft, setCardLeft] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const [cardRotation, setCardRotation] = useState(0);
  const [contentScale, setContentScale] = useState(1);
  const [isSquishing, setIsSquishing] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef({
    velocityY: 0,
    isBouncing: false,
    bounceCount: 0,
    cardY: 0
  });

  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startTime: 0,
    startCardX: 0
  });

  const throwTriggered = useRef(false);

  useEffect(() => {
    if (!panelSnapshot || phase !== 'blackIn') return;

    const rect = panelSnapshot.getBoundingClientRect();
    setCardTop(rect.top);
    setCardLeft(rect.left);
    setCardWidth(rect.width);
    setCardHeight(rect.height);

    // Phase 1: Fade in black overlay
    requestAnimationFrame(() => {
      setOverlayOpacity(1);
    });

    const t1 = setTimeout(() => {
      setPhase('compressing');
    }, 300);

    return () => clearTimeout(t1);
  }, [panelSnapshot]);

  useEffect(() => {
    if (phase === 'compressing') {
      const targetWidth = 340;
      const targetHeight = 194;
      const targetLeft = window.innerWidth / 2 - targetWidth / 2;
      const targetTop = window.innerHeight / 2 - targetHeight / 2;

      setCardWidth(targetWidth);
      setCardHeight(targetHeight);
      setCardLeft(targetLeft);
      setCardTop(targetTop);
      setContentScale(targetWidth / (window.innerWidth || 1920));

      const t2 = setTimeout(() => {
        setPhase('falling');
      }, 650);
      return () => clearTimeout(t2);
    }

    if (phase === 'falling') {
      const groundY = window.innerHeight - 254; // Resting top
      const gravity = 0.8;
      const bounceDamping = 0.55;
      const maxBounces = 3;

      physicsRef.current.cardY = window.innerHeight / 2 - 97;
      physicsRef.current.velocityY = 0;
      physicsRef.current.isBouncing = true;
      physicsRef.current.bounceCount = 0;

      const physicsLoop = () => {
        if (!physicsRef.current.isBouncing) return;

        physicsRef.current.velocityY += gravity;
        physicsRef.current.cardY += physicsRef.current.velocityY;

        if (physicsRef.current.cardY >= groundY) {
          physicsRef.current.cardY = groundY;
          physicsRef.current.velocityY = -physicsRef.current.velocityY * bounceDamping;
          physicsRef.current.bounceCount++;

          // Squish effect
          setIsSquishing(true);
          setTimeout(() => setIsSquishing(false), 200);

          if (Math.abs(physicsRef.current.velocityY) < 1.5 || physicsRef.current.bounceCount >= maxBounces) {
            physicsRef.current.cardY = groundY;
            physicsRef.current.velocityY = 0;
            physicsRef.current.isBouncing = false;
            setCardTop(groundY);
            setPhase('resting');
            return;
          }
        }

        setCardTop(physicsRef.current.cardY);
        requestAnimationFrame(physicsLoop);
      };

      requestAnimationFrame(physicsLoop);
    }

    if (phase === 'resting') {
      setTimeout(() => {
        setPhase('arrowAppear');
        setShowArrow(true);
      }, 500);
    }
  }, [phase]);

  const handleStart = (clientX: number, e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (phase !== 'resting' && phase !== 'arrowAppear') return;
    dragRef.current.isDragging = true;
    dragRef.current.startX = clientX;
    dragRef.current.startTime = Date.now();
    dragRef.current.startCardX = cardLeft;
    setShowArrow(false);

    // Add global listeners for smoother tracking
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
  };

  const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: TouchEvent) => {
    if (dragRef.current.isDragging) e.preventDefault(); // Prevent scroll while throwing
    handleMove(e.touches[0].clientX);
  };

  const handleMove = (clientX: number) => {
    if (!dragRef.current.isDragging) return;
    const dx = clientX - dragRef.current.startX;
    
    // Direct DOM manipulation for maximum smoothness if needed, 
    // but React state is fine if we avoid unnecessary re-renders.
    setCardLeft(dragRef.current.startCardX + dx);
    setCardRotation(dx * 0.05); // No clamp for more organic feel
  };

  const onMouseUp = (e: MouseEvent) => handleEnd(e.clientX);
  const onTouchEnd = (e: TouchEvent) => handleEnd(e.changedTouches[0].clientX);

  const handleEnd = (clientX: number) => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;

    // Remove global listeners
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    
    const dx = clientX - dragRef.current.startX;
    const dt = Date.now() - dragRef.current.startTime;
    const velocity = Math.abs(dx) / dt;

    if ((velocity > 0.4 && dx > 20) || dx > 150) {
      triggerThrow(velocity);
    } else {
      // Snap back with transition
      setPhase('resting');
      setCardLeft(window.innerWidth / 2 - 170);
      setCardRotation(0);
      setShowArrow(true);
    }
  };

  const triggerThrow = (velocity: number) => {
    if (throwTriggered.current) return;
    throwTriggered.current = true;
    
    setPhase('thrown');
    setShowArrow(false);
    const duration = Math.max(400, 700 - velocity * 100);

    // Inject keyframes
    const restingLeft = cardLeft;
    const restingTop = cardTop;
    const throwKeyframes = `
      @keyframes throwCard {
        0% { left: ${restingLeft}px; top: ${restingTop}px; transform: rotate(${cardRotation}deg) scale(1); opacity: 1; }
        35% { left: ${restingLeft + 200}px; top: ${restingTop - 120}px; transform: rotate(12deg) scale(1.05); opacity: 1; }
        70% { left: ${restingLeft + 500}px; top: ${restingTop - 60}px; transform: rotate(25deg) scale(0.9); opacity: 0.8; }
        100% { left: ${window.innerWidth + 200}px; top: ${restingTop + 100}px; transform: rotate(35deg) scale(0.7); opacity: 0; }
      }
    `;

    const styleEl = document.createElement('style');
    styleEl.id = 'throw-keyframes';
    styleEl.textContent = throwKeyframes;
    document.head.appendChild(styleEl);

    if (cardRef.current) {
      cardRef.current.style.animation = `throwCard ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
    }

    // Sparkle trail
    const sparkleInterval = setInterval(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      spawnSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }, 40);

    setTimeout(() => {
      clearInterval(sparkleInterval);
      
      // Change the slide while the screen is still black
      onComplete();
      
      // Wait a tiny bit for React to render the new slide, then fade out
      setTimeout(() => {
        setOverlayOpacity(0);
        setTimeout(() => {
          onCleanup();
          const style = document.getElementById('throw-keyframes');
          if (style) style.remove();
        }, 600);
      }, 150);
    }, duration);
  };

  const spawnSparkle = (x: number, y: number) => {
    const p = document.createElement('div');
    p.style.cssText = `
      position: fixed; left: ${x}px; top: ${y}px;
      width: ${6 + Math.random() * 8}px; height: ${6 + Math.random() * 8}px;
      background: #C8A96E; border-radius: 50%; z-index: 8003;
      pointer-events: none; animation: ctSparkle 600ms ease-out forwards;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 600);
  };

  return (
    <div className="fixed inset-0 z-[8000] overflow-hidden pointer-events-none">
      {/* Black Overlay */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-300 pointer-events-auto"
        style={{ opacity: overlayOpacity }}
        onTouchStart={(e) => handleStart(e.touches[0].clientX, e)}
        onMouseDown={(e) => handleStart(e.clientX, e)}
      />

      {/* Card Clone */}
      <div
        ref={cardRef}
        className={`fixed z-[8001] bg-[#F5F0E8] overflow-hidden shadow-2xl pointer-events-auto cursor-grab active:cursor-grabbing ${isSquishing ? 'card-squish' : ''}`}
        style={{
          top: cardTop,
          left: cardLeft,
          width: cardWidth,
          height: cardHeight,
          borderRadius: phase === 'blackIn' ? 0 : 12,
          transform: `rotate(${cardRotation}deg)`,
          transition: (phase === 'compressing' || !dragRef.current.isDragging) ? 'all 600ms cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
          willChange: 'transform, left, top'
        }}
        onMouseDown={(e) => handleStart(e.clientX, e)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX, e)}
      >
        {/* Card Content - Replica */}
        <div 
          className="absolute inset-0"
          style={{ 
            width: '1920px', 
            height: '1080px', 
            transform: `scale(${contentScale})`,
            transformOrigin: 'top left'
          }}
        >
           {/* If we are in business card mode, show the premium back face */}
           {(phase !== 'blackIn' && phase !== 'compressing') ? (
             <div className="w-full h-full bg-[#1a1a1a] relative flex flex-col p-[80px] border-t-[15px] border-[#C8A96E]">
                <div className="text-[#C8A96E] text-[120px] mb-4">Ⓐ</div>
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <div className="text-[#C8A96E] text-[60px] tracking-[0.3em] font-light mb-4">PARTNERSHIP OPPORTUNITIES</div>
                  <div className="text-white/50 text-[40px]">americandream.com</div>
                </div>
                <div className="absolute bottom-[40px] right-[40px] text-[#C8A96E] text-[40px] font-bold">AD</div>
                <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-[#C8A96E]" />
                <div className="card-shine" />
             </div>
           ) : (
             <div className="w-full h-full bg-[#F5F0E8] p-[80px] flex flex-col">
               <div className="text-[80px] font-serif text-[#1a1a1a] mb-12">Partnership Opportunities</div>
               <div className="space-y-6 flex-1">
                 {['FLAGSHIP — Signature Partner', 'PREMIUM — Activation Partner', 'STANDARD — Digital Partner'].map((tier, i) => (
                   <div key={i} className="p-8 border border-[#C8A96E]/30 border-l-[12px] border-l-[#C8A96E] bg-[#C8A96E]/5 text-[40px] text-[#333]">
                     {tier}
                   </div>
                 ))}
               </div>
               <div className="mt-auto text-[#C8A96E] text-[30px] tracking-[0.2em] uppercase">American Dream · americandream.com</div>
             </div>
           )}
        </div>
      </div>

      {/* Throw Arrow & Hint */}
      {showArrow && (
        <div className="fixed z-[8002] pointer-events-none" style={{ bottom: '284px', left: 'calc(50% + 190px)' }}>
          <svg className="ct-arrow" viewBox="0 0 120 80" width="120" height="80">
            <path d="M 10,60 Q 50,10 100,30" stroke="#C8A96E" strokeWidth="2.5" fill="none" strokeDasharray="4,3" strokeLinecap="round" />
            <polygon points="95,22 110,32 97,40" fill="#C8A96E" />
          </svg>
          <div className="absolute top-[80px] left-[20px] text-[#C8A96E] font-sans text-[11px] uppercase tracking-[0.15em] whitespace-nowrap animate-pulse">
            swipe to send →
          </div>
        </div>
      )}

      {/* Ground Shadow */}
      {phase !== 'blackIn' && phase !== 'compressing' && (
        <div 
          className={`fixed bottom-[60px] left-1/2 -translate-x-1/2 w-[340px] h-[20px] rounded-[50%] bg-black/60 blur-[10px] pointer-events-none transition-opacity duration-300`}
          style={{ opacity: phase === 'thrown' ? 0 : 0.6 }}
        />
      )}

      <style>{`
        @keyframes ctSparkle {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0) translateY(-30px); opacity: 0; }
        }
        .card-squish {
          animation: ctSquish 200ms ease-out;
        }
        @keyframes ctSquish {
          0% { transform: scaleX(1) scaleY(1); }
          30% { transform: scaleX(1.15) scaleY(0.85); }
          65% { transform: scaleX(0.95) scaleY(1.05); }
          100% { transform: scaleX(1) scaleY(1); }
        }
        .ct-arrow {
          animation: arrowBounce 0.8s ease-in-out infinite;
        }
        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }
        .card-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%);
          background-size: 250% 250%;
          animation: ctShine 3s ease-in-out infinite;
        }
        @keyframes ctShine {
          0% { background-position: 200% 200%; }
          100% { background-position: -100% -100%; }
        }
      `}</style>
    </div>
  );
}
