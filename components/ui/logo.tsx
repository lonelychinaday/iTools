'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-16 h-16',
  lg: 'w-20 h-20 md:w-[100px] md:h-[100px]',
};

export function Logo({ className, size = 'lg' }: LogoProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        sizeClasses[size],
        className
      )}
    >
      <svg
        viewBox='0 0 64 64'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='w-full h-full'
      >
        <rect x='0.5' width='64' height='64' rx='2' fill='white' />
        <circle cx='39' cy='27' r='16' fill='#FF9B0F' />
        <path d='M42 22L54.1244 49H29.8756L42 22Z' fill='#28E361' />
        <rect x='9' y='30' width='24' height='24' fill='#1ABAFA' />
      </svg>
    </div>
  );
}
