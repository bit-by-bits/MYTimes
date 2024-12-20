import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com",
      "private-avatars.githubusercontent.com"
    ]
  }
};

export default nextConfig;
