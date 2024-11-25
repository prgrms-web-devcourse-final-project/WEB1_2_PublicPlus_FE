import { CustomHeader } from '@/components/common/Header/CustomHeader';
import Image from 'next/image';

export default function Login() {
  return (
    <div>
      <CustomHeader
        title="페이지 제목"
        rightButton={{
          icon: '/icons/more.png',
          alt: '추가 옵션'
        }}
      />
      <h2> 로그인</h2>
      <div>
        <Image
          width={90}
          height={50}
          src={'/icons/logo.png'}
          alt="메인 로고"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="아이디를 입력하세요."
        />
        <input
          type="text"
          placeholder="아이디를 입력하세요."
        />
      </div>
    </div>
  );
}
