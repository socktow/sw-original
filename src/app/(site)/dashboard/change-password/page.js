"use client";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { changePassword } from "@/lib/auth/client/client";

export default function ChangePasswordPage() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset message
    setMessage("");
    setMessageType("");

    // Validation
    if (!oldPass || !newPass || !confirmPass) {
      setMessage("Vui lòng điền đầy đủ thông tin.");
      setMessageType("error");
      return;
    }

    if (newPass.length < 6) {
      setMessage("Mật khẩu mới phải có ít nhất 6 ký tự.");
      setMessageType("error");
      return;
    }

    if (newPass !== confirmPass) {
      setMessage("Mật khẩu mới không khớp.");
      setMessageType("error");
      return;
    }

    if (oldPass === newPass) {
      setMessage("Mật khẩu mới không được trùng với mật khẩu cũ.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      await changePassword({
        oldPassword: oldPass,
        newPassword: newPass,
      });

      setMessage("Đổi mật khẩu thành công!");
      setMessageType("success");
      setOldPass("");
      setNewPass("");
      setConfirmPass("");
    } catch (error) {
      setMessage(error.message || "Có lỗi xảy ra khi đổi mật khẩu.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg border mt-8 p-8">
      <h1 className="text-2xl font-bold mb-6 text-yellow-500 flex items-center gap-2">
        <FaLock /> ĐỔI MẬT KHẨU
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Mật khẩu cũ</label>
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={oldPass}
            onChange={e => setOldPass(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Mật khẩu mới</label>
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={newPass}
            onChange={e => setNewPass(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Nhập lại mật khẩu mới</label>
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={confirmPass}
            onChange={e => setConfirmPass(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-bold py-3 rounded-lg text-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500 text-black"
          }`}
        >
          {loading ? "Đang xử lý..." : "Xác nhận đổi mật khẩu"}
        </button>
        {message && (
          <div className={`mt-2 text-center font-semibold ${
            messageType === "success" ? "text-green-600" : "text-red-600"
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}