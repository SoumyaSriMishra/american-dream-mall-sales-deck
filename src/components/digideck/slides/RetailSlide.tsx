// Phase 1: Glow state (default)
// Phase 2: Explosion on click → letters scatter, shockwave flash
// Phase 3: Content vanish at t=300ms → video reveal at t=600ms

import { motion } from 'framer-motion';
import { fadeUp, scaleIn, fadeIn, staggerContainer } from '../../../lib/animations';
import { tenantMarquee } from '../../../data/mallData';
import { mediaAssets } from '../../../data/mediaAssets';

export default function RetailSlide() {
  const triggerExplosion = () => {
    // Phase 1: Glow state (default)
    const bar = document.getElementById('liveExplosureBar');
    if (!bar) return;
    bar.classList.remove('live-pulse');

    // Phase 2: Explosion on click → letters scatter
    const rect = bar.getBoundingClientRect();


    const letters = document.querySelectorAll('.live-letter');
    letters.forEach((letter, index) => {
      const lRect = letter.getBoundingClientRect();
      const clone = letter.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.left = lRect.left + 'px';
      clone.style.top = lRect.top + 'px';
      clone.style.margin = '0';
      clone.style.zIndex = '9999';
      clone.style.pointerEvents = 'none';
      document.body.appendChild(clone);
      
      // Hide the original letter so it looks like it exploded
      (letter as HTMLElement).style.opacity = '0';
      
      const triggerLetterExplosion = (el: HTMLElement) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 400 + Math.random() * 800; // Fly further
        const vx = Math.cos(angle) * distance;
        const vy = Math.sin(angle) * distance;
        const rotation = (Math.random() - 0.5) * 720; // Slower rotation
        const duration = 2500 + Math.random() * 1500; // Slow motion: 2.5s to 4s
        const finalScale = 3 + Math.random() * 6; // Enlarge as they fly (3x to 9x)

        // Force reflow so the browser registers the initial fixed position
        void el.offsetHeight;

        // Use cubic-bezier ease-out so it slows down elegantly as it flies
        el.style.transition = `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration * 0.9}ms ease-in`;
        
        requestAnimationFrame(() => {
          el.style.transform = `translate(${vx}px, ${vy}px) rotate(${rotation}deg) scale(${finalScale})`;
          el.style.opacity = '0';
        });

        setTimeout(() => el.remove(), duration + 100);
      };

      setTimeout(() => triggerLetterExplosion(clone), index * 20);
    });

    // Phase 3: Content vanish at t=300ms → video reveal at t=600ms
    setTimeout(() => {
      const mainContent = document.getElementById('retail-main-content');
      if (mainContent) {
        mainContent.style.transition = 'opacity 200ms ease';
        mainContent.style.opacity = '0';
        setTimeout(() => {
          mainContent.style.display = 'none';
        }, 200);
      }
    }, 300);

    setTimeout(() => {
      const panelContainer = document.getElementById('retail-panel-container');
      if (!panelContainer) return;

      const video = document.createElement('video');
      video.src = '/retail-view.mp4';
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;

      video.style.cssText = `
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        z-index: 1;
        opacity: 0;
        transform: scale(1.05);
        transition: opacity 1000ms ease, transform 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
      `;

      panelContainer.appendChild(video);

      video.addEventListener('canplay', () => {
        requestAnimationFrame(() => {
          video.style.opacity = '1';
          video.style.transform = 'scale(1)';
        });
      });
      
      video.play().catch(err => console.log('Autoplay prevented:', err));

      const overlayText = document.createElement('div');
      overlayText.style.cssText = `
        position: absolute;
        bottom: 80px; left: 80px;
        z-index: 2;
        pointer-events: auto;
      `;
      overlayText.innerHTML = `
        <h2 style="color:#ffffff;font-size:48px;font-family:'Playfair Display',serif;font-weight:400;margin-bottom:24px;line-height:1.1;">
            See It. Feel It.<br />Be Part of It.
        </h2>
      `;
      panelContainer.appendChild(overlayText);
    }, 600);
  };

  return (
    <div id="retail-panel-container" className="relative w-full h-screen bg-parchment overflow-hidden">
      <div id="retail-main-content" className="h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center w-full max-w-7xl mx-auto">
          
          <div className="w-full lg:w-1/2">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.p
                className="label mb-4 text-xs sm:text-sm"
                variants={fadeIn}
              >
                THE RETAIL EXPERIENCE
              </motion.p>
              
              <motion.h2
                className="font-display font-light text-charcoal mb-6 leading-[1.1]"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
                variants={fadeUp}
                layoutId="heading"
              >
                Where the world's<br />
                best brands <em className="italic">come</em><br />
                to lead.
              </motion.h2>
              
              <motion.div
                variants={fadeUp}
                className="overflow-hidden whitespace-nowrap mt-6 -ml-2 pl-2 max-w-[100vw]"
              >
                <motion.div
                  className="inline-flex gap-8 sm:gap-12"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                  {[...tenantMarquee, ...tenantMarquee].map((t, i) => (
                    <span key={i} className="font-body font-light text-xs sm:text-sm tracking-widest text-slate/60 uppercase">
                      {t}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
              
              <motion.a 
                href="mailto:leasing@americandream.com"
                className="cta-link mt-6 inline-block text-xs sm:text-sm"
                variants={fadeUp}
              >
                Inquire About Leasing
              </motion.a>

              <div className="live-explosure-container mt-6">
                <div 
                  className="inline-block bg-amber border border-amber text-charcoal font-body font-medium text-[13px] tracking-[0.12em] uppercase px-4 py-1.5 transition-all duration-300 shadow-md cursor-pointer active:scale-95"
                  id="liveExplosureBar"
                  onClick={triggerExplosion}
                >
                  <span className="live-letter" data-index="0">L</span>
                  <span className="live-letter" data-index="1">I</span>
                  <span className="live-letter" data-index="2">V</span>
                  <span className="live-letter" data-index="3">E</span>
                  <span className="live-letter" data-index="4">&nbsp;</span>
                  <span className="live-letter" data-index="5">E</span>
                  <span className="live-letter" data-index="6">X</span>
                  <span className="live-letter" data-index="7">P</span>
                  <span className="live-letter" data-index="8">L</span>
                  <span className="live-letter" data-index="9">O</span>
                  <span className="live-letter" data-index="10">S</span>
                  <span className="live-letter" data-index="11">U</span>
                  <span className="live-letter" data-index="12">R</span>
                  <span className="live-letter" data-index="13">E</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2 grid grid-cols-1 gap-4 lg:gap-6">
            <motion.div 
              className="img-zoom-wrap h-[30vh] lg:h-[35vh]"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
            >
              <motion.img 
                src={mediaAssets.sections.retailExperience} 
                alt="Retail Experience"
                className="w-full h-full object-cover rounded-2xl"
                layoutId="main-image"
              />
            </motion.div>
            <motion.div 
              className="img-zoom-wrap h-[30vh] lg:h-[35vh]"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <img 
                src={mediaAssets.sections.retailShowcase} 
                alt="Retail Flagships"
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
