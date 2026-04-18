import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  CheckCircle,
  Phone,
  Search,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import { ReservationCard } from "../components/ReservationCard";
import {
  ReservationForm,
  getInitialForm,
  toReservationInput,
  validateForm,
} from "../components/ReservationForm";
import type { FormState } from "../components/ReservationForm";
import { useCreateReservation } from "../hooks/useCreateReservation";
import { useReservationsByPhone } from "../hooks/useCreateReservation";

// ─── Success Banner ────────────────────────────────────────────────────────────

interface SuccessBannerProps {
  bookingName: string;
  bookingDate: string;
  bookingTime: string;
  bookingPartySize: string;
  reservationId: bigint | null;
  onReset: () => void;
}

function SuccessBanner({
  bookingName,
  bookingDate,
  bookingTime,
  bookingPartySize,
  reservationId,
  onReset,
}: SuccessBannerProps) {
  const formattedDate = (() => {
    try {
      return new Date(bookingDate).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return bookingDate;
    }
  })();

  return (
    <div
      className="bg-background min-h-[60vh] flex items-center justify-center px-4 py-16"
      data-ocid="reservations.success_state"
    >
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-elevated border border-border p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">
            Table Reserved!
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            We can't wait to welcome you at Sattv, {bookingName.split(" ")[0]}.
          </p>

          <div className="bg-muted/40 rounded-xl p-4 text-left space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium text-foreground">{bookingName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium text-foreground">
                {formattedDate}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Time</span>
              <span className="font-medium text-foreground">{bookingTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Guests</span>
              <span className="font-medium text-foreground">
                {bookingPartySize}
              </span>
            </div>
            {reservationId !== null && (
              <div className="flex justify-between text-sm border-t border-border pt-2 mt-2">
                <span className="text-muted-foreground">Reference</span>
                <span className="font-mono font-semibold text-primary">
                  #{String(reservationId).padStart(4, "0")}
                </span>
              </div>
            )}
          </div>

          <Button
            onClick={onReset}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-smooth"
            data-ocid="reservations.book_another.button"
          >
            Book Another Table
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Lookup Section ────────────────────────────────────────────────────────────

function LookupSection() {
  const [lookupPhone, setLookupPhone] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState("");

  const {
    data: reservations,
    isFetching,
    isError,
  } = useReservationsByPhone(submittedPhone);

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = lookupPhone.replace(/\s|-/g, "");
    if (cleaned.length >= 10) setSubmittedPhone(cleaned);
  }

  return (
    <section
      className="bg-muted/30 rounded-2xl border border-border p-6 sm:p-8 mt-8"
      data-ocid="reservations.lookup.section"
    >
      <div className="flex items-center gap-2 mb-1">
        <Search className="w-4 h-4 text-primary" />
        <h2 className="font-display text-xl font-bold text-foreground">
          Check Your Reservation
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-5">
        Enter your phone number to view existing bookings.
      </p>

      <form onSubmit={handleLookup} className="flex gap-2 mb-6">
        <div className="flex-1 min-w-0">
          <Label htmlFor="lookup-phone" className="sr-only">
            Phone Number
          </Label>
          <Input
            id="lookup-phone"
            type="tel"
            placeholder="Enter your 10-digit phone number"
            value={lookupPhone}
            onChange={(e) => setLookupPhone(e.target.value)}
            className="bg-background border-input"
            data-ocid="reservations.lookup.phone.input"
          />
        </div>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 transition-smooth"
          data-ocid="reservations.lookup.search_button"
        >
          <Search className="w-4 h-4 sm:mr-1.5" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </form>

      {/* Loading */}
      {isFetching && (
        <div
          className="space-y-3"
          data-ocid="reservations.lookup.loading_state"
        >
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div
          className="text-sm text-destructive text-center py-4"
          data-ocid="reservations.lookup.error_state"
        >
          Could not fetch reservations. Please try again.
        </div>
      )}

      {/* Results */}
      {!isFetching &&
        !isError &&
        submittedPhone &&
        reservations &&
        reservations.length === 0 && (
          <div
            className="text-center py-8"
            data-ocid="reservations.lookup.empty_state"
          >
            <UtensilsCrossed className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No reservations found for this number.
            </p>
          </div>
        )}
      {!isFetching &&
        !isError &&
        submittedPhone &&
        reservations &&
        reservations.length > 0 && (
          <div className="space-y-3" data-ocid="reservations.lookup.list">
            {reservations.map((res, idx) => (
              <ReservationCard
                key={`res-${String(res.id)}`}
                reservation={res}
                index={idx + 1}
              />
            ))}
          </div>
        )}
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ReservationsPage() {
  const {
    mutate,
    isPending,
    isSuccess,
    data: reservationId,
    reset,
  } = useCreateReservation();

  const [form, setForm] = useState<FormState>(getInitialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [lastBooking, setLastBooking] = useState<FormState | null>(null);

  function handleChange(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleBlur(field: keyof FormState) {
    const errs = validateForm(form);
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLastBooking(form);
    mutate(toReservationInput(form));
  }

  function handleReset() {
    reset();
    setForm(getInitialForm());
    setErrors({});
    setLastBooking(null);
  }

  if (isSuccess && lastBooking) {
    return (
      <SuccessBanner
        bookingName={lastBooking.name}
        bookingDate={lastBooking.date}
        bookingTime={lastBooking.time}
        bookingPartySize={`${lastBooking.partySize} ${lastBooking.partySize === "1" ? "guest" : "guests"}`}
        reservationId={reservationId ?? null}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="bg-background min-h-screen" data-ocid="reservations.page">
      {/* Hero */}
      <section
        className="bg-primary py-12 px-4 sm:px-6 text-center relative overflow-hidden"
        data-ocid="reservations.hero.section"
      >
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-primary-foreground/10 pointer-events-none" />
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary-foreground/5 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-2">
            Reserve a Table
          </h1>
          <p className="text-primary-foreground/80 text-base max-w-md mx-auto">
            Book your table at Sattv and enjoy an authentic Gujarati vegetarian
            dining experience in Ahmedabad.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main: form + lookup */}
          <div className="lg:col-span-2 space-y-0">
            <div
              className="bg-card rounded-2xl shadow-elevated border border-border p-6 sm:p-8"
              data-ocid="reservations.form.panel"
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Book Your Table
              </h2>
              <ReservationForm
                form={form}
                errors={errors}
                isPending={isPending}
                onChange={handleChange}
                onBlur={handleBlur}
                onSubmit={handleSubmit}
              />
            </div>

            <LookupSection />
          </div>

          {/* Sidebar */}
          <aside className="space-y-4" data-ocid="reservations.sidebar.panel">
            <div className="bg-card rounded-2xl border border-border shadow-subtle p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Restaurant Info
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CalendarDays className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">
                      Opening Hours
                    </div>
                    Mon–Sun: 11:00 AM – 10:30 PM
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Phone</div>
                    <a
                      href="tel:+917926581234"
                      className="hover:text-primary transition-colors"
                      data-ocid="reservations.sidebar.phone.link"
                    >
                      +91 79 2658 1234
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-muted/40 rounded-2xl border border-border p-6">
              <h3 className="font-display text-base font-semibold text-foreground mb-2">
                Cancellation Policy
              </h3>
              <p className="text-sm text-muted-foreground">
                Please call us at least 2 hours before your reservation time if
                you need to cancel or reschedule.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-subtle p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Prefer to call us directly?
              </p>
              <a href="tel:+917926581234" data-ocid="reservations.call.link">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth font-semibold"
                >
                  <Phone className="w-4 h-4 mr-2" /> +91 79 2658 1234
                </Button>
              </a>
            </div>

            <div className="bg-primary/10 rounded-2xl border border-primary/20 p-5">
              <p className="text-sm font-medium text-primary mb-1">
                🌿 100% Vegetarian
              </p>
              <p className="text-xs text-muted-foreground">
                Sattv serves exclusively pure vegetarian cuisine — fresh,
                wholesome, and inspired by traditional Gujarati flavours.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
