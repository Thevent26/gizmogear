import { NextRequest } from 'next/server'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const provider = searchParams.get('provider')

  if (provider === 'github') {
    // Redirect to GitHub OAuth
    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      scope: 'repo,user',
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://gizmogear.vercel.app'}/api/auth/callback`,
    })
    return Response.redirect(`https://github.com/login/oauth/authorize?${params}`)
  }

  return new Response('Unknown provider', { status: 400 })
}
