import React from 'react';
import { useMapStore } from '@/features/map/model/store';
import { X } from 'lucide-react';
import type { CategoryGroupCode } from '@/entities/map/model/types';

const categoryNames: Record<CategoryGroupCode, string> = {
  CS2: '편의점',
  FD6: '음식점',
  SW8: '지하철역',
  CE7: '카페',
  PK6: '주차장'
};

export function MapControls() {
  const {
    showMarkers,
    showInfoWindows,
    showCircle,
    selectedCategories,
    setShowMarkers,
    setShowInfoWindows,
    setShowCircle,
    toggleControls,
    toggleCategory
  } = useMapStore();

  return (
    <div className="min-w-[200px] rounded-lg bg-white p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium text-gray-800">지도 설정</h3>
        <button
          onClick={toggleControls}
          className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100"
          aria-label="설정 닫기">
          <X className="h-8 w-8 text-gray-600" />
        </button>
      </div>

      <div className="space-y-4">
        {/* 기본 컨트롤 */}
        <div className="flex gap-3 space-y-2">
          <label className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-gray-50">
            <input
              type="checkbox"
              checked={showMarkers}
              onChange={e => setShowMarkers(e.target.checked)}
              className="h-4 w-4 accent-blue-500"
            />
            <span className="text-sm">마커 표시</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-gray-50">
            <input
              type="checkbox"
              checked={showInfoWindows}
              onChange={e => setShowInfoWindows(e.target.checked)}
              className="h-4 w-4 accent-blue-500"
            />
            <span className="text-sm">정보창 표시</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-gray-50">
            <input
              type="checkbox"
              checked={showCircle}
              onChange={e => setShowCircle(e.target.checked)}
              className="h-4 w-4 accent-blue-500"
            />
            <span className="text-sm">반경 표시</span>
          </label>
        </div>

        {/* 카테고리 필터 */}
        <div className="space-y-2">
          <h3 className="border-t pt-2 font-medium text-gray-800">
            카테고리 필터
          </h3>
          <div className="flex gap-3 space-y-2">
            {Object.entries(categoryNames).map(([code, name]) => (
              <label
                key={code}
                className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(
                    code as CategoryGroupCode
                  )}
                  onChange={() => toggleCategory(code as CategoryGroupCode)}
                  className="h-4 w-4 accent-blue-500"
                />
                <span className="text-sm">{name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
