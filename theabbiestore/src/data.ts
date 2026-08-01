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
    image: 'https://instagram.fbom19-5.fna.fbcdn.net/v/t51.82787-15/625621475_17862253272590810_5647431269093544168_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=102&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTg5NzYwNTIxODAzOTMzMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMiJ9&_nc_ohc=xCJC4j79Xs8Q7kNvwFYfsIW&_nc_oc=AdrOCGroKVW689eML3gpOtvQneq0qRFN18eF-ym_f19sONbUEhjjB9A4gGZ5c1ajhhg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-5.fna&_nc_gid=6-JE1F5pyMm-CZI5y_iuGw&_nc_ss=7a22e&oh=00_AQHfJw8rap2qykxeTfkIVciZ8QbNInRcV12n15Uzn0yCkg&oe=6A73CA4C',
    secondaryImages: [
      'https://instagram.fbom19-5.fna.fbcdn.net/v/t51.82787-15/627737623_17862253281590810_5631434812116084639_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=101&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTg5NzYxMzAxOTQxMDg0Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=ZoE49xGPR78Q7kNvwHvK2Qh&_nc_oc=AdpmTdz6I5xu3cBNnj6rmTuMvVwwD9AxQPfauYsAMalgbNG7r9hauduZKE0GtkMNr40&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-5.fna&_nc_gid=6-JE1F5pyMm-CZI5y_iuGw&_nc_ss=7a22e&oh=00_AQFqi95fNl_qFlanoACcsV5flYM1XpyIeICnOBxx4EvjcQ&oe=6A73E486',
      'https://instagram.fbom19-5.fna.fbcdn.net/v/t51.82787-15/625356929_17862253290590810_1587219415984736551_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=101&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTg5NzYxNzIyMjEwNzU3OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=ie8uxI5JT14Q7kNvwHSRKGr&_nc_oc=AdqT8TM_XnJLumQPotTp-AupsVm10skEYVX5m_8Q_7Bt18QAwOeipR-aAgBU5WiQP8g&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-5.fna&_nc_gid=6-JE1F5pyMm-CZI5y_iuGw&_nc_ss=7a22e&oh=00_AQEbFWu6hEdQyb7BHpETB_74ikfylShSMm4_ArJgvo_A-A&oe=6A73CCAB',
      'https://instagram.fbom19-5.fna.fbcdn.net/v/t51.82787-15/627417500_17862253299590810_7038069278508111881_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=109&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTg5NzYyNjQ2NjM1MTA3OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=2AQ0E0QQ_B0Q7kNvwEiXsQL&_nc_oc=AdoJr_8P2LcxWHoiB9GeZB0Fs2Lx62ODPAuQSrFg72-GQxhoejXqz64CegYavGmLE9I&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-5.fna&_nc_gid=6-JE1F5pyMm-CZI5y_iuGw&_nc_ss=7a22e&oh=00_AQHR9EvOK4ibaitnNXVVOAhXf5rAtyHl8h8QW9cFgY_IRw&oe=6A73DA0A'
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
    image: 'https://instagram.fbom19-1.fna.fbcdn.net/v/t51.82787-15/628311828_17862256530590810_6244040957494021077_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=106&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTkwNzIyODgzODc5ODc5NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=-P9Pg7jmk8YQ7kNvwEm-PYP&_nc_oc=AdpxaY-rQivdOBc0dboOefyeGE6Foj4oWK3QRMvl5vYrZ8xvi2jbvjbOdC156rNcV8k&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-1.fna&_nc_gid=PFpG6kRqpF5zVyAdagYQ9Q&_nc_ss=7a22e&oh=00_AQGlIwoEXPymRPvXGQtSm3eOvw-zg-i45dwCGeu3FWsa0g&oe=6A73D7EC',
    secondaryImages: [
      'https://instagram.fbom19-6.fna.fbcdn.net/v/t51.82787-15/625972233_17862256539590810_5127268491952347525_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=104&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTkwNzI0Mjg2NDU5NTk5NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=lg-LGTsXEHMQ7kNvwEs801l&_nc_oc=Adqz4zNXI9UC37lJyTfNkS2K63J6z0nc9bnVJ8p5CZGo2LApzDUJH0d7Xs7WUh2mZI0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-6.fna&_nc_gid=PFpG6kRqpF5zVyAdagYQ9Q&_nc_ss=7a22e&oh=00_AQHhlYRITMdXi9L-XEfY2SS8HE_6CHuY66DVFc3M2p-fGA&oe=6A73EB64',
      'https://instagram.fbom19-5.fna.fbcdn.net/v/t51.82787-15/625477626_17862256551590810_8224212693999825219_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=109&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTkwNzI0OTU4Mzg1MDAwNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=x2JDJM29yvoQ7kNvwFmuPWQ&_nc_oc=AdpZMXYjm96HnqNgfTSMT8c44BPpww12tNww96z9cdg_kLqxa22LnJkgNStBLbTxXoo&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-5.fna&_nc_gid=PFpG6kRqpF5zVyAdagYQ9Q&_nc_ss=7a22e&oh=00_AQHziU9lBdjnQfiSj-tqNULSLNYTyxlubg5K_cD-DdjZsA&oe=6A73E286'
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
    image: 'https://instagram.fbom19-6.fna.fbcdn.net/v/t51.82787-15/625898268_17862260310590810_4575930224234698088_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=102&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTkyMTMwNzE3MTE5OTQ3OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=xq1gOoC2GfAQ7kNvwE5fJHq&_nc_oc=AdoTKwNbCoklQNZy8ceUAkKqIEZsWyMV9ZssEFIrhe5-QveVbDa1EgXv713nnF0CYug&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-6.fna&_nc_gid=m3uI5v8QbvCjaLvxk8vHPg&_nc_ss=7a22e&oh=00_AQE64kWqub84NSxiPXTfx9jgPgKIzxdGUtnksdmv55BqRA&oe=6A73C264',
    secondaryImages: [
      'https://instagram.fbom19-5.fna.fbcdn.net/v/t51.82787-15/627730115_17862260319590810_3615000897983976002_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=100&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTkyMTMxNzA2OTc4MDEyNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=P5YM7HZ8k1wQ7kNvwHXJ_iM&_nc_oc=AdqLxc-mZq6oAemCiRWAxihq2LJcoRJzfSZDutQ4vOURcSjXvmtVlmGm6ZVaR5YFDO0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-5.fna&_nc_gid=m3uI5v8QbvCjaLvxk8vHPg&_nc_ss=7a22e&oh=00_AQFRJkTrS0LxBQRdCJyxcgNkQvqJrXqWQ5sef01yTIsguQ&oe=6A73D457'
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
    image: 'https://instagram.fbom19-3.fna.fbcdn.net/v/t51.82787-15/627966239_17862269091590810_8567845354610703087_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=103&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTk0Nzg3MzMxMzk0MjMzOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=nqvq4MmJpR8Q7kNvwHu6_Ol&_nc_oc=AdouoiyDZgkn43gH69t1GDNsEdCk7tvZ7bnVLKxRnDJRDWpKDvoFAGBU-EEfye7Xbgg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-3.fna&_nc_gid=zvytS2VKG8cVzqHj-8a6Ow&_nc_ss=7a22e&oh=00_AQFBj5aPYRXRn4Krq4oS4Z_koUn7la-ZSlnuzWws0WPU7g&oe=6A73D1EF',
    secondaryImages: [
      'https://instagram.fbom19-5.fna.fbcdn.net/v/t51.82787-15/629814252_17862269124590810_1443656255268157496_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=105&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTk0Nzg5MDA5MTExMDA2Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=oPJ4UCRb35sQ7kNvwHTA-On&_nc_oc=AdrDWycFKHhOFrcn4kEBvK2H_-x7NM4O9e2mffrzC97vz2gOUSC47XU4EAE-EN6Iq9Y&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-5.fna&_nc_gid=zvytS2VKG8cVzqHj-8a6Ow&_nc_ss=7a22e&oh=00_AQFrW3vgba1RCqJm9K3g_jQd9PxsuDq-OPdH0m2c2RQqdA&oe=6A73D7A9'
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
    image: 'https://instagram.fbom19-3.fna.fbcdn.net/v/t51.82787-15/629333268_17862215673590810_4215760498870532126_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=101&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTc0MjE5ODY3OTg3ODIxMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=49JapxO9XF8Q7kNvwH-Cfsq&_nc_oc=Adqxp9x_LRnnZvKUquH-t0Fqcc4690U3WO8ccwqJQJdHaSaJexA7a86PrA8mGVTKCYE&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-3.fna&_nc_gid=As5ANraRs4u1YhJwUBUUFw&_nc_ss=7a22e&oh=00_AQGXF5igOEhkmDckzR7UypGkfYZqfwJKflSwZml1i_u8vg&oe=6A73EEEA',
    secondaryImages: [
      'https://instagram.fbom19-4.fna.fbcdn.net/v/t51.82787-15/627701556_17862215685590810_3452252331768764365_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=107&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTc0MjIwNTQwNzU4NDIxOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=KqBCFXOu-O4Q7kNvwFJK00I&_nc_oc=Adpc4IwST_bGS8e2zRBWMdhvqMyY2Pvj2Bm3BugaGwpUM5S8kOGwfRdmHX5WqueOVhk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-4.fna&_nc_gid=As5ANraRs4u1YhJwUBUUFw&_nc_ss=7a22e&oh=00_AQGBtxtusBgcFhvC0Do7H-3fjSZZ7CD8ZCPcuGZU0Hh6RA&oe=6A73BAFF'
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
    image: 'https://instagram.fbom19-4.fna.fbcdn.net/v/t51.82787-15/627676752_17862214524590810_8097599719746722188_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=105&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTczNDgyNTc3Mjk0Mjg3MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=Dr8hoCdjqPwQ7kNvwE6_hv5&_nc_oc=Adr7iG8fFCukkCqZWhiDy7Br6HnWpt6Qcp-GvmSjgd_8RlGffGeRnb2nI2IHrc4W36Y&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-4.fna&_nc_gid=sh86o12omwXbV6D-xb71PA&_nc_ss=7a22e&oh=00_AQGfHD13E2xjAO8j6WTztIIqPKJVv99IXA6vjvO188frWA&oe=6A73CB76',
    secondaryImages: [
      'https://instagram.fbom19-1.fna.fbcdn.net/v/t51.82787-15/625369481_17862214533590810_6206031122351772976_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=107&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTczNDgzMzkxODI2OTE5MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=kIVdQm_fynIQ7kNvwGPu0M8&_nc_oc=AdrnrF8NT6TZ03Ai9cc2Wv4f2pSVqm45RNdfyOQChlrD9EaTgAMAE2v--IhY4X8S_2A&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-1.fna&_nc_gid=sh86o12omwXbV6D-xb71PA&_nc_ss=7a22e&oh=00_AQF-D7x75xYh2E9R8obO_oZ0job-pblphvxHJ1_Y37oRew&oe=6A73E601'
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
    image: 'https://instagram.fbom19-1.fna.fbcdn.net/v/t51.82787-15/629237339_17862213075590810_7497381242081428804_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=105&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTcyNjA1OTc0NDcxMTMwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=mnNEdRRYkyAQ7kNvwFXOUtX&_nc_oc=AdqJ8pbexK7z69xek7APL8AFrHiiMbbkgFKsINONuXCOvvOdw-P9Y53c6po-glEhOdA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-1.fna&_nc_gid=jdo1pz1F-T7QKkmkVstXOA&_nc_ss=7a22e&oh=00_AQFjXGG25FNzy9FI0rg8dNwdk1vnIjfQqLI3N07t_944bA&oe=6A73D868',
    secondaryImages: [
      'https://instagram.fbom19-4.fna.fbcdn.net/v/t51.82787-15/625427886_17862213087590810_8524968320750957641_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=107&_nc_map=urlgen_bucketless&ig_cache_key=MzgyNTcyNjA2NzUyMDk1NTA1OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=ge6g59LnPIEQ7kNvwFBd9QM&_nc_oc=AdrKcpNynRuCIO59tbevqOozCSQVwWmqW4_fL4vYeC9DBOqnhZqMU48bBF97l-1qjqI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-4.fna&_nc_gid=jdo1pz1F-T7QKkmkVstXOA&_nc_ss=7a22e&oh=00_AQEkgQIttBJgS8ZDl6mc7zBobeRogkZx_Z3cQ2n6w4tglQ&oe=6A73D4D3'
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
    image: 'https://instagram.fbom19-5.fna.fbcdn.net/v/t51.82787-15/610364221_17857655823590810_1958885204373479114_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=111&_nc_map=urlgen_bucketless&ig_cache_key=MzgwMjQwNjgwNjI4MzIxNjE1MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=Wj0ptUK1Ex0Q7kNvwEVrXs4&_nc_oc=Adps5Gt8k_eOE5-hK4YWZsbGBhKx6PeWC4Pu2MrpgBilBQU5fPwwpBX3iiTbrgJpvvU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-5.fna&_nc_gid=fkx8b_0c5qdHZzEgepI-qQ&_nc_ss=7a22e&oh=00_AQH5kxU5RVxMQih2knMJ5ek1dbBiGQGHBXP3VeyAKo572g&oe=6A73C004',
    secondaryImages: [
      'https://instagram.fbom19-1.fna.fbcdn.net/v/t51.82787-15/610489811_17857655832590810_6882085219682459981_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=107&_nc_map=urlgen_bucketless&ig_cache_key=MzgwMjQwNjgwNjMzMzUzMjYxNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=wul9INBx9AoQ7kNvwGlGs5P&_nc_oc=Adq8sJka6X6ZCmmAQnZdvBv-mmbReho0DwxhgMx8eMXvZJP6icJ2SIgR_U_6vYVO55w&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom19-1.fna&_nc_gid=fkx8b_0c5qdHZzEgepI-qQ&_nc_ss=7a22e&oh=00_AQHoXNm_YENnB4FHk913a4_XCAL5kGymGB0jcqr4IsPzTw&oe=6A73C0E3'
    ],
    badge: 'POPULAR',
    isCustomizable: false,
    description: 'Pastel mild highlighters set.',
    features: ['Dual Tip', 'Pastel Colors'],
    inStock: true
  }
];
