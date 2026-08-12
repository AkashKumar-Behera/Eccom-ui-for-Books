import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center bg-[var(--bg-primary)] text-[var(--text-primary)] font-moresugar">
      {/* Official Brand Logo */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-4 transition-transform hover:scale-105">
        <Image
          src="/logo.png"
          alt="The Abbie Store Logo"
          fill
          sizes="(max-width: 640px) 112px, 144px"
          className="object-contain"
          priority
        />
      </div>

      <h1 className="text-7xl sm:text-8xl font-black text-[var(--text-brand)] tracking-tight mb-1">
        404
      </h1>

      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
        Oops! Page Not Found
      </h2>

      <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md mb-8 font-sans">
        The cute stationery or page you are looking for might have been moved or doesn't exist anymore.
      </p>

      <Link
        href="/"
        className="px-8 py-3.5 bg-[var(--btn-shop)] text-[var(--btn-shop-text)] hover:bg-[var(--btn-shop-hover)] font-bold rounded-2xl shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  );
}
