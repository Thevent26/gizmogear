import { getAllPosts, getFeaturedPost } from '@/lib/posts'
import Link from 'next/link'

// Category color mapping
const categoryColors: Record<string, string> = {
  'Reviews': '#00d4ff',
  'Guides': '#8b5cf6',
  'News': '#f59e0b',
  'Opinion': '#ef4444',
  'Tech': '#10b981',
}

function getCategoryColor(category: string): string {
  return categoryColors[category] || '#00d4ff'
}

export default function Home() {
  const posts = getAllPosts()
  const featuredPost = getFeaturedPost()
  const recentPosts = posts.filter(p => p.slug !== featuredPost?.slug).slice(0, 6)

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="GizmoGear" style={{height: '120px'}} className="w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/posts" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">All Posts</Link>
            <Link href="#reviews" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Reviews</Link>
            <Link href="#guides" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Guides</Link>
            <Link href="#about" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Featured Article */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-12 pt-8">
            <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">
              Tech Reviews • Guides • Opinion
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              High-Tech with a<br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Zambian Twist
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Honest reviews, practical guides, and tech insights — tested in Zambian conditions.
            </p>
          </div>

          {/* Featured Article - Magazine Style */}
          {featuredPost && (
            <Link href={`/posts/${featuredPost.slug}`} className="group block">
              <article className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#12121a] to-[#0a0a0f] border border-white/10 hover:border-cyan-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-8 md:p-12 lg:p-16">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Content */}
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-3">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                          style={{ 
                            backgroundColor: `${getCategoryColor(featuredPost.category)}20`,
                            color: getCategoryColor(featuredPost.category)
                          }}
                        >
                          {featuredPost.category}
                        </span>
                        <span className="text-cyan-400 text-xs font-mono">★ FEATURED</span>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight group-hover:text-cyan-300 transition-colors duration-300">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600" />
                          {featuredPost.author}
                        </span>
                        <span>{featuredPost.date}</span>
                        <span>{featuredPost.readTime} read</span>
                      </div>
                      
                      <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-4 transition-all duration-300">
                        Read Article
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Visual Element */}
                    <div className="hidden lg:block w-96 h-[400px] relative flex-shrink-0">
                      {featuredPost.coverImage ? (
                        <img 
                          src={featuredPost.coverImage} 
                          alt={featuredPost.title}
                          className="w-full h-full object-contain rounded-2xl drop-shadow-2xl"
                        />
                      ) : (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="text-gray-500 text-sm font-mono">GizmoGear</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="py-16 px-6" id="reviews">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Latest Articles</h2>
              <p className="text-gray-500">Fresh tech insights from Zambia</p>
            </div>
            <Link href="/posts" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-2">
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="group">
                  <article className="h-full rounded-2xl bg-[#12121a] border border-white/5 hover:border-cyan-500/30 overflow-hidden transition-all duration-300 hover:-translate-y-1">
                    {/* Card Header */}
                    <div className="h-48 relative bg-gradient-to-br from-[#1a1a2e] to-[#12121a] flex items-center justify-center">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ 
                            backgroundColor: `${getCategoryColor(post.category)}20`,
                            color: getCategoryColor(post.category)
                          }}
                        >
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.date}</span>
                        <span>{post.readTime} read</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">More articles coming soon...</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 border-t border-white/5" id="about">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Why GizmoGear?</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Most tech reviews are written from Silicon Valley or London. We write from Lusaka. 
            Our reviews consider load-shedding, Zambian network conditions, local pricing, and real-world 
            use cases that matter to you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#12121a] border border-white/5">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Honest Reviews</h3>
              <p className="text-gray-500 text-sm">No sponsored fluff. Real opinions from real testing.</p>
            </div>
            <div className="p-6 rounded-xl bg-[#12121a] border border-white/5">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Local Context</h3>
              <p className="text-gray-500 text-sm">Tested in Zambia, for Zambians.</p>
            </div>
            <div className="p-6 rounded-xl bg-[#12121a] border border-white/5">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Practical Guides</h3>
              <p className="text-gray-500 text-sm">Actionable advice that actually works here.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="GizmoGear" className="h-6 w-auto" />
            <span className="text-gray-500 text-sm">© 2026 GizmoGear. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/posts" className="hover:text-white transition-colors">Articles</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
            <a href="mailto:hello@gizmogear.zm" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
