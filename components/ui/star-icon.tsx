import Image from 'next/image';

interface StarIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function StarIcon({ className, width = 24, height = 24 }: StarIconProps) {
  return (
    <Image
      src="/star-svgrepo-com.svg"
      alt="star icon"
      width={width}
      height={height}
      loading="lazy"
      className={className}
    />
  );
}
