<script setup>
import { ref } from 'vue'
import { auth } from '../firebase.mjs'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth'

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const successMsg = ref('')

const setMode = (login) => {
  isLogin.value = login
  error.value = ''
  successMsg.value = ''
}

const handleGoogleSignIn = async () => {
  loading.value = true
  error.value = ''
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
    successMsg.value = 'Successfully signed in with Google!'
    setTimeout(() => { window.location.href = '/' }, 1200)
  } catch (err) {
    console.error(err)
    if (err.code !== 'auth/popup-closed-by-user') {
      error.value = 'Google sign-in failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

const handleForgotPassword = async () => {
  if (!email.value) {
    error.value = 'Please enter your email address first.'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await sendPasswordResetEmail(auth, email.value)
    successMsg.value = 'Password reset email sent! Check your inbox.'
  } catch (err) {
    error.value = 'Could not send reset email. Check the address.'
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields.'
    return
  }

  loading.value = true
  error.value = ''
  successMsg.value = ''

  try {
    if (isLogin.value) {
      await signInWithEmailAndPassword(auth, email.value, password.value)
      successMsg.value = 'Successfully logged in!'
      setTimeout(() => { window.location.href = '/' }, 1200)
    } else {
      await createUserWithEmailAndPassword(auth, email.value, password.value)
      successMsg.value = 'Account created successfully!'
      setTimeout(() => { window.location.href = '/' }, 1200)
    }
  } catch (err) {
    console.error(err)
    switch (err.code) {
      case 'auth/invalid-email':
        error.value = 'Invalid email address format.'
        break
      case 'auth/user-not-found':
        error.value = 'No account found with this email.'
        break
      case 'auth/wrong-password':
        error.value = 'Incorrect password.'
        break
      case 'auth/email-already-in-use':
        error.value = 'Email is already registered.'
        break
      case 'auth/weak-password':
        error.value = 'Password should be at least 6 characters.'
        break
      default:
        error.value = 'An error occurred. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

// Mock social cards
const socialCards = [
  { id: 1, type: 'facebook', user: '@johndoe', content: 'Automating content is the future! 🚀', likes: '1.2k', comments: '45' },
  { id: 2, type: 'instagram', user: '@creative_mind', content: 'Check out this viral reel structure.', likes: '8.4k', comments: '120' },
  { id: 3, type: 'linkedin', user: '@growth_hacker', content: 'How we scaled to 10M views in 30 days.', likes: '2.5k', comments: '89' },
  { id: 4, type: 'instagram', user: '@faceless_mastery', content: 'Consistency is key. Here is my secret sauce.', likes: '12k', comments: '210' },
  { id: 5, type: 'facebook', user: '@community_lead', content: 'Join our private mastermind group.', likes: '450', comments: '12' },
  { id: 6, type: 'linkedin', user: '@tech_guru', content: 'AI agents are changing everything.', likes: '3.1k', comments: '56' }
]
</script>

<template>
  <div class="auth-page-wrapper">
    <!-- Left Section: Form -->
    <div class="auth-section form-section">
      <div class="logo-container">
        <div class="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#470081" stroke="#470081" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="logo-text">Faceless <span>MASTERY</span></span>
        </div>
      </div>

      <div class="auth-card">
        <div class="auth-header">
          <h2>Welcome Back!</h2>
          <p>{{ isLogin ? 'Sign in to unleash your content.' : 'Create your account to get started.' }}</p>
        </div>

        <div class="tab-switcher">
          <button type="button" class="tab-btn" :class="{ active: isLogin }" @click="setMode(true)" :disabled="loading">Login</button>
          <button type="button" class="tab-btn" :class="{ active: !isLogin }" @click="setMode(false)" :disabled="loading">Sign Up</button>
        </div>

        <button type="button" class="google-btn" @click="handleGoogleSignIn" :disabled="loading">
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          <span>Continue with Google</span>
        </button>

        <div class="divider">
          <span>Or continue with email</span>
        </div>

        <form @submit.prevent="handleSubmit" class="auth-form">
          <div class="input-group">
            <label for="auth-email">Email Address</label>
            <input id="auth-email" type="email" v-model="email" placeholder="you@example.com" required :disabled="loading" />
          </div>

          <div class="input-group">
            <div class="label-row">
              <label for="auth-password">Password</label>
              <button v-if="isLogin" type="button" class="forgot-link" @click="handleForgotPassword" :disabled="loading">Forgot Password?</button>
            </div>
            <input id="auth-password" type="password" v-model="password" placeholder="••••••••" required :disabled="loading" />
          </div>

          <transition name="fade">
            <div v-if="error" class="alert error-alert">{{ error }}</div>
          </transition>
          <transition name="fade">
            <div v-if="successMsg" class="alert success-alert">{{ successMsg }}</div>
          </transition>

          <button type="submit" class="submit-btn" :disabled="loading">
            <span v-if="!loading" class="btn-content">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
              <span>{{ isLogin ? 'Sign In' : 'Sign Up' }}</span>
            </span>
            <span v-else class="loader"></span>
          </button>
        </form>

        <div class="auth-footer">
          <p>By signing in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
        </div>
      </div>
      
      <a href="/" class="back-link">← Back to Faceless Video Mastery Home</a>
    </div>

    <!-- Right Section: Masonry Grid -->
    <div class="auth-section grid-section">
      <div class="masonry-grid">
        <div v-for="card in socialCards" :key="card.id" class="social-card" :class="card.type">
          <div class="card-header">
            <div class="user-info">
              <div class="avatar"></div>
              <span class="username">{{ card.user }}</span>
            </div>
            <div class="platform-icon" v-html="getPlatformIcon(card.type)"></div>
          </div>
          <div class="card-content">
            <p>{{ card.content }}</p>
          </div>
          <div class="card-footer">
            <div class="stat"><span>❤️</span> {{ card.likes }}</div>
            <div class="stat"><span>💬</span> {{ card.comments }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getPlatformIcon(type) {
      if (type === 'facebook') return '<svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
      if (type === 'instagram') return '<svg width="16" height="16" viewBox="0 0 24 24" fill="url(#ig-grad)"><defs><linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#f09433"/><stop offset="25%" style="stop-color:#e6683c"/><stop offset="50%" style="stop-color:#dc2743"/><stop offset="75%" style="stop-color:#cc2366"/><stop offset="100%" style="stop-color:#bc1888"/></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.612 6.773 6.971 6.972 1.28.058 1.689.072 4.947.072s3.667-.014 4.947-.072c4.351-.2 6.77-2.618 6.97-6.971.058-1.28.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.2-4.353-2.612-6.773-6.972-6.972C15.667.014 15.259 0 12 0z"/><path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z"/><path d="M18.406 4.144a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>'
      if (type === 'linkedin') return '<svg width="16" height="16" viewBox="0 0 24 24" fill="#0077B5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>'
      return ''
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&display=swap');

.auth-page-wrapper {
  display: flex;
  min-height: 100vh;
  width: 100%;
  font-family: 'Geist', sans-serif;
  background-color: #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

/* --- Left Section (Form) --- */
.auth-section.form-section {
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: #f0f0f0;
  overflow-y: auto;
  position: relative;
}

.logo-container {
  margin-bottom: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0a0a29;
  letter-spacing: -0.5px;
}

.logo-text span {
  color: #470081;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  margin: auto 0;
  background: #ffffff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.auth-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #470081;
  margin: 0 0 8px 0;
}

.auth-header p {
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 32px;
}

/* Tab Switcher */
.tab-switcher {
  display: flex;
  background: #f0f0f0;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 24px;
}

.tab-btn {
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  color: #6b7280;
  transition: all 0.2s;
}

.tab-btn.active {
  background: #ffffff;
  color: #0a0a29;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Social Login */
.google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  margin-bottom: 24px;
  transition: background 0.2s;
}

.google-btn:hover { background: #f9fafb; }

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #e5e7eb; }
.divider span { font-size: 0.8rem; color: #9ca3af; }

/* Form */
.auth-form { display: flex; flex-direction: column; gap: 20px; }
.input-group { display: flex; flex-direction: column; gap: 6px; }
.label-row { display: flex; justify-content: space-between; }
.input-group label { color: #0a0a29; font-size: 0.85rem; font-weight: 500; }
.forgot-link { background: none; border: none; color: #470081; font-size: 0.75rem; font-weight: 500; cursor: pointer; padding: 0; }

.input-group input {
  width: 100%;
  background: rgba(240, 240, 240, 0.7);
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 14px;
  color: #0a0a29;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.input-group input:focus { border-color: #470081; }

.alert { padding: 10px; border-radius: 6px; font-size: 0.8rem; margin-bottom: 10px; }
.error-alert { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; }
.success-alert { background: #f0fdf4; color: #16a34a; border: 1px solid #dcfce7; }

.submit-btn {
  background: #470081;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s;
}

.submit-btn:hover { opacity: 0.9; }
.btn-content { display: flex; align-items: center; gap: 8px; }

.auth-footer { margin-top: 24px; text-align: center; }
.auth-footer p { font-size: 0.8rem; color: #6b7280; }
.auth-footer a { color: #0a0a29; text-decoration: underline; font-weight: 500; }

.back-link { margin-top: 40px; color: #6b7280; font-size: 0.9rem; text-decoration: none; }
.back-link:hover { text-decoration: underline; }

/* --- Right Section (Grid) --- */
.auth-section.grid-section {
  width: 60%;
  background-color: #f0f0f0;
  display: flex;
  padding: 40px;
  overflow: hidden;
  position: relative;
}

.masonry-grid {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 1000px; /* Force height for masonry-like effect via column-count or flex */
  width: 100%;
  column-count: 2;
  column-gap: 20px;
}

.social-card {
  break-inside: avoid;
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s;
  width: 100%;
}

.social-card:hover { transform: scale(1.02); }

.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.user-info { display: flex; align-items: center; gap: 8px; }
.avatar { width: 32px; height: 32px; background: #e5e7eb; border-radius: 50%; }
.username { font-size: 0.85rem; font-weight: 600; color: #0a0a29; }
.card-content p { font-size: 0.9rem; color: #374151; margin: 0 0 12px 0; line-height: 1.4; }
.card-footer { display: flex; gap: 16px; border-top: 1px solid #f3f4f6; padding-top: 12px; }
.stat { font-size: 0.8rem; color: #6b7280; display: flex; align-items: center; gap: 4px; }

/* Responsive */
@media (max-width: 1024px) {
  .grid-section { display: none; }
  .auth-section.form-section { width: 100%; align-items: center; }
}

@media (max-width: 480px) {
  .auth-card { padding: 24px; border-radius: 0; box-shadow: none; background: transparent; }
  .form-section { padding: 20px; background: #ffffff; }
  .auth-page-wrapper { background: #ffffff; }
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
