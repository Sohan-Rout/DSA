import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function POST(req) {
  try {
    const { email, password, captchaToken, action } = await req.json()

    if (!email || !password)
      return new Response(JSON.stringify({ message: 'Email and password required' }), { status: 400 })

    if (action === 'signup') {
      if (!captchaToken)
        return new Response(JSON.stringify({ message: 'Captcha token missing' }), { status: 400 })

      // Verify Turnstile token
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: captchaToken,
        }),
      })

      const data = await verifyRes.json()
      if (!data.success)
        return new Response(JSON.stringify({ message: 'Captcha verification failed' }), { status: 400 })

      // Create Supabase user
      const { user, error } = await supabase.auth.admin.createUser({ email, password })
      if (error)
        return new Response(JSON.stringify({ message: error.message }), { status: 400 })

      return new Response(JSON.stringify({ message: 'Signup successful! Check your email.' }), { status: 200 })
    }

    else if (action === 'login') {
      return new Response(JSON.stringify({ message: 'Use frontend login with anon key' }), { status: 400 })
    }

    else {
      return new Response(JSON.stringify({ message: 'Invalid action' }), { status: 400 })
    }
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 })
  }
}