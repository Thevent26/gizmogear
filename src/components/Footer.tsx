'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  const links = [
    { label: 'Reviews', href: '#reviews' },
    { label: 'Guides', href: '#guides' },
    { label: 'About', href: '#about' },
    { label: 'Privacy', href: '/privacy' },
  ]

  return (
    <footer className="border-t border-[#1e1e2e] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-white">Gizmo</span>
              <span className="font-display font-bold text-[#00d4ff]">Gear</span>
            </div>
            <p className="text-[#475569] text-sm font-mono">
              Zambia&apos;s tech voice. Honest reviews. Local context.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 justify-center">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#64748b] hover:text-[#00d4ff] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href="#" className="p-2 rounded-lg border border-[#1e1e2e] hover:border-[#00d4ff]/50 transition-colors" aria-label="Twitter/X">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-[#64748b]">
                <path d="M12.6 1h2.4L9.8 7.1 16 15h-4.7L7.3 10.7 3.2 15H.8l5.7-6.3L0 1h4.8l3.3 4.5L12.6 1zm-.8 12.6h1.3L4.3 2.3H2.9l8.9 11.3z" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-lg border border-[#1e1e2e] hover:border-[#00d4ff]/50 transition-colors" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#64748b]">
                <rect x="1" y="1" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="11.5" cy="4.5" r="0.8" fill="currentColor" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-lg border border-[#1e1e2e] hover:border-[#00d4ff]/50 transition-colors" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-[#64748b]">
                <path d="M15.36 4.26a2 2 0 00-1.41-1.41C12.54 2.4 8 2.4 8 2.4s-4.54 0-5.95.45A2 2 0 00.64 4.26C.2 5.64.2 8 .2 8s0 2.36.44 3.74a2 2 0 001.41 1.41C3.46 13.6 8 13.6 8 13.6s4.54 0 5.95-.45a2 2 0 001.41-1.41C15.8 10.36 15.8 8 15.8 8s0-2.36-.44-3.74zM6.5 10.4V5.6l4 2.4-4 2.4z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-[#1e1e2e] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#475569] text-xs font-mono">
            © {year} GizmoGear Zambia. All rights reserved.
          </p>
          <p className="text-[#475569] text-xs">
            Made with <span className="text-[#f59e0b]">⚡</span> in Lusaka
          </p>
        </div>
      </div>
    </footer>
  )
}
