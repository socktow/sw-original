import { connectMongo } from "@/lib/mongodb";
import Forum from "@/models/forum.model";
import { redis } from "@/lib/redis";
import mongoose from "mongoose";

export async function GET(request) {
  const slug = request.nextUrl.pathname.split("/").pop();

  if (!mongoose.Types.ObjectId.isValid(slug)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const cacheKey = `forum:post:${slug}`;
  const cached = await redis.get(cacheKey);

  if (cached && typeof cached === 'string' && cached.startsWith('{')) {
    try {
      const parsed = JSON.parse(cached);
      console.log("✅ Post from Redis");
      return Response.json({ post: parsed, cache: true });
    } catch (err) {
      console.error("❌ Cache corrupted, removing key.", err);
      await redis.del(cacheKey);
    }
  } else if (cached) {
    console.error("❌ Non-JSON cache detected, removing key.");
    await redis.del(cacheKey);
  }
  await connectMongo();
  const post = await Forum.findById(slug).lean();

  if (!post) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  await redis.set(cacheKey, JSON.stringify(post), { ex: 900 });

  console.log("💾 Saved post to Redis cache");

  return Response.json({ post, cache: false });
}
