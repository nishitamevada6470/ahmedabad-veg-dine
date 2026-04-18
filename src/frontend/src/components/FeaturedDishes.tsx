import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { DietaryBadge } from "./DietaryBadge";

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  isVegetarian: boolean;
  emoji: string;
  category: string;
  highlight?: string;
}

const FEATURED_DISHES: Dish[] = [
  {
    id: "kesar-thali",
    name: "Kesar Thali",
    description:
      "Royal Gujarati thali with saffron-infused dal, 5 rotis, rice, sabzi, pickle & meethi lassi.",
    price: 495,
    isVegetarian: true,
    emoji: "🍛",
    category: "Thali",
    highlight: "Bestseller",
  },
  {
    id: "palak-paneer",
    name: "Palak Paneer",
    description:
      "Silky spinach gravy with fresh cottage cheese, tempered with cumin & garam masala.",
    price: 280,
    isVegetarian: true,
    emoji: "🥬",
    category: "Sabzi",
  },
  {
    id: "gujarati-kadhi",
    name: "Gujarati Kadhi",
    description:
      "Sweet-tangy yogurt kadhi with pakoras, a classic Ahmedabad comfort dish.",
    price: 180,
    isVegetarian: true,
    emoji: "🥣",
    category: "Sabzi",
    highlight: "Chef's Pick",
  },
  {
    id: "masala-bhaat",
    name: "Masala Bhaat",
    description:
      "Aromatic one-pot spiced rice with seasonal vegetables and whole spices.",
    price: 220,
    isVegetarian: true,
    emoji: "🍚",
    category: "Rice",
  },
  {
    id: "shrikhand-poori",
    name: "Shrikhand Poori",
    description:
      "Velvety saffron-cardamom shrikhand paired with crisp golden pooris.",
    price: 195,
    isVegetarian: true,
    emoji: "🍮",
    category: "Dessert",
    highlight: "Must Try",
  },
  {
    id: "undhiyu",
    name: "Undhiyu",
    description:
      "Slow-cooked winter vegetable medley in a spiced fenugreek-coconut paste.",
    price: 320,
    isVegetarian: true,
    emoji: "🥘",
    category: "Seasonal",
  },
];

export function FeaturedDishes() {
  return (
    <section
      className="py-16 sm:py-20 bg-background"
      data-ocid="featured_dishes.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
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

        {/* Dishes grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10"
          data-ocid="featured_dishes.list"
        >
          {FEATURED_DISHES.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card
                className="overflow-hidden flex flex-col bg-card border border-border hover:shadow-md transition-smooth group cursor-default"
                data-ocid={`featured_dishes.item.${index + 1}`}
              >
                {/* Image/emoji area */}
                <div className="relative aspect-[4/3] bg-muted overflow-hidden flex items-center justify-center">
                  <span
                    className="text-5xl sm:text-6xl select-none group-hover:scale-110 transition-transform duration-500"
                    aria-hidden="true"
                  >
                    {dish.emoji}
                  </span>
                  {/* Dietary badge */}
                  <div className="absolute top-2 left-2">
                    <DietaryBadge isVegetarian={dish.isVegetarian} />
                  </div>
                  {/* Highlight badge */}
                  {dish.highlight && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5 font-semibold shadow-sm">
                        {dish.highlight}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-3 sm:p-4 gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-sm sm:text-base font-semibold text-foreground leading-snug line-clamp-1 flex-1">
                      {dish.name}
                    </h3>
                    <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0">
                      {dish.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 leading-relaxed flex-1">
                    {dish.description}
                  </p>
                  <span className="font-display text-base sm:text-lg font-bold text-primary mt-1">
                    ₹{dish.price}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link to="/menu" data-ocid="featured_dishes.view_full_menu.button">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 transition-smooth"
            >
              View Full Menu
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
