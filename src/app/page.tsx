"use client";

import React, { useEffect, useState } from "react";

export default function SplashPage() {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 1. Start entrance animation immediately, then trigger exit animation at 3.0 seconds
    const initialExit = setTimeout(() => {
      setIsExiting(true);
    }, 3000);

    // 2. Set up a repeating 4.0-second interval to restart the entrance and exit cycle
    const interval = setInterval(() => {
      setIsExiting(false);
      const exitTimeout = setTimeout(() => {
        setIsExiting(true);
      }, 3000);
      return () => clearTimeout(exitTimeout);
    }, 4000);

    return () => {
      clearTimeout(initialExit);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center relative shared-bg m-0 overflow-hidden font-sans">
      <div className={`flex flex-col items-center justify-center logo-container ${isExiting ? "exit-animation" : ""}`}>
        <img
          src="/images/logo.png"
          alt="At Church Logo"
          className="logo-icon h-48 w-48 object-contain mb-6 drop-shadow-2xl"
        />
        <h1 className="font-serif text-5xl font-bold text-slate-100 tracking-tight text-center">
          At Church - Coptic Orthodox
        </h1>
        <p className="text-base text-slate-400 mt-2 mb-8 tracking-widest uppercase font-medium text-center">
          Anchored in Faith, Connected in Love
        </p>
        <div className="spinner"></div>
      </div>
    </div>
  );
}
