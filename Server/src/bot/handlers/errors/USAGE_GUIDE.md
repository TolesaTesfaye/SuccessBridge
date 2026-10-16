# Global Error Handler - Usage Guide

## 📚 Overview

The global error handler provides centralized error handling for your Telegram bot with:
- ✅ Custom error types for different scenarios
- ✅ Automatic user notifications with appropriate messages
- ✅ Admin notifications for critical errors
- ✅ Error logging and tracking
- ✅ Rate limiting detection
- ✅ Context-aware error handling

---

## 🎯 Quick Start

### 1. Import Error Types

```typescript
import {
  handleError,
  withErrorHandling,
  ValidationError,
  PermissionError,
  ResourceNotFoundError,
  RateLimitError,
  DatabaseError,
  ExternalServiceError,
} from './handlers/errors/index.js';
```

### 2. Use in Handlers

#### Method A: Throw Custom Errors (Recommended)

```typescript
export async function handleProfile(bot: any, msg: any) {
  const user = await getUserByTelegramId(msg.from.id);

  if (!user) {
    // Throw custom error - will be caught by global handler
    throw new ResourceNotFoundError(
      'User not found. Please use /start to register.',
      {
        chatId: msg.chat.id,
        userId: msg.from.id.toString(),
        action: 'view_profile',
      }
    );
  }

  // Continue with normal logic...
}
```

#### Method B: Manual Error Handling

```typescript
export async function handleDownload(bot: any, msg: any) {
  try {
    const resource = await getResource(resourceId);
    // ... download logic
  } catch (error) {
    // Manually call error handler
    await handleError(error as Error, bot, {
      chatId: msg.chat.id,
      userId: msg.from.id.toString(),
      action: 'download_resource',
      metadata: { resourceId },
    });
  }
}
```

#### Method C: Wrapper Function

```typescript
// Wrap any handler with automatic error handling
export const handleSafeProfile = withErrorHandling(
  async (bot: any, msg: any) => {
    const user = await getUserByTelegramId(msg.from.id);
    // ... handler logic
  },
  (bot, msg) => ({
    chatId: msg.chat.id,
    userId: msg.from.id.toString(),
    command: '/profile',
  })
);
```

---

## 🔧 Error Types & When to Use Them

### 1. ValidationError
**When:** User input is invalid

```typescript
if (!email.includes('@')) {
  throw new ValidationError('Please provide a valid email address.');
}

if (file.size > MAX_SIZE) {
  throw new ValidationError('File too large (max 50MB)');
}
```

**User sees:** ⚠️ [Your message]  
**Admin notified:** ❌ No

---

### 2. PermissionError
**When:** User lacks required permissions

```typescript
const admin = await getAdminUser(telegramUserId);
if (!admin) {
  throw new PermissionError('Admin access required.');
}

if (user.role !== 'super_admin') {
  throw new PermissionError('Super admin access required.');
}
```

**User sees:** ⛔ [Your message or default]  
**Admin notified:** ❌ No

---

### 3. ResourceNotFoundError
**When:** Database record doesn't exist

```typescript
const course = await Course.findByPk(courseId);
if (!course) {
  throw new ResourceNotFoundError('Course not found.');
}

const user = await getUserByTelegramId(telegramId);
if (!user) {
  throw new ResourceNotFoundError('User not found. Please use /start.');
}
```

**User sees:** ❌ [Your message or default]  
**Admin notified:** ❌ No

---

### 4. RateLimitError
**When:** User exceeds rate limits

```typescript
const allowed = await rateLimiter.check(userId);
if (!allowed) {
  throw new RateLimitError('Too many requests. Please wait a moment.');
}
```

**User sees:** ⏳ [Your message or default]  
**Admin notified:** ❌ No

---

### 5. DatabaseError
**When:** Database operations fail

```typescript
try {
  await User.create(userData);
} catch (error) {
  throw new DatabaseError('Failed to create user', {
    chatId,
    userId,
    metadata: { originalError: error.message },
  });
}
```

**User sees:** ❌ Database error. Our team has been notified.  
**Admin notified:** ✅ Yes (critical)

---

### 6. ExternalServiceError
**When:** External APIs fail (B2, Supabase, etc.)

```typescript
try {
  const url = await b2Client.getSignedUrl(fileKey);
} catch (error) {
  throw new ExternalServiceError('File storage service unavailable', {
    chatId,
    metadata: { service: 'B2', fileKey },
  });
}
```

**User sees:** ❌ External service unavailable. Please try again later.  
**Admin notified:** ✅ Yes (critical)

---

## 📋 Error Context

Always provide context when throwing errors:

```typescript
throw new ValidationError('Invalid input', {
  chatId: msg.chat.id,              // ✅ Required for user notification
  userId: msg.from.id.toString(),   // ✅ For tracking
  username: msg.from.username,      // Optional
  command: '/profile',              // Optional - for commands
  callbackData: 'admin_users',      // Optional - for callbacks
  action: 'create_user',            // Optional - descriptive action
  metadata: {                       // Optional - additional data
    email: userEmail,
    resourceId: 'res_123',
  },
});
```

---

## 🎨 Custom Error Messages

### Good Error Messages ✅

```typescript
// Specific and actionable
throw new ValidationError('Email is required. Please provide your email.');

// Clear next steps
throw new PermissionError('You need admin access. Contact support to request access.');

// User-friendly
throw new ResourceNotFoundError('Course not found. Please check the course list.');
```

