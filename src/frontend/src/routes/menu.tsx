import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, UtensilsCrossed } from "lucide-react";
import { useMemo, useState } from "react";
import { MenuCard, MenuCardSkeleton } from "../components/MenuCard";
import { useMenuItems } from "../hooks/useMenuItems";
import type { MenuItem } from "../types";

const CATEGORIES = [
  "Starters",
  "Mains",
  "Breads",
  "Rice & Biryani",
  "Desserts",
  "Beverages",
  "Chinese",
  "Pizza",
  "Punjabi",
] as const;

// Category banner images from Unsplash
const CATEGORY_IMAGES: Record<string, string> = {
  Chinese:
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop",
  Pizza:
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
  Punjabi:
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop",
  Starters:
    "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&auto=format&fit=crop",
  Breads:
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop",
  "Rice & Biryani":
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop",
  Mains:
    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop",
  Desserts:
    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop",
  Beverages:
    "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&auto=format&fit=crop",
};

type DietFilter = "all" | "veg" | "non-veg";

const FALLBACK_MENU: MenuItem[] = [
  {
    id: 1n,
    name: "Kesar Thali",
    description:
      "A royal Gujarati thali with saffron-infused dal, basmati rice, sabzi, rotis and a sweet ending.",
    price: 49500n,
    category: "Mains",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 2n,
    name: "Palak Paneer",
    description:
      "Fresh cottage cheese cubes simmered in a rich, spiced spinach gravy with a touch of cream.",
    price: 32000n,
    category: "Mains",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 3n,
    name: "Gujarati Kadhi",
    description:
      "Tangy yoghurt-based curry tempered with mustard seeds, curry leaves and dried red chillies.",
    price: 22000n,
    category: "Mains",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 4n,
    name: "Methi Thepla",
    description:
      "Traditional thin whole-wheat flatbread flavoured with fresh fenugreek leaves and spices.",
    price: 12000n,
    category: "Breads",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 5n,
    name: "Dhokla Platter",
    description:
      "Light steamed gram-flour snack served with green chutney and tamarind sauce.",
    price: 18000n,
    category: "Starters",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 6n,
    name: "Shrikhand",
    description:
      "Sweetened strained yoghurt delicately flavoured with saffron, cardamom and dry fruits.",
    price: 16000n,
    category: "Desserts",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 7n,
    name: "Masala Chai",
    description:
      "Aromatic spiced tea brewed with fresh ginger, cardamom, cinnamon and full-cream milk.",
    price: 8000n,
    category: "Beverages",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 8n,
    name: "Paneer Tikka",
    description:
      "Chargrilled cottage cheese marinated with yoghurt, Gujarati spices and smoky tandoor char.",
    price: 38000n,
    category: "Starters",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 9n,
    name: "Jeera Rice",
    description:
      "Fragrant basmati rice tempered with whole cumin seeds, ghee and fresh coriander.",
    price: 19000n,
    category: "Rice & Biryani",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 10n,
    name: "Veg Biryani",
    description:
      "Slow-cooked layered basmati rice with seasonal vegetables, saffron and whole spices.",
    price: 35000n,
    category: "Rice & Biryani",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 11n,
    name: "Veg Hakka Noodles",
    description:
      "Tossed noodles with crunchy vegetables, soy sauce and wok-tossed Chinese spices.",
    price: 26000n,
    category: "Chinese",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 12n,
    name: "Manchurian Gravy",
    description:
      "Crispy vegetable dumplings simmered in a tangy, spiced Manchurian sauce.",
    price: 29000n,
    category: "Chinese",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 13n,
    name: "Fried Rice",
    description:
      "Wok-tossed basmati rice with fresh vegetables, spring onions and light soy seasoning.",
    price: 24000n,
    category: "Chinese",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 14n,
    name: "Margherita Pizza",
    description:
      "Classic tomato base with fresh mozzarella, basil leaves and extra virgin olive oil on crispy crust.",
    price: 34000n,
    category: "Pizza",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 15n,
    name: "Paneer Tikka Pizza",
    description:
      "Tandoor-marinated paneer, capsicum and onion on a spiced tomato base with mozzarella.",
    price: 38000n,
    category: "Pizza",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 16n,
    name: "Dal Makhani",
    description:
      "Slow-cooked black lentils in buttery tomato gravy — a Punjabi classic rich in flavour.",
    price: 31000n,
    category: "Punjabi",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 17n,
    name: "Chole Bhature",
    description:
      "Spiced chickpea curry served with fluffy deep-fried bread — the ultimate Punjabi comfort meal.",
    price: 27000n,
    category: "Punjabi",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 18n,
    name: "Sarson Ka Saag",
    description:
      "Mustard greens and spinach cooked slow with ghee and spices, served with makki ki roti.",
    price: 33000n,
    category: "Punjabi",
    isVegetarian: true,
    isAvailable: true,
  },
];

interface CategoryBannerProps {
  category: string;
  itemCount: number;
}

