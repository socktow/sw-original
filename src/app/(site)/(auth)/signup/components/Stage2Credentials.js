"use client";
import { useState } from "react";
import { verifyOtp , sendOtp } from "@/lib/auth/client/client";

export default function Stage2Credentials({ email, onNext, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResent(true);
    }, 1200);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setOtpError("");

    if (otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await verifyOtp(email, otp);
      if (!res.error) {
        onNext({ verified: true });
      } else {
        setOtpError(res.message || res.error || "Invalid OTP. Please check your email and try again.");
      }
    } catch (err) {
      setOtpError("Verification failed. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-none shadow-none p-0 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-black text-center mt-12 mb-6">Email Verification</h1>
        <div className="w-full border-t-2 border-black mb-8"></div>
        <div className="w-full max-w-lg text-gray-700 text-base mb-6">
          <p className="mb-2">We have sent a 6-digit OTP code to <b>{email}</b>.</p>
          <ul className="list-disc pl-5 space-y-1 mb-2">
            <li>Please enter the OTP code below to verify your email address.</li>
            <li>If you did not receive the OTP, you can resend it.</li>
          </ul>
        </div>
        {resent && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm text-center mb-4 w-full">OTP resent!</div>
        )}
        <form onSubmit={handleNext} className="flex flex-col gap-4 w-full max-w-lg items-center">
          <div className="w-full flex items-center gap-2">
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-3 border border-gray-400 rounded-none text-black text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-150 bg-white text-center tracking-widest"
              placeholder="Enter OTP"
              maxLength={6}
              autoComplete="one-time-code"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className=" py-2 px-2 bg-black text-white font-bold text-[11px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resending..." : "Resend OTP"}
            </button>
          </div>
          {otpError && <div className="text-red-600 text-sm w-full text-center">{otpError}</div>}
          <button
            type="submit"
            className="btn-corner w-full py-4 mt-2 bg-black text-white font-bold text-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || otp.length !== 6}
          >
            Next
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-blue-600 hover:underline text-sm mt-2"
          >
            Back to Email Entry
          </button>
        </form>
      </div>
    </div>
  );
} 