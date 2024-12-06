import {
  FacilityDetailsResponseDTO,
  FacilityDetailsResponseDTOFacilityCategoryEnum
} from '@/api/generated';

// 시설 목록 데이터
export const facilities: FacilityDetailsResponseDTO[] = [
  {
    facilityId: 'S210401100008601453',
    facilityName: '마포 난지천 인조잔디축구장',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.FootballField,
    area: '마포구',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationStartDate: '2024-03-01T00:00:00Z',
    reservationEndDate: '2024-12-31T00:00:00Z'
  },
  {
    facilityId: 'S210401100008601454',
    facilityName: '강남 스포츠 센터',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.SwimmingPool,
    area: '강남구',
    priceType: false,
    facilityImage: 'https://picsum.photos/201',
    reservationStartDate: '2024-01-01T00:00:00Z',
    reservationEndDate: '2024-12-31T00:00:00Z'
  },
  {
    facilityId: 'S210401100008601455',
    facilityName: '송파 테니스장',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.TennisField,
    area: '송파구',
    priceType: true,
    facilityImage: 'https://picsum.photos/202',
    reservationStartDate: '2024-02-01T00:00:00Z',
    reservationEndDate: '2024-11-30T00:00:00Z'
  },
  {
    facilityId: 'S210401100008601456',
    facilityName: '종로 배드민턴장',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.BadmintonField,
    area: '종로구',
    priceType: true,
    facilityImage: 'https://picsum.photos/203',
    reservationStartDate: '2024-03-01T00:00:00Z',
    reservationEndDate: '2024-12-31T00:00:00Z'
  },
  {
    facilityId: 'S210401100008601457',
    facilityName: '서초 배드민턴장',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.BadmintonField,
    area: '서초구',
    priceType: false,
    facilityImage: 'https://picsum.photos/204',
    reservationStartDate: '2024-04-01T00:00:00Z',
    reservationEndDate: '2024-11-30T00:00:00Z'
  },
  {
    facilityId: 'S210401100008601458',
    facilityName: '양천 배드민턴장',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.BadmintonField,
    area: '양천구',
    priceType: true,
    facilityImage: 'https://picsum.photos/205',
    reservationStartDate: '2024-01-15T00:00:00Z',
    reservationEndDate: '2024-12-15T00:00:00Z'
  },
  {
    facilityId: 'S210401100008601459',
    facilityName: '은평 배드민턴장',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.BadmintonField,
    area: '은평구',
    priceType: false,
    facilityImage: 'https://picsum.photos/206',
    reservationStartDate: '2024-02-10T00:00:00Z',
    reservationEndDate: '2024-12-10T00:00:00Z'
  },
  {
    facilityId: 'S210401100008601460',
    facilityName: '광진 체육관',
    facilityCategory: FacilityDetailsResponseDTOFacilityCategoryEnum.Gym,
    area: '광진구',
    priceType: true,
    facilityImage: 'https://picsum.photos/207',
    reservationStartDate: '2024-03-01T00:00:00Z',
    reservationEndDate: '2024-12-31T00:00:00Z'
  },
  {
    facilityId: 'S210401100008601461',
    facilityName: '중구 체육관',
    facilityCategory: FacilityDetailsResponseDTOFacilityCategoryEnum.Gym,
    area: '중구',
    priceType: false,
    facilityImage: 'https://picsum.photos/208',
    reservationStartDate: '2024-05-01T00:00:00Z',
    reservationEndDate: '2024-12-31T00:00:00Z'
  },
  {
    facilityId: 'S210401100008601462',
    facilityName: '노원 체육관',
    facilityCategory: FacilityDetailsResponseDTOFacilityCategoryEnum.Gym,
    area: '노원구',
    priceType: true,
    facilityImage: 'https://picsum.photos/209',
    reservationStartDate: '2024-01-01T00:00:00Z',
    reservationEndDate: '2024-12-31T00:00:00Z'
  }
];

