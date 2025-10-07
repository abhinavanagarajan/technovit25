import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export const Card = ({ children, hover = true, className = '', ...props }: CardProps) => {
  return (
    <div
      className={`
        border-2 border-border bg-black relative
        ${hover ? 'hover:border-primary transition-all duration-300 hover:scale-105' : ''}
        ${className}
      `}
      {...props}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary"></div>
      {children}
    </div>
  );
};

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = ({ children, className = '', ...props }: CardHeaderProps) => {
  return (
    <div className={`p-4 border-b border-border ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent = ({ children, className = '', ...props }: CardContentProps) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};
