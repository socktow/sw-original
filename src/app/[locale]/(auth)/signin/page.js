"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth/client/logevent";
import { useLanguage } from "../../../hooks/useLanguage";
export default function LoginPage() {
  const { t } = useLanguage();
  const user = null;
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (user === undefined) return;
    if (user) {
      router.replace("/dashboard/main");
    }
  }, [user, router]);
  if (user === undefined) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  if (user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError(t('login.error_fill_fields') || 'Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const result = await signIn({ email, password });
      if (result.success) {
        router.push("/dashboard/main"); // ✅ Redirect duy nhất sau login
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-none shadow-none p-0 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-black text-center mt-12 mb-6">
          {t("login.title")}
        </h1>
        <div className="w-full border-t-2 border-black mb-10"></div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm text-center mb-4 w-full">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full px-2 md:px-0 items-center"
        >
          {/* Email */}
          <div className="w-full max-w-lg">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1 ml-1"
            >
              {t("login.email")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-400 rounded-none text-black"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="w-full max-w-lg">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1 ml-1"
            >
              {t("login.password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-400 rounded-none text-black"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-corner w-full max-w-lg py-4 mt-2 mb-2 bg-black text-white font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : t('login.button')}
          </button>
        </form>

        <ul className="flex justify-center gap-8 mt-8 mb-8 text-black text-base w-full">
          <li>
            <a href="#" className="hover:underline">
              {t("login.find_account")}
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              {t("login.find_password")}
            </a>
          </li>
          <li>
            <a href="/signup" className="hover:underline">
              {t("login.create_account")}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
