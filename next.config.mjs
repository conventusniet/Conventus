import next from 'next'

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['randomuser.me', 'unsplash.com', 'images.unsplash.com', 'uifaces.co'],
    },
  }
  
export default nextConfig;
