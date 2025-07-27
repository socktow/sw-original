import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/user.model';
import { redis } from '@/lib/redis';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  const token = cookies().get('token')?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    const userId = payload.userId;
    const redisUserId = await redis.get(`token:${token}`);
    if (!redisUserId || redisUserId !== userId) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    await connectMongo();
    const user = await User.findById(userId)
      .select('username email swcoin gameAccount lastLogin') 
      .lean();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error('Auth/me error:', err);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
