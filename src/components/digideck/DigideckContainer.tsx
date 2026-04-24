import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance - reduced for mobile
  const minSwipeDistance = 30;
  
  // Edge swipe detection width - increased for mobile
  const edgeSwipeWidth = window.innerWidth < 768 ? 60 : 100;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    // Check if swipe started from edge
    const isEdgeSwipe = touchStart < edgeSwipeWidth || touchStart > window.innerWidth - edgeSwipeWidth;
    
    if (isEdgeSwipe) {
      if (isLeftSwipe && currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
      if (isRightSwipe && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setSidebarOpen(false);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') setSidebarOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Prevent body scroll when digideck is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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

  const handleSlideChange = (newIndex: number) => {
    setDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(newIndex);
  };

  const CurrentSlideComponent = slides[currentSlide]?.component;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-charcoal"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Hamburger Menu */}
      <button
        className="fixed top-6 left-6 z-50 text-ivory hover:text-amber transition-colors p-2 border border-amber/50 hover:border-amber"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        {sidebarOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
      </button>

      {/* Edge Navigation Indicators */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-30">
        <div className="h-full w-full bg-gradient-to-r from-black/20 to-transparent" />
        {currentSlide > 0 && (
          <button
            onClick={() => handleSlideChange(currentSlide - 1)}
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
            onClick={() => handleSlideChange(currentSlide + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/50 hover:text-amber transition-colors p-2 rounded-full hover:bg-black/20"
            aria-label="Next slide"
          >
            <ChevronRight size={32} strokeWidth={1} />
          </button>
        )}
      </div>

      {/* Slide Content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.6,
            ease: "easeInOut"
          }}
          className="absolute inset-0 w-full h-full"
        >
          {CurrentSlideComponent && <CurrentSlideComponent />}
        </motion.div>
      </AnimatePresence>

      {/* Dot Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
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
  );
}
