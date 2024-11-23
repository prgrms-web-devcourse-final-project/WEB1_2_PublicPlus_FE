'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Facility {
  facilityId: number;
  facilityName: string;
}

export default function Facility() {
  const [facilities, setFacilities] = useState<Facility[]>([]);

  useEffect(() => {
    fetch('/api/facilities')
      .then(response => response.json())
      .then(data => setFacilities(data))
      .catch(error => console.error('API 요청 오류:', error));
  }, []);
  console.log('data: ', facilities);
  return (
    <div>
      <h1>공공 체육 시설 목록</h1>
      {facilities.length === 0 ? (
        <p>시설 목록을 불러오는 중입니다...</p>
      ) : (
        facilities.map(facility => (
          <div key={facility.facilityId}>
            <Link href={`/facility/${facility.facilityId}`}>
              {facility.facilityName}
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
