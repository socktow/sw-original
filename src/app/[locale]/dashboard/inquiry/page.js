"use client";
import { FaQuestionCircle } from "react-icons/fa";

export default function InquiryPage() {
  const inquiries = [
    { id: 1, subject: "Không nhận được S-Coin", status: "Đã trả lời", date: "2025-07-01" },
    { id: 2, subject: "Lỗi đăng nhập", status: "Chưa trả lời", date: "2025-06-29" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto min-h-[700px] p-4 md:p-8 flex flex-col">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-yellow-500 flex items-center gap-2">
        <FaQuestionCircle className="text-yellow-600 text-2xl" /> LỊCH SỬ HỎI ĐÁP
      </h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="bg-yellow-100 text-gray-700 text-left">
              <th className="py-3 px-4">Chủ đề</th>
              <th className="py-3 px-4">Trạng thái</th>
              <th className="py-3 px-4">Ngày gửi</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0 hover:bg-yellow-50 transition">
                <td className="py-3 px-4">{item.subject}</td>
                <td className={`py-3 px-4 font-bold ${item.status === "Đã trả lời" ? "text-green-600" : "text-red-500"}`}>
                  {item.status}
                </td>
                <td className="py-3 px-4">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs md:text-sm text-gray-500">
        Nếu bạn có thắc mắc, vui lòng vào mục <span className="font-bold text-yellow-500">Inquiry</span> để được hỗ trợ.
      </div>
    </div>
  );
}
