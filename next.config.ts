import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_KAKAO_MAP_API_KEY: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY
  },
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

    // Kakao Maps 스크립트를 로드하기 위한 설정
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
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
    domains: [
      'picsum.photos',
      'placehold.co',
      'example.com',
      'yeyak.seoul.go.kr',
      '4gbw.org',
      'yongsanyouth.or.kr',
      'localhost'
    ], // 허용할 외부 이미지 호스트네임
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/_next/image/**'
      },
      {
        protocol: 'http',
        hostname: '15.165.2.3',
        port: '8080',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: '43.203.132.45',
        port: '8080',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
