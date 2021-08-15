import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/lists">
          <a>Lists</a>
        </Link>
        <Link href="/recipes">
          <a>Recipes</a>
        </Link>
      </nav>
    </header>
  );
}
