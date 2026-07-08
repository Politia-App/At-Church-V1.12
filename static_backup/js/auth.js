// --- AUTHENTICATION & SESSION MANAGEMENT VIA FIREBASE ---

// Helper to look up a user by identifier (Email, Phone, or Username) in Firestore
const getUserByIdentifier = async (identifier) => {
  if (!identifier) return null;
  const lowerId = identifier.toLowerCase();
  
  try {
    const usersRef = window.firebaseDb.collection("users");
    
    // Check if it's an email
    const emailQuery = await usersRef.where("email", "==", lowerId).get();
    if (!emailQuery.empty) return emailQuery.docs[0].data();
    
    // Check if it's a phone
    const phoneQuery = await usersRef.where("phone", "==", lowerId).get();
    if (!phoneQuery.empty) return phoneQuery.docs[0].data();
    
    // Check if it's a username
    const usernameQuery = await usersRef.where("username", "==", lowerId).get();
    if (!usernameQuery.empty) return usernameQuery.docs[0].data();
    
    return null;
  } catch (err) {
    console.error("Error looking up user:", err);
    return null;
  }
};

// Verify auth state for current page
const checkAuth = () => {
  window.firebaseAuth.onAuthStateChanged(async (user) => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    if (user) {
      try {
        const userDoc = await window.firebaseDb.collection("users").doc(user.uid).get();
        if (!userDoc.exists) {
          // If they are logged in but have no firestore profile document,
          // they haven't finished registration.
          // Allow them on login.html to complete registration, but block dashboard.html.
          if (currentPath === 'dashboard.html') {
            await window.firebaseAuth.signOut();
            window.location.href = 'login.html';
          }
          return;
        }
        
        // Profile exists, go to dashboard if on login
        if (currentPath === 'login.html') {
          window.location.href = 'dashboard.html';
        }
      } catch (err) {
        console.error("Error verifying registration status:", err);
      }
    } else {
      if (currentPath === 'dashboard.html') {
        window.location.href = 'login.html';
      }
    }
  });
};

// Check for Firebase passwordless email sign-in link on page load
const handleEmailLinkVerification = async () => {
  if (window.firebaseAuth.isSignInWithEmailLink(window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please enter your email for confirmation:');
    }
    
    if (email) {
      try {
        const result = await window.firebaseAuth.signInWithEmailLink(email, window.location.href);
        window.localStorage.removeItem('emailForSignIn');
        console.log("Successfully signed in with email link!", result.user.uid);
        
        // Restore registration state if any exists
        const savedStateStr = localStorage.getItem('pendingRegistrationState');
        if (savedStateStr) {
          const state = JSON.parse(savedStateStr);
          
          // Switch tab to registration form
          if (typeof switchTab === 'function') {
            switchTab('register');
          }
          
          // Restore form fields
          if (document.getElementById('reg-arabic-name')) document.getElementById('reg-arabic-name').value = state.arabicName || '';
          if (document.getElementById('reg-english-name')) document.getElementById('reg-english-name').value = state.englishName || '';
          if (document.getElementById('reg-dob')) document.getElementById('reg-dob').value = state.dob || '';
          if (document.getElementById('reg-phone')) document.getElementById('reg-phone').value = state.phone || '';
          if (document.getElementById('country-code-select')) {
             document.getElementById('country-code-select').value = state.countryCode || '+20';
             if (typeof updatePhonePlaceholder === 'function') {
                updatePhonePlaceholder(document.getElementById('country-code-select'));
             }
          }
          
          // Mark phone verification as completed/verified
          if (state.phoneVerified) {
             window.phoneVerified = true;
             const otpGroup = document.getElementById('otp-input-group');
             if (otpGroup) otpGroup.classList.remove('hidden');
             const otpInput = document.getElementById('reg-otp');
             if (otpInput) otpInput.value = '123456';
             const otpBtn = document.getElementById('btn-send-otp');
             if (otpBtn) {
                 otpBtn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Verified</span>`;
                 otpBtn.classList.add('btn-outline');
                 otpBtn.classList.remove('btn-secondary');
                 otpBtn.disabled = true;
             }
          }

          // Mark email verification as completed/verified
          if (document.getElementById('reg-email')) document.getElementById('reg-email').value = email;
          const emailLinkGroup = document.getElementById('email-link-sent-group');
          if (emailLinkGroup) emailLinkGroup.classList.remove('hidden');
          const emailBtn = document.getElementById('btn-send-email-otp');
          if (emailBtn) {
             emailBtn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Verified</span>`;
             emailBtn.classList.add('btn-outline');
             emailBtn.classList.remove('btn-secondary');
             emailBtn.disabled = true;
          }

          // Restore church selection state
          if (state.selectedChurches) {
             window.selectedChurches = state.selectedChurches;
             if (typeof renderSelectedChurchesTags === 'function') {
                renderSelectedChurchesTags();
             }
          }
          
          // Set registration step directly to step 6 (Education)
          window.currentStep = state.currentStep || 6;
          if (typeof updateUI === 'function') {
            updateUI();
          }
          
          // Display success notification alert
          if (typeof showAlert === 'function') {
            showAlert('Email address successfully verified!', 'success');
          }
        }
      } catch (error) {
        console.error("Error signing in with email link:", error);
        if (typeof showAlert === 'function') {
          showAlert('Failed to verify email link: ' + error.message, 'error');
        }
      }
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPath === 'login.html') {
    handleEmailLinkVerification();
  }
});

// Login user
const login = async (identifier, password) => {
  try {
    let emailToLogin = identifier;
    
    // If identifier doesn't look like an email, try resolving it to an email via Firestore
    if (!identifier.includes('@')) {
      const userDoc = await getUserByIdentifier(identifier);
      if (userDoc && userDoc.email) {
        emailToLogin = userDoc.email;
      } else {
        return { success: false, message: 'Invalid credentials. Please check your email, phone, or username and password.' };
      }
    }
    
    await window.firebaseAuth.signInWithEmailAndPassword(emailToLogin, password);
    return { success: true };
  } catch (error) {
    let message = 'Invalid credentials. Please check your email, phone, or username and password.';
    if (error.code === 'auth/user-not-found') message = 'No account found with these credentials.';
    if (error.code === 'auth/wrong-password') message = 'Incorrect password.';
    return { success: false, message };
  }
};

// Reset user password (sends password reset email)
const resetPassword = async (identifier) => {
  try {
    let targetEmail = identifier;
    
    // Resolve identifier to email if needed
    if (!identifier.includes('@')) {
      const userDoc = await getUserByIdentifier(identifier);
      if (userDoc && userDoc.email) {
        targetEmail = userDoc.email;
      } else {
        return { success: false, message: 'User not found. Please check your email, phone, or username.' };
      }
    }
    
    await window.firebaseAuth.sendPasswordResetEmail(targetEmail);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Logout user
const logout = async () => {
  try {
    await window.firebaseAuth.signOut();
    window.location.href = 'login.html';
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// Run checkAuth immediately on script load
checkAuth();
