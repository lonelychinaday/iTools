'use client';

import { useState } from 'react';
import Image from 'next/image';
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

const sizePx = {
  sm: '32px',
  md: '64px',
  lg: '(max-width: 768px) 80px, 100px',
};

export function Logo({ className, size = 'lg' }: LogoProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      {/* 占位符背景，防止布局偏移 */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-[#1ABAFA]/10 to-[#28E361]/10 rounded-lg transition-opacity duration-300',
          isLoaded ? 'opacity-0' : 'opacity-100'
        )}
      />

      <Image
        src='/icon.svg'
        alt='iTools Logo'
        fill
        priority
        className={cn(
          'object-contain transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        sizes={sizePx[size]}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)} // 即使出错也要隐藏占位符
      />
    </div>
  );
}
