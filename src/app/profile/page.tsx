'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, getUserProfile, signOut } from '@/lib/auth'

interface UserData {
  id: string
  email: string
  status: 'active' | 'classified' | 'inactive'
  level: number
  full_name: string | null
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (currentUser) {
          const profile = await getUserProfile(currentUser.id)
          setUser(profile as UserData)
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error('Error loading profile:', err)
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  if (loading) {
    return <div className="p-8">Loading profile...</div>
  }

  if (!user) {
    return (
      <div className="p-8">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Not Authenticated</h2>
          <p className="text-slate-400 mb-6">Please sign in to view your profile.</p>
          <Link href="/login" className="text-blue-400 hover:text-blue-300">
            Go to Sign In →
          </Link>
        </div>
      </div>
    )
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'text-red-400'
      case 2:
        return 'text-orange-400'
      case 3:
        return 'text-yellow-400'
      case 4:
        return 'text-blue-400'
      case 5:
        return 'text-green-400'
      default:
        return 'text-slate-400'
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-100 mb-2">Researcher Profile</h1>
        <p className="text-slate-400">Your facility credentials and activity</p>
      </div>

      {/* Profile Card */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 space-y-6">
        {/* Identity */}
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Identity</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-slate-400 mb-1">Full Name</p>
              <p className="text-slate-100 font-semibold">{user.full_name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Email</p>
              <p className="text-slate-100 font-semibold">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="border-t border-slate-700 pt-6">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Facility Credentials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-slate-400 mb-2">Clearance Level</p>
              <div className="flex items-center gap-3">
                <span className={`text-3xl font-bold ${getLevelColor(user.level)}`}>
                  {user.level}
                </span>
                <span className="text-slate-400">
                  {user.level === 1
                    ? '(Highest)'
                    : user.level === 5
                      ? '(Lowest)'
                      : ''}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-2">Status</p>
              <p className="text-slate-100 font-semibold capitalize">
                {user.status === 'classified'
                  ? '🔒 Classified'
                  : user.status === 'active'
                    ? '✓ Active'
                    : '✗ Inactive'}
              </p>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="border-t border-slate-700 pt-6">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Permissions</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-3 text-slate-300">
              <span className="text-green-400">✓</span>
              Browse public entities (Level 5)
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <span className="text-green-400">✓</span>
              View Level {user.level} and higher{' '}
              {user.level > 1 && `(Levels ${user.level}-5)`}
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <span className="text-green-400">✓</span>
              Submit new entities to the database
            </li>
            {user.level <= 2 && (
              <li className="flex items-center gap-3 text-slate-300">
                <span className="text-blue-400">◆</span>
                Advanced research permissions
              </li>
            )}
          </ul>
        </div>

        {/* Actions */}
        <div className="border-t border-slate-700 pt-6 space-y-3">
          <Link
            href="/submit"
            className="block w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition text-center"
          >
            Submit New Entity
          </Link>
          <Link
            href="/entities"
            className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition text-center"
          >
            Browse Entities
          </Link>
          <button
            onClick={async () => {
              try {
                await signOut()
                router.push('/')
              } catch (err) {
                console.error('Sign out error:', err)
                alert('Failed to sign out')
              }
            }}
            className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
