import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import ReadingProgress from '@/components/ReadingProgress'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  const ogImage = post.coverImage || '/images/og-default.jpg'
  return {
    title: `${post.title} | GizmoGear`,
    description: post.excerpt,
    keywords: post.tags || [],
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      url: `https://gizmogear.tech/posts/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      siteName: 'GizmoGear',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  }
}

function markdownToHtml(markdown: string): string {
  let html = markdown

  // Extract and store images first
  const images: { placeholder: string; src: string; alt: string; align?: string }[] = []
  
  // Process div-wrapped images (with alignment class)
  html = html.replace(/<div[^>]*class="image-([^"]*)"[^>]*>\s*!\[([^\]]*)\]\(([^)]*)\)([^<]*)<\/div>/gi, (match, align, alt, src, caption) => {
    const placeholder = `__IMAGE_${images.length}__`
    images.push({ placeholder, src, alt, align })
    return placeholder
  })

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-white mt-10 mb-4">$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-white mt-12 mb-6">$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mt-12 mb-6">$1</h1>')

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-400 hover:underline">$1</a>')

  // Blockquotes (pull quotes)
  html = html.replace(/^> (.*$)/gim, '<blockquote class="my-8 pl-6 border-l-4 border-cyan-500 italic text-xl text-gray-300">$1</blockquote>')

  // Horizontal rules become decorative dividers
  html = html.replace(/^---$/gim, '<div class="my-12 flex items-center gap-4"><div class="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div><span class="text-cyan-500/50">◆</span><div class="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div></div>')

  // Image tags within text (no wrapper)
  html = html.replace(/!\[([^\]]*)\]\(([^)]*)\)([^<]*)/g, (match, alt, src, caption) => {
    const captionText = caption?.replace(/^\s*\*([^*]+)\*/, '$1').trim()
    const figClass = captionText ? 'image-block with-caption' : 'image-block'
    return `<figure class="${figClass}"><img src="${src}" alt="${alt}" loading="lazy" />${captionText ? `<figcaption>${captionText}</figcaption>` : ''}</figure>`
  })

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-6 mb-3 text-gray-300">$1</li>')

  // Paragraphs - preserve newlines
  html = html.replace(/\n\n/g, '</p><p class="mb-6 text-gray-300 leading-relaxed">')

  // Wrap in paragraph
  html = `<p class="mb-6 text-gray-300 leading-relaxed">${html}</p>`

  // Clean up
  html = html.replace(/<p class="[^"]*"><\/p>/g, '')
  html = html.replace(/<p class="[^"]*">(<!--[^>]*-->)/g, '$1<p class="mb-6 text-gray-300 leading-relaxed">')
  
  return html
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const contentHtml = markdownToHtml(post.content)
  const allPosts = getAllPosts()
  const related = allPosts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2)

  return (
    <main className="min-h-screen bg-[var(--bg-deep)]">
      <NavBar />
      <ReadingProgress />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div id="progress" className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 w-0 transition-all duration-100" />
      </div>

      {/* Hero Image */}
      {post.coverImage && (
        <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/80 via-transparent to-transparent" />
        </div>
      )}

      {/* Article Header */}
      <header className="relative -mt-32 pb-0 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Category */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {post.category}
            </span>
            {post.featured && (
              <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
                ★ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-2xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center gap-6 py-6 border-t border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-500/50 bg-[#1a1a2e]">
                <img src="/images/tech-joe-lost-zambia.jpg" alt={post.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-white font-bold text-lg">{post.author}</div>
                <div className="text-gray-500 text-sm">Tech Journalist</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime} read
              </span>
            </div>

            {/* Share */}
            <div className="ml-auto flex items-center gap-3">
              <span className="text-gray-500 text-sm">Share:</span>
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.134l.333-3.854h-3.467v-2.292c0-.437.22-.863.567-.863h2.885v-3.437l-3.958.001z"/></svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="px-6">
        <div className="max-w-4xl mx-auto">
          <div 
            className="article-content py-12"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full text-xs bg-white/5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Card */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-500/50 bg-[#1a1a2e] flex-shrink-0">
                <img src="/images/tech-joe-lost-zambia.jpg" alt={post.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-white font-bold text-xl mb-2">{post.author}</div>
                <div className="text-cyan-400 text-sm font-medium mb-3">Tech Journalist & Analyst</div>
                <p className="text-gray-400 leading-relaxed">
                  Covering Zambia's tech scene with honest opinions and real-world testing. No fluff, no sponsored content.
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
                <span className="text-gray-500 text-sm uppercase tracking-widest">Related Articles</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((rp) => (
                  <a key={rp.slug} href={`/posts/${rp.slug}`} className="group block rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                    {rp.coverImage && (
                      <div className="h-40 overflow-hidden">
                        <img src={rp.coverImage} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="text-cyan-400 text-xs font-medium uppercase mb-2">{rp.category}</div>
                      <h3 className="text-white font-bold leading-snug group-hover:text-cyan-400 transition-colors">{rp.title}</h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-16 text-center">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="mt-20 py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="GizmoGear" className="h-6 w-auto" />
            <span className="text-gray-500 text-sm">© 2026 GizmoGear. All rights reserved.</span>
          </div>
        </div>
      </footer>

    </main>
  )
}
