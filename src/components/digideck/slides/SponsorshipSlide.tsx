import { motion } from 'framer-motion';
import { fadeUp, fadeIn, staggerContainer } from '../../../lib/animations';
import { sponsorshipTiers } from '../../../data/mallData';
import { mediaAssets } from '../../../data/mediaAssets';

interface SponsorshipSlideProps {
  snapshotRef?: React.RefObject<HTMLDivElement>;
}

export default function SponsorshipSlide({ snapshotRef }: SponsorshipSlideProps) {
  return (
    <div ref={snapshotRef} className="relative w-full h-screen bg-parchment overflow-hidden">
      <div className="h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
            
            {/* Left: Image with Audience Profile */}
            <div className="w-full lg:w-[55%] flex items-center">
              <motion.div 
                className="relative w-full h-[35vh] lg:h-[50vh] overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <div className="absolute inset-0">
                  <motion.img 
                    src={mediaAssets.sections.sponsorshipActivation} 
                    alt="Sponsorship Audience"
                    className="w-full h-full object-cover"
                    layoutId="main-image"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4" style={{
                  background: 'linear-gradient(to top, rgba(28,27,25,0.9) 0%, transparent 100%)'
                }}>
                  <motion.p
                    className="label mb-2 text-amber text-xs sm:text-sm"
                    variants={fadeIn}
                  >
                    AUDIENCE PROFILE
                  </motion.p>
                  {[
                    { label: 'Ages 18–34', value: '54%' },
                    { label: 'Income $50K+', value: '67%' },
                  ].map(({ label, value }, index) => (
                    <motion.div 
                      key={label} 
                      className="flex justify-start items-center border-b border-ivory/15 py-1 sm:py-2"
                      variants={fadeUp}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="font-body font-light text-xs sm:text-sm text-ivory/80">{label}</span>
                      <span className="font-impact text-amber text-lg sm:text-xl ml-auto">{value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Partnership Opportunities */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="mb-4" variants={fadeIn}>
                  <motion.h2 
                    className="font-display font-light text-charcoal leading-[1.1] mb-3" 
                    style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)' }}
                    layoutId="heading"
                  >
                    Partnership<br />Opportunities
                  </motion.h2>
                </motion.div>

                <div className="space-y-0">
                  {sponsorshipTiers.map((tier, index) => (
                    <motion.div 
                      key={tier.level} 
                      className="border-b border-border last:border-b-0 py-3" 
                      variants={fadeUp}
                      transition={{ delay: index * 0.1 }}
                    >
                      <p className="label text-amber mb-2 text-xs sm:text-sm">{tier.level}</p>
                      <h3 className="font-display font-light text-charcoal text-base sm:text-lg lg:text-xl mb-2">{tier.name}</h3>
                      <ul className="space-y-1">
                        {tier.inclusions.slice(0, 2).map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-xs sm:text-sm text-slate font-light">
                            <span className="text-amber mt-0.5">—</span>
                            <span className="flex-1 leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
                
                {/* CTA */}
                <motion.a 
                  href="mailto:partnerships@americandream.com"
                  className="cta-link mt-4 text-xs sm:text-sm"
                  variants={fadeUp}
                  transition={{ delay: 0.5 }}
                >
                  Want to be Attracted?
                </motion.a>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
