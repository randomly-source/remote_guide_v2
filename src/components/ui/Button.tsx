import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}
export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-base py-3.5 px-6 active:scale-[0.98] touch-manipulation';
  const variants = {
    primary: 'bg-[#2D3748] text-white hover:bg-black focus:ring-gray-500 shadow-sm active:shadow-md',
    secondary: 'bg-white border-2 border-[#2D3748] text-[#2D3748] hover:bg-gray-50 focus:ring-gray-200 active:bg-gray-100',
    ghost: 'bg-transparent text-[#2D3748] hover:bg-gray-100 focus:ring-gray-200 active:bg-gray-200'
  };
  const widthClass = fullWidth ? 'w-full' : '';
  return <button className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>;
}