// 시설 상세 정보 데이터
export const facilitiesDetail: FacilityDetailsResponseDTO[] = [
  {
    facilityId: 'S210401100008601453',
    facilityName: '마포 난지천 인조잔디축구장',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.FootballField,
    area: '마포구',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationStartDate: '2024-03-01T00:00:00Z',
    reservationEndDate: '2024-12-31T00:00:00Z',
    facilityNumber: '02-3153-9874',
    reservationURL: 'https://example.com/reserve',
    facilityLocation: '서울특별시 마포구',
    facilityDescription: '축구장 설명',
    serviceStartDate: '2024-03-01',
    serviceEndDate: '2024-12-31',
    latitude: 37.51512,
    longitude: 127.07317
  },
  {
    facilityId: 'S210401100008601454',
    facilityName: '강남 스포츠 센터',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.SwimmingPool,
    area: '강남구',
    priceType: false,
    facilityImage: 'https://picsum.photos/201',
    reservationStartDate: '2024-01-01T00:00:00Z',
    reservationEndDate: '2024-12-31T00:00:00Z',
    facilityNumber: '02-3456-7890',
    reservationURL: 'https://example.com/swimming',
    facilityLocation: '서울특별시 강남구',
    facilityDescription: '수영장 설명',
    serviceStartDate: '2024-01-01',
    serviceEndDate: '2024-12-31',
    latitude: 37.4959854,
    longitude: 127.0664091
  },
  {
    facilityId: 'S210401100008601455',
    facilityName: '송파 테니스장',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.TennisField,
    area: '송파구',
    priceType: true,
    facilityImage: 'https://picsum.photos/202',
    reservationStartDate: '2024-02-01T00:00:00Z',
    reservationEndDate: '2024-11-30T00:00:00Z',
    facilityNumber: '02-9876-5432',
    reservationURL: 'https://example.com/tennis',
    facilityLocation: '서울특별시 송파구',
    facilityDescription: '테니스장 설명',
    serviceStartDate: '2024-02-01',
    serviceEndDate: '2024-11-30',
    latitude: 37.5145937,
    longitude: 127.1016857
  },
  {
    facilityId: 'S210401100008601456',
    facilityName: '종로 배드민턴장',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.BadmintonField,
    area: '종로구',
    priceType: true,
    facilityImage: 'https://picsum.photos/203',
    reservationStartDate: '2024-03-01T00:00:00Z',
    reservationEndDate: '2024-12-31T00:00:00Z',
    facilityNumber: '02-1234-5678',
    reservationURL: 'https://example.com/badminton',
    facilityLocation: '서울특별시 종로구',
    facilityDescription: '배드민턴장 설명',
    serviceStartDate: '2024-03-01',
    serviceEndDate: '2024-12-31',
    latitude: 37.5704164,
    longitude: 126.9922784
  },
  {
    facilityId: 'S210401100008601457',
    facilityName: '서초 배드민턴장',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.BadmintonField,
    area: '서초구',
    priceType: false,
    facilityImage: 'https://picsum.photos/204',
    reservationStartDate: '2024-04-01T00:00:00Z',
    reservationEndDate: '2024-11-30T00:00:00Z',
    facilityNumber: '02-9876-1122',
    reservationURL: 'https://example.com/badminton',
    facilityLocation: '서울특별시 서초구',
    facilityDescription: '배드민턴장 설명',
    serviceStartDate: '2024-04-01',
    serviceEndDate: '2024-11-30',
    latitude: 37.4837121,
    longitude: 127.0324112
  },
  {
    facilityId: 'S210401100008601458',
    facilityName: '양천 배드민턴장',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.BadmintonField,
    area: '양천구',
    priceType: true,
    facilityImage: 'https://picsum.photos/205',
    reservationStartDate: '2024-01-15T00:00:00Z',
    reservationEndDate: '2024-12-15T00:00:00Z',
    facilityNumber: '02-2589-3456',
    reservationURL: 'https://example.com/badminton',
    facilityLocation: '서울특별시 양천구',
    facilityDescription: '배드민턴장 설명',
    serviceStartDate: '2024-01-15',
    serviceEndDate: '2024-12-15',
    latitude: 37.5270616,
    longitude: 126.8561534
  },
  {
    facilityId: 'S210401100008601459',
    facilityName: '은평 배드민턴장',
    facilityCategory:
      FacilityDetailsResponseDTOFacilityCategoryEnum.BadmintonField,
    area: '은평구',
    priceType: false,
    facilityImage: 'https://picsum.photos/206',
    reservationStartDate: '2024-02-10T00:00:00Z',
    reservationEndDate: '2024-12-10T00:00:00Z',
    facilityNumber: '02-3456-1122',
    reservationURL: 'https://example.com/badminton',
    facilityLocation: '서울특별시 은평구',
    facilityDescription: '배드민턴장 설명',
    serviceStartDate: '2024-02-10',
    serviceEndDate: '2024-12-10',
    latitude: 37.6026969,
    longitude: 126.9291698
  },
  {
    facilityId: 'S210401100008601460',
    facilityName: '광진 체육관',
    facilityCategory: FacilityDetailsResponseDTOFacilityCategoryEnum.Gym,
    area: '광진구',
    priceType: true,
    facilityImage: 'https://picsum.photos/207',
    reservationStartDate: '2024-03-01T00:00:00Z',
    reservationEndDate: '2024-12-31T00:00:00Z',
    facilityNumber: '02-4789-1122',
    reservationURL: 'https://example.com/gym',
    facilityLocation: '서울특별시 광진구',
    facilityDescription: '체육관 설명',
    serviceStartDate: '2024-03-01',
    serviceEndDate: '2024-12-31',
    latitude: 37.5384843,
    longitude: 127.0822631
  },
  {
    facilityId: 'S210401100008601461',
    facilityName: '중구 체육관',
    facilityCategory: FacilityDetailsResponseDTOFacilityCategoryEnum.Gym,
    area: '중구',
    priceType: false,
    facilityImage: 'https://picsum.photos/208',
    reservationStartDate: '2024-05-01T00:00:00Z',
    reservationEndDate: '2024-12-31T00:00:00Z',
    facilityNumber: '02-4789-1122',
    reservationURL: 'https://example.com/gym',
    facilityLocation: '서울특별시 중구',
    facilityDescription: '체육관 설명',
    serviceStartDate: '2024-03-01',
    serviceEndDate: '2024-12-31',
    latitude: 37.5640907,
    longitude: 126.9975894
  },
  {
    facilityId: 'S210401100008601462',
    facilityName: '노원 체육관',
    facilityCategory: FacilityDetailsResponseDTOFacilityCategoryEnum.Gym,
    area: '노원구',
    priceType: true,
    facilityImage: 'https://picsum.photos/209',
    reservationStartDate: '2024-01-01T00:00:00Z',
    reservationEndDate: '2024-12-31T00:00:00Z',
    facilityNumber: '02-4789-2233',
    reservationURL: 'https://example.com/seoulgym',
    facilityLocation: '서울특별시',
    facilityDescription: '시립 체육관 설명',
    serviceStartDate: '2024-01-01',
    serviceEndDate: '2024-12-31',
    latitude: 37.6541917,
    longitude: 127.0564832
  }
];
