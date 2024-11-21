import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>메인페이지</h1>
      <Link href="/facility/1">시설상세페이지</Link>
    </>
  );
}
