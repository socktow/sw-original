"use client";
import {
  FaRegEdit,
  FaUserCircle,
  FaEnvelope,
  FaLock,
  FaQuestionCircle,
} from "react-icons/fa";
import { BsCoin } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function DashboardMainPage() {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 border-solid"></div>
      </div>
    );
  }

  const Card = ({ title, icon, children }) => (
    <div className="col-span-1 bg-white rounded-2xl border border-yellow-300 shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 flex flex-col overflow-hidden">
      <div className="flex items-center gap-3 bg-yellow-400 px-6 py-4">
        {icon && <div className="text-2xl text-yellow-700">{icon}</div>}
        <h3 className="font-bold text-lg text-gray-900">{title}</h3>
      </div>
      <div className="flex-1 flex flex-col gap-4 px-6 py-6">{children}</div>
    </div>
  );

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between text-sm md:text-base">
      <span className="text-gray-600">{label}</span>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
      {/* BASIC INFORMATION */}
      <Card title="BASIC INFORMATION" icon={<FaUserCircle />}>
        <InfoRow label="SW Name" value={user.username || "Unknown"} />
        <InfoRow
          label="Last Logout"
          value={
            user.lastLogin
              ? new Date(user.lastLogin).toLocaleString()
              : "Unknown"
          }
        />
        <div className="flex justify-between items-center text-sm md:text-base">
          <span>S-Coin Balance</span>
          <span className="flex items-center gap-1 font-bold text-gray-900">
            {user.swcoin ?? 0} <BsCoin className="text-yellow-400" />
          </span>
        </div>
        <div className="mt-4 flex justify-center">
          {user.gameAccount?.accountId ? (
            <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold">
              GameID Active
            </span>
          ) : (
            <span className="px-4 py-2 bg-gray-400 text-white rounded-full text-sm font-semibold cursor-not-allowed">
              GameID Inactive
            </span>
          )}
        </div>
      </Card>

      {/* ACCOUNT INFORMATION */}
      <Card title="ACCOUNT INFORMATION" icon={<FaEnvelope />}>
        <InfoRow label="Email" value={user.email || "Unknown"} />
        <div className="flex justify-between items-center">
          <span>Password</span>
          <button
            onClick={() => router.push(`/dashboard/change-password`)}
            className="bg-red-400 hover:bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md transition"
          >
            <FaLock /> CHANGE
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span>Security Q and A</span>
          <span className="font-bold text-gray-900">None</span>
          <button className="bg-yellow-300 hover:bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md transition">
            <FaRegEdit /> EDIT
          </button>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <input
            type="checkbox"
            checked
            readOnly
            className="accent-yellow-400"
          />
          <span className="text-xs">Agree to receive promotional emails!</span>
        </div>
      </Card>

      {/* S-COIN */}
      <Card title="S-COIN" icon={<BsCoin />}>
        <div className="flex items-center gap-2 font-bold text-lg">
          <span>Total:</span>
          {user.swcoin ?? 0}
          <BsCoin className="text-yellow-400" />
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => router.push(`/dashboard/coin-purchase`)}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-full shadow-md text-sm"
          >
            S-COIN HISTORY
          </button>
          <button
            onClick={() => router.push(`/dashboard/coin-charge`)}
            className="flex-1 bg-red-400 hover:bg-red-500 text-white font-bold py-2 rounded-full shadow-md text-sm"
          >
            CHARGE
          </button>
        </div>
      </Card>

      {/* INQUIRY */}
      <Card title="MY INQUIRY" icon={<FaQuestionCircle />}>
        <InfoRow label="Total Inquiry" value="0" />
        <InfoRow label="Answered" value="0" />
        <InfoRow
          label="Not Answered"
          value={<span className="text-red-500 font-bold">0</span>}
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => router.push(`/dashboard/inquiry`)}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-full shadow-md text-sm"
          >
            INQUIRY HISTORY
          </button>
          <button className="flex-1 bg-red-400 hover:bg-red-500 text-white font-bold py-2 rounded-full shadow-md text-sm">
            SEND INQUIRY
          </button>
        </div>
      </Card>

      {/* FORUM ACTIVITIES */}
      <div className="col-span-1 lg:col-span-2 flex flex-col bg-white rounded-2xl border border-yellow-300 shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
        <div className="flex items-center gap-3 bg-yellow-400 px-6 py-4">
          <span className="font-bold text-lg text-gray-900">
            FORUM ACTIVITIES
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="flex flex-col items-center w-full md:w-1/4">
            <Image
              src="/static/img/test/avatar.gif"
              alt="avatar"
              width={96}
              height={96}
              className="rounded-full border-4 border-yellow-300 object-cover shadow-md hover:shadow-yellow-500 transition"
            />
            <span className="font-bold mt-2">
              {user.username || "Anonymous"}
            </span>
            <span className="text-xs text-gray-500">
              Forum Sanction: <span className="text-blue-600">None</span>
            </span>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Created\nTopics", count: 0 },
              { label: "Left\nComments", count: 0 },
              { label: "Received\nLikes", count: 0 },
              { label: "Bookmarked\nTopics", count: 0 },
            ].map(({ label, count }, idx) => (
              <div
                key={idx}
                className="bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-2 p-4 text-center text-sm font-semibold"
              >
                <span className="text-xl text-gray-900">{count}</span>
                <span className="whitespace-pre-line text-gray-700">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
