import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export async function GET() {
  const posts = getAllPosts()
  const simplified = posts.map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.date,
    readTime: p.readTime,
    coverImage: p.coverImage,
    featured: p.featured,
  }))
  return NextResponse.json(simplified, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
    },
  })
}
