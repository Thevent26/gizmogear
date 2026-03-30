import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return new Response(buildPage('error', 'missing_code', null), {
      headers: { 'Content-Type': 'text/html' }
    })
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
      return new Response(buildPage('error', tokenData.error || 'auth_failed', null), {
        headers: { 'Content-Type': 'text/html' }
      })
    }

    return new Response(buildPage('success', null, tokenData.access_token), {
      headers: { 'Content-Type': 'text/html' }
    })
  } catch (e) {
    return new Response(buildPage('error', 'server_error', null), {
      headers: { 'Content-Type': 'text/html' }
    })
  }
}

function buildPage(status: 'success' | 'error', error: string | null, token: string | null) {
  // Safely encode the payload as JSON in a data attribute — no JS injection risk
  const payload = status === 'success'
    ? JSON.stringify({ token, provider: 'github' })
    : null

  const message = status === 'success'
    ? `authorization:github:success:${payload}`
    : `authorization:github:error:${error}`

  // Encode message as base64 to safely pass through HTML attribute
  const encoded = Buffer.from(message).toString('base64')

  return `<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body>
<div id="msg" data-msg="${encoded}"></div>
<script>
(function() {
  var encoded = document.getElementById('msg').getAttribute('data-msg');
  var msg = atob(encoded);
  
  function send() {
    if (window.opener) {
      window.opener.postMessage(msg, '*');
      document.body.innerHTML = '<p>Authenticated! Closing...</p>';
      setTimeout(function() { window.close(); }, 1000);
    } else {
      setTimeout(send, 200);
    }
  }
  
  send();
})();
</script>
<p>Authenticating, please wait...</p>
</body>
</html>`
}
