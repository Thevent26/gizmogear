import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export async function GET() {
  const posts = getAllPosts()
  const featured = posts.find(p => p.featured) || posts[0]
  
  if (!featured) {
    return NextResponse.json(null)
  }

  return NextResponse.json({
    slug: featured.slug,
    title: featured.title,
    excerpt: featured.excerpt,
    category: featured.category,
    date: featured.date,
    readTime: featured.readTime,
    coverImage: featured.coverImage,
    featured: featured.featured,
  })
}
