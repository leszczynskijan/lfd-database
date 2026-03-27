'use client'

import Link from 'next/link'
import Image from 'next/image'

interface EntityCardProps {
  id: string
  name: string
  category: string
  description: string
  imageUrl?: string | null
  accessLevel: number
}

export default function EntityCard({
  id,
  name,
  category,
  description,
  imageUrl,
  accessLevel,
}: EntityCardProps) {
  const getAccessColor = () => {
    switch (accessLevel) {
      case 1:
        return 'border-red-500 bg-red-500/10'
      case 2:
        return 'border-orange-500 bg-orange-500/10'
      case 3:
        return 'border-yellow-500 bg-yellow-500/10'
      case 4:
        return 'border-blue-500 bg-blue-500/10'
      case 5:
        return 'border-green-500 bg-green-500/10'
      default:
        return 'border-slate-500 bg-slate-500/10'
    }
  }

  const getAccessLabel = () => {
    if (accessLevel === 1) return 'Classified'
    return `Access Level ${accessLevel}`
  }

  return (
    <Link href={`/entities/${id}`}>
      <div className={`h-full overflow-hidden rounded-lg border border-emerald-500/40 bg-[#0b1a28] transition hover:scale-[1.01] hover:shadow-[0_0_15px_rgba(56,189,248,0.45)] cursor-pointer`}> 
        <div className="h-44 w-full bg-gradient-to-br from-slate-900 via-[#07121b] to-[#081626] relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover opacity-90"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-slate-400 uppercase">
              No image available
            </div>
          )}
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold uppercase tracking-wider text-emerald-200">{name}</h3>
            <span className="text-[11px] font-bold px-2 py-1 tracking-widest text-emerald-100 bg-[#042a35] rounded border border-emerald-400/30">
              {getAccessLabel()}
            </span>
          </div>
          <p className="text-xs text-emerald-100/80 uppercase tracking-wide">{category}</p>
          <p className="text-sm text-slate-300 line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  )
}
