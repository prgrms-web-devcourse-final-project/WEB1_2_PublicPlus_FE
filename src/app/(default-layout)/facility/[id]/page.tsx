import type { Metadata } from 'next';
import { generateMetadata as generateBaseMetadata } from '@/metadata/generate-metadata';

interface Props {
  params: {
    id: string;
  };
}

// 빌드 시 생성할 정적 경로들을 지정
export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    // 실제 API로 시설 목록을 가져오는 방법 (예시로 id '1', '2', '3' 사용)
    return [{ id: '1' }, { id: '2' }, { id: '3' }];
  } catch (error) {
    console.error('Failed to fetch static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateBaseMetadata({
    title: `시설 상세: ${params.id}`,
    description: `공공체육시설 ${params.id}의 상세 정보와 모임을 만나보세요.`
  });
}

// 클라이언트 컴포넌트를 렌더링하기 위해서 다른 파일로 클라이언트 코드를 분리합니다.
export { default } from './client'; // 클라이언트 파일을 import
