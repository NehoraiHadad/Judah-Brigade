import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        carousel: "bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm hover:scale-110 transition-all duration-300",
        carouselLight: "bg-white/20 hover:bg-white/40 text-white backdrop-blur-md hover:scale-110 transition-all duration-300",
        navDot: "rounded-full bg-white/40 hover:bg-white/60 hover:scale-110 focus:ring-amber-400/50",
        navDotActive: "rounded-full bg-amber-400 scale-125 shadow-lg",
        modalNav: "text-white hover:bg-white/20 bg-black/30 backdrop-blur-sm",
        scrollIndicator: "group flex flex-col items-center text-white/70 hover:text-white border border-white/30 hover:border-white/60 hover:bg-white/20 backdrop-blur-sm rounded-full p-3",
        heroPrimary: "relative overflow-hidden bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white hover:from-amber-700 hover:via-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl",
        heroSecondary: "relative overflow-hidden backdrop-blur-md bg-gradient-to-r from-white/10 to-white/20 border-2 border-white/30 text-white hover:bg-white/30"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        navDot: "w-3 h-3",
        navDotSmall: "w-2 h-2",
        navDotLarge: "w-4 h-4",
        carouselIcon: "h-12 w-12 rounded-full",
        scrollIcon: "h-auto w-auto"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
