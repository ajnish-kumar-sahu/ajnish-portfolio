import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only add to non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const aura = auraRef.current;
    if (!cursor || !aura) return;

    let mouseX = 0;
    let mouseY = 0;
    let auraX = 0;
    let auraY = 0;
    let isHovering = false;

    // We use a high-performance requestAnimationFrame loop to smoothly trail the aura behind the pinpoint cursor
    const animate = () => {
      // Lerp (Linear Interpolation) for the aura dragging effect
      auraX += (mouseX - auraX) * 0.15;
      auraY += (mouseY - auraY) * 0.15;

      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      // Scale up the aura if hovering over a clickable element
      aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) scale(${isHovering ? 1.5 : 1})`;

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        isHovering = true;
        aura.classList.add('bg-blue-500/10', 'border-blue-500/80');
        aura.classList.remove('border-blue-500/50');
      } else {
        isHovering = false;
        aura.classList.remove('bg-blue-500/10', 'border-blue-500/80');
        aura.classList.add('border-blue-500/50');
      }
    };

    document.documentElement.classList.add('hide-default-cursor');
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    
    const req = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('hide-default-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(req);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Aura */}
      <div 
        ref={auraRef}
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border-2 border-blue-500/50 pointer-events-none z-[10000] will-change-transform transition-colors duration-300"
      />
      {/* Inner Pinpoint */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-blue-500 rounded-full pointer-events-none z-[10001] will-change-transform"
      />
    </>
  );
};
