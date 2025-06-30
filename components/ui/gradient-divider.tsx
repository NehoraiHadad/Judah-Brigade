import { cn } from "@/lib/utils";

type DividerSize = "sm" | "md" | "lg";
type DividerVariant = "primary" | "accent" | "minimal";

interface GradientDividerProps {
  size?: DividerSize;
  variant?: DividerVariant;
  className?: string;
}

const sizeClasses: Record<DividerSize, string> = {
  sm: "w-16",
  md: "w-24", 
  lg: "w-32"
};

const variantClasses: Record<DividerVariant, string> = {
  primary: "bg-gradient-to-r from-amber-400 via-white to-teal-400",
  accent: "bg-gradient-to-r from-amber-400 via-teal-500 to-amber-400",
  minimal: "bg-gradient-to-r from-amber-400 to-teal-500"
};

export function GradientDivider({ 
  size = "md", 
  variant = "primary", 
  className 
}: GradientDividerProps) {
  return (
    <div 
      className={cn(
        "h-1 rounded-full mx-auto",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  );
} 