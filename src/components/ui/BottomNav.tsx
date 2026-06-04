"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/home", icon: "home" },
    { name: "Search", href: "/search", icon: "search" },
    { name: "Orders", href: "/orders", icon: "receipt_long" },
    { name: "Profile", href: "/profile", icon: "person" },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 z-[999]">
      <div className="max-w-md mx-auto flex justify-around items-center px-4 pb-8 pt-4 bg-zinc-950/90 backdrop-blur-xl rounded-t-[2.5rem] shadow-[0_-12px_24px_rgba(0,0,0,0.4)] border-x border-zinc-800/30">
        
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);

          return (
            <Link
              key={item.name}
              prefetch={true}
              href={item.href}
              className={
                isActive
                  ? "flex flex-col items-center justify-center bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-full px-5 py-2 scale-105 -translate-y-1 transition-transform duration-200 shadow-md shadow-orange-600/30"
                  : "flex flex-col items-center justify-center text-zinc-500 p-2 hover:text-orange-400 transition-colors duration-200"
              }
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className="material-symbols-outlined"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className={`font-body text-[10px] uppercase tracking-wider mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
        
      </div>
    </nav>
  );
}
