# Audit Logging Implementation - SuccessBridge

## Overview
Comprehensive audit logging has been implemented to track security events and user actions across the SuccessBridge platform. All authentication-related events (login, logout, registration, password reset) are now logged with full context including IP address, user agent, and outcome (success/failure).

## Implementation Details

### 1. **Database Schema**
- **Table**: `audit_logs` (auto-created on startup via Sequelize sync)
- **Columns**:
  - `id` (UUID): Primary key
  - `user_id` (UUID, nullable): ID of the user performing the action
  - `action` (VARCHAR): Type of action (login, logout, register, password_reset, etc.)
  - `resource` (VARCHAR): Resource affected (users, resources, admin, etc.)
  - `resource_id` (VARCHAR, nullable): ID of the affected resource
  - `details` (JSONB): Additional context data (email, role, etc.) - **never contains passwords or tokens**
  - `ip_address` (VARCHAR): Requester's IP address (handles proxies via X-Forwarded-For)
  - `user_agent` (TEXT): Browser/client user agent
  - `timestamp` (TIMESTAMP): When the action occurred
  - `status` (ENUM): success or failure
  - `error_message` (TEXT, nullable): Error details if status is failure

- **Indexes** (for performance):
  - `idx_audit_logs_user_id`: Query by user
  - `idx_audit_logs_action`: Query by action type
  - `idx_audit_logs_timestamp`: Query by date range
  - `idx_audit_logs_user_id_timestamp`: Combined user + date queries (common pattern)
  - `idx_audit_logs_action_timestamp`: Combined action + date queries
  - `idx_audit_logs_resource`: Query by resource type

### 2. **Models**

#### AuditLog Model (`Server/src/models/AuditLog.ts`)
- Sequelize ORM model that maps to the `audit_logs` table
- Automatically creates/migrates table on server startup
- Interface: `IAuditLog`

### 3. **Audit Service** (`Server/src/services/auditService.ts`)

**Key Methods**:

- `logAction(params)`: Log an action asynchronously
  - Non-blocking: uses `setImmediate()` to prevent request delays
  - Handles DB failures gracefully
  - Params: userId, action, resource, resourceId, details, ipAddress, userAgent, status, errorMessage

- `getAuditTrail(userId, page, limit)`: Retrieve all actions by a specific user
  - Returns paginated results
  - Sorted by timestamp (newest first)

- `queryLogs(options)`: Advanced filtering with pagination
  - Filters: userId, action, resource, status, date range (startDate/endDate)
  - Returns: logs array, total count, page info, pages count

- `getActionLogs(action, page, limit)`: Get all logs for a specific action type

- `getFailedLogins(startDate, page, limit)`: Get all failed login attempts

- `getSecurityEvents(page, limit)`: Get all security-relevant events
  - Includes: login, logout, password_change, password_reset, permission_change, user_create, user_delete, user_approve, user_reject

- `clearOldLogs(daysOld)`: Delete logs older than specified days (default: 90 days)

### 4. **Audit Middleware** (`Server/src/middleware/auditLogger.ts`)

**Functionality**:
- Extracts user ID from JWT token
- Extracts IP address (handles reverse proxies via X-Forwarded-For)
- Extracts user agent from request headers
- Attaches audit info to request object as `req.audit`

**Attached to**: All requests to the app (after body parsing)

### 5. **Auth Integration** (`Server/src/controllers/authController.ts`)

**Logged Events**:
- `register` (success/failure): User registration attempts
- `login` (success/failure): Login attempts
- `logout` (success): User logout
- `password_reset` (success/failure): Password reset attempts

**Data Logged**:
- Success logs include: userId, email, action type
- Failure logs include: email, error message
- All logs include: IP address, user agent, timestamp

### 6. **Admin API Routes** (`Server/src/routes/audit.ts`)

All endpoints require authentication + admin role (`admin` or `super_admin`)

**Endpoints**:

1. **GET** `/api/admin/audit-logs`
   - List all audit logs with filtering and pagination
   - Query params: page (default: 1), limit (default: 50), userId, action, status, startDate, endDate
   - Response: { success, data: { logs, total, page, pages } }

2. **GET** `/api/admin/audit-logs/user/:userId`
   - Get audit trail for a specific user
   - Query params: page, limit
   - Response: { success, data: { logs, total, page, pages } }

3. **GET** `/api/admin/audit-logs/action/:action`
   - Get all logs for a specific action
   - Query params: page, limit
   - Response: { success, data: { logs, total, page, pages } }

4. **GET** `/api/admin/audit-logs/failed-logins`
   - Get all failed login attempts
   - Query params: page, limit
   - Response: { success, data: { logs, total, page, pages } }

5. **GET** `/api/admin/audit-logs/security-events`
   - Get all security-relevant events
   - Query params: page, limit
   - Response: { success, data: { logs, total, page, pages } }

