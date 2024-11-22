import Link from 'next/link';

const Header = () => {
  return (
    <header>
      헤더
      <Link href="/login">👋 Login</Link>
    </header>
  );
};

export default Header;
