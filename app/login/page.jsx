'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else router.push('/dashboard')
  }

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else alert('Check your email for confirmation.')
  }

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-bold">Login / Signup</h1>
      <input
        className="border p-2 w-full"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2">
        Login
      </button>
      <button onClick={handleSignup} className="bg-green-600 text-white px-4 py-2">
        Signup
      </button>
    </div>
  )
}