# LFD - Supabase Integration Guide

This document outlines how to complete the Supabase integration for the Local Facility Database application.

## Current State

✅ **Completed:**
- Frontend UI components and pages (all built with React + Tailwind)
- TypeScript types for database schema
- Helper functions for database operations
- Authentication helper functions
- Responsive design and dark theme

⏳ **Needs Supabase Setup:**
- Backend database configuration
- Authentication setup
- Image storage setup
- API endpoint integration (wiring frontend to backend)
- Real-time testing

## 📊 Supabase Project Setup

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create a free account
3. Click "New Project"
4. Configure:
   - **Name**: lfd-database (or your choice)
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to you
5. Click "Create new project"

Wait for the project to initialize (usually 2-3 minutes).

### Step 2: Set Up Database Schema

1. In Supabase, go to **SQL Editor** (left sidebar)
2. Click "+ New Query"
3. Copy all contents from `database.sql` file in the project root
4. Paste into the SQL Editor
5. Click "Run"
6. Verify: Go to **Table Editor** and confirm `users` and `entities` tables exist

### Step 3: Configure API Keys

1. Go to **Settings → API** in your Supabase project
2. Copy your credentials:
   - **Project URL** (under "API credentials")
   - **anon (public)** key
3. Store these securely

### Step 4: Set Environment Variables

1. Open `.env.local` in your project root
2. Fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Save the file
4. Restart the development server (`npm run dev`)

### Step 5: Enable Authentication

1. Go to **Authentication → Providers** in Supabase
2. Email/Password should be enabled by default
3. Click "Email" to configure:
   - Enable "Enable email confirmations" if desired
4. Go to **Authentication → Policies** to review defaults

### Step 6: Set Up Storage for Images (Optional)

1. Go to **Storage** in Supabase
2. Click "Create a new bucket"
3. Name: `entity-images`
4. Leave as private for now (can change later)
5. Click "Create bucket"

## 🔌 Frontend Integration

### Wiring Up Authentication

The app has placeholder auth functions. To connect them:

#### File: `src/lib/auth.ts`

Current state: Functions are defined but call `console.log()` instead of Supabase.

To implement:

```typescript
// Example: signIn function (already partially there)
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
```

The function is already implemented! Just ensure `.env.local` has the Supabase keys.

#### File: `src/app/login/page.tsx`

Lines 17-20 have the real `signIn` call commented out. To activate:

```typescript
try {
  const result = await signIn(email, password)
  if (result.error) {
    setError(result.error.message || 'Failed to sign in')
  } else {
    router.push('/profile')
  }
}
```

### Wiring Up Entity Operations

#### File: `src/lib/db.ts`

The functions are defined but need to be called from pages:

```typescript
// In src/app/entities/page.tsx
import { getAccessibleEntities } from '@/lib/db'

export default function EntitiesPage() {
  const [entities, setEntities] = useState([])

  useEffect(() => {
    const loadEntities = async () => {
      const data = await getAccessibleEntities(5) // user level
      setEntities(data)
    }
    loadEntities()
  }, [])

  // ... rest of component
}
```

### Wiring Up User Profile

#### File: `src/app/profile/page.tsx`

Currently loads demo data. To connect real data:

```typescript
import { getCurrentUser, getUserProfile } from '@/lib/auth'

useEffect(() => {
  const loadProfile = async () => {
    const user = await getCurrentUser()
    if (user) {
      const profile = await getUserProfile(user.id)
      setUser(profile)
    } else {
      setUser(null)
    }
    setLoading(false)
  }
  loadProfile()
}, [])
```

### Image Upload Implementation

For the submit form (`src/app/submit/page.tsx`), to upload images:

```typescript
import { createClient } from '@/lib/supabase'

const handleImageUpload = async (file: File) => {
  const client = createClient()
  const fileName = `${Date.now()}-${file.name}`
  
  const { data, error } = await client.storage
    .from('entity-images')
    .upload(`entities/${fileName}`, file)
  
  if (error) {
    console.error('Upload error:', error)
    return null
  }
  
  // Get public URL
  const { data: urlData } = client.storage
    .from('entity-images')
    .getPublicUrl(`entities/${fileName}`)
  
  return urlData.publicUrl
}
```

## 🧪 Testing the Integration

### Test Auth Flow

1. Start dev server: `npm run dev`
2. Go to http://localhost:3000/signup
3. Sign up with a test email (use a real email or test@example.com)
4. Check Supabase → Authentication → Users to verify account created
5. Go to /login and sign in
6. Should redirect to /profile showing your user data

### Test Entity Operations

1. Go to http://localhost:3000/entities
2. Should see the 5 seeded entities from `database.sql`
3. Click on an entity to view details
4. Check browser console for any errors

### Test Entity Submission

1. Must be authenticated (sign in first)
2. Navigate to http://localhost:3000/submit
3. Fill out form and upload an image (optional)
4. Submit and verify it appears in /entities

## 🐛 Debugging

### Common Issues

**"Module not found" errors**
- Ensure Supabase keys are in `.env.local`
- Restart dev server after changing env vars
- Check path aliases in `tsconfig.json`

**Blank pages or 500 errors**
- Check browser console (F12 → Console)
- Check terminal output where `npm run dev` is running
- Verify Supabase project is initialized

**Authentication not working**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check Supabase → Settings → API credentials
- Ensure email/password provider is enabled in Authentication

**Images not uploading**
- Verify `entity-images` storage bucket exists
- Check bucket policies allow public access (if needed)
- Review storage policies in Supabase → Storage → Policies

## 📚 Key Files for Integration

| File | Purpose | Status |
|------|---------|--------|
| `src/lib/supabase.ts` | Supabase client | ✅ Ready |
| `src/lib/auth.ts` | Auth functions | ✅ Ready |
| `src/lib/db.ts` | Database queries | ✅ Ready |
| `src/app/login/page.tsx` | Sign in page | ⏳ Needs activation |
| `src/app/signup/page.tsx` | Sign up page | ⏳ Needs activation |
| `src/app/submit/page.tsx` | Entity submission | ⏳ Needs image upload |
| `src/app/entities/page.tsx` | Entities list | ⏳ Needs data loading |
| `src/app/profile/page.tsx` | User profile | ⏳ Needs data loading |

## 🚀 Next Steps

1. Create Supabase project and database schema
2. Get API credentials and add to `.env.local`
3. Activate authentication in login/signup pages
4. Wire up entity loading in entities page
5. Implement image upload using Supabase Storage
6. Test complete auth flow
7. Test entity submission and viewing
8. Deploy to production (Vercel recommended)

## 🔒 Security Notes

- `.env.local` should never be committed to git
- The `NEXT_PUBLIC_` prefix makes keys visible to browser (intentional for Supabase public key)
- Row-level security (RLS) policies can be added in Supabase for production
- Consider email verification for production deployments

## 📞 Support

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
