'use client'

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  gradient: string
  featured?: boolean
}

const featuredPost: Post = {
  slug: 'pixel-9-zambia',
  title: 'The Pixel 9 in Zambia: Worth the Import Tax?',
  excerpt:
    'We got our hands on Google\'s latest flagship. Beyond the specs, we tested it on Zambian networks, under load-shedding conditions, and with local apps. Does it justify the extra 45% import cost?',
  category: 'Gadget Review',
  date: 'March 15, 2026',
  readTime: '12 min',
  gradient: 'from-[#00d4ff]/20 via-[#8b5cf6]/10 to-transparent',
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FeaturedPost() {
  return (
    <section id="reviews" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="circuit-line flex-1 max-w-[60px]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#64748b]">
            Featured Review
          </span>
        </div>

        {/* Card */}
        <a
          href={`/posts/${featuredPost.slug}`}
          className="group block relative overflow-hidden rounded-3xl bracket-card card-hover"
        >
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${featuredPost.gradient}`} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f17] via-[#0f0f17]/95 to-transparent" />

          {/* Glow line top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent" />

          <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
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
                <span className="tag">{featuredPost.category}</span>
              </div>

              {/* Title */}
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4 leading-tight group-hover:text-[#00d4ff] transition-colors duration-300">
                {featuredPost.title}
              </h2>

              {/* Excerpt */}
              <p className="text-[#94a3b8] text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                {featuredPost.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-[#64748b] font-mono mb-6">
                <span>{featuredPost.date}</span>
                <span className="text-[#1e1e2e]">•</span>
                <span>{featuredPost.readTime} read</span>
              </div>

              {/* CTA */}
              <div className="inline-flex items-center gap-2 text-[#00d4ff] font-display font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                Read Review
                <ArrowIcon />
              </div>
            </div>

            {/* Visual side */}
            <div className="hidden md:flex flex-col items-center justify-center w-64">
              <div className="relative">
                {/* Phone mockup */}
                <div className="w-40 h-[320px] rounded-[2.5rem] border-2 border-[var(--card-border)] bg-[var(--bg-card)] p-3 shadow-2xl">
                  <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-[#1a1a2e] to-[#0f0f17] flex items-center justify-center overflow-hidden">
                    <div className="text-center">
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="mx-auto mb-2">
                        <rect x="5" y="5" width="50" height="50" rx="12" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.5" />
                        <circle cx="30" cy="30" r="12" stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.5" />
                        <circle cx="30" cy="30" r="4" fill="#00d4ff" opacity="0.6" />
                        <circle cx="44" cy="12" r="2" fill="#00d4ff" opacity="0.4" />
                      </svg>
                      <span className="font-mono text-[8px] text-[#64748b]">PIXEL 9</span>
                    </div>
                  </div>
                  {/* Camera bump */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-6 bg-[var(--bg-card)] rounded-b-2xl border-2 border-b-0 border-[var(--card-border)]" />
                </div>
                {/* Glow behind phone */}
                <div
                  className="absolute inset-0 rounded-[2.5rem] opacity-30"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.3) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                    transform: 'scale(1.2)',
                  }}
                />
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}
