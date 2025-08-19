"use client";

import { useEffect, useState } from "react";

export default function CoinPurchasePage() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/coin-purchase?page=${pageNumber}&limit=${limit}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch orders");
      setOrders(data.orders);
      setTotal(data.total);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  const getStatusBadge = (status) => {
    const styles = {
      success: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      fail: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded ${styles[status] || "bg-gray-100 text-gray-800"}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📜 Lịch sử thanh toán (Tất cả user)</h1>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Mã GD</th>
                <th className="px-4 py-2 border">Số tiền</th>
                <th className="px-4 py-2 border">Phương thức</th>
                <th className="px-4 py-2 border">Trạng thái</th>
                <th className="px-4 py-2 border">Mô tả</th>
                <th className="px-4 py-2 border">Tạo lúc</th>
                <th className="px-4 py-2 border">Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o) => (
                  <tr key={o._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border font-medium">{o.username}</td>
                    <td className="px-4 py-2 border">{o.app_trans_id}</td>
                    <td className="px-4 py-2 border text-right">
                      {o.amount.toLocaleString("vi-VN")} đ
                    </td>
                    <td className="px-4 py-2 border">{o.method}</td>
                    <td className="px-4 py-2 border text-center">{getStatusBadge(o.status)}</td>
                    <td className="px-4 py-2 border text-gray-600">{o.description}</td>
                    <td className="px-4 py-2 border">
                      {new Date(o.createdAt).toLocaleString("vi-VN")}
                    </td>
                    <td className="px-4 py-2 border">
                      {new Date(o.updatedAt).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center p-4 text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          ⬅ Trước
        </button>
        <span>
          Trang {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Sau ➡
        </button>
      </div>
    </div>
  );
}
