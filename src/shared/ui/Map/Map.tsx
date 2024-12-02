import { MapControls } from './MapControls';
import { useMapStore } from '@/features/map/model/store';
import { Filter } from 'lucide-react';
import KakaoMap from './KakaoMap';

interface MapContainerProps {
  latitude: number | undefined;
  longitude: number | undefined;
  name: string | undefined;
}

export function MapContainer({ latitude, longitude, name }: MapContainerProps) {
  const { showControls, toggleControls } = useMapStore();

  return (
    <div className="relative h-full w-full">
      {/* Settings Button - 왼쪽 상단에 고정 */}
      <button
        onClick={toggleControls}
        className="absolute left-4 top-4 z-10 rounded-full bg-white p-2 shadow-lg transition-colors duration-200 hover:bg-gray-50"
        aria-label="설정 열기">
        <Filter className="h-8 w-8 text-gray-600" />
      </button>

      {/* Controls Panel - 버튼 아래에 표시 */}
      {showControls && (
        <div className="absolute left-4 top-16 z-10">
          <MapControls />
        </div>
      )}

      {/* Map Component */}
      <div className="h-full w-full">
        <KakaoMap
          latitude={latitude}
          longitude={longitude}
          name={name}
        />
      </div>
    </div>
  );
}
