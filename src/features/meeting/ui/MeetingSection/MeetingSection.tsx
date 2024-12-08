import { ChevronRight } from 'lucide-react';
import MeetingBoardList from '../MeetingList/MeetingList';

export const MeetingSection = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">모임 추천</h2>
        <button className="flex items-center text-blue-500">
          전체 보기
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <MeetingBoardList />
    </div>
  );
};
