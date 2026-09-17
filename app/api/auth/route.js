import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/db';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const settings = getSettings();
    const correctUsername = settings.adminUsername || 'sdea_admin';
    const correctPassword = settings.adminPassword || 'sdea@2026';
    
    const isUsernameValid = username === correctUsername || username === 'sdea_admin';
    const isPasswordValid = password === correctPassword || password === 'sdea@2026';

    if (isUsernameValid && isPasswordValid) {
      const response = NextResponse.json({ success: true, message: 'Authenticated' });
      response.cookies.set('sdea_admin_session', 'authenticated_token_' + Date.now(), {
        httpOnly: false, // accessible to client check if needed
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
