'use client'

import { useEffect, useRef, useState } from 'react'

interface Post {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  coverImage: string
  featured: boolean
}

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
        className="group block h-full rounded-2xl overflow-hidden bracket-card card-hover border border-[var(--card-border)] bg-[var(--bg-card)]"
      >
        {/* Cover Image */}
        <div className="h-48 relative overflow-hidden">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.style.background = '#1a1a2e'
                  parent.innerHTML = `<div class="flex items-center justify-center h-full"><span class="text-4xl">📱</span></div>`
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#00d4ff]/10 to-[#8b5cf6]/10" />
          )}
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <CategoryIcon category={post.category} />
          </div>
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
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
    'Opinion': '#ef4444',
    'Review': '#00d4ff',
    'Tech': '#00d4ff',
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
        </svg>
      )}
      {(category === 'Guides' || category === 'Tech') && (
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
      {category === 'Opinion' && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 4h12v9H4z" stroke={c} strokeWidth="1.2" rx="1" />
          <path d="M6 15h8M6 17h4" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}
      {category === 'Review' && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="5" width="16" height="10" rx="2" stroke={c} strokeWidth="1.2" />
          <circle cx="10" cy="10" r="2" fill={c} opacity="0.6" />
        </svg>
      )}
    </div>
  )
}

export default function PostsGrid() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.slice(0, 6))
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="circuit-line flex-1 max-w-[60px]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#64748b]">Latest</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 rounded-2xl bg-[#1a1a2e]/50 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

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
