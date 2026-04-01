/**
 * Mock product data for demo mode (DEMO=1).
 * Lowes-style home improvement products with real Unsplash images.
 */

/** Inline type to avoid pulling in drizzle/zod DB schema dependencies */
interface DemoProductVariant {
  id: number;
  productId: number;
  stripeId: string;
  color: string;
  sizes: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DemoProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  variants: DemoProductVariant[];
}

export const demoProducts: DemoProduct[] = [
  {
    id: 1,
    name: "Cordless Drill/Driver Kit 20V",
    description:
      "Powerful 20V MAX cordless drill/driver with lithium-ion battery. Includes charger and carrying bag.",
    price: 89.99,
    category: "t-shirts",
    img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=900&fit=crop",
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
    variants: [
      {
        id: 1,
        productId: 1,
        stripeId: "demo_price_001",
        color: "yellow",
        sizes: ["S", "M", "L"],
        images: [
          "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=900&fit=crop",
        ],
        createdAt: "2025-01-15T00:00:00Z",
        updatedAt: "2025-01-15T00:00:00Z",
      },
    ],
  },
  {
    id: 2,
    name: "Stainless Steel French Door Refrigerator",
    description:
      "26 cu. ft. French door refrigerator with ice maker. Fingerprint-resistant stainless steel.",
    price: 1799.0,
    category: "t-shirts",
    img: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=900&fit=crop",
    createdAt: "2025-02-10T00:00:00Z",
    updatedAt: "2025-02-10T00:00:00Z",
    variants: [
      {
        id: 2,
        productId: 2,
        stripeId: "demo_price_002",
        color: "silver",
        sizes: ["M"],
        images: [
          "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=900&fit=crop",
        ],
        createdAt: "2025-02-10T00:00:00Z",
        updatedAt: "2025-02-10T00:00:00Z",
      },
    ],
  },
  {
    id: 3,
    name: "Premium Interior Paint - Eggshell",
    description:
      "One-coat coverage interior paint with primer. Low VOC formula. Washable and stain-resistant.",
    price: 38.98,
    category: "t-shirts",
    img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=900&fit=crop",
    createdAt: "2025-03-05T00:00:00Z",
    updatedAt: "2025-03-05T00:00:00Z",
    variants: [
      {
        id: 3,
        productId: 3,
        stripeId: "demo_price_003",
        color: "white",
        sizes: ["S", "M", "L"],
        images: [
          "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=900&fit=crop",
        ],
        createdAt: "2025-03-05T00:00:00Z",
        updatedAt: "2025-03-05T00:00:00Z",
      },
    ],
  },
  {
    id: 4,
    name: "Riding Lawn Mower 42in Cut",
    description:
      "42-inch riding lawn mower with 18.5 HP engine. Automatic transmission, cruise control.",
    price: 1599.0,
    category: "pants",
    img: "https://images.unsplash.com/photo-1590212151175-e58edd96185b?w=600&h=900&fit=crop",
    createdAt: "2025-01-20T00:00:00Z",
    updatedAt: "2025-01-20T00:00:00Z",
    variants: [
      {
        id: 4,
        productId: 4,
        stripeId: "demo_price_004",
        color: "green",
        sizes: ["M"],
        images: [
          "https://images.unsplash.com/photo-1590212151175-e58edd96185b?w=600&h=900&fit=crop",
        ],
        createdAt: "2025-01-20T00:00:00Z",
        updatedAt: "2025-01-20T00:00:00Z",
      },
    ],
  },
  {
    id: 5,
    name: "Brushed Nickel Bathroom Faucet",
    description:
      "Single-handle bathroom faucet with WaterSense certified flow. Spot-resistant brushed nickel.",
    price: 119.0,
    category: "sweatshirts",
    img: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=900&fit=crop",
    createdAt: "2025-02-28T00:00:00Z",
    updatedAt: "2025-02-28T00:00:00Z",
    variants: [
      {
        id: 5,
        productId: 5,
        stripeId: "demo_price_005",
        color: "silver",
        sizes: ["S", "M"],
        images: [
          "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=900&fit=crop",
        ],
        createdAt: "2025-02-28T00:00:00Z",
        updatedAt: "2025-02-28T00:00:00Z",
      },
    ],
  },
  {
    id: 6,
    name: "LED Flush Mount Ceiling Light",
    description:
      "13-inch LED flush mount ceiling light, 1400 lumens. Dimmable with warm white light.",
    price: 24.98,
    category: "sweatshirts",
    img: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=900&fit=crop",
    createdAt: "2025-03-10T00:00:00Z",
    updatedAt: "2025-03-10T00:00:00Z",
    variants: [
      {
        id: 6,
        productId: 6,
        stripeId: "demo_price_006",
        color: "white",
        sizes: ["S", "M", "L"],
        images: [
          "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=900&fit=crop",
        ],
        createdAt: "2025-03-10T00:00:00Z",
        updatedAt: "2025-03-10T00:00:00Z",
      },
    ],
  },
  {
    id: 7,
    name: "Composite Deck Boards - 16ft",
    description:
      "Capped composite decking with natural wood grain texture. 25-year limited warranty.",
    price: 42.5,
    category: "pants",
    img: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=600&h=900&fit=crop",
    createdAt: "2025-04-01T00:00:00Z",
    updatedAt: "2025-04-01T00:00:00Z",
    variants: [
      {
        id: 7,
        productId: 7,
        stripeId: "demo_price_007",
        color: "brown",
        sizes: ["M", "L"],
        images: [
          "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=600&h=900&fit=crop",
        ],
        createdAt: "2025-04-01T00:00:00Z",
        updatedAt: "2025-04-01T00:00:00Z",
      },
    ],
  },
  {
    id: 8,
    name: "Smart Thermostat with WiFi",
    description:
      "Programmable smart thermostat with built-in WiFi. Voice control via Alexa and Google Assistant.",
    price: 129.99,
    category: "sweatshirts",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=900&fit=crop",
    createdAt: "2025-04-15T00:00:00Z",
    updatedAt: "2025-04-15T00:00:00Z",
    variants: [
      {
        id: 8,
        productId: 8,
        stripeId: "demo_price_008",
        color: "white",
        sizes: ["S"],
        images: [
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=900&fit=crop",
        ],
        createdAt: "2025-04-15T00:00:00Z",
        updatedAt: "2025-04-15T00:00:00Z",
      },
    ],
  },
  {
    id: 9,
    name: "Pressure Washer 3100 PSI",
    description:
      "Gas-powered pressure washer with 3100 PSI and 2.5 GPM. Includes 5 quick-connect nozzle tips.",
    price: 329.0,
    category: "t-shirts",
    img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=900&fit=crop",
    createdAt: "2025-05-01T00:00:00Z",
    updatedAt: "2025-05-01T00:00:00Z",
    variants: [
      {
        id: 9,
        productId: 9,
        stripeId: "demo_price_009",
        color: "black",
        sizes: ["M"],
        images: [
          "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=900&fit=crop",
        ],
        createdAt: "2025-05-01T00:00:00Z",
        updatedAt: "2025-05-01T00:00:00Z",
      },
    ],
  },
  {
    id: 10,
    name: "Vinyl Plank Flooring - 24 sq ft",
    description:
      "Waterproof luxury vinyl plank flooring with realistic wood look. Click-lock installation.",
    price: 52.98,
    category: "pants",
    img: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&h=900&fit=crop",
    createdAt: "2025-05-10T00:00:00Z",
    updatedAt: "2025-05-10T00:00:00Z",
    variants: [
      {
        id: 10,
        productId: 10,
        stripeId: "demo_price_010",
        color: "brown",
        sizes: ["M", "L"],
        images: [
          "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&h=900&fit=crop",
        ],
        createdAt: "2025-05-10T00:00:00Z",
        updatedAt: "2025-05-10T00:00:00Z",
      },
    ],
  },
  {
    id: 11,
    name: "Garage Door Opener with Battery Backup",
    description:
      "Belt-drive garage door opener with integrated battery backup. Ultra-quiet operation.",
    price: 248.0,
    category: "t-shirts",
    img: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&h=900&fit=crop",
    createdAt: "2025-05-20T00:00:00Z",
    updatedAt: "2025-05-20T00:00:00Z",
    variants: [
      {
        id: 11,
        productId: 11,
        stripeId: "demo_price_011",
        color: "silver",
        sizes: ["M"],
        images: [
          "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&h=900&fit=crop",
        ],
        createdAt: "2025-05-20T00:00:00Z",
        updatedAt: "2025-05-20T00:00:00Z",
      },
    ],
  },
  {
    id: 12,
    name: "Outdoor String Lights 48ft",
    description:
      "Commercial-grade outdoor string lights with 15 shatterproof LED bulbs. Weatherproof.",
    price: 34.99,
    category: "sweatshirts",
    img: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=900&fit=crop",
    createdAt: "2025-06-01T00:00:00Z",
    updatedAt: "2025-06-01T00:00:00Z",
    variants: [
      {
        id: 12,
        productId: 12,
        stripeId: "demo_price_012",
        color: "black",
        sizes: ["M", "L"],
        images: [
          "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=900&fit=crop",
        ],
        createdAt: "2025-06-01T00:00:00Z",
        updatedAt: "2025-06-01T00:00:00Z",
      },
    ],
  },
];

