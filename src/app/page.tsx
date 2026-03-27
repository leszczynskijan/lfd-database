import Logo from '@/components/Logo'
import Link from 'next/link'

const stats = [
  { label: 'Active Entities', value: 4 },
  { label: 'Research Reports', value: 12 },
  { label: 'Containment Success', value: '98%' },
]

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-2rem)] overflow-hidden">
      <header className="mb-6">
        <div className="inline-flex items-center gap-3 px-3 py-2 bg-emerald-900/20 border border-emerald-500/40 rounded-md">
          <Logo />
          <div>
            <p className="text-xs text-emerald-300 uppercase tracking-widest">SCP Command Interface</p>
            <h1 className="text-2xl md:text-4xl font-black text-emerald-100 leading-tight">LOCAL FACILITY DATABASE</h1>
          </div>
        </div>
      </header>

      <article className="grid grid-cols-1 xl:grid-cols-[1fr] gap-6">
        <div className="card panel-border">
          <h2 className="card-title text-xl">Welcome to the Local Facility Database</h2>
          <p className="mt-3 text-slate-300 leading-relaxed">
            This secure database contains research and containment information for anomalous entities that do not conform to known physical laws. Access is restricted to authorized personnel only.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="card border-emerald-500/50">
              <p className="text-3xl font-bold text-emerald-200">{item.value}</p>
              <p className="text-xs text-slate-300 uppercase tracking-wider mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="card border-yellow-500/40 bg-[#1c1a0e]/85">
          <h3 className="card-title">⚠️ Security Notice</h3>
          <p className="mt-2 text-slate-300">
            Unauthorized access to this database is strictly prohibited. All activities are monitored and logged. Violation of security protocols will result in immediate termination and potential legal action.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/entities" className="flex-1 px-5 py-3 border border-emerald-500/50 bg-emerald-500/15 text-emerald-100 font-bold uppercase tracking-widest rounded-lg hover:bg-emerald-500/25 transition text-center">
            Browse Entity Database
          </Link>
          <Link href="/login" className="flex-1 px-5 py-3 border border-slate-500/40 bg-slate-800 hover:bg-slate-700 transition text-slate-200 font-semibold rounded-lg text-center">
            Sign In
          </Link>
        </div>
      </article>
    </section>
  )
}
