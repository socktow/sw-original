"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import PcMenu from "./pcmenu";
import MobileMenu from "./mobilemenu";
// import UserLoginSection from "./UserLoginSection";
// import { useUser } from "@/app/UserProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = null;

  const navLinks = [
    {
      name: "News",
      href: "/news",
      subLinks: [
        { name: "Latest News", href: "/news?type=0" },
        { name: "Notice", href: "/news?type=1" },
        { name: "Maintenance", href: "/news?type=2" },
        { name: "Updates", href: "/news?type=3" },
        { name: "Shop", href: "/news?type=4" },
        { name: "Event", href: "/news?type=5" },
        { name: "GM Video", href: "/news?type=6" },
      ],
    },
    {
      name: "About",
      href: "/game-introduction",
      subLinks: [
        { name: "Game", href: "/game-introduction" },
        { name: "Play Guide", href: "/game-guide" },
        { name: "Character", href: "/character" },
      ],
    },
    {
      name: "Forum",
      href: "/forum/home",
      subLinks: [
        { name: "Forum Home", href: "/forum/home" },
        { name: "General Discussion", href: "/forum/discussion" },
        { name: "Game Tips", href: "/forum/game-tips" },
        { name: "Q & A", href: "/forum/qa" },
        { name: "Art & Media", href: "/forum/art-media" },
      ],
    },
    {
      name: "Download",
      href: "/game-download",
      subLinks: [],
    },
    {
      name: "Support",
      href: "/support/faq",
      subLinks: [
        { name: "FAQ", href: "/support/faq" },
        { name: "1:1 Inquiry", href: "/support/qna" },
      ],
    },
  ];

  const MobileUserSection = ({ user, setIsMenuOpen }) => (
    <div className="pt-6 border-t border-gray-200">
      {user ? (
        <Link
          onClick={() => setIsMenuOpen(false)}
          href="/account"
          className="block px-4 py-2 font-bold bg-yellow-300 text-center rounded-xl hover:bg-yellow-400 transition"
        >
          Account
        </Link>
      ) : (
        <div className="flex flex-col gap-2">
          <Link
            onClick={() => setIsMenuOpen(false)}
            href="/signin"
            className="block px-4 py-2 font-bold text-center rounded-xl bg-gray-100 hover:bg-yellow-100"
          >
            Login
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            href="/signup"
            className="block px-4 py-2 font-bold text-center rounded-xl bg-yellow-300 hover:bg-yellow-400"
          >
            Create Account
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="w-full py-4 px-4 flex items-center">
        {/* Logo + Menu */}
        <div className="flex items-center">
          {/* Logo sát trái */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/static/img/main_logo.png"
              alt="logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* PC Menu ngay cạnh logo */}
          <div className="ml-8 hidden md:block">
            <PcMenu navLinks={navLinks} />
          </div>
        </div>

        {/* User section sát phải */}
        <div className="ml-auto hidden md:block">
          <UserLoginSection user={user} />
        </div>

        {/* Mobile hamburger (ẩn trên PC) */}
        <div className="md:hidden ml-auto flex items-center gap-3">
          {!user && (
            <Link href="/signin" aria-label="Login">
              <img
                className="h-5 w-5 object-cover"
                src="/static/img/icon-register.png"
                alt="login"
              />
            </Link>
          )}

          <button
            className="text-black"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <MobileMenu
          navLinks={navLinks}
          user={user}
          setIsMenuOpen={setIsMenuOpen}
          MobileUserSection={MobileUserSection}
        />
      )}
    </header>
  );
};

export default Navbar;
