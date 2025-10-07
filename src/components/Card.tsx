import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export const Card = ({
  children,
  hover = true,
  className,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        "relative border-2 border-border bg-black",
        hover &&
          "transition-all duration-300 hover:scale-105 hover:border-primary",
        className
      )}
      {...props}
    >
      <div className="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-primary"></div>
      <div className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-primary"></div>
      {children}
    </div>
  );
};

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = ({
  children,
  className,
  ...props
}: CardHeaderProps) => {
  return (
    <div className={cn("border-b border-border p-4", className)} {...props}>
      {children}
    </div>
  );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent = ({
  children,
  className,
  ...props
}: CardContentProps) => {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
};
