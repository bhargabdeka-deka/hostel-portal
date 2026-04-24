# ORION Hostel Portal Documentation

## Project Overview
The ORION Hostel Portal is a comprehensive web application developed for Hostel No. 7 (ORION) at Jorhat Engineering College. The platform provides a digital infrastructure for managing hostel operations, alumni networking, and administrative governance. It serves three primary user groups: the general public, the hostel alumni network, and the administrative staff.

## Technical Architecture

### Core Technologies
*   **Frontend Framework**: Next.js 16 (App Router) utilizing Server Components for optimized performance.
*   **Backend as a Service**: Supabase (PostgreSQL database, Authentication, and Real-time subscriptions).
*   **Styling**: Tailwind CSS for responsive and consistent user interface design.
*   **Iconography**: Lucide React for standardized vector graphics.
*   **Deployment**: Vercel for automated continuous integration and deployment.

### System Infrastructure
The application follows a modern serverless architecture. Database mutations are handled via Next.js Server Actions, ensuring secure server-side execution and reducing client-side overhead. Real-time data synchronization is implemented using Supabase Channels, specifically for the administrative notification system.

## Functional Modules

### Public Interface
*   **Homepage**: Displays institutional information, legacy statistics, and the latest official notices.
*   **Alumni Directory**: A searchable database of verified alumni. Includes professional profile links and batch-wise filtering.
*   **Notices Section**: A real-time announcement board for official hostel communications.
*   **Contact Information**: Live directory of current student leadership (Monitors) and institutional contact details.

### Administrative Dashboard
*   **Authentication & Authorization**: Role-Based Access Control (RBAC) enforced via Next.js Middleware and Supabase Auth.
*   **Notification System**: An interactive notification module providing real-time alerts for new alumni registration requests.
*   **Alumni Moderation**: Tools for verifying, approving, revoking, or deleting alumni records to maintain directory integrity.
*   **Monitor Management**: Interface for assigning student monitors to specific roles and rooms with numeric validation logic.
*   **Team Administration**: Superadmin capability to provision and manage administrative accounts and system permissions.

## Implementation Guide

### 1. Database Configuration
To initialize the database, execute the SQL schema provided in `supabase_schema.sql` within your Supabase SQL Editor. 

**Required Table Modifications**:
Ensure the `monitors` table includes the following column definition for compatibility with current features:
```sql
ALTER TABLE monitors ADD COLUMN IF NOT EXISTS phone text;
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

### 3. Deployment
The project is optimized for deployment on Vercel. Ensure that all environment variables are correctly configured in the Vercel project settings prior to deployment.

## Project Directory Structure

*   `/app`: Contains all route segments and layouts (App Router).
*   `/actions`: Server-side logic for database operations and cache revalidation.
*   `/components`:
    *   `/shared`: Global UI elements (Navbar, Footer).
    *   `/admin`: Administrative specific forms, tables, and notification components.
    *   `/alumni`: Directory list and search interfaces.
*   `/lib`: Core configuration for Supabase clients and authentication utilities.
*   `/public`: Static assets including branding and institutional imagery.

## Security Standards
Access to the administrative dashboard is strictly restricted via middleware. Role verification is performed at both the routing level (Middleware) and the operation level (Server Actions). A tiered hierarchy exists between Admin and Superadmin roles, with critical system operations reserved for the latter.

---
**Institutional Motto**
"We are not known by names but by a race — ORIONITE"
