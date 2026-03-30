import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | GizmoGear`,
    description: post.excerpt,
  }
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-white mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mt-12 mb-6">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-400 hover:underline">$1</a>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-2">• $1</li>')
    // Tables (basic)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim())
      if (cells[0]?.includes('---')) return ''
      const isHeader = cells.some(c => c.includes('Item') || c.includes('Cost'))
      const cellTag = isHeader ? 'th' : 'td'
      const cellClass = isHeader 
        ? 'px-4 py-3 text-left text-sm font-semibold text-white bg-white/5'
        : 'px-4 py-3 text-sm text-gray-300 border-t border-white/5'
      return `<tr>${cells.map(c => `<${cellTag} class="${cellClass}">${c.trim()}</${cellTag}>`).join('')}</tr>`
    })
    // Horizontal rules
    .replace(/^---$/gim, '<hr class="my-8 border-white/10" />')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-6 text-gray-300 leading-relaxed">')

  // Wrap in paragraph tags
  html = `<p class="mb-6 text-gray-300 leading-relaxed">${html}</p>`
  
  // Wrap tables
  html = html.replace(/(<tr>[\s\S]*?<\/tr>)+/g, '<table class="w-full my-6 rounded-lg overflow-hidden border border-white/10"><tbody>$&</tbody></table>')
  
  // Clean up empty paragraphs
  html = html.replace(/<p class="[^"]*"><\/p>/g, '')
  
  return html
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const contentHtml = markdownToHtml(post.content)

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="GizmoGear" className="h-20 w-auto" />
          </Link>
          <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400">
                  ★ Featured
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              {post.excerpt}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-500 pb-8 border-b border-white/10">
              <span className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600" />
                <span className="text-white font-medium">{post.author}</span>
              </span>
              <span>{post.date}</span>
              <span>{post.readTime} read</span>
            </div>
          </header>

          {/* Content */}
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-12">
            <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
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
