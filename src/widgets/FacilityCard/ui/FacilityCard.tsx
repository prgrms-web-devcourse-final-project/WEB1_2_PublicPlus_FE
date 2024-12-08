import { LinkCard } from '@/shared/ui/components/Card/LinkCard';
import { FacilityDetailsResponseDTO } from '@/shared/api/generated';
import { Tag } from '@/shared/ui/components/Tag/Tag';

export const FacilityCard = ({
  facilityImage,
  facilityName,
  priceType,
  facilityCategory,
  reservationType,
  domain,
  facilityId,
  reservationStartDate,
  reservationEndDate
}: FacilityDetailsResponseDTO) => (
  <LinkCard
    imageSrc={facilityImage ?? '/default-image.jpg'}
    imageAlt={facilityName}
    title={facilityName}
    className="min-h-[10rem]"
    content={
      <>
        <div className="mb-2 text-xs text-gray-500">
          예약 방법: {reservationType ?? '온라인 예약'}
        </div>
        <div className="mb-2 text-xs text-gray-500">
          예약 기간: {reservationStartDate} ~ {reservationEndDate}
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">
            {priceType ? '무료' : '유료'} 이용
          </span>
        </div>
      </>
    }
    footer={<Tag label={facilityCategory ?? ''} />}
    domain={domain}
    id={facilityId}
  />
);
