"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { QRPaymentPending } from "./QRPaymentPending";
import { PaymentResult } from "./PaymentResult";
import { handleZaloQuery } from '@/lib/payment/zalopay';

export default function ZaloPayResult() {
  const { ordernumberstr } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showReminder, setShowReminder] = useState(false);

  const fetchResult = async (showNotify = true) => {
    setLoading(true);
    if (!showNotify) setShowReminder(false);

    try {
      const json = await handleZaloQuery({ ordernumberstr });
      setData(json);

      if (json?.status === "pending" && showNotify) {
        setShowReminder(true);
      }
    } catch (err) {
      console.error("Lỗi khi lấy kết quả giao dịch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!ordernumberstr) return;

    fetchResult(false);

    const interval = setInterval(() => {
      fetchResult(false);
    }, 5000);

    if (data?.status && data.status !== "pending") {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [ordernumberstr, data?.status]);

  let item = null;
  try {
    const raw = data?.zalo_response?.item;
    if (raw) {
      const arr = JSON.parse(raw);
      item = arr?.[0]?.[0] || null;
    }
  } catch {
    item = null;
  }

  const amount = data?.zalo_response?.amount || 0;
  const discount = data?.zalo_response?.discount_amount || 0;
  const paidAmount = amount - discount;
  const coins = item?.coins || 0;
  const quantity = item?.itemquantity || 1;
  const totalCoins = coins * quantity;
  const packName = item?.itemname || "-";
  const qrCode = data?.zalo_response?.qr_code || "";
  const username = data?.username || "-";
  const appTransId = data?.app_trans_id || "-";
  const method = data?.method === "QR" ? "Ngân hàng (QR)" : data?.method;
  const time = data?.zalo_response?.server_time
    ? new Date(data.zalo_response.server_time).toLocaleString("vi-VN")
    : "-";

  if (loading && !data) {
    return (
      <div className="flex justify-center items-center p-10">
        <span>Đang tải thông tin giao dịch...</span>
      </div>
    );
  }

  if (!data || !data.status) {
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">
        Đang truy xuất Data
      </div>
    );
  }

  if (data.status === "pending") {
    return (
      <QRPaymentPending
        qrCode={qrCode}
        fetchResult={fetchResult}
        showReminder={showReminder}
      />
    );
  }

  const isSuccess = data.status === "success";
  const statusText = isSuccess
    ? "THANH TOÁN THÀNH CÔNG"
    : "THANH TOÁN THẤT BẠI";
  const reasonText = isSuccess
    ? "Cảm ơn bạn đã thanh toán. Giao dịch đã hoàn tất!"
    : "Hệ thống đang có lỗi, giao dịch thất bại hoặc bị hủy.";

  return (
    <PaymentResult
      isSuccess={isSuccess}
      username={username}
      packName={packName}
      quantity={quantity}
      totalCoins={totalCoins}
      amount={amount}
      discount={discount}
      paidAmount={paidAmount}
      appTransId={appTransId}
      method={method}
      time={time}
      statusText={statusText}
      reasonText={reasonText}
    />
  );
}
