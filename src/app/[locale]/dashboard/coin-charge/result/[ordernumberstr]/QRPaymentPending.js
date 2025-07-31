import { Loader2 } from "lucide-react";
import QRCode from "react-qr-code";

export function QRPaymentPending({ qrCode, fetchResult, showReminder }) {
  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-yellow-100 to-white p-8 rounded-3xl shadow-xl text-center space-y-6">
      <div className="flex flex-col items-center space-y-3">
        <Loader2 className="w-12 h-12 animate-spin text-yellow-500" />
        <h1 className="text-2xl font-bold text-yellow-600">Chờ Thanh Toán</h1>
        <p className="text-gray-700 text-sm max-w-md">
          Vui lòng quét mã QR bên dưới bằng ứng dụng ZaloPay để hoàn tất thanh
          toán. Trạng thái sẽ tự động cập nhật.
        </p>
      </div>
      <div className="flex justify-center p-6">
        {qrCode ? (
          <QRCode value={qrCode} size={220} />
        ) : (
          <span className="text-red-600">Không tìm thấy mã QR</span>
        )}
      </div>
      <button
        onClick={() => fetchResult(true)}
        className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition shadow-md"
      >
        Kiểm Tra Trạng Thái
      </button>

      {showReminder && (
        <p className="text-xs text-red-600 font-medium mt-4 max-w-md mx-auto">
          Bạn cần hoàn thành thanh toán của mình trước. Nếu thanh toán không
          thành công, liên hệ với fanpage hoặc đường dây nóng để được hỗ trợ.
        </p>
      )}
    </div>
  );
}
