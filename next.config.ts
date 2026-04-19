import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      // Stock photo sites
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      // Samsung
      { protocol: 'https', hostname: 'images.samsung.com' },
      { protocol: 'https', hostname: 'image-us.samsung.com' },
      // Apple
      { protocol: 'https', hostname: 'store.storeimages.cdn-apple.com' },
      { protocol: 'https', hostname: 'www.apple.com' },
      // Sony
      { protocol: 'https', hostname: 'www.sony.com' },
      { protocol: 'https', hostname: 'electronics.sony.com' },
      // Dell
      { protocol: 'https', hostname: 'i.dell.com' },
      { protocol: 'https', hostname: 'www.dell.com' },
      // HP
      { protocol: 'https', hostname: 'ssl-product-images.www8.hp.com' },
      { protocol: 'https', hostname: 'www.hp.com' },
      // Lenovo
      { protocol: 'https', hostname: 'www.lenovo.com' },
      // Amazon / CDN
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
      { protocol: 'https', hostname: 'images-eu.ssl-images-amazon.com' },
      // Google / Pixel
      { protocol: 'https', hostname: 'store.google.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      // Microsoft / Surface
      { protocol: 'https', hostname: 'img-prod-cms-rt-microsoft-com.akamaized.net' },
      { protocol: 'https', hostname: 'www.microsoft.com' },
      // Asus
      { protocol: 'https', hostname: 'www.asus.com' },
      // Razer
      { protocol: 'https', hostname: 'assets2.razerzone.com' },
      // CDN hosts commonly used by retailers & product databases
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'imgur.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      // Catch-all wildcard for any subdomain on common CDN domains
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: '**.akamaized.net' },
      { protocol: 'https', hostname: '**.cloudfront.net' },
      { protocol: 'https', hostname: '**.amazonaws.com' },
    ],
  },
};

export default nextConfig;
