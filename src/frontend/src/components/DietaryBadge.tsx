interface DietaryBadgeProps {
  isVegetarian: boolean;
  size?: "sm" | "md";
}

export function DietaryBadge({ isVegetarian, size = "sm" }: DietaryBadgeProps) {
  const dotSize = size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  if (isVegetarian) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-accent bg-accent/10 font-medium ${textSize} text-accent-foreground`}
        aria-label="Vegetarian"
      >
        <span
          className={`${dotSize} rounded-sm border-2 border-accent bg-accent flex-shrink-0`}
          aria-hidden="true"
        />
        Veg
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-destructive bg-destructive/10 font-medium ${textSize} text-destructive`}
      aria-label="Non-Vegetarian"
    >
      <span
        className={`${dotSize} rounded-sm border-2 border-destructive bg-destructive flex-shrink-0`}
        aria-hidden="true"
      />
      Non-Veg
    </span>
  );
}
