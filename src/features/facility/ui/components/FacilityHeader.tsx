import Image from 'next/image';
import { useFacilityStore } from '../../model/store';
import { FacilityDetailsResponseDTO } from '@/shared/api/generated';
import { useAddLike, useRemoveLike } from '../../like/model/queries';
import { useAuthStore } from '@/entities/User';
import { useEffect } from 'react';
import { Tag } from '@/shared/ui/components/tag/Tag';

interface FacilityHeaderProps {
  facility: FacilityDetailsResponseDTO;
}

const FacilityCategoryLabels = {
  FOOTBALL_FIELD: '⚽ 축구장',
  FUTSAL_FIELD: '⚽ 풋살장',
  FOOT_VOLLEYBALL_FIELD: '🏐 족구장',
  BASEBALL_FIELD: '⚾ 야구장',
  TENNIS_FIELD: '🎾 테니스장',
  BASKETBALL_FIELD: '🏀 농구장',
  VOLLEYBALL_FIELD: '🏐 배구장',
  MULTIPURPOSE_FIELD: '🎯 다목적구장',
  SPORTS_FIELD: '🏃 운동장',
  GYM: '🏋️‍♂️ 체육관',
  BADMINTON_FIELD: '🏸 배드민턴장',
  TABLE_TENNIS_FIELD: '🏓 탁구장',
  EDUCATIONAL_FACILITY: '📚 교육시설',
  SWIMMING_POOL: '🏊‍♂️ 수영장',
  GOLF_FIELD: '⛳ 골프장'
};
const FacilityCategoryColors = {
  FOOTBALL_FIELD: '#10B981',
  FUTSAL_FIELD: '#34D399',
  FOOT_VOLLEYBALL_FIELD: '#6EE7B7',
  BASEBALL_FIELD: '#FDE047',
  TENNIS_FIELD: '#84CC16',
  BASKETBALL_FIELD: '#F97316',
  VOLLEYBALL_FIELD: '#FB923C',
  MULTIPURPOSE_FIELD: '#E879F9',
  SPORTS_FIELD: '#A78BFA',
  GYM: '#C084FC',
  BADMINTON_FIELD: '#A7F3D0',
  TABLE_TENNIS_FIELD: '#99F6E4',
  EDUCATIONAL_FACILITY: '#D1D5DB',
  SWIMMING_POOL: '#60A5FA',
  GOLF_FIELD: '#4ADE80'
};
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
    <div>
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
            <button onClick={handleLikeToggle}>
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
            <div
              style={{
                borderRadius: '5px',
                padding: '0px',
                width: '28px',
                height: '20px',
                textAlign: 'center'
              }}
              className="flex h-6 w-auto items-center justify-center rounded bg-white p-2">
              {likeCount}
            </div>
          </div>
        )}
      </div>
      <div className="bg-white p-4">
        <div className="mb-4">
          <Tag
            label={
              facility.facilityCategory
                ? (FacilityCategoryLabels[facility.facilityCategory] ?? '기타')
                : '기타'
            }
            styleName={{
              backgroundColor:
                FacilityCategoryColors[
                  facility.facilityCategory as keyof typeof FacilityCategoryColors
                ] ?? '#E5E7EB'
            }}
          />
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
    </div>
  );
};
