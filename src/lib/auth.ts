import { createClient } from './supabase'

export async function getCurrentUser() {
  const client = createClient()
  const {
    data: { user },
  } = await client.auth.getUser()
  return user
}

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  status: 'active' | 'classified' | 'inactive'
  level: number
  created_at?: string
  updated_at?: string
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const client = createClient()
  const { data, error } = await client
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data as UserProfile | null
}

export async function signUp(email: string, password: string) {
  const client = createClient()
  const { data, error } = await client.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Sign up error:', error)
    return { error }
  }

  // Create user profile
  if (data.user) {
    try {
      await client
        .from('users')
        .insert([{
          id: data.user.id,
          email,
          status: 'active',
          level: 5, // Default to lowest level
          full_name: null,
        }] as any)
    } catch (err) {
      console.error('Profile creation error:', err)
    }
  }

  return { data }
}

export async function signIn(email: string, password: string) {
  const client = createClient()
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Sign in error:', error)
    return { error }
  }

  return { data }
}

export async function signOut() {
  const client = createClient()
  const { error } = await client.auth.signOut()

  if (error) {
    console.error('Sign out error:', error)
    return { error }
  }

  return { success: true }
}
