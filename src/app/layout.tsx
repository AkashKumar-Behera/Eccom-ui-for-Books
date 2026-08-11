import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const chewy = localFont({
  src: "../../Chewy/Chewy-Regular.ttf",
  variable: "--font-chewy",
});

const genty = localFont({
  src: "../../genty/GentyDemo-Regular.ttf",
  variable: "--font-genty",
});

const lobster = localFont({
  src: "../../lobster/Lobster 1.4.otf",
  variable: "--font-lobster",
});

const moreSugar = localFont({
  src: "../../more_sugar/MoreSugar-Regular.ttf",
  variable: "--font-moresugar",
});

export const metadata: Metadata = {
  title: "The Abbie Store",
  description: "Pinterest Inspired Daily Essentials",
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${chewy.variable} ${genty.variable} ${lobster.variable} ${moreSugar.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

