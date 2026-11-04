# Payment System Quick Reference

## 🚀 Quick Start

### 1. Run Database Migration
```bash
cd Server
npm run migrate:category-access
```

### 2. Configure Admin IDs in .env
```env
SUPERADMIN_TELEGRAM_ID=YOUR_TELEGRAM_ID
```

### 3. Restart Server
```bash
npm run dev
```

### 4. Test the System
- Student: `/botpayment`
- Admin: Approve the payment
- Student: Access resources

---

## 📋 Key Commands

### Student Commands
- `/botpayment` - View payment instructions and submit payment
- `/start` - Register or view main menu
- `/mycourses` - View accessible courses (after payment)
- `/profile` - View profile and category
- `/getid` - Get your Telegram ID

### Admin Commands
- Receive automatic notifications for new payments
- Click "Approve" or "Reject" buttons in notifications
- `/admin` - Access admin panel (if implemented)

---

## 🔐 Admin Authorization

### How to Configure Admins

**Option 1: Environment Variables (Recommended)**
```env
SUPERADMIN_TELEGRAM_ID=123456789
ADMIN_TELEGRAM_ID=987654321,555666777
```

**Option 2: Database**
- User must have `role: 'admin'` or `'super_admin'`
- User must have `telegramId` linked to their Telegram account
- User must be active: `isActive: true`

### How to Get Your Telegram ID
1. Use `/getid` command in your bot
2. Or message @userinfobot on Telegram
3. Copy the numeric ID (e.g., 123456789)

---

## 🎯 Student Categories

| Category | User Profile Requirements |
|----------|---------------------------|
| GRADE_9 | `studentType: 'high_school'` + `highSchoolGrade: 'grade_9'` |
| GRADE_10 | `studentType: 'high_school'` + `highSchoolGrade: 'grade_10'` |
| GRADE_11 | `studentType: 'high_school'` + `highSchoolGrade: 'grade_11'` |
| GRADE_12 | `studentType: 'high_school'` + `highSchoolGrade: 'grade_12'` |
| REMEDIAL | `studentType: 'university'` + `universityLevel: 'remedial'` |
| FRESHMAN | `studentType: 'university'` + `universityLevel: 'freshman'` |

---

## 💰 Pricing Configuration

### View Current Packages
```sql
SELECT * FROM access_packages WHERE is_active = true;
```

### Update Package Price
```sql
UPDATE access_packages 
SET price = 300.00 
WHERE student_category = 'GRADE_9';
```

### Add Time-Limited Access (90 days)
```sql
UPDATE access_packages 
SET duration_days = 90 
WHERE student_category = 'GRADE_10';
```

### Revert to Lifetime Access
```sql
UPDATE access_packages 
SET duration_days = NULL 
WHERE student_category = 'GRADE_10';
```

---

## 🔍 Database Queries

### Check User's Category
```sql
SELECT 
    id, 
    name, 
    student_type, 
    high_school_grade, 
    university_level 
FROM users 
WHERE telegram_id = 'TELEGRAM_ID_HERE';
```

### Check Active Access
```sql
SELECT * FROM student_category_access 
WHERE user_id = 'USER_ID_HERE' 
AND status = 'active';
```

### View Pending Payments
```sql
SELECT 
    p.id,
    u.name,
    p.student_category,
    p.amount,
    p.transaction_reference,
    p.created_at
FROM payments p
JOIN users u ON p.user_id = u.id
WHERE p.status = 'pending'
ORDER BY p.created_at DESC;
```

### View Recent Approvals
```sql
SELECT 
    p.id,
    u.name,
    p.student_category,
    p.amount,
    admin.name as approved_by,
    p.approved_at
FROM payments p
JOIN users u ON p.user_id = u.id
LEFT JOIN users admin ON p.approved_by = admin.id
WHERE p.status = 'approved'
ORDER BY p.approved_at DESC
LIMIT 10;
```

