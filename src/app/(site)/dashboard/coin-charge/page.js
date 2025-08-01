"use client";
import { useState } from "react";
import { BsCoin } from "react-icons/bs";
import { FaCreditCard, FaUniversity, FaQrcode, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { handleZaloPayPayment } from '@/lib/payment/zalopay';

const swCardPackages = [
  { id: 1, coins: 575, bonus: 0, price: 85000 },
  { id: 2, coins: 1380, bonus: 105, price: 195000 },
  { id: 3, coins: 2800, bonus: 275, price: 385000 },
  { id: 4, coins: 4500, bonus: 475, price: 610000 },
  { id: 5, coins: 6500, bonus: 750, price: 870000 },
  { id: 6, coins: 13500, bonus: 1975, price: 1800000 },
  { id: 7, coins: 33500, bonus: 3750, price: 4400000 },
  { id: 8, coins: 60200, bonus: 9500, price: 7500000 },
];

export default function CoinPurchasePage() {
  const [tab, setTab] = useState("swcard");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [redeemCode, setRedeemCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("QR");
  const [showMoreMethods, setShowMoreMethods] = useState(false);
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const packages = tab === "swcard" ? swCardPackages : swCardPackages;
  const totalPrice = selectedPackage ? selectedPackage.price : 0;
  const totalCoins = selectedPackage ? selectedPackage.coins + selectedPackage.bonus : 0;

  const handleTabChange = (value) => {
    setTab(value);
    setSelectedPackage(null);
    setPaymentMethod(value === "swcard" ? "swcard" : "QR");
    setShowMoreMethods(false);
  };

  const handlePayNow = async () => {
    if (!selectedPackage || tab !== "zalopay") return;
    setLoading(true);
    try {
      const data = await handleZaloPayPayment({
        amount: selectedPackage.price,
        method: paymentMethod,
        item: [
          {
            itemid: selectedPackage.id, // ID gốc của gói
            itemname: `Gói coin ${selectedPackage.coins + selectedPackage.bonus}`,
            itemprice: selectedPackage.price,
            itemquantity: 1,
            coins: selectedPackage.coins + selectedPackage.bonus,
            packid: selectedPackage.id, // hoặc giữ lại nếu bạn muốn rõ ràng
          }
        ],
      });
      const transactionId = data.ordernumberstr || data.app_trans_id;
      if (transactionId) {
        router.push(`/dashboard/coin-charge/result/${transactionId}`);
      } else {
        alert("❌ Tạo đơn hàng thất bại!");
      }
    } catch (e) {
      alert("❌ Lỗi kết nối tới server!");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#faf7f4] py-8 px-2 flex justify-center items-start">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Character Info */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-bold text-lg mb-2">1. Character Information</h2>
            <div className="font-semibold text-base mb-1 text-gray-600">Account ID: {user?.username}</div>
          </div>

          {/* Package Selection */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-bold text-lg mb-4">2. Select Package</h2>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => handleTabChange("swcard")}
                className={`px-5 py-2 rounded font-semibold border-b-4 transition-all ${tab === "swcard"
                    ? "border-orange-400 bg-orange-50 text-orange-600"
                    : "border-transparent text-gray-500 bg-gray-50 hover:text-orange-500"
                  }`}
              >
                SwCard
              </button>
              <button
                onClick={() => handleTabChange("zalopay")}
                className={`px-5 py-2 rounded font-semibold border-b-4 transition-all ${tab === "zalopay"
                    ? "border-orange-400 bg-orange-50 text-orange-600"
                    : "border-transparent text-gray-500 bg-gray-50 hover:text-orange-500"
                  }`}
              >
                ZaloPay / ATM / Credit Card
              </button>
            </div>

            {/* Package Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  layout
                  className={`relative bg-[#0d1b2a] rounded-lg p-4 flex flex-col items-center border-2 transition-all cursor-pointer hover:shadow-lg ${selectedPackage?.id === pkg.id
                      ? "border-orange-400 ring-2 ring-orange-200"
                      : "border-transparent"
                    }`}
                  onClick={() => setSelectedPackage(pkg)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="coin" className="w-12 h-12 mb-2" />
                  <div className="text-yellow-300 font-bold text-lg flex items-center gap-1">
                    <BsCoin className="text-yellow-400" />
                    {pkg.coins}{" "}
                    {pkg.bonus > 0 && <span className="text-green-400 text-sm font-semibold">+ {pkg.bonus} Bonus</span>}
                  </div>
                  <div className="text-white text-sm mb-2">Package {pkg.coins + pkg.bonus} RP</div>
                  <div className="text-orange-400 font-bold text-base mb-2">{pkg.price.toLocaleString()} VND</div>
                  <button className="absolute bottom-3 right-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold">+</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 sticky top-8 min-w-[320px]">
          <h2 className="font-bold text-lg mb-2">3. Order Summary</h2>

          {selectedPackage ? (
            <div className="text-gray-700 text-base font-medium mb-2">
              Selected:{" "}
              <span className="text-orange-600 font-semibold">
                Package {totalCoins} RP – {totalPrice.toLocaleString()} VND
              </span>
            </div>
          ) : (
            <div className="text-sm text-gray-400 mb-2">No package selected</div>
          )}

          {/* Payment Methods */}
          {tab === "swcard" ? (
            <div>
              <div className="font-semibold mb-2">Payment Method</div>
              <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-orange-400 bg-orange-50 cursor-pointer">
                <input type="radio" name="paymentMethod" checked disabled className="accent-orange-500" />
                <img src="https://static.zingpay.vn/images/logo-zing.png" alt="SoulWorker" className="h-5 inline" />
                <span className="font-semibold text-gray-800">SoulWorker</span>
              </label>
              <div className="mt-3">
                <label className="block text-sm font-medium mb-1">Redeem Code</label>
                <input
                  type="text"
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="Enter redeem code"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="font-semibold mb-2">Payment Method</div>

              <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-orange-400 bg-orange-50">
                <FaQrcode className="text-blue-500 text-xl" />
                <span className="font-semibold text-gray-800">ZaloPay</span>
                <span className="ml-auto text-sm text-orange-500 font-medium">(Default)</span>
              </div>


              <button
                onClick={() => setShowMoreMethods((prev) => !prev)}
                className="text-sm text-orange-500 font-medium mt-2 flex items-center gap-1"
              >
                {showMoreMethods ? <FaChevronUp /> : <FaChevronDown />}
                {showMoreMethods ? "Hide" : "More methods"}
              </button>

              <AnimatePresence>
                {showMoreMethods && (
                  <motion.div
                    className="flex flex-col gap-2 mt-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className={`flex items-center gap-3 p-3 rounded-lg border-2 ${paymentMethod === "QR" ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-300"} cursor-pointer`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="QR"
                        checked={paymentMethod === "QR"}
                        onChange={() => setPaymentMethod("QR")}
                        className="accent-orange-500"
                      />
                      <FaUniversity className="text-blue-600 text-xl" />
                      <span className="font-semibold text-gray-800">QR Code</span>
                    </label>

                    <label className={`flex items-center gap-3 p-3 rounded-lg border-2 ${paymentMethod === "ATM" ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-300"} cursor-pointer`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="ATM"
                        checked={paymentMethod === "ATM"}
                        onChange={() => setPaymentMethod("ATM")}
                        className="accent-orange-500"
                      />
                      <FaUniversity className="text-green-600 text-xl" />
                      <span className="font-semibold text-gray-800">ATM Bank</span>
                    </label>

                    <label className={`flex items-center gap-3 p-3 rounded-lg border-2 ${paymentMethod === "Credit" ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-300"} cursor-pointer`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Credit"
                        checked={paymentMethod === "Credit"}
                        onChange={() => setPaymentMethod("Credit")}
                        className="accent-orange-500"
                      />
                      <FaCreditCard className="text-purple-500 text-xl" />
                      <span className="font-semibold text-gray-800">Credit Card</span>
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Summary */}
          <div className="font-semibold mb-2 mt-4">Payment Summary</div>
          <div className="bg-gray-50 rounded-lg p-4 mb-2">
            <div className="flex justify-between items-center text-base font-bold">
              <span>Total</span>
              <span className="text-orange-500">{totalPrice.toLocaleString()} VND</span>
            </div>
          </div>

          <button
            className={`w-full py-3 rounded-lg font-bold text-lg transition-all mt-2 ${selectedPackage
                ? "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            disabled={!selectedPackage || (tab === "zalopay" && loading)}
            onClick={tab === "zalopay" ? handlePayNow : undefined}
          >
            {tab === "zalopay" && loading ? "Đang tạo đơn hàng..." : "Pay Now"}
          </button>

          <div className="text-xs text-gray-400 mt-2">
            By clicking “Pay Now,” you agree this transaction is non-refundable and you accept our{" "}
            <a href="#" className="underline">Terms of Use</a> and{" "}
            <a href="#" className="underline">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