6. **GET** `/api/admin/audit-logs/user/:userId/events`
   - Users can view their own events; admins can view anyone's
   - Query params: page, limit
   - Response: { success, data: { logs, total, page, pages } }

## Security Considerations

### ✅ What's Logged
- User ID and email
- Action type and resource
- IP address and user agent
- Success/failure status
- Error messages (for failures)
- Timestamp

### ❌ What's NOT Logged
- Passwords (never captured)
- JWT tokens (not stored in details)
- Sensitive user data from request body
- Session tokens

### 🔐 Data Protection
- Audit logs stored in PostgreSQL with proper access controls
- Admin-only endpoints protected by auth middleware + role check
- IP addresses logged for security investigation
- User agent tracked for anomaly detection

## Testing the Implementation

### Manual Testing Steps:

1. **Test User Registration**:
   ```bash
   POST /api/auth/register
   {
     "email": "test@example.com",
     "name": "Test User",
     "password": "TestPassword123",
     "role": "student"
   }
   ```
   - Check: Audit log created with action='register', status='success'
   - Verify: email captured in details, no password exposed

2. **Test Failed Login**:
   ```bash
   POST /api/auth/login
   {
     "email": "nonexistent@example.com",
     "password": "wrongpassword"
   }
   ```
   - Check: Audit log with action='login', status='failure'
   - Verify: Error message captured

3. **Test Successful Login**:
   ```bash
   POST /api/auth/login
   {
     "email": "existing@example.com",
     "password": "correctpassword"
   }
   ```
   - Check: Audit log with action='login', status='success', userId populated

4. **View Audit Logs** (Admin Only):
   ```bash
   GET /api/admin/audit-logs?page=1&limit=50
   Authorization: Bearer <admin_token>
   ```
   - Should return paginated audit logs

5. **View User's Audit Trail**:
   ```bash
   GET /api/admin/audit-logs/user/:userId?page=1&limit=50
   Authorization: Bearer <admin_token>
   ```
   - Should return logs for specific user

6. **Query Failed Logins**:
   ```bash
   GET /api/admin/audit-logs/failed-logins?page=1&limit=20
   Authorization: Bearer <admin_token>
   ```
   - Should return only failed login attempts

7. **Query by Date Range**:
   ```bash
   GET /api/admin/audit-logs?startDate=2024-01-01&endDate=2024-12-31&action=login
   Authorization: Bearer <admin_token>
   ```
   - Should return login attempts within date range

## Files Created/Modified

### Created:
- `Server/src/models/AuditLog.ts` - ORM model
- `Server/src/services/auditService.ts` - Service for audit operations
- `Server/src/middleware/auditLogger.ts` - Middleware for capturing request context
- `Server/src/routes/audit.ts` - Admin API endpoints
- `Server/src/migrations/002_create_audit_logs.sql` - SQL migration (reference)
- `Server/src/migrations/runAuditMigration.ts` - Migration runner

### Modified:
- `Server/src/index.ts` - Added audit middleware, routes, and model sync
- `Server/src/controllers/authController.ts` - Added audit logging to auth events
- `Server/src/models/index.ts` - Exported AuditLog model

## Performance Notes

- **Non-Blocking**: Audit logging uses `setImmediate()` to avoid blocking requests
- **Indexed Queries**: All filtering operations use indexed columns for fast queries
- **Pagination**: Large result sets are paginated (default 50 per page)
- **Async Operations**: DB writes are asynchronous, errors logged but don't affect request flow

## Maintenance

### Purge Old Logs
To remove audit logs older than 90 days (can be scheduled via cron):

```javascript
// In a scheduled job or admin endpoint
const deleted = await auditService.clearOldLogs(90);
console.log(`Deleted ${deleted} old audit logs`);
```

### Monitoring
- Monitor `error_message` field for patterns (e.g., repeated failed logins = potential attack)
- Review security events regularly for unauthorized access attempts
- Track unusual IP addresses or user agents

## Future Enhancements (Optional)

1. **Real-time Alerts**: Notify admins of suspicious activities (multiple failed logins, etc.)
2. **Log Export**: Allow admins to export audit logs to CSV/JSON
3. **Retention Policy**: Auto-delete logs after configurable retention period
4. **Advanced Analytics**: Dashboard showing login trends, failed login patterns
5. **Compliance Reports**: Generate SOC2/ISO reports from audit data
6. **User Activity Dashboard**: Show users their own login history

## Summary

The audit logging system provides comprehensive security tracking for SuccessBridge:
- ✅ Tracks all authentication events
- ✅ Captures IP addresses and user agents
- ✅ Non-blocking (doesn't slow down requests)
- ✅ Admin-only endpoints with role-based access
- ✅ Advanced filtering and pagination
- ✅ Never logs sensitive data (passwords, tokens)
- ✅ Ready for compliance and security investigations
