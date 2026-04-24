# Smart Hostel Management Portal

A modern, high-performance hostel management portal built with Next.js 15, Supabase, and Tailwind CSS.

## Features

- **Public Landing Page**: Beautifully designed hero section and latest notices.
- **Complaint System**: Public form for students to report issues with real-time status updates on the admin dashboard.
- **Admin Dashboard**: Comprehensive management of notices and student complaints.
- **Role-Based Access**: Secure areas for Admin and Superadmin staff.
- **Gallery & Achievements**: Showcasing hostel life and student success.
- **Image Compression**: Automatic browser-side compression for gallery uploads.

## Setup Instructions

### 1. Supabase Project Setup
1. Create a new project on [Supabase](https://supabase.com/).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Copy the contents of `supabase_schema.sql` (found in this project's root) and run it.
4. Go to **Storage** and create a bucket named `gallery`. Set its access to **Public**.

### 2. Environment Variables
1. Rename `.env.local.template` (or use the existing `.env.local`) and fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
   You can find these in **Project Settings > API**.

### 3. Initialize First Admin
1. Sign up a new user via the `/login` page or the Supabase Auth dashboard.
2. Go to the **Table Editor** in Supabase, select the `profiles` table.
3. Find your user and change the `role` from `admin` to `superadmin` to unlock user management features.

### 4. Local Development
Run the following commands:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database/Auth**: Supabase
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, browser-image-compression
