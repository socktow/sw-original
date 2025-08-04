import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const countSchema = new Schema({
  name: { type: String, required: true, unique: true }, // Ví dụ: 'user', 'forum', 'comment'

  // Tùy theo mục đích:
  current: { type: Number, default: 0 }, // Dùng cho auto-increment
  total: { type: Number, default: 0 },   // Tổng số tạo ra (nếu bạn cần phân biệt)
  updatedAt: { type: Date, default: Date.now },
});

export const Count = models.Count || model("Count", countSchema);
