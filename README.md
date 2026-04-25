# ORION Portal - Hostel No. 7

This is the official web portal for Hostel No. 7 (ORION) at Jorhat Engineering College. The system is designed to manage hostel administration, maintain an alumni directory, and provide a communication platform for current residents.

## Features

- Admin Dashboard: Secure management of hostel data, alumni approvals, and notices.
- Alumni Directory: A searchable database of former residents with professional details and contact information.
- Notices & Announcements: Real-time updates for residents regarding hostel activities and official news.
- Student Monitor Management: Contact information and details for current hostel leadership.
- Responsive Design: Fully accessible on both mobile and desktop devices.

## Tech Stack

- Framework: Next.js (App Router)
- Database: Supabase (PostgreSQL)
- Styling: Tailwind CSS
- Icons: Lucide React
- Deployment: Vercel

## File Structure

```text
hostel-portal/
├── actions/                # Server actions for database operations
│   ├── admin-actions.ts    # Admin-only functions
│   └── public-actions.ts   # Publicly accessible functions
├── app/                    # Next.js App Router
│   ├── (admin)/            # Admin dashboard routes
│   ├── (public)/           # User-facing routes (About, Gallery, Rules, etc.)
│   ├── auth/               # Auth handlers
│   ├── login/              # Admin login page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # UI Components
│   ├── admin/              # Dashboard components
│   ├── alumni/             # Alumni list and search
│   ├── shared/             # Navbar, Footer
│   └── ui/                 # Reusable atomic components
├── lib/                    # Library configurations
│   └── supabase/           # Supabase client setup
├── public/                 # Static assets (Logos, Images)
├── supabase_schema.sql     # Database structure and policies
└── middleware.ts           # Authentication and route protection
```

## Setup and Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env.local` file:
   ```text
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_key
   ```
4. Initialize the database using the provided `supabase_schema.sql` in your Supabase SQL editor.
5. Run the development server:
   ```bash
   npm run dev
   ```

## Performance & Storage Optimization

To ensure the portal remains lightning-fast and stays within storage limits (1GB Supabase limit), the following measures are in place:

- **Image Compression**: All administrative uploads (Gallery, Achievements) are automatically compressed on the client-side to under **300KB** using `browser-image-compression`.
- **Responsive Media**: Every image is served using Next.js `next/image` with optimized `sizes` and `quality` settings to minimize bandwidth usage on mobile devices.
- **Global Responsiveness**: The entire UI is built with a mobile-first approach, ensuring a premium experience on everything from smartphones to high-resolution monitors.

## Development and Maintenance

The portal is maintained by the ORION administrative team at Jorhat Engineering College. All code changes should be verified for security and performance before being pushed to the master branch.

Institutional project for Hostel No. 7, Jorhat Engineering College.
Est. 1982.
