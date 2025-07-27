import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(request) {
  try {
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // 🚫 Limit sai OTP
    const failKey = `otp_fail:${email}`;
    const failed = await redis.incr(failKey);
    if (failed === 1) await redis.expire(failKey, 600); // 10 phút

    if (failed > 5) {
      return NextResponse.json({ error: 'Too many failed attempts. Please request a new OTP.' }, { status: 429 });
    }

    const redisKey = `otp:${email}`;
    const savedOtp = await redis.get(redisKey);

    if (!savedOtp) {
      return NextResponse.json({ error: 'OTP expired or not found' }, { status: 400 });
    }

    if (savedOtp.toString().trim() !== otp.toString().trim()) {
      return NextResponse.json({ error: 'Incorrect OTP' }, { status: 400 });
    }

    // ✅ Xác minh đúng → đặt cờ, xóa OTP + reset sai
    await redis.set(`otp_verified:${email}`, 'true', { ex: 600 });
    await redis.del(redisKey);
    await redis.del(failKey);

    console.log(`✅ OTP verified for ${email}`);
    return NextResponse.json({ message: 'OTP verified successfully' });

  } catch (error) {
    console.error('❌ verify error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
