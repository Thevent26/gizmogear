'use client'

import { useEffect, useState } from 'react'

interface Ad {
  name: string
  tagline: string
  description: string
  url: string
  accent: string
  color: string
}

const ads: Ad[] = [
  {
    name: 'Lusaka365',
    tagline: 'Your Ultimate Lusaka City Guide',
    description: 'Discover events, venues, restaurants, and everything happening in Lusaka.',
    url: 'https://www.lusaka365.co/',
    accent: '#00d4ff',
    color: 'from-cyan-500/20 to-cyan-600/10',
  },
  {
    name: 'TechTrends',
    tagline: "Zambia's Tech News Hub",
    description: "Stay updated with the latest in Zambian tech, gadgets, and digital trends.",
    url: 'https://www.techtrends.co.zm',
    accent: '#10b981',
    color: 'from-emerald-500/20 to-emerald-600/10',
  },
  {
    name: 'The Vent',
    tagline: 'Voice Out. Let It Out.',
    description: "Zambia's anonymous social platform. Share your truths, vent freely, connect honestly.",
    url: 'https://www.thevent.live',
    accent: '#ec4899',
    color: 'from-pink-500/20 to-pink-600/10',
  },
]

interface BrowserMockupProps {
  url: string
  accent: string
}

function BrowserMockup({ url, accent }: BrowserMockupProps) {
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchPreview() {
      try {
        const res = await fetch(`/api/ad-preview?url=${encodeURIComponent(url)}`)
        const data = await res.json() as { image: string | null }
        if (!cancelled && data.image) {
          setPreviewUrl(data.image)
        }
      } catch {
        // silent fail
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchPreview()
    return () => { cancelled = true }
  }, [url])

  return (
    <div className="relative flex-shrink-0 w-40 h-28 rounded-lg overflow-hidden border border-[var(--card-border)] shadow-xl" style={{ borderColor: `${accent}30` }}>
      {/* Browser chrome */}
      <div className="h-5 bg-[var(--bg-card)] flex items-center gap-1.5 px-2 border-b border-[var(--card-border)]">
        <div className="w-2 h-2 rounded-full bg-red-500/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <div className="w-2 h-2 rounded-full bg-green-500/60" />
      </div>
      {/* Content */}
      <div className="h-[calc(100%-20px)] overflow-hidden bg-gradient-to-br from-[#0f0f17] to-[#12121a]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-4 h-4 border border-[var(--card-border)] border-t-cyan-500 rounded-full animate-spin" />
          </div>
        ) : previewUrl ? (
          <img
            src={previewUrl}
            alt={url}
            className="w-full h-full object-cover"
            onError={() => setPreviewUrl('')}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <svg className="w-6 h-6 text-white/20 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span className="text-[8px] text-white/30">{new URL(url).hostname}</span>
          </div>
        )}
      </div>
      {/* Accent glow */}
      <div className="absolute inset-0 pointer-events-none rounded-lg" style={{ boxShadow: `inset 0 0 20px ${accent}10` }} />
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

        {/* Featured Ad Cards - half width, 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {ads.map((ad, i) => (
            <a
              key={ad.name}
              href={ad.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0f0f17] to-[#12121a] border transition-all duration-300"
              style={{
                borderColor: activeIndex === i ? `${ad.accent}50` : 'rgba(255,255,255,0.05)',
                boxShadow: activeIndex === i ? `0 0 20px ${ad.accent}15` : 'none',
              }}
            >
              <div className="relative p-4">
                <div className="flex items-center gap-4">
                  {/* Browser Mockup with live preview */}
                  <BrowserMockup url={ad.url} accent={ad.accent} />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${ad.accent}20` }}>
                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: ad.accent }} />
                      </div>
                      <span className="text-xs font-bold text-white">{ad.name}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors line-clamp-1">
                      {ad.tagline}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                      {ad.description}
                    </p>
                  </div>
                </div>

                {/* Active indicator */}
                {activeIndex === i && (
                  <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${ad.accent}, transparent)` }} />
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Scrolling ticker - right to left */}
        <div className="relative w-full overflow-hidden py-4">
          <div
            className="flex items-center gap-4 whitespace-nowrap"
            style={{
              animation: 'scroll-left 20s linear infinite',
            }}
          >
            {[...ads, ...ads, ...ads, ...ads].map((ad, i) => (
              <a
                key={`${ad.name}-${i}`}
                href={ad.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-[var(--card-border)] hover:border-[var(--card-border)] hover:bg-white/[0.07] transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ad.accent}20` }}>
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: ad.accent }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{ad.name}</div>
                  <div className="text-xs text-gray-500">{ad.tagline}</div>
                </div>
              </a>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" />
        </div>

        <style jsx>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  )
}
