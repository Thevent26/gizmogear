'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'

const navLinks = [
  { label: 'Reviews', href: '#reviews' },
  { label: 'Opinion', href: '#opinion' },
  { label: 'Guides', href: '#guides' },
  { label: 'About', href: '#about' },
]

function GizmoGearLogo({ height = 40 }: { height?: number }) {
  return (
    <img
      src="/logo.png"
      alt="GizmoGear"
      style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }}
    />
  )
}

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('gizmogear-theme')
    if (saved === 'light') {
      setTheme('light')
      document.documentElement.classList.add('light')
    }
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('gizmogear-theme', next)
    if (next === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <GizmoGearLogo height={36} />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#64748b] hover:text-[#00d4ff] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[var(--card-border)] hover:border-[#00d4ff] transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-[#f59e0b]" /> : <Moon size={18} className="text-[#8b5cf6]" />}
            </button>

            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden p-2 rounded-lg border border-[var(--card-border)]"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[var(--card-border)] pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-[#64748b] hover:text-[#00d4ff] transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
