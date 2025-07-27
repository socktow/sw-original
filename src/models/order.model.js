// models/order.model.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    app_trans_id: {
      type: String,
      required: true,
      unique: true,
    },
    zp_trans_id: {
      type: String,
      default: null, 
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ['QR', 'ATM', 'Credit', 'Unknown'],
      default: 'Unknown',
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'fail'],
      default: 'pending',
    },
    description: {
      type: String,
    },
    zalo_response: {
      type: Object, // lưu full response từ ZaloPay (tùy chọn)
    },
  },
  {
    timestamps: true, // tự động thêm createdAt và updatedAt
  }
);

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
