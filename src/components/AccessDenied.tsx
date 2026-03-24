export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="mb-6">
        <svg
          className="w-20 h-20 mx-auto text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4v2m0 4v2M7.08 6.47A9 9 0 1 1 12 3a9 9 0 0 1 5.08 3.47"
          />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-slate-100 mb-2">Access Denied</h1>
      <p className="text-xl text-slate-400 mb-8">
        Your clearance level is insufficient to view this entity.
      </p>
      <p className="text-slate-500 max-w-md">
        Contact your facility administrator to request higher clearance if you believe this is an error.
      </p>
    </div>
  )
}
