"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit);

  const fetchUsers = async () => {
    const res = await fetch(`/api/admin/users?page=${page}&limit=${limit}`);
    const data = await res.json();
    setUsers(data.users);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const deleteUser = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa user này?")) return;
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
        <span className="text-gray-600">Tổng: {total} người</span>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-right">Coin</th>
              <th className="p-3 text-center">Role</th>
              <th className="p-3 text-center">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr
                key={u._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 text-right">{u.swcoin.toLocaleString()}</td>
                <td className="p-3 text-center">{u.role}</td>
                <td
                  className={`p-3 text-center font-medium ${
                    u.isActive ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {u.isActive ? "Hoạt động" : "Khóa"}
                </td>
                <td className="p-3 text-center flex gap-2 justify-center">
                  <Link
                    href={`/admin/users/${u._id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Trước
        </button>
        <span className="font-medium">
          Trang {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
