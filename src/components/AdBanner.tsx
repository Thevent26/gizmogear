'use client'

import { useEffect, useState } from 'react'

const ads = [
  {
    name: 'Lusaka365',
    tagline: 'Your Ultimate Lusaka City Guide',
    description: 'Discover events, venues, restaurants, and everything happening in Lusaka.',
    url: 'https://www.lusaka365.co/',
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: '#00d4ff',
  },
  {
    name: 'The Vent',
    tagline: 'Voice Out. Let It Out.',
    description: ' Zambia\'s anonymous social platform. Share your truths, vent freely, connect honestly.',
    url: 'https://www.thevent.live',
    icon: (
      <svg className="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
    accent: '#ec4899',
  },
]

function BrowserMockup({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div className="relative flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden border border-white/10 shadow-xl" style={{ borderColor: `${accent}30` }}>
      {/* Browser chrome */}
      <div className="h-5 bg-[#1a1a2e] flex items-center gap-1.5 px-2 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-red-500/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <div className="w-2 h-2 rounded-full bg-green-500/60" />
      </div>
      {/* Content */}
      <div className="h-[calc(100%-20px)] overflow-hidden">
        {children}
      </div>
      {/* Accent glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: `inset 0 0 20px ${accent}10` }} />
    </div>
  )
}

function ScrollingLogos({ ads }: { ads: typeof ads }) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => prev + 1)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Duplicate ads for seamless loop
  const allAds = [...ads, ...ads, ...ads, ...ads]
  const itemWidth = 180 // approximate width per item
  const totalWidth = allAds.length * itemWidth

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div
        className="flex items-center gap-4 whitespace-nowrap"
        style={{
          transform: `translateX(-${offset % totalWidth}px)`,
          willChange: 'transform',
        }}
      >
        {allAds.map((ad, i) => (
          <div
            key={`${ad.name}-${i}`}
            className="flex-shrink-0 flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ad.accent}20` }}>
              {ad.icon}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{ad.name}</div>
              <div className="text-xs text-gray-500">{ad.tagline}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" />
    </div>
  )
}

export default function AdBanner() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % ads.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Sponsored</span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        {/* Featured Ad Cards with auto-rotate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {ads.map((ad, i) => (
            <a
              key={ad.name}
              href={ad.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f0f17] to-[#12121a] border transition-all duration-500 ${i === activeIndex ? 'border' : 'border-white/5'}`}
              style={{ borderColor: i === activeIndex ? `${ad.accent}40` : undefined }}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 50%, ${ad.accent}08 0%, transparent 70%)` }} />
              
              <div className="relative p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Website Preview */}
                  <BrowserMockup accent={ad.accent}>
                    <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${ad.accent}15 0%, #0f0f17 100%)` }}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">{ad.name}</div>
                        <div className="text-xs text-gray-500">{ad.tagline}</div>
                      </div>
                    </div>
                  </BrowserMockup>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                      <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: `${ad.accent}20` }}>
                        {ad.icon}
                      </div>
                      <span className="text-sm font-bold text-white">{ad.name}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {ad.tagline}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {ad.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active indicator */}
              {i === activeIndex && (
                <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${ad.accent}, transparent)` }} />
              )}
            </a>
          ))}
        </div>

        {/* Auto-scrolling logos ticker */}
        <ScrollingLogos ads={ads} />
      </div>
    </section>
  )
}
