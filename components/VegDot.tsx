import { cn } from "@/lib/utils";

export function VegDot({
  isVeg,
  className,
}: {
  isVeg: boolean;
  className?: string;
}) {
  const color = isVeg ? "border-emerald-700 bg-emerald-600" : "border-tomato-600 bg-tomato";
  return (
    <span
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
      title={isVeg ? "Veg" : "Non-veg"}
      className={cn(
        "grid h-4 w-4 place-items-center rounded-sm border-[1.5px] bg-cream",
        className,
      )}
    >
      <span className={cn("h-2 w-2 rounded-full border", color)} />
    </span>
  );
}
