import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import IntroVideo from '../IntroVideo';
import CardThrowTransition from '../transitions/CardThrowTransition';

interface Slide {
  id: string;
  component: React.ComponentType;
  title: string;
}

interface DigideckContainerProps {
  slides: Slide[];
}

export default function DigideckContainer({ slides }: DigideckContainerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isCardThrowActive, setIsCardThrowActive] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sponsorshipSnapshotRef = useRef<HTMLDivElement>(null);
  const isNavigatingRef = useRef(false);

  // Minimum swipe distance - reduced for mobile
  const minSwipeDistance = 30;
  
  // Edge swipe detection width - increased for mobile
  const edgeSwipeWidth = window.innerWidth < 768 ? 60 : 100;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isCardThrowActive) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (isCardThrowActive || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    // Check if swipe started from edge
    const isEdgeSwipe = touchStart < edgeSwipeWidth || touchStart > window.innerWidth - edgeSwipeWidth;
    
    if (isEdgeSwipe) {
      if (isLeftSwipe && currentSlide < slides.length - 1) {
        handleSlideChange(currentSlide + 1);
      }
      if (isRightSwipe && currentSlide > 0) {
        handleSlideChange(currentSlide - 1);
      }
    }
  };

  const goToSlide = (index: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isNavigatingRef.current || isCardThrowActive) return;
    setCurrentSlide(index);
    setSidebarOpen(false);
  };

  const nextSlide = () => {
    if (isCardThrowActive) return;
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (isCardThrowActive) return;
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isNavigatingRef.current || isCardThrowActive) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentSlide < slides.length - 1) handleSlideChange(currentSlide + 1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentSlide > 0) handleSlideChange(currentSlide - 1);
      }
      if (e.key === 'Escape') setSidebarOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isCardThrowActive]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleIntroEnd = () => {
    setShowIntro(false);
  };

  const slideVariants = {
    enter: {
      opacity: 0
    },
    center: {
      zIndex: 1,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      opacity: 0
    }
  };

  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setDirection(0);
  }, [currentSlide]);

  const handleSlideChange = (newIndex: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isCardThrowActive) return;

    // Intercept Sponsorship (7) to Contact (8)
    if (currentSlide === 7 && newIndex === 8) {
      setIsCardThrowActive(true);
      return;
    }
    
    setDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(newIndex);
  };

  const onCardThrowComplete = () => {
    // Stage 1: Change slide behind curtain
    setCurrentSlide(8);
  };

  const onTransitionCleanup = () => {
    // Stage 2: Final cleanup
    setIsCardThrowActive(false);
  };

  const CurrentSlideComponent = slides[currentSlide]?.component;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Intro Video */}
      <AnimatePresence>
        {showIntro && (
          <IntroVideo onEnd={handleIntroEnd} />
        )}
      </AnimatePresence>

      {/* Main Content - Only show when intro is not playing */}
      {!showIntro && (
        <>
          <div className="relative w-full h-screen overflow-hidden bg-charcoal">
            {/* Hamburger Menu */}
            <button
              className="fixed top-6 left-6 z-50 text-ivory hover:text-amber transition-colors p-0 border border-amber/50 hover:border-amber"
              onClick={() => !isCardThrowActive && setSidebarOpen(true)}
              aria-label="Open menu"
            >
              {sidebarOpen ? <X size={32} strokeWidth={1} /> : <Menu size={32} strokeWidth={1} />}
            </button>

            {/* Watermark Logo - Show on all slides except first */}
            {currentSlide > 0 && (
              <img
                src="/American_Dream_Meadowlands_Logo.png"
                alt="American Dream Meadowlands"
                className="fixed top-6 left-14 z-50 h-8 w-auto opacity-100 transition-all duration-300"
              />
            )}

            {/* Edge Navigation Indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-30">
              <div className="h-full w-full bg-gradient-to-r from-black/20 to-transparent" />
              {currentSlide > 0 && (
                <button
                  onClick={(e) => handleSlideChange(currentSlide - 1, e)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/50 hover:text-amber transition-colors p-2 rounded-full hover:bg-black/20"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={32} strokeWidth={1} />
                </button>
              )}
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-20 z-30">
              <div className="h-full w-full bg-gradient-to-l from-black/20 to-transparent" />
              {currentSlide < slides.length - 1 && (
                <button
                  onClick={(e) => handleSlideChange(currentSlide + 1, e)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-500 p-2 ${
                    currentSlide === 7 
                      ? 'text-amber scale-150 glow-amber' 
                      : 'text-ivory/50 hover:text-amber rounded-full hover:bg-black/20'
                  }`}
                  aria-label="Next slide"
                >
                  <ChevronRight size={32} strokeWidth={currentSlide === 7 ? 2 : 1} />
                </button>
              )}
            </div>

            <style>{`
              .glow-amber {
                filter: drop-shadow(0 0 8px rgba(200, 169, 110, 0.6));
                animation: arrowPulse 1.5s ease-in-out infinite;
              }
              @keyframes arrowPulse {
                0%, 100% { opacity: 0.7; transform: translateY(-50%) scale(1.2); }
                50% { opacity: 1; transform: translateY(-50%) scale(1.35); }
              }
            `}</style>

            {/* Slide Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: currentSlide === 0 ? 0 : 0.4,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 w-full h-full"
              >
                {CurrentSlideComponent && 
                  (currentSlide === 0 ? 
                    (slides[0].component as any)({ goToSlide, currentSlide }) :
                    <CurrentSlideComponent 
                      isActive={true}
                      {...(currentSlide === 7 ? { snapshotRef: sponsorshipSnapshotRef } : {})} 
                    />
                  )
                }
              </motion.div>
            </AnimatePresence>

            {/* Dot Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => handleSlideChange(index, e)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 border border-amber/50 ${
                    index === currentSlide
                      ? 'bg-amber w-8 border-amber'
                      : 'bg-ivory/60 hover:bg-ivory border-amber/50 hover:border-amber'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Sidebar Navigation */}
            <AnimatePresence>
              {sidebarOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-40"
                    onClick={() => setSidebarOpen(false)}
                  />
                  <motion.aside
                    className="fixed left-0 top-0 bottom-0 w-80 bg-charcoal z-50 overflow-y-auto border-r border-amber/50"
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="p-8">
                      <h2 className="font-display text-2xl text-ivory mb-8">Navigation</h2>
                        <nav className="space-y-4">
                          {slides.map((slide, index) => (
                            <button
                              key={slide.id}
                              onClick={() => goToSlide(index)}
                              className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                                index === currentSlide
                                  ? 'bg-amber/20 text-amber border-l-4 border-amber'
                                  : 'text-ivory/70 hover:text-ivory hover:bg-ivory/10'
                              }`}
                            >
                              <div className="font-body text-sm font-medium tracking-wide">
                                {String(index + 1).padStart(2, '0')}
                              </div>
                              <div className="font-display text-lg mt-1">
                                {slide.title}
                              </div>
                            </button>
                          ))}
                        </nav>
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>
          </div>
        </>
      )}

      {/* Card Throw Transition Overlay */}
      {isCardThrowActive && (
        <CardThrowTransition 
          panelSnapshot={sponsorshipSnapshotRef.current} 
          onComplete={onCardThrowComplete} 
          onCleanup={onTransitionCleanup}
        />
      )}
    </div>
  );
}
