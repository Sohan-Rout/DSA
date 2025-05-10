'use client'

import { useEffect, useState } from 'react'
import { getToken } from '../../utils/auth'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken()
      if (!token) return router.push('/login')

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const json = await res.json()
      if (res.ok) setData(json)
      else router.push('/login')

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p>Email: {data.email}</p>
      <p>Status: {data.is_premium ? 'Premium ✅' : 'Free ❌'}</p>

      {!data.is_premium && (
        <button
          className="mt-4 bg-yellow-500 px-4 py-2 text-white"
          onClick={async () => {
            const token = await getToken()
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upgrade`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` },
            })

            if (res.ok) location.reload()
            else alert('Upgrade failed.')
          }}
        >
          Upgrade to Premium
        </button>
      )}
    </div>
  )
}