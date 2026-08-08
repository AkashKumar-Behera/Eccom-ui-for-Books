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
    id: 'insta-prod-1',
    name: 'Pastel Ribbon & Heart Journal (Vol. 1)',
    category: 'journals',
    price: 399,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 120,
    image: '/media/prod_1_img_1.jpg',
    secondaryImages: [
      '/media/prod_1_img_2.jpg',
      '/media/prod_1_img_3.jpg',
      '/media/prod_1_img_4.jpg'
    ],
    badge: 'BESTSELLER',
    isCustomizable: true,
    customizationLabel: 'Enter Your Name for Cover',
    description: 'Curated aesthetic product directly from our Instagram collection. Features 4 high-quality preview shots.',
    features: ['Customized Brand Cover', '100 GSM Premium Paper', 'Twin Ring Wire-O Binding'],
    inStock: true
  },
  {
    id: 'insta-prod-2',
    name: 'Aesthetic Daily Focus Planner (Vol. 2)',
    category: 'trackers',
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 135,
    image: '/media/prod_2_img_1.jpg',
    secondaryImages: [
      '/media/prod_2_img_2.jpg',
      '/media/prod_2_img_3.jpg',
      '/media/prod_2_img_4.jpg'
    ],
    badge: 'POPULAR',
    isCustomizable: true,
    customizationLabel: 'Enter Title',
    description: 'Curated aesthetic product directly from our Instagram collection.',
    features: ['Undated Layout', 'Habit Tracker', 'Daily Goals'],
    inStock: true
  },
  {
    id: 'insta-prod-3',
    name: 'Kawaii Pastel Gel Pen Set (Vol. 3)',
    category: 'labels',
    price: 249,
    originalPrice: 320,
    rating: 4.9,
    reviewsCount: 150,
    image: '/media/prod_3_img_1.jpg',
    secondaryImages: [
      '/media/prod_3_img_2.jpg',
      '/media/prod_3_img_3.jpg',
      '/media/prod_3_img_4.jpg',
      '/media/prod_3_img_5.jpg'
    ],
    badge: 'NEW ARRIVAL',
    isCustomizable: false,
    description: 'Smooth-flowing 0.5mm gel pens in soft pastel colors.',
    features: ['0.5mm Fine Precision', 'Smudge-Free Gel Ink'],
    inStock: true
  },
  {
    id: 'insta-prod-4',
    name: 'Gold Heart Wire Clip Organizers (Vol. 4)',
    category: 'business-kits',
    price: 179,
    originalPrice: 240,
    rating: 4.9,
    reviewsCount: 165,
    image: '/media/prod_4_img_1.jpg',
    secondaryImages: [
      '/media/prod_4_img_2.jpg',
      '/media/prod_4_img_3.jpg',
      '/media/prod_4_img_4.jpg',
      '/media/prod_4_img_5.jpg'
    ],
    badge: 'VIRAL PRODUCT',
    isCustomizable: false,
    description: 'Cute heart-shaped brass binder clips and ribbon page markers.',
    features: ['Rust-Proof Plated Steel', 'Heart & Bow Shapes'],
    inStock: true
  },
  {
    id: 'insta-prod-5',
    name: 'Pastel Gradient Washi Tape Collection (Vol. 5)',
    category: 'stickers',
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 180,
    image: '/media/prod_5_img_1.jpg',
    secondaryImages: [
      '/media/prod_5_img_2.jpg',
      '/media/prod_5_img_3.jpg',
      '/media/prod_5_img_4.jpg'
    ],
    badge: 'NEW ARRIVAL',
    isCustomizable: false,
    description: 'Pastel gradient washi tape set for journal decoration.',
    features: ['10 Rolls Set', 'Silver Foil Accents'],
    inStock: true
  },
  {
    id: 'insta-prod-6',
    name: 'Cute Ribbon Charm Bookmark Set (Vol. 6)',
    category: 'order-books',
    price: 149,
    originalPrice: 199,
    rating: 4.9,
    reviewsCount: 195,
    image: '/media/prod_6_img_1.jpg',
    secondaryImages: [
      '/media/prod_6_img_2.jpg',
      '/media/prod_6_img_3.jpg',
      '/media/prod_6_img_4.jpg'
    ],
    badge: 'POPULAR',
    isCustomizable: false,
    description: 'Ribbon bookmarks & clip set.',
    features: ['Pastel Ribbons', 'Gold Plated Clip'],
    inStock: true
  },
  {
    id: 'insta-prod-7',
    name: 'Soft Cover Bullet Journal (A5) (Vol. 7)',
    category: 'journals',
    price: 349,
    originalPrice: 449,
    rating: 4.9,
    reviewsCount: 210,
    image: '/media/prod_7_img_1.jpg',
    secondaryImages: [
      '/media/prod_7_img_2.jpg',
      '/media/prod_7_img_3.jpg',
      '/media/prod_7_img_4.jpg'
    ],
    badge: 'BESTSELLER',
    isCustomizable: true,
    customizationLabel: 'Name on Cover',
    description: 'A5 soft cover bullet journal.',
    features: ['120 GSM Bleed Proof Paper', '200 Pages'],
    inStock: true
  },
  {
    id: 'insta-prod-8',
    name: 'Pastel Mild Highlighters Pack (Vol. 8)',
    category: 'labels',
    price: 219,
    originalPrice: 280,
    rating: 4.9,
    reviewsCount: 225,
    image: '/media/prod_8_img_1.jpg',
    secondaryImages: [
      '/media/prod_8_img_2.jpg'
    ],
    badge: 'POPULAR',
    isCustomizable: false,
    description: 'Pastel mild highlighters set.',
    features: ['Dual Tip', 'Pastel Colors'],
    inStock: true
  }
];
