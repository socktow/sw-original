import mongoose from "mongoose";

const userPaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },

  app_trans_id: { type: String, required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },

  paidAt: { type: Date, required: true },

  app_user: { type: String, required: true },
  item: { type: Object, required: true },
  discount_amount: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
});

export const UserPayment =
  mongoose.models.UserPayment ||
  mongoose.model("UserPayment", userPaymentSchema);
