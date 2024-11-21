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

export default function FacilityDetailPage({ params }: Props) {
  const validIds = ['1', '2', '3']; // 실제 데이터와 동기화 필요
  if (!validIds.includes(params.id)) {
    return <div>존재하지 않는 시설입니다.</div>;
  }

  return <div>시설 상세 페이지: {params.id}</div>;
}
