// --- CORE APP JS ---

// Theme Management
const getTheme = () => localStorage.getItem('theme') || 'light';
const setTheme = (theme) => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
};

const updateThemeIcon = (theme) => {
  const icon = document.querySelector('.theme-toggle-btn i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
};

// Dynamic Component Loading
const loadComponent = async (elementId, filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(`Error loading component ${filePath}:`, error);
  }
};

// Initialize Layout Components and Event Listeners
const initApp = async () => {
  // 1. Set initial theme
  setTheme(getTheme());

  // 2. Load sidebar and header dynamically (if the placeholders exist on the page)
  const loadPromises = [];
  if (document.getElementById('sidebar-container')) {
    loadPromises.push(loadComponent('sidebar-container', 'components/sidebar.html'));
  }
  if (document.getElementById('header-container')) {
    loadPromises.push(loadComponent('header-container', 'components/header.html'));
  }

  if (loadPromises.length > 0) {
    await Promise.all(loadPromises);
    
    // Components have loaded, wire up event listeners
    wireEventListeners();
    highlightActiveNavLink();
    updateUserProfileDisplay();
  }

  // 3. Apply translation and layout direction
  applyLanguage(getLanguage());
};

const wireEventListeners = () => {
  // Theme Toggle Button
  const themeBtn = document.querySelector('.theme-toggle-btn');
  if (themeBtn) {
    // Set initial icon
    updateThemeIcon(getTheme());
    themeBtn.addEventListener('click', () => {
      const newTheme = getTheme() === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Sidebar Toggler (Hamburger Menu)
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside of it on mobile
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== menuToggle) {
        sidebar.classList.remove('open');
      }
    });
  }

  // Profile Dropdown Toggle
  const profileBtn = document.getElementById('profile-dropdown-btn');
  const profileMenu = document.getElementById('profile-dropdown-menu');
  if (profileBtn && profileMenu) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      profileMenu.classList.add('hidden');
    });
  }
};

