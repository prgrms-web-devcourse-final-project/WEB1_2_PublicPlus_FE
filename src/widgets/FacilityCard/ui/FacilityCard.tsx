import { LinkCard } from '@/shared/ui/components/card/LinkCard';
import { FacilityDetailsResponseDTO } from '@/shared/api/generated';
import { Tag } from '@/shared/ui/components/tag/Tag';
import Image from 'next/image';
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
export const FacilityCard = ({
  facilityImage,
  facilityName,
  priceType,
  facilityCategory,
  reservationType,
  domain,
  facilityId,
  reservationStartDate,
  reservationEndDate,
  likeCoount,
  viewCoount
}: FacilityDetailsResponseDTO) => (
  <LinkCard
    imageSrc={facilityImage ?? '/default-image.jpg'}
    imageAlt={facilityName}
    title={facilityName}
    className="min-h-[10rem]"
    content={
      <div className="mt-2 flex flex-col gap-2">
        <div className="mb-2 flex gap-2 text-sm text-gray-500">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          예약 방법: {reservationType ?? '온라인 예약'}
        </div>
        <div className="mb-2 flex gap-2 text-sm text-gray-500">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          예약 기간: {reservationStartDate} ~ {reservationEndDate}
        </div>
        <div className="flex gap-2 text-base text-gray-500">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                priceType
                  ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' // 무료 체크 아이콘
                  : 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' // 유료 원 달러 아이콘
              }
            />
          </svg>
          <span className="text-sm font-semibold text-gray-900">
            {priceType ? '무료' : '유료'} 이용
          </span>
        </div>
      </div>
    }
    footer={
      <div className="flex gap-2">
        <Tag
          label={
            facilityCategory
              ? (FacilityCategoryLabels[facilityCategory] ?? '기타')
              : '기타'
          }
          styleName={{
            backgroundColor:
              FacilityCategoryColors[
                facilityCategory as keyof typeof FacilityCategoryColors
              ] ?? '#E5E7EB'
          }}
        />
        <div className="flex items-center gap-2 text-m">
          <Image
            src={'/icons/heart-filled.png'}
            alt="좋아요"
            width={16}
            height={16}
          />
          {likeCoount}
        </div>
        <div className="flex items-center gap-2 text-m">👁️ {viewCoount}</div>
      </div>
    }
    domain={domain}
    id={facilityId}
  />
);
