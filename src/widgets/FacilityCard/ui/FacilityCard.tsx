import { LinkCard } from '@/shared/ui/components/Card/LinkCard';
import { FacilityDetailsResponseDTO } from '@/shared/api/generated';
import { Tag } from '@/shared/ui/components/Tag/Tag';
import Image from 'next/image';
const FacilityCategoryLabels = {
  FOOTBALL_FIELD: '축구장',
  FUTSAL_FIELD: '풋살장',
  FOOT_VOLLEYBALL_FIELD: '족구장',
  BASEBALL_FIELD: '야구장',
  TENNIS_FIELD: '테니스장',
  BASKETBALL_FIELD: '농구장',
  VOLLEYBALL_FIELD: '배구장',
  MULTIPURPOSE_FIELD: '다목적구장',
  SPORTS_FIELD: '운동장',
  GYM: '체육관',
  BADMINTON_FIELD: '배드민턴장',
  TABLE_TENNIS_FIELD: '탁구장',
  EDUCATIONAL_FACILITY: '교육시설',
  SWIMMING_POOL: '수영장',
  GOLF_FIELD: '골프장'
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
        <div className="mb-2 text-sm text-gray-500">
          예약 방법: {reservationType ?? '온라인 예약'}
        </div>
        <div className="mb-2 text-sm text-gray-500">
          예약 기간: {reservationStartDate} ~ {reservationEndDate}
        </div>
        <div className="text-base text-gray-500">
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
        <div className="flex gap-2 text-base">
          <Image
            src={'/icons/heart-filled.png'}
            alt="좋아요"
            width={24}
            height={24}
          />
          {likeCoount}
        </div>
        <div className="flex gap-2 text-base">👁️ {viewCoount}</div>
      </div>
    }
    domain={domain}
    id={facilityId}
  />
);
