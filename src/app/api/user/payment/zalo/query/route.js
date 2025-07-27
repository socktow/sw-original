// src/app/api/payment/zalo/query/route.js
import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { Order } from '@/models/order.model';

export async function POST(req) {
  try {
    const { ordernumberstr } = await req.json();

    if (!ordernumberstr) {
      return NextResponse.json({ error: "Thiếu mã đơn hàng" }, { status: 400 });
    }

    await connectMongo();

    const order = await Order.findOne({ app_trans_id: ordernumberstr }).lean();

    if (!order) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 });
    }

    return NextResponse.json({
      userId: order.userId,
      username: order.username,
      app_trans_id: order.app_trans_id,
      zp_trans_id: order.zp_trans_id,
      method: order.method,
      status: order.status,
      description: order.description,
      zalo_response: {
        amount: order.zalo_response?.amount || null,
        item: order.zalo_response?.item || null,
        zp_trans_id: order.zalo_response?.zp_trans_id || null,
        server_time: order.zalo_response?.server_time || null,
        discount_amount: order.zalo_response?.discount_amount || null, 
        qr_code: order.zalo_response?.qr_code || null
      }
    });
  } catch (err) {
    console.error("Lỗi khi truy vấn đơn hàng:", err);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
