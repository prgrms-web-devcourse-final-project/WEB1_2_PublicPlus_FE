import { FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  useCreateMeetingBoard,
  useUpdateMeetingBoard,
  useDeleteMeetingBoard
} from '@/features/meeting/model/queries';
import { useMeetingBoardStore } from '../model/store';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button/Button';
import { useToast } from '@/components/common/Toast/Toast';

interface EventFormData {
  mbTitle: string;
  mbContent: string;
  sportType: string;
  mbLocation: string;
  maxParticipants: number;
  mbDate: string;
  mbTime: {
    hour: number;
    minute: number;
  };
}

export const EventForm: FC = () => {
  const { selectedMeeting } = useMeetingBoardStore();
  const { showToast, ToastComponent } = useToast();

  const { register, handleSubmit, reset } = useForm<EventFormData>({
    defaultValues: selectedMeeting
  });

  const createMutation = useCreateMeetingBoard();
  const updateMutation = useUpdateMeetingBoard(selectedMeeting?.mbId);
  const deleteMutation = useDeleteMeetingBoard();

  const onSubmit = (data: EventFormData) => {
    if (!selectedMeeting) {
      createMutation.mutate(data, {
        onSuccess: () => {
          reset();
          showToast({
            message: '모임이 생성되었습니다.',
            type: 'success'
          });
        },
        onError: () => {
          showToast({
            message: '모임 생성에 실패했습니다.',
            type: 'error'
          });
        }
      });
    } else {
      updateMutation.mutate(data, {
        onSuccess: () => {
          reset();
          showToast({
            message: '모임이 수정되었습니다.',
            type: 'success'
          });
        },
        onError: () => {
          showToast({
            message: '모임 수정에 실패했습니다.',
            type: 'error'
          });
        }
      });
    }
  };

  const handleDelete = () => {
    if (selectedMeeting) {
      deleteMutation.mutate(selectedMeeting.mbId, {
        onSuccess: () => {
          reset();
          showToast({
            message: '모임이 삭제되었습니다.',
            type: 'success'
          });
        },
        onError: () => {
          showToast({
            message: '모임 삭제에 실패했습니다.',
            type: 'error'
          });
        }
      });
    }
  };

  return (
    <div className="mx-auto max-w-[425px] rounded-lg bg-white p-4 shadow">
      <h2 className="mb-4 text-lg font-semibold">
        {selectedMeeting ? '모임 수정' : '모임 생성'}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4">
        <Input
          {...register('mbTitle')}
          placeholder="모임 제목"
        />
        <textarea
          {...register('mbContent')}
          placeholder="모임 설명"
          className="w-full rounded border p-2"
        />
        <Input
          {...register('sportType')}
          placeholder="운동 종목"
        />
        <Input
          {...register('mbLocation')}
          placeholder="모임 장소"
        />
        <Input
          {...register('maxParticipants')}
          type="number"
          placeholder="최대 참여 인원"
        />
        <div className="flex gap-2">
          <Button type="submit">{selectedMeeting ? '수정' : '생성'}</Button>
          {selectedMeeting && (
            <Button
              type="button"
              variant="gray"
              onClick={handleDelete}>
              삭제
            </Button>
          )}
        </div>
      </form>
      {ToastComponent}
    </div>
  );
};
