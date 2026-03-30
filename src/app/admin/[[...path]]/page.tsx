import fs from 'fs'
import path from 'path'

export async function generateStaticParams() {
  // Pre-render the admin index
  return [{ path: [] }]
}

export default async function AdminPage({
  params,
}: {
  params: { path?: string[] }
}) {
  const filePath = params.path?.join('/') || 'index.html'
  const safeDir = path.join(process.cwd(), 'public', 'admin')
  const fullPath = path.join(safeDir, filePath)

  if (!fullPath.startsWith(safeDir)) {
    return new Response('Not found', { status: 404 })
  }

  try {
    const content = fs.readFileSync(fullPath)
    const ext = path.extname(filePath)
    const types: Record<string, string> = {
      '.html': 'text/html; charset=utf-8',
      '.yml': 'text/yaml',
      '.yaml': 'text/yaml',
      '.js': 'application/javascript',
      '.json': 'application/json',
    }
    return new Response(content, {
      headers: { 'Content-Type': types[ext] || 'text/plain' },
    })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}