### Bad Error Messages ❌

```typescript
// Too technical
throw new ValidationError('Sequelize validation failed on field email');

// Too vague
throw new PermissionError('Access denied');

// No guidance
throw new ResourceNotFoundError('Not found');
```

---

## 🔔 Admin Notifications

Admins are notified for:
- ❌ **DatabaseError** - Critical database issues
- ❌ **ExternalServiceError** - External API failures
- ❌ **Unknown errors** - Unexpected errors
- ❌ **High error rates** - Possible abuse or system issues

Admins are NOT notified for:
- ✅ ValidationError - Normal user mistakes
- ✅ PermissionError - Expected access control
- ✅ ResourceNotFoundError - Normal "not found" cases
- ✅ RateLimitError - Rate limiting working as intended

---

## 📊 Error Tracking

The handler automatically tracks:
- Error frequency per user
- Error types and patterns
- Timestamps and context
- High error rate alerts

### High Error Rate Detection

If a user triggers 10+ errors within 5 minutes:
1. User receives a warning message
2. Admins are notified about potential abuse
3. Error count resets after 5 minutes

---

## 🧪 Testing Errors

### Test ValidationError
```
/test_validation
→ Should show: ⚠️ Invalid input
```

### Test PermissionError
```
/admin (as non-admin)
→ Should show: ⛔ Admin access required
```

### Test ResourceNotFoundError
```
/profile (unregistered user)
→ Should show: ❌ User not found
```

---

## 🔧 Integration Examples

### Example 1: User Registration

```typescript
export async function handleRegister(bot: any, msg: any) {
  const email = msg.text;

  // Validation
  if (!email || !email.includes('@')) {
    throw new ValidationError('Please provide a valid email address.');
  }

  // Check existing
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    throw new ValidationError('Email already registered. Use /login instead.');
  }

  // Create user (database errors caught automatically)
  const user = await User.create({
    email,
    telegramId: msg.from.id.toString(),
    name: msg.from.first_name,
  });

  await bot.sendMessage(msg.chat.id, '✅ Registration successful!');
}
```

### Example 2: Resource Download

```typescript
export async function handleDownload(bot: any, query: any, resourceId: string) {
  // Check resource exists
  const resource = await Resource.findByPk(resourceId);
  if (!resource) {
    throw new ResourceNotFoundError('Resource not found or has been removed.');
  }

  // Check permissions
  const hasAccess = await checkUserAccess(query.from.id, resource.subjectId);
  if (!hasAccess) {
    throw new PermissionError(
      'You need to enroll in this subject to access resources.'
    );
  }

  // Get download URL (external service error caught automatically)
  const url = await getDownloadUrl(resource.fileKey);

  await bot.sendMessage(query.message.chat.id, 
    `📥 Download: ${resource.title}\n\n${url}`
  );
}
```

### Example 3: Admin Action

```typescript
export async function deleteUser(bot: any, chatId: number, telegramId: string, targetUserId: string) {
  // Check admin permission
  await requireSuperAdmin(bot, chatId, telegramId);

  // Find user
  const user = await User.findByPk(targetUserId);
  if (!user) {
    throw new ResourceNotFoundError('User not found.');
  }

  // Delete (database error caught automatically)
  await user.destroy();

  await bot.sendMessage(chatId, '✅ User deleted successfully.');
}
```

---

## 📝 Best Practices

### 1. Always Provide Context ✅
```typescript
throw new ValidationError('Invalid email', {
  chatId: msg.chat.id,
  userId: msg.from.id.toString(),
  action: 'update_email',
});
```

### 2. Use Specific Error Types ✅
```typescript
// ✅ Good
throw new PermissionError('Admin access required');

// ❌ Bad
throw new Error('Permission denied');
```

### 3. Write User-Friendly Messages ✅
```typescript
// ✅ Good
throw new ValidationError('File size must be under 50MB. Your file is 75MB.');

// ❌ Bad
throw new ValidationError('File size validation failed');
```

### 4. Include Metadata for Debugging ✅
```typescript
throw new ExternalServiceError('B2 upload failed', {
  chatId,
  metadata: {
    fileName: file.name,
    fileSize: file.size,
    bucket: 'successbridge-resources',
  },
});
```

### 5. Let Critical Errors Bubble Up ✅
```typescript
// ✅ Good - let global handler catch database errors
const user = await User.create(data);

// ❌ Bad - swallowing critical errors
try {
  const user = await User.create(data);
} catch (error) {
  console.log('Oops');
}
```

---

## 🐛 Debugging

### Enable Detailed Logging

The error handler logs to console in structured JSON format:

```json
{
  "type": "error_log",
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "error",
  "errorType": "validation",
  "message": "Invalid email",
  "context": {
    "chatId": 123456,
    "userId": "789012",
    "action": "update_profile"
  },
  "userNotified": true,
  "adminNotified": false
}
```

### Check Admin Notifications

Super admin (ID: 2123391764) receives Telegram messages for critical errors with full context.

---

## 🚀 Summary

1. **Throw custom errors** instead of generic Error
2. **Always include context** (especially chatId)
3. **Write clear messages** for users
4. **Let the handler manage** notifications
5. **Use appropriate error type** for each scenario

**The global error handler is now active and protecting your bot! 🛡️**
