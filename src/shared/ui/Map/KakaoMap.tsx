'use client';
import {
  KakaoType,
  KakaoMapProps,
  KakaoMarker,
  KakaoInfoWindow,
  KakaoCircle,
  CategoryGroupCode,
  PlaceType,
  KakaoMapType,
  KakaoLatLng,
  KakaoPlaces
} from '@/entities/map/model/types';
import { useMapStore } from '@/features/map/model/store';
import { useEffect, useState, useRef, useCallback } from 'react';

declare global {
  interface Window {
    kakao: KakaoType;
  }
}

export default function KakaoMap({
  latitude,
  longitude,
  name,
  options
}: KakaoMapProps) {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [map, setMap] = useState<KakaoMapType | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<KakaoMarker[]>([]);
  const infoWindowsRef = useRef<KakaoInfoWindow[]>([]);
  const circleRef = useRef<KakaoCircle | null>(null);
  const mainMarkerRef = useRef<KakaoMarker | null>(null);

  const {
    showMarkers,
    showInfoWindows,
    showCircle,
    selectedCategories,
    resetState,
    searchRadius,
    mapLevel
  } = useMapStore();

  // 장소 검색 함수
  const searchNearbyPlaces = useCallback(
    (
      places: KakaoPlaces,
      position: KakaoLatLng,
      mapInstance: KakaoMapType,
      category: CategoryGroupCode
    ) => {
      if (!selectedCategories.includes(category)) return;

      const searchOption = {
        location: position,
        radius: searchRadius,
        sort: window.kakao.maps.services.SortBy.DISTANCE
      };

      places.categorySearch(
        category,
        (result: PlaceType[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            result.forEach((place: PlaceType) => {
              const placePosition = new window.kakao.maps.LatLng(
                Number(place.y),
                Number(place.x)
              );
              const marker = new window.kakao.maps.Marker({
                position: placePosition,
                map: showMarkers ? mapInstance : null
              });
              markersRef.current.push(marker);

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `
                <div style="padding:5px;font-size:12px;">
                  <strong>${place.place_name}</strong><br/>
                  <span style="color:#888;font-size:11px;">${place.category_name} (${place.distance}m)</span>
                </div>`
              });
              infoWindowsRef.current.push(infowindow);

              if (showInfoWindows) {
                window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                  infowindow.open(mapInstance, marker);
                });

                window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                  infowindow.close();
                });
              }
            });
          }
        },
        searchOption
      );
    },
    [selectedCategories, showMarkers, showInfoWindows]
  );

  // 지도 초기화 함수
  const initializeMap = useCallback(
    (lat: number, lng: number, mapElement: HTMLDivElement) => {
      if (typeof lat === 'undefined' || typeof lng === 'undefined') return;

      const position = new window.kakao.maps.LatLng(lat, lng);
      const mapInstance = new window.kakao.maps.Map(mapElement, {
        center: position,
        level: options?.level ?? mapLevel
      });

      // 옵션 적용
      if (options?.draggable === false) {
        mapInstance.setDraggable(false);
      }
      if (options?.zoomable === false) {
        mapInstance.setZoomable(false);
      }

      setMap(mapInstance);

      // 메인 마커 생성
      const mainMarker = new window.kakao.maps.Marker({
        position,
        map: mapInstance
      });
      mainMarkerRef.current = mainMarker;
      markersRef.current = [mainMarker];

      // 메인 인포윈도우 생성
      const mainInfowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;font-weight:bold;">${name}</div>`
      });
      mainInfowindow.open(mapInstance, mainMarker);
      infoWindowsRef.current = [mainInfowindow];

      // 반경 원 생성
      const circle = new window.kakao.maps.Circle({
        center: position,
        radius: 500,
        strokeWeight: 1,
        strokeColor: '#00a0e9',
        strokeOpacity: 0.2,
        strokeStyle: 'solid',
        fillColor: '#00a0e9',
        fillOpacity: 0.1
      });
      circle.setMap(mapInstance);
      circleRef.current = circle;
    },
    [name, options]
  );

  // 스크립트 로드
  useEffect(() => {
    const loadKakaoMapScript = () => {
      if (!window.kakao?.maps) {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.onload = () => {
          window.kakao.maps.load(() => setMapLoaded(true));
        };
        document.head.appendChild(script);

        return () => {
          document.head.removeChild(script);
        };
      } else {
        window.kakao.maps.load(() => setMapLoaded(true));
      }
    };

    loadKakaoMapScript();
  }, []);

  // 위치나 이름이 변경될 때 지도 초기화
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !latitude || !longitude) return;

    if (mapRef.current && mapLoaded) {
      // 상태 초기화
      resetState();

      // 기존 마커들 제거
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // 기존 인포윈도우들 제거
      infoWindowsRef.current.forEach(infoWindow => infoWindow.close());
      infoWindowsRef.current = [];

      // 기존 원 제거
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }

      // 지도 다시 초기화
      initializeMap(latitude, longitude, mapRef.current);
    }
  }, [latitude, longitude, name, mapLoaded, resetState, initializeMap]);

  // 선택된 카테고리 변경 시 마커 갱신
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !latitude || !longitude) return;

    if (map && mapLoaded) {
      const position = new window.kakao.maps.LatLng(latitude, longitude);
      const places = new window.kakao.maps.services.Places();

      // 메인 마커 외 모든 마커 제거
      markersRef.current.forEach((marker, index) => {
        if (index !== 0) {
          marker.setMap(null);
        }
      });
      markersRef.current = mainMarkerRef.current ? [mainMarkerRef.current] : [];

      // 메인 인포윈도우 외 모든 인포윈도우 제거
      infoWindowsRef.current.forEach((infoWindow, index) => {
        if (index !== 0) {
          infoWindow.close();
        }
      });
      infoWindowsRef.current = infoWindowsRef.current.slice(0, 1);

      // 선택된 카테고리에 대한 장소 검색
      ['CS2', 'FD6', 'SW8', 'CE7', 'PK6'].forEach(category => {
        searchNearbyPlaces(
          places,
          position,
          map,
          category as CategoryGroupCode
        );
      });
    }
  }, [
    selectedCategories,
    map,
    mapLoaded,
    latitude,
    longitude,
    searchNearbyPlaces
  ]);

  // 마커 표시/숨김 처리
  useEffect(() => {
    markersRef.current.forEach(marker => {
      marker.setMap(showMarkers ? map : null);
    });
  }, [showMarkers, map]);

  // 인포윈도우 표시/숨김 처리
  useEffect(() => {
    const mainInfoWindow = infoWindowsRef.current[0];
    if (!showInfoWindows) {
      infoWindowsRef.current.forEach(infoWindow => {
        infoWindow.close();
      });
    } else if (map && mainMarkerRef.current && mainInfoWindow) {
      mainInfoWindow.open(map, mainMarkerRef.current);
    }
  }, [showInfoWindows, map]);

  // 반경 원 표시/숨김 처리
  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setMap(showCircle ? map : null);
    }
  }, [showCircle, map]);

  if (!latitude || !longitude) {
    return <div>위치 정보가 없습니다.</div>;
  }

  return (
    <div
      ref={mapRef}
      className="h-full w-full"
    />
  );
}
