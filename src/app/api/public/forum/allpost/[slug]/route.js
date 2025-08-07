import { connectMongo } from "@/lib/mongodb";
import Forum from "@/models/forum.model";
import mongoose from "mongoose";

export async function GET(request) {
  const slug = request.nextUrl.pathname.split("/").pop();

  if (!mongoose.Types.ObjectId.isValid(slug)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  await connectMongo();
  const post = await Forum.findById(slug).lean();

  if (!post) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  return Response.json({ post, cache: false });
}
