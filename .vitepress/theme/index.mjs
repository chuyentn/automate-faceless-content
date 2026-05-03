import DefaultTheme from 'vitepress/theme'
import './style.css'
import AuthForm from './components/AuthForm.vue'
import AdminDashboard from './components/AdminDashboard.vue'
import { auth } from './firebase.mjs'
import { onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

export const globalAuthState = ref({ user: null, loading: true, isAdmin: false })

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('AuthForm', AuthForm)
    app.component('AdminDashboard', AdminDashboard)

    if (typeof window !== 'undefined') {
      if (auth) {
        onAuthStateChanged(auth, (user) => {
          globalAuthState.value.user = user
          globalAuthState.value.isAdmin = user?.uid === '6FzFMjZJPMfqU7fLzuY5th5wQnx2' || user?.email === 'tranngocchuyen1980@gmail.com'
          globalAuthState.value.loading = false
        })
      } else {
        globalAuthState.value.loading = false
      }

      const loadTwemoji = () => {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js'
        script.crossOrigin = 'anonymous'
        script.onload = () => {
          const parse = () => {
            if (window.twemoji) {
              window.twemoji.parse(document.body, {
                folder: 'svg',
                ext: '.svg',
                base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/'
              })
            }
          }
          parse()
          router.onAfterRouteChanged = () => setTimeout(parse, 100)

          // Also parse when menu opens (for language dropdown)
          const observer = new MutationObserver(() => parse())
          observer.observe(document.body, { childList: true, subtree: true })
        }
        document.head.appendChild(script)
      }

      if (document.readyState === 'complete') {
        loadTwemoji()
      } else {
        window.addEventListener('load', loadTwemoji)
      }
    }
  }
}
