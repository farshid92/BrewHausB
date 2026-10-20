import { useState } from 'react'
import { Link } from 'react-router'
import { useSession, signOut } from '../lib/auth-client'

const links = [
  { href: '/#hero', label: 'Home' },
  { href: '/#shop', label: 'Shop' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg">
      <nav className="mx-auto flex max-w-[1100px] items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-xl font-bold">
          Brew<span className="text-ember">Haus</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition hover:bg-line sm:hidden"
        >
          <span className="text-2xl leading-none">{open ? '×' : '☰'}</span>
        </button>
        <ul className="hidden items-center gap-6 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-ink-soft transition-colors hover:text-ember">
                {link.label}
              </a>
            </li>
          ))}
          {session?.user ? (
            <li>
              <button
                type="button"
                onClick={() => signOut()}
                className="cursor-pointer text-ink-soft transition-colors hover:text-ember"
              >
                Sign out
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="text-ink-soft transition-colors hover:text-ember">
                Sign in
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {open && (
        <ul id="mobile-nav" className="flex flex-col border-t border-line px-4 py-2 sm:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-ink-soft transition-colors hover:text-ember"
              >
                {link.label}
              </a>
            </li>
          ))}
          {session?.user ? (
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  signOut()
                }}
                className="block w-full cursor-pointer py-3 text-left text-ink-soft transition-colors hover:text-ember"
              >
                Sign out
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block py-3 text-ink-soft transition-colors hover:text-ember"
              >
                Sign in
              </Link>
            </li>
          )}
        </ul>
      )}
    </header>
  )
}
