import { connectMongo } from "@/lib/mongodb";
import Forum from "@/models/forum.model";
import { redis } from "@/lib/redis";

export async function GET() {
  const redisKey = 'forum:allpost';
  const cached = await redis.get(redisKey);
  if (cached) {
    return Response.json({ posts: cached, cache: true });
  }
  await connectMongo();
  const posts = await Forum.find({}).sort({ createdAt: -1 }).limit(50).lean();
  await redis.set(redisKey, JSON.stringify(posts), { ex: 1800 });
  return Response.json({ posts, cache: false });
}
