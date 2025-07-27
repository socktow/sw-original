import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { UserPayment } from "@/models/userpayment.model";
import { getUserFromToken } from "@/lib/auth/server/user.server";

export async function GET(request) {
  const user = await getUserFromToken();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const payments = await UserPayment.find({ userId: user.id })
      .sort({ paidAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await UserPayment.countDocuments({ userId: user.id });

    return NextResponse.json({
      total,
      page,
      limit,
      payments,
    });
  } catch (err) {
    console.error("Payment history error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
