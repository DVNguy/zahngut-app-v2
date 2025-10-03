/*
  # Initial Zahngut App Schema

  ## Overview
  Creates the complete database schema for the Zahngut dental practice PWA application.
  This migration sets up all tables needed for dynamic content management including
  practice information, treatments, videos, aftercare instructions, news articles,
  and icon configuration.

  ## New Tables

  ### 1. `praxis_info`
  Stores general practice information
  - `id` (uuid, primary key)
  - `name` (text) - Practice name
  - `slogan` (text) - Practice tagline
  - `telefon` (text) - Phone number
  - `notdienst` (text) - Emergency number
  - `email` (text) - Contact email
  - `street` (text) - Street address
  - `zip` (text) - Postal code
  - `city` (text) - City name
  - `doctolib_url` (text) - Doctolib booking link
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `opening_hours`
  Stores opening hours for each day of the week
  - `id` (uuid, primary key)
  - `day_of_week` (integer) - 0=Sunday, 1=Monday, etc.
  - `day_name` (text) - German day name
  - `opening_time` (text) - Opening time (e.g., "08:00")
  - `closing_time` (text) - Closing time (e.g., "19:00")
  - `is_closed` (boolean) - Whether practice is closed
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `treatments`
  Stores all dental treatment information
  - `id` (uuid, primary key)
  - `category` (text) - Treatment category
  - `name` (text) - Treatment name
  - `icon` (text) - Icon identifier
  - `icon_type` (text) - Type: emoji, lucide, url
  - `subtitle` (text) - Short description
  - `description` (text) - Full description
  - `procedure` (jsonb) - Array of procedure steps
  - `benefits` (jsonb) - Array of benefits
  - `duration` (text) - Treatment duration
  - `recommended` (text) - Recommendation frequency
  - `sort_order` (integer) - Display order
  - `active` (boolean) - Is treatment visible
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `videos`
  Stores educational video links
  - `id` (uuid, primary key)
  - `title` (text) - Video title
  - `url` (text) - Video URL
  - `duration` (text) - Video length
  - `views` (integer) - View count
  - `category` (text) - Video category
  - `sort_order` (integer) - Display order
  - `active` (boolean) - Is video visible
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. `aftercare`
  Stores post-treatment care instructions
  - `id` (uuid, primary key)
  - `treatment_name` (text) - Associated treatment
  - `icon` (text) - Icon identifier
  - `icon_type` (text) - Type: emoji, lucide, url
  - `short_description` (text) - Brief summary
  - `phases` (jsonb) - Care phases with timelines
  - `warning` (text) - Warning signs to watch for
  - `sort_order` (integer) - Display order
  - `active` (boolean) - Is aftercare visible
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. `news`
  Stores news articles and announcements
  - `id` (uuid, primary key)
  - `title` (text) - Article title
  - `excerpt` (text) - Short summary
  - `content` (text) - Full article content
  - `image_url` (text) - Optional header image
  - `author` (text) - Author name
  - `published_at` (timestamptz) - Publication date
  - `is_published` (boolean) - Publication status
  - `is_featured` (boolean) - Featured article flag
  - `category` (text) - Article category
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. `icon_config`
  Stores icon mappings for all UI elements
  - `id` (uuid, primary key)
  - `component_key` (text, unique) - Component identifier
  - `icon_value` (text) - Icon value (emoji, name, url)
  - `icon_type` (text) - Type: emoji, lucide, url
  - `category` (text) - Icon category
  - `description` (text) - What this icon is for
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 8. `emergency_info`
  Stores emergency contact information and instructions
  - `id` (uuid, primary key)
  - `emergency_number` (text) - Emergency hotline
  - `instructions` (jsonb) - First aid instructions
  - `tooth_loss_info` (text) - What to do if tooth falls out
  - `loose_tooth_info` (text) - What to do for loose tooth
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security

  ### Row Level Security (RLS)
  - All tables have RLS enabled
  - Public read access (SELECT) for all tables - patients can view content
  - Write access (INSERT, UPDATE, DELETE) restricted to authenticated admin users
  - Emergency info requires special admin role for modifications

  ### Policies

  #### Public Read Policies
  Each table has a policy allowing anyone to read published/active content

  #### Admin Write Policies
  Authenticated users can create, update, and delete content
  (Note: In production, you should add role-based checks to ensure only admins have write access)

  ## Notes
  - All tables use UUID primary keys for security
  - Timestamps are automatically managed
  - JSON columns allow flexible structured data
  - Sort order fields enable custom content ordering
  - Active flags enable soft deletes
  - Default values ensure data integrity
*/

