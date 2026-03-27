'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { signIn } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn(email, password)
      if (result.error) {
        setError(result.error.message || 'Failed to sign in')
      } else {
        // Sign in successful, redirect to profile
        router.push('/profile')
      }
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="panel-border card">
          <div className="text-center mb-5">
            <Logo />
            <h1 className="text-3xl font-black text-emerald-200 mt-3">SECURE LOGIN</h1>
            <p className="text-slate-300 text-sm uppercase tracking-widest">Facility Personnel Only</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-slate-900 font-bold rounded transition"
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-3 text-center text-xs text-slate-400">
            Don’t have an account? <Link href="/signup" className="text-emerald-300 hover:text-emerald-200">Register</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
