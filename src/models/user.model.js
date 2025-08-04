import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      unique: true,
      required: true,
    },

    // Tài khoản cơ bản
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // không trả về mặc định
    },
    
    role: {
      type: String,
      enum: ['user', 'mod', 'admin'],
      default: 'user',
    },

    // Ví tiền / điểm
    swcoin: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Hoạt động hệ thống
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    lastLogout: {
      type: Date,
    },

    // Câu hỏi bảo mật
    securityQuestion: {
      question: { type: String, default: null },
      answer: { type: String, default: null }, // nên hash nếu sensitive
    },

    // Tùy chọn cá nhân
    receivePromotions: {
      type: Boolean,
      default: true,
    },

    // Avatar
    avatar: {
      url: { type: String, default: "/static/img/test/avatar.gif" },
      frame: { type: String, default: null },
    },

    // Tài khoản game
    gameAccount: {
      isActivated: { type: Boolean, default: false },
      accountId: { type: String, default: null },
      gamePassword: { type: String, select: false, default: null }, // nên hash
    },

    // Forum activity
    forum: {
      createdTopics: { type: Number, default: 0 },
      leftComments: { type: Number, default: 0 },
      receivedLikes: { type: Number, default: 0 },
      bookmarkedTopics: { type: Number, default: 0 },
      sanction: { type: String, default: 'None' },
    },

    // Thống kê liên hệ
    inquiryStats: {
      total: { type: Number, default: 0 },
      answered: { type: Number, default: 0 },
      notAnswered: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt & updatedAt
  }
);

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
