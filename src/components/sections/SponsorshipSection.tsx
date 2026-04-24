import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '../../lib/animations';
import { sponsorshipTiers } from '../../data/mallData';
import { mediaAssets } from '../../data/mediaAssets';

export default function SponsorshipSection() {
  return (
    <section id="sponsorship" className="bg-parchment section-padding">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          <div className="w-full lg:w-[58%]">
            <motion.div 
              className="relative w-full h-full min-h-[50vh] lg:min-h-[60vh] overflow-hidden"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={viewportOnce}
            >
              <img 
                src={mediaAssets.sections.sponsorshipHero} 
                alt="Sponsorship Audience"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8" style={{
                background: 'linear-gradient(to top, rgba(28,27,25,0.9) 0%, transparent 100%)'
              }}>
                <p className="label text-amber mb-6">AUDIENCE PROFILE</p>
                {[
                  { label: 'Ages 18–34', value: '54%' },
                  { label: 'Household Income $50K+', value: '67%' },
                  { label: 'Visit 4x / Year or More', value: '82%' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center border-b border-ivory/15 py-3">
                    <span className="font-body font-light text-sm text-ivory/80">{label}</span>
                    <span className="font-impact text-amber text-[1.75rem]">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-[42%] flex flex-col justify-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <motion.div className="mb-8" variants={staggerItem}>
                <h2 className="font-display font-light text-charcoal leading-[1.1] mb-6" style={{ fontSize: 'var(--text-display-md)' }}>
                  Partnership<br />Opportunities
                </h2>
              </motion.div>

              <div className="space-y-0">
                {sponsorshipTiers.map((tier, i) => (
                  <motion.div key={i} className="border-b border-border last:border-b-0 py-8" variants={staggerItem}>
                    <p className="label text-amber mb-2">{tier.level}</p>
                    <h3 className="font-display font-light text-charcoal text-2xl mb-4">{tier.name}</h3>
                    <ul className="space-y-3">
                      {tier.inclusions.slice(0, 4).map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-slate font-light">
                          <span className="text-amber mt-0.5">—</span>
                          <span className="flex-1 leading-snug tracking-wide">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA */}
              <motion.a 
                href="mailto:partnerships@americandream.com"
                className="cta-link mt-8"
                variants={fadeUp}
                viewport={{ once: true }}
              >
                Schedule a Partnership Call
              </motion.a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
