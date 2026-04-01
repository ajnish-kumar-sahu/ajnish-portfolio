import React from 'react';

interface AiIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

/**
 * Premium custom AI brain / neural-network icon.
 * Self-contained SVG — no external library required.
 */
export const AiIcon: React.FC<AiIconProps> = ({ size = 24, className = '', animated = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AI Brain Icon"
    >
      <defs>
        {/* Main gradient */}
        <linearGradient id="aiGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="aiGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Node pulse animation */}
        <filter id="nodePulse">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Outer hexagon ring ── */}
      <polygon
        points="32,4 56,18 56,46 32,60 8,46 8,18"
        fill="url(#aiGrad1)"
        opacity="0.12"
        stroke="url(#aiGrad1)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        filter="url(#aiGlow)"
      />

      {/* ── Neural network connections ── */}
      {/* Center → top-left */}
      <line x1="32" y1="32" x2="20" y2="20" stroke="url(#aiGrad1)" strokeWidth="1" opacity="0.6"
        className={animated ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''} />
      {/* Center → top-right */}
      <line x1="32" y1="32" x2="44" y2="20" stroke="url(#aiGrad1)" strokeWidth="1" opacity="0.6"
        className={animated ? 'animate-[pulse_2.3s_ease-in-out_infinite]' : ''} />
      {/* Center → left */}
      <line x1="32" y1="32" x2="16" y2="32" stroke="url(#aiGrad1)" strokeWidth="1" opacity="0.6"
        className={animated ? 'animate-[pulse_1.8s_ease-in-out_infinite]' : ''} />
      {/* Center → right */}
      <line x1="32" y1="32" x2="48" y2="32" stroke="url(#aiGrad1)" strokeWidth="1" opacity="0.6"
        className={animated ? 'animate-[pulse_2.1s_ease-in-out_infinite]' : ''} />
      {/* Center → bottom-left */}
      <line x1="32" y1="32" x2="20" y2="44" stroke="url(#aiGrad1)" strokeWidth="1" opacity="0.6"
        className={animated ? 'animate-[pulse_2.4s_ease-in-out_infinite]' : ''} />
      {/* Center → bottom-right */}
      <line x1="32" y1="32" x2="44" y2="44" stroke="url(#aiGrad1)" strokeWidth="1" opacity="0.6"
        className={animated ? 'animate-[pulse_1.9s_ease-in-out_infinite]' : ''} />

      {/* Outer connections */}
      <line x1="20" y1="20" x2="16" y2="32" stroke="url(#aiGrad1)" strokeWidth="0.8" opacity="0.4" />
      <line x1="44" y1="20" x2="48" y2="32" stroke="url(#aiGrad1)" strokeWidth="0.8" opacity="0.4" />
      <line x1="16" y1="32" x2="20" y2="44" stroke="url(#aiGrad1)" strokeWidth="0.8" opacity="0.4" />
      <line x1="48" y1="32" x2="44" y2="44" stroke="url(#aiGrad1)" strokeWidth="0.8" opacity="0.4" />

      {/* ── Outer ring nodes ── */}
      {/* top-left */}
      <circle cx="20" cy="20" r="4" fill="url(#aiGrad1)" opacity="0.8" filter="url(#nodePulse)" />
      <circle cx="20" cy="20" r="2" fill="white" opacity="0.9" />
      {/* top-right */}
      <circle cx="44" cy="20" r="4" fill="url(#aiGrad1)" opacity="0.8" filter="url(#nodePulse)" />
      <circle cx="44" cy="20" r="2" fill="white" opacity="0.9" />
      {/* left */}
      <circle cx="16" cy="32" r="4" fill="url(#aiGrad1)" opacity="0.8" filter="url(#nodePulse)" />
      <circle cx="16" cy="32" r="2" fill="white" opacity="0.9" />
      {/* right */}
      <circle cx="48" cy="32" r="4" fill="url(#aiGrad1)" opacity="0.8" filter="url(#nodePulse)" />
      <circle cx="48" cy="32" r="2" fill="white" opacity="0.9" />
      {/* bottom-left */}
      <circle cx="20" cy="44" r="4" fill="url(#aiGrad1)" opacity="0.8" filter="url(#nodePulse)" />
      <circle cx="20" cy="44" r="2" fill="white" opacity="0.9" />
      {/* bottom-right */}
      <circle cx="44" cy="44" r="4" fill="url(#aiGrad1)" opacity="0.8" filter="url(#nodePulse)" />
      <circle cx="44" cy="44" r="2" fill="white" opacity="0.9" />

      {/* ── Center brain core ── */}
      {/* Outer glow ring */}
      <circle cx="32" cy="32" r="12" fill="url(#aiGrad1)" opacity="0.2" />
      {/* Main core */}
      <circle cx="32" cy="32" r="9" fill="url(#aiGrad1)" filter="url(#aiGlow)" />
      {/* Inner shine */}
      <circle cx="32" cy="32" r="9" fill="url(#aiGrad1)" />
      {/* Shine highlight */}
      <ellipse cx="29" cy="28" rx="3.5" ry="2.5" fill="white" opacity="0.3" transform="rotate(-20 29 28)" />

      {/* ── Brain symbol in center ── */}
      {/* Left brain lobe */}
      <path
        d="M32 26 C28 26 25 28.5 25 31.5 C25 33.5 26.5 35 28 35.5 C27.5 36.5 28 38 29.5 38 C30.5 38 31.2 37.5 31.5 36.8 L32 36.8"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.95"
      />
      {/* Right brain lobe */}
      <path
        d="M32 26 C36 26 39 28.5 39 31.5 C39 33.5 37.5 35 36 35.5 C36.5 36.5 36 38 34.5 38 C33.5 38 32.8 37.5 32.5 36.8 L32 36.8"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.95"
      />
      {/* Center divider line */}
      <line x1="32" y1="26" x2="32" y2="37" stroke="white" strokeWidth="1" opacity="0.5" />
      {/* Brain wrinkle left */}
      <path d="M27.5 30 C28.5 29.5 29 30.5 28.5 31.5" stroke="white" strokeWidth="1" fill="none" opacity="0.7" strokeLinecap="round" />
      {/* Brain wrinkle right */}
      <path d="M36.5 30 C35.5 29.5 35 30.5 35.5 31.5" stroke="white" strokeWidth="1" fill="none" opacity="0.7" strokeLinecap="round" />

      {/* ── Orbiting dot (animated) ── */}
      {animated && (
        <circle cx="32" cy="32" r="1.5" fill="white" opacity="0.8">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 0 -14 A 14 14 0 1 1 -0.01 -14"
          />
        </circle>
      )}
    </svg>
  );
};

/** Small variant used inside header avatar */
export const AiIconSmall: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <AiIcon size={size} className={className} animated={false} />
);
