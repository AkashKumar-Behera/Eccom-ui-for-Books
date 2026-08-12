import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/light.css";
import "../styles/dark.css";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

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
  title: "The Abbie Store - Cute Stationery, Notebooks & Planners",
  description: "The Abbie Store is an e-commerce platform for cute stationery, premium notebooks, weekly planners, and anime goods.",
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
      className={`${chewy.variable} ${genty.variable} ${lobster.variable} ${moreSugar.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
