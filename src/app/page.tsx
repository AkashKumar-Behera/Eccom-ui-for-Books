import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-zinc-900">
      {/* 1st Div: Top Offers Banner */}
      <div className="w-full bg-[#FCE3E3] text-[#A84242] py-2 px-4 text-center text-sm font-medium tracking-wide">
        Flat 20% OFF Sitewide
      </div>

      {/* 2nd Div: Navigation Bar */}
      <header className="w-full border-b border-pink-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left Menu / Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold tracking-wider text-zinc-700">
            <a href="#" className="bg-[#FCE3E3] text-[#A84242] px-3 py-1.5 rounded transition-all">
              SHOP
            </a>
            <a href="#" className="hover:text-pink-600 transition-colors">
              NEW IN
            </a>
            <a href="#" className="hover:text-[#A84242] transition-colors">
              BESTSELLERS
            </a>
            <a href="#" className="hover:text-[#A84242] transition-colors">
              OUR DIARY
            </a>
          </nav>

          {/* Mobile Hamburger (Visible on small screens) */}
          <button className="md:hidden p-2 text-zinc-700 hover:text-[#A84242]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo Center */}
          <div className="flex-1 md:flex-none text-center">
            <a href="#" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#486B4D] font-serif">
              SHORT<span className="text-[#A84242]">2</span>READ
            </a>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 sm:gap-6 text-zinc-700">
            <button className="hover:text-[#A84242] transition-colors" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="hover:text-[#A84242] transition-colors hidden sm:block" aria-label="User Account">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="hover:text-[#A84242] transition-colors relative" aria-label="Cart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 3rd Div: Hero Banner Section */}
      <section className="relative w-full bg-[#FCE3E3] py-12 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden">
        {/* Dripping / Wave Drip Top Border Effect */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-repeat-x flex justify-around opacity-40">
          <div className="w-full h-3 bg-[#71A866] rounded-b-full"></div>
        </div>

        <div className="max-w-4xl w-full text-center z-10 py-6 sm:py-12 flex flex-col items-center gap-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#5B7950] tracking-tight font-serif drop-shadow-sm">
            Strawberry Matcha
          </h1>
          <p className="text-lg sm:text-2xl font-medium text-[#71A866] tracking-widest uppercase">
            COLLECTION
          </p>

          {/* Offer Pill Button */}
          <div className="mt-4">
            <a
              href="#"
              className="inline-block bg-[#E8737B] hover:bg-[#D65B64] text-white text-lg sm:text-xl font-bold px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Flat 20% Off Sitewide
            </a>
          </div>

          <p className="text-xs sm:text-sm text-[#A84242] italic mt-1">
            *Offer automatically applied at Checkout
          </p>
        </div>
      </section>
    </div>
  );
}

