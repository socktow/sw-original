// mobilemenu.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
} from "react-icons/fa";

const MobileMenu = ({ navLinks, setIsMenuOpen }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10); // wait 10ms to enable animation
    return () => {
      clearTimeout(timer);
      setVisible(false); // reset for next open
    };
  }, []);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Side menu with slide-in animation */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold uppercase tracking-wide">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4">
          {navLinks.map((link, index) => (
            <div key={link.name} className="mb-2 border-b border-gray-100">
              <button
                onClick={() => toggleIndex(index)}
                className={`w-full flex justify-between items-center py-2 px-2 text-left font-semibold uppercase tracking-wide rounded-md transition-all duration-150 ${
                  openIndex === index
                    ? "bg-yellow-300 text-black"
                    : "text-gray-800 hover:text-yellow-600"
                }`}
              >
                <span>{link.name}</span>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {/* Sublinks */}
              <ul
                className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
                  openIndex === index
                    ? "max-h-96 opacity-100 translate-x-0"
                    : "max-h-0 opacity-0 translate-x-8"
                }`}
              >
                {link.subLinks.map((sub, subIndex) => (
                  <li
                    key={sub.name}
                    className="flex items-center gap-2 px-4 py-2 transition-all duration-300 ease-in-out"
                  >
                    <FaChevronRight className="text-sm text-yellow-400" />
                    <Link
                      href={sub.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-gray-700 hover:text-yellow-600 transition-all duration-200"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Overlay with fade-in */}
      <div
        className="md:hidden fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={() => setIsMenuOpen(false)}
      ></div>
    </>
  );
};

export default MobileMenu;
