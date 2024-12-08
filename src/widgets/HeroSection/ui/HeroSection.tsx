import Image from 'next/image';

export const HeroSection = () => {
  return (
    <div className="relative aspect-[457/200] overflow-hidden rounded-lg bg-blue-500">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-90" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-10 px-4 text-white">
        <Image
          src={'/images/hero-img.png'}
          alt="히어로 이미지"
          layout="fill"
          objectFit="cover"
          className="z-[-1] object-top"
        />
      </div>
    </div>
  );
};
