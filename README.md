# ORION Hostel Portal Documentation

## Project Overview
The ORION Hostel Portal is a centralized digital management system designed for Hostel No. 7 (ORION) at Jorhat Engineering College. The platform streamlines hostel administration, facilitates professional alumni engagement, and provides an official communication channel for residents and the public.

## Technical Architecture

### Core Stack
*   **Framework**: Next.js 16 (App Router)
*   **Database**: Supabase (PostgreSQL)
*   **Authentication**: Supabase Auth with JWT-based session management
*   **Real-time**: Supabase Realtime (Postgres Changes)
*   **Styling**: Tailwind CSS with custom utility configurations
*   **Icons**: Lucide React
*   **Deployment**: Vercel

### Data Architecture
The application utilizes a hybrid rendering model:
*   **Static Rendering**: Institutional pages (About, Rules) for optimal performance.
*   **Dynamic Rendering**: Admin Dashboard and Alumni Directory to ensure data freshness.
*   **Server Actions**: Secure, server-side functions used for all database mutations (CRUD), replacing traditional API endpoints.

## Project Directory Structure

```text
hostel-portal/
├── actions/                # Server-side business logic and database mutations
│   ├── admin-actions.ts    # Secured administrative operations
│   └── public-actions.ts   # Publicly accessible data submission logic
├── app/                    # Next.js 16 App Router directory
│   ├── (admin)/            # Route group for protected administrative pages
│   │   └── admin/          # Root of the administrative dashboard
│   ├── (public)/           # Route group for user-facing pages (About, Contact, etc.)
│   ├── auth/               # Authentication route handlers and callback logic
│   ├── login/              # Admin authentication interface
│   ├── layout.tsx          # Root application layout and metadata configuration
│   └── page.tsx            # Application landing page
├── components/             # Reusable UI components
│   ├── admin/              # Dashboard-specific components (Forms, Tables, Popups)
│   ├── alumni/             # Directory search and list interfaces
│   ├── shared/             # Global components (Navbar, Footer, Search)
│   └── ui/                 # Atomic design components (Buttons, Inputs, Cards)
├── lib/                    # Configuration and utility libraries
│   ├── supabase/           # Client/Server/Admin initialization scripts
│   └── utils.ts            # Tailwind merging and common utility functions
├── public/                 # Static assets (Branding, Institutional Logos)
├── supabase_schema.sql     # Database schema and RLS policy documentation
└── middleware.ts           # Authentication and route protection logic
```

## System Modules

### 1. Administrative Dashboard
The dashboard provides a secure interface for hostel management.
*   **Notification System**: Employs Supabase Realtime to monitor the `alumni` table. An interactive notification card provides immediate alerts for new registrations without page reloads.
*   **Alumni Moderation**: A full-featured management table allowing administrators to approve professional profiles, revoke status, or permanently delete records.
*   **Monitor Management**: Direct interface for updating student leadership data. Inputs are validated to ensure numeric-only room assignments.
*   **Role-Based Access Control (RBAC)**: Tiers of access (Admin vs. Superadmin) managed via database roles and validated in the Next.js Middleware.

### 2. Alumni Directory
A professional networking module for the ORION legacy.
*   **Registration**: Public form for alumni to submit professional details.
*   **Verification**: Multi-stage workflow where submissions remain in a 'pending' state until verified by an administrator.
*   **Search Engine**: Client-side filtering allowing users to search by name, batch, or professional keywords.

### 3. Communication System
*   **Notices**: A real-time announcement system managed by admins and displayed chronologically on the landing page.
*   **Contact Interface**: Dynamic display of current hostel monitors, including direct contact links and room assignments.

## Security and Authentication

### Route Protection
Route security is enforced in `middleware.ts`. All requests to the `/admin` segment are intercepted to verify a valid session and an authorized user role. Unauthorized requests are automatically redirected to the `/login` segment.

### Server Action Security
Every administrative Server Action executes a `verifyAccess()` helper at the start of its lifecycle. This utility validates the user's identity and permissions server-side, preventing unauthorized database mutations even if client-side security is bypassed.

## Production Implementation Guide

### Database Initialization
1. Initialize a Supabase project.
2. Execute the `supabase_schema.sql` script.
3. **Important**: Verify the `monitors` table schema includes the `phone` column:
   ```sql
   ALTER TABLE monitors ADD COLUMN IF NOT EXISTS phone text;
   ```

### Environment Variables
Configure the following in your production environment:
*   `NEXT_PUBLIC_SUPABASE_URL`
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
*   `SUPABASE_SERVICE_ROLE_KEY` (Required for administrative actions)

---
**Institutional Maintenance**
Developed for Hostel No. 7, Jorhat Engineering College. All data remains the property of the ORION Administrative Team.
