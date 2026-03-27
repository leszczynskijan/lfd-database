export default function Logo() {
  return (
    <div className="flex items-center justify-center w-24 h-24">
      <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="25" width="150" height="150" fill="none" stroke="#38bdf8" strokeWidth="3" />
        <rect x="40" y="40" width="120" height="120" fill="none" stroke="#22c55e" strokeWidth="2" />
        <line x1="35" y1="85" x2="165" y2="85" stroke="#4ade80" strokeWidth="1" />
        <line x1="35" y1="115" x2="165" y2="115" stroke="#4ade80" strokeWidth="1" />
        <text x="100" y="118" textAnchor="middle" fontSize="42" fontWeight="900" fill="#d1e8ff" fontFamily="monospace">LFD</text>
      </svg>
    </div>
  )
}
