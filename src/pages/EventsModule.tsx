import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../lib/animations';
import Navbar from '../components/layout/Navbar';

export default function EventsModule() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    eventType: 'concert',
    preferredDate: '',
    expectedAttendance: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoBody = `Name: ${formData.name}%0D%0ACompany: ${formData.company}%0D%0AEvent Type: ${formData.eventType}%0D%0APreferred Date: ${formData.preferredDate}%0D%0AExpected Attendance: ${formData.expectedAttendance}%0D%0AMessage: ${formData.message}`;
    window.location.href = `mailto:events@americandream.com?subject=Event Inquiry&body=${mailtoBody}`;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85"
              alt="Event Hosting at American Dream"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-espresso/60" />
          </div>
          
          <div className="relative h-full flex items-center justify-center text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={viewportOnce}
              className="max-w-4xl px-8"
            >
              <p className="label text-amber mb-6">EVENTS & VENUES</p>
              <h1 className="font-display font-light text-ivory leading-[1.1]" style={{ fontSize: 'var(--text-display-xl)' }}>
                Event Hosting at American Dream
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Capability Cards */}
        <section className="bg-charcoal section-padding">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={viewportOnce}
              className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 mb-20"
            >
              {[
                { value: '185,000 sq ft', label: 'Event Space' },
                { value: '10,000', label: 'Maximum Capacity' },
                { value: 'Year-Round', label: 'Programming Calendar' }
              ].map((stat, i) => (
                <motion.div key={i} className="text-center border border-amber/20 px-8 py-12 hover:border-amber transition-colors duration-300">
                  <div className="font-impact text-amber text-4xl mb-4">{stat.value}</div>
                  <div className="font-body text-[11px] tracking-[0.2em] text-ivory/60 uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="bg-ivory section-padding">
          <div className="container">
            <div className="max-w-[560px] mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={viewportOnce}
                className="text-center mb-12"
              >
                <h2 className="font-display font-light text-charcoal mb-6" style={{ fontSize: 'var(--text-display-lg)' }}>
                  Host Your Event at American Dream
                </h2>
                <p className="body-copy text-slate">
                  Contact our events team to discuss your vision and explore our world-class venues.
                </p>
              </motion.div>

              <motion.form
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={viewportOnce}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full font-body font-light text-charcoal bg-transparent border-b border-border focus:border-amber transition-colors duration-300 outline-none py-2"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Company"
                      className="w-full font-body font-light text-charcoal bg-transparent border-b border-border focus:border-amber transition-colors duration-300 outline-none py-2"
                    />
                  </div>
                </div>

                <div>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full font-body font-light text-charcoal bg-transparent border-b border-border focus:border-amber transition-colors duration-300 outline-none py-2"
                    required
                  >
                    <option value="concert">Concert</option>
                    <option value="corporate">Corporate</option>
                    <option value="brand-activation">Brand Activation</option>
                    <option value="conference">Conference</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full font-body font-light text-charcoal bg-transparent border-b border-border focus:border-amber transition-colors duration-300 outline-none py-2"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="expectedAttendance"
                      value={formData.expectedAttendance}
                      onChange={handleInputChange}
                      placeholder="Expected Attendance"
                      className="w-full font-body font-light text-charcoal bg-transparent border-b border-border focus:border-amber transition-colors duration-300 outline-none py-2"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Message"
                    rows={4}
                    className="w-full font-body font-light text-charcoal bg-transparent border-b border-border focus:border-amber transition-colors duration-300 outline-none py-2 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-amber text-charcoal font-body font-medium text-[11px] tracking-[0.2em] uppercase px-8 py-4 transition-colors duration-300 hover:bg-amber/90"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Inquiry
                </motion.button>
              </motion.form>

              {/* Back Navigation */}
              <a href="/" className="cta-link mt-12 inline-block">
                &larr; Back to Overview
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