function CategoryBanner({ category, itemCount }: CategoryBannerProps) {
  const imageUrl = CATEGORY_IMAGES[category];
  if (!imageUrl) {
    return (
      <div className="flex items-center gap-3 mb-5">
        <h2 className="font-display text-xl font-bold text-foreground">
          {category}
        </h2>
        <Badge variant="secondary" className="rounded-full text-xs font-medium">
          {itemCount}
        </Badge>
        <div className="flex-1 h-px bg-border" />
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden h-36 sm:h-44 mb-6 shadow-sm">
      <img
        src={imageUrl}
        alt={`${category} cuisine`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex items-center px-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
            {category}
          </h2>
          <Badge className="mt-2 bg-primary/80 text-primary-foreground border-0 text-xs font-medium">
            {itemCount} {itemCount === 1 ? "dish" : "dishes"}
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const { data: backendItems, isLoading } = useMenuItems();
  const [dietFilter, setDietFilter] = useState<DietFilter>("all");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const items: MenuItem[] =
    backendItems && backendItems.length > 0 ? backendItems : FALLBACK_MENU;

  const allCategories = useMemo(() => {
    const cats = Array.from(new Set(items.map((i) => i.category)));
    const ordered = CATEGORIES.filter((c) => cats.includes(c));
    const extra = cats.filter(
      (c) => !CATEGORIES.includes(c as (typeof CATEGORIES)[number]),
    );
    return [...ordered, ...extra];
  }, [items]);

  const filteredItems = useMemo(() => {
    let result: MenuItem[] = items;
    if (dietFilter === "veg") result = result.filter((i) => i.isVegetarian);
    if (dietFilter === "non-veg")
      result = result.filter((i) => !i.isVegetarian);
    if (activeCategory !== "All") {
      result = result.filter(
        (i) => i.category.toLowerCase() === activeCategory.toLowerCase(),
      );
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q),
      );
    }
    return result;
  }, [items, dietFilter, search, activeCategory]);

  const groupedItems = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    const cats =
      activeCategory === "All"
        ? allCategories.filter((cat) =>
            filteredItems.some(
              (i) => i.category.toLowerCase() === cat.toLowerCase(),
            ),
          )
        : [activeCategory];

    for (const cat of cats) {
      const catItems = filteredItems.filter(
        (i) => i.category.toLowerCase() === cat.toLowerCase(),
      );
      if (catItems.length > 0) map.set(cat, catItems);
    }

    const knownSet = new Set(allCategories.map((c) => c.toLowerCase()));
    const others = filteredItems.filter(
      (i) => !knownSet.has(i.category.toLowerCase()),
    );
    if (others.length > 0) map.set("Other", others);

    return map;
  }, [filteredItems, activeCategory, allCategories]);

  const dietButtons: { label: string; value: DietFilter }[] = [
    { label: "All", value: "all" },
    { label: "🌿 Veg Only", value: "veg" },
    { label: "🍗 Non-Veg", value: "non-veg" },
  ];

  return (
    <div className="min-h-screen bg-background" data-ocid="menu.page">
      {/* Page Header */}
      <section
        className="bg-card border-b border-border py-10 px-4"
        data-ocid="menu.hero.section"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Our Menu
          </h1>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Thoughtfully crafted dishes celebrating the finest flavours of
            Gujarat — and beyond.
          </p>
        </div>
      </section>

      {/* Sticky Filters */}
      <div className="sticky top-0 z-20 bg-card/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Diet filter buttons */}
          <div className="flex items-center gap-2" data-ocid="menu.filter.diet">
            {dietButtons.map((btn) => (
              <button
                key={btn.value}
                type="button"
                onClick={() => setDietFilter(btn.value)}
                data-ocid={`menu.filter.${btn.value}`}
                aria-pressed={dietFilter === btn.value}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  dietFilter === btn.value
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search dishes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background border-input"
              data-ocid="menu.search_input"
            />
          </div>
        </div>

        {/* Category scroll tabs */}
        <div className="max-w-5xl mx-auto px-4 pb-2">
          <div
            className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden"
            data-ocid="menu.category.tabs"
          >
            {["All", ...allCategories].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-ocid={`menu.category.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                aria-pressed={activeCategory === cat}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  activeCategory === cat
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {isLoading ? (
          <div>
            <div className="h-6 w-32 bg-muted rounded mb-4 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"].map((k) => (
                <MenuCardSkeleton key={k} />
              ))}
            </div>
          </div>
        ) : groupedItems.size === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="menu.empty_state"
          >
            <UtensilsCrossed className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No dishes found
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Try adjusting your filters or search term to discover more dishes.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Array.from(groupedItems.entries()).map(([category, catItems]) => (
              <section
                key={category}
                id={category.toLowerCase().replace(/\s+/g, "-")}
              >
                <CategoryBanner
                  category={category}
                  itemCount={catItems.length}
                />
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  data-ocid={`menu.${category.toLowerCase().replace(/[^a-z0-9]/g, "_")}.list`}
                >
                  {catItems.map((item, i) => (
                    <MenuCard key={String(item.id)} item={item} index={i} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
