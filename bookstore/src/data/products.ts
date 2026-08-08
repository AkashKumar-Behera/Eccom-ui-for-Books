export interface Product {
  id: string;
  name: string;
  category: 'Notebooks' | 'Pens & Writing' | 'Planner & Diaries' | 'Art Supplies' | 'Office Accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images?: string[];
  badge?: string;
  description: string;
  specs: { label: string; value: string }[];
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description: string;
  count: number;
  bgGradient: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'notebooks',
    name: 'Spiral & Hardcover Journals',
    iconName: 'BookOpen',
    description: 'Pastel teal covers, ribbon bookmark & 120gsm paper',
    count: 38,
    bgGradient: 'from-[#38bdf8]/20 to-[#0284c7]/30',
    image: '/media/prod_1_img_1.jpg',
  },
  {
    id: 'pens',
    name: 'Heart & Pastel Gel Pens',
    iconName: 'Feather',
    description: 'Smooth 0.5mm quick-dry gel ink in cute pastel barrels',
    count: 42,
    bgGradient: 'from-[#0284c7]/20 to-[#0c4a6e]/40',
    image: '/media/prod_3_img_1.jpg',
  },
  {
    id: 'planners',
    name: 'Cute Planners & Desk Pads',
    iconName: 'Calendar',
    description: 'Undated daily goal setters, habit trackers & desk pads',
    count: 24,
    bgGradient: 'from-[#38bdf8]/20 to-[#7dd3fc]/20',
    image: '/media/prod_2_img_1.jpg',
  },
  {
    id: 'art',
    name: 'Kawaii Washi Tapes & Stickers',
    iconName: 'Palette',
    description: 'Floral, pastel gradient & golden foil rice paper tapes',
    count: 56,
    bgGradient: 'from-[#0284c7]/30 to-[#38bdf8]/20',
    image: '/media/prod_5_img_1.jpg',
  },
  {
    id: 'office',
    name: 'Aesthetic Desk Decor',
    iconName: 'Briefcase',
    description: 'Heart paper clips, pastel organizers & brass bookends',
    count: 22,
    bgGradient: 'from-[#0c4a6e]/40 to-[#0284c7]/20',
    image: '/media/prod_4_img_1.jpg',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "insta-prod-1",
    name: "Pastel Ribbon & Heart Journal (Vol. 1)",
    category: "Notebooks",
    price: 399,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 120,
    image: "/media/prod_1_img_1.jpg",
    images: [
      "/media/prod_1_img_1.jpg",
      "/media/prod_1_img_2.jpg",
      "/media/prod_1_img_3.jpg",
      "/media/prod_1_img_4.jpg"
    ],
    badge: "Signature Edition",
    isBestSeller: true,
    isNew: true,
    description: "Curated aesthetic product directly from our Instagram collection. Features 4 high-quality preview shots.",
    specs: [
      { label: "Collection", value: "Instagram Pastel Goods" },
      { label: "Images Included", value: "4 Carousel Views" },
      { label: "Quality", value: "Premium High-Grade Finish" }
    ]
  },
  {
    id: "insta-prod-2",
    name: "Aesthetic Daily Focus Planner (Vol. 2)",
    category: "Planner & Diaries",
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 135,
    image: "/media/prod_2_img_1.jpg",
    images: [
      "/media/prod_2_img_1.jpg",
      "/media/prod_2_img_2.jpg",
      "/media/prod_2_img_3.jpg",
      "/media/prod_2_img_4.jpg"
    ],
    badge: "Popular",
    description: "Curated aesthetic product directly from our Instagram collection. Features 4 high-quality preview shots.",
    specs: [
      { label: "Collection", value: "Instagram Pastel Goods" },
      { label: "Images Included", value: "4 Carousel Views" },
      { label: "Quality", value: "Premium High-Grade Finish" }
    ]
  },
  {
    id: "insta-prod-3",
    name: "Kawaii Pastel Gel Pen Set (Vol. 3)",
    category: "Pens & Writing",
    price: 249,
    originalPrice: 320,
    rating: 4.9,
    reviewsCount: 150,
    image: "/media/prod_3_img_1.jpg",
    images: [
      "/media/prod_3_img_1.jpg",
      "/media/prod_3_img_2.jpg",
      "/media/prod_3_img_3.jpg",
      "/media/prod_3_img_4.jpg",
      "/media/prod_3_img_5.jpg"
    ],
    badge: "Best Seller",
    isBestSeller: true,
    description: "Curated aesthetic product directly from our Instagram collection. Features 5 high-quality preview shots.",
    specs: [
      { label: "Collection", value: "Instagram Pastel Goods" },
      { label: "Images Included", value: "5 Carousel Views" },
      { label: "Quality", value: "Premium High-Grade Finish" }
    ]
  },
  {
    id: "insta-prod-4",
    name: "Gold Heart Wire Clip Organizers (Vol. 4)",
    category: "Office Accessories",
    price: 179,
    originalPrice: 240,
    rating: 4.9,
    reviewsCount: 165,
    image: "/media/prod_4_img_1.jpg",
    images: [
      "/media/prod_4_img_1.jpg",
      "/media/prod_4_img_2.jpg",
      "/media/prod_4_img_3.jpg",
      "/media/prod_4_img_4.jpg",
      "/media/prod_4_img_5.jpg"
    ],
    badge: "New Arrival",
    isNew: true,
    description: "Curated aesthetic product directly from our Instagram collection. Features 5 high-quality preview shots.",
    specs: [
      { label: "Collection", value: "Instagram Pastel Goods" },
      { label: "Images Included", value: "5 Carousel Views" },
      { label: "Quality", value: "Premium High-Grade Finish" }
    ]
  },
  {
    id: "insta-prod-5",
    name: "Pastel Gradient Washi Tape Collection (Vol. 5)",
    category: "Art Supplies",
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 180,
    image: "/media/prod_5_img_1.jpg",
    images: [
      "/media/prod_5_img_1.jpg",
      "/media/prod_5_img_2.jpg",
      "/media/prod_5_img_3.jpg",
      "/media/prod_5_img_4.jpg"
    ],
    badge: "Instagram Exclusive",
    isBestSeller: true,
    description: "Curated aesthetic product directly from our Instagram collection. Features 4 high-quality preview shots.",
    specs: [
      { label: "Collection", value: "Instagram Pastel Goods" },
      { label: "Images Included", value: "4 Carousel Views" },
      { label: "Quality", value: "Premium High-Grade Finish" }
    ]
  },
  {
    id: "insta-prod-6",
    name: "Cute Ribbon Charm Bookmark Set (Vol. 6)",
    category: "Office Accessories",
    price: 149,
    originalPrice: 199,
    rating: 4.9,
    reviewsCount: 195,
    image: "/media/prod_6_img_1.jpg",
    images: [
      "/media/prod_6_img_1.jpg",
      "/media/prod_6_img_2.jpg",
      "/media/prod_6_img_3.jpg",
      "/media/prod_6_img_4.jpg"
    ],
    badge: "Popular",
    description: "Curated aesthetic product directly from our Instagram collection. Features 4 high-quality preview shots.",
    specs: [
      { label: "Collection", value: "Instagram Pastel Goods" },
      { label: "Images Included", value: "4 Carousel Views" },
      { label: "Quality", value: "Premium High-Grade Finish" }
    ]
  },
  {
    id: "insta-prod-7",
    name: "Soft Cover Bullet Journal (A5) (Vol. 7)",
    category: "Notebooks",
    price: 349,
    originalPrice: 449,
    rating: 4.9,
    reviewsCount: 210,
    image: "/media/prod_7_img_1.jpg",
    images: [
      "/media/prod_7_img_1.jpg",
      "/media/prod_7_img_2.jpg",
      "/media/prod_7_img_3.jpg",
      "/media/prod_7_img_4.jpg"
    ],
    badge: "Signature Edition",
    isBestSeller: true,
    isNew: true,
    description: "Curated aesthetic product directly from our Instagram collection. Features 4 high-quality preview shots.",
    specs: [
      { label: "Collection", value: "Instagram Pastel Goods" },
      { label: "Images Included", value: "4 Carousel Views" },
      { label: "Quality", value: "Premium High-Grade Finish" }
    ]
  },
  {
    id: "insta-prod-8",
    name: "Pastel Mild Highlighters Pack (Vol. 8)",
    category: "Pens & Writing",
    price: 219,
    originalPrice: 280,
    rating: 4.9,
    reviewsCount: 225,
    image: "/media/prod_8_img_1.jpg",
    images: [
      "/media/prod_8_img_1.jpg",
      "/media/prod_8_img_2.jpg"
    ],
    badge: "Popular",
    description: "Curated aesthetic product directly from our Instagram collection. Features 2 high-quality preview shots.",
    specs: [
      { label: "Collection", value: "Instagram Pastel Goods" },
      { label: "Images Included", value: "2 Carousel Views" },
      { label: "Quality", value: "Premium High-Grade Finish" }
    ]
  }
];
