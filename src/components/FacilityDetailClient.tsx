'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import type { FacilityDetail } from '@/entities/facility/model/types';

export default function FacilityDetailClient() {
  const params = useParams();
  const id = params?.id as string;

  const [facility, setFacility] = useState<FacilityDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFacility = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/facility-details/list/${id}`);
        if (!response.ok) {
          throw new Error('시설을 찾을 수 없습니다.');
        }
        const data: FacilityDetail = await response.json();
        setFacility(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, []); // 컴포넌트 마운트시 한 번만 실행

  if (!id) {
    return <div className="p-4 text-center">잘못된 접근입니다.</div>;
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="animate-pulse">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!facility) {
    return <div className="p-4 text-center">존재하지 않는 시설입니다.</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-2xl font-bold">{facility.facilityName}</h1>
      <div className="grid gap-6">
        <div className="relative aspect-video w-full">
          <Image
            src={facility.facilityImage}
            alt={facility.facilityName}
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <p>
              <span className="font-semibold">카테고리:</span>{' '}
              {facility.facilityCategory}
            </p>
            <p>
              <span className="font-semibold">위치:</span> {facility.area}
            </p>
            <p>
              <span className="font-semibold">가격 유형:</span>{' '}
              {facility.priceType ? '유료' : '무료'}
            </p>
            <p>
              <span className="font-semibold">예약 기간:</span>{' '}
              {new Date(facility.reservationStartDate).toLocaleDateString()} -{' '}
              {new Date(facility.reservationEndDate).toLocaleDateString()}
            </p>
          </div>
          <p>
            <span className="font-semibold">좌표:</span>{' '}
            {facility.location.latitude}, {facility.location.longitude}
          </p>
        </div>
      </div>
    </div>
  );
}
