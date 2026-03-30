import { NextResponse } from 'next/server';

// GitHub OAuth App credentials
const CLIENT_ID = 'Ov23liHBbaF52UeGN7On';
const REDIRECT_URI = 'https://gizmogear.vercel.app/api/auth/callback';

export async function GET() {
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('scope', 'repo user');
  
  return NextResponse.redirect(authUrl.toString());
}
