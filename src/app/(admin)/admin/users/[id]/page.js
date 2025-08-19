"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    swcoin: 0,
    isActive: true,
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    fetch(`/api/admin/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm((prev) => ({
          ...prev,
          username: data.username,
          swcoin: data.swcoin,
          isActive: data.isActive
        }));
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password && form.password !== form.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    const updateData = {
      username: form.username,
      swcoin: Number(form.swcoin),
      isActive: form.isActive,
    };

    if (form.password) {
      updateData.password = form.password;
    }

    await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    router.push("/admin/users");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Chỉnh sửa người dùng</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4"
      >
        {/* Username */}
        <div>
          <label className="block font-medium mb-1">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* SWCoin */}
        <div>
          <label className="block font-medium mb-1">SWCoin</label>
          <input
            name="swcoin"
            type="number"
            value={form.swcoin}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Trạng thái */}
        <div className="flex items-center gap-2">
          <input
            name="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={handleChange}
          />
          <span>Hoạt động</span>
        </div>

        <hr className="my-2" />

        {/* Đổi mật khẩu */}
        <div>
          <label className="block font-medium mb-1">Mật khẩu mới</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Xác nhận mật khẩu mới</label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}
