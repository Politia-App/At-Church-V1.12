"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const { t, dir } = useLanguage();
  const [displayName, setDisplayName] = useState("User");
  const [initials, setInitials] = useState("U");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let name = user.email || "User";
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.englishName) name = data.englishName;
            else if (data.arabicName) name = data.arabicName;
            else if (data.username) name = data.username;
            else if (data.phone) name = data.phone;
          }
        } catch (err) {
          console.error("Error fetching user data for sidebar:", err);
        }
        setDisplayName(name);
        
        const generatedInitials = name
          .split(" ")
          .filter((n) => n.length > 0)
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase();
        setInitials(generatedInitials || "U");
      } else {
        setDisplayName("Guest");
        setInitials("G");
      }
    });

    return () => unsubscribe();
  }, []);

  const navItems = [
    { href: "/dashboard", labelKey: "nav_dashboard", icon: "fa-solid fa-house" },
    { href: "/bookings", labelKey: "nav_bookings", icon: "fa-solid fa-calendar-days" },
    { href: "/katameros", labelKey: "nav_katameros", icon: "fa-solid fa-book-bible" },
    { href: "/community", labelKey: "nav_community", icon: "fa-solid fa-users" },
    { href: "/settings", labelKey: "nav_settings", icon: "fa-solid fa-gear" },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""} z-[100]`}>
      <div className="sidebar-header">
        <div className="logo-wrapper">
          <div className="logo-icon-small">
            <i className="fa-solid fa-cross"></i>
          </div>
          <span className="logo-text">AT CHURCH</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              <i className={item.icon}></i>
              <span>{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <span className="user-name">{displayName}</span>
            <span className="user-role">Member</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
