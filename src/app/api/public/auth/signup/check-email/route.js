// src/app/(site)/api/auth/signup/check-email/route.js
import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/user.model';

export async function POST(request) {
  const { email } = await request.json();
  await connectMongo();
  const user = await User.findOne({ email });
  return NextResponse.json({ exists: !!user });
} 