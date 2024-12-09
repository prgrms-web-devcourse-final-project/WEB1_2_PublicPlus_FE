export const FacilityRules = () => {
  return (
    <div className="space-y-4 pb-10 pt-20">
      <div className="rounded-lg bg-white p-4">
        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-800">
          이용 안내
        </h3>
        <div className="space-y-3 text-sm">
          {/* 이용 규칙 내용 추가 */}
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">운영 시간</span>
            <span>09:00 - 18:00</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">이용 연령</span>
            <span>전체 이용 가능</span>
          </div>
          {/* 추가 규칙들 */}
        </div>
      </div>
    </div>
  );
};
