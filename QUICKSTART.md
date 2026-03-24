# 🚀 LFD Quick Start Guide

Get the **Local Facility Database** running in 5 minutes.

## Prerequisites
- Node.js 18+ installed
- Supabase account (free at https://supabase.com)

## Step 1: Install Dependencies (1 min)

```bash
cd /Users/janleszczynski/Sources/lfd-database
npm install
```

## Step 2: Set Up Supabase (2 mins)

### Create Supabase Project
1. Go to https://supabase.com and sign up
2. Click "New Project" 
3. Name it `lfd-database` and set a strong password
4. Select your region and create

### Set Up Database
1. Once project loads, go to **SQL Editor**
2. Open `database.sql` from your project
3. Copy all content and paste into SQL Editor
4. Click "Run"
5. Verify: Go to **Table Editor** → should see `users` and `entities` tables

### Get API Keys
1. Go to **Settings → API**
2. Copy **Project URL**
3. Copy **anon (public)** key

## Step 3: Configure Environment (1 min)

1. In your project, create `.env.local`:

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and fill in your Supabase keys:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Save file.

## Step 4: Run Development Server (1 min)

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

## ✅ You're Done!

Explore the app:
- **Home**: Dashboard with logo
- **Browse**: View 5 sample entities
- **Sign Up**: Create researcher account
- **Sign In**: Log in with credentials
- **Profile**: View your clearance level
- **Submit**: Add new entities

## 🎯 Common Tasks

### Sign Up
1. Click "Sign Up" in sidebar (bottom-left)
2. Enter email and password
3. Check Supabase → Authentication → Users to verify

### Sign In
1. Click "Sign In"
2. Use your email and password
3. View profile with your clearance level

### Browse Entities
1. Click "Entities" in sidebar
2. See 5 pre-loaded SCP-style entities
3. Click any entity to read full details

### Submit Entity
1. Sign in first
2. Click "Submit Entity"
3. Fill form and submit
4. Entity appears in entities list

## 🔧 Stop the Server

Press `Ctrl+C` in terminal running `npm run dev`

## 📚 Documentation

- **Full Setup**: See `LFD_SETUP.md`
- **Supabase Integration**: See `SUPABASE_INTEGRATION.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`

## ❓ Troubleshooting

**Blank page or 500 error:**
- Check browser console (F12)
- Check terminal output
- Verify `.env.local` has correct keys

**Auth not working:**
- Verify Supabase project created
- Verify `database.sql` ran successfully
- Verify keys in `.env.local`
- Restart dev server

**No entities showing:**
- Go to Supabase → Table Editor
- Select `entities` table
- Verify 5 rows of data exist
- Restart dev server

## 🚀 Next Steps

1. **Test all features** - Sign up, sign in, submit entity
2. **Read documentation** - See SUPABASE_INTEGRATION.md for details
3. **Deploy** - Push to Vercel (see Vercel docs)
4. **Customize** - Add your branding and rules

## 📞 Need Help?

- Check browser console for errors (F12)
- Look at terminal output where dev server runs
- Review docs in project root
- Check Supabase status page

---

**Happy researching! 🔬**
