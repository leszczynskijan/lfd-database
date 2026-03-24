# 🔬 Local Facility Database (LFD)

A sophisticated web application for managing and researching anomalous entities. Built with Next.js 16, Tailwind CSS 4, and Supabase.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Build](https://img.shields.io/badge/Build-Passing-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/License-Research-blue)

## ✨ Features

📚 **Entity Database**
- Browse and search anomalous entities
- Detailed entity profiles with images and research data
- 5-level clearance system for access control

🔐 **Authentication**
- User registration and login
- Role-based access control
- Researcher credentials and clearance levels

📝 **Entity Submission**
- Authenticated researchers can submit new entities
- Rich forms with image upload support
- Access level configuration per entity

🎨 **Modern UI**
- Dark theme optimized for long research sessions
- Responsive design for all devices
- Tailwind CSS 4.x styling
- Smooth transitions and interactions

🗄️ **Scalable Backend**
- Supabase for database and authentication
- Real-time capabilities ready
- Storage for entity images

## 🚀 Quick Start

### 1. Installation (1 minute)
```bash
cd /Users/janleszczynski/Sources/lfd-database
npm install
```

### 2. Supabase Setup (2 minutes)
- Create free account: https://supabase.com
- Create new project
- Run `database.sql` in SQL Editor
- Copy API credentials

### 3. Configuration (1 minute)
```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

### 4. Run (1 minute)
```bash
npm run dev
```

Open http://localhost:3000

📖 **Detailed instructions:** See [QUICKSTART.md](./QUICKSTART.md)

## 📋 Documentation

| Document | Purpose |
|----------|---------|
| [QUICKSTART.md](./QUICKSTART.md) | 5-minute setup guide |
| [LFD_SETUP.md](./LFD_SETUP.md) | Complete configuration guide |
| [SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md) | Database integration details |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | Architecture & design overview |
| [PROJECT_REFERENCE.md](./PROJECT_REFERENCE.md) | Component & file reference |

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js pages and routes
├── components/          # Reusable React components
├── lib/                 # Utilities and helpers
└── ...
```

**Key Files:**
- `/src/app/layout.tsx` - Root layout with sidebar
- `/src/components/Logo.tsx` - LFD logo
- `/src/components/Sidebar.tsx` - Navigation sidebar
- `/src/lib/auth.ts` - Authentication logic
- `/src/lib/db.ts` - Database queries
- `database.sql` - Database schema

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19
- **Styling**: Tailwind CSS 4.x
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Language**: TypeScript 5

## 📄 Pages

| Route | Purpose |
|-------|---------|
| `/` | Home dashboard |
| `/entities` | Browse all entities |
| `/entities/[id]` | Entity detail view |
| `/login` | Sign in |
| `/signup` | Create account |
| `/submit` | Submit new entity |
| `/profile` | User profile & credentials |

## 🎯 Access Control System

### Clearance Levels
- **Level 1**: Highest (Executive, Admin)
- **Level 2**: Senior Researcher
- **Level 3**: Standard Researcher
- **Level 4**: Junior Researcher
- **Level 5**: Public/General Access

### Entity Classification
Each entity has an access level (1-5). Users can only view entities at their clearance level or public.

**Example**: 
- Level 3 researcher can view entities classified as Levels 3, 4, 5
- Cannot access Levels 1, 2 without higher clearance

### User Status
- **Active**: Full access
- **Classified**: Special security clearance
- **Inactive**: Account disabled

## 📊 Sample Data

Database includes 5 pre-seeded SCP-style entities:

1. **Humanoid Entity-001** (Level 2) - Mysterious humanoid creature
2. **Crystalline Anomaly-042** (Level 3) - Anomalous crystal formation
3. **Behavioral Anomaly-011** (Level 4) - Animal behavior anomaly
4. **Morphic Organism-009** (Level 3) - Shape-shifting organism
5. **Cognitive Entity-707** (Level 1) - Reality-bending consciousness

## 🔧 Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## 🔐 Security

- Environment variables stored in `.env.local` (never committed)
- Supabase public key intentionally exposed (NEXT_PUBLIC_)
- Row-level security policies available in Supabase
- Email verification recommended for production

## 📚 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)

## 🚀 Future Enhancements

- [ ] Admin moderation dashboard
- [ ] Advanced search and filtering
- [ ] Entity revision history
- [ ] Comments and annotations
- [ ] Data export (PDF, CSV)
- [ ] WebSocket real-time updates
- [ ] Mobile app
- [ ] API for external access

## ❓ Troubleshooting

**blank page or errors?**
- Check browser console (F12)
- Verify `.env.local` configuration
- Ensure Supabase project initialized
- Restart dev server

**Auth not working?**
- Verify database schema created
- Check Supabase API credentials
- Review Supabase email provider settings

See [SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md) for detailed troubleshooting.

## 📞 Support

- Review project documentation
- Check Supabase status page
- Review Next.js documentation
- Check browser console for errors

## 📄 License

Created for research and educational purposes.

---

**Ready to explore the anomalies?** Start with [QUICKSTART.md](./QUICKSTART.md) →

**Want to understand the architecture?** Read [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) →
