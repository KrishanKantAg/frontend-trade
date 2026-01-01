/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pump.fun', 'bonk.fun', 'bags.fm'],
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-popover', '@radix-ui/react-tooltip', '@radix-ui/react-dialog'],
  },
};

export default nextConfig;

