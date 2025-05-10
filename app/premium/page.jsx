'use client'

import { useEffect, useState } from 'react'
import { getToken } from '../../utils/auth'
import { useRouter } from 'next/navigation'

export default function PremiumPage() {
  const [content, setContent] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchContent = async () => {
      const token = await getToken()
      if (!token) return router.push('/login')

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/premium-content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 403) {
        alert('Premium users only!')
        router.push('/dashboard')
      } else {
        const json = await res.json()
        setContent(json.content)
      }
    }

    fetchContent()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Premium Content</h1>
      <p className="mt-4">{content}</p>
    </div>
  )
}