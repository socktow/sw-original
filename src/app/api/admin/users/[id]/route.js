import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { User } from "@/models/user.model";

// 📌 GET user by ID
export async function GET(_, { params }) {
  try {
    await connectMongo();
    const user = await User.findById(params.id).lean();
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (err) {
    console.error("Admin Users GET ID error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 📌 UPDATE user
export async function PUT(request, { params }) {
  try {
    await connectMongo();
    const body = await request.json();
    const updated = await User.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Admin Users PUT error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 📌 DELETE user
export async function DELETE(_, { params }) {
  try {
    await connectMongo();
    const deleted = await User.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Admin Users DELETE error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
