interface RecurringSchedule {
  type: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  endType: 'date' | 'count' | 'never';
  endDate?: string;
  repeatCount?: number;
}

interface Meeting {
  mbId: number;
  mbDate: string;
  mbTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  isRecurring: boolean;
  recurringSchedule?: RecurringSchedule;
  [key: string]: any;
}

export function generateRecurringDates(meeting: Meeting) {
  if (!meeting.isRecurring || !meeting.recurringSchedule) {
    return [meeting];
  }

  const events = [];
  const startDate = new Date(meeting.mbDate);
  const { type, endType, endDate, repeatCount } = meeting.recurringSchedule;

  let currentDate = new Date(startDate);
  let count = 0;

  // 종료 조건 설정
  const shouldContinue = () => {
    if (endType === 'count' && repeatCount) {
      return count < repeatCount;
    }
    if (endType === 'date' && endDate) {
      return currentDate <= new Date(endDate);
    }
    if (endType === 'never') {
      // Daily 일정은 최대 30일, 나머지는 1년으로 제한
      return type === 'daily' ? count < 30 : count < 52;
    }
    return false;
  };

  // 반복 간격 설정
  const getNextDate = (date: Date) => {
    const next = new Date(date);
    switch (type) {
      case 'daily':
        next.setDate(date.getDate() + 1);
        break;
      case 'weekly':
        next.setDate(date.getDate() + 7);
        break;
      case 'biweekly':
        next.setDate(date.getDate() + 14);
        break;
      case 'monthly':
        next.setMonth(date.getMonth() + 1);
        break;
    }
    return next;
  };

  do {
    const formattedDate = currentDate.toISOString().split('T')[0];
    events.push({
      ...meeting,
      mbDate: formattedDate,
      isRecurringInstance: true,
      recurringParentId: meeting.mbId,
      instanceCount: count + 1
    });

    currentDate = getNextDate(currentDate);
    count++;
  } while (shouldContinue());

  return events;
}
