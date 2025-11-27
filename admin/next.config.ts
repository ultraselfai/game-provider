import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Define raiz do Turbopack para evitar conflitos
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Configurações para conexão com API backend
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
