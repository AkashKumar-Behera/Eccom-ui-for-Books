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
  }
];
