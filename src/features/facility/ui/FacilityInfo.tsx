import { FacilityDetailsResponseDTO } from '@/api/generated';
import { LinkCard } from '@/components/common/Cards/LinkCard';
import { MapContainer } from '@/shared/ui/map/Map';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';

export const FacilityInfo = ({
  facility
}: {
  facility: FacilityDetailsResponseDTO;
}) => {
  return (
    <div className="space-y-4 p-4 pb-20">
      <div className="rounded-lg bg-white p-4">
        <h3 className="mb-3 text-lg font-bold">기본 정보</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">제공기관</span>
            <span>{facility?.facilityName}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">담당자 연락처</span>
            <span>{facility?.facilityNumber}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">예약 안내</span>
            <span>
              {facility?.reservationURL ? '인터넷 예약' : '방문 예약'}
            </span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">예약 문의</span>
            <span>
              <Link
                href={facility.reservationURL}
                target="_blank"
                className="flex items-center gap-4">
                <LinkIcon />
                {facility?.reservationURL}
              </Link>
            </span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">이용 대상</span>
            <span>전체</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">예약 기간</span>
            {new Date(
              facility?.reservationStartDate
            ).toLocaleDateString()} -{' '}
            {new Date(facility?.reservationEndDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* 외부 블로그 후기 섹션 */}
      <div className="rounded-lg bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">외부 블로그 후기</h3>
        </div>
        <div className="space-y-3">
          {facility.externalReviews?.map((review, index) => (
            <LinkCard
              key={index}
              title={review.title}
              content={review.content}
              imageSrc={review.thumbnail}
              imageAlt={review.title}
              className="cursor-pointer hover:bg-gray-50"
              url={review.url}
              target={'_blank'}
              footer={review.date}
            />
          ))}
        </div>
      </div>

      {/* 지도 섹션 */}
      <div className="rounded-lg bg-white p-4">
        <h3 className="mb-3 text-lg font-bold">주변 정보 시설</h3>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <MapContainer
            latitude={facility.latitude}
            longitude={facility.longitude}
            name={facility.facilityName}
          />
        </div>
      </div>
    </div>
  );
};
