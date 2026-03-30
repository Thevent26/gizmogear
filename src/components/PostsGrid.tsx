'use client'

import { useEffect, useRef } from 'react'
import type { Post } from './FeaturedPost'

const posts: Post[] = [
  {
    slug: 'starlink-zambia-6-months',
    title: 'Starlink After 6 Months in Zambia: The Real Story',
    excerpt: 'We installed Starlink at a compound in Chilenge. Here is what six months of rain, load-shedding, and ISP outages actually looks like.',
    category: 'Connectivity',
    date: 'March 10, 2026',
    readTime: '9 min',
    gradient: 'from-[#00d4ff]/15 to-transparent',
  },
  {
    slug: 'tecno-spark-30-review',
    title: 'Tecno Spark 30C: The Best Budget Phone Under K2,000?',
    excerpt: 'Tecno keeps shipping phones that punch above their weight. We spent two weeks with the Spark 30C to find out if it is worth your money.',
    category: 'Gadget Review',
    date: 'March 5, 2026',
    readTime: '7 min',
    gradient: 'from-[#f59e0b]/15 to-transparent',
  },
  {
    slug: 'zamtel-5g-lusaka',
    title: 'Zamtel 5G in Lusaka: Hype or Real?',
    excerpt: 'Zamtel launched 5G in parts of Lusaka last year. We tested it across 15 locations to see if it actually delivers on the promise.',
    category: 'Networks',
    date: 'Feb 28, 2026',
    readTime: '8 min',
    gradient: 'from-[#8b5cf6]/15 to-transparent',
  },
  {
    slug: 'power-backup-guide-2026',
    title: 'The Ultimate Power Backup Guide for Zambian Homes',
    excerpt: 'Inverters, UPS, solar, power banks — we break down every option with real costs, real runtimes, and real opinions for Lusaka conditions.',
    category: 'Guides',
    date: 'Feb 20, 2026',
    readTime: '14 min',
    gradient: 'from-[#00d4ff]/15 to-transparent',
  },
  {
    slug: 'ecobanking-apps-2026',
    title: 'Zambia\'s Best Banking Apps in 2026: Ranked',
    excerpt: 'We tested all the major banking apps — EcoNet, Zamtel Money, Bongo, and bank apps — on speed, reliability, and UX from a Lusaka perspective.',
    category: 'Fintech',
    date: 'Feb 14, 2026',
    readTime: '10 min',
    gradient: 'from-[#f59e0b]/15 to-transparent',
  },
  {
    slug: 'hp-chromebook-zambia',
    title: 'Can a K3,500 Chromebook Actually Work in Zambia?',
    excerpt: 'An HP Chromebook for school-going kids. We set one up with offline tools, loaded it with Zambian educational content, and let a Grade 9 student use it for a month.',
    category: 'Gadget Review',
    date: 'Feb 8, 2026',
    readTime: '11 min',
    gradient: 'from-[#8b5cf6]/15 to-transparent',
  },
]

function PostCard({ post, delay }: { post: Post; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}ms`
          el.classList.add('visible')
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} className="reveal">
      <a
        href={`/posts/${post.slug}`}
        className="group block h-full rounded-2xl overflow-hidden bracket-card card-hover border border-[#1e1e2e] bg-[#0f0f17]"
      >
        {/* Thumbnail */}
        <div className={`h-48 relative overflow-hidden bg-gradient-to-br ${post.gradient}`}>
          {/* Category icon */}
          <div className="absolute top-4 left-4">
            <CategoryIcon category={post.category} />
          </div>
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
          {/* Animated grid overlay */}
          <div className="absolute inset-0 hex-pattern opacity-20" />
        </div>

        {/* Content */}
        <div className="p-6">
          <span className="tag mb-3 inline-block">{post.category}</span>
          <h3 className="font-display font-bold text-lg text-white mb-2 leading-snug group-hover:text-[#00d4ff] transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-[#64748b] text-sm leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs text-[#475569] font-mono">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </a>
    </div>
  )
}

function CategoryIcon({ category }: { category: string }) {
  const colors: Record<string, string> = {
    'Gadget Review': '#00d4ff',
    'Connectivity': '#8b5cf6',
    'Networks': '#f59e0b',
    'Guides': '#00d4ff',
    'Fintech': '#f59e0b',
  }
  const c = colors[category] || '#00d4ff'

  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center"
      style={{ background: `${c}20`, border: `1px solid ${c}40` }}
    >
      {category === 'Gadget Review' && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="5" width="16" height="10" rx="2" stroke={c} strokeWidth="1.2" />
          <path d="M7 5V4a1 1 0 011-1h4a1 1 0 011 1v1" stroke={c} strokeWidth="1.2" />
          <circle cx="10" cy="10" r="2" fill={c} opacity="0.6" />
        </svg>
      )}
      {category === 'Connectivity' && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 12.5a4 4 0 0110 0" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M2.5 9.5a8 8 0 0115 0" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          <path d="M1 6.5a12 12 0 0118 0" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
          <circle cx="10" cy="14" r="1.5" fill={c} />
        </svg>
      )}
      {category === 'Networks' && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="2" fill={c} />
          <circle cx="4" cy="6" r="1.5" stroke={c} strokeWidth="1" opacity="0.6" />
          <circle cx="16" cy="6" r="1.5" stroke={c} strokeWidth="1" opacity="0.6" />
          <circle cx="4" cy="14" r="1.5" stroke={c} strokeWidth="1" opacity="0.6" />
          <circle cx="16" cy="14" r="1.5" stroke={c} strokeWidth="1" opacity="0.6" />
          <line x1="4" y1="7.5" x2="8" y2="9" stroke={c} strokeWidth="0.8" opacity="0.5" />
          <line x1="16" y1="7.5" x2="12" y2="9" stroke={c} strokeWidth="0.8" opacity="0.5" />
          <line x1="4" y1="12.5" x2="8" y2="11" stroke={c} strokeWidth="0.8" opacity="0.5" />
          <line x1="16" y1="12.5" x2="12" y2="11" stroke={c} strokeWidth="0.8" opacity="0.5" />
        </svg>
      )}
      {category === 'Guides' && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 3h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" stroke={c} strokeWidth="1.2" />
          <path d="M6 7h8M6 10h5" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        </svg>
      )}
      {category === 'Fintech' && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="6" width="16" height="10" rx="2" stroke={c} strokeWidth="1.2" />
          <path d="M2 9h16" stroke={c} strokeWidth="1" opacity="0.5" />
          <path d="M5 13h3" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </div>
  )
}

export default function PostsGrid() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="circuit-line flex-1 max-w-[60px]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#64748b]">
              Latest
            </span>
          </div>
          <a
            href="/posts"
            className="text-sm text-[#00d4ff] font-display font-medium hover:underline"
          >
            View all →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
