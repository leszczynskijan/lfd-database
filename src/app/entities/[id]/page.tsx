'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AccessDenied from '@/components/AccessDenied'
import { getEntityById } from '@/lib/db'
import { getCurrentUser, getUserProfile } from '@/lib/auth'

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
        const currentUser = await getCurrentUser()
        let level = 5

        if (currentUser?.id) {
          const profile = await getUserProfile(currentUser.id)
          if (profile?.level) {
            level = profile.level
          }
        }

        setUserLevel(level)

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

  // Level 1 user = highest clearance; Level 5 = lowest.
  // Allow access if user level <= entity level (e.g. user 1 can see all, user 5 only level 5).
  if (entity.access_level < userLevel) {
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
    <div className="space-y-5">
      <Link href="/entities" className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold">
        ← Back to Entity Database
      </Link>

      <div className="panel-border card">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-emerald-200 tracking-wide">{entity.name}</h1>
            <p className="text-sm text-slate-300 uppercase tracking-widest">{entity.category}</p>
            <span className="inline-flex items-center gap-2 text-xs font-bold px-2 py-1 bg-[#073033] rounded border border-emerald-500/40 text-emerald-200">Level {entity.access_level}</span>
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{entity.description}</p>
          </div>
          <div className="h-80 rounded-lg border border-emerald-500/30 overflow-hidden bg-black/20">
            {entity.image_url ? (
              <Image src={entity.image_url} alt={entity.name} width={1000} height={1000} className="object-contain w-full" />
            ) : (
              <div className="flex h-80 items-center justify-center text-slate-400">No image available</div>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-blue-500/30 bg-[#052843]/80 p-4">
            <h2 className="text-lg font-bold text-emerald-100">Recovery Information</h2>
            <p className="text-slate-300 text-sm whitespace-pre-wrap mt-2">{entity.recovery_info}</p>
          </div>
          <div className="rounded-lg border border-red-500/30 bg-[#3b0808]/80 p-4">
            <h2 className="text-lg font-bold text-emerald-100">Containment Procedures</h2>
            <p className="text-slate-300 text-sm whitespace-pre-wrap mt-2">{entity.containment_info}</p>
          </div>
        </div>

        <div className="mt-4 text-xs text-slate-500 border-t border-slate-600 pt-3">
          <p>Created by: {entity.created_by}</p>
          <p>Date: {new Date(entity.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
