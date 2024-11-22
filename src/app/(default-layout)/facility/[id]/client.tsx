'use client';

import { use, useEffect, useState } from 'react';

interface Facility {
  facilityId: string;
  facilityName: string;
  facilityCategory: string;
  area: string;
  facilityImage: string;
  priceType: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  reservationStartDate: string;
  reservationEndDate: string;
}

interface Props {
  params: {
    id: string;
  };
}

export default function FacilityDetail({ params }: Props) {
  const [facility, setFacility] = useState<Facility | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const unwrappedParams = use(params); // React.use()로 params를 언랩
  const facilityId = unwrappedParams.id; // 이제 정상적으로 접근 가능

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const response = await fetch(`/api/facilities/${facilityId}`);
        if (!response.ok) {
          throw new Error('시설을 찾을 수 없습니다.');
        }
        const data: Facility = await response.json();
        setFacility(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [facilityId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!facility) {
    return <div>존재하지 않는 시설입니다.</div>;
  }

  return (
    <div>
      <h1>{facility.facilityName}</h1>
      <p>카테고리: {facility.facilityCategory}</p>
      <p>위치: {facility.area}</p>
      <img
        src={facility.facilityImage}
        alt={facility.facilityName}
      />
      <p>가격 유형: {facility.priceType ? '유료' : '무료'}</p>
      <p>
        예약 기간:{' '}
        {new Date(facility.reservationStartDate).toLocaleDateString()} -
        {new Date(facility.reservationEndDate).toLocaleDateString()}
      </p>
      <p>
        위치: {facility.location.latitude}, {facility.location.longitude}
      </p>
    </div>
  );
}
