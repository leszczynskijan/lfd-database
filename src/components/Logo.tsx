export default function Logo() {
  return (
    <div className="flex items-center justify-center w-24 h-24">
      <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Outer square */}
        <rect
          x="30"
          y="30"
          width="140"
          height="140"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-blue-400"
        />
        
        {/* Diamond shape (rotated square) */}
        <polygon
          points="100,50 150,100 100,150 50,100"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-amber-400"
        />
        
        {/* LFD Text in the center */}
        <text
          x="100"
          y="110"
          textAnchor="middle"
          fontSize="48"
          fontWeight="bold"
          fill="currentColor"
          className="text-slate-300"
        >
          LFD
        </text>
      </svg>
    </div>
  )
}
