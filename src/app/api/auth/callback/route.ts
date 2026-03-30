import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const sendMessage = (msg: string) => `<!DOCTYPE html>
<html><head><title>Authenticating...</title></head>
<body>
<script>
(function() {
  function send() {
    if (window.opener) {
      window.opener.postMessage('${msg}', '*');
      setTimeout(function() { window.close(); }, 500);
    } else {
      setTimeout(send, 100);
    }
  }
  send();
})();
</script>
<p>Authenticating...</p>
</body></html>`

  if (!code) {
    return new Response(sendMessage('authorization:github:error:missing_code'), {
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
      return new Response(sendMessage(`authorization:github:error:${tokenData.error || 'auth_failed'}`), {
        headers: { 'Content-Type': 'text/html' }
      })
    }

    const token = tokenData.access_token
    const content = JSON.stringify({ token, provider: 'github' })
    const successMsg = `authorization:github:success:${content}`

    return new Response(sendMessage(successMsg), {
      headers: { 'Content-Type': 'text/html' }
    })
  } catch {
    return new Response(sendMessage('authorization:github:error:server_error'), {
      headers: { 'Content-Type': 'text/html' }
    })
  }
}
