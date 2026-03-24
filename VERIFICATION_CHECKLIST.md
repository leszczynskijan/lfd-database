# Database Verification Checklist

## Step 1: Verify Supabase Project is Running
1. Go to https://supabase.co and log in
2. Find your project "Local Facility Database" 
3. Click on it to open the dashboard
4. **Expected**: You should see "Connected" status with green indicator

---

## Step 2: Check if Tables Exist
1. In Supabase Dashboard, go to **SQL Editor** on the left sidebar
2. Create a new query and run:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```
3. **Expected**: You should see `entities` and `users` tables in results
4. **If missing**: Skip to Step 4 to execute database.sql

---

## Step 3: Check if Seed Data Exists
1. Go to **Table Editor** on the left sidebar
2. Click **entities** table
3. **Expected**: You should see 5 rows with SCP entities:
   - SCP-001: Objective Retrospection
   - SCP-106: The Old Man
   - SCP-173: The Sculpture
   - SCP-682: Hard-to-Destroy Reptile
   - SCP-999: The Tickle Monster

4. **If empty or table missing**: Go to Step 4

---

## Step 4: Execute database.sql to Create Tables & Seed Data
This creates the schema and adds example entities.

### Method A: Via Dashboard (Easiest)
1. In Supabase Dashboard, go to **SQL Editor** 
2. Click **New Query**
3. Open the file `/Users/janleszczynski/Sources/lfd-database/database.sql`
4. Copy all the content
5. Paste into the SQL Editor query box
6. Click **Run** button
7. You should see: `"success": true` at the bottom
8. Go to **Table Editor** → **entities** to verify 5 rows appeared

### Method B: Via Local Terminal
```bash
# From the project root
cat database.sql | npx supabase db push
```

---

## Step 5: Verify Connection from App
1. Start the dev server:
```bash
npm run dev
```

2. Open browser to http://localhost:3000

3. Press **F12** to open Developer Tools → **Console** tab

4. Click **Entities** in the sidebar

5. **Expected in Console**: You should see:
```
Loading entities for user level: 5
Fetched entities: Array(5)  [{ id: "...", name: "SCP-001", ... }, ...]
```

6. **If you see**:
   - `Fetched entities: Array(0)` → Table exists but is empty, need Step 4
   - `Query error:` → Something wrong with the query
   - `No entities returned` → Probably database.sql not executed

---

## Step 6: If Still No Data
Check Supabase logs:
1. Dashboard → **Logs** (left sidebar)
2. Look for any error messages related to the query
3. Common issues:
   - **Row Level Security (RLS)** enabled → Disable in Table Editor for both tables
   - **Foreign key constraint** → Verify user record exists (Step 3)
   - **Column names mismatch** → Verify exact spelling in database.sql

---

## Quick Debug Commands

### Check table structure
```sql
-- Run in SQL Editor
\d entities
\d users
```

### Count existing records
```sql
SELECT COUNT(*) as entity_count FROM entities;
SELECT COUNT(*) as user_count FROM users;
```

### View first 3 entities
```sql
SELECT id, name, category, access_level FROM entities LIMIT 3;
```

---

## What Should Happen After Setup
- ✅ 5 example entities in `entities` table
- ✅ 4 test users in `users` table  
- ✅ No RLS policies blocking access
- ✅ App fetches and displays entities on `/entities` page
- ✅ Can click entity to see detail page
- ✅ Can sign up/login with test accounts

---

**Current App Status**: 
- ✅ All pages built and connected to Supabase functions
- ✅ Dev server running with zero errors  
- ✅ Access control filter logic fixed
- ⏳ Waiting for database.sql to be executed in Supabase
