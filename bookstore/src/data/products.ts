export interface Product {
  id: string;
  name: string;
  category: 'Notebooks' | 'Pens & Writing' | 'Planner & Diaries' | 'Art Supplies' | 'Office Accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
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
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pens',
    name: 'Heart & Pastel Gel Pens',
    iconName: 'Feather',
    description: 'Smooth 0.5mm quick-dry gel ink in cute pastel barrels',
    count: 42,
    bgGradient: 'from-[#0284c7]/20 to-[#0c4a6e]/40',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'planners',
    name: 'Cute Planners & Desk Pads',
    iconName: 'Calendar',
    description: 'Undated daily goal setters, habit trackers & desk pads',
    count: 24,
    bgGradient: 'from-[#38bdf8]/20 to-[#7dd3fc]/20',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'art',
    name: 'Kawaii Washi Tapes & Stickers',
    iconName: 'Palette',
    description: 'Floral, pastel gradient & golden foil rice paper tapes',
    count: 56,
    bgGradient: 'from-[#0284c7]/30 to-[#38bdf8]/20',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'office',
    name: 'Aesthetic Desk Decor',
    iconName: 'Briefcase',
    description: 'Heart paper clips, pastel organizers & brass bookends',
    count: 22,
    bgGradient: 'from-[#0c4a6e]/40 to-[#0284c7]/20',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'The Abbie Signature Pastel Teal Spiral Notebook (A5)',
    category: 'Notebooks',
    price: 399,
    originalPrice: 499,
    rating: 4.95,
    reviewsCount: 240,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Signature Edition',
    isBestSeller: true,
    description: 'Our iconic pastel teal spiral notebook featuring cute ribbon bookmark charm, durable metallic coil, and 200 pages of bleed-proof paper.',
    specs: [
      { label: 'Paper Weight', value: '120 GSM Bleed-Proof' },
      { label: 'Binding', value: 'Pastel Teal Metal Spiral' },
      { label: 'Pages', value: '200 Dotted / Lined' },
      { label: 'Cover Material', value: 'Soft-Touch Matte Hardcover' },
    ],
  },
  {
    id: 'prod-2',
    name: 'Pastel Heart Gel Pen Set (6 Pastel Shades)',
    category: 'Pens & Writing',
    price: 249,
    originalPrice: 320,
    rating: 4.9,
    reviewsCount: 185,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    isNew: true,
    description: 'Smooth-flowing 0.5mm Japanese gel pens featuring heart clips and ergonomic soft-touch barrel in soft teal, mint, and lilac.',
    specs: [
      { label: 'Nib Size', value: '0.5mm Fine Precision' },
      { label: 'Ink Type', value: 'Smudge-Free Black Gel Ink' },
      { label: 'Quantity', value: '6 Pens Pack' },
    ],
  },
  {
    id: 'prod-3',
    name: 'Aesthetic Weekly Focus & Habit Tracker Planner Pad',
    category: 'Planner & Diaries',
    price: 299,
    originalPrice: 399,
    rating: 4.85,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
    badge: 'Undated',
    description: 'Designed for gentle productivity. 52 tear-off sheets of weekly spreads, water intake logs, and goal setting sections.',
    specs: [
      { label: 'Sheets', value: '52 Tear-Off Heavyweight Sheets' },
      { label: 'Layout', value: 'Undated Weekly Horizontal' },
      { label: 'Size', value: 'Desk Pad (A4)' },
    ],
  },
  {
    id: 'prod-4',
    name: 'Pastel Dreamscape Washi Tape Roll Box (10 Rolls)',
    category: 'Art Supplies',
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    isBestSeller: true,
    description: 'Decorative rice paper washi tapes with silver foil accents and pastel gradient cloud patterns perfect for bullet journaling.',
    specs: [
      { label: 'Quantity', value: '10 Rolls Box Set' },
      { label: 'Material', value: 'Japanese Fiber Washi Paper' },
      { label: 'Adhesive', value: 'Easy-Peel Non-Damaging' },
    ],
  },
  {
    id: 'prod-5',
    name: 'Gold Heart Paper Clip & Bookmark Organizers (Box of 30)',
    category: 'Office Accessories',
    price: 179,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    description: 'Cute heart-shaped brass binder clips and ribbon page markers housed in a reusable clear acrylic desktop tin.',
    specs: [
      { label: 'Material', value: 'Rust-Proof Plated Steel' },
      { label: 'Shapes', value: 'Hearts, Ribbons & Bows' },
    ],
  },
  {
    id: 'prod-6',
    name: 'Mint & Teal Dual-Tip Aesthetic Highlighters (5 Pack)',
    category: 'Pens & Writing',
    price: 219,
    originalPrice: 280,
    rating: 4.9,
    reviewsCount: 168,
    badge: 'New',
    isNew: true,
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    description: 'No-bleed pastel mild highlighters with chisel and bullet tips for Bible study, notes, and bullet journal decoration.',
    specs: [
      { label: 'Tips', value: 'Dual Chisel (4mm) & Fine (1mm)' },
      { label: 'Colors', value: 'Pastel Teal, Mint, Sage, Cream, Sky' },
    ],
  },
];
