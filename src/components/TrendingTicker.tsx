'use client'

import { useEffect, useState } from 'react'

export default function TrendingTicker() {
  const [offset, setOffset] = useState(0)

  const items = [
    'Starlink Review',
    'Map Apps Compared',
    'AI Agents Tested',
    'Tech in the Wild',
    'Zambian Tech Scene',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => (prev + 1) % (items.length * 200))
    }, 30)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <div className="relative overflow-hidden border-y border-[var(--card-border)] bg-black/30">
      <div className="flex items-center h-10">
        <span className="flex-shrink-0 bg-cyan-500 text-black text-xs font-bold px-3 py-1 uppercase tracking-wider z-10">
          Trending
        </span>
        <div className="overflow-hidden flex-1">
          <div
            className="flex items-center gap-8 whitespace-nowrap text-sm text-gray-400"
            style={{ transform: `translateX(-${offset}px)`, transition: 'transform 0.05s linear' }}
          >
            {[...items, ...items, ...items].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
