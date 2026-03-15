import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setIsVisible(scrollTop > 400);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  // SVG circle dimensions
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-[60] group animate-fade-in"
      aria-label="Scroll to top"
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-12 h-12 -rotate-90 pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-200/50 dark:text-gray-700/50"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="url(#progressGradientTop)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-150 drop-shadow-[0_0_5px_rgba(139,92,246,0.8)]"
          />
          <defs>
            <linearGradient id="progressGradientTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Premium Button */}
        <div className="w-9 h-9 relative z-10 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg shadow-black/20 dark:shadow-black/40 border border-white/20 dark:border-white/10 transition-all duration-300 group-hover:scale-110 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-tr before:from-blue-600/0 before:to-purple-600/0 hover:before:from-blue-600/20 hover:before:to-purple-600/20 before:transition-all before:duration-300">
          <ArrowUp size={16} className="text-gray-800 dark:text-gray-200 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:-translate-y-1 transition-all duration-300 relative z-20" />
        </div>
      </div>
    </button>
  );
};
