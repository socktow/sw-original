import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { redis } from '@/lib/redis';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    // 🚫 Rate limit gửi OTP
    const limitKey = `otp_send_limit:${email}`;
    const attempts = await redis.incr(limitKey);
    if (attempts === 1) await redis.expire(limitKey, 600); // 10 phút

    if (attempts > 3) {
      return NextResponse.json({ error: 'Too many OTP requests. Please wait.' }, { status: 429 });
    }

    // Tạo OTP và lưu
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpKey = `otp:${email}`;
    await redis.set(otpKey, otp, { ex: 300 }); // 5 phút

    // Ký bảo mật gửi tới mail API
    const timestamp = Math.floor(Date.now() / 1000);
    const secret = process.env.INTERNAL_SECRET;
    const mailUrl = process.env.VERCEL_SEND_OTP_URL;

    if (!secret || !mailUrl) {
      console.error('❌ Missing MAIL config');
      return NextResponse.json({ error: 'Mail configuration error' }, { status: 500 });
    }

    const raw = `${email}:${otp}:${timestamp}`;
    const signature = crypto.createHmac('sha256', secret).update(raw).digest('hex');

    //  Gửi yêu cầu tới mail server
    const response = await fetch(mailUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, timestamp, signature }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error('❌ Mail server error:', result);
      return NextResponse.json({ error: result?.error || 'Failed to send OTP' }, { status: response.status });
    }

    console.log(`✅ OTP sent to ${email}: ${otp}`);
    return NextResponse.json({ message: 'OTP sent successfully' });

  } catch (error) {
    console.error('❌ sendotp error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
