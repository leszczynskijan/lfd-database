-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  status TEXT CHECK (status IN ('active', 'classified', 'inactive')) DEFAULT 'active',
  level INTEGER CHECK (level >= 1 AND level <= 5) DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Entities table
CREATE TABLE IF NOT EXISTS entities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  recovery_info TEXT NOT NULL,
  containment_info TEXT NOT NULL,
  access_level INTEGER CHECK (access_level >= 1 AND access_level <= 5) DEFAULT 3,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_entities_access_level ON entities(access_level);
CREATE INDEX idx_entities_created_by ON entities(created_by);
CREATE INDEX idx_entities_created_at ON entities(created_at);
CREATE INDEX idx_entities_name ON entities(name);

-- Insert sample data
INSERT INTO users (email, full_name, status, level)
VALUES
  ('admin@facility.local', 'Facility Administrator', 'active', 1),
  ('lead@facility.local', 'Dr. Research Lead', 'active', 2),
  ('scientist@facility.local', 'Dr. Senior Scientist', 'active', 3),
  ('intern@facility.local', 'Research Intern', 'active', 4);

-- Get the admin user ID for seeding (adjust as needed)
WITH admin_user AS (
  SELECT id FROM users WHERE email = 'admin@facility.local' LIMIT 1
)
INSERT INTO entities (name, category, description, image_url, recovery_info, containment_info, access_level, created_by)
SELECT
  'Humanoid Entity-001',
  'Humanoid',
  'A tall, slender humanoid entity with elongated limbs and a blank, featureless face. Observational notes suggest it may possess awareness of its surroundings despite the absence of visible sensory organs.',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
  'Entity was discovered in an abandoned research facility in Eastern Europe. Initial recovery involved a specialized containment team equipped with Class-B protective gear. The entity did not exhibit aggressive behavior during initial capture.',
  'Entity must be kept in a standard humanoid containment cell maintained at 16°C. Weekly observation sessions permitted only with written approval from Site Director. Feeding protocol: standard organic matter. Communication attempts have proven inconclusive.',
  2,
  admin_user.id
FROM admin_user
UNION ALL
SELECT
  'Crystalline Anomaly-042',
  'Object',
  'A geometric crystal formation approximately 2.3 meters in diameter. The crystal exhibits properties that defy conventional physics, including selective luminescence and apparent dimensional variance. Composition remains unidentified.',
  'https://images.unsplash.com/photo-1535241749838-299980b90562?w=400&h=300&fit=crop',
  'Discovered during routine geological survey in [REDACTED]. Initial classification as mineral deposit revised after anomalous properties observed. Recovery required specialized crystallographic equipment to prevent structural degradation during transport.',
  'Crystal stored in reinforced containment chamber with continuous environmental monitoring (temperature, humidity, electromagnetic fields). Access restricted to Level 2+ personnel. Handling procedures must follow Appendix E. No destructive testing authorized.',
  3,
  admin_user.id
FROM admin_user
UNION ALL
SELECT
  'Behavioral Anomaly-011',
  'Phenomenon',
  'A localized spatial anomaly affecting animal behavior within a 50-meter radius. Documented effects include temporal disorientation and aggressive behavioral modification in fauna exposure. Mechanism of effect remains undetermined.',
  'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=400&h=300&fit=crop',
  'Originally reported by wildlife management authorities as an unexplained wildlife die-off zone. Investigation by Facility teams confirmed anomalous properties affecting animal cognition and behavior. Perimeter established to prevent civilian exposure.',
  'Anomaly contained through establishment of physical perimeter and continuous atmospheric monitoring. No direct interaction protocols permitted. D-Class exposure trials require executive-level authorization. Quarterly environmental assessment mandatory.',
  4,
  admin_user.id
FROM admin_user
UNION ALL
SELECT
  'Morphic Organism-009',
  'Creature',
  'A gelatinous life form capable of dramatic morphological transformation. The entity demonstrates apparent intelligence and demonstrates capacity for rapid adaptation to environmental conditions and experimental variables.',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  'Captured during marine research expedition in the South Pacific. Initial classification as unknown species proved inadequate as entity demonstrated properties inconsistent with known biology. Recovery involved specialized aquatic containment protocols.',
  'Biotic entity requires specialized aquatic environment maintained at specific salinity, temperature, and chemical composition (see Appendix F for full specifications). Feeding: small marine organisms supplied tri-weekly. Observation through reinforced transparent barrier only. Breeding protocols classified.',
  3,
  admin_user.id
FROM admin_user
UNION ALL
SELECT
  'Cognitive Entity-707',
  'Humanoid',
  'A being of variable appearance capable of influencing human perception and cognition. Initial contact with entity resulted in temporary sensory displacement in all personnel within 20-meter radius. Current status of entity consciousness and intent remains unknown.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
  'Entity materialized in restricted facility sector without triggering standard containment protocols. Subsequent investigation suggests entity may have deliberately made contact. Response team encountered significant cognitive disruption during initial engagement.',
  'Containment in isolation chamber with 24/7 monitoring. Personnel limited to Level 1 access only. All interaction must be approved by Research Director. Psychological evaluation mandatory for all contact personnel. Termination protocols remain undefined pending further study.',
  1,
  admin_user.id
FROM admin_user;

-- Create indexes on the inserted data
CREATE INDEX idx_users_email ON users(email);
