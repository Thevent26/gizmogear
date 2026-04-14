'use client'

import { useState } from 'react'

const categories = ['All', 'Reviews', 'Guides', 'Opinion', 'News']

export default function CategoryFilter({ active, onChange }: { active: string; onChange: (cat: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            active === cat
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
