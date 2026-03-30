import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    // No code — send error back to CMS via postMessage
    const html = `<!DOCTYPE html>
<html><head><title>Auth Error</title></head>
<body><script>
  window.opener && window.opener.postMessage(
    'authorization:github:error:missing_code',
    window.location.origin
  );
  window.close();
</script></body></html>`
    return new Response(html, { headers: { 'Content-Type': 'text/html' } })
  }

  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    })

    const tokenData = await tokenRes.json()

    if (tokenData.error || !tokenData.access_token) {
      const html = `<!DOCTYPE html>
<html><head><title>Auth Error</title></head>
<body><script>
  window.opener && window.opener.postMessage(
    'authorization:github:error:${tokenData.error || 'auth_failed'}',
    window.location.origin
  );
  window.close();
</script></body></html>`
      return new Response(html, { headers: { 'Content-Type': 'text/html' } })
    }

    // Success — send token back to CMS via postMessage
    const token = tokenData.access_token
    const html = `<!DOCTYPE html>
<html><head><title>Authorized</title></head>
<body><script>
  window.opener && window.opener.postMessage(
    'authorization:github:success:' + JSON.stringify({ token: '${token}', provider: 'github' }),
    window.location.origin
  );
  window.close();
</script>
<p>Authorized! You can close this window.</p>
</body></html>`
    return new Response(html, { headers: { 'Content-Type': 'text/html' } })
  } catch (e) {
    const html = `<!DOCTYPE html>
<html><head><title>Auth Error</title></head>
<body><script>
  window.opener && window.opener.postMessage(
    'authorization:github:error:server_error',
    window.location.origin
  );
  window.close();
</script></body></html>`
    return new Response(html, { headers: { 'Content-Type': 'text/html' } })
  }
}
