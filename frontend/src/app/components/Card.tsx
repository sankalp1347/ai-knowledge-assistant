import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'glass-strong';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', hover = false, children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl p-6 transition-smooth';
    
    const variants = {
      default: 'bg-card border border-border',
      glass: 'glass-card shadow-lg',
      'glass-strong': 'glass-card-strong shadow-xl',
    };
    
    const hoverStyles = hover ? 'hover-lift cursor-pointer' : '';
    
    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
