import { connectMongo } from "@/lib/mongodb";
import Forum from "@/models/forum.model";

export async function GET() {
  await connectMongo();
  const posts = await Forum.find({}).sort({ createdAt: -1 }).limit(50).lean();
  return Response.json({ posts, cache: false });
}
