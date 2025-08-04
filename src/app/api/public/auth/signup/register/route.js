import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/user.model';
import { Count } from '@/models/count.model'; // thêm dòng này
import { redis } from '@/lib/redis';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    const { username, email, password, role } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const verified = await redis.get(`otp_verified:${email}`);
    if (!verified) {
      return NextResponse.json({ error: 'Please verify your email first' }, { status: 403 });
    }
    await redis.del(`otp_verified:${email}`);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    await connectMongo();

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return NextResponse.json({ error: 'Email or username already exists' }, { status: 409 });
    }

    // Tạo customId từ Count model
    const userCounter = await Count.findOneAndUpdate(
      { name: 'user' },
      { $inc: { current: 1 }, $set: { updatedAt: new Date() } },
      { upsert: true, new: true }
    );

    const customId = `U${userCounter.current}`;
    const hashedPassword = await bcrypt.hash(password, 12);
    const allowedRoles = ['user', 'mod', 'admin'];
    const safeRole = allowedRoles.includes(role) ? role : 'user';

    const newUser = new User({
      customId,
      username,
      email,
      password: hashedPassword,
      role: safeRole,
      avatar: {
        url: "/static/img/test/avatar.gif", // ép chắc chắn
      },
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, username, email, role: safeRole },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      {
        success: true,
        user: {
          id: newUser._id,
          customId,
          username,
          email,
          role: safeRole,
          createdAt: newUser.createdAt,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
