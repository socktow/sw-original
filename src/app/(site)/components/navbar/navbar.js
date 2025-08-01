"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import PcMenu from "./pcmenu";
import MobileMenu from "./mobilemenu";
import UserLoginSection from "./UserLoginSection";
import { useLanguage } from "@/app/hooks/useLanguage";
import Image from "next/image";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const user = useSelector((state) => state.user.user);

  const navLinks = [
    {
      name: t("navbar.news"),
      href: `/news`,
      subLinks: [
        { name: t("navbar.news_latest"), href: `/news?type=0` },
        { name: t("navbar.news_notice"), href: `/news?type=1` },
        { name: t("navbar.news_maintenance"), href: `/news?type=2` },
        { name: t("navbar.news_update"), href: `/news?type=3` },
        { name: t("navbar.news_shop"), href: `/news?type=4` },
        { name: t("navbar.news_event"), href: `/news?type=5` },
        { name: t("navbar.news_gm_video"), href: `/news?type=6` },
      ],
    },
    {
      name: t("navbar.about"),
      href: `/game-introduction`,
      subLinks: [
        { name: t("navbar.about_game"), href: `/game-introduction` },
        { name: t("navbar.about_guide"), href: `/game-guide` },
        { name: t("navbar.about_character"), href: `/character` },
      ],
    },
    {
      name: t("navbar.forum"),
      href: `/forum/home`,
      subLinks: [
        { name: t("navbar.forum_home"), href: `/forum/home` },
        { name: t("navbar.forum_discussion"), href: `/forum/discussion` },
        { name: t("navbar.forum_tips"), href: `/forum/game-tips` },
        { name: t("navbar.forum_qa"), href: `/forum/qa` },
        { name: t("navbar.forum_art"), href: `/forum/art-media` },
      ],
    },
    {
      name: t("navbar.download"),
      href: `/game-download`,
      subLinks: [],
    },
    {
      name: t("navbar.support"),
      href: `/support/faq`,
      subLinks: [
        { name: t("navbar.support_faq"), href: `/support/faq` },
        { name: t("navbar.support_qna"), href: `/support/qna` },
      ],
    },
  ];

  const MobileUserSection = ({ user, setIsMenuOpen }) => (
    <div className="pt-6 border-t border-gray-200">
      {user ? (
        <Link
          onClick={() => setIsMenuOpen(false)}
          href={`/account`}
          className="block px-4 py-2 font-bold bg-yellow-300 text-center rounded-xl hover:bg-yellow-400 transition"
        >
          {t("navbar.account")}
        </Link>
      ) : (
        <div className="flex flex-col gap-2">
          <Link
            onClick={() => setIsMenuOpen(false)}
            href={`/signin`}
            className="block px-4 py-2 font-bold text-center rounded-xl bg-gray-100 hover:bg-yellow-100"
          >
            {t("navbar.login")}
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            href={`/signup`}
            className="block px-4 py-2 font-bold text-center rounded-xl bg-yellow-300 hover:bg-yellow-400"
          >
            {t("navbar.signup")}
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
          <Link href={`/home-page`} className="flex-shrink-0">
            <Image
              src="/static/img/main_logo.png"
              alt="logo"
              width={120}
              height={48}
              className="h-12 w-auto"
            />
          </Link>

          <div className="ml-8 hidden md:block">
            <PcMenu navLinks={navLinks} />
          </div>
        </div>

        <div className="ml-auto hidden md:block">
          <UserLoginSection user={user} />
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden ml-auto flex items-center gap-3">
          {!user && (
            <Link href={`/signin`} aria-label="Login">
              <Image
                src="/static/img/icon-register.png"
                alt="login"
                width={20}
                height={20}
                className="object-cover"
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
