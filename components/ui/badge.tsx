import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border-charcoal/20 bg-charcoal text-cream",
        bestseller:
          "border-mustard-600/40 bg-mustard text-charcoal shadow-sm shadow-amber-900/20",
        new: "border-tomato-600/40 bg-tomato text-cream",
        halal: "border-emerald-700/40 bg-emerald-700 text-cream",
        outline: "border-charcoal/30 bg-cream text-charcoal",
        open: "border-emerald-700/40 bg-emerald-600 text-cream",
        closed: "border-charcoal/40 bg-charcoal-700 text-cream",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
