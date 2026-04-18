import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden min-h-[92vh] flex items-end"
      data-ocid="hero.section"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-restaurant.dim_1200x800.jpg"
          alt="Sattv Restaurant interior — warm Ahmedabad ambience"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay: transparent top → rich dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
      </div>

      {/* Floating trust badge — top right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute top-6 right-4 sm:right-8 z-10 hidden sm:flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-md"
      >
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
          ))}
        </div>
        <span className="text-xs font-semibold text-foreground">
          4.9 Rating
        </span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5"
          >
            <span className="w-6 h-px bg-primary-foreground/70" />
            <span className="text-primary-foreground/80 text-sm font-medium tracking-widest uppercase">
              Pure Vegetarian · Ahmedabad
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-[1.1] mb-5">
            Discover the
            <br />
            Flavours of
            <br />
            <em className="not-italic text-accent">Ahmedabad.</em>
          </h1>

          {/* Sub-headline */}
          <p className="text-primary-foreground/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-md">
            Authentic. Nourishing. Vegetarian.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link to="/menu" data-ocid="hero.view_menu.button">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 shadow-lg transition-smooth"
              >
                View Menu
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/reservations" data-ocid="hero.reserve_button">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground/50 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm font-semibold px-8 transition-smooth"
              >
                Reserve a Table
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-primary-foreground/50 text-xs tracking-widest uppercase">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.6,
            ease: "easeInOut",
          }}
          className="w-0.5 h-6 bg-primary-foreground/30 rounded-full"
        />
      </motion.div>
    </section>
  );
}
