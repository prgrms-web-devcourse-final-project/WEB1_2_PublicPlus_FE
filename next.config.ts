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

    // stories 관련 모든 파일 제외
    config.module.rules.push({
      test: /\.(stories|story)\.[tj]sx?$/,
      loader: 'ignore-loader'
    });

    // stories 디렉토리 전체 제외
    config.module.rules.push({
      test: /[\\/]stories[\\/]/,
      loader: 'ignore-loader'
    });

    return config;
  },
  typescript: {
    // 빌드 시 타입 체크에서 제외
    ignoreBuildErrors: true
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
    domains: ['picsum.photos', 'placehold.co', 'example.com'], // 허용할 외부 이미지 호스트네임
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      }
    ]
  }
};

export default nextConfig;
