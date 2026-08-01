export interface Product {
  id: string;
  name: string;
  category: 'business-kits' | 'order-books' | 'labels' | 'journals' | 'trackers' | 'stickers';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImages: string[];
  badge?: string;
  isCustomizable: boolean;
  customizationLabel?: string;
  description: string;
  features: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customText?: string;
  fontChoice?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
  addresses: {
    street: string;
    city: string;
    pincode: string;
    state: string;
  }[];
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    name: 'Ultimate Customized Business Starter Kit',
    category: 'business-kits',
    price: 499,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    secondaryImages: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'BESTSELLER ₹499 ONLY',
    isCustomizable: true,
    customizationLabel: 'Enter Your Brand Name / Business Handle',
    description: 'The viral complete business kit designed for small business owners, Instagram shop creators, and entrepreneurs! Includes 1x Gold Foil Order Book, 1x Profit & Sales Tracker, 1x Expense Planner + Free Sticker Sheets.',
    features: ['Customized Brand Cover', '100 GSM Premium Butter-Smooth Paper', 'Twin Ring Wire-O Binding', 'Free Shipping Included'],
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'Delulu Jewels Romanticized Order Book',
    category: 'order-books',
    price: 349,
    originalPrice: 599,
    rating: 4.95,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800',
    secondaryImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'VIRAL REEL PRODUCT',
    isCustomizable: true,
    customizationLabel: 'Enter Custom Title for Cover (e.g. Delulu Jewels)',
    description: 'For the girls who romanticize everything! Keep track of 200+ orders with date, customer handle, order details, tracking number, and payment status.',
    features: ['Soft Pastel Pink / Gold Aesthetic Cover', '200 Pages Order Tracking Layout', 'Compact A5 Size', 'Tear-resistant cover'],
    inStock: true
  },
  {
    id: 'prod-3',
    name: '50 Pcs Customized Name Labels @ ₹149',
    category: 'labels',
    price: 149,
    originalPrice: 299,
    rating: 4.88,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&q=80&w=800',
    secondaryImages: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'SPECIAL DEAL ₹149',
    isCustomizable: true,
    customizationLabel: 'Name, Class/Subject or Brand Handle to print',
    description: 'Waterproof matte-laminated custom name labels for school books, notebooks, jars, and small business branding.',
    features: ['50 Pre-cut Die-cut Stickers', 'Waterproof & Scratch Proof', 'Super Vibrant Pastel Colors', 'Cute Character Accents'],
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'Harry Potter Magical Spiral Journal',
    category: 'journals',
    price: 349,
    originalPrice: 699,
    rating: 5.0,
    reviewsCount: 74,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    secondaryImages: [
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'LIMITED EDITION',
    isCustomizable: true,
    customizationLabel: 'Name for Golden Crest',
    description: 'Enter the Wizarding World! Premium hardbound journal with dark magical aesthetic, gold foil embossing, and ribbon bookmark.',
    features: ['160 Dotted/Ruled Pages', 'Thick 120 GSM Bleed-proof Paper', 'Golden Hogwarts-inspired motif', 'Free Magical Bookmark included'],
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Disney Moana / Princess Aesthetic Journal',
    category: 'journals',
    price: 299,
    originalPrice: 499,
    rating: 4.92,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    secondaryImages: [],
    badge: 'POPULAR',
    isCustomizable: true,
    customizationLabel: 'Name on Cover',
    description: 'Bring tropical sunshine and magic to your daily journal entries or habit tracking.',
    features: ['Vibrant Printed Hardcover', 'Pastel Pink Inner Pages', 'Spiral Bound Flat-Lay Design'],
    inStock: true
  },
  {
    id: 'prod-6',
    name: 'Monthly Sales & Profit Tracker Notebook',
    category: 'trackers',
    price: 249,
    originalPrice: 450,
    rating: 4.85,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    secondaryImages: [],
    badge: 'ESSENTIAL',
    isCustomizable: true,
    customizationLabel: 'Business Name',
    description: 'Track daily sales, expenses, shipping costs, and net monthly profits effortlessly with easy-to-use structured tables.',
    features: ['12 Months Tracking Layout', 'Summary Graphs & Goals Page', 'Glossy Premium Cover'],
    inStock: true
  },
  {
    id: 'prod-7',
    name: 'Cute Aesthetic Thank You Sticker Pack (100 Pcs)',
    category: 'stickers',
    price: 199,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&q=80&w=800',
    secondaryImages: [],
    badge: 'BUSINESS FAVOURITE',
    isCustomizable: true,
    customizationLabel: 'Custom Handle / Message on Sticker',
    description: 'Elevate your packaging! Warm pastel pink & floral thank-you stickers for small business orders.',
    features: ['100 Round Seals (2-inch)', 'Strong Adhesive', 'Glossy UV Coating'],
    inStock: true
  }
];
