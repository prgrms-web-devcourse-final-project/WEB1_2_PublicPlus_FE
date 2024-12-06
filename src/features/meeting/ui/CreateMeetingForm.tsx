import { useState } from 'react';
import {
  MeetingBoardRequestDTO,
  MeetingBoardRequestDTOSportTypeEnum
} from '@/api/generated';
import { TagInput } from '@/widgets/tag-input/TagInput';
import { useAuthStore } from '@/entities/User/model/store/authStore';

interface CreateMeetingFormProps {
  onSubmit: (data: MeetingBoardRequestDTO) => void;
  isLoading: boolean;
}

interface RecurringSchedule {
  type: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  endType: 'date' | 'count' | 'never';
  endDate?: string;
  repeatCount?: number;
}

interface FormDataWithTags extends MeetingBoardRequestDTO {
  tags: string[];
  isTimeFlexible: boolean;
  isRecurring: boolean;
  recurringSchedule: RecurringSchedule | null;
}

export function CreateMeetingForm({
  onSubmit,
  isLoading
}: CreateMeetingFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataWithTags>({
    sportType: MeetingBoardRequestDTOSportTypeEnum.Soccer,
    mbTitle: '',
    mbContent: '',
    mbDate: '',
    mbTime: { hour: 0, minute: 0, second: 0, nano: 0 },
    mbLocation: '',
    maxParticipants: 1,
    mbHost: '',
    tags: [],
    isTimeFlexible: false,
    isRecurring: false,
    recurringSchedule: null
  });
  const { userId } = useAuthStore();

  // 반복 일정 업데이트 함수 추가
  const updateRecurringSchedule = <K extends keyof RecurringSchedule>(
    field: K,
    value: RecurringSchedule[K]
  ) => {
    setFormData((prev: FormDataWithTags) => {
      if (!prev.recurringSchedule) {
        return prev;
      }

      const updatedSchedule: RecurringSchedule = {
        ...prev.recurringSchedule,
        [field]: value
      };

      return {
        ...prev,
        recurringSchedule: updatedSchedule
      };
    });
  };

  // isRecurring 체크박스 핸들러 수정
  const handleRecurringChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      isRecurring: checked,
      recurringSchedule: checked
        ? {
            type: 'weekly' as const,
            endType: 'never' as const,
            endDate: '',
            repeatCount: 1
          }
        : null
    }));
  };

  // sportType 변경 핸들러
  const handleSportTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      sportType: value as MeetingBoardRequestDTOSportTypeEnum
    }));
  };

  // 일반 필드 변경 핸들러
  const handleChange = (
    field: keyof Omit<MeetingBoardRequestDTO, 'sportType' | 'mbTime'>,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 시간 변경 핸들러
  const handleTimeChange = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    setFormData(prev => ({
      ...prev,
      mbTime: {
        hour: parseInt(hours),
        minute: parseInt(minutes),
        second: 0,
        nano: 0
      }
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      const submitData = {
        ...formData,
        mbHost: userId
      };
      onSubmit(submitData);
    }
  };

  const handleNextOrSubmit = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      const submitData = {
        ...formData,
        mbHost: userId
      };
      onSubmit(submitData);
    }
  };

  // const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const renderStepIndicator = () => (
    <div className="mb-8 flex justify-center space-x-4">
      {[1, 2, 3].map(item => (
        <div
          key={item}
          className="flex items-center">
          <div
            className={`rounded-full px-4 py-2 text-sm ${
              step === item
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}>
            STEP {item}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          관리자
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          value={userId}
          readOnly
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          제목
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          placeholder="예) 주말 아침 테니스 한 세트 하실 분!"
          value={formData.mbTitle}
          onChange={e => handleChange('mbTitle', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          종목
        </label>
        <select
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          value={formData.sportType}
          onChange={e => handleSportTypeChange(e.target.value)}>
          <option value={MeetingBoardRequestDTOSportTypeEnum.Tennis}>
            테니스
          </option>
          <option value={MeetingBoardRequestDTOSportTypeEnum.Soccer}>
            축구
          </option>
          <option value={MeetingBoardRequestDTOSportTypeEnum.Baseball}>
            야구
          </option>
          <option value={MeetingBoardRequestDTOSportTypeEnum.Basketball}>
            농구
          </option>
          <option value={MeetingBoardRequestDTOSportTypeEnum.Badminton}>
            배드민턴
          </option>
          <option value={MeetingBoardRequestDTOSportTypeEnum.Swimming}>
            수영
          </option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          설명
        </label>
        <textarea
          className="min-h-[120px] w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          placeholder="모임에 대해 자세히 설명해주세요.
예) 실력 무관, 테니스 라켓 필수입니다.
매너 있는 분들과 즐겁게 운동하고 싶습니다."
          value={formData.mbContent}
          onChange={e => handleChange('mbContent', e.target.value)}
          required
        />
      </div>
    </div>
  );

  const handleTimeFlexibleChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      isTimeFlexible: checked,
      mbTime: checked ? '시간 무관' : prev.mbTime
    }));
  };

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <div className="mb-4">
          <label className="mb-1 flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              className="mr-2"
              checked={formData.isRecurring}
              onChange={e => handleRecurringChange(e.target.checked)}
            />
            반복 일정 설정
          </label>
          {formData.isRecurring && (
            <div className="mt-2 space-y-3 rounded-lg border border-gray-200 p-3">
              <select
                className="w-full rounded-lg border border-gray-300 p-2"
                value={formData.recurringSchedule?.type || 'weekly'}
                onChange={e =>
                  updateRecurringSchedule(
                    'type',
                    e.target.value as RecurringSchedule['type']
                  )
                }>
                <option value="daily">매일</option>
                <option value="weekly">매주</option>
                <option value="biweekly">격주</option>
                <option value="monthly">매월</option>
              </select>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">반복 종료</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="endType"
                      value="date"
                      checked={formData.recurringSchedule?.endType === 'date'}
                      onChange={() =>
                        updateRecurringSchedule('endType', 'date')
                      }
                    />
                    <span className="ml-2">종료일 지정</span>
                  </label>
                  {formData.recurringSchedule?.endType === 'date' && (
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-300 p-2"
                      value={formData.recurringSchedule.endDate || ''}
                      onChange={e =>
                        updateRecurringSchedule('endDate', e.target.value)
                      }
                    />
                  )}

                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="endType"
                      value="count"
                      checked={formData.recurringSchedule?.endType === 'count'}
                      onChange={() =>
                        updateRecurringSchedule('endType', 'count')
                      }
                    />
                    <span className="ml-2">반복 횟수</span>
                  </label>
                  {formData.recurringSchedule?.endType === 'count' && (
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-300 p-2"
                      min="1"
                      max="52"
                      value={formData.recurringSchedule.repeatCount || ''}
                      onChange={e =>
                        updateRecurringSchedule(
                          'repeatCount',
                          parseInt(e.target.value)
                        )
                      }
                    />
                  )}

                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="endType"
                      value="never"
                      checked={formData.recurringSchedule?.endType === 'never'}
                      onChange={() =>
                        updateRecurringSchedule('endType', 'never')
                      }
                    />
                    <span className="ml-2">무기한</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        <input
          type="date"
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          value={formData.mbDate}
          onChange={e => handleChange('mbDate', e.target.value)}
          required
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">시간</label>
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              className="mr-2"
              checked={formData.isTimeFlexible}
              onChange={e => handleTimeFlexibleChange(e.target.checked)}
            />
            시간 무관
          </label>
        </div>
        <input
          type="time"
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          onChange={e => handleTimeChange(e.target.value)}
          disabled={formData.isTimeFlexible}
          required={!formData.isTimeFlexible}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          모임 장소
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          placeholder="예) 보라매 공원 테니스장 1번 코트"
          value={formData.mbLocation}
          onChange={e => handleChange('mbLocation', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          참여 인원
        </label>
        <input
          type="number"
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          value={formData.maxParticipants}
          onChange={e =>
            handleChange('maxParticipants', parseInt(e.target.value))
          }
          min="1"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          모임 관련 태그
        </label>
        <TagInput
          value={formData.tags}
          onChange={tags => setFormData(prev => ({ ...prev, tags }))}
          placeholder="태그 입력 후 Enter (예: 초보환영, 20대)"
          maxTags={5}
        />
      </div>
    </div>
  );

  const renderStep3 = () => {
    // 디버깅용 콘솔 출력
    console.log('반복 일정 데이터:', {
      isRecurring: formData.isRecurring,
      recurringSchedule: formData.recurringSchedule
    });
    console.log('모임 일정 생성 데이터 조회: ', formData);

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">모임 생성을 확인해주세요.</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• 관리자: {userId}</li>
          <li>
            • 일정: {formData.mbDate}{' '}
            {formData.isTimeFlexible
              ? '(시간 무관)'
              : `${formData.mbTime.hour}:${formData.mbTime.minute}`}
          </li>
          {/* 반복 일정 표시 부분 수정 */}
          {formData.isRecurring && formData.recurringSchedule && (
            <li>
              • 반복 설정:{' '}
              {formData.recurringSchedule.type === 'weekly'
                ? '매주'
                : formData.recurringSchedule.type === 'biweekly'
                  ? '격주'
                  : formData.recurringSchedule.type === 'monthly'
                    ? '매월'
                    : ''}{' '}
              반복
              {formData.recurringSchedule.endType === 'date' &&
                formData.recurringSchedule.endDate &&
                ` (${formData.recurringSchedule.endDate}까지)`}
              {formData.recurringSchedule.endType === 'count' &&
                formData.recurringSchedule.repeatCount &&
                ` (총 ${formData.recurringSchedule.repeatCount}회)`}
              {formData.recurringSchedule.endType === 'never' && ' (무기한)'}
            </li>
          )}
          <li>• 제목: {formData.mbTitle}</li>
          <li>• 종목: {formData.sportType}</li>
          <li>• 설명: {formData.mbContent}</li>
          <li>• 장소: {formData.mbLocation}</li>
          <li>• 참여 인원: {formData.maxParticipants}명</li>
          <li>
            • 추가한 태그: {formData.tags.map(tag => `#${tag}`).join(', ')}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-2xl">
      {renderStepIndicator()}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg bg-white p-6 shadow">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
              이전
            </button>
          )}
          <button
            type="button"
            onClick={handleNextOrSubmit}
            disabled={isLoading}
            className="ml-auto rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50">
            {step < 3 ? '다음' : '모임 등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
