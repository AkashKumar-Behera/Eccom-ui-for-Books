import { useState, useMemo } from 'react';
import { PRODUCTS_DATA } from './data';
import type { Product, CartItem, UserProfile } from './data';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { Sparkles, CheckCircle2, MessageCircle, Camera as Instagram } from 'lucide-react';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals state
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [authOpen, setAuthOpen] = useState<boolean>(false);
  
  // User state
  const [user, setUser] = useState<UserProfile>({
    name: 'Akash Sharma',
    email: 'akash@example.com',
    phone: '+91 9876543210',
    isLoggedIn: false,
    addresses: [{ street: '24, Rosewood Colony', city: 'Bengaluru', pincode: '560038', state: 'Karnataka' }]
  });

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS_DATA[0], quantity: 1, customText: 'Delulu Jewels' }
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-3']);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => 
      prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]
    );
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, customText?: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.customText === customText);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.customText === customText
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, customText }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleLogin = (name: string, email: string, phone: string) => {
    setUser(prev => ({
      ...prev,
      name,
      email,
      phone,
      isLoggedIn: true
    }));
  };

  const handleLogout = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans selection:bg-pink-200 selection:text-pink-900">
      
      {/* Aesthetic Header */}
      <Navbar
        cartItems={cartItems}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setSelectedCategory('all')}
        onOpenAuthModal={() => setAuthOpen(true)}
        userLoggedIn={user.isLoggedIn}
        userName={user.name}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* Hero Banner Section */}
      {selectedCategory === 'all' && !searchQuery && (
        <HeroBanner 
          onExploreClick={() => {
            const el = document.getElementById('shop-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectProduct={(p) => setSelectedProductModal(p)}
        />
      )}

      {/* Main Shop Catalog Container */}
      <main id="shop-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
              {selectedCategory === 'all' ? '✨ Complete Collection' : selectedCategory.replace('-', ' ')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-aesthetic text-pink-950">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Handcrafted Customized Stationery'}
            </h2>
          </div>

          <span className="text-xs font-semibold text-gray-500 bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100 self-start">
            Showing {filteredProducts.length} aesthetic item(s)
          </span>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-pink-100 p-8">
            <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">No matching products found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try searching for "Business Kit", "Harry Potter", or "Labels" to explore our viral products!
            </p>
            <button 
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-5 py-2 bg-pink-500 text-white font-bold text-xs rounded-full shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setSelectedProductModal(p)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {/* Instagram Reel Embed Feed Section */}
        <section className="pt-12 border-t border-pink-200/60">
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-bold">
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>@theabbiestore.in</span>
            </div>
            <h3 className="text-2xl font-bold font-serif-aesthetic text-pink-950">
              Follow Us On Instagram
            </h3>
            <p className="text-xs text-gray-500">
              Tag us in your unboxing reels to get featured on our page!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: 'Pastel Ribbon & Heart Journal', img: PRODUCTS_DATA[0]?.image || '', tag: 'Vol. 1' },
              { title: 'Aesthetic Daily Focus Planner', img: PRODUCTS_DATA[1]?.image || '', tag: 'Vol. 2' },
              { title: 'Kawaii Pastel Gel Pen Set', img: PRODUCTS_DATA[2]?.image || '', tag: 'Vol. 3' },
              { title: 'Gold Heart Wire Clip Organizers', img: PRODUCTS_DATA[3]?.image || '', tag: 'Vol. 4' }
            ].map((feed, i) => (
              <a 
                key={i} 
                href="https://www.instagram.com/theabbiestore.in?igsh=cWxqMDc4OHYzbmtv" 
                target="_blank" 
                rel="noreferrer"
                className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm border border-pink-100"
              >
                <img src={feed.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white text-xs">
                  <span className="font-bold text-amber-300 text-[10px]">{feed.tag}</span>
                  <p className="font-semibold">{feed.title}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

      </main>

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/919876543210?text=Hi%20The%20Abbie%20Store!%20I%20want%20to%20place%20a%20custom%20order."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group transition-all transform hover:scale-105"
        title="Direct WhatsApp Order"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-bold whitespace-nowrap pr-1">
          WhatsApp Order Help
        </span>
      </a>

      {/* Aesthetic Footer */}
      <footer className="bg-pink-950 text-pink-100 pt-12 pb-8 border-t border-pink-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          
          {/* Col 1 Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 text-white font-bold flex items-center justify-center text-base">
                A
              </div>
              <span className="font-bold font-serif-aesthetic text-lg text-white">The Abbie Store</span>
            </div>
            <p className="text-pink-200/80 leading-relaxed">
              India's favorite aesthetic customized stationery store. Order books, profit trackers, name labels & theme journals.
            </p>
          </div>

          {/* Col 2 Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Categories</h4>
            <ul className="space-y-1.5 text-pink-200/80">
              <li><button onClick={() => setSelectedCategory('business-kits')} className="hover:text-pink-300">Customized Business Kits</button></li>
              <li><button onClick={() => setSelectedCategory('order-books')} className="hover:text-pink-300">Delulu Order Books</button></li>
              <li><button onClick={() => setSelectedCategory('labels')} className="hover:text-pink-300">50 Name Labels @ ₹149</button></li>
              <li><button onClick={() => setSelectedCategory('journals')} className="hover:text-pink-300">Harry Potter & Disney Journals</button></li>
            </ul>
          </div>

          {/* Col 3 Payment & Shipping */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">WhatsApp Payment</h4>
            <p className="text-pink-200/80">
              Direct payment via UPI (GPay, PhonePe, Paytm, QR Code) managed seamlessly over WhatsApp after cart review.
            </p>
            <div className="flex items-center gap-2 pt-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Safe WhatsApp Orders</span>
            </div>
          </div>

          {/* Col 4 Social */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Instagram</h4>
            <a 
              href="https://www.instagram.com/theabbiestore.in?igsh=cWxqMDc4OHYzbmtv" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-pink-900/80 hover:bg-pink-900 text-pink-200 px-4 py-2 rounded-xl border border-pink-800 transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>@theabbiestore.in</span>
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-pink-900/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-pink-300/70">
          <p>© 2026 The Abbie Store. Handcrafted for Creators & Dreamers.</p>
          <p>Designed with ❤️ for High-Converting Aesthetic E-Commerce</p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProductModal}
        isOpen={!!selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProductModal ? wishlist.includes(selectedProductModal.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

    </div>
  );
}
export default App;
