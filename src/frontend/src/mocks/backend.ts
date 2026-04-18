import type { backendInterface, MenuItem, Reservation, RestaurantInfo, Result, Review } from "../backend";

const mockMenuItems: MenuItem[] = [
  {
    id: BigInt(1),
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes simmered in a rich, creamy tomato-butter sauce with aromatic spices.",
    category: "Main Course",
    price: BigInt(280),
    isVegetarian: true,
    isAvailable: true,
    imageUrl: undefined,
  },
  {
    id: BigInt(2),
    name: "Dal Makhani",
    description: "Slow-cooked black lentils in a velvety buttery sauce — a Punjabi classic.",
    category: "Main Course",
    price: BigInt(220),
    isVegetarian: true,
    isAvailable: true,
    imageUrl: undefined,
  },
  {
    id: BigInt(3),
    name: "Palak Paneer",
    description: "Fresh cottage cheese in a smooth, spiced spinach gravy.",
    category: "Main Course",
    price: BigInt(240),
    isVegetarian: true,
    isAvailable: true,
    imageUrl: undefined,
  },
  {
    id: BigInt(4),
    name: "Samosa (2 pcs)",
    description: "Crispy fried pastry stuffed with spiced potatoes and peas. Served with green chutney.",
    category: "Starters",
    price: BigInt(80),
    isVegetarian: true,
    isAvailable: true,
    imageUrl: undefined,
  },
  {
    id: BigInt(5),
    name: "Chicken Tikka",
    description: "Tender chicken chunks marinated in yogurt and spices, grilled in a tandoor.",
    category: "Starters",
    price: BigInt(320),
    isVegetarian: false,
    isAvailable: true,
    imageUrl: undefined,
  },
  {
    id: BigInt(6),
    name: "Gulab Jamun",
    description: "Soft milk-solid dumplings soaked in rose-flavored sugar syrup. Served warm.",
    category: "Desserts",
    price: BigInt(120),
    isVegetarian: true,
    isAvailable: true,
    imageUrl: undefined,
  },
  {
    id: BigInt(7),
    name: "Mango Lassi",
    description: "Chilled yogurt drink blended with fresh Kesar mango pulp and a hint of cardamom.",
    category: "Beverages",
    price: BigInt(90),
    isVegetarian: true,
    isAvailable: true,
    imageUrl: undefined,
  },
  {
    id: BigInt(8),
    name: "Garlic Naan",
    description: "Soft leavened bread baked in tandoor, brushed with garlic butter and fresh cilantro.",
    category: "Breads",
    price: BigInt(60),
    isVegetarian: true,
    isAvailable: true,
    imageUrl: undefined,
  },
];

const mockRestaurantInfo: RestaurantInfo = {
  name: "Shree Ahmedabad Rasoi",
  address: "123 CG Road, Navrangpura, Ahmedabad, Gujarat 380009",
  phone: "+91 79 2646 0000",
  email: "info@shreeahmedabadrasoi.com",
  openingHours: "Mon-Sun: 11:00 AM - 11:00 PM",
};

const mockReviews: Review[] = [
  {
    id: BigInt(1),
    customerName: "Meena Patel",
    rating: BigInt(5),
    reviewText: "Absolutely divine food! The Kesar Thali was beyond delicious — felt like a home-cooked Gujarati feast. Will definitely return!",
    createdAt: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
  {
    id: BigInt(2),
    customerName: "Rahul Shah",
    rating: BigInt(4),
    reviewText: "Great ambiance and very authentic Gujarati flavours. The Dhokla Platter was fresh and perfectly balanced. Service was prompt.",
    createdAt: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
  {
    id: BigInt(3),
    customerName: "Anjali Mehta",
    rating: BigInt(5),
    reviewText: "Best vegetarian restaurant in Ahmedabad, hands down. Brought my entire family and everyone loved every dish. The Palak Paneer is exceptional!",
    createdAt: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
];

let nextReviewId = 4;

export const mockBackend: backendInterface = {
  getAllMenuItems: async () => mockMenuItems,

  getMenuItemsByCategory: async (category: string) =>
    mockMenuItems.filter((item) => item.category === category),

  getVegetarianItems: async () =>
    mockMenuItems.filter((item) => item.isVegetarian),

  getRestaurantInfo: async () => mockRestaurantInfo,

  createReservation: async (
    name: string,
    phoneNumber: string,
    date: string,
    time: string,
    partySize: bigint,
    specialRequests: string | null
  ): Promise<Result> => ({
    __kind__: "ok",
    ok: BigInt(1),
  }),

  getReservationByPhone: async (phoneNumber: string): Promise<Reservation[]> => [
    {
      id: BigInt(1),
      name: "Sample Guest",
      phoneNumber,
      date: "2026-04-20",
      time: "19:30",
      partySize: BigInt(4),
      status: { __kind__: "pending" } as any,
      specialRequests: "Window seat preferred",
      createdAt: BigInt(Date.now()),
    },
  ],

  getAllReviews: async (): Promise<Review[]> => [...mockReviews].reverse(),

  submitReview: async (
    customerName: string,
    rating: bigint,
    reviewText: string,
  ): Promise<Result> => {
    const newReview: Review = {
      id: BigInt(nextReviewId++),
      customerName,
      rating,
      reviewText,
      createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    };
    mockReviews.push(newReview);
    return { __kind__: "ok", ok: newReview.id };
  },
};
