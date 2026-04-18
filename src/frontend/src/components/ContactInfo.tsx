import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { RestaurantInfo } from "../types";

interface ContactInfoProps {
  info: RestaurantInfo | undefined;
  isLoading?: boolean;
  variant?: "default" | "prominent";
}

function ContactSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48 rounded" />
      <Skeleton className="h-5 w-full rounded" />
      <Skeleton className="h-5 w-3/4 rounded" />
      <Skeleton className="h-5 w-2/3 rounded" />
    </div>
  );
}

export function ContactInfo({
  info,
  isLoading = false,
  variant = "default",
}: ContactInfoProps) {
  if (isLoading) return <ContactSkeleton />;

  const phone = info?.phone ?? "+91 79 2658 1234";
  const address =
    info?.address ?? "12, Ambawadi Arcade, Ahmedabad, Gujarat 380006";
  const email = info?.email ?? "hello@sattvrestaurant.com";
  const hours = info?.openingHours ?? "Mon–Sun: 11:00 AM – 10:30 PM";

  if (variant === "prominent") {
    return (
      <div
        className="flex flex-col items-center text-center gap-2"
        data-ocid="contact.prominent.section"
      >
        <Phone className="w-8 h-8 text-primary mb-1" aria-hidden="true" />
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
          Call Us
        </p>
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="font-display text-3xl sm:text-4xl font-semibold text-foreground hover:text-primary transition-colors duration-200"
          data-ocid="contact.phone.link"
          aria-label={`Call us at ${phone}`}
        >
          {phone}
        </a>
        <p className="text-muted-foreground text-sm">Available {hours}</p>
      </div>
    );
  }

  const items = [
    {
      id: "address",
      icon: <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-primary" />,
      content: (
        <address className="not-italic text-foreground/80 text-sm leading-relaxed">
          {address}
        </address>
      ),
    },
    {
      id: "phone",
      icon: <Phone className="w-5 h-5 shrink-0 text-primary" />,
      content: (
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="text-foreground/80 hover:text-primary font-medium text-sm transition-colors duration-200"
          data-ocid="contact.phone.link"
        >
          {phone}
        </a>
      ),
    },
    {
      id: "email",
      icon: <Mail className="w-5 h-5 shrink-0 text-primary" />,
      content: (
        <a
          href={`mailto:${email}`}
          className="text-foreground/80 hover:text-primary text-sm transition-colors duration-200"
          data-ocid="contact.email.link"
        >
          {email}
        </a>
      ),
    },
    {
      id: "hours",
      icon: <Clock className="w-5 h-5 shrink-0 text-primary" />,
      content: <span className="text-foreground/80 text-sm">{hours}</span>,
    },
  ];

  return (
    <ul className="space-y-4" data-ocid="contact.info.section">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-3">
          {item.icon}
          <div className="min-w-0">{item.content}</div>
        </li>
      ))}
    </ul>
  );
}
