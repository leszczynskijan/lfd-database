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
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#041021] border-r border-emerald-500/30 shadow-[2px_0_20px_rgba(0,255,0,.1)] flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-emerald-600/40">
        <h2 className="text-xs font-bold text-emerald-300 tracking-widest uppercase">LOCAL FACILITY DATABASE</h2>
        <p className="text-xs text-slate-300 mt-1">STATUS: OPERATIONAL</p>
      </div>
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation */}
        <nav className="p-4 space-y-3">
          <h3 className="text-xs text-emerald-300 uppercase tracking-wider font-bold">DATABASE SECTIONS</h3>
          <Link
            href="/"
            className="block text-slate-200 hover:text-emerald-300 transition font-semibold text-sm"
          >
            • Dashboard
          </Link>
          <Link
            href="/entities"
            className="block text-slate-200 hover:text-emerald-300 transition font-semibold text-sm"
          >
            • Entity Database
          </Link>
          {isAuthenticated && (
            <>
              <Link
                href="/submit"
                className="block text-slate-200 hover:text-emerald-300 transition font-semibold text-sm"
              >
                • Submit Report
              </Link>
              <Link
                href="/profile"
                className="block text-slate-200 hover:text-emerald-300 transition font-semibold text-sm"
              >
                • User Profile
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
      <div className="border-t border-emerald-500/30 p-4 bg-[#041421]">
        {isAuthenticated ? (
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ACCESS LEVEL</p>
            <p className="text-sm font-bold text-emerald-300">{getLevelDisplay()}</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AUTHENTICATION</p>
            <Link
              href="/login"
              className="block w-full px-2 py-2 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-100 font-semibold rounded transition text-center text-xs"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block w-full px-2 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold rounded transition text-center text-xs"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
