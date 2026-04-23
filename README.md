# Smart Hostel Portal + Alumni Network

A production-quality hostel management and alumni network platform built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Home Page**: Hero section, latest notices, and featured alumni
- **About Page**: Hostel information and statistics
- **Achievements Page**: Display hostel achievements
- **Gallery Page**: Image gallery with captions
- **Alumni Network**: Browse alumni profiles, search/filter, and submit new profiles
- **Contact Page**: Contact information and message form
- **Admin Dashboard**: Protected admin panel for content management

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## Project Structure

```
/app
  /page.tsx                 # Home page
  /layout.tsx               # Root layout
  /globals.css              # Global styles
  /about/page.tsx           # About page
  /achievements/page.tsx    # Achievements page
  /gallery/page.tsx         # Gallery page
  /alumni/page.tsx          # Alumni network page
  /contact/page.tsx         # Contact page
  /admin
    /login/page.tsx         # Admin login
    /dashboard/page.tsx     # Admin dashboard

/components
  Navbar.tsx                # Navigation component
  Footer.tsx                # Footer component
  NoticeCard.tsx            # Notice display card
  AlumniCard.tsx            # Alumni profile card
  FormInput.tsx             # Reusable form input

/lib
  supabaseClient.ts         # Supabase client configuration
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set Up Database

Follow the instructions in `SUPABASE_SETUP.md` to:
- Create database tables
- Set up Row Level Security policies
- Create storage bucket
- Add initial admin user

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

1. Navigate to `/admin/login`
2. Sign in with admin credentials
3. Access dashboard to:
   - Add notices
   - Add achievements
   - Upload gallery images
   - Approve/reject alumni submissions

## Design Principles

- Clean, minimal UI with soft colors
- Inter font family for modern typography
- Card-based layouts with subtle shadows
- Proper spacing and visual hierarchy
- Mobile-responsive design
- No excessive animations or gradients

## Security

- Protected admin routes with authentication
- Role-based access control (admin/superadmin)
- Row Level Security on database tables
- Secure environment variables

## Building for Production

```bash
npm run build
npm start
```

## License

MIT
