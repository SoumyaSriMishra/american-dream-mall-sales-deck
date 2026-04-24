import { motion } from 'framer-motion';
import { fadeUp, fadeIn, staggerContainer } from '../../../lib/animations';

export default function ContactSlide() {
  return (
    <div className="relative w-full h-screen bg-ivory overflow-hidden">
      <div className="h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto text-center">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="label mb-4 text-xs sm:text-sm"
              variants={fadeIn}
            >
              GET IN TOUCH
            </motion.p>
            
            <motion.h2
              className="font-display font-light text-charcoal mb-8 leading-[1.1]"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
              variants={fadeUp}
            >
              Ready to create<br />
              <em className="italic">extraordinary</em><br />
              experiences?
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
            >
              <div>
                <h3 className="font-display text-lg text-charcoal mb-3">Leasing Inquiries</h3>
                <a 
                  href="mailto:leasing@americandream.com"
                  className="cta-link text-sm"
                >
                  leasing@americandream.com
                </a>
              </div>
              <div>
                <h3 className="font-display text-lg text-charcoal mb-3">Sponsorship Partnerships</h3>
                <a 
                  href="mailto:sponsorships@americandream.com"
                  className="cta-link text-sm"
                >
                  sponsorships@americandream.com
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="space-y-3"
            >
              <p className="font-body text-xs sm:text-sm text-warm-grey">
                1 American Dream Way<br />
                East Rutherford, NJ 07073
              </p>
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