// Highlight current page in Sidebar
const highlightActiveNavLink = () => {
  const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const itemHref = item.getAttribute('href');
    if (itemHref && itemHref.includes(currentPath)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

// Display Current User Information
const updateUserProfileDisplay = async () => {
  // Wait a tiny bit for auth state to resolve if calling right after load
  const user = window.firebaseAuth ? window.firebaseAuth.currentUser : null;
  if (!user) {
    // If not immediately available, try again in 500ms
    setTimeout(updateUserProfileDisplay, 500);
    return;
  }

  let displayName = user.email || 'User';
  let userRole = 'Member';

  try {
    if (window.firebaseDb) {
      const doc = await window.firebaseDb.collection('users').doc(user.uid).get();
      if (doc.exists) {
        const data = doc.data();
        if (data.englishName) displayName = data.englishName;
        else if (data.arabicName) displayName = data.arabicName;
        else if (data.username) displayName = data.username;
        else if (data.phone) displayName = data.phone;
      }
    }
  } catch (err) {
    console.error("Error fetching user profile:", err);
  }

  // Update header / sidebar user info if available
  const userNameElements = document.querySelectorAll('.user-name');
  const userRoleElements = document.querySelectorAll('.user-role');
  const userAvatarElements = document.querySelectorAll('.user-avatar');

  // Generate initials for avatar
  const initials = displayName
    .split(' ')
    .filter(n => n.length > 0)
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  userNameElements.forEach(el => el.textContent = displayName);
  userRoleElements.forEach(el => el.textContent = userRole);
  userAvatarElements.forEach(el => {
    el.textContent = initials || 'U';
  });
};

// Start application initialization on page load
document.addEventListener('DOMContentLoaded', initApp);

// Localization / Multi-language configuration mapping
const mainTranslations = {
  'en-us': {
    dashboard_header: "Dashboard",
    welcome: "Welcome Back,",
    blessing: '"Peace be to this house and to all that dwell in it." Have a blessed day.',
    next_liturgy: "Next Liturgy Booking",
    confession: "Confession Session",
    reserved: "Reserved Services",
    class_group: "Spiritual Class Group",
    wisdom_title: "Spiritual Wisdom",
    wisdom_quote: '"Do not be afraid of the combat, and do not run away from it. If you fall, get up again, pray to the Lord, and push forward. The Savior is always near to help you."',
    wisdom_author: "— St. Anthony the Great",
    katameros_title: "Katameros (Daily Reading)",
    psalm_heading: "Psalm 23:1-3",
    psalm_text: '"The Lord is my shepherd; I shall not want. He makes me to lie down in green pastures; He leads me beside the still waters..."',
    john_heading: "John 15:5",
    john_text: '"I am the vine, you are the branches. He who abides in Me, and I in him, bears much fruit; for without Me you can do nothing."',
    read_full: "Read Full Katameros",
    book_liturgy: "Book Divine Liturgy",
    notice_board: "Church Notice Board",
    sunday_liturgy: "Sunday Liturgy - June 14",
    wednesday_liturgy: "Wednesday Liturgy - June 17",
    feast_liturgy: "Feast of Ascension Liturgy - June 18",
    main_hall: "Main Hall (Coptic/English)",
    chapel: "St. Mary Chapel (Arabic/Coptic)",
    sanctuary: "Main Sanctuary (Feast Liturgy)",
    capacity_120: "Capacity: 120/150 booked",
    capacity_15: "Capacity: 15/40 booked",
    capacity_45: "Capacity: 45/200 booked",
    book_space: "Book Space",
    retreat_badge: "Retreat Announcement",
    retreat_title: "Youth Spiritual Retreat 2026",
    retreat_text: "Registration for our Summer Youth Retreat is officially open. The retreat will take place from July 24-26. Speak with Father Antonios to register.",
    bible_badge: "Bible Study",
    bible_title: "Summer Book study on Isaiah",
    bible_text: "Every Thursday evening at 7:30 PM in the Fellowship Hall. Bring your own Bible. Live stream will also be available on our channel.",
    view_notices: "View all notices",
    
    // Sidebar
    nav_dashboard: "Dashboard",
    nav_bookings: "Bookings",
    nav_katameros: "Katameros",
    nav_community: "Community",
    nav_settings: "Settings",
    
    // Header & Profile Card
    profile_logged_in: "Logged in as:",
    profile_settings: "Profile Settings",
    profile_logout: "Log Out"
  },
  'en-gb': {
    dashboard_header: "Dashboard",
    welcome: "Welcome Back,",
    blessing: '"Peace be to this house and to all that dwell in it." Have a blessed day.',
    next_liturgy: "Next Liturgy Booking",
    confession: "Confession Session",
    reserved: "Reserved Services",
    class_group: "Spiritual Class Group",
    wisdom_title: "Spiritual Wisdom",
    wisdom_quote: '"Do not be afraid of the combat, and do not run away from it. If you fall, get up again, pray to the Lord, and push forward. The Savior is always near to help you."',
    wisdom_author: "— St. Anthony the Great",
    katameros_title: "Katameros (Daily Reading)",
    psalm_heading: "Psalm 23:1-3",
    psalm_text: '"The Lord is my shepherd; I shall not want. He makes me to lie down in green pastures; He leads me beside the still waters..."',
    john_heading: "John 15:5",
    john_text: '"I am the vine, you are the branches. He who abides in Me, and I in him, bears much fruit; for without Me you can do nothing."',
    read_full: "Read Full Katameros",
    book_liturgy: "Book Divine Liturgy",
    notice_board: "Church Notice Board",
    sunday_liturgy: "Sunday Liturgy - June 14",
    wednesday_liturgy: "Wednesday Liturgy - June 17",
    feast_liturgy: "Feast of Ascension Liturgy - June 18",
    main_hall: "Main Hall (Coptic/English)",
    chapel: "St. Mary Chapel (Arabic/Coptic)",
    sanctuary: "Main Sanctuary (Feast Liturgy)",
    capacity_120: "Capacity: 120/150 booked",
    capacity_15: "Capacity: 15/40 booked",
    capacity_45: "Capacity: 45/200 booked",
    book_space: "Book Space",
    retreat_badge: "Retreat Announcement",
    retreat_title: "Youth Spiritual Retreat 2026",
    retreat_text: "Registration for our Summer Youth Retreat is officially open. The retreat will take place from July 24-26. Speak with Father Antonios to register.",
    bible_badge: "Bible Study",
    bible_title: "Summer Book study on Isaiah",
    bible_text: "Every Thursday evening at 7:30 PM in the Fellowship Hall. Bring your own Bible. Live stream will also be available on our channel.",
    view_notices: "View all notices",
    
    nav_dashboard: "Dashboard",
    nav_bookings: "Bookings",
    nav_katameros: "Katameros",
    nav_community: "Community",
    nav_settings: "Settings",
    
    profile_logged_in: "Logged in as:",
    profile_settings: "Profile Settings",
    profile_logout: "Log Out"
  },
  'ar-eg': {
    dashboard_header: "لوحة التحكم",
    welcome: "أهلاً بك مجدداً،",
    blessing: '"سلامٌ لهذا البيت ولكل الساكنين فيه." نتمنى لك يوماً مباركاً.',
    next_liturgy: "الحجز القادم للقداس",
    confession: "جلسة الاعتراف",
    reserved: "الخدمات المحجوزة",
    class_group: "اجتماع الشباب الروحي",
    wisdom_title: "حكمة روحية",
    wisdom_quote: '"لا تخف من المحاربة ولا تهرب منها. إن سقطت قم ثانيةً، واصرخ إلى الرب، وامضِ للأمام. المخلص دائماً قريب ليعينك."',
    wisdom_author: "— القديس الأنبا أنطونيوس الكبير",
    katameros_title: "القطمارس (القراءة اليومية)",
    psalm_heading: "مزمور ٢٣: ١-٣",
    psalm_text: '"الرب راعيّ فلا يعوزني شيء. في مراعٍ خضر يربضني، إلى مياه الراحة يوردني..."',
    john_heading: "يوحنا ١٥: ٥",
    john_text: '"أنا الكرمة وأنتم الأغصان. الذي يثبت فيّ وأنا فيه هذا يأتي بثمر كثير، لأنكم بدوني لا تقدرون أن تفعلوا شيئاً."',
    read_full: "اقرأ القطمارس كاملاً",
    book_liturgy: "حجز قداس إلهي",
    notice_board: "لوحة إعلانات الكنيسة",
    sunday_liturgy: "قداس الأحد - ١٤ يونيو",
    wednesday_liturgy: "قداس الأربعاء - ١٧ يونيو",
    feast_liturgy: "قداس عيد الصعود - ١٨ يونيو",
    main_hall: "القاعة الرئيسية (قبطي/إنجليزي)",
    chapel: "كنيسة العذراء مريم (عربي/قبطي)",
    sanctuary: "الهيكل الرئيسي (قداس العيد)",
    capacity_120: "السعة: تم حجز ١٢٠/١٥٠",
    capacity_15: "السعة: تم حجز ١٥/٤٠",
    capacity_45: "السعة: تم حجز ٤٥/٢٠٠",
    book_space: "احجز مكانك",
    retreat_badge: "إعلان خلوة روحية",
    retreat_title: "الخلوة الروحية للشباب ٢٠٢٦",
    retreat_text: "باب التسجيل لخلوة الشباب الصيفية مفتوح رسمياً. ستقام الخلوة من ٢٤ إلى ٢٦ يوليو. يرجى التنسيق مع أبونا أنطونيوس للتسجيل.",
    bible_badge: "دراسة الكتاب المقدس",
    bible_title: "دراسة صيفية في سفر إشعياء",
    bible_text: "كل خميس مساءً الساعة ٧:٣٠ في قاعة المناسبات. يرجى إحضار كتابك المقدس. البث المباشر متاح أيضاً على قناتنا.",
    view_notices: "عرض كل الإعلانات",
    
    nav_dashboard: "الرئيسية",
    nav_bookings: "الحجوزات",
    nav_katameros: "القطمارس",
    nav_community: "المجتمع",
    nav_settings: "الإعدادات",
    
    profile_logged_in: "مسجل الدخول باسم:",
    profile_settings: "إعدادات الحساب",
    profile_logout: "تسجيل الخروج"
  },
  'fr': {
    dashboard_header: "Tableau de Bord",
    welcome: "Bienvenue,",
    blessing: '"Paix à cette maison et à tous ceux qui l\'habitent." Passez une journée bénie.',
    next_liturgy: "Prochaine Liturgie Réservez",
    confession: "Session de Confession",
    reserved: "Services Réservés",
    class_group: "Groupe de Jeunesse",
    wisdom_title: "Sagesse Spirituelle",
    wisdom_quote: '"Ne craignez pas le combat et ne le fuyez pas. Si vous tombez, relevez-vous, priez le Seigneur et avancez. Le Sauveur est toujours proche pour vous aider."',
    wisdom_author: "— St. Antoine le Grand",
    katameros_title: "Katameros (Lecture Quotidienne)",
    psalm_heading: "Psaume 23:1-3",
    psalm_text: '"Le Seigneur est mon berger ; je ne manquerai de rien. Il me fait reposer dans de verts pâturages ; Il me dirige près des eaux paisibles..."',
    john_heading: "Jean 15:5",
    john_text: '"Je suis le cep, vous êtes les sarments. Celui qui demeure en Moi et en qui Je demeure porte beaucoup de fruit, car sans Moi vous ne pouvez rien faire."',
    read_full: "Lire tout le Katameros",
    book_liturgy: "Réserver une Divine Liturgie",
    notice_board: "Tableau d'Affichage de l'Église",
    sunday_liturgy: "Liturgie du Dimanche - 14 Juin",
    wednesday_liturgy: "Liturgie du Mercredi - 17 Juin",
    feast_liturgy: "Liturgie de l'Ascension - 18 Juin",
    main_hall: "Grande Salle (Copte/Anglais)",
    chapel: "Chapelle Ste. Marie (Arabe/Copte)",
    sanctuary: "Sanctuaire Principal (Liturgie de Fête)",
    capacity_120: "Capacité : 120/150 réservés",
    capacity_15: "Capacité : 15/40 réservés",
    capacity_45: "Capacité : 45/200 réservés",
    book_space: "Réserver",
    retreat_badge: "Annonce de Retraite",
    retreat_title: "Retraite Spirituelle des Jeunes 2026",
    retreat_text: "L'inscription pour notre Retraite d'Été des Jeunes est ouverte. Elle aura lieu du 24 au 26 juillet. Parlez au Père Antonios pour vous inscrire.",
    bible_badge: "Étude Biblique",
    bible_title: "Étude estivale sur le livre d'Isaïe",
    bible_text: "Chaque jeudi soir à 19h30 dans la salle paroissiale. Apportez votre Bible. Diffusion en direct disponible.",
    view_notices: "Voir toutes les annonces",
    
    nav_dashboard: "Tableau de Bord",
    nav_bookings: "Réservations",
    nav_katameros: "Katameros",
    nav_community: "Communauté",
    nav_settings: "Paramètres",
    
    profile_logged_in: "Connecté en tant que :",
    profile_settings: "Paramètres du Profil",
    profile_logout: "Se Déconnecter"
  },
  'de': {
    dashboard_header: "Dashboard",
    welcome: "Willkommen zurück,",
    blessing: '"Friede sei diesem Hause und allen, die darin wohnen." Haben Sie einen gesegneten Tag.',
    next_liturgy: "Nächste Liturgiebuchung",
    confession: "Beichtsitzung",
    reserved: "Reservierte Dienste",
    class_group: "Spiritual Youth Group",
    wisdom_title: "Geistliche Weisheit",
    wisdom_quote: '"Fürchte dich nicht vor dem Kampf und laufe nicht davon. Wenn du fällst, stehe wieder auf, bete zum Herrn und dränge vorwärts. Der Retter ist immer nah, um dir zu helfen."',
    wisdom_author: "— Hl. Antonius der Große",
    katameros_title: "Katameros (Tägliche Lesung)",
    psalm_heading: "Psalm 23:1-3",
    psalm_text: '"Der Herr ist mein Hirte; mir wird nichts mangeln. Er weidet mich auf einer grünen Aue und führet mich zum frischen Wasser..."',
    john_heading: "Johannes 15:5",
    john_text: '"Ich bin der Weinstock, ihr seid die Reben. Wer in Mir bleibt und Ich in ihm, der bringt viel Frucht; denn ohne Mich könnt ihr nichts tun."',
    read_full: "Vollständiges Katameros lesen",
    book_liturgy: "Göttliche Liturgie buchen",
    notice_board: "Kirchen-Mitteilungsblatt",
    sunday_liturgy: "Sonntagsliturgie - 14. Juni",
    wednesday_liturgy: "Mittwochsliturgie - 17. Juni",
    feast_liturgy: "Auffahrtsliturgie - 18. Juni",
    main_hall: "Hauptsaal (Koptisch/Englisch)",
    chapel: "St. Marien Kapelle (Arabisch/Koptisch)",
    sanctuary: "Hauptheiligtum (Festliturgie)",
    capacity_120: "Kapazität: 120/150 gebucht",
    capacity_15: "Kapazität: 15/40 gebucht",
    capacity_45: "Kapazität: 45/200 gebucht",
    book_space: "Buchen",
    retreat_badge: "Retreat-Ankündigung",
    retreat_title: "Jugend-Spiritual-Retreat 2026",
    retreat_text: "Die Registrierung für das Sommer-Jugend-Retreat ist offen. Es findet vom 24.-26. Juli statt. Sprechen Sie mit Vater Antonios zur Buchung.",
    bible_badge: "Bibelstudium",
    bible_title: "Sommerbuchstudium über Jesaja",
    bible_text: "Jeden Donnerstagabend um 19:30 Uhr im Gemeindesaal. Bitte eigene Bibel mitbringen. Live-Stream ist verfügbar.",
    view_notices: "Alle Anzeigen sehen",
    
    nav_dashboard: "Dashboard",
    nav_bookings: "Buchungen",
    nav_katameros: "Katameros",
    nav_community: "Gemeinschaft",
    nav_settings: "Einstellungen",
    
    profile_logged_in: "Angemeldet als:",
    profile_settings: "Profil-Einstellungen",
    profile_logout: "Abmelden"
  }
};

const getLanguage = () => localStorage.getItem('preferredLanguage') || 'en-us';

const applyLanguage = (lang) => {
  if (!mainTranslations[lang]) lang = 'en-us';
  
  // Handle layout direction (RTL support)
  if (lang === 'ar-eg') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
  
  // Translate dashboard elements containing data-translate-key
  document.querySelectorAll('[data-translate-key]').forEach(el => {
    const key = el.getAttribute('data-translate-key');
    if (mainTranslations[lang][key]) {
      el.textContent = mainTranslations[lang][key];
    }
  });
};