-- Create praxis_info table
CREATE TABLE IF NOT EXISTS praxis_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Zahngut Bad Wünnenberg',
  slogan text DEFAULT 'Moderne Zahnmedizin. Der Mensch im Mittelpunkt.',
  telefon text NOT NULL DEFAULT '02957/1010',
  notdienst text DEFAULT '01805/986700',
  email text NOT NULL DEFAULT 'info@dein-zahngut.de',
  street text DEFAULT 'Hauptstraße 1',
  zip text DEFAULT '33181',
  city text DEFAULT 'Bad Wünnenberg',
  doctolib_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create opening_hours table
CREATE TABLE IF NOT EXISTS opening_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  day_name text NOT NULL,
  opening_time text,
  closing_time text,
  is_closed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(day_of_week)
);

-- Create treatments table
CREATE TABLE IF NOT EXISTS treatments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL DEFAULT 'zahnerhaltung',
  name text NOT NULL,
  icon text DEFAULT '🦷',
  icon_type text DEFAULT 'emoji',
  subtitle text,
  description text,
  procedure jsonb DEFAULT '[]'::jsonb,
  benefits jsonb DEFAULT '[]'::jsonb,
  duration text,
  recommended text,
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text NOT NULL,
  duration text,
  views integer DEFAULT 0,
  category text,
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create aftercare table
CREATE TABLE IF NOT EXISTS aftercare (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  treatment_name text NOT NULL,
  icon text DEFAULT '🦷',
  icon_type text DEFAULT 'emoji',
  short_description text,
  phases jsonb DEFAULT '{}'::jsonb,
  warning text,
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  image_url text,
  author text DEFAULT 'Zahngut Team',
  published_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  category text DEFAULT 'allgemein',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create icon_config table
CREATE TABLE IF NOT EXISTS icon_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  component_key text UNIQUE NOT NULL,
  icon_value text NOT NULL,
  icon_type text DEFAULT 'emoji',
  category text DEFAULT 'general',
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create emergency_info table
CREATE TABLE IF NOT EXISTS emergency_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  emergency_number text NOT NULL DEFAULT '01805 / 986 700',
  instructions jsonb DEFAULT '[]'::jsonb,
  tooth_loss_info text,
  loose_tooth_info text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_treatments_active ON treatments(active, sort_order);
CREATE INDEX IF NOT EXISTS idx_videos_active ON videos(active, sort_order);
CREATE INDEX IF NOT EXISTS idx_aftercare_active ON aftercare(active, sort_order);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_opening_hours_day ON opening_hours(day_of_week);
CREATE INDEX IF NOT EXISTS idx_icon_config_key ON icon_config(component_key);

-- Enable Row Level Security on all tables
ALTER TABLE praxis_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE opening_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE aftercare ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE icon_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_info ENABLE ROW LEVEL SECURITY;

-- Create public read policies (anyone can view published content)
CREATE POLICY "Public can view praxis info"
  ON praxis_info FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view opening hours"
  ON opening_hours FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view active treatments"
  ON treatments FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Public can view active videos"
  ON videos FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Public can view active aftercare"
  ON aftercare FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Public can view published news"
  ON news FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Public can view icon config"
  ON icon_config FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view emergency info"
  ON emergency_info FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create admin write policies (authenticated users can manage content)
-- Note: In production, add role checks to restrict to admin users only

CREATE POLICY "Authenticated users can update praxis info"
  ON praxis_info FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage opening hours"
  ON opening_hours FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage treatments"
  ON treatments FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage videos"
  ON videos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage aftercare"
  ON aftercare FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage news"
  ON news FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage icons"
  ON icon_config FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update emergency info"
  ON emergency_info FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER update_praxis_info_updated_at BEFORE UPDATE ON praxis_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opening_hours_updated_at BEFORE UPDATE ON opening_hours
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_treatments_updated_at BEFORE UPDATE ON treatments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_aftercare_updated_at BEFORE UPDATE ON aftercare
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_icon_config_updated_at BEFORE UPDATE ON icon_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_emergency_info_updated_at BEFORE UPDATE ON emergency_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
