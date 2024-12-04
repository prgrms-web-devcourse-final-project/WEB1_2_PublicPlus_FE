'use client';
import { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { CustomHeader } from '@/components/common/Header/CustomHeader';
import { EditCard } from '@/components/common/Cards/EditCard';
import { useRouter } from 'next/navigation';
import { useUserQuery } from '@/entities/User/model/userQueries';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/entities/User';

export default function ProfileEditPage() {
  const router = useRouter();
  const { data: userInfo } = useUserQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteUser = async () => {
    const success = await useAuthStore.getState().deleteUser();
    if (success) {
      router.push('/');
      toast.success('회원 탈퇴가 완료되었습니다.');
    } else {
      toast.error(useAuthStore.getState().error || '회원 탈퇴에 실패했습니다.');
    }
  };

  return (
    <>
      <div>
        <CustomHeader />
        <div>
          <div className="flex flex-col space-y-8">
            <EditCard
              title="프로필 사진"
              image={{
                src: userInfo?.profile_image || '/icons/default_user.svg',
                alt: '프로필 이미지'
              }}
              onClick={() => router.push('/profile/edit/profileimage')}
            />
            <EditCard
              title="닉네임"
              description={userInfo?.nickname || '아직 작성되지 않았습니다.'}
              onClick={() => router.push('/profile/edit/nickname')}
            />
            <EditCard
              title="소개글"
              description={userInfo?.description || '아직 작성되지 않았습니다.'}
              onClick={() => router.push('/profile/edit/description')}
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded bg-red-500 p-2 text-white hover:bg-red-600">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="회원 탈퇴 확인"
        message="정말로 회원 탈퇴하시겠습니까?"
        confirmText="탈퇴"
        cancelText="취소"
        onConfirm={handleDeleteUser}
      />
    </>
  );
}
