/**
 * Quick test script to verify Supabase connection and data
 * Run with: npx ts-node test-supabase.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  console.log('Required:')
  console.log('  NEXT_PUBLIC_SUPABASE_URL')
  console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

console.log('✓ Found Supabase credentials')
console.log(`  URL: ${supabaseUrl}`)

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('\n📋 Testing Supabase connection...\n')

  // Test 1: Check if tables exist
  console.log('1️⃣  Checking tables...')
  try {
    const { data: entities, error: entitiesError } = await supabase
      .from('entities')
      .select('COUNT(*)', { count: 'exact', head: true })

    if (entitiesError) {
      console.error('❌ entities table:', entitiesError.message)
    } else {
      console.log('✓ entities table exists')
    }

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('COUNT(*)', { count: 'exact', head: true })

    if (usersError) {
      console.error('❌ users table:', usersError.message)
    } else {
      console.log('✓ users table exists')
    }
  } catch (err) {
    console.error('❌ Error checking tables:', err)
  }

  // Test 2: Count records
  console.log('\n2️⃣  Counting records...')
  try {
    const { count: userCount, error: userError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (!userError) {
      console.log(`✓ Users in database: ${userCount}`)
    }

    const { count: entityCount, error: entityError } = await supabase
      .from('entities')
      .select('*', { count: 'exact', head: true })

    if (!entityError) {
      console.log(`✓ Entities in database: ${entityCount}`)
    }
  } catch (err) {
    console.error('❌ Error counting records:', err)
  }

  // Test 3: Fetch sample entities
  console.log('\n3️⃣  Fetching entities (access_level >= 5)...')
  try {
    const { data, error } = await supabase
      .from('entities')
      .select('id, name, category, access_level')
      .lte('access_level', 5)

    if (error) {
      console.error('❌ Query error:', error.message)
    } else {
      if (data && data.length > 0) {
        console.log(`✓ Found ${data.length} entities:`)
        data.forEach((e: any) => {
          console.log(`   - ${e.name} (${e.category}) - Level ${e.access_level}`)
        })
      } else {
        console.warn('⚠️  No entities found - database.sql may not have been executed')
      }
    }
  } catch (err) {
    console.error('❌ Error fetching entities:', err)
  }

  // Test 4: Check if RLS is enabled
  console.log('\n4️⃣  Checking Row Level Security...')
  try {
    const { data, error } = await supabase
      .from('entities')
      .select('count', { count: 'exact' })

    if (!error) {
      console.log('✓ RLS appears to be disabled (anonymous access works)')
    } else {
      console.warn('⚠️  RLS may be enabled:', error.message)
    }
  } catch (err) {
    console.error('❌ Error checking RLS:', err)
  }

  console.log('\n✅ Test complete!\n')
}

testConnection().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
