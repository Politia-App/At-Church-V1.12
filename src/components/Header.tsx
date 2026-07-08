"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage, Language } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface HeaderProps {
  toggleSidebar: () => void;
}

const languageNames: Record<Language, string> = {
  "en-us": "English (US)",
  "en-gb": "English (UK)",
  "ar-eg": "العربية",
  "fr": "Français",
  "de": "Deutsch",
};

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [displayName, setDisplayName] = useState("User");
  const [userEmail, setUserEmail] = useState("");
  const [initials, setInitials] = useState("U");

  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email || "");
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
          console.error("Error loading user in header:", err);
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
      }
    });

    return () => unsubscribe();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" id="menu-toggle" onClick={toggleSidebar} title="Toggle Sidebar" aria-label="Toggle Sidebar">
          <i className="fa-solid fa-bars"></i>
        </button>
        <h2 className="coptic-title text-xl text-[var(--text-primary)]">
          {t("dashboard_header")}
        </h2>
      </div>

      <div className="header-right">
        {/* Theme Toggle */}
        <button className="action-btn theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme" aria-label="Toggle Theme">
          <i className={theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
        </button>

        {/* Language Select Dropdown */}
        <div className="relative" ref={langRef}>
          <button className="action-btn" onClick={() => setLangDropdownOpen(!langDropdownOpen)} title="Change Language" aria-label="Change Language">
            <i className="fa-solid fa-globe"></i>
          </button>
          {langDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 shadow-lg z-[110]">
              {(Object.keys(languageNames) as Language[]).map((lang) => (
                <button
                  key={lang}
                  className={`flex w-full items-center px-4 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] text-inherit ${
                    language === lang ? "font-bold text-[var(--accent)]" : ""
                  }`}
                  onClick={() => {
                    setLanguage(lang);
                    setLangDropdownOpen(false);
                  }}
                >
                  {languageNames[lang]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <button className="action-btn" title="Notifications" aria-label="Notifications">
          <i className="fa-solid fa-bell"></i>
          <span className="notification-badge"></span>
        </button>

        {/* Profile Card & Dropdown */}
        <div className="relative ml-2" ref={profileRef}>
          <button
            id="profile-dropdown-btn"
            className="flex items-center gap-2 border-0 bg-transparent p-0 cursor-pointer"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <div className="user-avatar m-0">{initials}</div>
          </button>

          {profileDropdownOpen && (
            <div
              id="profile-dropdown-menu"
              className="absolute right-0 mt-2 w-64 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 shadow-lg z-[110]"
            >
              <div className="border-b border-[var(--border-color)] pb-3 mb-3">
                <span className="text-xs text-[var(--text-muted)]">
                  {t("profile_logged_in")}
                </span>
                <div className="font-semibold text-sm text-[var(--text-primary)] truncate">
                  {userEmail}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    router.push("/settings");
                  }}
                  className="flex w-full items-center gap-2 border-0 bg-transparent px-2 py-1.5 text-left text-sm text-[var(--text-secondary)] hover:color-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-md cursor-pointer text-inherit"
                >
                  <i className="fa-solid fa-user-gear"></i>
                  <span>{t("profile_settings")}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 border-0 bg-transparent px-2 py-1.5 text-left text-sm text-[var(--crimson-light)] hover:bg-[var(--bg-tertiary)] rounded-md cursor-pointer text-inherit"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>{t("profile_logout")}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
