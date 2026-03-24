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
      <div className={`border-2 rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-all cursor-pointer h-full bg-slate-800 ${getAccessColor()}`}>
        {/* Image Container */}
        <div className="relative w-full h-48 bg-slate-900">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <span className="text-slate-600">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-slate-100">{name}</h3>
            <p className="text-sm text-slate-400">{category}</p>
          </div>

          <p className="text-sm text-slate-300 line-clamp-2">{description}</p>

          <div className="pt-2">
            <span className={`inline-block text-xs font-semibold px-2 py-1 rounded border ${getAccessColor()}`}>
              {getAccessLabel()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
