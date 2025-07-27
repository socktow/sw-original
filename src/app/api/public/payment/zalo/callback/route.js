import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
import { connectMongo } from '@/lib/mongodb';
import { Order } from '@/models/order.model';
import { User } from '@/models/user.model';
import { UserPayment } from '@/models/userpayment.model';

export async function POST(request) {
  try {
    const body = await request.json();
    const { data: dataStr, mac: reqMac } = body;
    const { ZALO_KEY2 } = process.env;

    // Kiểm tra MAC
    const mac = CryptoJS.HmacSHA256(dataStr, ZALO_KEY2).toString();

    if (reqMac !== mac) {
      return NextResponse.json({
        return_code: -1,
        return_message: 'mac not equal',
      });
    }

    const data = JSON.parse(dataStr);
    console.log('📥 ZaloPay callback:', data.app_trans_id);

    await connectMongo();
    const order = await Order.findOne({ app_trans_id: data.app_trans_id });

    if (!order) {
      console.warn('⚠️ Không tìm thấy Order:', data.app_trans_id);
      return NextResponse.json({
        return_code: 1,
        return_message: 'Order not found, but acknowledged',
      });
    }

    // Cập nhật trạng thái đơn hàng
    order.status = String(data.status) === '1' ? 'fail' : 'success';
    order.zalo_response = data;
    await order.save();

    if (order.status === 'success') {
      const item = JSON.parse(data.item)[0][0];

      // Lưu vào UserPayment
      await UserPayment.create({
        userId: order.userId,
        username: order.username,
        app_trans_id: data.app_trans_id,
        amount: order.amount,
        method: order.method,
        paidAt: order.updatedAt,
        app_user: data.app_user,
        item,
        discount_amount: data.discount_amount || 0,
      });

      console.log('✅ Đã lưu UserPayment:', data.app_trans_id);

      // Cộng coin vào tài khoản User
      const coinsToAdd = item.coins || 0;
      const user = await User.findById(order.userId);

      if (user) {
        user.swcoin += coinsToAdd;
        await user.save();
        console.log(`✅ Đã cộng ${coinsToAdd} swcoin cho user ${user.username}`);
      } else {
        console.warn('⚠️ Không tìm thấy user để cộng coin:', order.userId);
      }
    }

    return NextResponse.json({
      return_code: 1,
      return_message: 'success',
    });
  } catch (error) {
    console.error('❌ Callback error:', error.message);
    return NextResponse.json({
      return_code: 0,
      return_message: error.message,
    });
  }
}
