import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  Leaf,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";
import { DietaryBadge } from "../components/DietaryBadge";
import { FeaturedDishes } from "../components/FeaturedDishes";
import { HeroSection } from "../components/HeroSection";
import { useMenuItems } from "../hooks/useMenuItems";
import type { MenuItem } from "../types";

const FEATURES = [
  {
    id: "pure-veg",
    icon: <Leaf className="w-6 h-6 text-accent-foreground" />,
    title: "100% Pure Veg",
    description:
      "Every dish on our menu is strictly vegetarian — crafted with fresh, seasonal produce and no compromise.",
  },
  {
    id: "ahmedabad-flavours",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    title: "Ahmedabad Flavours",
    description:
      "Rooted in Gujarati culinary tradition, our recipes celebrate the sweet, spicy, and tangy soul of the city.",
  },
  {
    id: "fresh-daily",
    icon: <UtensilsCrossed className="w-6 h-6 text-primary" />,
    title: "Fresh Daily",
    description:
      "We prepare every dal, sabzi, and mithai from scratch each morning — no reheated shortcuts, ever.",
  },
];

function LiveMenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <Card
      className="overflow-hidden flex flex-col bg-card border border-border hover:shadow-md transition-smooth group"
      data-ocid={`home.menu_card.item.${index + 1}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span
            className="text-5xl select-none group-hover:scale-110 transition-transform duration-500"
            aria-hidden="true"
          >
            🍽️
          </span>
        )}
        <div className="absolute top-2 left-2">
          <DietaryBadge isVegetarian={item.isVegetarian} />
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-display text-sm sm:text-base font-semibold text-foreground leading-snug line-clamp-1">
          {item.name}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 leading-relaxed flex-1">
          {item.description}
        </p>
        <span className="font-display text-base sm:text-lg font-bold text-primary mt-1">
          ₹{(Number(item.price) / 100).toLocaleString("en-IN")}
        </span>
      </div>
    </Card>
  );
}

export default function HomePage() {
  const { data: menuItems, isLoading: menuLoading } = useMenuItems();
  const liveItems = menuItems?.filter((i) => i.isAvailable).slice(0, 4) ?? [];
  const showLiveMenu = !menuLoading && liveItems.length > 0;

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Features strip ── */}
      <section
        className="py-14 sm:py-16 bg-card border-y border-border"
        data-ocid="features.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {FEATURES.map((feat, index) => (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="flex flex-col items-center text-center gap-3"
                data-ocid={`features.item.${index + 1}`}
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-1">
                  {feat.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {feat.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Menu section — live data if available, curated hardcoded otherwise ── */}
      {showLiveMenu ? (
        <section
          className="py-16 sm:py-20 bg-background"
          data-ocid="home.menu.section"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-3">
                Our Menu
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-3">
                Explore Our Curated Menu
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
                Thoughtfully crafted pure vegetarian dishes inspired by Gujarati
                culinary heritage.
              </p>
            </motion.div>
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              data-ocid="home.menu.list"
            >
              {liveItems.map((item, i) => (
                <motion.div
                  key={Number(item.id)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <LiveMenuCard item={item} index={i} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/menu" data-ocid="home.menu.view_all_button">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-smooth px-8"
                >
                  View Full Menu
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      ) : menuLoading ? (
        <section className="py-16 sm:py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <Skeleton className="h-7 w-48 mx-auto mb-3 rounded" />
              <Skeleton className="h-5 w-64 mx-auto rounded" />
            </div>
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              data-ocid="home.menu.loading_state"
            >
              {["a", "b", "c", "d"].map((k) => (
                <div key={k} className="rounded-xl overflow-hidden">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <FeaturedDishes />
      )}

      {/* ── Atmosphere / Interior ── */}
      <section
        className="py-16 sm:py-20 bg-muted/40"
        data-ocid="atmosphere.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg"
            >
              <img
                src="/assets/generated/restaurant-interior.dim_800x600.jpg"
                alt="Sattv Restaurant warm interior — traditional Gujarati decor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col gap-5"
            >
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                Our Ambience
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
                A Space as Warm as
                <br />
                the Food We Serve
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Step into Sattv and feel the gentle warmth of terracotta lamps,
                hand-woven textiles, and the aroma of fresh spices. We've
                designed every corner to echo the hospitality Ahmedabad is
                famous for.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're celebrating a family milestone or enjoying a
                quiet midday thali, our dining room seats up to 80 guests in
                relaxed comfort.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link to="/reservations" data-ocid="atmosphere.reserve.button">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-smooth">
                    <CalendarCheck className="w-4 h-4 mr-2" />
                    Book a Table
                  </Button>
                </Link>
                <Link to="/about" data-ocid="atmosphere.about.link">
                  <Button
                    variant="outline"
                    className="border-border text-foreground hover:bg-muted transition-smooth"
                  >
                    Our Story
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Reserve CTA Banner ── */}
      <section
        className="py-16 sm:py-20 bg-primary text-primary-foreground relative overflow-hidden"
        data-ocid="reserve_cta.section"
      >
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-primary-foreground/10 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-primary-foreground/10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
              Reserve a Table
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-md mx-auto">
              Join us for an unforgettable vegetarian dining experience in the
              heart of Ahmedabad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/reservations" data-ocid="reserve_cta.book.button">
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold px-10 transition-smooth shadow-md"
                >
                  Book Your Table
                </Button>
              </Link>
              <a href="tel:+917926581234" data-ocid="reserve_cta.call.link">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/50 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-semibold px-10 transition-smooth"
                >
                  Call +91 79 2658 1234
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        className="py-16 sm:py-20 bg-background"
        data-ocid="testimonials.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-3 block">
              Guest Reviews
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
              What Our Guests Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                id: "review-priya",
                name: "Priya Mehta",
                quote:
                  "The Kesar Thali is an absolute delight — every element perfectly balanced. Feels like Sunday lunch at a Gujarati home.",
                location: "Prahladnagar, Ahmedabad",
                rating: 5,
              },
              {
                id: "review-rohan",
                name: "Rohan Desai",
                quote:
                  "Sattv's Undhiyu is the best I've had in the city. The spice balance is spot on, and the atmosphere is so warm and inviting.",
                location: "Navrangpura, Ahmedabad",
                rating: 5,
              },
              {
                id: "review-ananya",
                name: "Ananya Shah",
                quote:
                  "Finally a pure-veg restaurant where quality never drops. We celebrated our anniversary here and it was flawless.",
                location: "Bopal, Ahmedabad",
                rating: 5,
              },
            ].map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="p-6 bg-card border border-border flex flex-col gap-4 h-full"
                  data-ocid={`testimonials.item.${index + 1}`}
                >
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span
                        key={`star-${review.id}-${i}`}
                        className="text-primary text-base"
                        aria-hidden="true"
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-foreground/80 text-sm leading-relaxed flex-1 italic">
                    "{review.quote}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground text-sm">
                      {review.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {review.location}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
