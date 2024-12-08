import Image from 'next/image';
import { useFacilityStore } from '../../model/store';
import { FacilityDetailsResponseDTO } from '@/shared/api/generated';
import { useAddLike, useRemoveLike } from '../../like/model/queries';
import { useAuthStore } from '@/entities/user';
import { useEffect } from 'react';

interface FacilityHeaderProps {
  facility: FacilityDetailsResponseDTO;
}

export const FacilityHeader = ({ facility }: FacilityHeaderProps) => {
  const { isLiked, getLikeCount, toggleLike, initializeLike, revertLikeState } =
    useFacilityStore();
  const { tokens } = useAuthStore();

  useEffect(() => {
    if (facility.facilityId) {
      initializeLike(facility.facilityId, {
        isLiked: facility.liked,
        count: facility.likeCount
      });
    }
  }, [facility, initializeLike]);

  const addLikeMutation = useAddLike(tokens?.access_token ?? '');
  const removeLikeMutation = useRemoveLike(tokens?.access_token ?? '');

  const facilityId = facility.facilityId;
  const facilityIsLiked = facilityId ? isLiked(facilityId) : false;
  const likeCount = facilityId ? getLikeCount(facilityId) : 0;

  const defaultImage = '/images/default-facility.jpg';

  const handleLikeToggle = async () => {
    if (!facilityId) return;

    const mutation = facilityIsLiked ? removeLikeMutation : addLikeMutation;

    // 낙관적 업데이트
    toggleLike(facilityId);

    mutation.mutate(facilityId, {
      onError: error => {
        revertLikeState(facilityId);
        console.error(
          `Error ${facilityIsLiked ? 'removing' : 'adding'} like:`,
          error
        );
      }
    });
  };

  return (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.2rem]">
        <Image
          src={facility.facilityImage || defaultImage}
          alt={facility.facilityName || '시설 이미지'}
          fill
          className="object-cover"
          priority
        />
        {facilityId && (
          <div className="absolute right-4 top-4 flex flex-col items-center gap-1">
            <button
              onClick={handleLikeToggle}
              className={`rounded-full bg-white p-2 ${
                facilityIsLiked ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={facilityIsLiked}>
              <Image
                src={
                  facilityIsLiked
                    ? '/icons/heart-filled.png'
                    : '/icons/heart.png'
                }
                alt="좋아요"
                width={24}
                height={24}
              />
            </button>
            <span className="text-sm font-medium text-white">{likeCount}</span>
          </div>
        )}
      </div>
      <div className="bg-white p-4">
        <div className="mb-4">
          <span className="inline-block rounded bg-blue-100 px-2 py-1 text-sm text-blue-600">
            {facility.facilityCategory || '카테고리 없음'}
          </span>
        </div>
        <h1 className="mb-2 text-xl font-bold">
          {facility.facilityName || '이름 없음'}
        </h1>
        <p className="mt-1 text-blue-500">
          {facility.priceType === false ? '무료' : '유료'} 이용
        </p>
        <p className="mt-2 text-gray-600">
          {facility.facilityLocation || '위치 정보 없음'}
        </p>
      </div>
    </>
  );
};
