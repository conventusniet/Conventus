/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['randomuser.me', 'unsplash.com', 'images.unsplash.com', 'uifaces.co'],
    },
    webpack: (config, { dev }) => {
      // Disable Webpack disk caching in development to eliminate HMR filesystem lock race conditions
      if (dev) {
        config.cache = false;
      }
      return config;
    },
  }
  
export default nextConfig;
