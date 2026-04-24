import { motion } from 'framer-motion';
import { entertainmentChapters } from '../../data/mallData';

export default function EntertainmentSection() {
  const chapters = [...entertainmentChapters, ...entertainmentChapters];

  return (
    <section id="entertainment" className="relative h-screen bg-espresso overflow-hidden">
      <motion.div
        animate={{
          x: ["0vw", `-${(chapters.length / 2) * 100}vw`],
        }}
        transition={{
          duration: entertainmentChapters.length * 5,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          display: "flex",
          width: `${chapters.length * 100}vw`,
          height: "100%",
        }}
      >
        {chapters.map((chapter, i) => (
          <div key={i} className="w-screen h-screen relative flex-shrink-0">
            {/* Full-bleed background image */}
            <img 
              src={chapter.image} 
              alt={chapter.name} 
              className="absolute inset-0 w-full h-full object-cover origin-center" 
            />

            {/* Gradient overlay */}
            <div 
              className="absolute inset-0" 
              style={{
                background: 'linear-gradient(to top, rgba(28,27,25,0.95) 0%, rgba(28,27,25,0.2) 50%, transparent 100%)'
              }} 
            />

            {/* Chapter number watermark */}
            <div
              className="absolute top-16 right-16 font-impact text-ivory/5 select-none pointer-events-none"
              style={{ fontSize: 'clamp(8rem, 20vw, 18rem)' }}
            >
              {chapter.number}
            </div>

            {/* Content box */}
            <div className="absolute bottom-24 lg:bottom-16 left-8 lg:left-16 max-w-[90vw] lg:max-w-[560px]">
              <p className="label text-amber mb-4">{chapter.type} · {chapter.stat}</p>
              <h2 className="font-display font-light text-ivory mb-4 leading-[1.1]" style={{ fontSize: 'var(--text-display-lg)' }}>
                {chapter.name}
              </h2>
              <p className="body-copy text-ivory/65">{chapter.description}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
