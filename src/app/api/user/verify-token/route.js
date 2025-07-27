import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ role: null, message: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ role: payload.role });
  } catch (err) {
    console.error('[Verify-Token] Invalid token:', err.message);
    return NextResponse.json({ role: null, message: 'Invalid token' });
  }
}
