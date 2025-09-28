'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { FiMail, FiLock, FiUser, FiLogIn, FiUserPlus, FiSun, FiMoon } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Turnstile = dynamic(
  () => import('@marsidev/react-turnstile').then((mod) => mod.Turnstile),
  { ssr: false }
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [theme, setTheme] = useState('light')
  const [captchaToken, setCaptchaToken] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const handleAuth = async () => {
    setLoading(true)
    setError('')

    try {
      if (!captchaToken) throw new Error('Please complete captcha')

      if (isLogin) {
        // Verify captcha first via API route
        const verifyRes = await fetch('/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, captchaToken, action: 'login' }),
        })
        const verifyData = await verifyRes.json()
        if (!verifyData.success) throw new Error(verifyData.message || 'Captcha verification failed')

        // After captcha verified, login using frontend anon key
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error

        router.push('/dashboard')
      } else {
        // Signup flow remains the same
        const res = await fetch('/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, captchaToken, action: 'signup' }),
        })
        const data = await res.json()
        if (!data.success) throw new Error(data.message || 'Signup failed')
        alert(data.message)
        setIsLogin(true)
      }
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) console.error('Google sign-in error:', error.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-blue-100 dark:text-blue-200">
              {isLogin ? 'Sign in to access your dashboard' : 'Join us to get started'}
            </p>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-blue-700" aria-label="Toggle theme">
            {theme === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
          </button>
        </div>

        <div className="p-6 space-y-4">
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-3 rounded">
              {error}
            </motion.div>
          )}

          {/* Form */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Full name (optional)"
                />
              </div>
            )}

            {/* Turnstile for both login and signup */}
            <div className="flex justify-center">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                onSuccess={(token) => setCaptchaToken(token)}
              />
            </div>

            <button
              onClick={handleAuth}
              disabled={loading}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all ${
                loading
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-800 shadow-md hover:shadow-lg'
              }`}
            >
              {loading ? (
                'Processing...'
              ) : isLogin ? (
                <>
                  <FiLogIn className="mr-2" /> Sign In
                </>
              ) : (
                <>
                  <FiUserPlus className="mr-2" /> Sign Up
                </>
              )}
            </button>
          </div>

          {/* Switch forms */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button onClick={() => setIsLogin(false)} className="text-blue-600 dark:text-blue-400 hover:underline">
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button onClick={() => setIsLogin(true)} className="text-blue-600 dark:text-blue-400 hover:underline">
                  Sign in
                </button>
              </p>
            )}
          </div>

          {/* Google OAuth */}
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
          >
              <img src="./google.webp" width={24}></img>
              <span className='mx-2'>Continue with Google</span>
          </button>

          <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-blue-500 dark:text-blue-400 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-500 dark:text-blue-400 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}