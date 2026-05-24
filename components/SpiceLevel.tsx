import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

const labels = ["No spice", "Mild", "Medium", "Piro (hot)"] as const;

export function SpiceLevel({
  level,
  className,
}: {
  level: 0 | 1 | 2 | 3;
  className?: string;
}) {
  return (
    <span
      aria-label={`Spice level: ${labels[level]}`}
      title={labels[level]}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {[0, 1, 2].map((i) => (
        <Flame
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < level ? "fill-tomato text-tomato-600" : "text-charcoal/20",
          )}
        />
      ))}
    </span>
  );
}
