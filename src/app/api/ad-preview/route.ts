import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`, {
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error('Microlink failed')
    }

    const data = await response.json()

    if (data.status === 'success' && data.data?.image?.url) {
      return NextResponse.json({ image: data.data.image.url })
    }

    throw new Error('No image')
  } catch {
    // Fallback: get favicon
    try {
      const urlObj = new URL(url)
      const favicon = `${urlObj.origin}/favicon.ico`
      return NextResponse.json({ image: favicon, fallback: true })
    } catch {
      return NextResponse.json({ image: null }, { status: 500 })
    }
  }
}
