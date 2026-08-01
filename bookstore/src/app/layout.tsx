import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Abbie Store | Aesthetic Notebooks & Fine Stationery",
  description: "Explore cute spiral notebooks, soft sky blue pens, planner pads & aesthetic desk accessories at The Abbie Store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${outfit.variable} antialiased scroll-smooth`}
    >
      <body suppressHydrationWarning className="bg-white text-[#0c4a6e] font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
