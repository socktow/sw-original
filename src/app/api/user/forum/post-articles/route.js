import { connectMongo } from "@/lib/mongodb";
import Forum from "@/models/forum.model";

export async function POST(request) {
  await connectMongo();
  const body = await request.json();
  // Giả sử đã có userId từ token, demo hardcode
  const authorId = body.authorId || "665b1e2f1c9d440000a00000";
  const forum = new Forum({
    title: body.title,
    content: body.content,
    mainCategory: body.mainCategory,
    subCategory: body.subCategory,
    authorId,
    imageUrl: body.imageUrl || "",
  });
  await forum.save();
  return Response.json({ success: true, post: forum });
} 