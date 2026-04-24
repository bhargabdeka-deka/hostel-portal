# ORION Hostel Portal 🚀

A premium, production-ready portal for **ORION (Hostel No. 7)** at Jorhat Engineering College. This platform serves as the digital hub for students, alumni, and administrators, managing everything from professional networking to daily hostel governance.

---

## 🌟 Key Features

### 🏛️ Public Interface
- **Dynamic Homepage**: High-impact editorial design featuring hostel legacy, stats, and real-time spirit indicators.
- **Alumni Directory**: A professional networking hub where alumni can register, search for batch-mates, and link their professional profiles (LinkedIn).
- **Interactive Notices**: Real-time broadcast system for official announcements.
- **Faculty & Rules**: Dedicated sections for institutional transparency and hostel guidelines.
- **Contact & Monitors**: Live-updated list of current student leadership (Monitors) and their room assignments.

### 🛡️ Admin Management (Private)
- **Unified Admin Page**: A centralized command center for all administrative tasks.
- **Real-time Notifications**: Interactive bell system that alerts admins of new pending alumni registrations via Supabase Realtime.
- **Alumni Management**: Full CRUD (Create, Read, Update, Delete) capability for moderating the official directory, including approval/rejection workflows.
- **Monitor Control**: Dynamic assignment of student leadership roles with room number restrictions (numeric only).
- **Team Management (RBAC)**: Superadmin capability to provision and manage other administrative accounts with secure role-based access control.
- **Secure Authentication**: Robust session management using Next.js Middleware and Supabase Auth.

---

## 🛠️ Tech Stack

- **Core**: [Next.js 16](https://nextjs.org/) (App Router & Server Actions)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Auth + Realtime)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Vanilla CSS for custom components)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks + Server-side Revalidation
- **Infrastructure**: [Vercel](https://vercel.com/) (Automated Deployment & CI/CD)

---

## 🚀 Getting Started

### 1. Database Setup (Supabase)
1. Create a project on [Supabase](https://supabase.com/).
2. Run the SQL script found in `supabase_schema.sql` within the Supabase SQL Editor.
3. **Critical Column Update**: Ensure the `monitors` table has a `phone` (text) column.
   ```sql
   ALTER TABLE monitors ADD COLUMN IF NOT EXISTS phone text;
   ```
4. Set up a storage bucket named `images` (Public access) for gallery uploads.

### 2. Environment Variables
Create a `.env.local` file with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Installation
```bash
npm install
npm run dev
```

---

## 📂 Project Structure

- `/app`: Next.js App Router (Public routes and Protected Admin route groups).
- `/actions`: Server Actions for database mutations (Securely handles permissions).
- `/components`:
  - `/shared`: Global components like Navbar and Footer.
  - `/admin`: Specialized administrative tools (Forms, Uploaders, Management tables).
  - `/alumni`: Public directory interfaces.
- `/lib`: Supabase initialization and utility functions.
- `/public`: Static assets (Logo, Branding images).

---

## 🔐 Administrative Security

The portal uses a tiered security model:
1. **Superadmin**: Full access including user management and system-wide deletions.
2. **Admin**: Standard access for content management (Notices, Monitors, Alumni moderation).
3. **Emergency Bypass**: Pre-configured emails (e.g., Owner) have hardcoded superadmin access in `admin-actions.ts` for emergency recovery.

---

## 📜 Motto
*"We are not known by names but by a race — **ORIONITE**"*

---
Developed for **Hostel No. 7, Jorhat Engineering College**. 🎓
