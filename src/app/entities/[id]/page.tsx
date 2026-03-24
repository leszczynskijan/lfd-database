'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AccessDenied from '@/components/AccessDenied'
import { getEntityById } from '@/lib/db'

interface Entity {
  id: string
  name: string
  category: string
  description: string
  image_url: string | null
  recovery_info: string
  containment_info: string
  access_level: number
  created_by: string
  created_at: string
}

export default function EntityDetailPage() {
  const params = useParams()
  const entityId = params.id as string
  const [entity, setEntity] = useState<Entity | null>(null)
  const [loading, setLoading] = useState(true)
  const [userLevel, setUserLevel] = useState(5)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEntity = async () => {
      try {
        const data = await getEntityById(entityId)
        if (data) {
          setEntity(data as Entity)
        } else {
          setEntity(null)
        }
      } catch (err) {
        console.error('Error loading entity:', err)
        setError('Failed to load entity')
      } finally {
        setLoading(false)
      }
    }

    loadEntity()
  }, [entityId])

  if (loading) {
    return <div className="p-8">Loading entity...</div>
  }

  if (!entity) {
    return (
      <div className="p-8">
        <Link href="/entities" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
          ← Back to Entities
        </Link>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Entity Not Found</h2>
          <p className="text-slate-400">The requested entity does not exist or has been removed.</p>
        </div>
      </div>
    )
  }

  if (userLevel > entity.access_level && entity.access_level !== 1) {
    return (
      <div className="p-8">
        <Link href="/entities" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
          ← Back to Entities
        </Link>
        <AccessDenied />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      {/* Back Link */}
      <Link href="/entities" className="text-blue-400 hover:text-blue-300 inline-block">
        ← Back to Entities
      </Link>

      {/* Main Content - White Document Style */}
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Image Container */}
        <div className="relative w-full h-96 bg-slate-100">
          {entity.image_url ? (
            <Image
              src={entity.image_url}
              alt={entity.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
              <span className="text-slate-500 text-lg">No image available</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-12 max-w-4xl">
          {/* Title Section */}
          <div className="mb-8 pb-4 border-b-2 border-slate-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-5xl font-bold text-slate-900">{entity.name}</h1>
                <p className="text-lg text-slate-600 mt-2">{entity.category}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-4 py-1 bg-slate-100 border-2 border-slate-300 rounded font-semibold text-slate-700">
                  Level {entity.access_level}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Description</h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{entity.description}</p>
          </section>

          {/* Recovery Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Recovery Information</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {entity.recovery_info}
              </p>
            </div>
          </section>

          {/* Containment Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Containment Procedures</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {entity.containment_info}
              </p>
            </div>
          </section>

          {/* Metadata */}
          <div className="pt-8 border-t border-slate-200 text-sm text-slate-500">
            <p>Created by: {entity.created_by}</p>
            <p>Date: {new Date(entity.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
