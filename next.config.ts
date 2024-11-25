import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: config => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      dns: false,
      tls: false,
      assert: false
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*'
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/mockServiceWorker.js',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/'
          }
        ]
      }
    ];
  },
  images: {
    domains: ['picsum.photos', 'placehold.co', 'example.com'] // 허용할 외부 이미지 호스트네임
  }
};

export default nextConfig;
