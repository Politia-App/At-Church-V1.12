"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function SplashPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [targetRoute, setTargetRoute] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check auth status to decide destination
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTargetRoute(user ? "/dashboard" : "/login");
    });

    // 2. Start entrance animation immediately, then trigger exit animation at 2.5 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    // 3. Perform redirect at 3.3 seconds
    const redirectTimer = setTimeout(() => {
      if (targetRoute) {
        router.push(targetRoute);
      } else {
        // Fallback if auth state hasn't resolved
        router.push("/login");
      }
    }, 3300);

    return () => {
      unsubscribe();
      clearTimeout(exitTimer);
      clearTimeout(redirectTimer);
    };
  }, [targetRoute, router]);

  return (
    <div
      className="flex h-screen w-screen items-center justify-center relative shared-bg m-0 overflow-hidden font-sans"
    >
      <div
        className={`flex flex-col items-center justify-center logo-container ${
          isExiting ? "exit-animation" : ""
        }`}
      >
        <img
          src="/images/logo.png"
          alt="At Church Logo"
          className="logo-icon h-48 w-48 object-contain mb-6 drop-shadow-2xl"
        />
        <h1 className="font-serif text-5xl font-bold text-gray-900 tracking-tight text-center">
          At Church - Coptic Orthodox
        </h1>
        <p className="text-base text-gray-600 mt-2 mb-8 tracking-widest uppercase font-medium text-center">
          Anchored in Faith, Connected in Love
        </p>
        <div className="spinner"></div>
      </div>
    </div>
  );
}