/** Demo category mapping for Lowes-style departments */
export const demoCategories = [
  {
    slug: "t-shirts",
    label: "Tools & Hardware",
    description: "Power tools, hand tools, and hardware essentials",
    icon: "wrench",
    image:
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&h=400&fit=crop",
  },
  {
    slug: "pants",
    label: "Lawn & Garden",
    description: "Mowers, outdoor power equipment, and garden supplies",
    icon: "leaf",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop",
  },
  {
    slug: "sweatshirts",
    label: "Lighting & Electrical",
    description: "Indoor/outdoor lighting, smart home, and electrical",
    icon: "lightbulb",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=400&fit=crop",
  },
] as const;

/** Lowes.com nav categories bar */
export const demoNavCategories = [
  { label: "Appliances", slug: "t-shirts" },
  { label: "Bathroom", slug: "sweatshirts" },
  { label: "Building Supplies", slug: "t-shirts" },
  { label: "Doors & Windows", slug: "pants" },
  { label: "Lawn & Garden", slug: "pants" },
  { label: "Outdoor", slug: "pants" },
  { label: "Flooring", slug: "sweatshirts" },
  { label: "Tools", slug: "t-shirts" },
  { label: "Plumbing", slug: "sweatshirts" },
  { label: "Paint", slug: "t-shirts" },
  { label: "Lighting", slug: "sweatshirts" },
  { label: "Spring Trends", slug: "pants" },
] as const;

