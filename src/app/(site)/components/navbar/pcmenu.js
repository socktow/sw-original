"use client";
import Link from "next/link";

const PcMenu = ({ navLinks }) => {
  return (
    <ul className="hidden md:flex items-center gap-12 ml-16 text-black text-lg font-bold uppercase tracking-wide">
      {navLinks.map((link) => (
        <li
          key={link.name}
          className="relative group"
        >
          <Link
            href={link.href}
            className="px-3 py-2 font-bold text-black text-lg uppercase tracking-wider flex items-center"
            aria-label="nav-item"
          >
            <span className="relative">
              {link.name}
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </span>
          </Link>

          {/* Dropdown submenu */}
          {link.subLinks?.length > 0 && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
              <ul className="min-w-[220px] bg-white border-t-4 border-yellow-300 rounded-2xl shadow-xl py-3 px-2 text-black flex flex-col gap-1">
                {link.subLinks.map((sub) => (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      className="block w-full px-4 py-2 text-sm text-center rounded-xl transition-all duration-150 hover:bg-yellow-100 hover:text-yellow-600 hover:scale-105"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PcMenu;
