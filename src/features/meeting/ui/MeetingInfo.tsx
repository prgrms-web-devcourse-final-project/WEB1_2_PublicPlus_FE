interface MeetingInfoProps {
  meeting: Meeting;
}

export function MeetingInfo({ meeting }: MeetingInfoProps) {
  return (
    <div className="space-y-6 p-4">
      <section>
        <h2 className="mb-2 text-lg font-semibold">모임 일정</h2>
        <div className="rounded-lg bg-gray-50 p-4">
          <p>
            {meeting.mbDate}
            {meeting.recurringSchedule
              ? ` ~ ${meeting.recurringSchedule.endDate}`
              : ''}
          </p>
          {!meeting.isTimeFlexible && (
            <p>{`${meeting.mbTime.hour}:${meeting.mbTime.minute}`}</p>
          )}
          {meeting.recurringSchedule && (
            <p className="text-blue-600">
              {meeting.recurringSchedule.type === 'weekly' && '매주'}
              {meeting.recurringSchedule.type === 'biweekly' && '격주'}
              {meeting.recurringSchedule.type === 'monthly' && '매월'} 반복
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold">모임 장소</h2>
        <div className="rounded-lg bg-gray-50 p-4">
          <p>{meeting.mbLocation}</p>
          {/* 지도 컴포넌트 추가 가능 */}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold">상세 설명</h2>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="whitespace-pre-line">{meeting.mbContent}</p>
        </div>
      </section>

      {meeting.tags?.length > 0 && (
        <section>
          <h2 className="mb-2 text-lg font-semibold">태그</h2>
          <div className="flex flex-wrap gap-2">
            {meeting.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