/** Recommended search pill suggestions */
export const demoSearchSuggestions = [
  "Electric Range",
  "Washing Machine",
  "Bathroom Vanity",
  "Air Compressor",
  "Tool Box",
  "Electric Fireplace",
  "Space Heater",
  "Fire Pit",
  "Garage Door Opener",
  "Storm Door",
  "Vinyl Plank Flooring",
  "Ceiling Fan With Light",
] as const;

/** Deal cards for horizontal strip */
export const demoDealCards = [
  {
    title: "Select Mulch",
    price: "$2",
    unit: "per bag",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    link: "/pants",
  },
  {
    title: "Garden Soil",
    price: "$5",
    unit: "per bag",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop",
    link: "/pants",
  },
  {
    title: "Grass Seed",
    price: "Save up to $20",
    unit: "",
    image:
      "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&h=300&fit=crop",
    link: "/pants",
  },
  {
    title: "Grills & Accessories",
    price: "Up to 30% off",
    unit: "",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
    link: "/t-shirts",
  },
  {
    title: "Outdoor Power",
    price: "Up to 25% off",
    unit: "",
    image:
      "https://images.unsplash.com/photo-1590212151175-e58edd96185b?w=400&h=300&fit=crop",
    link: "/pants",
  },
  {
    title: "Patio Furniture",
    price: "Up to 40% off",
    unit: "",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop",
    link: "/pants",
  },
] as const;

/** Lifestyle content sections matching lowes.com 2-card rows */
export const demoLifestyleSections = [
  {
    heading: "Celebrate Spring With Style",
    cards: [
      {
        title: "Easter Decor",
        description:
          "Find festive florals, pastels and more to brighten your home.",
        image:
          "https://images.unsplash.com/photo-1457530378978-8bac673b8062?w=400&h=300&fit=crop",
        link: "/sweatshirts",
      },
      {
        title: "Hosting Made Easy",
        description: "Refresh your space and get ready to gather.",
        image:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        link: "/t-shirts",
      },
    ],
  },
  {
    heading: "Refresh Your Landscape",
    cards: [
      {
        title: "Lawn Essentials",
        description: "Browse products to tackle your to-do list.",
        image:
          "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&h=300&fit=crop",
        link: "/pants",
      },
      {
        title: "Bountiful Blooms",
        description: "Plant a garden you will enjoy throughout spring.",
        image:
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        link: "/pants",
      },
    ],
  },
  {
    heading: "Explore Favorites",
    cards: [
      {
        title: "Spring Top Sellers",
        description: "Find must-have lawn mowers and more.",
        image:
          "https://images.unsplash.com/photo-1590212151175-e58edd96185b?w=400&h=300&fit=crop",
        link: "/pants",
      },
      {
        title: "DIY Project Picks",
        description:
          "Check out essentials to make the most of the season.",
        image:
          "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=300&fit=crop",
        link: "/t-shirts",
      },
    ],
  },
] as const;

/** Popular categories grid */
export const demoPopularCategories = [
  { label: "Appliances", slug: "t-shirts" },
  { label: "Bathroom", slug: "sweatshirts" },
  { label: "Building Supplies", slug: "t-shirts" },
  { label: "Cleaning Supplies", slug: "t-shirts" },
  { label: "Doors & Windows", slug: "pants" },
  { label: "Electrical", slug: "sweatshirts" },
  { label: "Flooring", slug: "sweatshirts" },
  { label: "Hardware", slug: "t-shirts" },
  { label: "Heating & Cooling", slug: "sweatshirts" },
  { label: "Home Decor", slug: "sweatshirts" },
  { label: "Kitchen", slug: "t-shirts" },
  { label: "Lawn & Garden", slug: "pants" },
  { label: "Lighting & Ceiling Fans", slug: "sweatshirts" },
  { label: "Outdoors", slug: "pants" },
  { label: "Paint", slug: "t-shirts" },
  { label: "Plumbing", slug: "sweatshirts" },
  { label: "Smart Home", slug: "sweatshirts" },
  { label: "Storage & Organization", slug: "t-shirts" },
  { label: "Tools", slug: "t-shirts" },
] as const;
