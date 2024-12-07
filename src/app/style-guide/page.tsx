'use client';
import { useState } from 'react';
import Link from 'next/link';
import ColorPalette from '@/components/ColorPalette';
import { Button } from '@/shared/ui/components/button/Button';
import { Card } from '@/components/common/Cards/Card';
import { Header } from '@/widgets/header/ui';
import { SearchBar } from '@/components/common/SearchBar';
import { NotificationItem } from '@/components/common/NotificationItem';
import { Navigation } from '@/components/common/Navigation/Navigation';
import { Loading } from '@/components/common/Loading';
import ErrorMessage from '@/components/common/ErrorMsg';
import { Modal } from '@/shared/ui/components/modal/Modal';

export default function StyleGuidePage() {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto space-y-16 px-4">
      <Header />
      <h1 className="mb-6 text-2xl font-bold">스타일 가이드</h1>

      {/* filter페이지 ---------------------------------------------------- */}
      <section>
        <Link href={'/style-guide/filter'}>
          <Button>필터키워드</Button>
        </Link>
      </section>
      {/* 에러메시지 컴포넌트 ---------------------------------------------------- */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">
          로딩, 에러메시지 컴포넌트
        </h2>
        <div>
          <h3>로딩 컴포넌트 컴포넌트</h3>
          {/* 로딩 컴포넌트 */}
          <div className="space-y-4 p-10 text-center">
            <h1>로딩 컴포넌트</h1>
            <Loading size="sm" />
            <Loading />
            <Loading size="lg" />
          </div>
        </div>
        <div>
          <h3>에러메시지 컴포넌트</h3>
          <ErrorMessage />
          {/* 직접 메시지 전달 */}
          <ErrorMessage message="에러메세지 직접 입력할 경우!" />
        </div>
      </section>
      {/* chat페이지 ---------------------------------------------------- */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">채팅, 토스트컴포넌트</h2>
        <div>
          <Link href={'/style-guide/chat'}>
            <Button>채팅, 토스트 컴포넌트 보러가기~ 클릭</Button>
          </Link>
        </div>
      </section>
      {/* 모달 ---------------------------------------------------- */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">모달컴포넌트</h2>
        <div onClick={() => setIsOpen(true)}>
          <Button>모달 열기</Button>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          message="정말 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={() => {
            // 확인 버튼 클릭 시 실행할 로직
            console.log('confirmed');
          }}
        />
      </section>
      {/* 알림목록 - 알림 항목 컴포넌트 ---------------------------------------------------- */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">알림 항목 컴포넌트</h2>
        <NotificationItem
          message="AB님이 모임 참가 요청을 보냈습니다."
          time="2분 전"
          variant="new"
          onAccept={() => {
            // 수락 처리 로직
            console.log('수락됨');
          }}
        />{' '}
        <NotificationItem
          message="AB님이 모임 참가 요청을 보냈습니다."
          time="2분 전"
          onAccept={() => {
            // 수락 처리 로직
            console.log('수락됨');
          }}
        />
      </section>
      {/* 검색 바 컴포넌트 ---------------------------------------------------- */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">검색 바</h2>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="검색어를 입력하세요"
          className="mx-auto max-w-xl"
        />
      </section>
      {/* 폰트 크기 데모 ---------------------------------------------------- */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">폰트 크기</h2>
        <div className="space-y-4">
          <p className="text-2xs">2xs: 10px 텍스트</p>
          <p className="text-xs">xs: 12px 텍스트</p>
          <p className="text-sm">sm: 14px 텍스트</p>
          <p className="text-m">m: 16px 텍스트</p>
          <p className="text-lg">lg: 18px 텍스트</p>
          <p className="text-xl">xl: 20px 텍스트</p>
          <p className="text-2xl">2xl: 24px 텍스트</p>
        </div>
      </section>
      {/* 그림자 및 테두리 반경 데모 ---------------------------------------------------- */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">그림자 및 테두리 반경</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-sm bg-white p-4 shadow-sm">Shadow SM</div>
          <div className="rounded bg-white p-4 shadow">Shadow Default</div>
          <div className="rounded-lg bg-white p-4 shadow-md">Shadow md</div>
          <div className="rounded-xl bg-white p-4 shadow-lg">Shadow lg</div>
        </div>
      </section>
      {/* 반응형 중단점 데모----------------------------------------------------  */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">반응형 중단점</h2>
        <div className="xl:bg-gray-700 2xl:bg-gray-800 w-full bg-gray-200 p-4 text-center text-gray-50 xs:bg-gray-300 sm:bg-gray-400 md:bg-gray-500 lg:bg-gray-600">
          반응형 중단점 테스트 (화면 크기에 따라 배경색 변경)
        </div>
      </section>
      {/* 버튼 Variants 섹션----------------------------------------------------------------------------------------- */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">버튼 Variants</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button variant="primary">Primary</Button>
            <Button variant="line">line</Button>
            <Button variant="gray">Gray</Button>
            <Button variant="badge">Badge</Button>
          </div>

          {/* Disabled 상태 */}
          <div className="flex items-center space-x-4">
            <Button
              variant="primary"
              disabled>
              Disabled Primary
            </Button>
            <Button
              variant="line"
              disabled>
              Disabled line
            </Button>
            <Button
              variant="gray"
              disabled>
              Disabled Gray
            </Button>
            <Button
              variant="badge"
              disabled>
              Disabled Badge
            </Button>
          </div>
        </div>
      </section>
      {/* 버튼 사이즈 섹션 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">버튼 크기</h2>
        <div className="space-y-4">
          {/* Small 버튼 */}
          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              variant="primary">
              Small Primary
            </Button>
            <Button
              size="sm"
              variant="line">
              Small line
            </Button>
            <Button
              size="sm"
              variant="gray">
              Small Gray
            </Button>
            <Button
              size="sm"
              variant="badge">
              Small Badge
            </Button>
          </div>

          {/* Medium 버튼 */}
          <div className="flex items-center space-x-4">
            <Button
              size="md"
              variant="primary">
              Medium Primary
            </Button>
            <Button
              size="md"
              variant="line">
              Medium line
            </Button>
            <Button
              size="md"
              variant="gray">
              Medium Gray
            </Button>
            <Button
              size="md"
              variant="badge">
              Medium Badge
            </Button>
          </div>

          {/* Large 버튼 */}
          <div className="flex items-center space-x-4">
            <Button
              size="lg"
              variant="primary">
              Large Primary
            </Button>
            <Button
              size="lg"
              variant="line">
              Large line
            </Button>
            <Button
              size="lg"
              variant="gray">
              Large Gray
            </Button>
            <Button
              size="lg"
              variant="badge">
              Large Badge
            </Button>
          </div>
        </div>
      </section>
      {/* Full Width 버튼 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Full Width 버튼</h2>
        <div className="space-y-4">
          <Button
            variant="primary"
            fullWidth>
            Full Width Primary
          </Button>
          <Button
            variant="line"
            fullWidth>
            Full Width line
          </Button>
          <Button
            variant="gray"
            fullWidth>
            Full Width Gray
          </Button>
          <Button
            variant="badge"
            fullWidth>
            Full Width Badge
          </Button>
        </div>
      </section>
      {/* 카드 섹션 추가 ----------------------------------------------------------- */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">기본 카드</h2>
        <Card
          className="mb-8"
          title="카드 제목"
          imageSrc="/jjang.jpeg"
          content={
            <div>
              <p>카드 내용</p>
            </div>
          }
          footer={<div className="text-sm text-gray-500">추가 정보</div>}
        />
        <Card
          className="mb-8"
          title="카드 제목"
          imageSrc="/jjang.jpeg"
          content={
            <div>
              <p>카드 내용</p>
            </div>
          }
          footer={<div className="text-sm text-gray-500">추가 정보</div>}
          color="sky"
        />
        <Card
          className="mb-8"
          title="카드 제목"
          content={
            <div>
              <p>카드 내용</p>
            </div>
          }
          footer={<div className="text-sm text-gray-500">추가 정보</div>}
          color="sky"
        />

        <h2 className="mb-4 text-xl font-semibold">시설 카드</h2>
      </section>
      {/* 색상 팔레트 섹션 -----------------------------------------------------------------------------------*/}
      <section>
        <h2 className="mb-4 text-xl font-semibold">색상 팔레트</h2>
        <ColorPalette />
      </section>
      <Navigation activeTab="home" />
    </div>
  );
}
