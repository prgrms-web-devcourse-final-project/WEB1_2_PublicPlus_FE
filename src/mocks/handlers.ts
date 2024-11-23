import { HttpResponse, http } from 'msw';

const facilities = [
  {
    facilityId: '12345',
    facilityName: 'City Gym',
    facilityCategory: 'GYM',
    area: '서울',
    facilityImage: 'https://picsum.photos/200',
    priceType: true,
    location: { latitude: 37.5665, longitude: 126.978 },
    reservationStartDate: '2024-12-01T09:00:00',
    reservationEndDate: '2024-12-31T18:00:00'
  }
];

export const handlers = [
  // 시설 목록
  http.get('/api/facilities', () => {
    return HttpResponse.json(facilities);
  }),

  // 특정 시설의 상세 정보를 반환하는 핸들러
  http.get('/api/facilities/:facilityId', req => {
    const { facilityId } = req.params;

    // 해당 facilityId에 맞는 시설을 찾아 반환
    const facility = facilities.find(
      facility => facility.facilityId === facilityId
    );

    if (facility) {
      return HttpResponse.json(facility);
    } else {
      // 시설을 찾을 수 없을 경우 404 응답
      return HttpResponse.json(
        { error: 'Facility not found' },
        { status: 404 }
      );
    }
  })
];
