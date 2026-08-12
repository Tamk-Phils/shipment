import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  transpilePackages: ["leaflet", "react-leaflet"],
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
