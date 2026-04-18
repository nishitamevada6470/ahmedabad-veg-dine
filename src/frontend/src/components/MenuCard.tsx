import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { MenuItem } from "../types";
import { DietaryBadge } from "./DietaryBadge";

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export function MenuCard({ item, index }: MenuCardProps) {
  const priceInRupees = Number(item.price) / 100;

  return (
    <Card
      className="overflow-hidden flex flex-col bg-card border border-border hover:shadow-md transition-smooth group"
      data-ocid={`menu.item.${index + 1}`}
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-4xl select-none" aria-hidden="true">
              🍽️
            </span>
          </div>
        )}
        {/* Dietary badge overlay on image */}
        <div className="absolute top-2 left-2">
          <DietaryBadge isVegetarian={item.isVegetarian} />
        </div>
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="text-card text-sm font-semibold px-3 py-1 rounded bg-foreground/80">
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-display text-base font-semibold text-foreground leading-snug line-clamp-1">
          {item.name}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 flex-1 leading-relaxed">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className="font-display text-lg font-bold text-primary">
            ₹{priceInRupees.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </Card>
  );
}

export function MenuCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col bg-card border border-border">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4 flex flex-col gap-3">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-2/3 rounded" />
        <Skeleton className="h-5 w-1/3 rounded mt-1" />
      </div>
    </Card>
  );
}
