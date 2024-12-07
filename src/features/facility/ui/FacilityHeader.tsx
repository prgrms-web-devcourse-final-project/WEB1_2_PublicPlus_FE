import Image from 'next/image';
import { useFacilityStore } from '../model/store';
import { FacilityDetailsResponseDTO } from '@/api/generated';
import { useAddLike, useRemoveLike } from '../like/model/queries';
import { useAuthStore } from '@/entities/User';

interface FacilityHeaderProps {
  facility: FacilityDetailsResponseDTO & {
    tags: [];
  };
}

export const FacilityHeader = ({ facility }: FacilityHeaderProps) => {
  // 좋아요 상태와 토글 함수는 useFacilityStore에서 관리
  const { isLiked, toggleLike } = useFacilityStore();

  // 토큰은 useAuthStore에서 가져옵니다.
  const { tokens } = useAuthStore();

  // 좋아요 추가/취소 훅을 사용
  const addLikeMutation = useAddLike(tokens?.access_token ?? '');
  const removeLikeMutation = useRemoveLike(tokens?.access_token ?? '');

  const handleLikeToggle = async () => {
    if (isLiked) {
      // 좋아요 취소
      removeLikeMutation.mutate(facility.facilityId, {
        onSuccess: () => {
          toggleLike(false); // 상태 업데이트
        },
        onError: error => console.error('Error removing like:', error)
      });
    } else {
      // 좋아요 추가
      addLikeMutation.mutate(facility.facilityId, {
        onSuccess: () => {
          toggleLike(true); // 상태 업데이트
        },
        onError: error => console.error('Error adding like:', error)
      });
    }
  };

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
          onClick={handleLikeToggle}
          className="absolute right-4 top-4 rounded-full bg-white p-2"
          disabled={addLikeMutation.isLoading || removeLikeMutation.isLoading} // 로딩 중 비활성화
        >
          <Image
            src={isLiked ? '/icons/heart-filled.png' : '/icons/heart.png'}
            alt="좋아요"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="bg-white p-4">
        <div className="mb-4">
          <span className="inline-block rounded bg-blue-100 px-2 py-1 text-sm text-blue-600">
            {facility.facilityCategory}
          </span>
        </div>
        <h1 className="mb-2 text-xl font-bold">{facility.facilityName}</h1>
        <p className="mt-1 text-blue-500">
          {facility.priceType === false ? '무료' : '유료'} 이용
        </p>
        <p className="mt-2 text-gray-600">{facility.facilityLocation}</p>
      </div>
    </>
  );
};
