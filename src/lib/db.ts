import { createClient } from './supabase'
import { Database } from './database.types'

export async function getAccessibleEntities(userLevel: number) {
  const client = createClient()
  
  // User can view entities where access_level >= their clearance level
  // Level 1 is the highest clearance (most restricted), Level 5 is public.
  // Example:
  // - Level 1 user can view access levels 1,2,3,4,5
  // - Level 5 user can view only access level 5
  const { data, error } = await client
    .from('entities')
    .select('*')
    .gte('access_level', userLevel)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching entities:', error)
    return []
  }

  return data || []
}

export async function getEntityById(id: string) {
  const client = createClient()
  const { data, error } = await client
    .from('entities')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching entity:', error)
    return null
  }

  return data
}

export async function createEntity(
  entity: Database['public']['Tables']['entities']['Insert']
) {
  const client = createClient()
  const { data, error } = await client
    .from('entities')
    .insert([entity] as any)
    .select()

  if (error) {
    console.error('Error creating entity:', error)
    return { error }
  }

  return { data: data?.[0] }
}

export async function searchEntities(query: string, userLevel: number) {
  const client = createClient()
  const { data, error } = await client
    .from('entities')
    .select('*')
    .gte('access_level', userLevel)
    .or(`name.ilike.%${query}%,category.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error searching entities:', error)
    return []
  }

  return data || []
}
