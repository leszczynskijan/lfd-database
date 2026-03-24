'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  userLevel?: number
  userStatus?: string
  isAuthenticated?: boolean
}

export default function Sidebar({
  userLevel = 5,
  userStatus = 'unregistered',
  isAuthenticated = false,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/entities?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const getLevelDisplay = () => {
    if (userStatus === 'classified') {
      return 'Classified'
    }
    return `Level ${userLevel} — ${userStatus}`
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-700 flex flex-col">
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation */}
        <nav className="p-6 space-y-4">
          <Link
            href="/"
            className="block text-slate-200 hover:text-blue-400 transition font-semibold text-lg"
          >
            Dashboard
          </Link>
          <Link
            href="/entities"
            className="block text-slate-200 hover:text-amber-400 transition font-semibold text-lg"
          >
            Entities
          </Link>
          {isAuthenticated && (
            <>
              <Link
                href="/submit"
                className="block text-slate-200 hover:text-green-400 transition font-semibold text-lg"
              >
                Submit Entity
              </Link>
              <Link
                href="/profile"
                className="block text-slate-200 hover:text-purple-400 transition font-semibold text-lg"
              >
                Profile
              </Link>
            </>
          )}
        </nav>

        {/* Search Section */}
        <div className="px-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Search Entities
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Status Bar - Bottom Left */}
      <div className="border-t border-slate-700 p-6 bg-slate-800">
        {isAuthenticated ? (
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Status
            </p>
            <p className="text-slate-200 font-semibold">{getLevelDisplay()}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Access
            </p>
            <Link
              href="/login"
              className="block w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition text-center text-sm"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded transition text-center text-sm"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
