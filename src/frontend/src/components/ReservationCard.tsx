import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Users } from "lucide-react";
import type { Reservation, ReservationStatus } from "../types";

interface ReservationCardProps {
  reservation: Reservation;
  index: number;
}

function statusVariant(status: ReservationStatus): {
  label: string;
  className: string;
} {
  switch (status) {
    case "confirmed":
      return {
        label: "Confirmed",
        className:
          "bg-accent/20 text-accent border-accent/30 hover:bg-accent/20",
      };
    case "cancelled":
      return {
        label: "Cancelled",
        className:
          "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/15",
      };
    default:
      return {
        label: "Pending",
        className:
          "bg-primary/15 text-primary border-primary/30 hover:bg-primary/15",
      };
  }
}

export function ReservationCard({ reservation, index }: ReservationCardProps) {
  const { label, className } = statusVariant(reservation.status);

  const formattedDate = (() => {
    try {
      return new Date(reservation.date).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return reservation.date;
    }
  })();

  return (
    <div
      className="bg-card rounded-xl border border-border p-4 flex flex-col gap-3 shadow-subtle"
      data-ocid={`reservations.lookup.item.${index}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-foreground truncate">
            {reservation.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Ref #{String(reservation.id).padStart(4, "0")}
          </p>
        </div>
        <Badge
          variant="outline"
          className={`shrink-0 text-xs font-semibold capitalize ${className}`}
          data-ocid={`reservations.lookup.status.${index}`}
        >
          {label}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="flex flex-col gap-0.5">
          <span className="flex items-center gap-1 text-muted-foreground text-xs">
            <CalendarDays className="w-3 h-3" /> Date
          </span>
          <span className="font-medium text-foreground text-xs leading-snug">
            {formattedDate}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="w-3 h-3" /> Time
          </span>
          <span className="font-medium text-foreground text-xs">
            {reservation.time}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="flex items-center gap-1 text-muted-foreground text-xs">
            <Users className="w-3 h-3" /> Guests
          </span>
          <span className="font-medium text-foreground text-xs">
            {String(reservation.partySize)}
          </span>
        </div>
      </div>

      {reservation.specialRequests && (
        <p className="text-xs text-muted-foreground border-t border-border pt-2 line-clamp-2">
          "{reservation.specialRequests}"
        </p>
      )}
    </div>
  );
}
