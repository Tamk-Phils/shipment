import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  transpilePackages: ["leaflet", "react-leaflet"],
  experimental: {
    serverComponentsExternalPackages: ["nodemailer"],
  },
};

export default nextConfig;
