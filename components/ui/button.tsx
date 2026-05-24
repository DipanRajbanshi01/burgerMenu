"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold uppercase tracking-wide ring-offset-cream transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-charcoal text-cream hover:bg-charcoal-800 shadow-sm",
        whatsapp:
          "bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-md shadow-emerald-900/20",
        mustard:
          "bg-mustard text-charcoal hover:bg-mustard-600 shadow-md shadow-amber-900/20",
        tomato:
          "bg-tomato text-cream hover:bg-tomato-600 shadow-md shadow-red-900/20",
        outline:
          "border border-charcoal/30 bg-transparent text-charcoal hover:bg-charcoal/5",
        ghost:
          "bg-transparent text-charcoal hover:bg-charcoal/10",
        link: "bg-transparent text-charcoal underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
