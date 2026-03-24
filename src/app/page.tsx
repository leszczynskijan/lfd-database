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
      <h1 className="text-6xl font-bold text-green-300 mb-4 text-center uppercase tracking-wide" style={{fontFamily: "'Courier Prime', monospace"}}>
        Local Facility Database
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-yellow-600 text-center max-w-2xl mb-12 uppercase tracking-widest" style={{fontFamily: "'Courier Prime', monospace"}}>
        █ CLASSIFIED RESEARCH ARCHIVE █
      </p>
      <p className="text-sm text-green-400 text-center max-w-2xl mb-12" style={{fontFamily: "'Courier Prime', monospace"}}>
        A comprehensive database of anomalous entities and phenomena.
        <br />
        Access restricted to authorized research personnel only.
      </p>

      {/* Quick Links */}
      <div className="flex gap-6 mb-12">
        <Link
          href="/entities"
          className="px-8 py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded transition uppercase tracking-wide" style={{fontFamily: "'Courier Prime', monospace"}}
        >
          ▶▶ Browse Archive
        </Link>
        <Link
          href="/login"
          className="px-8 py-3 bg-yellow-800 hover:bg-yellow-700 text-green-300 font-bold rounded transition uppercase tracking-wide" style={{fontFamily: "'Courier Prime', monospace"}}
        >
          ▶▶ Login
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-4xl">
        <div className="bg-yellow-900 border-4 border-yellow-700 rounded p-6" style={{borderStyle: 'double'}}>
          <h3 className="text-lg font-bold text-yellow-300 mb-2 uppercase tracking-widest" style={{fontFamily: "'Courier Prime', monospace"}}>■ DISCOVER</h3>
          <p className="text-green-300" style={{fontFamily: "'Courier Prime', monospace"}}>
            Explore a vast collection of documented entities and anomalous phenomena.
          </p>
        </div>
        <div className="bg-yellow-900 border-4 border-yellow-700 rounded p-6" style={{borderStyle: 'double'}}>
          <h3 className="text-lg font-bold text-yellow-300 mb-2 uppercase tracking-widest" style={{fontFamily: "'Courier Prime', monospace"}}>■ RESEARCH</h3>
          <p className="text-green-300" style={{fontFamily: "'Courier Prime', monospace"}}>
            Access detailed research notes, containment procedures, and recovery information.
          </p>
        </div>
        <div className="bg-yellow-900 border-4 border-yellow-700 rounded p-6" style={{borderStyle: 'double'}}>
          <h3 className="text-lg font-bold text-yellow-300 mb-2 uppercase tracking-widest" style={{fontFamily: "'Courier Prime', monospace"}}>■ CONTRIBUTE</h3>
          <p className="text-green-300" style={{fontFamily: "'Courier Prime', monospace"}}>
            Submit your own discoveries and findings to the database as an authorized researcher.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center">
        <p className="text-xs text-yellow-600 uppercase tracking-widest" style={{fontFamily: "'Courier Prime', monospace"}}>
          ◄═══════════════════════════════►
        </p>
        <p className="text-xs text-green-400 mt-2" style={{fontFamily: "'Courier Prime', monospace"}}>
          [TERMINAL v1.0.0] [SECURE CONNECTION ESTABLISHED]
        </p>
        <p className="text-xs text-yellow-600 mt-2 uppercase tracking-widest" style={{fontFamily: "'Courier Prime', monospace"}}>
          ◄═══════════════════════════════►
        </p>
      </div>
    </div>
  )
}
