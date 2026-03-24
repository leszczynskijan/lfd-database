# Local Facility Database (LFD)

A sophisticated database application for managing and researching anomalous entities. Built with Next.js 16 (App Router), Tailwind CSS 4.x, and Supabase for modern full-stack development.

## 📋 Features

- **Entity Management**: Browse, search, and research documented entities and anomalies
- **Role-Based Access Control**: 5-level clearance system (Level 1 = Highest, Level 5 = Lowest)
- **Authenticated Submissions**: Researchers can submit new entities to the database
- **Responsive Design**: Dark-themed interface optimized for all screen sizes
- **Real-time Updates**: Powered by Supabase backend

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- Supabase account (free tier available at https://supabase.com)

### Installation

1. **Clone and Install Dependencies**

   ```bash
   cd /Users/janleszczynski/Sources/lfd-database
   npm install
   ```

2. **Set Up Supabase**

   - Go to [https://supabase.com](https://supabase.com) and create a free account
   - Create a new project
   - In your project, go to **SQL Editor** and run the contents of `database.sql` to set up the schema and seed data
   - Copy your Project URL and Anon Key from **Settings → API**

3. **Configure Environment Variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with sidebar
│   ├── page.tsx                # Home/dashboard page
│   ├── globals.css             # Global styles
│   ├── entities/
│   │   ├── page.tsx            # All entities list
│   │   └── [id]/
│   │       └── page.tsx        # Entity detail page
│   ├── login/
│   │   └── page.tsx            # Sign in page
│   ├── signup/
│   │   └── page.tsx            # Sign up page
│   ├── submit/
│   │   └── page.tsx            # Entity submission form
│   └── profile/
│       └── page.tsx            # User profile page
├── components/
│   ├── Logo.tsx                # LFD logo component
│   ├── Sidebar.tsx             # Left navigation sidebar
│   ├── EntityCard.tsx          # Entity preview card
│   └── AccessDenied.tsx        # Access control UI
└── lib/
    ├── supabase.ts             # Supabase client
    ├── database.types.ts       # TypeScript types for DB
    ├── auth.ts                 # Authentication functions
    └── db.ts                   # Database queries

database.sql                    # Database schema & seed data
tailwind.config.ts              # Tailwind CSS configuration
postcss.config.mjs              # PostCSS configuration
next.config.ts                  # Next.js configuration
```

## 🎨 UI Components

### Logo Component

- SVG-based LFD logo with diamond and square shapes
- Displays on home page and auth pages
- Customizable colors using Tailwind CSS

### Sidebar

- Left navigation with search functionality
- User status display (bottom-left)
- Quick access to main sections
- Sign in/sign up buttons for anonymous users

### Entity Cards

- Grid/list view of all accessible entities
- Hover effects and smooth transitions
- Color-coded access level indicators
- Image support with placeholders

### Detail Page

- White document-style layout
- Large entity image display
- Full description, recovery, and containment information
- Metadata (creator, creation date)
- Back navigation

## 🔐 Authentication & Access Control

### User Levels

1. **Level 1**: Highest clearance (admin/researchers)
2. **Level 2**: Senior researchers
3. **Level 3**: Standard researchers
4. **Level 4**: Junior researchers
5. **Level 5**: Public/Lowest clearance (default for new users)

### Entity Access

- Each entity has an `access_level` field
- Users can only view entities where their level ≥ entity's access_level
- Example: A Level 3 user can view entities with access_level 3, 4, or 5, but not 1 or 2

### Status Types

- **active**: Regular researcher access
- **classified**: Special security clearance
- **inactive**: Account disabled

## 📝 Database Schema

### Users Table

```sql
id (UUID primary key)
email (unique)
full_name (optional)
status (active | classified | inactive)
level (1-5)
created_at
updated_at
```

### Entities Table

```sql
id (UUID primary key)
name
category
description
image_url (optional)
recovery_info
containment_info
access_level (1-5)
created_by (foreign key to users)
created_at
updated_at
```

## 🗄️ Sample Data

The database includes 5 pre-seeded SCP-style entities:

1. **Humanoid Entity-001** (Level 2) - Mysterious humanoid creature
2. **Crystalline Anomaly-042** (Level 3) - Geometric crystal with anomalous properties
3. **Behavioral Anomaly-011** (Level 4) - Spatial anomaly affecting animal behavior
4. **Morphic Organism-009** (Level 3) - Gelatinous shapeshifting life form
5. **Cognitive Entity-707** (Level 1) - Reality-bending consciousness

Default test user:
- Email: `admin@facility.local` (Level 1)
- Password: Set up in Supabase auth

## 🛠️ Development

### Building

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

### Key Dependencies

- **Next.js 16**: Full-stack React framework
- **React 19**: UI library
- **Tailwind CSS 4**: Utility-first CSS
- **Supabase JS**: Database and auth client
- **TypeScript**: Type safety

## 📖 API Reference

### Auth Functions (`lib/auth.ts`)

- `getCurrentUser()` - Get current authenticated user
- `getUserProfile(userId)` - Fetch user data
- `signUp(email, password)` - Create new account
- `signIn(email, password)` - Log in user
- `signOut()` - Log out user

### Database Functions (`lib/db.ts`)

- `getAccessibleEntities(userLevel)` - Fetch entities user can view
- `getEntityById(id)` - Get single entity details
- `createEntity(entity)` - Submit new entity
- `searchEntities(query, userLevel)` - Search entities

## 🚀 Future Enhancements

- [ ] Full Supabase integration (currently scaffolded)
- [ ] Image upload to Supabase Storage
- [ ] Real-time collaborative editing
- [ ] Entity categories and filtering
- [ ] Full-text search
- [ ] Entity revision history
- [ ] Comments and annotations
- [ ] Admin moderation dashboard
- [ ] Data export (PDF, CSV)
- [ ] Dark mode toggle

## 📚 Resources

- [Next.js Documentation](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)

## 📄 License

This project is created for educational and research purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Ready to explore the unknown? Start by signing in or browsing the public entities database.**
