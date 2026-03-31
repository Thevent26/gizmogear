'use client'

import { useEffect, useRef } from 'react'

const stats = [
  { value: '45%', label: 'import tax on consumer electronics', color: '#00d4ff' },
  { value: '8h+', label: 'average daily load-shedding in peak season', color: '#f59e0b' },
  { value: '73%', label: 'network coverage gap in rural areas', color: '#8b5cf6' },
]

const pillars = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#00d4ff" strokeWidth="1.2" strokeOpacity="0.5" />
        <path d="M14 8v6l4 2" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    label: 'Power Resilience',
    desc: 'Gadgets that survive load-shedding are not a niche — they are the market.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20a10 10 0 0120 0" stroke="#8b5cf6" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M2 14a14 14 0 0124 0" stroke="#8b5cf6" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
        <circle cx="14" cy="22" r="2" fill="#8b5cf6" opacity="0.6" />
      </svg>
    ),
    label: 'Network Reality',
    desc: '3G is still Lusaka\'s dominant mode. 5G is a marketing bullet for most.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="14" rx="2" stroke="#f59e0b" strokeWidth="1.2" />
        <path d="M9 8V6a2 2 0 012-2h6a2 2 0 012 2v2" stroke="#f59e0b" strokeWidth="1.2" />
        <path d="M4 16h20" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.5" />
      </svg>
    ),
    label: 'Affordability',
    desc: 'K800/month median income. A K4,000 phone is 5 months of salary.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="4" stroke="#00d4ff" strokeWidth="1.2" />
        <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="20" cy="14" r="2" fill="#8b5cf6" opacity="0.6" />
      </svg>
    ),
    label: 'Cultural Fit',
    desc: 'Tech that ignores Zambian social norms — family data sharing, Bonga Points — is tech that fails.',
  },
]

export default function WhyZambiaSection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), i * 120)
          })
          obs.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="py-24 px-6 relative">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)',
        }}
      />
      <div className="hex-pattern absolute inset-0 opacity-10" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="circuit-line flex-1 max-w-[60px]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#64748b]">
                Our Angle
              </span>
            </div>

            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
              Why{' '}
              <span className="gradient-text">Zambia?</span>
            </h2>

            <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
              Tech does not exist in a vacuum. We examine affordability, availability, power
              resilience, network coverage, and cultural fit — because a gadget that works in
              Silicon Valley might completely flop in Chawama.
            </p>

            <p className="text-[#64748b] leading-relaxed mb-10">
              We do not write for spec sheets. We write for the person权衡 考虑 who has K2,000
              to spend, four hours of load-shedding ahead, and a MTN data bundle that ran out
              yesterday. That is our reader. That is who we are writing for.
            </p>

            {/* Stats */}
            <div className="space-y-4">
              {stats.map(stat => (
                <div key={stat.label} className="flex items-center gap-4">
                  <span
                    className="font-display font-bold text-3xl w-20 shrink-0"
                    style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}40` }}
                  >
                    {stat.value}
                  </span>
                  <p className="text-[#64748b] text-sm leading-snug capitalize">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: pillars grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.label}
                className="reveal p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-card)] bracket-card card-hover"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-4">{pillar.icon}</div>
                <h4 className="font-display font-semibold text-white text-sm mb-2">
                  {pillar.label}
                </h4>
                <p className="text-[#64748b] text-xs leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
