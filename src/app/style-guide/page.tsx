import { BottomNav } from '@/components/common/BottomNav'
import { Button } from '@/components/common/Button'
import { Header } from '@/components/common/Header'

export default function StyleGuidePage() {
  return (
    <div className="container mx-auto mb-20 space-y-8 p-6">
      <Header />
      <h1 className="mb-6 text-2xl font-bold">스타일 가이드</h1>
      {/* 색상 팔레트 섹션 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">색상 팔레트</h2>
        <div className="grid grid-cols-3 gap-4 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6">
          <div className="bg-primary p-4 text-white">Primary</div>
          <div className="bg-primary-hover p-4 text-white">Primary Hover</div>
          <div className="bg-secondary p-4 text-white">Secondary</div>
          <div className="bg-success p-4 text-white">Success</div>
          <div className="bg-error p-4 text-white">Error</div>
          <div className="bg-warning p-4 text-white">Warning</div>
        </div>
      </section>
      {/* 반응형 중단점 데모 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">반응형 중단점</h2>
        <div className="w-full bg-gray-200 p-4 text-center xs:bg-gray-300 mobile:bg-gray-400 sm:bg-gray-500 md:bg-gray-600 lg:bg-gray-700 xl:bg-gray-800 2xl:bg-gray-900">
          반응형 중단점 테스트 (화면 크기에 따라 배경색 변경)
        </div>
      </section>
      {/* 기존 버튼 섹션들 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">버튼 variant</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </section>{' '}
      {/* 버튼 사이즈 상세 섹션 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">버튼 size</h2>
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
              variant="secondary">
              Small Secondary
            </Button>
            <Button
              size="sm"
              variant="primary">
              Small Disabled
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
              variant="secondary">
              Medium Secondary
            </Button>
            <Button
              size="md"
              variant="primary">
              Medium Disabled
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
              variant="secondary">
              Large Secondary
            </Button>
            <Button
              size="lg"
              variant="primary">
              Large Disabled
            </Button>
          </div>

          {/* Full Width 버튼 */}
          <div className="space-y-4">
            <Button
              size="sm"
              variant="primary"
              fullWidth>
              Small Full Width Primary
            </Button>
            <Button
              size="md"
              variant="secondary"
              fullWidth>
              Medium Full Width Secondary
            </Button>
            <Button
              size="lg"
              variant="primary"
              fullWidth>
              Large Full Width Primary
            </Button>
          </div>
        </div>
      </section>
      {/* 폰트 크기 데모 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">폰트 크기</h2>
        <div className="space-y-4">
          <p className="text-2xs">2xs: 10px 텍스트</p>
          <p className="text-xs">xs: 12px 텍스트</p>
          <p className="text-sm">sm: 14px 텍스트</p>
          <p className="text-base">base: 16px 텍스트</p>
          <p className="text-lg">lg: 18px 텍스트</p>
          <p className="text-xl">xl: 20px 텍스트</p>
          <p className="text-2xl">2xl: 24px 텍스트</p>
        </div>
      </section>
      {/* 그림자 및 테두리 반경 데모 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">그림자 및 테두리 반경</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-sm bg-white p-4 shadow-sm">Shadow SM</div>
          <div className="rounded bg-white p-4 shadow">Shadow Default</div>
          <div className="rounded-lg bg-white p-4 shadow-md">Shadow MD</div>
          <div className="rounded-xl bg-white p-4 shadow-lg">Shadow LG</div>
        </div>
      </section>
      <BottomNav activeTab="home" />
    </div>
  )
}
