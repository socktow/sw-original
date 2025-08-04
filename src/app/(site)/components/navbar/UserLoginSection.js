"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/lib/auth/client/logevent";

const UserLoginSection = ({ user }) => {
  return (
    <div className="hidden md:flex items-center ml-auto">
      {!user ? (
        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="flex items-center gap-2 px-4 py-2 border border-yellow-300 rounded-full text-black hover:text-yellow-300 hover:border-yellow-400 transition-all duration-150 shadow-sm bg-white"
          >
            <Image
              src="/static/img/icon-login.png"
              alt="login"
              width={20}
              height={20}
            />
            <span className="font-medium">Login</span>
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-2 px-4 py-2 border border-yellow-300 rounded-full text-black hover:text-yellow-300 hover:border-yellow-400 transition-all duration-150 shadow-sm bg-white"
          >
            <Image
              src="/static/img/icon-register.png"
              alt="register"
              width={20}
              height={20}
            />
            <span className="font-medium">Sign Up</span>
          </Link>
        </div>
      ) : (
        <div className="flex items-center border border-yellow-300 rounded-xl px-3 py-2 bg-black text-white shadow-lg min-w-[260px] h-[56px]">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-yellow-300 relative">
            <Image
              src={user?.avatar}
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-yellow-300 truncate">
              {user.username}
            </p>
            <div className="flex items-center gap-2 text-xs mt-0.5">
              <Link href="/dashboard/main" className="hover:underline">
                MY PAGE
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/dashboard/coin-charge" className="hover:underline">
                CHARGE
              </Link>
              <span className="text-gray-500">|</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
                className="hover:underline text-red-400"
              >
                LOGOUT
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLoginSection;
