'use client'

import { useEffect, useState } from 'react'
import { getToken } from '../../utils/auth'
import { useRouter } from 'next/navigation'
import { FiArrowLeft, FiCheckCircle, FiAward, FiBarChart2, FiLock } from 'react-icons/fi'

export default function DashboardPage() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = await getToken()
        if (!token) {
          setIsAuthenticated(false)
          setLoading(false)
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data')
        }

        const data = await response.json()
        
        // Initialize progress tracking
        const progressData = {
          sorting: 0,
          searching: 0,
          graphs: 0,
          dynamicProgramming: 0
        }

        setUserData({
          ...data,
          progress: progressData
        })
        setIsAuthenticated(true)
      } catch (err) {
        console.error('Dashboard error:', err)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [router])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Demo dashboard for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-gray-50 p-4 md:p-8">
        {/* Blur overlay and lock icon */}
        <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
          <div className="text-center p-8 bg-white border border-gray-200 rounded-xl shadow-lg max-w-md">
            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiLock className="text-gray-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Locked</h2>
            <p className="text-gray-600 mb-6">
              Sign in to access your personalized learning dashboard and track your progress.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-colors shadow-md"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Demo dashboard content (blurred) */}
        <DashboardContent 
          userData={{
            email: "example@user.com",
            is_premium: false,
            progress: {
              sorting: 3,
              searching: 2,
              graphs: 1,
              dynamicProgramming: 0
            }
          }} 
          isDemo={true}
        />
      </div>
    )
  }

  // Real dashboard for authenticated users
  return <DashboardContent userData={userData} isDemo={false} />
}

function DashboardContent({ userData, isDemo }) {
  const router = useRouter()

  const handleUpgrade = async () => {
    try {
      const token = await getToken()
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upgrade`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upgrade failed')
      }

      // Refresh user data after upgrade
      const updatedResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const updatedData = await updatedResponse.json()
      setUserData(prev => ({
        ...prev,
        ...updatedData,
        is_premium: true
      }))
      
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className={`min-h-screen bg-gray-50 p-4 md:p-8 ${isDemo ? 'filter blur-sm' : ''}`}>
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-gray-700">{userData?.email}</span>
          </div>
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            userData?.is_premium 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}>
            {userData?.is_premium ? (
              <>
                <FiAward className="mr-1" /> Premium
              </>
            ) : 'Free Tier'}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {isDemo ? 'Demo Dashboard' : 'Welcome back!'}
          </h1>
          <p className="text-gray-600">
            {userData?.is_premium 
              ? 'Enjoy your premium learning experience'
              : isDemo 
                ? 'Sign in to track your real progress' 
                : 'Upgrade to unlock all features'}
          </p>
        </section>

        {/* Progress Overview */}
        <section className="mb-10 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FiBarChart2 className="mr-2 text-blue-500" />
              {isDemo ? 'Sample Progress' : 'Your Learning Progress'}
            </h2>
            <div className="text-sm text-gray-500">
              {Object.values(userData?.progress || {}).reduce((sum, val) => sum + val, 0)}/36 completed
            </div>
          </div>

          <div className="space-y-6">
            <ProgressBar 
              name="Sorting Algorithms" 
              value={userData?.progress?.sorting || 0} 
              max={10} 
            />
            <ProgressBar 
              name="Search Algorithms" 
              value={userData?.progress?.searching || 0} 
              max={8} 
            />
            <ProgressBar 
              name="Graph Algorithms" 
              value={userData?.progress?.graphs || 0} 
              max={12} 
            />
            <ProgressBar 
              name="Dynamic Programming" 
              value={userData?.progress?.dynamicProgramming || 0} 
              max={6} 
            />
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-10 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <FiCheckCircle className="mr-2 text-green-500" />
            {isDemo ? 'Sample Activity' : 'Recent Activity'}
          </h2>
          
          <div className="space-y-4">
            {isDemo ? (
              <>
                <ActivityItem name="Bubble Sort" daysAgo={2} />
                <ActivityItem name="Binary Search" daysAgo={5} />
                <ActivityItem name="Depth-First Search" daysAgo={7} />
              </>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiCheckCircle className="text-gray-400 text-xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">
                  {isDemo ? 'Sample activities shown' : 'Start learning!'}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {isDemo ? 'Sign in to see your real activity' : 'Your completed algorithms will appear here.'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Upgrade Banner (for free users) */}
        {!userData?.is_premium && !isDemo && (
          <section className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-bold mb-2">Unlock Premium Features</h2>
                  <p className="opacity-90 max-w-lg">
                    Get full access to all algorithms and visualizations.
                  </p>
                </div>
                <button
                  onClick={handleUpgrade}
                  className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md whitespace-nowrap"
                >
                  Upgrade to Premium
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function ProgressBar({ name, value, max }) {
  const percentage = Math.min(100, (value / max) * 100)
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-gray-700 font-medium">{name}</span>
        <span className="text-sm text-gray-500">
          {value}/{max}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}

function ActivityItem({ name, daysAgo }) {
  return (
    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-4">
        <FiCheckCircle />
      </div>
      <div>
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">Completed {daysAgo} day{daysAgo !== 1 ? 's' : ''} ago</p>
      </div>
    </div>
  )
}