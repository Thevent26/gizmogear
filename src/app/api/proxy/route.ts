import { NextRequest } from 'next/server'

const GITHUB_API = 'https://api.github.com'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') || ''

  const token = request.cookies.get('gh_token')?.value

  const res = await fetch(`${GITHUB_API}${path}`, {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'DecapCMS/3.0',
      ...(token ? {} : { Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}` }),
    } as Record<string, string>,
    // @ts-ignore
  })

  const data = await res.json()
  return Response.json(data, { status: res.status })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { path, method = 'POST', body: bodyData } = body

  const token = request.cookies.get('gh_token')?.value ||
    process.env.GITHUB_PERSONAL_ACCESS_TOKEN

  const res = await fetch(`${GITHUB_API}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'DecapCMS/3.0',
    } as Record<string, string>,
    body: JSON.stringify(bodyData),
  })

  const data = await res.json()
  return Response.json(data, { status: res.status })
}
