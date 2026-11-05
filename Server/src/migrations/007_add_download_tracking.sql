-- Migration: Add Download Tracking & Free Tier Support
-- Description: Adds download counters and tracking for freemium model
-- Version: 007
-- Date: 2024-11-05

-- ==============================================
-- 1. ADD DOWNLOAD TRACKING COLUMNS TO USERS
-- ==============================================

DO $$ 
BEGIN
  -- Add free_downloads_used column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'free_downloads_used'
  ) THEN
    ALTER TABLE users ADD COLUMN free_downloads_used INT DEFAULT 0 NOT NULL;
    RAISE NOTICE 'Added free_downloads_used column to users table';
  END IF;

  -- Add free_downloads_limit column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'free_downloads_limit'
  ) THEN
    ALTER TABLE users ADD COLUMN free_downloads_limit INT DEFAULT 15 NOT NULL;
    RAISE NOTICE 'Added free_downloads_limit column to users table';
  END IF;

  -- Add has_premium column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'has_premium'
  ) THEN
    ALTER TABLE users ADD COLUMN has_premium BOOLEAN DEFAULT false NOT NULL;
    RAISE NOTICE 'Added has_premium column to users table';
  END IF;
END $$;

-- ==============================================
-- 2. CREATE DOWNLOAD HISTORY TABLE
-- ==============================================

CREATE TABLE IF NOT EXISTS download_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  resource_id UUID NOT NULL,
  resource_name VARCHAR(255),
  resource_type VARCHAR(50),
  downloaded_at TIMESTAMP DEFAULT NOW() NOT NULL,
  was_free BOOLEAN DEFAULT true NOT NULL,
  user_download_count INT NOT NULL,
  category VARCHAR(50),
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Add foreign key if users table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'fk_download_history_user'
    ) THEN
      ALTER TABLE download_history 
        ADD CONSTRAINT fk_download_history_user 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;
END $$;

-- Add foreign key if resources table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'resources') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'fk_download_history_resource'
    ) THEN
      ALTER TABLE download_history 
        ADD CONSTRAINT fk_download_history_resource 
        FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE;
    END IF;
  END IF;
END $$;

-- ==============================================
-- 3. CREATE INDEXES FOR PERFORMANCE
-- ==============================================

CREATE INDEX IF NOT EXISTS idx_download_history_user_id ON download_history(user_id);
CREATE INDEX IF NOT EXISTS idx_download_history_resource_id ON download_history(resource_id);
CREATE INDEX IF NOT EXISTS idx_download_history_downloaded_at ON download_history(downloaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_download_history_user_date ON download_history(user_id, downloaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_has_premium ON users(has_premium);
CREATE INDEX IF NOT EXISTS idx_users_free_downloads ON users(free_downloads_used, free_downloads_limit);

-- ==============================================
-- 4. UPDATE EXISTING PAID USERS TO PREMIUM
-- ==============================================

-- Mark users with active category access as premium
UPDATE users 
SET has_premium = true
WHERE id IN (
  SELECT DISTINCT user_id 
  FROM student_category_access 
  WHERE status = 'active'
)
AND has_premium = false;

-- ==============================================
-- 5. ADD COMMENTS FOR DOCUMENTATION
-- ==============================================

COMMENT ON COLUMN users.free_downloads_used IS 'Number of free downloads used by user';
COMMENT ON COLUMN users.free_downloads_limit IS 'Maximum free downloads allowed (default 15)';
COMMENT ON COLUMN users.has_premium IS 'Whether user has paid for premium unlimited access';
COMMENT ON TABLE download_history IS 'Tracks all resource downloads for analytics and abuse prevention';
COMMENT ON COLUMN download_history.was_free IS 'Whether this download counted against free tier';
COMMENT ON COLUMN download_history.user_download_count IS 'User''s total download count at time of this download';

-- ==============================================
-- 6. CREATE HELPER FUNCTIONS
-- ==============================================

-- Function to check if user can download
CREATE OR REPLACE FUNCTION can_user_download(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_has_premium BOOLEAN;
  v_downloads_used INT;
  v_downloads_limit INT;
BEGIN
  SELECT has_premium, free_downloads_used, free_downloads_limit
  INTO v_has_premium, v_downloads_used, v_downloads_limit
  FROM users
  WHERE id = p_user_id;
  
  -- Premium users can always download
  IF v_has_premium THEN
    RETURN true;
  END IF;
  
  -- Check if free downloads remain
  RETURN v_downloads_used < v_downloads_limit;
END;
$$ LANGUAGE plpgsql;

-- Function to increment download counter
CREATE OR REPLACE FUNCTION increment_download_counter(p_user_id UUID)
RETURNS INT AS $$
DECLARE
  v_new_count INT;
BEGIN
  UPDATE users 
  SET free_downloads_used = free_downloads_used + 1
  WHERE id = p_user_id AND has_premium = false
  RETURNING free_downloads_used INTO v_new_count;
  
  RETURN COALESCE(v_new_count, 0);
END;
$$ LANGUAGE plpgsql;

-- Function to get download stats
CREATE OR REPLACE FUNCTION get_user_download_stats(p_user_id UUID)
RETURNS TABLE(
  total_downloads BIGINT,
  free_downloads_used INT,
  free_downloads_remaining INT,
  has_premium BOOLEAN,
  download_history_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.free_downloads_used::BIGINT as total_downloads,
    u.free_downloads_used,
    (u.free_downloads_limit - u.free_downloads_used) as free_downloads_remaining,
    u.has_premium,
    COUNT(dh.id) as download_history_count
  FROM users u
  LEFT JOIN download_history dh ON dh.user_id = u.id
  WHERE u.id = p_user_id
  GROUP BY u.id, u.free_downloads_used, u.free_downloads_limit, u.has_premium;
END;
$$ LANGUAGE plpgsql;

-- ==============================================
-- 7. INSERT SAMPLE DATA (FOR TESTING)
-- ==============================================

-- This section is commented out for production
-- Uncomment for development/testing

/*
-- Insert test download history
INSERT INTO download_history (user_id, resource_id, resource_name, user_download_count, was_free)
SELECT 
  u.id,
  gen_random_uuid(),
  'Test Resource ' || gs::text,
  gs,
  true
FROM users u, generate_series(1, 5) gs
WHERE u.role = 'student'
LIMIT 100;
*/

-- ==============================================
-- 8. PRINT SUMMARY
-- ==============================================

DO $$
DECLARE
  v_total_users INT;
  v_premium_users INT;
  v_free_users INT;
BEGIN
  SELECT COUNT(*) INTO v_total_users FROM users;
  SELECT COUNT(*) INTO v_premium_users FROM users WHERE has_premium = true;
  v_free_users := v_total_users - v_premium_users;
  
  RAISE NOTICE '========================================';
  RAISE NOTICE 'MIGRATION 007 COMPLETED SUCCESSFULLY';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Total Users: %', v_total_users;
  RAISE NOTICE 'Premium Users: %', v_premium_users;
  RAISE NOTICE 'Free Tier Users: %', v_free_users;
  RAISE NOTICE 'Download History Table: Created';
  RAISE NOTICE 'Indexes: Created';
  RAISE NOTICE 'Helper Functions: Created';
  RAISE NOTICE '========================================';
END $$;
