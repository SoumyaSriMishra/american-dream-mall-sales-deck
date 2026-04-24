import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Retail', href: '#retail' },
  { name: 'Dining', href: '#dining' },
  { name: 'Entertainment', href: '#entertainment' },
  { name: 'Events', href: '#events' },
  { name: 'Contact', href: '#contact' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[60] bg-[#1c1b19fa] backdrop-blur-lg flex flex-col"
        >
          <div className="flex justify-end p-6">
            <button onClick={onClose} className="text-ivory hover:text-amber p-2 pr-6">
              <X size={32} strokeWidth={1} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-8">
             {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="font-display font-light text-4xl text-ivory hover:text-amber transition-colors"
                >
                  {link.name}
                </motion.a>
             ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pb-12 flex justify-center gap-6"
          >
             <span className="font-body text-ivory/50 hover:text-amber text-xs tracking-widest cursor-pointer transition-colors">IG</span>
             <span className="font-body text-ivory/50 hover:text-amber text-xs tracking-widest cursor-pointer transition-colors">X</span>
             <span className="font-body text-ivory/50 hover:text-amber text-xs tracking-widest cursor-pointer transition-colors">FB</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
