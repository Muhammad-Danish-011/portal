/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Ignore ESLint errors during the build process
    },
    images: {
        domains: ['universalmotorsltd.com'], // Add the external domain here
      },
  };
  
  export default nextConfig;
  