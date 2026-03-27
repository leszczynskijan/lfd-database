'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { signUp } from '@/lib/auth'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const result = await signUp(email, password)
      if (result.error) {
        setError(result.error.message || 'Failed to sign up')
      } else {
        // Sign up successful, redirect to login
        router.push('/login')
      }
    } catch (err) {
      setError('Failed to sign up. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10">
      <div className="w-full max-w-md">
        <div className="panel-border card">
          <div className="text-center mb-5">
            <Logo />
            <h1 className="text-3xl font-black text-emerald-200 mt-3">REGISTER ACCESS</h1>
            <p className="text-slate-300 text-sm uppercase tracking-widest">Facility Personnel Only</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-[11px] font-semibold text-emerald-200 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-[#0f1c2d] border border-emerald-500/20 rounded text-emerald-100 placeholder-slate-400 outline-none focus:border-emerald-400 focus:ring-emerald-400/30"
                placeholder="Dr. Anomalus"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[11px] font-semibold text-emerald-200 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#0f1c2d] border border-emerald-500/20 rounded text-emerald-100 placeholder-slate-400 outline-none focus:border-emerald-400 focus:ring-emerald-400/30"
                placeholder="you@scp.local"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[11px] font-semibold text-emerald-200 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#0f1c2d] border border-emerald-500/20 rounded text-emerald-100 placeholder-slate-400 outline-none focus:border-emerald-400 focus:ring-emerald-400/30"
                placeholder="********"
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-[11px] font-semibold text-emerald-200 uppercase tracking-wider mb-1">
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#0f1c2d] border border-emerald-500/20 rounded text-emerald-100 placeholder-slate-400 outline-none focus:border-emerald-400 focus:ring-emerald-400/30"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-slate-900 font-bold rounded transition"
            >
              {loading ? 'Registering...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-3 text-center text-xs text-slate-400">
            Already have an account? <Link href="/login" className="text-emerald-300 hover:text-emerald-200">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Dr. Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-200 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-200 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-semibold text-slate-200 mb-2">
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white font-semibold rounded transition"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 hover:text-blue-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
