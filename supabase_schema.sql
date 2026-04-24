-- ORION Hostel Portal Schema

-- USERS (Profiles)
CREATE TABLE users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  role TEXT DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin'))
);

-- NOTICES
CREATE TABLE notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ACHIEVEMENTS
CREATE TABLE achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GALLERY
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ALUMNI
CREATE TABLE alumni (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  batch TEXT NOT NULL,
  job TEXT NOT NULL,
  company TEXT NOT NULL,
  social_link TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- COMPLAINTS (Keeping this as it's useful)
CREATE TABLE complaints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  room TEXT NOT NULL,
  issue TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MONITORS (Leadership)
CREATE TABLE monitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL DEFAULT 'To be assigned',
  room TEXT NOT NULL DEFAULT 'N/A',
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initialize Monitors
INSERT INTO monitors (role) VALUES 
  ('1st Monitor'), 
  ('2nd Monitor'), 
  ('Mess Monitor'), 
  ('Sports Monitor')
ON CONFLICT (role) DO NOTHING;

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON users FOR SELECT USING (true);

ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Admin All Notices" ON notices FOR ALL USING (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'superadmin')));

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Admin All Achievements" ON achievements FOR ALL USING (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'superadmin')));

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Admin All Gallery" ON gallery FOR ALL USING (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'superadmin')));

ALTER TABLE monitors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Monitors" ON monitors FOR SELECT USING (true);
CREATE POLICY "Admin All Monitors" ON monitors FOR ALL USING (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'superadmin')));

ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Insert Alumni" ON alumni FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Approved Alumni" ON alumni FOR SELECT USING (status = 'approved');
CREATE POLICY "Admin All Alumni" ON alumni FOR ALL USING (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'superadmin')));

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Insert Complaints" ON complaints FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Manage Complaints" ON complaints FOR ALL USING (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'superadmin')));
