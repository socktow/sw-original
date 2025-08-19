import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { User } from "@/models/user.model";

// 📌 GET all users (with pagination)
export async function GET(request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const users = await User.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await User.countDocuments();

    return NextResponse.json({ total, page, limit, users });
  } catch (err) {
    console.error("Admin Users GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}