---

## 🛠️ Common Operations

### Grant Manual Access (Emergency)
```typescript
import { grantCategoryAccess } from './services/accessControlService.js';

await grantCategoryAccess(
    'USER_ID',
    'GRADE_10',
    'PAYMENT_ID',
    undefined, // universityId (optional)
    undefined  // durationDays (null = lifetime)
);
```

### Revoke Access
```typescript
import { revokeCategoryAccess } from './services/accessControlService.js';

await revokeCategoryAccess(
    'USER_ID',
    'GRADE_10',
    undefined // universityId (optional)
);
```

### Check if User Can Access Resource
```typescript
import { canAccessResource } from './services/accessControlService.js';

const result = await canAccessResource(user, resource);
if (result.allowed) {
    // Grant access
} else {
    // Deny: result.reason
}
```

---

## 🚨 Troubleshooting

### Problem: Admin not receiving notifications

**Solutions:**
1. Check `.env` file has `SUPERADMIN_TELEGRAM_ID`
2. Verify Telegram ID is correct (use `/getid`)
3. Check server logs for "No admin Telegram IDs found"
4. Restart the server after adding admin IDs

### Problem: Payment approval not working

**Solutions:**
1. Verify you're using the correct Telegram account
2. Check your Telegram ID is in `SUPERADMIN_TELEGRAM_ID`
3. Look for "Unauthorized payment approval attempt" in logs
4. Ensure payment status is `pending`

### Problem: Access not granted after approval

**Solutions:**
1. Check `student_category_access` table for new record
2. Verify payment status changed to `approved`
3. Check server logs for "Granted X access to user Y"
4. Ensure user's category matches payment category

### Problem: Student sees wrong category

**Solutions:**
1. Verify user profile is complete
2. Check `student_type` and `high_school_grade` or `university_level`
3. Update user profile in database if needed
4. Student may need to re-register with correct info

---

## 📊 Monitoring

### Payment Statistics
```sql
-- Total payments by status
SELECT status, COUNT(*) as count, SUM(amount) as total_amount
FROM payments
GROUP BY status;

-- Payments per category
SELECT student_category, COUNT(*) as count
FROM payments
WHERE status = 'approved'
GROUP BY student_category;

-- Revenue per day
SELECT 
    DATE(approved_at) as date,
    COUNT(*) as payments,
    SUM(amount) as revenue
FROM payments
WHERE status = 'approved'
GROUP BY DATE(approved_at)
ORDER BY date DESC
LIMIT 30;
```

### Active Access Statistics
```sql
-- Active access by category
SELECT student_category, COUNT(*) as active_students
FROM student_category_access
WHERE status = 'active'
GROUP BY student_category;

-- Students with expiring access (next 7 days)
SELECT u.name, sca.student_category, sca.expires_at
FROM student_category_access sca
JOIN users u ON sca.user_id = u.id
WHERE sca.status = 'active'
AND sca.expires_at IS NOT NULL
AND sca.expires_at BETWEEN NOW() AND NOW() + INTERVAL '7 days'
ORDER BY sca.expires_at;
```

---

## 🔐 Security Checklist

- [ ] Admin Telegram IDs configured in `.env`
- [ ] Database connection uses SSL
- [ ] Payment screenshots stored securely
- [ ] Admin authorization verified on every action
- [ ] Transaction references are unique
- [ ] Access checks happen on every resource delivery
- [ ] Audit logs capture all admin actions
- [ ] Category boundaries cannot be bypassed

---

## 📞 Support Resources

- **Documentation:** See full implementation guide in artifacts
- **Migration Issues:** Check `Server/src/migrations/` folder
- **Service Code:** Check `Server/src/services/` folder
- **Bot Handlers:** Check `Server/src/bot/handlers/` folder

---

**Last Updated:** 2024  
**System Version:** 1.0  
**Status:** Production Ready ✅
