import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  intensity?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '',
  onClick,
  href,
  intensity = 0.3
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !ref.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    setPosition({ x: middleX * intensity, y: middleY * intensity });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  // If we have an href, render an anchor
  const wrapperClass = `inline-flex relative z-10 ${className}`;

  return (
    <motion.div
      ref={ref}
      className={wrapperClass}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
    >
      {href ? (
        <a href={href} className="w-full h-full block">
          {children}
        </a>
      ) : (
        <div className="w-full h-full block cursor-pointer">
          {children}
        </div>
      )}
    </motion.div>
  );
};
