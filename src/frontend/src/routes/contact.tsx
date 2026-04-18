import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { ContactInfo } from "../components/ContactInfo";
import { useRestaurantInfo } from "../hooks/useRestaurantInfo";

const HOURS_TABLE = [
  { day: "Monday", time: "11:00 AM – 10:30 PM" },
  { day: "Tuesday", time: "11:00 AM – 10:30 PM" },
  { day: "Wednesday", time: "11:00 AM – 10:30 PM" },
  { day: "Thursday", time: "11:00 AM – 10:30 PM" },
  { day: "Friday", time: "11:00 AM – 11:00 PM" },
  { day: "Saturday", time: "10:30 AM – 11:00 PM" },
  { day: "Sunday", time: "10:30 AM – 10:30 PM" },
];

export default function ContactPage() {
  const { data: info, isLoading } = useRestaurantInfo();

  return (
    <div data-ocid="contact.page">
      {/* ── Page header ── */}
      <section className="py-14 sm:py-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -bottom-10 -left-8 w-40 h-40 rounded-full bg-primary-foreground/10 pointer-events-none" />
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary-foreground/10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary-foreground/70 font-semibold text-sm tracking-widest uppercase block mb-3">
              Get in Touch
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary-foreground leading-tight mb-4">
              Contact Us
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl leading-relaxed">
              We'd love to hear from you. Reach out for reservations, enquiries,
              or just to say hello.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Large phone CTA ── */}
      <section
        className="py-14 sm:py-16 bg-background"
        data-ocid="contact.phone_cta.section"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Phone className="w-7 h-7 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm font-semibold uppercase tracking-widest">
              Reservations & Enquiries
            </p>
            {isLoading ? (
              <Skeleton
                className="h-14 w-72 mx-auto rounded"
                data-ocid="contact.phone_large.loading_state"
              />
            ) : (
              <a
                href={`tel:${(info?.phone ?? "+917926581234").replace(/\s+/g, "")}`}
                className="font-display text-3xl sm:text-5xl font-semibold text-foreground hover:text-primary transition-colors duration-200 block"
                data-ocid="contact.phone_large.link"
              >
                {info?.phone ?? "+91 79 2658 1234"}
              </a>
            )}
            <p className="text-muted-foreground text-sm">
              Mon – Sun · 11:00 AM – 10:30 PM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a
                href={`tel:${(info?.phone ?? "+917926581234").replace(/\s+/g, "")}`}
                data-ocid="contact.call_now.button"
              >
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 transition-smooth"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </a>
              <a
                href={`mailto:${info?.email ?? "hello@sattvrestaurant.com"}`}
                data-ocid="contact.email.button"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted font-semibold px-8 transition-smooth"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send an Email
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section
        className="py-16 sm:py-20 bg-muted/40"
        data-ocid="contact.details.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-semibold text-sm tracking-widest uppercase block mb-3">
              Find Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
              Visit Sattv Restaurant
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact details card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 bg-card border border-border h-full flex flex-col gap-6">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Contact Details
                </h3>
                <ContactInfo info={info} isLoading={isLoading} />
                <div className="mt-auto pt-4 border-t border-border">
                  {isLoading ? (
                    <Skeleton className="h-12 w-full rounded-lg" />
                  ) : (
                    <a
                      href={`tel:${(info?.phone ?? "+917926581234").replace(/\s+/g, "")}`}
                      className="flex items-center justify-center gap-2 w-full rounded-lg bg-primary text-primary-foreground py-3 px-4 font-semibold text-sm hover:bg-primary/90 transition-smooth"
                      data-ocid="contact.card_call.button"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Hours table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-card border border-border h-full">
                <h3 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Opening Hours
                </h3>
                <table
                  className="w-full text-sm"
                  aria-label="Opening hours"
                  data-ocid="contact.hours.table"
                >
                  <tbody className="divide-y divide-border">
                    {HOURS_TABLE.map((row) => (
                      <tr key={row.day}>
                        <td className="py-2.5 font-medium text-foreground pr-4">
                          {row.day}
                        </td>
                        <td className="py-2.5 text-right text-foreground/80">
                          {row.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-muted-foreground text-xs mt-4 border-t border-border pt-3">
                  Last orders accepted 30 minutes before closing.
                </p>
              </Card>
            </motion.div>

            {/* Map card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="overflow-hidden bg-card border border-border h-full flex flex-col">
                <div className="relative flex-1 min-h-48">
                  <img
                    src="/assets/generated/ahmedabad-map.dim_800x450.jpg"
                    alt="Map showing Sattv Restaurant in Ambawadi, Ahmedabad"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <p className="text-foreground font-semibold text-sm">
                    Sattv Restaurant, Ahmedabad
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {info?.address ??
                      "12, Ambawadi Arcade, Ahmedabad, Gujarat 380006"}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Ambawadi+Arcade+Ahmedabad+Gujarat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline"
                    data-ocid="contact.get_directions.link"
                  >
                    Get Directions
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Reserve CTA ── */}
      <section
        className="py-14 sm:py-16 bg-background"
        data-ocid="contact.reserve_cta.section"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
              Ready to dine with us?
            </h2>
            <p className="text-muted-foreground">
              Book your table online in under a minute — no waiting required.
            </p>
            <Link to="/reservations" data-ocid="contact.reserve_cta.button">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-10 transition-smooth mt-2"
              >
                <CalendarCheck className="w-4 h-4 mr-2" />
                Reserve a Table
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
