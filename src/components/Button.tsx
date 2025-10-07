import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'font-subheading uppercase tracking-wide transition-all duration-300 relative overflow-hidden group';

    const variants = {
      primary: 'bg-primary text-white hover:bg-secondary border-2 border-primary hover:border-secondary',
      secondary: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white',
      outline: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
