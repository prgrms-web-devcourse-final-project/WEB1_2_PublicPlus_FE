import ColorPalette from '@/components/ColorPalette';
import { BottomNav } from '@/components/common/BottomNav';
import { Button } from '@/components/common/Button';
import { Header } from '@/components/common/Header';

export default function StyleGuidePage() {
  return (
    <div className="container mx-auto my-20 space-y-8 p-6">
      <Header />
      <h1 className="mb-6 text-2xl font-bold">스타일 가이드</h1>
      {/* 색상 팔레트 섹션 -----------------------------------------------------------------------------------*/}
      <section>
        <h2 className="mb-4 text-xl font-semibold">색상 팔레트</h2>
        <ColorPalette />
      </section>

      {/* 반응형 중단점 데모--------------------------------------------------------------------------------- */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">반응형 중단점</h2>
        <div className="w-full bg-gray-200 p-4 text-center text-gray-50 xs:bg-gray-300 mobile:bg-gray-400 sm:bg-gray-500 md:bg-gray-600 lg:bg-gray-700 xl:bg-gray-800 2xl:bg-gray-900">
          반응형 중단점 테스트 (화면 크기에 따라 배경색 변경)
        </div>
      </section>
      <h1 className="mb-6 text-2xl font-bold">스타일 가이드</h1>

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

      {/* 폰트 크기 데모 ----------------------------------------------------------------------*/}
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
      {/* 그림자 및 테두리 반경 데모 ----------------------------------------------------------*/}
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
  );
}
