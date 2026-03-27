export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center panel-border card">
      <div className="mb-4">
        <span className="text-6xl text-rose-400">⚠️</span>
      </div>
      <h1 className="text-3xl font-bold text-rose-300 mb-2">ACCESS DENIED</h1>
      <p className="text-slate-300 mb-4">Clearance level insufficient to view this entity.</p>
      <p className="text-slate-400 text-sm max-w-md">Contact facility command to request authorization or change clearance assignment.</p>
    </div>
  )
}
