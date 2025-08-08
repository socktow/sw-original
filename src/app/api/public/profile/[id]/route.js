import { connectMongo } from "@/lib/mongodb";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Thiếu ID tác giả." }, { status: 400 });
  }

  try {
    await connectMongo();

    const user = await User.findById(id).lean();

    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy người dùng." }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.customId,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        avatar: user.avatar?.url || null,
      },
    });
  } catch (err) {
    console.error("Lỗi lấy thông tin người dùng:", err);
    return NextResponse.json({ error: "Lỗi máy chủ." }, { status: 500 });
  }
}
