import React from 'react';

interface ArrowIconProps {
  color?: string;
  direction?: 'right' | 'left';
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({
  color = 'white',
  direction = 'right',
}) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: direction === 'left' ? 'rotate(180deg)' : undefined }}
  >
    <path
      d="M3.75 9H14.25M14.25 9L10.5 5.25M14.25 9L10.5 12.75"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PlayIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.2)" />
    <path d="M19 16L35 24L19 32V16Z" fill="white" />
  </svg>
);
