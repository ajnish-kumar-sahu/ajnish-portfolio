import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, X, Mail, MessageSquare, Phone, Zap } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

export const FloatingHireMe: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const actions = [
    { label: 'Email Me', icon: <Mail size={17} />, href: `mailto:${personalInfo.email}`, accent: '#53ddfc', glow: 'rgba(83,221,252,0.3)' },
    { label: 'WhatsApp', icon: <MessageSquare size={17} />, href: 'https://wa.me/919608415521', accent: '#6ee7b7', glow: 'rgba(110,231,183,0.3)' },
    { label: 'Call Me',  icon: <Phone size={17} />,         href: `tel:${personalInfo.phone}`,  accent: '#ba9eff', glow: 'rgba(186,158,255,0.3)' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-3 no-print"
        >
          {/* Action Buttons */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="actions"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ type: 'spring', bounce: 0.4 }}
                className="flex flex-col items-end gap-2 mb-1"
              >
                {actions.map((action, i) => (
                  <motion.a
                    key={action.label}
                    href={action.href}
                    target={action.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-2.5 group"
                  >
                    {/* Label pill */}
                    <span className="px-3 py-1.5 bg-[#131313] border border-[#262626] text-[#adaaaa] group-hover:text-white text-xs font-mono font-semibold rounded-lg whitespace-nowrap shadow-lg transition-colors duration-200">
                      {action.label}
                    </span>
                    {/* Icon button */}
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#0e0e0e] transition-transform duration-200 group-hover:scale-110 shadow-lg"
                      style={{ background: action.accent, boxShadow: `0 4px 20px ${action.glow}` }}
                    >
                      {action.icon}
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <div className="relative">
            {/* Ping ring when closed */}
            {!isOpen && (
              <div
                className="absolute inset-0 rounded-2xl animate-ping opacity-40"
                style={{ background: 'linear-gradient(135deg, #ba9eff, #ff86c3)' }}
              />
            )}

            <button
              onClick={() => setIsOpen(v => !v)}
              className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-[#0e0e0e] transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #ba9eff, #ff86c3)',
                boxShadow: '0 8px 32px rgba(186,158,255,0.45)',
              }}
              aria-label="Hire Me"
            >
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
              <div className="relative z-10 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                {isOpen ? <X size={22} /> : (
                  <div className="flex flex-col items-center">
                    <Briefcase size={18} />
                    <span className="text-[7px] font-black tracking-widest mt-0.5">HIRE</span>
                  </div>
                )}
              </div>
            </button>
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-16 bottom-3 pointer-events-none"
              >
                <div className="flex items-center gap-1.5 bg-[#131313] border border-[#262626] text-[#adaaaa] text-xs font-mono font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                  <Zap size={10} className="text-[#ffd580]" />
                  Hire Me!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
