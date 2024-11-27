// 'use client';

// import { useEffect } from 'react';

// interface KakaoMapProps {
//   latitude: number;
//   longitude: number;
//   name: string;
// }

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// export default function KakaoMap({ latitude, longitude, name }: KakaoMapProps) {
//   useEffect(() => {
//     const mapScript = document.createElement('script');
//     mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
//     mapScript.addEventListener('load', onLoadKakaoMap);
//     document.head.appendChild(mapScript);

//     return () => {
//       mapScript.removeEventListener('load', onLoadKakaoMap);
//     };
//   }, [latitude, longitude]);

//   const onLoadKakaoMap = () => {
//     window.kakao.maps.load(() => {
//       const container = document.getElementById('map');
//       const options = {
//         center: new window.kakao.maps.LatLng(latitude, longitude),
//         level: 3
//       };
//       const map = new window.kakao.maps.Map(container, options);

//       // 마커 추가
//       const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
//       const marker = new window.kakao.maps.Marker({
//         position: markerPosition
//       });
//       marker.setMap(map);

//       // 인포윈도우 추가
//       const infowindow = new window.kakao.maps.InfoWindow({
//         content: `<div style="padding:5px;font-size:12px;">${name}</div>`
//       });
//       infowindow.open(map, marker);
//     });
//   };

//   return (
//     <div
//       id="map"
//       className="h-full w-full"
//     />
//   );
// }
