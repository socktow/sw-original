// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Dùng jose thay vì jsonwebtoken để tương thích edge/middleware

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function getRoleFromToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.role;
  } catch (err) {
    console.error('[Middleware] Token verify error:', err.message);
    return null;
  }
}

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const publicPaths = ['/api/public', '/api/user/verify-token'];
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!token) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ message: 'Unauthorized: No token' }, { status: 401 });
    }
    return NextResponse.redirect(`${BASE_URL}/signin`);
  }

  const role = await getRoleFromToken(token);

  if (!role) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 403 });
    }
    return NextResponse.redirect(`${BASE_URL}/signin`);
  }

  // Role check
  if ((pathname.startsWith('/api/admin') || pathname.startsWith('/admin')) && role !== 'admin') {
    return pathname.startsWith('/api')
      ? NextResponse.json({ message: 'Forbidden: Admin only' }, { status: 403 })
      : NextResponse.redirect(`${BASE_URL}/`);
  }

  if ((pathname.startsWith('/api/user') || pathname.startsWith('/dashboard')) && !['admin', 'user'].includes(role)) {
    return pathname.startsWith('/api')
      ? NextResponse.json({ message: 'Forbidden: User only' }, { status: 403 })
      : NextResponse.redirect(`${BASE_URL}/signin`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/api/:path*'],
};
