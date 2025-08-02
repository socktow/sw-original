"use client";
import { useState } from "react";
import { checkEmail, sendOtp } from "@/lib/auth/client/client";

export default function Stage1Email({ onNext }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setIsLoading(true);

    try {
      // ✅ 1. Check email exists
      const checkData = await checkEmail(email);

      if (checkData.exists) {
        setIsLoading(false);
        setError("This email is already registered.");
        return;
      }

      // ✅ 2. Send OTP
      const otpData = await sendOtp(email);

      if (otpData?.error) {
        throw new Error(otpData.error);
      }

      setSuccessMessage("OTP has been sent to your email.");
      setTimeout(() => {
        onNext({ email }); // ✅ chuyển sang bước tiếp theo
      }, 1000);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-none shadow-none p-0 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-black text-center mt-12 mb-6">
          Registration
        </h1>
        <div className="w-full border-t-2 border-black mb-8"></div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm text-center mb-4 w-full">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm text-center mb-4 w-full">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleEmailSubmit}
          className="flex flex-col gap-6 w-full items-center"
        >
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1 ml-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-400 rounded-none text-black text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-150 bg-white"
              autoComplete="email"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !email}
            className="btn-corner w-full py-4 mt-2 mb-2 bg-black text-white font-bold text-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Send Email"}
          </button>
        </form>

        <div className="mt-6 text-gray-700 text-sm w-full max-w-lg">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Enter an email address that has not yet been registered in
              Soulworker.
            </li>
            <li>
              You will receive an email confirmation from{" "}
              <b>soulworker@Soulworker.com</b>.
            </li>
            <li>
              If you did not receive the verification email in your Inbox or
              Spam folder, you may have entered a wrong email address. Please
              try again.
            </li>
            <li>
              To ensure that you receive emails from us, please add{" "}
              <b>@Soulworker.com</b> to your email whitelist.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
