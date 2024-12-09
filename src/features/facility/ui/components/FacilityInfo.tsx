import { useReviews } from '@/features/review/model/queries';
import { FacilityDetailsResponseDTO } from '@/shared/api/generated';
import { MapContainer } from '@/shared/ui/Map/Map';
import { LinkIcon, Phone, Calendar, Users, Globe } from 'lucide-react';
import Link from 'next/link';

export const FacilityInfo = ({
  facility
}: {
  facility: FacilityDetailsResponseDTO;
}) => {
  const { reviews } = useReviews(facility.facilityId);

  if (!reviews?.externalReviews)
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="animate-pulse text-gray-500">리뷰를 불러오는 중...</div>
      </div>
    );

  const reviewsArray = Array.isArray(reviews.externalReviews)
    ? reviews.externalReviews
    : [];

  return (
    <div className="space-y-14 p-4 pb-20 pt-10">
      <div>
        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-800">
          <span
            role="img"
            aria-label="정보">
            ℹ️
          </span>{' '}
          시설 기본 정보
        </h3>
        <div className="divide-y divide-gray-100 text-m">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Globe className="h-5 w-5" />
              <span>제공기관</span>
            </div>
            <span className="font-medium text-gray-900">
              {facility?.facilityName}
            </span>
          </div>

          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-5 w-5" />
              <span>담당자 연락처</span>
            </div>
            <span className="font-medium text-gray-900">
              {facility?.facilityNumber}
            </span>
          </div>

          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>예약 안내</span>
            </div>
            <span className="rounded-full bg-blue-50 px-4 py-1 text-blue-600">
              {facility?.reservationURL ? '인터넷 예약' : '방문 예약'}
            </span>
          </div>

          {facility.reservationURL && (
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center gap-2 text-gray-600">
                <LinkIcon className="h-5 w-5" />
                <span>예약 링크</span>
              </div>
              <Link
                href={facility.reservationURL}
                target="_blank"
                className="flex items-center gap-2 text-blue-500 transition-colors hover:text-blue-600">
                <span className="underline">예약 페이지로 이동</span>
                <LinkIcon className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-5 w-5" />
              <span>이용 대상</span>
            </div>
            <span className="font-medium text-gray-900">전체</span>
          </div>

          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>예약 기간</span>
            </div>
            <span className="font-medium text-gray-900">
              {new Date(facility?.reservationStartDate).toLocaleDateString()} -{' '}
              {new Date(facility?.reservationEndDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-800">
          <span
            role="img"
            aria-label="위치">
            📍
          </span>{' '}
          위치 정보
        </h3>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
          <MapContainer
            latitude={facility.latitude}
            longitude={facility.longitude}
            name={facility.facilityName}
          />
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <span
              role="img"
              aria-label="블로그">
              📝
            </span>{' '}
            블로그 리뷰
          </h3>
          <span className="text-sm text-gray-500">
            {reviewsArray.length}개의 리뷰
          </span>
        </div>
        <div className="pl2 pr2 divide-y divide-gray-100">
          {reviewsArray?.map((review, index) => (
            <Link
              key={index}
              href={review.sourceUrl}
              target="_blank"
              className="group block py-4 transition-colors hover:bg-gray-50">
              <div className="flex flex-col gap-4 pb-4 pt-4">
                <div
                  className="text-lg font-medium text-gray-900"
                  dangerouslySetInnerHTML={{ __html: review.title }}
                />
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <time dateTime={review.createdAt}>
                    {new Date(review.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </Link>
          ))}
          {reviewsArray.length === 0 && (
            <div className="flex h-32 items-center justify-center text-gray-500">
              아직 등록된 블로그 리뷰가 없습니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
