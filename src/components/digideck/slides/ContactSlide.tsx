// CONTACT PANEL — CARD EXPAND REVEAL (Original Style)
import { useState, useEffect } from 'react';

interface ContactSlideProps {
  isActive?: boolean;
}

type ExpandPhase = 'compressed' | 'expanding' | 'revealed';

export default function ContactSlide({ isActive = true }: ContactSlideProps) {
  const [expandPhase, setExpandPhase] = useState<ExpandPhase>('compressed');

  useEffect(() => {
    if (!isActive) {
      setExpandPhase('compressed');
      return;
    }

    const t1 = setTimeout(() => setExpandPhase('expanding'), 400);
    const t2 = setTimeout(() => setExpandPhase('revealed'), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isActive]);

  return (
    <div 
      className="relative w-full h-screen overflow-hidden transition-colors duration-700"
      style={{ 
        backgroundColor: expandPhase === 'revealed' ? '#F5F0E8' : '#000000',
      }}
    >
      {/* Expanding Card Element */}
      {expandPhase !== 'revealed' && (
        <div 
          className={`expanding-card-actor ${expandPhase === 'expanding' ? 'card-expand-fill' : 'card-slide-in'}`}
        >
           <div className="card-face">
              <div className="card-logo">Ⓐ</div>
              <div className="card-text">CONTACT DECK</div>
              <div className="card-shine-anim" />
           </div>
        </div>
      )}

      {/* Main Content (Original Style) */}
      <div className={`h-full flex items-center px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${expandPhase === 'revealed' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-4xl mx-auto text-center">
            
            <div className="contact-reveal-item" style={{ '--reveal-delay': '0ms' } as any}>
              <p className="label mb-4 text-xs sm:text-sm">
                GET IN TOUCH
              </p>
            </div>
            
            <div className="contact-reveal-item" style={{ '--reveal-delay': '100ms' } as any}>
              <h2
                className="font-display font-light text-charcoal mb-8 leading-[1.1]"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
              >
                Ready to create<br />
                <em className="italic">extraordinary</em><br />
                experiences?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="contact-reveal-item" style={{ '--reveal-delay': '200ms' } as any}>
                <h3 className="font-display text-lg text-charcoal mb-3">Leasing Inquiries</h3>
                <a 
                  href="mailto:leasing@americandream.com"
                  className="cta-link text-sm"
                >
                  leasing@americandream.com
                </a>
              </div>
              <div className="contact-reveal-item" style={{ '--reveal-delay': '300ms' } as any}>
                <h3 className="font-display text-lg text-charcoal mb-3">Sponsorship Partnerships</h3>
                <a 
                  href="mailto:sponsorships@americandream.com"
                  className="cta-link text-sm"
                >
                  sponsorships@americandream.com
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <div className="contact-reveal-item" style={{ '--reveal-delay': '400ms' } as any}>
                <p className="font-body text-xs sm:text-sm text-warm-grey">
                  1 American Dream Way<br />
                  East Rutherford, NJ 07073
                </p>
              </div>
              <div className="contact-reveal-item" style={{ '--reveal-delay': '500ms' } as any}>
                <div className="flex justify-center gap-6">
                  <a 
                    href="tel:201-429-4500"
                    className="cta-link text-xs sm:text-sm"
                  >
                    201-429-4500
                  </a>
                  <a 
                    href="https://www.americandream.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-link text-xs sm:text-sm"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
        </div>
      </div>

      <style>{`
        .expanding-card-actor {
          position: absolute;
          width: 340px;
          height: 194px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 100;
          background: #1a1a1a;
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          overflow: hidden;
          border-top: 3px solid #C8A96E;
        }

        .card-face {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .card-logo {
          color: #C8A96E;
          font-size: 40px;
          margin-bottom: 4px;
        }

        .card-text {
          color: rgba(200,169,110,0.6);
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .card-slide-in {
          animation: cardSlideFromLeft 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        @keyframes cardSlideFromLeft {
          0% { left: -400px; transform: translate(0, -50%) rotate(-3deg); }
          100% { left: 50%; transform: translate(-50%, -50%) rotate(0deg); }
        }

        .card-expand-fill {
          animation: cardExpandFill 0.7s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
        }

        @keyframes cardExpandFill {
          0% { width: 340px; height: 194px; border-radius: 12px; }
          40% { width: 100%; height: 194px; border-radius: 0; }
          100% { width: 100%; height: 100%; border-radius: 0; }
        }

        .card-shine-anim {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.05) 50%, transparent 55%);
          background-size: 250% 250%;
          animation: cardShineEffect 3s ease-in-out infinite;
        }

        @keyframes cardShineEffect {
          0% { background-position: 200% 200%; }
          100% { background-position: -100% -100%; }
        }

        .contact-reveal-item {
          opacity: 0;
          transform: translateY(15px);
        }
        .opacity-100 .contact-reveal-item {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 500ms ease var(--reveal-delay), transform 500ms cubic-bezier(0.23, 1, 0.32, 1) var(--reveal-delay);
        }
      `}</style>
    </div>
  );
}
