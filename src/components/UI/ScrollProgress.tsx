import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setIsVisible(v > 0.01));
    return unsub;
  }, [scrollYProgress]);

  return (
    <>
      {/* Track background */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-[#262626]" />
      {/* Neon fill bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[101] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #53ddfc 0%, #ba9eff 50%, #ff86c3 100%)',
          boxShadow: '0 0 12px rgba(83,221,252,0.8), 0 0 4px rgba(186,158,255,0.6)',
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Leading glow dot */}
      {isVisible && (
        <motion.div
          className="fixed top-0 z-[102] w-3 h-3 rounded-full -translate-y-[4px]"
          style={{
            x: useSpring(
              // position the dot at the current scroll fraction of viewport width
              scrollYProgress,
              { stiffness: 200, damping: 40 }
            ),
            background: '#53ddfc',
            boxShadow: '0 0 16px 4px rgba(83,221,252,0.9)',
            left: 0,
            scaleX: 'auto',
          }}
        />
      )}
    </>
  );
};
