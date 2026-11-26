import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'light', className = '' }) => {
  const isDark = variant === 'dark';
  const mainText = isDark ? '#FFFFFF' : '#061F46';
  const subText = isDark ? '#E2E8F0' : '#10264A';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 sm:w-12 sm:h-12 shrink-0"
      >
        <circle cx="30" cy="34" r="24" fill="#FFC400" />
        <path
          d="M17 31L27 42L54 11C44 24 34 38 28 50L14 33L17 31Z"
          fill={isDark ? '#061F46' : '#061F46'}
          stroke={isDark ? '#FFFFFF' : '#FFFFFF'}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <div className="leading-none">
        <div className="flex items-baseline gap-1">
          <span
            className="text-lg sm:text-xl font-black italic tracking-tight font-heading"
            style={{ color: mainText }}
          >
            TAX
          </span>
          <span className="text-[11px] sm:text-xs font-extrabold italic text-[#FFC400]">ON</span>
          <span
            className="text-base sm:text-lg font-black italic tracking-tight font-heading"
            style={{ color: mainText }}
          >
            TRACKS
          </span>
        </div>
        <div
          className="text-[9px] sm:text-[10px] font-bold italic tracking-wide mt-0.5"
          style={{ color: subText }}
        >
          Your TAX is on right TRACK
        </div>
      </div>
    </div>
  );
};
