"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";

export default function DashboardPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [displayName, setDisplayName] = useState("User");

  // Bookings interaction states
  const [bookedStatus, setBookedStatus] = useState<Record<string, boolean>>({
    sunday: false,
    wednesday: false,
    feast: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (language === "ar-eg" && data.arabicName) {
              setDisplayName(data.arabicName);
            } else if (data.englishName) {
              setDisplayName(data.englishName);
            } else if (data.username) {
              setDisplayName(data.username);
            } else {
              setDisplayName(user.email || "User");
            }
          } else {
            setDisplayName(user.email || "User");
          }
        } catch (err) {
          console.error("Error fetching user data in dashboard:", err);
        }
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router, language]);

  const handleBookSpace = (dayKey: string) => {
    setBookedStatus((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey],
    }));
  };

  if (loading) {
    return (
      <div
        className="flex h-screen w-screen items-center justify-center relative shared-bg m-0 overflow-hidden font-sans"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="spinner"></div>
          <p className="text-sm mt-4 text-gray-500">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Panel */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content Area */}
        <main className="main-content fade-in">
          {/* Welcome Banner */}
          <div className="mb-8">
            <h1 className="coptic-title text-4xl text-[var(--text-primary)] mb-2">
              <span data-translate-key="welcome">{t("welcome")}</span>{" "}
              <span className="user-name text-[var(--accent)]">
                {displayName}
              </span>
            </h1>
            <p className="text-[var(--text-secondary)] text-base" data-translate-key="blessing">
              {t("blessing")}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <section className="stats-grid">
            <div className="glass-card stat-card">
              <div className="stat-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">June 14</span>
                <span className="stat-label" data-translate-key="next_liturgy">
                  {t("next_liturgy")}
                </span>
              </div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-icon accent">
                <i className="fa-solid fa-hands-praying"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">June 18</span>
                <span className="stat-label" data-translate-key="confession">
                  {t("confession")}
                </span>
              </div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-icon">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">2 / Month</span>
                <span className="stat-label" data-translate-key="reserved">
                  {t("reserved")}
                </span>
              </div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-icon accent">
                <i className="fa-solid fa-cross"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">Coptic Youth</span>
                <span className="stat-label" data-translate-key="class_group">
                  {t("class_group")}
                </span>
              </div>
            </div>
          </section>

          {/* Featured Section (Quote and Katameros Readings) */}
          <section className="hero-section">
            {/* Quote Card */}
            <div className="glass-card quote-card">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xs text-[var(--accent-light)] uppercase tracking-wider mb-4">
                    <i className="fa-solid fa-feather-pointed"></i> <span data-translate-key="wisdom_title">{t("wisdom_title")}</span>
                  </h3>
                  <p className="quote-text" data-translate-key="wisdom_quote">
                    {t("wisdom_quote")}
                  </p>
                </div>
                <span className="quote-author" data-translate-key="wisdom_author">
                  {t("wisdom_author")}
                </span>
              </div>
            </div>

            {/* Katameros Card */}
            <div className="glass-card katameros-card">
              <div>
                <h3 className="card-title">
                  <i className="fa-solid fa-book-bible"></i> <span data-translate-key="katameros_title">{t("katameros_title")}</span>
                </h3>
                <div className="katameros-verse">
                  <strong className="text-[var(--accent)]" data-translate-key="psalm_heading">
                    {t("psalm_heading")}
                  </strong>
                  <p className="italic mt-1" data-translate-key="psalm_text">
                    {t("psalm_text")}
                  </p>
                </div>
                <div className="katameros-verse mb-0">
                  <strong className="text-[var(--accent)]" data-translate-key="john_heading">
                    {t("john_heading")}
                  </strong>
                  <p className="italic mt-1" data-translate-key="john_text">
                    {t("john_text")}
                  </p>
                </div>
              </div>
              <a href="#" className="btn btn-outline btn-sm mt-4 self-start">
                <span data-translate-key="read_full">{t("read_full")}</span> <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </section>

          {/* Bookings & Announcements Board */}
          <div className="bookings-grid grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Book Divine Liturgy */}
            <section className="glass-card">
              <h3 className="card-title mb-5">
                <i className="fa-solid fa-calendar-check"></i> <span data-translate-key="book_liturgy">{t("book_liturgy")}</span>
              </h3>

              <div className="booking-list">
                <div className="booking-item">
                  <div className="booking-info">
                    <span className="booking-date" data-translate-key="sunday_liturgy">
                      {t("sunday_liturgy")}
                    </span>
                    <span className="booking-title" data-translate-key="main_hall">
                      {t("main_hall")}
                    </span>
                    <span className="booking-capacity" data-translate-key="capacity_120">
                      {t("capacity_120")}
                    </span>
                  </div>
                  <button
                    className={`btn btn-sm ${bookedStatus.sunday ? "btn-outline" : "btn-accent"}`}
                    onClick={() => handleBookSpace("sunday")}
                  >
                    {bookedStatus.sunday ? "Booked ✓" : t("book_space")}
                  </button>
                </div>

                <div className="booking-item">
                  <div className="booking-info">
                    <span className="booking-date" data-translate-key="wednesday_liturgy">
                      {t("wednesday_liturgy")}
                    </span>
                    <span className="booking-title" data-translate-key="chapel">
                      {t("chapel")}
                    </span>
                    <span className="booking-capacity" data-translate-key="capacity_15">
                      {t("capacity_15")}
                    </span>
                  </div>
                  <button
                    className={`btn btn-sm ${bookedStatus.wednesday ? "btn-outline" : "btn-accent"}`}
                    onClick={() => handleBookSpace("wednesday")}
                  >
                    {bookedStatus.wednesday ? "Booked ✓" : t("book_space")}
                  </button>
                </div>

                <div className="booking-item">
                  <div className="booking-info">
                    <span className="booking-date" data-translate-key="feast_liturgy">
                      {t("feast_liturgy")}
                    </span>
                    <span className="booking-title" data-translate-key="sanctuary">
                      {t("sanctuary")}
                    </span>
                    <span className="booking-capacity" data-translate-key="capacity_45">
                      {t("capacity_45")}
                    </span>
                  </div>
                  <button
                    className={`btn btn-sm ${bookedStatus.feast ? "btn-outline" : "btn-accent"}`}
                    onClick={() => handleBookSpace("feast")}
                  >
                    {bookedStatus.feast ? "Booked ✓" : t("book_space")}
                  </button>
                </div>
              </div>
            </section>

            {/* Notice Board */}
            <section className="glass-card flex flex-col justify-between">
              <div>
                <h3 className="card-title mb-5">
                  <i className="fa-solid fa-bullhorn"></i> <span data-translate-key="notice_board">{t("notice_board")}</span>
                </h3>

                <div className="flex flex-col gap-5">
                  <div className="border-b border-[var(--border-color)] pb-3">
                    <span className="text-xs text-[var(--accent)] font-semibold uppercase" data-translate-key="retreat_badge">
                      {t("retreat_badge")}
                    </span>
                    <h4 className="font-sans text-sm mt-0.5 text-[var(--text-primary)]" data-translate-key="retreat_title">
                      {t("retreat_title")}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-1" data-translate-key="retreat_text">
                      {t("retreat_text")}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-[var(--accent)] font-semibold uppercase" data-translate-key="bible_badge">
                      {t("bible_badge")}
                    </span>
                    <h4 className="font-sans text-sm mt-0.5 text-[var(--text-primary)]" data-translate-key="bible_title">
                      {t("bible_title")}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-1" data-translate-key="bible_text">
                      {t("bible_text")}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="text-[0.85rem] text-[var(--accent)] font-semibold inline-flex items-center gap-1 mt-4 self-start"
              >
                <span data-translate-key="view_notices">{t("view_notices")}</span>{" "}
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </a>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
