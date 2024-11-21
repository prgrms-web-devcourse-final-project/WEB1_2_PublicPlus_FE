import { BottomNav } from '@/components/common/BottomNav'
import { Button } from '@/components/common/Button'
import { Header } from '@/components/common/Header'

export default function StyleGuidePage() {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <Header />

      <h1 className="mb-6 text-2xl font-bold">버튼 스타일 가이드</h1>

      {/* 버튼 종류 섹션 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">버튼 variant</h2>
        <div className="flex space-x-4">
          <Button variant="primary">Accept</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </section>

      {/* 버튼 크기 섹션 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">버튼 size</h2>
        <div className="flex items-center space-x-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* 전체 너비 버튼 섹션 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">fullWidth</h2>
        <div className="space-y-4">
          <Button
            size="lg"
            fullWidth
            variant="primary">
            Full Width Primary
          </Button>
          <Button
            size="lg"
            fullWidth
            variant="secondary">
            Full Width Secondary
          </Button>
        </div>
      </section>

      {/* 버튼 조합 예시 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">버튼 조합</h2>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="primary"
            size="sm">
            Small Primary
          </Button>
          <Button
            variant="secondary"
            size="sm">
            Small Secondary
          </Button>
          <Button
            variant="primary"
            size="md">
            Medium Primary
          </Button>
          <Button
            variant="secondary"
            size="md">
            Medium Secondary
          </Button>
          <Button
            variant="primary"
            size="lg">
            Large Primary
          </Button>
          <Button
            variant="secondary"
            size="lg">
            Large Secondary
          </Button>
        </div>
      </section>

      {/* 하단 네비게이션 */}
      <BottomNav activeTab="home" />
    </div>
  )
}
