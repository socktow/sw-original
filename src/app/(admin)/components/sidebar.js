"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaTachometerAlt, FaUsers, FaComments, FaNewspaper, FaCoins, FaQuestionCircle,
  FaGift, FaEnvelope, FaBan, FaNetworkWired, FaChevronDown, FaChevronRight
} from "react-icons/fa";

export default function Sidebar() {
  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (groupKey) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  const menu = [
    {
      group: "Client",
      items: [
        {
          title: "Dashboard",
          icon: <FaTachometerAlt />,
          links: [{ name: "Main", path: "/(admin)/dashboard" }]
        },
        {
          title: "Forum",
          icon: <FaComments />,
          links: [
            { name: "Quản lý bài viết", path: "/(admin)/forum" },
            { name: "Hoạt động", path: "/dashboard/forum-activity" }
          ]
        },
        {
          title: "Người dùng",
          icon: <FaUsers />,
          links: [
            { name: "Danh sách", path: "/admin/users" },
            { name: "Bảo mật Q&A", path: "/dashboard/security-q-a" }
          ]
        },
        {
          title: "Coin & Thanh toán",
          icon: <FaCoins />,
          links: [
            { name: "Lịch sử coin", path: "/admin/coin-purchase" }
          ]
        },
        {
          title: "Tin tức",
          icon: <FaNewspaper />,
          links: [{ name: "Quản lý tin tức", path: "/(admin)/news" }]
        },
        {
          title: "Hỗ trợ",
          icon: <FaQuestionCircle />,
          links: [
            { name: "FAQ", path: "/support/faq" },
            { name: "QnA", path: "/support/qna" }
          ]
        }
      ]
    },
    {
      group: "Game Manager",
      items: [
        {
          title: "Tạo Giftcode",
          icon: <FaGift />,
          links: [{ name: "Tạo Giftcode", path: "/(admin)/game/giftcode" }]
        },
        {
          title: "Gửi Thư",
          icon: <FaEnvelope />,
          links: [{ name: "Gửi Thư", path: "/(admin)/game/send-mail" }]
        },
        {
          title: "Khóa Tài khoản",
          icon: <FaBan />,
          links: [{ name: "Khóa Tài khoản", path: "/(admin)/game/ban-account" }]
        },
        {
          title: "Khóa IP",
          icon: <FaNetworkWired />,
          links: [{ name: "Khóa IP", path: "/(admin)/game/block-ip" }]
        }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        {menu.map((section, sIdx) => (
          <div key={sIdx} className="mb-6">
            <div className="text-sm uppercase text-gray-400 font-semibold mb-3">
              {section.group}
            </div>
            {section.items.map((group, idx) => {
              const isOpen = openGroups[`${section.group}-${idx}`];
              return (
                <div key={idx} className="mb-2">
                  <button
                    onClick={() => toggleGroup(`${section.group}-${idx}`)}
                    className="flex items-center justify-between w-full text-left text-gray-300 font-semibold px-2 py-1 hover:bg-gray-800 rounded"
                  >
                    <div className="flex items-center gap-2">
                      {group.icon}
                      {group.title}
                    </div>
                    {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                  </button>
                  {isOpen && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {group.links.map((link, i) => (
                        <li key={i}>
                          <Link
                            href={link.path}
                            className="block px-2 py-1 rounded hover:bg-gray-800"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
