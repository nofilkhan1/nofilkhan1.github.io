import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { Moon, Sun, Menu, X } from 'lucide-react'

const links = ['About', 'Projects', 'Skills', 'Journey', 'Contact']

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-[#0A0A0A]/95 border-b border-[#2A2A2A]'
            : 'bg-[#FAFAFA]/95 border-b border-[#E5E5E5]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-mono text-sm tracking-wider font-medium">
          Nofil<span className="text-[#888]">.khan</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.15em] text-[#888] hover:text-current transition-colors duration-150"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="w-9 h-9 flex items-center justify-center rounded-md border transition-all duration-150 hover:scale-105"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a
            href="mailto:nofilkhan251@gmail.com"
            className="hidden md:inline-flex px-4 py-2 text-xs font-semibold uppercase tracking-wider border rounded-md transition-all duration-150 hover:scale-105"
          >
            Hire Me
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 space-y-3">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block text-sm uppercase tracking-wider text-[#888] hover:text-current transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
