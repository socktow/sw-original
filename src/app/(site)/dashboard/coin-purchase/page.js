"use client";
import { useEffect, useState } from "react";
import { BsCoin } from "react-icons/bs";
import { useSelector } from "react-redux";
import { handleHistory } from "@/lib/payment/zalopay";

const PAGE_SIZE = 10;

export default function CoinPurchasePage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user)

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await handleHistory(page, PAGE_SIZE);
      setData(result.payments || []);
      setTotalPages(Math.ceil((result.total || 0) / PAGE_SIZE));
    } catch (err) {
      console.error("Fetch error:", err);
      setData([]);
      setTotalPages(1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="w-full max-w-7xl mx-auto min-h-[700px] p-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
          <BsCoin className="text-yellow-400" /> N-COIN HISTORY
        </h1>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-full shadow transition-all">
          CHARGE
        </button>
      </div>

      {/* Total Coin */}
      <div className="flex items-center gap-2 mb-8 text-lg font-bold">
        <span>Total N-Coin:</span>
        <span className="flex items-center gap-1 text-yellow-500">
          <BsCoin className="text-yellow-400" /> {user.swcoin}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        {loading ? (
          <div className="text-center p-10">Loading...</div>
        ) : (
          <table className="w-full table-fixed text-sm mb-2">
            <thead>
              <tr className="bg-yellow-100 text-gray-700">
                <th className="py-2 px-2 w-[18%]">Order ID</th>
                <th className="py-2 px-2 w-[12%]">Method</th>
                <th className="py-2 px-2 w-[20%]">Item</th>
                <th className="py-2 px-2 w-[15%]">Coins</th>
                <th className="py-2 px-2 w-[15%]">Price (₫)</th>
                <th className="py-2 px-2 w-[20%]">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">No data found.</td>
                </tr>
              ) : data.map((item) => (
                <tr key={item._id} className="border-b last:border-b-0 text-center">
                  <td className="py-2 px-2">{item.app_trans_id}</td>
                  <td className="py-2 px-2">{item.method || "-"}</td>
                  <td className="py-2 px-2">{item.item?.itemname || "N/A"}</td>
                  <td className="py-2 px-2 text-green-600 font-bold">
                    +{item.item?.coins?.toLocaleString() || "0"}
                  </td>
                  <td className="py-2 px-2 font-bold">
                    {((item.amount || 0) - (item.discount_amount || 0)).toLocaleString()}₫
                  </td>
                  <td className="py-2 px-2">
                    {item.paidAt ? new Date(item.paidAt).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="px-2 py-1">{page} / {totalPages}</span>
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
