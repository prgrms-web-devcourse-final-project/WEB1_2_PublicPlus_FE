import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['picsum.photos'] // 허용할 외부 이미지 호스트네임
  }
};

export default nextConfig;
