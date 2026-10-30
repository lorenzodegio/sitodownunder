import type { NextConfig } from "next";
import path from "node:path";
import { indexingEnabled } from "./lib/site-url";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["sharp"],
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.private.blob.vercel-storage.com",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/opengraph-image": ["./public/murales/logo-scudo.png", "./public/murales/dirigibile.png"],
    "/menu/opengraph-image": ["./public/murales/logo-scudo.png", "./public/murales/dirigibile.png"],
    "/[slug]/opengraph-image": ["./public/murales/logo-scudo.png", "./public/murales/dirigibile.png"],
  },
  async headers() {
    if (indexingEnabled()) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
