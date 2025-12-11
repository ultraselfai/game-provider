import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Output standalone para Docker
  output: 'standalone',

  // Define raiz do Turbopack para evitar conflitos
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Configuração de imagens para standalone/Docker
  images: {
    unoptimized: true,
  },

  // Configurações para conexão com API backend
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    return [
      {
        source: '/api/backend/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
