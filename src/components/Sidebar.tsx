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
    <div className="fixed left-0 top-0 h-screen w-64 bg-yellow-950 border-r-4 border-yellow-700 flex flex-col" style={{borderRight: '4px solid #cc8800'}}>
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation */}
        <nav className="p-6 space-y-4">
          <Link
            href="/"
            className="block text-green-300 hover:text-yellow-300 transition font-bold text-lg uppercase tracking-wide"
          >
            Dashboard
          </Link>
          <Link
            href="/entities"
            className="block text-green-300 hover:text-yellow-400 transition font-bold text-lg uppercase tracking-wide"
          >
            Entities
          </Link>
          {isAuthenticated && (
            <>
              <Link
                href="/submit"
                className="block text-green-300 hover:text-lime-300 transition font-bold text-lg uppercase tracking-wide"
              >
                Submit Entity
              </Link>
              <Link
                href="/profile"
                className="block text-green-300 hover:text-yellow-400 transition font-bold text-lg uppercase tracking-wide"
              >
                Profile
              </Link>
            </>
          )}
        </nav>

        {/* Search Section */}
        <div className="px-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-bold text-yellow-600 uppercase tracking-widest">
              ▶ Search Database
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter query..."
              className="w-full px-3 py-2 bg-yellow-900 border-2 border-yellow-700 text-green-300 placeholder-yellow-700 focus:outline-none focus:border-yellow-400"
            />
            <button
              type="submit"
              className="w-full px-3 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded transition uppercase"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Status Bar - Bottom Left */}
      <div className="border-t-4 border-yellow-700 p-6 bg-yellow-900" style={{borderTop: '4px solid #cc8800'}}>
        {isAuthenticated ? (
          <div>
            <p className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-2">
              ▼ Clearance Level
            </p>
            <p className="text-green-300 font-bold text-sm">{getLevelDisplay()}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-bold text-yellow-600 uppercase tracking-widest">
              ▼ Access Control
            </p>
            <Link
              href="/login"
              className="block w-full px-3 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded transition text-center text-sm uppercase"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block w-full px-3 py-2 bg-yellow-800 hover:bg-yellow-700 text-green-300 font-bold rounded transition text-center text-sm uppercase"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
