"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage, Language } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { auth, db } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { churchesData } from "@/data/churches";

const languageNames: Record<Language, string> = {
  "en-us": "English (United States)",
  "en-gb": "English (United Kingdom)",
  "ar-eg": "العربية (مصر)",
  "fr": "Français",
  "de": "Deutsch",
};

export default function LoginPage() {
  const router = useRouter();
  const { t, language, setLanguage, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Tab State: "login" | "register" | "forgot"
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot">("login");
  const [alertInfo, setAlertInfo] = useState<{ message: string; type: "success" | "error" | null }>({
    message: "",
    type: null,
  });

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Forgot Form State
  const [forgotStep, setForgotStep] = useState<"identifier" | "choose" | "reset">("identifier");
  const [forgotIdentifier, setForgotIdentifier] = useState("");
  const [forgotMethod, setForgotMethod] = useState<"email" | "phone" | "">("");
  const [forgotCode, setForgotCode] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("");

  // Registration Multi-Step Wizard State
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  // Wizard fields
  const [regArabicName, setRegArabicName] = useState("");
  const [regEnglishName, setRegEnglishName] = useState("");
  const [regDob, setRegDob] = useState("");
  const [regGender, setRegGender] = useState("");
  
  // Phone/WhatsApp Verification
  const [regCountryCode, setRegCountryCode] = useState("+20");
  const [regPhone, setRegPhone] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [smsSending, setSmsSending] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneOtpError, setPhoneOtpError] = useState("");

  // Email Verification
  const [regEmail, setRegEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Education
  const [regEducation, setRegEducation] = useState("");

  // Address & Geolocation
  const [regAddress, setRegAddress] = useState("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [fetchingCoords, setFetchingCoords] = useState(false);

  // Church selection
  const [selectedGov, setSelectedGov] = useState("");
  const [selectedMarkaz, setSelectedMarkaz] = useState("");
  const [selectedChurch, setSelectedChurch] = useState("");
  const [churchSearch, setChurchSearch] = useState("");
  const [tempChurches, setTempChurches] = useState<string[]>([]);

  // Profile Photo
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoZoom, setPhotoZoom] = useState(1);
  const [photoRotation, setPhotoRotation] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  // Dynamic style updates to avoid inline style warnings
  useEffect(() => {
    if (previewImgRef.current) {
      previewImgRef.current.style.transform = `rotate(${photoRotation}deg) scale(${photoZoom})`;
    }
  }, [photoRotation, photoZoom]);

  const getProgressWidthClass = (step: number) => {
    const classes = [
      "w-0",
      "w-[10%]",
      "w-[20%]",
      "w-[30%]",
      "w-[40%]",
      "w-[50%]",
      "w-[60%]",
      "w-[70%]",
      "w-[80%]",
      "w-[90%]",
      "w-[100%]",
    ];
    return classes[step] || "w-0";
  };

  const getStrengthBgClass = (score: number) => {
    const classes = [
      "bg-[var(--text-muted)]",
      "bg-red-500",
      "bg-amber-500",
      "bg-blue-500",
      "bg-emerald-500",
    ];
    return classes[score] || "bg-[var(--text-muted)]";
  };

  const getStrengthTextClass = (score: number) => {
    const classes = [
      "text-[var(--text-muted)]",
      "text-red-500",
      "text-amber-500",
      "text-blue-500",
      "text-emerald-500",
    ];
    return classes[score] || "text-[var(--text-muted)]";
  };

  // Password
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [passStrengthScore, setPassStrengthScore] = useState(0);

  const langMenuRef = useRef<HTMLDivElement>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Error states for wizard
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 1. Redirect if already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Resolve profile first
        getDoc(doc(db, "users", user.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            router.push("/dashboard");
          }
        });
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Outside click listener for language dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Helper to lookup user profile by email/phone/username in Firestore
  const findUserByIdentifier = async (idVal: string) => {
    const queryVal = idVal.trim().toLowerCase();
    const usersRef = collection(db, "users");

    // Try Email
    const qEmail = query(usersRef, where("email", "==", queryVal));
    const snapEmail = await getDocs(qEmail);
    if (!snapEmail.empty) return snapEmail.docs[0].data();

    // Try Phone
    const qPhone = query(usersRef, where("phone", "==", queryVal));
    const snapPhone = await getDocs(qPhone);
    if (!snapPhone.empty) return snapPhone.docs[0].data();

    // Try Username
    const qUser = query(usersRef, where("username", "==", queryVal));
    const snapUser = await getDocs(qUser);
    if (!snapUser.empty) return snapUser.docs[0].data();

    return null;
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertInfo({ message: "", type: null });

    let email = loginIdentifier.trim();
    if (!email.includes("@")) {
      const profile = await findUserByIdentifier(loginIdentifier);
      if (profile && profile.email) {
        email = profile.email;
      } else {
        setAlertInfo({
          message: t("error_email_not_found") || "No account found with these credentials.",
          type: "error",
        });
        return;
      }
    }

    try {
      await signInWithEmailAndPassword(auth, email, loginPassword);
      setAlertInfo({
        message: "Logged in successfully! Redirecting...",
        type: "success",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      console.error(err);
      let errMsg = "Invalid credentials. Please check your credentials and try again.";
      if (err.code === "auth/wrong-password") {
        errMsg = t("error_passwords_dont_match") || "Incorrect password.";
      } else if (err.code === "auth/user-not-found") {
        errMsg = t("error_email_not_found") || "No account found.";
      }
      setAlertInfo({ message: errMsg, type: "error" });
    }
  };

  // Forgot Password verification handler
  const verifyForgotEmail = async () => {
    setAlertInfo({ message: "", type: null });
    const profile = await findUserByIdentifier(forgotIdentifier);
    if (profile) {
      setForgotStep("choose");
    } else {
      setAlertInfo({
        message: t("error_email_not_found") || "Account not found.",
        type: "error",
      });
    }
  };

  const sendForgotCode = (method: "email" | "phone") => {
    setForgotMethod(method);
    setForgotStep("reset");
    setAlertInfo({
      message: `A verification code has been simulated and sent to your ${method}.`,
      type: "success",
    });
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertInfo({ message: "", type: null });

    if (forgotCode !== "123456") {
      setAlertInfo({
        message: t("error_invalid_code") || "Invalid code. Use 123456.",
        type: "error",
      });
      return;
    }

    if (forgotNewPassword.length < 6) {
      setAlertInfo({
        message: t("error_password_too_short") || "Password must be at least 6 characters.",
        type: "error",
      });
      return;
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      setAlertInfo({
        message: t("error_passwords_dont_match") || "Passwords do not match.",
        type: "error",
      });
      return;
    }

    // Since this is a demo, simulate success
    setAlertInfo({
      message: t("success_password_reset") || "Password updated successfully!",
      type: "success",
    });
    setTimeout(() => {
      setActiveTab("login");
      setForgotStep("identifier");
      setForgotIdentifier("");
      setForgotCode("");
      setForgotNewPassword("");
      setForgotConfirmPassword("");
      setAlertInfo({ message: "", type: null });
    }, 1500);
  };

  // Registration Validation
  const validateStep = async (stepNum: number) => {
    const newErrors: Record<string, string> = {};

    if (stepNum === 1) {
      const arRegex = /^([\u0600-\u06FF\-\']+\s+){3,}[\u0600-\u06FF\-\']+$/;
      if (!arRegex.test(regArabicName.trim())) {
        newErrors.arabicName =
          t("error_arabic_name_regex") ||
          "Please enter exactly 4 names in Arabic, separated by spaces.";
      }
    } else if (stepNum === 2) {
      const enRegex = /^([a-zA-Z\-\']+\s+){3,}[a-zA-Z\-\']+$/;
      if (!enRegex.test(regEnglishName.trim())) {
        newErrors.englishName =
          t("error_english_name_regex") ||
          "Please enter exactly 4 names in English, separated by spaces.";
      }
    } else if (stepNum === 3) {
      if (!regDob) {
        newErrors.dob = t("error_dob_required") || "Date of birth is required.";
      }
      if (!regGender) {
        newErrors.gender = "Please select your gender.";
      }
    } else if (stepNum === 4) {
      if (!regPhone) {
        newErrors.phone = t("error_whatsapp_required") || "WhatsApp number is required.";
      } else if (!phoneVerified) {
        newErrors.phone = t("error_otp_missing") || "Please verify your phone number.";
      }
    } else if (stepNum === 5) {
      // Optional, but validation check if entered
      if (regEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) {
        newErrors.email = t("error_email_invalid") || "Please enter a valid email address.";
      } else if (regEmail && !emailVerified) {
        newErrors.email = "Please verify your email address.";
      }
    } else if (stepNum === 6) {
      if (!regEducation) {
        newErrors.education =
          t("error_education_required") || "Please enter your educational institution.";
      }
    } else if (stepNum === 7) {
      if (!regAddress) {
        newErrors.address = t("error_address_required") || "Please enter your address.";
      }
      if (!coordinates) {
        newErrors.coords = t("error_coords_missing") || "Please capture your GPS coordinates.";
      }
    } else if (stepNum === 8) {
      if (tempChurches.length === 0) {
        newErrors.church = t("error_church_missing") || "Please select at least 1 church.";
      } else if (tempChurches.length > 5) {
        newErrors.church = t("error_church_max") || "You can select up to 5 churches.";
      }
    } else if (stepNum === 10) {
      if (regPassword.length < 6) {
        newErrors.password =
          t("error_password_short") || "Password must be at least 6 characters.";
      }
      if (regPassword !== regConfirmPassword) {
        newErrors.confirmPassword =
          t("error_passwords_dont_match") || "Passwords do not match.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = async () => {
    if (await validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // WhatsApp Verification (Simulated)
  const sendWhatsAppOtp = () => {
    if (!regPhone) {
      setErrors({ phone: "Please enter your phone number first." });
      return;
    }
    setSmsSending(true);
    setTimeout(() => {
      setSmsSending(false);
      setSmsSent(true);
      setAlertInfo({ message: "Mock verification OTP sent: 123456", type: "success" });
    }, 1000);
  };

  const verifyWhatsAppOtp = () => {
    if (phoneOtp === "123456") {
      setPhoneVerified(true);
      setPhoneOtpError("");
      setAlertInfo({ message: "WhatsApp number verified successfully!", type: "success" });
    } else {
      setPhoneOtpError(t("error_otp_invalid") || "Invalid OTP code.");
    }
  };

  // Email Verification (Simulated)
  const sendEmailLink = () => {
    if (!regEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) {
      setErrors({ email: "Please enter a valid email address first." });
      return;
    }
    setEmailSending(true);
    setTimeout(() => {
      setEmailSending(false);
      setEmailSent(true);
      setAlertInfo({ message: "Mock email verification link sent!", type: "success" });
      
      // Auto-verify email after 2 seconds for smooth mock flow
      setTimeout(() => {
        setEmailVerified(true);
        setAlertInfo({ message: "Email successfully verified!", type: "success" });
      }, 2000);
    }, 1000);
  };

  // Geolocation
  const captureCoords = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setFetchingCoords(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setFetchingCoords(false);
        setAlertInfo({ message: "GPS Coordinates captured successfully!", type: "success" });
      },
      (error) => {
        console.error(error);
        setFetchingCoords(false);
        // Fallback mock coordinates
        setCoordinates({ lat: 30.0444, lng: 31.2357 });
        setAlertInfo({ message: "GPS Coordinates captured (Mock Fallback)!", type: "success" });
      }
    );
  };

  // Church selection handlers
  const handleChurchSelect = (churchName: string) => {
    if (churchName && !tempChurches.includes(churchName)) {
      if (tempChurches.length >= 5) {
        setErrors({ church: t("error_church_max") || "Max 5 churches allowed." });
        return;
      }
      setTempChurches([...tempChurches, churchName]);
      setSelectedChurch("");
      setErrors({});
    }
  };

  const removeChurchTag = (churchName: string) => {
    setTempChurches(tempChurches.filter((c) => c !== churchName));
  };

  // Photo handlers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoUrl(reader.result as string);
        setPhotoZoom(1);
        setPhotoRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const openCamera = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access failed:", err);
      alert("Could not access camera. Using fallback image.");
      setPhotoUrl("/images/logo.png");
      setCameraActive(false);
    }
  };

  const captureFromCamera = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = 280;
      canvas.height = 280;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 280, 280);
        setPhotoUrl(canvas.toDataURL("image/png"));
        setPhotoZoom(1);
        setPhotoRotation(0);
      }
      closeCamera();
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setCameraActive(false);
  };

  // Password strength check
  const checkPasswordStrength = (pass: string) => {
    setRegPassword(pass);
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score++;
    setPassStrengthScore(score);
  };

  const getStrengthLabel = () => {
    const labels: Record<Language, string[]> = {
      "en-us": ["", "Weak", "Fair", "Good", "Strong"],
      "en-gb": ["", "Weak", "Fair", "Good", "Strong"],
      "ar-eg": ["", "ضعيفة", "مقبولة", "جيدة", "قوية"],
      "fr": ["", "Faible", "Correcte", "Bien", "Forte"],
      "de": ["", "Schwach", "Mittel", "Gut", "Stark"],
    };
    return labels[language]?.[passStrengthScore] || labels["en-us"][passStrengthScore] || "";
  };

  const getStrengthColor = () => {
    const colors = ["var(--text-muted)", "#ef4444", "#f59e0b", "#3b82f6", "#10b981"];
    return colors[passStrengthScore] || "var(--text-muted)";
  };

  // Submit registration wizard
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertInfo({ message: "", type: null });

    if (!(await validateStep(10))) return;

    // Email fallback if skipped or not filled
    const finalEmail = regEmail.trim() || `${regPhone.trim()}@church.com`;

    try {
      // 1. Create firebase user account
      const userCredential = await createUserWithEmailAndPassword(auth, finalEmail, regPassword);
      const user = userCredential.user;

      // 2. Save user metadata to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: finalEmail,
        phone: regCountryCode + regPhone,
        username: regEnglishName.trim(),
        arabicName: regArabicName.trim(),
        englishName: regEnglishName.trim(),
        dob: regDob,
        gender: regGender,
        education: regEducation,
        address: regAddress,
        coordinates: coordinates,
        selectedChurches: tempChurches,
        createdAt: new Date().toISOString(),
      });

      setAlertInfo({
        message: t("success_password_reset") || "Account created successfully! Redirecting...",
        type: "success",
      });
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setAlertInfo({
        message: err.message || "Registration failed. Please check your data and try again.",
        type: "error",
      });
    }
  };

  const switchTab = (tab: "login" | "register" | "forgot") => {
    setActiveTab(tab);
    setAlertInfo({ message: "", type: null });
    // Reset steps
    setCurrentStep(1);
    setErrors({});
  };

  return (
    <div
      className="auth-page shared-bg min-h-screen w-screen flex flex-col justify-between items-center relative font-sans"
      dir={dir}
    >
      <div className="auth-wrapper flex-grow flex items-center justify-center py-12">
        <div className="glass-card auth-card fade-in">
          {/* Header */}
          <div className="auth-header">
            <div className="floating-logo">
              <img src="/images/logo.png" alt="At Church Logo" />
            </div>
            <h1 className="coptic-title" data-translate-key="title">
              {t("title")}
            </h1>
            <p className="subtitle" data-translate-key="subtitle">
              {t("subtitle")}
            </p>
            <p className="slogan" data-translate-key="slogan">
              {t("slogan")}
            </p>
          </div>

          {/* Form Tabs */}
          {activeTab !== "forgot" && (
            <div className="auth-tabs">
              <div
                className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
                onClick={() => switchTab("login")}
              >
                {t("tab_login")}
              </div>
              <div
                className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
                onClick={() => switchTab("register")}
              >
                {t("tab_register")}
              </div>
            </div>
          )}

          {/* Alert Message Box */}
          {alertInfo.type && (
            <div className={`alert-box ${alertInfo.type}`}>
              {alertInfo.message}
            </div>
          )}

          {/* SIGN IN FORM */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label" htmlFor="login-identifier">
                  {t("identifier_label")}
                </label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    id="login-identifier"
                    className="auth-input ltr-input"
                    placeholder={t("placeholder_email")}
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group mb-7">
                <div className="flex justify-between items-center mb-2">
                  <label className="form-label mb-0" htmlFor="login-password">
                    {t("password_label")}
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      switchTab("forgot");
                    }}
                    className="text-xs text-[var(--accent)] font-semibold"
                  >
                    {t("forgot_password")}
                  </a>
                </div>
                <div className="input-wrapper">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    id="login-password"
                    className="auth-input ltr-input"
                    placeholder={t("placeholder_password")}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                <span>{t("btn_signin")}</span> <i className="fa-solid fa-arrow-right-to-bracket"></i>
              </button>

              <div className="demo-notice">
                <i className="fa-solid fa-circle-info text-[var(--accent)] mr-1"></i>
                <span>{t("demo_login_prefix")} </span>
                <strong>admin@church.com</strong> / <strong>admin123</strong>
              </div>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {activeTab === "forgot" && (
            <form onSubmit={handleForgotSubmit}>
              {forgotStep === "identifier" && (
                <div>
                  <div className="forgot-header">
                    <h2 className="forgot-title-text">
                      {t("forgot_title")}
                    </h2>
                    <p className="forgot-subtitle-text">
                      {t("forgot_instructions")}
                    </p>
                  </div>
                  <div className="form-group mb-6">
                    <label className="form-label" htmlFor="forgot-identifier">
                      {t("identifier_label")}
                    </label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-user"></i>
                      <input
                        type="text"
                        id="forgot-identifier"
                        className="auth-input ltr-input"
                        placeholder="Email, phone number, or username"
                        value={forgotIdentifier}
                        onChange={(e) => setForgotIdentifier(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button type="button" onClick={verifyForgotEmail} className="btn btn-primary btn-block mb-5">
                    <span>{t("btn_reset_password")}</span> <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              )}

              {forgotStep === "choose" && (
                <div className="text-center">
                  <div className="mb-6">
                    <h2 className="forgot-title-text">
                      {t("forgot_title")}
                    </h2>
                    <p className="forgot-subtitle-text">
                      How would you like to receive your reset code?
                    </p>
                  </div>
                  <button type="button" className="btn btn-outline btn-block mb-4" onClick={() => sendForgotCode("email")}>
                    <i className="fa-solid fa-envelope"></i> Send to Email
                  </button>
                  <button type="button" className="btn btn-outline btn-block mb-5" onClick={() => sendForgotCode("phone")}>
                    <i className="fa-solid fa-phone"></i> Send to Phone Number
                  </button>
                </div>
              )}

              {forgotStep === "reset" && (
                <div>
                  <div className="forgot-header">
                    <h2 className="forgot-title-text">
                      {t("forgot_title")}
                    </h2>
                    <p className="forgot-subtitle-text">
                      {t("forgot_instructions_step2")}
                    </p>
                    <span className="mock-code-badge">
                      {t("mock_code_notice")}
                    </span>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="forgot-code">
                      {t("code_label")}
                    </label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-key"></i>
                      <input
                        type="text"
                        id="forgot-code"
                        className="auth-input ltr-input"
                        placeholder={t("placeholder_code")}
                        value={forgotCode}
                        onChange={(e) => setForgotCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="forgot-new-password">
                      {t("new_password_label")}
                    </label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-lock"></i>
                      <input
                        type="password"
                        id="forgot-new-password"
                        className="auth-input ltr-input"
                        placeholder="Min 6 characters"
                        value={forgotNewPassword}
                        onChange={(e) => setForgotNewPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group mb-6">
                    <label className="form-label" htmlFor="forgot-confirm-password">
                      {t("confirm_password_label")}
                    </label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-shield-halved"></i>
                      <input
                        type="password"
                        id="forgot-confirm-password"
                        className="auth-input ltr-input"
                        placeholder="Re-type password"
                        value={forgotConfirmPassword}
                        onChange={(e) => setForgotConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-5">
                    <span>{t("btn_submit_new_password")}</span> <i className="fa-solid fa-check"></i>
                  </button>
                </div>
              )}

              <div className="text-center">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    switchTab("login");
                  }}
                  className="text-[0.85rem] text-[var(--accent)] font-semibold"
                >
                  {t("back_to_login")}
                </a>
              </div>
            </form>
          )}

          {/* MULTI-STEP REGISTRATION WIZARD FORM */}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit}>
              {/* Progress Bar */}
              <div className="register-progress">
                <div className={`progress-bar-fill ${getProgressWidthClass(currentStep)}`}></div>
              </div>
              <div className="step-indicator">
                {language === "ar-eg" ? "خطوة" : "Step"} {currentStep} {language === "ar-eg" ? "من" : "of"} {totalSteps}
              </div>

              {/* Step 1: Arabic Name */}
              {currentStep === 1 && (
                <div className="register-step active">
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-arabic-name">
                      {t("reg_arabic_name_label")}
                    </label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-user"></i>
                      <input
                        type="text"
                        id="reg-arabic-name"
                        className="auth-input"
                        placeholder={t("placeholder_arabic_name")}
                        value={regArabicName}
                        onChange={(e) => setRegArabicName(e.target.value)}
                        dir="rtl"
                      />
                    </div>
                    {errors.arabicName && <div className="error-msg">{errors.arabicName}</div>}
                  </div>
                </div>
              )}

              {/* Step 2: English Name */}
              {currentStep === 2 && (
                <div className="register-step active">
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-english-name">
                      {t("reg_english_name_label")}
                    </label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-user"></i>
                      <input
                        type="text"
                        id="reg-english-name"
                        className="auth-input ltr-input"
                        placeholder={t("placeholder_english_name")}
                        value={regEnglishName}
                        onChange={(e) => setRegEnglishName(e.target.value)}
                      />
                    </div>
                    {errors.englishName && <div className="error-msg">{errors.englishName}</div>}
                  </div>
                </div>
              )}

              {/* Step 3: Date of Birth & Gender */}
              {currentStep === 3 && (
                <div className="register-step active">
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-dob">
                      {t("reg_dob_label")}
                    </label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-calendar-days"></i>
                      <input
                        type="date"
                        id="reg-dob"
                        className="auth-input ltr-input text-gray-900"
                        value={regDob}
                        onChange={(e) => setRegDob(e.target.value)}
                      />
                    </div>
                    {errors.dob && <div className="error-msg">{errors.dob}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label mb-3">
                      Gender / الجنس
                    </label>
                    <div className="flex gap-8 justify-center">
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-[var(--text-primary)]">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={regGender === "male"}
                          onChange={() => setRegGender("male")}
                          className="w-4 h-4 accent-[var(--primary)]"
                        />
                        Male / ذكر
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-[var(--text-primary)]">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={regGender === "female"}
                          onChange={() => setRegGender("female")}
                          className="w-4 h-4 accent-[var(--primary)]"
                        />
                        Female / أنثى
                      </label>
                    </div>
                    {errors.gender && <div className="error-msg text-center">{errors.gender}</div>}
                  </div>
                </div>
              )}

              {/* Step 4: WhatsApp Number & OTP */}
              {currentStep === 4 && (
                <div className="register-step active">
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-phone">
                      {t("reg_phone_label")}
                    </label>
                    <div className="flex gap-2 mb-4">
                      <select
                        id="country-code-select"
                        className="auth-input w-24 text-gray-900"
                        value={regCountryCode}
                        onChange={(e) => setRegCountryCode(e.target.value)}
                        title="Country Code"
                      >
                        <option value="+20">+20 (EG)</option>
                        <option value="+1">+1 (US)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+966">+966 (SA)</option>
                        <option value="+971">+971 (AE)</option>
                      </select>
                      <div className="input-wrapper flex-grow">
                        <i className="fa-solid fa-phone"></i>
                        <input
                          type="text"
                          id="reg-phone"
                          className="auth-input ltr-input"
                          placeholder={t("placeholder_whatsapp")}
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          disabled={phoneVerified}
                        />
                      </div>
                    </div>

                    {!phoneVerified ? (
                      <button
                        type="button"
                        className={`btn btn-secondary btn-sm mx-auto block ${smsSent ? "btn-outline" : ""}`}
                        onClick={sendWhatsAppOtp}
                        disabled={smsSending}
                      >
                        {smsSending ? t("btn_sending_otp") : smsSent ? t("btn_sent_otp") : t("btn_send_otp")}
                      </button>
                    ) : (
                      <div className="text-center text-emerald-500 font-semibold mt-2">
                        <i className="fa-solid fa-check-circle"></i> Verified
                      </div>
                    )}
                    {errors.phone && <div className="error-msg">{errors.phone}</div>}
                  </div>

                  {smsSent && !phoneVerified && (
                    <div className="form-group mt-4" id="otp-input-group">
                      <label className="form-label" htmlFor="reg-otp">
                        {t("reg_otp_label")}
                      </label>
                      <div className="input-wrapper mb-3">
                        <i className="fa-solid fa-key"></i>
                        <input
                          type="text"
                          id="reg-otp"
                          className="auth-input ltr-input"
                          placeholder={t("placeholder_otp")}
                          value={phoneOtp}
                          onChange={(e) => setPhoneOtp(e.target.value)}
                        />
                      </div>
                      <span className="text-xs text-[var(--text-muted)] block mb-3 text-center">
                        {t("reg_otp_mock_notice")}
                      </span>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm btn-block"
                        onClick={verifyWhatsAppOtp}
                      >
                        Verify OTP
                      </button>
                      {phoneOtpError && <div className="error-msg">{phoneOtpError}</div>}
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Email Address & Link Verify */}
              {currentStep === 5 && (
                <div className="register-step active">
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-email">
                      {t("reg_email_label")}
                    </label>
                    <div className="input-wrapper mb-3">
                      <i className="fa-solid fa-envelope"></i>
                      <input
                        type="email"
                        id="reg-email"
                        className="auth-input ltr-input"
                        placeholder={t("placeholder_email")}
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        disabled={emailVerified}
                      />
                    </div>
                    {errors.email && <div className="error-msg">{errors.email}</div>}

                    {regEmail && !emailVerified && (
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm btn-block"
                        onClick={sendEmailLink}
                        disabled={emailSending}
                      >
                        {emailSending ? "Sending..." : emailSent ? "Verification Link Sent" : t("btn_send_email_link")}
                      </button>
                    )}
                    {emailVerified && (
                      <div className="text-center text-emerald-500 font-semibold mt-2">
                        <i className="fa-solid fa-check-circle"></i> Email Verified
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 6: Education */}
              {currentStep === 6 && (
                <div className="register-step active">
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-education">
                      {t("reg_education_label")}
                    </label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-graduation-cap"></i>
                      <input
                        type="text"
                        id="reg-education"
                        className="auth-input"
                        placeholder={t("placeholder_education")}
                        value={regEducation}
                        onChange={(e) => setRegEducation(e.target.value)}
                      />
                    </div>
                    {errors.education && <div className="error-msg">{errors.education}</div>}
                  </div>
                </div>
              )}

              {/* Step 7: Address & Capture Coordinates */}
              {currentStep === 7 && (
                <div className="register-step active">
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-address">
                      {t("reg_address_label")}
                    </label>
                    <div className="input-wrapper mb-3">
                      <i className="fa-solid fa-location-dot"></i>
                      <input
                        type="text"
                        id="reg-address"
                        className="auth-input"
                        placeholder={t("placeholder_address")}
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                      />
                    </div>
                    {errors.address && <div className="error-msg">{errors.address}</div>}
                  </div>

                  <div className="form-group text-center">
                    <button
                      type="button"
                      className="btn btn-outline btn-sm btn-block"
                      onClick={captureCoords}
                      disabled={fetchingCoords}
                    >
                      {fetchingCoords ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin"></i> Capturing...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-location-crosshairs"></i> {t("btn_get_coordinates")}
                        </>
                      )}
                    </button>
                    {coordinates && (
                      <div className="mt-2 text-sm text-[var(--accent)] font-semibold">
                        <i className="fa-solid fa-check"></i> {t("reg_coords_captured")} ({coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)})
                      </div>
                    )}
                    {errors.coords && <div className="error-msg">{errors.coords}</div>}
                  </div>
                </div>
              )}

              {/* Step 8: Governorate & Church Selection */}
              {currentStep === 8 && (
                <div className="register-step active">
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-gov">
                      {t("reg_gov_label")}
                    </label>
                    <div className="input-wrapper mb-3">
                      <i className="fa-solid fa-map"></i>
                      <select
                        id="reg-gov"
                        className="auth-input text-gray-900"
                        value={selectedGov}
                        onChange={(e) => {
                          setSelectedGov(e.target.value);
                          setSelectedMarkaz("");
                          setSelectedChurch("");
                        }}
                      >
                        <option value="">{t("reg_gov_placeholder")}</option>
                        {Object.keys(churchesData).map((govName) => (
                          <option key={govName} value={govName}>
                            {govName}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.gov && <div className="error-msg">{errors.gov}</div>}
                  </div>

                  {selectedGov && (
                    <div className="form-group" id="markaz-wrapper">
                      <label className="form-label" htmlFor="reg-markaz">
                        District / Diocese / الإيبارشية
                      </label>
                      <div className="input-wrapper mb-3">
                        <i className="fa-solid fa-map-location-dot"></i>
                        <select
                          id="reg-markaz"
                          className="auth-input text-gray-900"
                          value={selectedMarkaz}
                          onChange={(e) => {
                            setSelectedMarkaz(e.target.value);
                            setSelectedChurch("");
                          }}
                        >
                          <option value="">Select District...</option>
                          {Object.keys(churchesData[selectedGov]).map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {selectedMarkaz && (
                    <div className="form-group" id="church-wrapper">
                      <label className="form-label" htmlFor="reg-church">
                        Choose Church / اختر الكنيسة
                      </label>
                      <div className="input-wrapper mb-3" id="church-search-wrapper">
                        <i className="fa-solid fa-search"></i>
                        <input
                          type="text"
                          className="auth-input"
                          placeholder="Search church by name..."
                          value={churchSearch}
                          onChange={(e) => setChurchSearch(e.target.value)}
                        />
                      </div>
                      <div className="input-wrapper mb-3">
                        <i className="fa-solid fa-church"></i>
                        <select
                          id="reg-church"
                          className="auth-input text-gray-900"
                          value={selectedChurch}
                          onChange={(e) => handleChurchSelect(e.target.value)}
                        >
                          <option value="">Select church...</option>
                          {churchesData[selectedGov][selectedMarkaz]
                            .filter((c) =>
                              c.toLowerCase().includes(churchSearch.toLowerCase())
                            )
                            .map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div id="selected-churches-tags" className="flex flex-wrap gap-2 mt-2">
                    {tempChurches.map((churchName) => (
                      <span
                        key={churchName}
                        className="bg-[var(--primary-glow)] text-[var(--primary-light)] text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 border border-[var(--border-color)]"
                      >
                        {churchName}
                        <button
                          type="button"
                          className="border-0 bg-transparent text-[var(--crimson-light)] font-bold text-sm cursor-pointer p-0"
                          onClick={() => removeChurchTag(churchName)}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  {errors.church && <div className="error-msg">{errors.church}</div>}
                </div>
              )}

              {/* Step 9: Profile Photo */}
              {currentStep === 9 && (
                <div className="register-step active">
                  <div className="form-group text-center">
                    <label className="form-label block mb-3">{t("reg_photo_label")}</label>

                    {/* Image Preview Container */}
                    <div id="photo-preview-wrap">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt="Profile Preview"
                          ref={previewImgRef}
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-muted)]">
                          <i className="fa-solid fa-user text-5xl mb-2"></i>
                          <span className="text-[0.7rem]">{t("reg_photo_placeholder")}</span>
                        </div>
                      )}
                    </div>

                    {/* Controls */}
                    {photoUrl && (
                      <div id="photo-editor-controls" className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <i className="fa-solid fa-minus cursor-pointer text-xs text-[var(--text-muted)]" onClick={() => setPhotoZoom(Math.max(0.5, photoZoom - 0.1))}></i>
                          <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.05"
                            value={photoZoom}
                            onChange={(e) => setPhotoZoom(parseFloat(e.target.value))}
                            className="flex-grow cursor-pointer"
                            title="Zoom Slider"
                          />
                          <i className="fa-solid fa-plus cursor-pointer text-xs text-[var(--text-muted)]" onClick={() => setPhotoZoom(Math.min(3, photoZoom + 0.1))}></i>
                        </div>
                        <div className="flex justify-center gap-3">
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => setPhotoRotation((r) => r + 90)}
                          >
                            <i className="fa-solid fa-rotate-right"></i> {t("btn_rotate")}
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm btn-remove-photo"
                            onClick={() => setPhotoUrl(null)}
                          >
                            <i className="fa-solid fa-trash"></i> {t("btn_remove_photo")}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Select Sources */}
                    <div className="flex gap-2 justify-center">
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => document.getElementById("photo-file-input")?.click()}
                      >
                        <i className="fa-solid fa-upload"></i> {t("btn_upload_photo")}
                      </button>
                      <button type="button" className="btn btn-outline btn-sm" onClick={openCamera}>
                        <i className="fa-solid fa-camera"></i> {t("btn_take_photo")}
                      </button>
                    </div>

                    <input
                      type="file"
                      id="photo-file-input"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                      title="Profile Photo File Input"
                    />

                    {/* Camera Modal overlay */}
                    {cameraActive && (
                      <div
                        id="camera-modal"
                        className="fixed inset-0 bg-black/85 flex flex-col items-center justify-center gap-4"
                      >
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-[280px] h-[280px] rounded-full object-cover border-4 border-[var(--primary)]"
                        ></video>
                        <div className="flex gap-4">
                          <button type="button" className="btn btn-primary" onClick={captureFromCamera}>
                            <i className="fa-solid fa-circle-dot"></i> {t("btn_capture")}
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline btn-cancel-camera"
                            onClick={closeCamera}
                          >
                            <i className="fa-solid fa-xmark"></i> {t("btn_cancel")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 10: Create Password */}
              {currentStep === 10 && (
                <div className="register-step active">
                  <div className="form-group mt-3">
                    <label className="form-label" htmlFor="reg-password">
                      {t("reg_password_label")}
                    </label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-lock"></i>
                      <input
                        type="password"
                        id="reg-password"
                        className="auth-input ltr-input"
                        placeholder={t("placeholder_min_chars")}
                        value={regPassword}
                        onChange={(e) => checkPasswordStrength(e.target.value)}
                      />
                    </div>
                    {errors.password && <div className="error-msg">{errors.password}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-confirm-password">
                      {t("reg_confirm_password_label")}
                    </label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-shield-halved"></i>
                      <input
                        type="password"
                        id="reg-confirm-password"
                        className="auth-input ltr-input"
                        placeholder={t("placeholder_confirm_password")}
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                      />
                    </div>
                    {errors.confirmPassword && <div className="error-msg">{errors.confirmPassword}</div>}
                  </div>

                  {/* Password Strength Indicator */}
                  <div id="password-strength-bar" className="-mt-2 mb-3">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((num) => (
                        <div
                          key={num}
                          className={`strength-segment ${num <= passStrengthScore ? getStrengthBgClass(passStrengthScore) : "bg-[var(--bg-tertiary)]"}`}
                        ></div>
                      ))}
                    </div>
                    <span id="strength-label" className={getStrengthTextClass(passStrengthScore)}>
                      {getStrengthLabel()}
                    </span>
                  </div>
                </div>
              )}

              {/* Wizard navigation buttons */}
              <div className="button-group flex mt-8 gap-4">
                <div className="prev-btn-wrapper flex items-center gap-4 flex-1">
                  {currentStep > 1 && (
                    <button type="button" className="btn btn-outline" onClick={handlePrevStep}>
                      {t("btn_back")}
                    </button>
                  )}
                  {(currentStep === 5 || currentStep === 9) && (
                    <button
                      type="button"
                      className="border-0 bg-transparent text-[var(--text-muted)] font-semibold text-sm cursor-pointer hover:text-[var(--text-primary)]"
                      onClick={() => {
                        if (currentStep === 5) {
                          setRegEmail("");
                          setEmailVerified(true); // Treat as verified if skipped
                        }
                        setCurrentStep(currentStep + 1);
                      }}
                    >
                      {t("btn_skip")}
                    </button>
                  )}
                </div>
                <div className="next-btn-wrapper flex items-center justify-end gap-4 flex-1">
                  {currentStep < totalSteps ? (
                    <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                      <span>{t("btn_next")}</span> <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary">
                      <span>{t("btn_create_account")}</span> <i className="fa-solid fa-user-plus"></i>
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Language Switcher Footer */}
      <footer className="auth-footer py-6 w-full flex flex-col items-center gap-4 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
        <div className="language-dropdown-container relative" ref={langMenuRef}>
          <button className="language-trigger-btn" onClick={() => setLangMenuOpen(!langMenuOpen)}>
            <span>{languageNames[language]}</span>
            <i className="fa-solid fa-caret-down"></i>
          </button>
          {langMenuOpen && (
            <div
              className="absolute bottom-12 mt-2 w-52 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 shadow-lg"
            >
              {(Object.keys(languageNames) as Language[]).map((lang) => (
                <button
                  key={lang}
                  className={`flex w-full items-center px-4 py-2 text-center text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] justify-center ${
                    language === lang ? "font-bold text-[var(--accent)]" : ""
                  }`}
                  onClick={() => {
                    setLanguage(lang);
                    setLangMenuOpen(false);
                  }}
                >
                  {languageNames[lang]}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="footer-links flex gap-4 text-xs text-[var(--text-muted)]">
          <a href="#" className="hover:text-[var(--text-primary)]">
            {t("help")}
          </a>
          <span>&middot;</span>
          <a href="#" className="hover:text-[var(--text-primary)]">
            {t("privacy")}
          </a>
          <span>&middot;</span>
          <a href="#" className="hover:text-[var(--text-primary)]">
            {t("terms")}
          </a>
        </div>
      </footer>
    </div>
  );
}
