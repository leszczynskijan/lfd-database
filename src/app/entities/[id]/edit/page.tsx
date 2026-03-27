'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import AccessDenied from '@/components/AccessDenied'
import { getEntityById, updateEntity } from '@/lib/db'
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

export default function EditEntityPage() {
  const params = useParams()
  const router = useRouter()
  const entityId = params.id as string

  const [entity, setEntity] = useState<Entity | null>(null)
  const [userLevel, setUserLevel] = useState(5)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    recovery_info: '',
    containment_info: '',
    access_level: 3,
    image_url: '',
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser?.id) {
          setError('You must be logged in to edit entities.')
          setLoading(false)
          return
        }

        setCurrentUserId(currentUser.id)

        let level = 5
        const profile = await getUserProfile(currentUser.id)
        if (profile?.level) {
          level = profile.level
        }
        setUserLevel(level)

        const data = await getEntityById(entityId)
        if (data) {
          setEntity(data as Entity)
          setFormData({
            name: data.name,
            category: data.category,
            description: data.description,
            recovery_info: data.recovery_info,
            containment_info: data.containment_info,
            access_level: data.access_level,
            image_url: data.image_url || '',
          })
        } else {
          setError('Entity not found.')
        }
      } catch (err) {
        console.error('Error loading entity:', err)
        setError('Failed to load entity.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [entityId])

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (!entity || !currentUserId) {
    return (
      <div className="p-8">
        <Link href="/entities" className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold mb-4 inline-block">
          ← Back to Entity Database
        </Link>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
          <p className="text-slate-300">{error || 'Entity not found.'}</p>
        </div>
      </div>
    )
  }

  // Check permission: user must be level 1 or 2, AND can only edit entities at their level or lower
  if (userLevel > 2 || userLevel > entity.access_level) {
    return (
      <div className="p-8">
        <Link href={`/entities/${entityId}`} className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold mb-4 inline-block">
          ← Back to Entity
        </Link>
        <AccessDenied />
      </div>
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'access_level' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const result = await updateEntity(entityId, {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        image_url: formData.image_url || null,
        recovery_info: formData.recovery_info,
        containment_info: formData.containment_info,
        access_level: formData.access_level,
      })

      if (result.error) {
        setError(result.error.message || 'Failed to update entity.')
      } else {
        router.push(`/entities/${entityId}`)
      }
    } catch (err) {
      setError('Failed to update entity. Please try again.')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href={`/entities/${entityId}`} className="text-emerald-300 hover:text-emerald-200 inline-block mb-4 text-sm">
          ← Back to Entity Details
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-200 mb-2">Edit Entity</h1>
        <p className="text-sm text-slate-300">Update entity information in the secure database.</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-200 mb-2">
                Entity Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                placeholder="Entity designation..."
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-slate-200 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              >
                <option value="">Select a category...</option>
                <option value="Humanoid">Humanoid</option>
                <option value="Creature">Creature</option>
                <option value="Object">Object</option>
                <option value="Phenomenon">Phenomenon</option>
                <option value="Location">Location</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-slate-200 mb-2">
              Image URL (optional)
            </label>
            <input
              id="image"
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-slate-200 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="Detailed description of the entity..."
            />
          </div>

          {/* Recovery Info */}
          <div>
            <label htmlFor="recovery" className="block text-sm font-semibold text-slate-200 mb-2">
              Recovery Information *
            </label>
            <textarea
              id="recovery"
              name="recovery_info"
              value={formData.recovery_info}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="How the entity was discovered and recovered..."
            />
          </div>

          {/* Containment Info */}
          <div>
            <label htmlFor="containment" className="block text-sm font-semibold text-slate-200 mb-2">
              Containment Procedures *
            </label>
            <textarea
              id="containment"
              name="containment_info"
              value={formData.containment_info}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="Procedures for safely containing and studying the entity..."
            />
          </div>

          {/* Access Level */}
          <div>
            <label htmlFor="access" className="block text-sm font-semibold text-slate-200 mb-2">
              Access Level
            </label>
            <select
              id="access"
              name="access_level"
              value={formData.access_level}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            >
              <option value={1}>Level 1 (Highest Restriction)</option>
              <option value={2}>Level 2</option>
              <option value={3}>Level 3 (Default)</option>
              <option value={4}>Level 4</option>
              <option value={5}>Level 5 (Public)</option>
            </select>
            <p className="text-xs text-slate-400 mt-2">
              Users must have this level or higher to view this entity.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 text-white font-semibold rounded transition"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href={`/entities/${entityId}`}
              className="px-4 py-3 bg-slate-600 hover:bg-slate-700 text-slate-100 font-semibold rounded transition text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
