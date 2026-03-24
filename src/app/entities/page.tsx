'use client'

import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import EntityCard from '@/components/EntityCard'
import Link from 'next/link'
import { getAccessibleEntities, searchEntities } from '@/lib/db'
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

function EntitiesContent() {
  const [entities, setEntities] = useState<Entity[]>([])
  const [filtered, setFiltered] = useState<Entity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEntities = async () => {
      try {
        let userLevel = 5

        const currentUser = await getCurrentUser()
        if (currentUser && currentUser.id) {
          const profile = await getUserProfile(currentUser.id)
          if (profile) {
            userLevel = profile.level
          }
        }

        console.log('Loading entities for user level:', userLevel)
        const data = await getAccessibleEntities(userLevel)
        console.log('Fetched entities:', data)
        setEntities(data as Entity[])
        if (!data || data.length === 0) {
          console.warn('No entities returned from database')
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err)
        console.error('Error loading entities:', errorMsg)
        setError(`Failed to load entities: ${errorMsg}`)
      } finally {
        setLoading(false)
      }
    }

    loadEntities()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const results = entities.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.category.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query)
      )
      setFiltered(results)
    } else {
      setFiltered(entities)
    }
  }, [searchQuery, entities])

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-100 mb-2">Entity Database</h1>
        <p className="text-slate-400">All documented entities and anomalies</p>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search entities..."
          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-400">Loading entities...</p>
        </div>
      ) : entities.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
          <h3 className="text-xl font-semibold text-slate-200 mb-2">No Entities Found</h3>
          <p className="text-slate-400 mb-6">The database is currently empty.</p>
          <Link href="/submit" className="text-blue-400 hover:text-blue-300">
            Submit the first entity →
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
          <h3 className="text-xl font-semibold text-slate-200 mb-2">No Results</h3>
          <p className="text-slate-400">No entities match your search query.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((entity) => (
            <EntityCard
              key={entity.id}
              id={entity.id}
              name={entity.name}
              category={entity.category}
              description={entity.description}
              imageUrl={entity.image_url}
              accessLevel={entity.access_level}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function EntitiesPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <EntitiesContent />
    </Suspense>
  )
}
