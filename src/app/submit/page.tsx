'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createEntity } from '@/lib/db'

export default function SubmitEntityPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    recovery_info: '',
    containment_info: '',
    access_level: 3,
    image_url: '',
  })

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
    setLoading(true)

    try {
      // Use demo user ID for testing (from seed data)
      const result = await createEntity({
        name: formData.name,
        category: formData.category,
        description: formData.description,
        image_url: formData.image_url || null,
        recovery_info: formData.recovery_info,
        containment_info: formData.containment_info,
        access_level: formData.access_level,
        created_by: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', // First test user ID from seed
      })
      
      if (result.error) {
        setError(result.error.message || 'Failed to submit entity')
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push('/entities')
        }, 2000)
      }
    } catch (err) {
      setError('Failed to submit entity. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center panel-border card">
          <h1 className="text-4xl font-bold text-emerald-300 mb-4">✓ Submission Confirmed</h1>
          <p className="text-slate-300 mb-5">Your entity has been submitted to the secure database.</p>
          <p className="text-slate-400 text-sm">Redirecting to entity list in a moment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/entities" className="text-emerald-300 hover:text-emerald-200 inline-block mb-4 text-sm">
          ← Back to Entity Database
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-200 mb-2">Submit Entity Report</h1>
        <p className="text-sm text-slate-300">Authorized researchers can register anomalies into the secure repository.</p>
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
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
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
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
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
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
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
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
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
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
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
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
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
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
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
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white font-semibold rounded transition"
          >
            {loading ? 'Submitting...' : 'Submit Entity'}
          </button>
        </form>
      </div>
    </div>
  )
}
