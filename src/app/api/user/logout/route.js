import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    if (token) {
      await redis.del(`token:${token}`);
    }

    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0,
      sameSite: 'lax',
    });

    return response;
  } catch (err) {
    console.error('Logout error:', err);

    const response = NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0,
      sameSite: 'lax',
    });

    return response;
  }
}
