import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export function Card({
  children,
  className = '',
  onClick
}: CardProps) {
  // Check if className contains bg-* to avoid overriding custom backgrounds
  const hasCustomBg = className.includes('bg-');
  const baseClasses = hasCustomBg 
    ? 'rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6'
    : 'bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6';
  
  return <div className={`${baseClasses} ${onClick ? 'cursor-pointer hover:shadow-md active:shadow-lg transition-all touch-manipulation' : ''} ${className}`} onClick={onClick}>
      {children}
    </div>;
}