import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, Heart, Leaf, Star } from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  {
    id: "pure-veg",
    icon: <Leaf className="w-6 h-6" />,
    title: "Pure Vegetarian",
    desc: "Every dish on our menu is crafted with care — no meat, no compromise, only the finest ingredients.",
  },
  {
    id: "made-with-love",
    icon: <Heart className="w-6 h-6" />,
    title: "Made With Love",
    desc: "Our recipes have been passed down through generations, preserving the soul of Gujarati home cooking.",
  },
  {
    id: "authentic",
    icon: <Star className="w-6 h-6" />,
    title: "Authentic Flavours",
    desc: "From Kesar Thali to Gujarati Kadhi, we honour the vibrant culinary heritage of Ahmedabad.",
  },
];

const TEAM = [
  {
    id: "chef-priya",
    name: "Chef Priya Desai",
    role: "Head Chef & Co-founder",
    bio: "Third-generation Gujarati cook with 20 years of experience crafting authentic vegetarian cuisine.",
    emoji: "👩‍🍳",
  },
  {
    id: "rohan-shah",
    name: "Rohan Shah",
    role: "Co-founder & Operations",
    bio: "Passionate about creating warm, welcoming dining experiences rooted in Ahmedabad's culinary culture.",
    emoji: "👨‍💼",
  },
];

export default function AboutPage() {
  return (
    <div data-ocid="about.page">
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
              Our Story
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary-foreground leading-tight mb-4">
              About Sattv
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl leading-relaxed">
              A family-run pure vegetarian restaurant rooted in the culinary
              heritage of Ahmedabad, Gujarat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section
        className="py-16 sm:py-20 bg-background"
        data-ocid="about.story.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-5"
            >
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
                Born in Ahmedabad,
                <br />
                Seasoned by Tradition
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Sattv was founded in 2009 by the Mehta family — a household
                where cooking was always an act of love. What began as a small
                tiffin service from their Prahladnagar home grew into one of
                Ahmedabad's most cherished vegetarian dining destinations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every recipe at Sattv carries a story: the Kesar Thali honours
                grandmother Kanta's weekend feast tradition, while our Undhiyu
                follows a 70-year-old family recipe passed down through three
                generations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The word{" "}
                <em className="text-foreground font-medium">"Sattv"</em> comes
                from the Sanskrit concept of purity, balance, and nourishment —
                values that guide every dish we create.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: "15+", label: "Years serving" },
                  { value: "80+", label: "Menu items" },
                  { value: "4.9★", label: "Guest rating" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-muted/50 border border-border"
                  >
                    <p className="font-display text-2xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg"
            >
              <img
                src="/assets/generated/restaurant-interior.dim_800x600.jpg"
                alt="Sattv Restaurant warm interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section
        className="py-16 sm:py-18 bg-muted/30"
        data-ocid="about.values.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-semibold text-foreground text-center mb-10"
          >
            What We Stand For
          </motion.h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {VALUES.map((v, index) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="bg-card rounded-2xl p-6 text-center border border-border h-full"
                  data-ocid={`about.value.item.${index + 1}`}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                    {v.icon}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section
        className="py-16 sm:py-20 bg-background"
        data-ocid="about.team.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-semibold text-foreground text-center mb-10"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {TEAM.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <Card
                  className="bg-card rounded-2xl p-6 border border-border flex items-start gap-4"
                  data-ocid={`about.team.item.${index + 1}`}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-2xl">
                    {member.emoji}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-xs text-primary font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA to Contact page */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">
              Want to visit us or get in touch?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" data-ocid="about.contact_cta.link">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 transition-smooth"
                >
                  Contact Us
                </Button>
              </Link>
              <Link to="/reservations" data-ocid="about.reserve_cta.link">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 transition-smooth"
                >
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  Reserve a Table
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
