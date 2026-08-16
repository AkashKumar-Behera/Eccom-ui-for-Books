import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: "https://notebookbyabbie.firebaseapp.com/__/auth/:path*",
      },
      {
        source: "/terms-of-service",
        destination: "/terms-and-conditions",
      },
      {
        source: "/terms",
        destination: "/terms-and-conditions",
      },
    ];
  },
};

export default nextConfig;
