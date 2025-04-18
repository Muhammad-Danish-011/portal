/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Ignore ESLint errors during the build process
    },
    images: {
        domains: ['universalmotorsltd.com'], 
        domains: ['universalmotorstorage.blob.core.windows.net'],
      },
  };
  
  export default nextConfig;
  