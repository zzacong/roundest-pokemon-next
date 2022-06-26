import Link from 'next/link'

export default function Header() {
  return (
    <header className="top-0 z-20 bg-gray-800 px-10 py-4 shadow-2xl md:sticky">
      <nav className="flex items-center justify-center">
        <Link href="/" passHref>
          <a className="border p-2 font-mono text-base font-semibold md:text-lg">
            Roundest Pokemon
          </a>
        </Link>
        <span></span>
      </nav>
    </header>
  )
}
