import React from 'react';

interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'slant' | 'dots';
  flip?: boolean;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ variant = 'wave', flip = false, className = '' }) => {
  const getPath = () => {
    switch (variant) {
      case 'wave':
        return 'M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z';
      case 'curve':
        return 'M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,218.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z';
      case 'slant':
        return 'M0,256L1440,96L1440,320L0,320Z';
      default:
        return 'M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z';
    }
  };

  return (
    <div className={`relative w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`} style={{ marginTop: '-1px', marginBottom: '-1px' }}>
      <svg
        viewBox="0 0 1440 320"
        className="w-full h-16 sm:h-20 lg:h-24"
        preserveAspectRatio="none"
      >
        <path
          d={getPath()}
          className="fill-gray-50 dark:fill-gray-800/50"
        />
      </svg>
    </div>
  );
};
