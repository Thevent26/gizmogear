import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = 'Ov23liHBbaF52UeGN7On';
const CLIENT_SECRET = 'c8fca94d3f6666a3c2a78cae878adb40133bca8b';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error_description }, { status: 400 });
    }

    const accessToken = tokenData.access_token;

    // Return HTML that posts the token back to Decap CMS
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Authorizing...</title>
</head>
<body>
  <script>
    (function() {
      const token = "${accessToken}";
      
      if (window.opener) {
        window.opener.postMessage(
          'authorization:github:success:{"token":"' + token + '","provider":"github"}',
          '*'
        );
        setTimeout(function() { window.close(); }, 500);
      } else {
        document.body.innerHTML = '<p>Authorization successful! You can close this window.</p>';
      }
    })();
  </script>
</body>
</html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('OAuth error:', error);
    return NextResponse.json({ error: 'OAuth failed' }, { status: 500 });
  }
}
