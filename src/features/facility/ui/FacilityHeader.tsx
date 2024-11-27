import Image from 'next/image';
import { useFacilityStore } from '../model/store';
import { FacilityDetailsResponseDTO } from '@/api/generated';

interface FacilityHeaderProps {
  facility: FacilityDetailsResponseDTO;
}

export const FacilityHeader = ({ facility }: FacilityHeaderProps) => {
  const { isLiked, toggleLike } = useFacilityStore();

  return (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.2rem]">
        <Image
          src={facility.facilityImage}
          alt={facility.facilityName}
          fill
          className="object-cover"
          priority
        />
        <button
          onClick={toggleLike}
          className="absolute right-4 top-4 rounded-full bg-white p-2">
          <Image
            src={isLiked ? '/icons/heart-filled.png' : '/icons/heart.png'}
            alt="좋아요"
            width={24}
            height={24}
          />
        </button>
      </div>

      <div className="bg-white p-4">
        <h1 className="text-xl font-bold">{facility.facilityName}</h1>
        <p className="mt-1 text-blue-500">
          {facility.priceType === false ? '무료' : '유료'}/기본요금
        </p>
        <p className="mt-2 text-gray-600">{facility.facilityLocation}</p>
      </div>
    </>
  );
};
