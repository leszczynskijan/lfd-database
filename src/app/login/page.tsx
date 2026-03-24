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
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Form */}
        <div className="bg-yellow-900 border-4 border-yellow-700 p-8 space-y-6" style={{fontFamily: "'Courier Prime', monospace"}}>
          <div>
            <h1 className="text-3xl font-bold text-green-300 uppercase tracking-wider">Access Terminal</h1>
            <p className="text-yellow-600 mt-2 uppercase text-xs tracking-widest">ENTER CREDENTIALS</p>
          </div>

          {error && (
            <div className="bg-red-900 border-2 border-red-700 text-red-200 px-4 py-3 rounded">
              <p className="font-bold uppercase text-xs">■ ERROR</p>
              <p className="mt-1">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-yellow-600 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-yellow-900 border-2 border-yellow-700 text-green-300 placeholder-yellow-700"
                placeholder="user@facility.local"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-yellow-600 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-yellow-900 border-2 border-yellow-700 text-green-300 placeholder-yellow-700"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-red-700 hover:bg-red-800 disabled:bg-yellow-800 text-white font-bold rounded transition uppercase tracking-wide text-sm"
            >
              {loading ? '△ AUTHORIZING...' : '▶ SUBMIT CREDENTIALS'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-yellow-600 text-xs uppercase tracking-widest">
              NO ACCOUNT?{' '}
              <Link href="/signup" className="text-green-300 hover:text-yellow-300">
                REQUEST ACCESS
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
