import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-gray-800 px-10 py-4 shadow-2xl">
      <nav className="flex items-center justify-center">
        <Link href="/" passHref>
          <a className="border p-2 font-mono text-lg font-semibold">
            Roundest Pokemon
          </a>
        </Link>
        <span></span>
      </nav>
    </header>
  )
}
