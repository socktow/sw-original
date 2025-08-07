import { connectMongo } from "@/lib/mongodb";
import Forum from "@/models/forum.model";
import mongoose from "mongoose";

export async function POST(request) {
  await connectMongo();
  const body = await request.json();
  const { title, content, mainCategory, subCategory, authorId, imageUrl } = body;
  if (
    !title ||
    !content ||
    !mainCategory ||
    !subCategory ||
    !authorId ||
    !mongoose.Types.ObjectId.isValid(authorId)
  ) {
    return Response.json(
      { error: "Thiếu hoặc sai dữ liệu đầu vào" },
      { status: 400 }
    );
  }

  try {
    const forum = new Forum({
      title,
      content,
      mainCategory,
      subCategory,
      authorId,
      imageUrl: imageUrl || "",
    });
    await forum.save();
    return Response.json({ success: true, post: forum });
  } catch (error) {
    return Response.json(
      { error: "Không thể tạo bài viết", details: error.message },
      { status: 500 }
    );
  }
}