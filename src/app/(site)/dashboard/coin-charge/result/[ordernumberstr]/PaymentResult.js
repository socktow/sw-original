import { CheckCircle, XCircle } from "lucide-react";
export function PaymentResult({
  isSuccess,
  username,
  packName,
  quantity,
  totalCoins,
  amount,
  discount,
  paidAmount,
  appTransId,
  method,
  time,
  statusText,
  reasonText,
}) {
  const icon = isSuccess ? (
    <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
  ) : (
    <XCircle className="w-12 h-12 text-red-500 mx-auto" />
  );

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-green-100 to-white p-8 rounded-3xl shadow-xl text-center space-y-6">
      {icon}
      <h1
        className={`text-3xl font-bold ${
          isSuccess ? "text-green-600" : "text-red-600"
        }`}
      >
        {statusText}
      </h1>

      <div className="bg-white rounded-2xl shadow-md p-6 text-left text-gray-700 space-y-3">
        <div className="flex justify-between font-medium">
          <span>ID nhân vật:</span>
          <span>{username}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Gói nạp:</span>
          <span>
            {packName} x{quantity}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Tổng coin nhận:</span>
          <span className="font-semibold text-yellow-700">
            {totalCoins.toLocaleString()} coin
          </span>
        </div>
        <div className="flex justify-between">
          <span>Giá gốc:</span>
          <span>{amount.toLocaleString()} VND</span>
        </div>
        <div className="flex justify-between">
          <span>Giảm giá:</span>
          <span>-{discount.toLocaleString()} VND</span>
        </div>
        <div className="flex justify-between">
          <span>Đã thanh toán:</span>
          <span className="font-semibold">
            {paidAmount.toLocaleString()} VND
          </span>
        </div>
        <div className="flex justify-between">
          <span>Mã giao dịch:</span>
          <span>{appTransId}</span>
        </div>
        <div className="flex justify-between">
          <span>Phương thức:</span>
          <span>{method}</span>
        </div>
        <div className="flex justify-between">
          <span>Thời gian:</span>
          <span>{time}</span>
        </div>
        <div className="pt-3">
          <div className="font-semibold">Ghi chú:</div>
          <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800">
            {reasonText}
          </div>
        </div>
      </div>

      <a
        href="/dashboard/coin-charge"
        className="w-full block text-center py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition shadow-md"
      >
        Nạp Thêm
      </a>
      <div className="text-xs text-gray-500">
        Cần hỗ trợ? Liên hệ{" "}
        <a href="#" className="underline text-orange-600">
          CSKH
        </a>
        .
      </div>
    </div>
  );
}
