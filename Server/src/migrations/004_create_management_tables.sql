-- Migration 004: Create management tables for superadmin panel
-- Support Tickets, Permissions, Announcements, System Settings

-- 1. Permissions table - defines granular permissions
CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  category VARCHAR(50) NOT NULL, -- 'user_management', 'content', 'system', 'security', 'finance'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Role Permissions mapping
CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role VARCHAR(50) NOT NULL, -- 'super_admin', 'admin', 'student'
  permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  granted BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(role, permission_id)
);

-- 3. User Permissions override (for individual grants)
CREATE TABLE IF NOT EXISTS user_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  granted BOOLEAN DEFAULT true,
  granted_by UUID REFERENCES users(id),
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, permission_id)
);

-- 4. Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'bug', 'feature_request', 'user_issue', 'content_issue', 'payment_issue', 'other'
  priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  status VARCHAR(30) DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
  reported_by UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  related_user_id UUID REFERENCES users(id), -- The user who is affected
  related_resource_type VARCHAR(50), -- 'resource', 'quiz', 'payment', 'user'
  related_resource_id VARCHAR(255),
  resolution_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- 5. Ticket Responses
CREATE TABLE IF NOT EXISTS ticket_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  message TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT false, -- Internal notes vs public responses
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(30) DEFAULT 'info', -- 'info', 'warning', 'important', 'maintenance'
  target_roles VARCHAR(50)[], -- Array of roles: 'student', 'admin', 'super_admin', or empty for all
  target_education_levels VARCHAR(50)[], -- 'high_school', 'university' or empty for all
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. System Settings (key-value store)
CREATE TABLE IF NOT EXISTS system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  description TEXT,
  category VARCHAR(50) DEFAULT 'general', -- 'general', 'security', 'features', 'maintenance', 'email'
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Content Reports (for moderation)
CREATE TABLE IF NOT EXISTS content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_type VARCHAR(50) NOT NULL, -- 'resource', 'quiz', 'comment', 'user'
  resource_id VARCHAR(255) NOT NULL,
  reported_by UUID REFERENCES users(id),
  reason TEXT NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'reviewed', 'dismissed', 'action_taken'
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  action_taken TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. User Bans/Restrictions
CREATE TABLE IF NOT EXISTS user_restrictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  restriction_type VARCHAR(30) NOT NULL, -- 'ban', 'suspend', 'read_only'
  reason TEXT NOT NULL,
  duration_hours INTEGER, -- NULL means permanent
  applied_by UUID REFERENCES users(id),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  lifted_by UUID REFERENCES users(id),
  lifted_at TIMESTAMP WITH TIME ZONE
);

-- Insert default permissions
INSERT INTO permissions (name, description, category) VALUES
  ('users.view', 'View all users', 'user_management'),
  ('users.create', 'Create new users', 'user_management'),
  ('users.edit', 'Edit user details', 'user_management'),
  ('users.delete', 'Delete users', 'user_management'),
  ('users.ban', 'Ban or suspend users', 'user_management'),
  ('users.approve', 'Approve admin registrations', 'user_management'),
  ('roles.manage', 'Manage roles and permissions', 'user_management'),
  ('content.view', 'View all content', 'content'),
  ('content.create', 'Create content', 'content'),
  ('content.edit', 'Edit any content', 'content'),
  ('content.delete', 'Delete any content', 'content'),
  ('content.moderate', 'Moderate reported content', 'content'),
  ('resources.upload', 'Upload resources', 'content'),
  ('quizzes.manage', 'Manage quizzes', 'content'),
  ('system.settings', 'Modify system settings', 'system'),
  ('system.maintenance', 'Toggle maintenance mode', 'system'),
  ('system.logs', 'View system logs', 'system'),
  ('system.backup', 'Manage backups', 'system'),
  ('security.view', 'View security dashboard', 'security'),
  ('security.manage', 'Manage security settings', 'security'),
  ('security.alerts', 'Respond to security alerts', 'security'),
  ('finance.view', 'View payments/transactions', 'finance'),
  ('finance.manage', 'Manage payments/refunds', 'finance'),
  ('announcements.manage', 'Create and manage announcements', 'system')
ON CONFLICT (name) DO NOTHING;

-- Grant all permissions to super_admin
INSERT INTO role_permissions (role, permission_id, granted)
SELECT 'super_admin', id, true FROM permissions
ON CONFLICT (role, permission_id) DO NOTHING;

-- Grant selected permissions to admin
INSERT INTO role_permissions (role, permission_id, granted)
SELECT 'admin', id, true FROM permissions 
WHERE name IN (
  'users.view', 'users.create', 'users.edit',
  'content.view', 'content.create', 'content.edit', 'content.delete',
  'resources.upload', 'quizzes.manage',
  'security.view',
  'finance.view'
)
ON CONFLICT (role, permission_id) DO NOTHING;

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description, category) VALUES
  ('maintenance_mode', '{"enabled": false, "message": "The platform is currently under maintenance. Please check back later.", "allowed_ips": []}', 'Toggle maintenance mode', 'maintenance'),
  ('feature_flags', '{"ai_companion": true, "quizzes": true, "resources": true, "payments": true, "promotions": true}', 'Feature availability flags', 'features'),
  ('registration', '{"open": true, "require_verification": true, "allowed_domains": []}', 'Registration settings', 'general'),
  ('security_settings', '{"max_login_attempts": 5, "session_timeout_minutes": 120, "password_min_length": 8, "require_special_chars": true}', 'Security configuration', 'security'),
  ('email_settings', '{"notifications_enabled": true, "daily_report": false, "admin_alerts": true}', 'Email notification settings', 'email')
ON CONFLICT (setting_key) DO NOTHING;