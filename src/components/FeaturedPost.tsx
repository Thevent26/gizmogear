'use client'

import { useEffect, useRef, useState } from 'react'
import type { Post } from './FeaturedPost'

interface PostFromServer {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  coverImage: string
  featured: boolean
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FeaturedPost() {
  const [post, setPost] = useState<PostFromServer | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/posts-featured')
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [post])

  if (!post) {
    return (
      <section id="reviews" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-96 rounded-3xl bg-[#1a1a2e]/50 animate-pulse" />
        </div>
      </section>
    )
  }

  return (
    <section id="reviews" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="circuit-line flex-1 max-w-[60px]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#64748b]">
            Featured
          </span>
        </div>

        {/* Card */}
        <a
          href={`/posts/${post.slug}`}
          className="group block relative overflow-hidden rounded-3xl bracket-card card-hover"
        >
          {/* Cover image as background */}
          <div className="absolute inset-0">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) parent.style.background = '#1a1a2e'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/90 to-transparent" />
          </div>

          {/* Glow line top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent" />

          <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start max-w-5xl">
            {/* Text content */}
            <div className="flex-1">
              {/* Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="tag tag-accent flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <polygon points="5,0 10,10 0,10" />
                  </svg>
                  Featured
                </span>
                <span className="tag">{post.category}</span>
              </div>

              {/* Title */}
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4 leading-tight group-hover:text-[#00d4ff] transition-colors duration-300">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-[#94a3b8] text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-[#64748b] font-mono mb-6">
                <span>{post.date}</span>
                <span className="text-[#1e1e2e]">•</span>
                <span>{post.readTime} read</span>
              </div>

              {/* CTA */}
              <div className="inline-flex items-center gap-2 text-[#00d4ff] font-display font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                Read Article
                <ArrowIcon />
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}
