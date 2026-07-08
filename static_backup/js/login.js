// --- LOGIN PAGE LOCALIZATION & LOGIC ---

const translations = {
  'en-us': {
    title: "At Church",
    subtitle: "Coptic Orthodox",
    slogan: '"Anchored in Faith, Connected in Love."',
    tab_login: "Sign In",
    tab_register: "New Account",
    email_label: "Email Address",
    password_label: "Password",
    forgot_password: "Forgot?",
    btn_signin: "Sign In",
    demo_login_prefix: "Demo login:",
    register_name_label: "Full Name",
    confirm_password_label: "Confirm Password",
    btn_create_account: "Create Account",
    help: "Help",
    privacy: "Privacy",
    terms: "Terms",
    placeholder_email: "name@example.com",
    placeholder_password: "••••••••",
    placeholder_name: "e.g. Fayez Shenouda",
    placeholder_min_chars: "Min 6 characters",
    placeholder_retype: "Re-type password",
    forgot_title: "Reset Password",
    forgot_instructions: "Enter your registered email address to reset your password.",
    forgot_instructions_step2: "A temporary verification code has been sent to your email.",
    mock_code_notice: "Mock Code: 123456",
    code_label: "Verification Code",
    new_password_label: "New Password",
    btn_reset_password: "Reset Password",
    btn_submit_new_password: "Update Password",
    back_to_login: "Back to Sign In",
    placeholder_code: "Enter 123456",
    error_email_not_found: "Email address not found.",
    error_invalid_code: "Invalid verification code. Use 123456.",
    error_passwords_dont_match: "Passwords do not match.",
    success_password_reset: "Password reset successful! Redirecting...",
    email_verified_msg: "Email verified! Enter the verification code.",
    error_password_too_short: "Password must be at least 6 characters.",
    
    // Multi-Step Registration Keys
    step_1_title: "Step 1 of 3: Personal Info",
    step_2_title: "Step 2 of 3: Communication",
    step_3_title: "Step 3 of 3: Church Data & Account",
    reg_arabic_name_label: "Quadruple Name in Arabic",
    reg_english_name_label: "Full Name in English",
    reg_dob_label: "Date of Birth",
    reg_phone_label: "WhatsApp Number",
    btn_send_otp: "Send Verification Code",
    btn_send_email_link: "Send Verification Link",
    btn_sending_otp: "Sending...",
    btn_sent_otp: "Code Sent",
    email_link_sent_msg: "Verification link sent! Please check your email inbox and click the link to verify your email.",
    reg_otp_label: "Enter 6-digit Code",
    reg_otp_mock_notice: "Mock Mode: Enter any 6 digits.",
    reg_email_label: "Email Address (Optional)",
    reg_education_label: "School/College",
    reg_address_label: "Address for Visitation",
    btn_get_coordinates: "Get Current Location (Coordinates)",
    reg_coords_captured: "Coordinates captured.",
    reg_gov_label: "Church Selection",
    reg_gov_placeholder: "Select Governorate...",
    gov_assiut: "Assiut",
    gov_cairo: "Cairo",
    gov_alexandria: "Alexandria",
    reg_church_placeholder: "Select a governorate first.",
    reg_password_label: "Create Password",
    btn_back: "Back",
    btn_next: "Next",
    btn_another_church: "Another Church",
    placeholder_arabic_name: "Write your quadruple name in Arabic letters",
    placeholder_english_name: "Enter your quadruple name in English",
    placeholder_whatsapp: "+20 123 456 7890",
    placeholder_otp: "123456",
    placeholder_education: "Search institution...",
    placeholder_address: "Enter your detailed address...",
    error_arabic_name_regex: "Please enter exactly 4 names separated by spaces, using only Arabic letters.",
    error_english_name_regex: "Please enter exactly 4 names separated by spaces, using only English letters.",
    error_dob_required: "Date of birth is required.",
    error_whatsapp_required: "WhatsApp number is required.",
    error_otp_missing: "Please verify your phone number by sending and entering the OTP.",
    error_otp_invalid: "Please enter a valid 6-digit OTP.",
    error_email_invalid: "Please enter a valid email address.",
    error_education_required: "Please enter your educational institution.",
    error_address_required: "Please enter your full address.",
    error_coords_missing: "Please capture your coordinates for visitation.",
    error_gov_required: "Please select a governorate.",
    error_church_missing: "Please select at least 1 church.",
    error_church_max: "You can select a maximum of 5 churches.",
    error_password_short: "Password must be at least 6 characters.",
    reg_confirm_password_label: "Confirm Password",
    error_confirm_password_required: "Please confirm your password.",
    error_passwords_dont_match: "Passwords do not match.",
    placeholder_confirm_password: "Re-type password",
    step_9_title: "Profile Photo",
    step_10_title: "Set Password",
    reg_photo_label: "Profile Photo",
    reg_photo_placeholder: "Add photo",
    btn_rotate: "Rotate",
    btn_remove_photo: "Remove",
    btn_upload_photo: "Upload Photo",
    btn_take_photo: "Take Photo",
    btn_capture: "Capture",
    btn_cancel: "Cancel",
    btn_skip: "Skip"
  },
  'en-gb': {
    title: "At Church",
    subtitle: "Coptic Orthodox",
    slogan: '"Anchored in Faith, Connected in Love."',
    tab_login: "Sign In",
    tab_register: "New Account",
    email_label: "Email Address",
    password_label: "Password",
    forgot_password: "Forgot?",
    btn_signin: "Sign In",
    demo_login_prefix: "Demo login:",
    register_name_label: "Full Name",
    confirm_password_label: "Confirm Password",
    btn_create_account: "Create Account",
    help: "Help",
    privacy: "Privacy",
    terms: "Terms",
    placeholder_email: "name@example.co.uk",
    placeholder_password: "••••••••",
    placeholder_name: "e.g. Fayez Shenouda",
    placeholder_min_chars: "Min 6 characters",
    placeholder_retype: "Re-type password",
    forgot_title: "Reset Password",
    forgot_instructions: "Enter your registered email address to reset your password.",
    forgot_instructions_step2: "A temporary verification code has been sent to your email.",
    mock_code_notice: "Mock Code: 123456",
    code_label: "Verification Code",
    new_password_label: "New Password",
    btn_reset_password: "Reset Password",
    btn_submit_new_password: "Update Password",
    back_to_login: "Back to Sign In",
    placeholder_code: "Enter 123456",
    error_email_not_found: "Email address not found.",
    error_invalid_code: "Invalid verification code. Use 123456.",
    error_passwords_dont_match: "Passwords do not match.",
    success_password_reset: "Password reset successful! Redirecting...",
    email_verified_msg: "Email verified! Enter the verification code.",
    error_password_too_short: "Password must be at least 6 characters.",
    
    // Multi-Step Registration Keys
    step_1_title: "Step 1 of 3: Personal Info",
    step_2_title: "Step 2 of 3: Communication",
    step_3_title: "Step 3 of 3: Church Data & Account",
    reg_arabic_name_label: "Quadruple Name in Arabic",
    reg_english_name_label: "Full Name in English",
    reg_dob_label: "Date of Birth",
    reg_phone_label: "WhatsApp Number",
    btn_send_otp: "Send Verification Code",
    btn_send_email_link: "Send Verification Link",
    btn_sending_otp: "Sending...",
    btn_sent_otp: "Code Sent",
    email_link_sent_msg: "Verification link sent! Please check your email inbox and click the link to verify your email.",
    reg_otp_label: "Enter 6-digit Code",
    reg_otp_mock_notice: "Mock Mode: Enter any 6 digits.",
    reg_email_label: "Email Address (Optional)",
    reg_education_label: "School/College",
    reg_address_label: "Address for Visitation",
    btn_get_coordinates: "Get Current Location (Coordinates)",
    reg_coords_captured: "Coordinates captured.",
    reg_gov_label: "Church Selection",
    reg_gov_placeholder: "Select Governorate...",
    gov_assiut: "Assiut",
    gov_cairo: "Cairo",
    gov_alexandria: "Alexandria",
    reg_church_placeholder: "Select a governorate first.",
    reg_password_label: "Create Password",
    btn_back: "Back",
    btn_next: "Next",
    btn_another_church: "Another Church",
    placeholder_arabic_name: "Write your quadruple name in Arabic letters",
    placeholder_english_name: "Enter your quadruple name in English",
    placeholder_whatsapp: "+44 7123 456789",
    placeholder_otp: "123456",
    placeholder_education: "Search institution...",
    placeholder_address: "Enter your detailed address...",
    error_arabic_name_regex: "Please enter exactly 4 names separated by spaces, using only Arabic letters.",
    error_english_name_regex: "Please enter exactly 4 names separated by spaces, using only English letters.",
    error_dob_required: "Date of birth is required.",
    error_whatsapp_required: "WhatsApp number is required.",
    error_otp_missing: "Please verify your phone number by sending and entering the OTP.",
    error_otp_invalid: "Please enter a valid 6-digit OTP.",
    error_email_invalid: "Please enter a valid email address.",
    error_education_required: "Please enter your educational institution.",
    error_address_required: "Please enter your full address.",
    error_coords_missing: "Please capture your coordinates for visitation.",
    error_gov_required: "Please select a governorate.",
    error_church_missing: "Please select at least 1 church.",
    error_church_max: "You can select a maximum of 5 churches.",
    error_password_short: "Password must be at least 6 characters.",
    reg_confirm_password_label: "Confirm Password",
    error_confirm_password_required: "Please confirm your password.",
    error_passwords_dont_match: "Passwords do not match.",
    placeholder_confirm_password: "Re-type password",
    step_9_title: "Profile Photo",
    step_10_title: "Set Password",
    reg_photo_label: "Profile Photo",
    reg_photo_placeholder: "Add photo",
    btn_rotate: "Rotate",
    btn_remove_photo: "Remove",
    btn_upload_photo: "Upload Photo",
    btn_take_photo: "Take Photo",
    btn_capture: "Capture",
    btn_cancel: "Cancel"
  },
  'ar-eg': {
    title: "At Church",
    subtitle: "الأقباط الأرثوذكس",
    slogan: '"راسخون في الإيمان، متحدون في المحبة."',
    tab_login: "تسجيل الدخول",
    tab_register: "حساب جديد",
    email_label: "البريد الإلكتروني",
    password_label: "كلمة المرور",
    forgot_password: "نسيت؟",
    btn_signin: "تسجيل الدخول",
    demo_login_prefix: "حساب تجريبي:",
    register_name_label: "الاسم الكامل",
    confirm_password_label: "تأكيد كلمة المرور",
    btn_create_account: "إنشاء حساب",
    help: "مساعدة",
    privacy: "الخصوصية",
    terms: "الشروط",
    placeholder_email: "name@example.com",
    placeholder_password: "••••••••",
    placeholder_name: "مثال: فايز شنودة",
    placeholder_min_chars: "٦ أحرف على الأقل",
    placeholder_retype: "إعادة كتابة كلمة المرور",
    forgot_title: "إعادة تعيين كلمة المرور",
    forgot_instructions: "أدخل بريدك الإلكتروني المسجل لإعادة تعيين كلمة المرور.",
    forgot_instructions_step2: "تم إرسال رمز تحقق مؤقت إلى بريدك الإلكتروني.",
    mock_code_notice: "الرمز التجريبي: 123456",
    code_label: "رمز التحقق",
    new_password_label: "كلمة مرور جديدة",
    btn_reset_password: "إعادة تعيين كلمة المرور",
    btn_submit_new_password: "تحديث كلمة المرور",
    back_to_login: "العودة إلى تسجيل الدخول",
    placeholder_code: "أدخل ١٢٣٤٥٦",
    error_email_not_found: "البريد الإلكتروني غير موجود.",
    error_invalid_code: "رمز التحقق غير صالح. استخدم ١٢٣٤٥٦.",
    error_passwords_dont_match: "كلمتا المرور غير متطابقتين.",
    success_password_reset: "تمت إعادة تعيين كلمة المرور بنجاح! جاري تحويلك...",
    email_verified_msg: "تم التحقق من البريد الإلكتروني! أدخل رمز التحقق.",
    error_password_too_short: "يجب أن تكون كلمة المرور ٦ أحرف على الأقل.",
    
    // Multi-Step Registration Keys
    step_1_title: "الخطوة ١ من ٣: البيانات الشخصية",
    step_2_title: "الخطوة ٢ من ٣: وسائل التواصل",
    step_3_title: "الخطوة ٣ من ٣: بيانات الكنيسة والحساب",
    reg_arabic_name_label: "الاسم رباعي بالعربية",
    reg_english_name_label: "الاسم بالكامل بالإنجليزية",
    reg_dob_label: "تاريخ الميلاد",
    reg_phone_label: "رقم الواتساب",
    btn_send_otp: "إرسال رمز التحقق",
    btn_send_email_link: "إرسال رابط التحقق",
    btn_sending_otp: "جاري الإرسال...",
    btn_sent_otp: "تم إرسال الرمز",
    email_link_sent_msg: "تم إرسال رابط التحقق! يرجى التحقق من بريدك الإلكتروني والنقر على الرابط لتأكيد حسابك.",
    reg_otp_label: "أدخل رمز مكون من ٦ أرقام",
    reg_otp_mock_notice: "الوضع التجريبي: أدخل أي ٦ أرقام.",
    reg_email_label: "البريد الإلكتروني (اختياري)",
    reg_education_label: "المدرسة / الكلية",
    reg_address_label: "العنوان بالتفصيل لزيارة الافتقاد",
    btn_get_coordinates: "تحديد الموقع الحالي (إحداثيات GPS)",
    reg_coords_captured: "تم التقاط الإحداثيات بنجاح.",
    reg_gov_label: "اختيار الكنيسة",
    reg_gov_placeholder: "اختر المحافظة...",
    gov_assiut: "أسيوط",
    gov_cairo: "القاهرة",
    gov_alexandria: "الإسكندرية",
    reg_church_placeholder: "اختر المحافظة أولاً.",
    reg_password_label: "إنشاء كلمة المرور",
    btn_back: "رجوع",
    btn_next: "التالي",
    btn_another_church: "كنيسة أخرى",
    placeholder_arabic_name: "اكتب اسمك رباعي باللغة العربية",
    placeholder_english_name: "اكتب اسمك رباعي باللغة الإنجليزية",
    placeholder_whatsapp: "+20 123 456 7890",
    placeholder_otp: "١٢٣٤٥٦",
    placeholder_education: "ابحث عن المؤسسة التعليمية...",
    placeholder_address: "أدخل عنوانك بالتفصيل...",
    error_arabic_name_regex: "الرجاء إدخال الاسم رباعي باللغة العربية تفصل بينها مسافات.",
    error_english_name_regex: "الرجاء إدخال الاسم بالكامل بالإنجليزية مكون من ٤ مقاطع تفصل بينها مسافات.",
    error_dob_required: "تاريخ الميلاد مطلوب.",
    error_whatsapp_required: "رقم الواتساب مطلوب.",
    error_otp_missing: "يرجى تأكيد رقم الهاتف عن طريق إرسال وإدخال رمز التحقق.",
    error_otp_invalid: "يرجى إدخال رمز تحقق صالح مكون من ٦ أرقام.",
    error_email_invalid: "يرجى إدخال بريد إلكتروني صحيح.",
    error_education_required: "يرجى إدخال المؤسسة التعليمية.",
    error_address_required: "يرجى إدخال العنوان بالكامل.",
    error_coords_missing: "يرجى التقاط إحداثيات موقعك الجغرافي لزيارة الافتقاد.",
    error_gov_required: "يرجى اختيار المحافظة.",
    error_church_missing: "يرجى اختيار كنيسة واحدة على الأقل.",
    error_church_max: "يمكنك اختيار ٥ كنائس كحد أقصى.",
    error_password_short: "يجب أن تتكون كلمة المرور من ٦ أحرف على الأقل.",
    reg_confirm_password_label: "تأكيد كلمة المرور",
    error_confirm_password_required: "يرجى تأكيد كلمة المرور.",
    error_passwords_dont_match: "كلمتا المرور غير متطابقتين.",
    placeholder_confirm_password: "أعد كتابة كلمة المرور",
    step_9_title: "الصورة الشخصية",
    step_10_title: "كلمة المرور",
    reg_photo_label: "الصورة الشخصية",
    reg_photo_placeholder: "إضافة صورة",
    btn_rotate: "تدوير",
    btn_remove_photo: "إزالة",
    btn_upload_photo: "رفع صورة",
    btn_take_photo: "التقاط صورة",
    btn_capture: "التقاط",
    btn_cancel: "إلغاء",
    btn_skip: "تخطي"
  },
  'fr': {
    title: "At Church",
    subtitle: "Copte Orthodoxe",
    slogan: '" Ancrés dans la foi, unis dans l\'amour."',
    tab_login: "Se connecter",
    tab_register: "Nouveau compte",
    email_label: "Adresse e-mail",
    password_label: "Mot de passe",
    forgot_password: "Oublié ?",
    btn_signin: "Se connecter",
    demo_login_prefix: "Connexion démo :",
    register_name_label: "Nom complet",
    confirm_password_label: "Confirmer le mot de passe",
    btn_create_account: "Créer un compte",
    help: "Aide",
    privacy: "Confidentialité",
    terms: "Conditions",
    placeholder_email: "nom@exemple.com",
    placeholder_password: "••••••••",
    placeholder_name: "ex. Fayez Shenouda",
    placeholder_min_chars: "Min 6 caractères",
    placeholder_retype: "Saisir à nouveau",
    forgot_title: "Réinitialiser le mot de passe",
    forgot_instructions: "Entrez votre adresse e-mail enregistrée pour réinitialiser votre mot de passe.",
    forgot_instructions_step2: "Un code de vérification temporaire a été envoyé à votre e-mail.",
    mock_code_notice: "Code de démonstration: 123456",
    code_label: "Code de vérification",
    new_password_label: "Nouveau mot de passe",
    btn_reset_password: "Réinitialiser",
    btn_submit_new_password: "Mettre à jour le mot de passe",
    back_to_login: "Retour à la connexion",
    placeholder_code: "Saisir 123456",
    error_email_not_found: "Adresse e-mail non trouvée.",
    error_invalid_code: "Code de vérification invalide. Utilisez 123456.",
    error_passwords_dont_match: "Les mots de passe ne correspondent pas.",
    success_password_reset: "Réinitialisation réussie! Redirection...",
    email_verified_msg: "E-mail vérifié! Entrez le code de vérification.",
    error_password_too_short: "Le mot de passe doit comporter au moins 6 caractères.",
    
    // Multi-Step Registration Keys
    step_1_title: "Étape 1 sur 3: Infos personnelles",
    step_2_title: "Étape 2 sur 3: Communication",
    step_3_title: "Étape 3 sur 3: Données de l'église & Compte",
    reg_arabic_name_label: "Nom quadruplé en arabe",
    reg_english_name_label: "Nom complet en anglais",
    reg_dob_label: "Date de naissance",
    reg_phone_label: "Numéro WhatsApp",
    btn_send_otp: "Envoyer le code de vérification",
    btn_send_email_link: "Envoyer le lien de vérification",
    btn_sending_otp: "Envoi...",
    btn_sent_otp: "Code envoyé",
    email_link_sent_msg: "Lien de vérification envoyé ! Veuillez consulter votre boîte de réception et cliquer sur le lien.",
    reg_otp_label: "Entrez le code à 6 chiffres",
    reg_otp_mock_notice: "Mode démo: Entrez 6 chiffres de votre choix.",
    reg_email_label: "Adresse e-mail (facultatif)",
    reg_education_label: "École / Université",
    reg_address_label: "Adresse pour les visites",
    btn_get_coordinates: "Obtenir les coordonnées GPS",
    reg_coords_captured: "Coordonnées capturées.",
    reg_gov_label: "Sélection de l'église",
    reg_gov_placeholder: "Sélectionnez le gouvernorat...",
    gov_assiut: "Assiout",
    gov_cairo: "Le Caire",
    gov_alexandria: "Alexandrie",
    reg_church_placeholder: "Sélectionnez d'abord un gouvernorat.",
    reg_password_label: "Créer un mot de passe",
    btn_back: "Retour",
    btn_next: "Suivant",
    btn_another_church: "Autre Église",
    placeholder_arabic_name: "Entrez votre nom quadruplé en arabe",
    placeholder_english_name: "Entrez votre nom quadruplé en anglais",
    placeholder_whatsapp: "+20 123 456 7890",
    placeholder_otp: "123456",
    placeholder_education: "Rechercher l'établissement...",
    placeholder_address: "Entrez votre adresse détaillée...",
    error_arabic_name_regex: "Veuillez saisir exactement 4 noms séparés par des espaces, en utilisant uniquement des lettres arabes.",
    error_english_name_regex: "Veuillez saisir exactement 4 noms séparés par des espaces, en utilisant uniquement des lettres anglaises.",
    error_dob_required: "La date de naissance est obligatoire.",
    error_whatsapp_required: "Le numéro WhatsApp est obligatoire.",
    error_otp_missing: "Veuillez vérifier votre numéro de téléphone en saisissant le code OTP.",
    error_otp_invalid: "Veuillez saisir un code OTP valide à 6 chiffres.",
    error_email_invalid: "Veuillez saisir une adresse e-mail valide.",
    error_education_required: "Veuillez saisir votre établissement d'enseignement.",
    error_address_required: "Veuillez saisir votre adresse complète.",
    error_coords_missing: "Veuillez capturer vos coordonnées pour la visite.",
    error_gov_required: "Veuillez sélectionner un gouvernorat.",
    error_church_missing: "Veuillez sélectionner au moins 1 église.",
    error_church_max: "Vous pouvez sélectionner un maximum de 5 églises.",
    error_password_short: "Le mot de passe doit comporter au moins 6 caractères.",
    reg_confirm_password_label: "Confirmer le mot de passe",
    error_confirm_password_required: "Veuillez confirmer votre mot de passe.",
    error_passwords_dont_match: "Les mots de passe ne correspondent pas.",
    placeholder_confirm_password: "Retapez le mot de passe",
    step_9_title: "Photo de Profil",
    step_10_title: "Mot de Passe",
    reg_photo_label: "Photo de Profil",
    reg_photo_placeholder: "Ajouter",
    btn_rotate: "Pivoter",
    btn_remove_photo: "Supprimer",
    btn_upload_photo: "Télécharger",
    btn_take_photo: "Prendre Photo",
    btn_capture: "Capturer",
    btn_cancel: "Annuler",
    btn_skip: "Passer"
  },
  'de': {
    title: "At Church",
    subtitle: "Koptisch-Orthodox",
    slogan: '" Verwurzelt im Glauben, vereint in der Liebe."',
    tab_login: "Anmelden",
    tab_register: "Neues Konto",
    email_label: "E-Mail-Adresse",
    password_label: "Passwort",
    forgot_password: "Vergessen?",
    btn_signin: "Anmelden",
    demo_login_prefix: "Demo-Anmeldung:",
    register_name_label: "Vollständiger Name",
    confirm_password_label: "Passwort bestätigen",
    btn_create_account: "Konto erstellen",
    help: "Hilfe",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    placeholder_email: "name@beispiel.de",
    placeholder_password: "••••••••",
    placeholder_name: "z. B. Fayez Shenouda",
    placeholder_min_chars: "Mindestens 6 Zeichen",
    placeholder_retype: "Passwort wiederholen",
    forgot_title: "Passwort zurücksetzen",
    forgot_instructions: "Geben Sie Ihre registrierte E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen.",
    forgot_instructions_step2: "Ein temporärer Bestätigungscode wurde an Ihre E-Mail-Adresse gesendet.",
    mock_code_notice: "Demo-Code: 123456",
    code_label: "Bestätigungscode",
    new_password_label: "Neues Passwort",
    btn_reset_password: "Passwort zurücksetzen",
    btn_submit_new_password: "Passwort aktualisieren",
    back_to_login: "Zurück zur Anmeldung",
    placeholder_code: "Geben Sie 123456 ein",
    error_email_not_found: "E-Mail-Adresse nicht gefunden.",
    error_invalid_code: "Ungültiger Bestätigungscode. Verwenden Sie 123456.",
    error_passwords_dont_match: "Passwörter stimmen nicht überein.",
    success_password_reset: "Passwort erfolgreich zurückgesetzt! Weiterleitung...",
    email_verified_msg: "E-Mail verifiziert! Geben Sie den Bestätigungscode ein.",
    error_password_too_short: "Das Passwort muss mindestens 6 Zeichen lang sein.",
    
    // Multi-Step Registration Keys
    step_1_title: "Schritt 1 von 3: Persönliche Daten",
    step_2_title: "Schritt 2 von 3: Kommunikation",
    step_3_title: "Schritt 3 von 3: Kirchendaten & Konto",
    reg_arabic_name_label: "Vierteiliger Name auf Arabisch",
    reg_english_name_label: "Vollständiger Name auf Englisch",
    reg_dob_label: "Geburtsdatum",
    reg_phone_label: "WhatsApp-Nummer",
    btn_send_otp: "Bestätigungscode senden",
    btn_send_email_link: "Bestätigungslink senden",
    btn_sending_otp: "Senden...",
    btn_sent_otp: "Code gesendet",
    email_link_sent_msg: "Bestätigungslink gesendet! Bitte überprüfen Sie Ihren Posteingang und klicken Sie auf den Link.",
    reg_otp_label: "6-stelligen Code eingeben",
    reg_otp_mock_notice: "Demo-Modus: Beliebige 6 Ziffern eingeben.",
    reg_email_label: "E-Mail-Adresse (Optional)",
    reg_education_label: "Schule / Hochschule",
    reg_address_label: "Adresse für Besuche",
    btn_get_coordinates: "Aktuelle GPS-Koordinaten abrufen",
    reg_coords_captured: "Koordinaten erfasst.",
    reg_gov_label: "Kirchenauswahl",
    reg_gov_placeholder: "Gouvernement auswählen...",
    gov_assiut: "Asyut",
    gov_cairo: "Kairo",
    gov_alexandria: "Alexandria",
    reg_church_placeholder: "Wählen Sie zuerst ein Gouvernement aus.",
    reg_password_label: "Passwort erstellen",
    btn_back: "Zurück",
    btn_next: "Weiter",
    btn_another_church: "Andere Kirche",
    placeholder_arabic_name: "Geben Sie Ihren vierteiligen Namen auf Arabisch ein",
    placeholder_english_name: "Geben Sie Ihren vierteiligen Namen auf Englisch ein",
    placeholder_whatsapp: "+20 123 456 7890",
    placeholder_otp: "123456",
    placeholder_education: "Institution suchen...",
    placeholder_address: "Geben Sie Ihre detaillierte Adresse ein...",
    error_arabic_name_regex: "Bitte geben Sie genau 4 durch Leerzeichen getrennte Namen ein, die nur arabische Buchstaben enthalten.",
    error_english_name_regex: "Bitte geben Sie genau 4 durch Leerzeichen getrennte Namen ein, die nur englische Buchstaben enthalten.",
    error_dob_required: "Geburtsdatum ist erforderlich.",
    error_whatsapp_required: "WhatsApp-Nummer ist erforderlich.",
    error_otp_missing: "Bitte verifizieren Sie Ihre Telefonnummer, indem Sie das OTP senden und eingeben.",
    error_otp_invalid: "Bitte geben Sie eine gültige 6-stellige OTP ein.",
    error_email_invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    error_education_required: "Bitte geben Sie Ihre Bildungseinrichtung ein.",
    error_address_required: "Bitte geben Sie Ihre vollständige Adresse ein.",
    error_coords_missing: "Bitte erfassen Sie Ihre Koordinaten für den Besuch.",
    error_gov_required: "Bitte wählen Sie ein Gouvernement aus.",
    error_church_missing: "Bitte wählen Sie mindestens 1 Kirche aus.",
    error_church_max: "Sie können maximal 5 Kirchen auswählen.",
    error_password_short: "Das Passwort muss mindestens 6 Zeichen lang sein.",
    reg_confirm_password_label: "Passwort bestätigen",
    error_confirm_password_required: "Bitte bestätigen Sie Ihr Passwort.",
    error_passwords_dont_match: "Passwörter stimmen nicht überein.",
    placeholder_confirm_password: "Passwort wiederholen",
    step_9_title: "Profilbild",
    step_10_title: "Passwort",
    reg_photo_label: "Profilbild",
    reg_photo_placeholder: "Bild",
    btn_rotate: "Drehen",
    btn_remove_photo: "Löschen",
    btn_upload_photo: "Hochladen",
    btn_take_photo: "Kamera",
    btn_capture: "Aufnehmen",
    btn_cancel: "Abbrechen",
    btn_skip: "Überspringen"
  }
};
  
