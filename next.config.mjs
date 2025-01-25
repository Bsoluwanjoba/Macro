/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
      },
    transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material']
};

export default nextConfig;
