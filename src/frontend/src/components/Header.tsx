import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, UtensilsCrossed, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Reservations", href: "/reservations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Reviews", href: "/reviews" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-semibold text-primary tracking-tight">
              Sattv
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-5"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 [&.active]:text-primary [&.active]:font-semibold"
                activeOptions={{ exact: item.href === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/reservations">
              <Button
                data-ocid="header.reserve_button"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-5 transition-smooth"
              >
                Reserve a Table
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="header.mobile_menu.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden bg-card border-t border-border"
          data-ocid="header.mobile_menu"
        >
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                data-ocid={`nav.mobile.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted transition-colors duration-200 [&.active]:text-primary [&.active]:bg-muted"
                activeOptions={{ exact: item.href === "/" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-2">
              <Link to="/reservations" onClick={() => setMobileOpen(false)}>
                <Button
                  data-ocid="header.mobile.reserve_button"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                >
                  Reserve a Table
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
