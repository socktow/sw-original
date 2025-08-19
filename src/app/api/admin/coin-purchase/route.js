import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { Order } from "@/models/order.model";

export async function GET(request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const orders = await Order.find({ status: "success" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Order.countDocuments({ status: "success" });

    return NextResponse.json({
      total,
      page,
      limit,
      orders,
    });
  } catch (err) {
    console.error("Admin payment history error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
