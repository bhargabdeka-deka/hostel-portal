# Supabase Database Setup

## Environment Variables

Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Database Tables

### 1. users table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'admin', 'superadmin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. notices table
```sql
CREATE TABLE notices (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. achievements table
```sql
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. gallery table
```sql
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. alumni table
```sql
CREATE TABLE alumni (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  batch TEXT NOT NULL,
  job_role TEXT NOT NULL,
  company TEXT,
  instagram TEXT,
  linkedin TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Storage Bucket

Create a storage bucket named `images` for gallery uploads:

1. Go to Storage in Supabase Dashboard
2. Create new bucket: `images`
3. Set it to public
4. Configure upload policies as needed

## Row Level Security (RLS)

Enable RLS on all tables and create appropriate policies:

### For public read access (notices, achievements, gallery, approved alumni):
```sql
-- Notices
CREATE POLICY "Public can view notices" ON notices FOR SELECT USING (true);

-- Achievements
CREATE POLICY "Public can view achievements" ON achievements FOR SELECT USING (true);

-- Gallery
CREATE POLICY "Public can view gallery" ON gallery FOR SELECT USING (true);

-- Alumni (only approved)
CREATE POLICY "Public can view approved alumni" ON alumni FOR SELECT USING (status = 'approved');
```

### For alumni submissions:
```sql
CREATE POLICY "Anyone can insert alumni" ON alumni FOR INSERT WITH CHECK (true);
```

### For admin access:
```sql
-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('admin', 'superadmin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policies for all tables
CREATE POLICY "Admins can do everything on notices" ON notices USING (is_admin());
CREATE POLICY "Admins can do everything on achievements" ON achievements USING (is_admin());
CREATE POLICY "Admins can do everything on gallery" ON gallery USING (is_admin());
CREATE POLICY "Admins can do everything on alumni" ON alumni USING (is_admin());
```

## Initial Admin User

After creating your first user through Supabase Auth, add them to the users table:

```sql
INSERT INTO users (id, email, role)
VALUES ('user-uuid-from-auth', 'admin@example.com', 'admin');
```

## Running the Application

1. Install dependencies: `npm install`
2. Set up environment variables in `.env.local`
3. Run development server: `npm run dev`
4. Access admin panel at: `http://localhost:3000/admin/login`
