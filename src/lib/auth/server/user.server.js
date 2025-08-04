import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import { connectMongo } from "@/lib/mongodb";
import { User } from "@/models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = await redis.get(`token:${token}`);
    if (!userId || userId !== decoded.userId) return null;

    await connectMongo();
    const dbUser = await User.findById(decoded.userId).lean();
    if (!dbUser) return null;

    return {
      id: dbUser._id.toString(),
      username: dbUser.username,
      email: dbUser.email,
      swcoin: dbUser.swcoin,
      gameAccount: dbUser.gameAccount,
      lastLogin: dbUser.lastLogin,
      avatar: dbUser.avatar.url,
    };
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