window.translations = translations;

const languageNames = {
  'en-us': "English (United States)",
  'en-gb': "English (United Kingdom)",
  'ar-eg': "العربية (مصر)",
  'fr': "Français",
  'de': "Deutsch"
};

function setLanguage(lang) {
  if (!translations[lang]) lang = 'en-us';

  localStorage.setItem('preferredLanguage', lang);

  if (lang === 'ar-eg') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }

  const currentLangEl = document.getElementById('current-language');
  if (currentLangEl) currentLangEl.textContent = languageNames[lang];

  document.querySelectorAll('[data-translate-key]').forEach(el => {
    const key = el.getAttribute('data-translate-key');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  const emailPlaceholder = translations[lang]['placeholder_email'];
  const passwordPlaceholder = translations[lang]['placeholder_password'];
  const namePlaceholder = translations[lang]['placeholder_name'];
  const minCharsPlaceholder = translations[lang]['placeholder_min_chars'];
  const retypePlaceholder = translations[lang]['placeholder_retype'];
  const codePlaceholder = translations[lang]['placeholder_code'] || "Enter 123456";

  if (document.getElementById('login-email')) document.getElementById('login-email').placeholder = emailPlaceholder;
  if (document.getElementById('register-email')) document.getElementById('register-email').placeholder = emailPlaceholder;
  if (document.getElementById('login-password')) document.getElementById('login-password').placeholder = passwordPlaceholder;
  if (document.getElementById('register-password')) document.getElementById('register-password').placeholder = minCharsPlaceholder;
  if (document.getElementById('register-confirm')) document.getElementById('register-confirm').placeholder = retypePlaceholder;
  if (document.getElementById('register-name')) document.getElementById('register-name').placeholder = namePlaceholder;

  if (document.getElementById('forgot-email')) document.getElementById('forgot-email').placeholder = emailPlaceholder;
  if (document.getElementById('forgot-code')) document.getElementById('forgot-code').placeholder = codePlaceholder;
  if (document.getElementById('forgot-new-password')) document.getElementById('forgot-new-password').placeholder = minCharsPlaceholder;
  if (document.getElementById('forgot-confirm-password')) document.getElementById('forgot-confirm-password').placeholder = retypePlaceholder;

  // Sync registration placeholders
  if (document.getElementById('reg-arabic-name')) document.getElementById('reg-arabic-name').placeholder = translations[lang]['placeholder_arabic_name'] || '';
  if (document.getElementById('reg-english-name')) document.getElementById('reg-english-name').placeholder = translations[lang]['placeholder_english_name'] || '';
  if (document.getElementById('reg-phone')) document.getElementById('reg-phone').placeholder = translations[lang]['placeholder_whatsapp'] || '';
  if (document.getElementById('reg-otp')) document.getElementById('reg-otp').placeholder = translations[lang]['placeholder_otp'] || '';
  if (document.getElementById('reg-email')) document.getElementById('reg-email').placeholder = emailPlaceholder;
  if (document.getElementById('reg-education')) document.getElementById('reg-education').placeholder = translations[lang]['placeholder_education'] || '';
  if (document.getElementById('reg-address')) document.getElementById('reg-address').placeholder = translations[lang]['placeholder_address'] || '';
  if (document.getElementById('reg-password')) document.getElementById('reg-password').placeholder = minCharsPlaceholder;
  if (document.getElementById('reg-confirm-password')) document.getElementById('reg-confirm-password').placeholder = translations[lang]['placeholder_confirm_password'] || 'Re-type password';


  // Sync dyn indicator step description
  if (typeof currentStep !== 'undefined') {
    const key = `step_${currentStep}_title`;
    if (translations[lang][key]) {
      const indicator = document.getElementById('step-indicator-text');
      if (indicator) indicator.innerText = translations[lang][key];
    }
  }
}

function adjustCardHeight() {
  const authCard = document.querySelector('.auth-card');
  if (!authCard) return;

  const currentHeight = authCard.offsetHeight;
  authCard.style.height = 'auto';
  const naturalHeight = authCard.offsetHeight;

  authCard.style.height = `${currentHeight}px`;
  authCard.offsetHeight; // force reflow

  authCard.style.height = `${naturalHeight}px`;

  setTimeout(() => {
    authCard.style.height = 'auto';
  }, 300);
}

function switchTab(tab) {
  const loginTab = document.getElementById('tab-login');
  const registerTab = document.getElementById('tab-register');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const forgotForm = document.getElementById('forgot-form');
  const authTabs = document.querySelector('.auth-tabs');
  const alertBox = document.getElementById('auth-alert');

  let activeForm = null;
  if (!loginForm.classList.contains('hidden')) activeForm = loginForm;
  else if (!registerForm.classList.contains('hidden')) activeForm = registerForm;
  else if (!forgotForm.classList.contains('hidden')) activeForm = forgotForm;

  alertBox.className = 'hidden';

  const updateForms = () => {
    if (document.getElementById('forgot-identifier')) document.getElementById('forgot-identifier').value = '';
    if (document.getElementById('forgot-code')) document.getElementById('forgot-code').value = '';
    if (document.getElementById('forgot-new-password')) document.getElementById('forgot-new-password').value = '';
    if (document.getElementById('forgot-confirm-password')) document.getElementById('forgot-confirm-password').value = '';
    
    const step1 = document.getElementById('forgot-step-1');
    const stepChoose = document.getElementById('forgot-step-choose');
    const step2 = document.getElementById('forgot-step-2');
    if (step1) step1.classList.remove('hidden');
    if (stepChoose) stepChoose.classList.add('hidden');
    if (step2) step2.classList.add('hidden');

    loginForm.classList.add('hidden');
    registerForm.classList.add('hidden');
    if (forgotForm) forgotForm.classList.add('hidden');

    let newForm = null;
    const authCard = document.querySelector('.auth-card');
    const authWrapper = document.querySelector('.auth-wrapper');

    if (tab === 'login') {
      if (authCard) authCard.classList.remove('register-mode');
      if (authWrapper) authWrapper.classList.remove('register-mode');
      if (authTabs) {
        authTabs.classList.remove('hidden');
        authTabs.classList.add('form-fade-in');
        authTabs.addEventListener('animationend', function handler() {
          authTabs.classList.remove('form-fade-in');
          authTabs.removeEventListener('animationend', handler);
        });
      }
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginForm.classList.remove('hidden');
      newForm = loginForm;
    } else if (tab === 'register') {
      if (authTabs) {
        authTabs.classList.remove('hidden');
        authTabs.classList.add('form-fade-in');
        authTabs.addEventListener('animationend', function handler() {
          authTabs.classList.remove('form-fade-in');
          authTabs.removeEventListener('animationend', handler);
        });
      }
      loginTab.classList.remove('active');
      registerTab.classList.add('active');
      registerForm.classList.remove('hidden');
      registerForm.classList.add('form-fade-in');
      newForm = registerForm;
      if (authCard) authCard.classList.add('register-mode');
      if (authWrapper) authWrapper.classList.add('register-mode');
      if (typeof initMultiStepForm === 'function') initMultiStepForm();
    } else if (tab === 'forgot') {
      if (authCard) authCard.classList.remove('register-mode');
      if (authWrapper) authWrapper.classList.remove('register-mode');
      if (authTabs) authTabs.classList.add('hidden');
      if (forgotForm) {
        forgotForm.classList.remove('hidden');
        forgotForm.classList.add('form-fade-in');
        newForm = forgotForm;
      }
    }

    if (newForm) {
      newForm.classList.add('form-fade-in');
      newForm.addEventListener('animationend', function handler() {
        newForm.classList.remove('form-fade-in');
        newForm.removeEventListener('animationend', handler);
      });
    }
    
    // Adjust height after forms are swapped
    setTimeout(() => adjustCardHeight(), 10);
  };

  if (activeForm && ((tab === 'login' && activeForm !== loginForm) || 
                     (tab === 'register' && activeForm !== registerForm) || 
                     (tab === 'forgot' && activeForm !== forgotForm))) {
    activeForm.classList.add('fade-out');
    if (tab === 'forgot' && authTabs) {
      authTabs.classList.add('fade-out');
    }
    setTimeout(() => {
      activeForm.classList.remove('fade-out');
      if (authTabs) authTabs.classList.remove('fade-out');
      updateForms();
    }, 200);
  } else {
    updateForms();
  }
}

function showAlert(message, type) {
  const alertBox = document.getElementById('auth-alert');
  alertBox.textContent = message;
  alertBox.className = '';

  if (type === 'error') {
    alertBox.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
    alertBox.style.color = 'var(--crimson)';
    alertBox.style.border = '1px solid rgba(239, 68, 68, 0.3)';
  } else if (type === 'success') {
    alertBox.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
    alertBox.style.color = 'var(--success)';
    alertBox.style.border = '1px solid rgba(16, 185, 129, 0.3)';
  }
  
  adjustCardHeight();
}

async function handleLogin(e) {
  e.preventDefault();
  const identifier = document.getElementById('login-identifier').value;
  const pass = document.getElementById('login-password').value;

  const result = await login(identifier, pass);
  if (result.success) {
    showAlert('Sign in successful! Redirecting...', 'success');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  } else {
    showAlert(result.message, 'error');
  }
}

async function verifyForgotEmail() {
  const identifier = document.getElementById('forgot-identifier').value.trim();
  const lang = localStorage.getItem('preferredLanguage') || 'en-us';

  if (!identifier) {
    showAlert(lang === 'ar-eg' ? 'الرجاء إدخال الحساب.' : 'Please enter your email, phone, or username.', 'error');
    return;
  }

  const user = typeof getUserByIdentifier === 'function' ? await getUserByIdentifier(identifier) : null;

  if (!user) {
    showAlert(translations[lang]['error_email_not_found'], 'error');
    return;
  }

  const lowerId = identifier.toLowerCase();

  // If user entered email directly
  if (user.email && user.email.toLowerCase() === lowerId) {
    sendForgotCode('email', user.email);
    return;
  }

  // If user entered phone directly
  if (user.phone && user.phone.toLowerCase() === lowerId) {
    sendForgotCode('phone', user.phone);
    return;
  }

  // If user entered username (or fallback)
  if (user.email && user.phone) {
    // Has both -> prompt
    document.getElementById('auth-alert').className = 'hidden';
    transitionForgotSteps('forgot-step-1', 'forgot-step-choose');
  } else if (user.phone) {
    sendForgotCode('phone', user.phone);
  } else {
    sendForgotCode('email', user.email || 'your email');
  }
}

function sendForgotCode(method, destination) {
  const lang = localStorage.getItem('preferredLanguage') || 'en-us';
  showAlert(translations[lang]['email_verified_msg'] || 'Code sent successfully!', 'success');
  
  const instructionEl = document.getElementById('forgot-step2-instructions');
  if (instructionEl) {
    instructionEl.innerText = method === 'phone' 
      ? `A temporary verification code has been sent to your phone number.` 
      : `A temporary verification code has been sent to your email.`;
  }
  
  setTimeout(() => {
    document.getElementById('auth-alert').className = 'hidden';
    
    const step1 = document.getElementById('forgot-step-1');
    const stepChoose = document.getElementById('forgot-step-choose');
    
    if (step1 && !step1.classList.contains('hidden')) {
        transitionForgotSteps('forgot-step-1', 'forgot-step-2');
    } else if (stepChoose && !stepChoose.classList.contains('hidden')) {
        transitionForgotSteps('forgot-step-choose', 'forgot-step-2');
    }
  }, 1000);
}

function transitionForgotSteps(fromId, toId) {
  const fromEl = document.getElementById(fromId);
  const toEl = document.getElementById(toId);
  
  if (fromEl && toEl) {
    fromEl.classList.add('fade-out');
    setTimeout(() => {
      fromEl.classList.remove('fade-out');
      fromEl.classList.add('hidden');
      toEl.classList.remove('hidden');
      toEl.classList.add('form-fade-in');
      toEl.addEventListener('animationend', function handler() {
        toEl.classList.remove('form-fade-in');
        toEl.removeEventListener('animationend', handler);
      });
    }, 200);
  }
}

async function handleForgot(e) {
  e.preventDefault();
  const identifier = document.getElementById('forgot-identifier').value.trim();
  const code = document.getElementById('forgot-code').value.trim();
  const newPass = document.getElementById('forgot-new-password').value;
  const confirmPass = document.getElementById('forgot-confirm-password').value;
  const lang = localStorage.getItem('preferredLanguage') || 'en-us';

  if (code !== '123456') {
    showAlert(translations[lang]['error_invalid_code'], 'error');
    return;
  }
  if (newPass.length < 6) {
    showAlert(translations[lang]['error_password_too_short'], 'error');
    return;
  }
  if (newPass !== confirmPass) {
    showAlert(translations[lang]['error_passwords_dont_match'], 'error');
    return;
  }

  const result = await resetPassword(identifier, newPass);
  if (result.success) {
    showAlert(translations[lang]['success_password_reset'] || 'Password reset link sent to your email!', 'success');
    setTimeout(() => {
      switchTab('login');
    }, 1500);
  } else {
    showAlert(result.message, 'error');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById('language-btn');
  const langMenu = document.getElementById('language-menu');

  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
      langMenu.classList.add('hidden');
    });
  }

  document.querySelectorAll('.language-item').forEach(item => {
    item.addEventListener('click', () => {
      const lang = item.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  const savedLang = localStorage.getItem('preferredLanguage') || 'en-us';
  setLanguage(savedLang);
});
