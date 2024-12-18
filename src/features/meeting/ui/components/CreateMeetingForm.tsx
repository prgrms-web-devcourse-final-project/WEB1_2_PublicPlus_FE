import { useState } from 'react';
import {
  MeetingBoardRequestDTO,
  MeetingBoardRequestDTOSportTypeEnum
} from '@/shared/api/generated';
import { useAuthStore } from '@/entities/User/model/store/authStore';
import { Modal } from '@/shared/ui/components/modal/Modal';

interface CreateMeetingFormProps {
  onSubmit: (data: MeetingBoardRequestDTO) => void;
  isLoading: boolean;
}

export function CreateMeetingForm({
  onSubmit,
  isLoading
}: CreateMeetingFormProps) {
  const [step, setStep] = useState(1);
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: '',
    message: ''
  });

  const [formData, setFormData] = useState<MeetingBoardRequestDTO>({
    sportType: MeetingBoardRequestDTOSportTypeEnum.Soccer,
    mbTitle: '',
    mbContent: '',
    startTime: '',
    endTime: '',
    mbLocation: '',
    maxParticipants: 2,
    openChatLink: ''
  });

  const [dateTime, setDateTime] = useState({
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: ''
  });

  const { userId } = useAuthStore();

  const validateStep1 = () => {
    if (!formData.mbTitle.trim()) {
      setModalInfo({
        isOpen: true,
        title: '제목 오류',
        message: '제목을 입력해주세요'
      });
      return false;
    }

    if (formData.mbTitle.trim().length < 5) {
      setModalInfo({
        isOpen: true,
        title: '제목 오류',
        message: '제목은 5자 이상 입력해주세요'
      });
      return false;
    }

    if (!formData.mbContent.trim()) {
      setModalInfo({
        isOpen: true,
        title: '설명 오류',
        message: '설명을 입력해주세요'
      });
      return false;
    }

    if (formData.mbContent.trim().length < 10) {
      setModalInfo({
        isOpen: true,
        title: '설명 오류',
        message: '설명은 10자 이상 입력해주세요'
      });
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    const currentDate = new Date();
    const startDateTime = new Date(formData.startTime);
    const endDateTime = new Date(formData.endTime);

    if (!dateTime.startDate || !dateTime.startTime) {
      setModalInfo({
        isOpen: true,
        title: '시작 일시 오류',
        message: '시작 일시를 입력해주세요'
      });
      return false;
    }

    if (startDateTime < currentDate) {
      setModalInfo({
        isOpen: true,
        title: '시작 일시 오류',
        message: '시작 일시는 현재 시간 이후여야 합니다'
      });
      return false;
    }

    if (!dateTime.endDate || !dateTime.endTime) {
      setModalInfo({
        isOpen: true,
        title: '종료 일시 오류',
        message: '종료 일시를 입력해주세요'
      });
      return false;
    }

    if (endDateTime <= startDateTime) {
      setModalInfo({
        isOpen: true,
        title: '종료 일시 오류',
        message: '종료 일시는 시작 일시 이후여야 합니다'
      });
      return false;
    }

    if (!formData.mbLocation.trim()) {
      setModalInfo({
        isOpen: true,
        title: '장소 오류',
        message: '모임 장소를 입력해주세요'
      });
      return false;
    }

    if (!formData.openChatLink.trim()) {
      setModalInfo({
        isOpen: true,
        title: '오픈채팅 주소 오류',
        message: '오픈채팅 주소를 입력해주세요'
      });
      return false;
    }

    if (!formData.openChatLink.includes('open.kakao.com')) {
      setModalInfo({
        isOpen: true,
        title: '오픈채팅 주소 오류',
        message: '올바른 카카오톡 오픈채팅 주소를 입력해주세요'
      });
      return false;
    }

    if (formData.maxParticipants < 2) {
      setModalInfo({
        isOpen: true,
        title: '참여 인원 오류',
        message: '참여 인원은 최소 2명 이상이어야 합니다'
      });
      return false;
    }

    if (formData.maxParticipants > 50) {
      setModalInfo({
        isOpen: true,
        title: '참여 인원 오류',
        message: '참여 인원은 최대 50명까지 가능합니다'
      });
      return false;
    }

    return true;
  };

  const handleSportTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      sportType: value as MeetingBoardRequestDTOSportTypeEnum
    }));
  };

  const handleChange = (
    field: keyof Omit<MeetingBoardRequestDTO, 'sportType'>,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateTimeChange = (field: string, value: string) => {
    setDateTime(prev => {
      const newDateTime = { ...prev, [field]: value };

      if (newDateTime.startDate && newDateTime.startTime) {
        const startDateTime = new Date(
          `${newDateTime.startDate}T${newDateTime.startTime}`
        );
        setFormData(prev => ({
          ...prev,
          startTime: startDateTime.toISOString().slice(0, 19).replace('T', ' ')
        }));
      }

      if (newDateTime.endDate && newDateTime.endTime) {
        const endDateTime = new Date(
          `${newDateTime.endDate}T${newDateTime.endTime}`
        );
        setFormData(prev => ({
          ...prev,
          endTime: endDateTime.toISOString().slice(0, 19).replace('T', ' ')
        }));
      }

      return newDateTime;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 3) {
      const submitData: MeetingBoardRequestDTO = {
        ...formData,
        mbTitle: formData.mbTitle.trim(),
        mbContent: formData.mbContent.trim(),
        mbLocation: formData.mbLocation.trim(),
        openChatLink: formData.openChatLink.trim()
      };
      onSubmit(submitData);
    }
  };

  const handleNextOrSubmit = () => {
    let isValid = true;

    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2) {
      isValid = validateStep2();
    }

    if (isValid) {
      if (step < 3) {
        setStep(prev => prev + 1);
      } else {
        // 타입 안전한 가짜 이벤트 객체 생성
        const fakeEvent: React.FormEvent<HTMLFormElement> = {
          nativeEvent: new Event('submit'),
          currentTarget: null,
          target: null,
          bubbles: true,
          cancelable: true,
          defaultPrevented: false,
          eventPhase: 0,
          isTrusted: true,
          preventDefault: () => {},
          isDefaultPrevented: () => false,
          stopPropagation: () => {},
          isPropagationStopped: () => false,
          persist: () => {},
          timeStamp: Date.now(),
          type: 'submit'
        };

        handleSubmit(fakeEvent);
      }
    }
  };

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
        <label className="mb-3 block text-sm font-medium text-gray-700">
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
        <label className="mb-3 block text-sm font-medium text-gray-700">
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
        <label className="mb-3 block text-sm font-medium text-gray-700">
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
        <label className="mb-3 block text-sm font-medium text-gray-700">
          설명
        </label>
        <textarea
          className="min-h-[120px] w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          placeholder="모임에 대해 자세히 설명해주세요."
          value={formData.mbContent}
          onChange={e => handleChange('mbContent', e.target.value)}
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">
          시작 일시
        </label>
        <div className="flex gap-2">
          <input
            type="date"
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            value={dateTime.startDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={e => handleDateTimeChange('startDate', e.target.value)}
            required
          />
          <input
            type="time"
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            value={dateTime.startTime}
            onChange={e => handleDateTimeChange('startTime', e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">
          종료 일시
        </label>
        <div className="flex gap-2">
          <input
            type="date"
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            value={dateTime.endDate}
            min={dateTime.startDate}
            onChange={e => handleDateTimeChange('endDate', e.target.value)}
            required
          />
          <input
            type="time"
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            value={dateTime.endTime}
            onChange={e => handleDateTimeChange('endTime', e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">
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
        <label className="mb-3 block text-sm font-medium text-gray-700">
          참여 인원
        </label>
        <input
          type="number"
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          value={formData.maxParticipants}
          onChange={e =>
            handleChange('maxParticipants', parseInt(e.target.value))
          }
          min="2"
          max="50"
          required
        />
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">
          카카오톡 오픈채팅 주소
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          placeholder="예) https://open.kakao.com/"
          value={formData.openChatLink}
          onChange={e => handleChange('openChatLink', e.target.value)}
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">모임 생성을 확인해주세요.</h3>
      <ul className="space-y-2 text-gray-700">
        <li>• 관리자: {userId}</li>
        <li>• 시작 일시: {formData.startTime}</li>
        <li>• 종료 일시: {formData.endTime}</li>
        <li>• 제목: {formData.mbTitle}</li>
        <li>• 종목: {formData.sportType}</li>
        <li>• 설명: {formData.mbContent}</li>
        <li>• 장소: {formData.mbLocation}</li>
        <li>• 참여 인원: {formData.maxParticipants}명</li>
        <li>• 카카오톡 오픈채팅 주소: {formData.openChatLink}명</li>
      </ul>
    </div>
  );

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

      <Modal
        isOpen={modalInfo.isOpen}
        onClose={() => setModalInfo(prev => ({ ...prev, isOpen: false }))}
        title={modalInfo.title}
        message={modalInfo.message}
        confirmText="확인"
      />
    </div>
  );
}
