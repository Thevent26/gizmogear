import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { path?: string[] } }
) {
  const filePath = params.path?.join('/') || 'index.html'
  const file = path.join(process.cwd(), 'public', 'admin', filePath)
  
  // Security: prevent directory traversal
  if (!file.startsWith(path.join(process.cwd(), 'public', 'admin'))) {
    return new Response('Not found', { status: 404 })
  }

  try {
    const content = fs.readFileSync(file)
    const ext = path.extname(filePath)
    const types: Record<string, string> = {
      '.html': 'text/html',
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
