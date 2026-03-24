import Logo from '@/components/Logo'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Logo */}
      <div className="mb-12">
        <Logo />
      </div>

      {/* Title */}
      <h1 className="text-6xl font-bold text-slate-100 mb-4 text-center">
        Local Facility Database
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-slate-400 text-center max-w-2xl mb-12">
        A comprehensive database of anomalous entities and phenomena. Access restricted to authorized research personnel.
      </p>

      {/* Quick Links */}
      <div className="flex gap-6">
        <Link
          href="/entities"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Browse Entities
        </Link>
        <Link
          href="/login"
          className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold rounded-lg transition"
        >
          Sign In
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-4xl">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-amber-400 mb-2">🔍 Discover</h3>
          <p className="text-slate-300">
            Explore a vast collection of documented entities and anomalous phenomena.
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-400 mb-2">📚 Research</h3>
          <p className="text-slate-300">
            Access detailed research notes, containment procedures, and recovery information.
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-400 mb-2">✍️ Contribute</h3>
          <p className="text-slate-300">
            Submit your own discoveries and findings to the database as an authorized researcher.
          </p>
        </div>
      </div>
    </div>
  )
}
