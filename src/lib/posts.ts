import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  author: string
  category: string
  excerpt: string
  coverImage: string
  tags: string[]
  featured: boolean
  content: string
  readTime: string
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min`
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date ? new Date(data.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }) : '',
        author: data.author || 'GizmoGear',
        category: data.category || 'Tech',
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || '',
        tags: data.tags || [],
        featured: data.featured || false,
        content,
        readTime: calculateReadTime(content),
      }
    })
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))

  return allPosts
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date ? new Date(data.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) : '',
    author: data.author || 'GizmoGear',
    category: data.category || 'Tech',
    excerpt: data.excerpt || '',
    coverImage: data.coverImage || '',
    tags: data.tags || [],
    featured: data.featured || false,
    content,
    readTime: calculateReadTime(content),
  }
}

export function getFeaturedPost(): Post | null {
  const posts = getAllPosts()
  return posts.find(p => p.featured) || posts[0] || null
}
