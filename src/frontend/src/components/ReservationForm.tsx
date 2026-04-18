import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDays,
  Clock,
  MessageSquare,
  Phone,
  User,
  Users,
} from "lucide-react";
import type { CreateReservationInput } from "../types";

const TIME_SLOTS = [
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
  "10:30 PM",
];

const PARTY_SIZES = Array.from({ length: 20 }, (_, i) => String(i + 1));

function getTodayDate() {
  return new Date().toISOString().split("T")[0] as string;
}

export interface FormState {
  name: string;
  phoneNumber: string;
  date: string;
  time: string;
  partySize: string;
  specialRequests: string;
}

export function getInitialForm(): FormState {
  return {
    name: "",
    phoneNumber: "",
    date: getTodayDate(),
    time: "",
    partySize: "",
    specialRequests: "",
  };
}

export function validateForm(form: FormState): Partial<FormState> {
  const e: Partial<FormState> = {};
  if (!form.name.trim()) e.name = "Full name is required";
  if (!/^\d{10}$/.test(form.phoneNumber.replace(/\s|-/g, "")))
    e.phoneNumber = "Enter a valid 10-digit Indian phone number";
  if (!form.date) e.date = "Please select a date";
  else if (form.date < getTodayDate()) e.date = "Date cannot be in the past";
  if (!form.time) e.time = "Please select a time slot";
  if (!form.partySize) e.partySize = "Please select number of guests";
  return e;
}

export function toReservationInput(form: FormState): CreateReservationInput {
  return {
    name: form.name.trim(),
    phoneNumber: form.phoneNumber.replace(/\s|-/g, ""),
    date: form.date,
    time: form.time,
    partySize: Number.parseInt(form.partySize, 10),
    specialRequests: form.specialRequests.trim() || undefined,
  };
}

interface ReservationFormProps {
  form: FormState;
  errors: Partial<FormState>;
  isPending: boolean;
  onChange: (field: keyof FormState, value: string) => void;
  onBlur: (field: keyof FormState) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ReservationForm({
  form,
  errors,
  isPending,
  onChange,
  onBlur,
  onSubmit,
}: ReservationFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="res-date"
            className="flex items-center gap-1.5 text-sm font-medium"
          >
            <CalendarDays className="w-3.5 h-3.5 text-primary" /> Date
          </Label>
          <Input
            id="res-date"
            type="date"
            min={getTodayDate()}
            value={form.date}
            onChange={(e) => onChange("date", e.target.value)}
            onBlur={() => onBlur("date")}
            className="bg-background border-input"
            data-ocid="reservations.date.input"
          />
          {errors.date && (
            <p
              className="text-xs text-destructive"
              data-ocid="reservations.date.field_error"
            >
              {errors.date}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="flex items-center gap-1.5 text-sm font-medium">
            <Clock className="w-3.5 h-3.5 text-primary" /> Time
          </Label>
          <Select value={form.time} onValueChange={(v) => onChange("time", v)}>
            <SelectTrigger
              aria-label="Select time slot"
              className="bg-background border-input"
              data-ocid="reservations.time.select"
            >
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.time && (
            <p
              className="text-xs text-destructive"
              data-ocid="reservations.time.field_error"
            >
              {errors.time}
            </p>
          )}
        </div>
      </div>

      {/* Party size */}
      <div className="space-y-1.5">
        <Label className="flex items-center gap-1.5 text-sm font-medium">
          <Users className="w-3.5 h-3.5 text-primary" /> Number of Guests
        </Label>
        <Select
          value={form.partySize}
          onValueChange={(v) => onChange("partySize", v)}
        >
          <SelectTrigger
            aria-label="Select number of guests"
            className="bg-background border-input"
            data-ocid="reservations.party_size.select"
          >
            <SelectValue placeholder="How many guests?" />
          </SelectTrigger>
          <SelectContent>
            {PARTY_SIZES.map((s) => (
              <SelectItem key={s} value={s}>
                {s} {s === "1" ? "guest" : "guests"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.partySize && (
          <p
            className="text-xs text-destructive"
            data-ocid="reservations.party_size.field_error"
          >
            {errors.partySize}
          </p>
        )}
      </div>

      {/* Name */}
      <div className="space-y-1.5">
        <Label
          htmlFor="res-name"
          className="flex items-center gap-1.5 text-sm font-medium"
        >
          <User className="w-3.5 h-3.5 text-primary" /> Full Name
        </Label>
        <Input
          id="res-name"
          placeholder="Your full name"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          onBlur={() => onBlur("name")}
          className="bg-background border-input"
          data-ocid="reservations.name.input"
        />
        {errors.name && (
          <p
            className="text-xs text-destructive"
            data-ocid="reservations.name.field_error"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label
          htmlFor="res-phone"
          className="flex items-center gap-1.5 text-sm font-medium"
        >
          <Phone className="w-3.5 h-3.5 text-primary" /> Phone Number
        </Label>
        <Input
          id="res-phone"
          type="tel"
          placeholder="10-digit mobile number"
          value={form.phoneNumber}
          onChange={(e) => onChange("phoneNumber", e.target.value)}
          onBlur={() => onBlur("phoneNumber")}
          className="bg-background border-input"
          data-ocid="reservations.phone.input"
        />
        {errors.phoneNumber && (
          <p
            className="text-xs text-destructive"
            data-ocid="reservations.phone.field_error"
          >
            {errors.phoneNumber}
          </p>
        )}
      </div>

      {/* Special requests */}
      <div className="space-y-1.5">
        <Label
          htmlFor="res-requests"
          className="flex items-center gap-1.5 text-sm font-medium"
        >
          <MessageSquare className="w-3.5 h-3.5 text-primary" /> Special
          Requests{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id="res-requests"
          placeholder="Dietary requirements, occasions, seating preferences..."
          value={form.specialRequests}
          onChange={(e) => onChange("specialRequests", e.target.value)}
          rows={3}
          className="bg-background border-input resize-none"
          data-ocid="reservations.special_requests.textarea"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 text-base transition-smooth"
        data-ocid="reservations.submit_button"
      >
        {isPending ? (
          <span
            className="flex items-center gap-2"
            data-ocid="reservations.loading_state"
          >
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Confirming your table...
          </span>
        ) : (
          "Confirm Reservation"
        )}
      </Button>
    </form>
  );
}
