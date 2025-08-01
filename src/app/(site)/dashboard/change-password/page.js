"use client";
import { useState } from "react";
import { FaLock } from "react-icons/fa";

export default function ChangePasswordPage() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!oldPass || !newPass || !confirmPass) {
      setMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (newPass !== confirmPass) {
      setMessage("Mật khẩu mới không khớp.");
      return;
    }
    setMessage("Đổi mật khẩu thành công!");
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
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
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg text-lg transition"
        >
          Xác nhận đổi mật khẩu
        </button>
        {message && (
          <div className="mt-2 text-center font-semibold text-green-600">{message}</div>
        )}
      </form>
    </div>
  );
}