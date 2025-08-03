import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserFromToken } from "@/lib/auth/server/user.server";
import { connectMongo } from "@/lib/mongodb";
import { User } from "@/models/user.model";

export async function POST(request) {
  try {
    const { oldPassword, newPassword } = await request.json();
    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu mới phải có ít nhất 6 ký tự" },
        { status: 400 }
      );
    }
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json(
        { error: "Không tìm thấy thông tin người dùng" },
        { status: 401 }
      );
    }
    await connectMongo();
    const userDoc = await User.findById(user.id).select('+password');
    if (!userDoc) {
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }
    const isOldPasswordValid = await bcrypt.compare(oldPassword, userDoc.password);
    if (!isOldPasswordValid) {
      return NextResponse.json(
        { error: "Mật khẩu cũ không đúng" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    userDoc.password = hashedNewPassword;
    await userDoc.save();

    return NextResponse.json(
      { message: "Đổi mật khẩu thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi đổi mật khẩu" },
      { status: 500 }
    );
  }
}
