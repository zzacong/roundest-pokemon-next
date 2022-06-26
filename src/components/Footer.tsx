import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-6">
      <nav className="mt-10 flex items-center justify-center gap-8 font-mono">
        <a
          href="https://github.com/zzacong/roundest-pokemon-nextjs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-semibold hover:underline hover:opacity-80"
        >
          Source code
        </a>
        |
        <Link href="/summary" passHref>
          <a className="text-base font-semibold hover:underline hover:opacity-80">
            View summary
          </a>
        </Link>
      </nav>
    </footer>
  )
}
