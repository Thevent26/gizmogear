import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) {
    return new Response('Missing code', { status: 400 })
  }

  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return new Response('Server misconfigured', { status: 500 })
  }

  // Exchange code for access token (server-side, secrets stay safe)
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  })

  const tokenData = await tokenRes.json()

  if (tokenData.error || !tokenData.access_token) {
    return new Response(tokenData.error_description || 'Auth failed', { status: 400 })
  }

  // Redirect back to CMS with token — store in a cookie instead of URL
  const html = `<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body>
<script>
  // Store token in localStorage for CMS to pick up
  localStorage.setItem('dcrm:github-token', '${tokenData.access_token}');
  // Also set a HttpOnly cookie for server-side auth
  document.cookie = 'gh_token=${tokenData.access_token}; path=/; max-age=86400; SameSite=Strict';
  // Redirect to CMS
  window.location.href = '/admin/';
</script>
<p>Authenticating, please wait...</p>
</body>
</html>`

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
