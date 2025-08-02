"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth/client/client";

export default function Stage3Success({ onBack, email }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (username.trim().length < 3)
      return setError("Username must be at least 3 characters.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword)
      return setError("Passwords do not match.");

    setIsLoading(true);
    try {
      const result = await register({ username, password, email });
      if (result.success) setSuccess(true);
      else setError(result.error || "Registration failed");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => router.push("/signin");

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <div className="w-full max-w-md flex flex-col items-center text-center p-0">
          <div className="mt-16 mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold text-black mb-4">
              Registration Completed!
            </p>
            <div className="w-full border-t-2 border-black mb-8" />
            <p className="text-base text-gray-700 mb-6">
              Your account has been created. You can now log in and enjoy the
              game!
            </p>
            <button
              onClick={handleGoToLogin}
              className="btn-corner w-full py-4 bg-black text-white font-bold text-xl transition-all"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md p-0 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-black text-center mt-12 mb-6">
          Create Your Account
        </h1>
        <div className="w-full border-t-2 border-black mb-8" />
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm mb-4 w-full text-center">
            {error}
          </div>
        )}
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-6 w-full items-center"
        >
          <InputField
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`btn-corner w-full py-4 mt-2 mb-2 bg-black text-white font-bold text-xl transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <button
          type="button"
          onClick={onBack}
          className="text-blue-600 hover:underline text-sm mt-2 disabled:opacity-50"
          disabled={isLoading}
        >
          Back
        </button>
      </div>
    </div>
  );
}

// Reusable input component
function InputField({ id, label, type = "text", value, onChange, disabled }) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1 ml-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-3 border border-gray-400 rounded-none text-black text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all bg-white disabled:opacity-50"
        autoComplete="off"
      />
    </div>
  );
}
