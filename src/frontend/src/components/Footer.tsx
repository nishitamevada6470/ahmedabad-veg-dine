import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, UtensilsCrossed } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";

const year = new Date().getFullYear();
const hostname = encodeURIComponent(
  typeof window !== "undefined" ? window.location.hostname : "",
);

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground" data-ocid="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-semibold">Sattv</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Authentic vegetarian cuisine from the heart of Ahmedabad. Pure,
              nourishing, and full of flavour.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  12, Ambawadi Arcade,
                  <br />
                  Ahmedabad, Gujarat 380006
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a
                  href="tel:+917926581234"
                  className="hover:text-primary-foreground transition-colors"
                  data-ocid="footer.phone.link"
                >
                  +91 79 2658 1234
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a
                  href="mailto:hello@sattvrestaurant.com"
                  className="hover:text-primary-foreground transition-colors"
                  data-ocid="footer.email.link"
                >
                  hello@sattvrestaurant.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">
              Opening Hours
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-primary-foreground">
                    Mon – Sun
                  </div>
                  <div>11:00 AM – 10:30 PM</div>
                </div>
              </li>
              <li className="text-primary-foreground/60 text-xs pt-1">
                Last orders at 10:00 PM
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Our Menu", href: "/menu" },
                { label: "Reserve a Table", href: "/reservations" },
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
                { label: "Reviews", href: "/reviews" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200"
                    data-ocid={`footer.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              data-ocid="footer.instagram.link"
            >
              <SiInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              data-ocid="footer.facebook.link"
            >
              <SiFacebook className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              data-ocid="footer.youtube.link"
            >
              <SiYoutube className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center sm:text-right text-xs text-primary-foreground/50 space-y-1">
            <div>
              © {year}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground/80 underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-primary-foreground/80 transition-colors"
              data-ocid="footer.back_to_top.button"
            >
              ↑ Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
