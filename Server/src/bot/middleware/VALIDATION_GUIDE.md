# Input Validation Middleware - Usage Guide

## 📚 Overview

The validation middleware provides comprehensive input validation and sanitization for your Telegram bot:
- ✅ SQL injection prevention
- ✅ XSS attack prevention
- ✅ Input sanitization
- ✅ Type validation
- ✅ File upload validation
- ✅ Rate limiting
- ✅ Callback data validation

---

## 🚀 Quick Start

### Import Functions

```typescript
import {
  validateUserInput,
  validateEmail,
  validateFile,
  validateCallbackData,
  validateResourceType,
  sanitizeText,
  withRateLimit,
  rateLimiter,
} from '../middleware/validation.middleware.js';
```

---

## 🔧 Common Validation Functions

### 1. Validate User Text Input

**Use for:** Any text input from users (messages, names, descriptions)

```typescript
export async function handleMessage(bot: any, msg: any) {
  // Validates and sanitizes text, prevents SQL injection & XSS
  const safeText = validateUserInput(msg.text, 1000); // max 1000 chars
  
  // Use safeText safely
  await processMessage(safeText);
}
```

**What it does:**
- Checks for SQL injection patterns
- Checks for XSS patterns
- Removes control characters
- Escapes HTML/Markdown special characters
- Enforces max length

---

### 2. Validate Email

**Use for:** Email input validation

```typescript
export async function handleEmail(bot: any, msg: any) {
  try {
    const email = validateEmail(msg.text);
    // email is now guaranteed to be valid and lowercase
    await updateUserEmail(email);
  } catch (error) {
    // ValidationError thrown if invalid
    // Will be caught by global error handler
  }
}
```

**Validation rules:**
- Must match email pattern (`user@example.com`)
- Converted to lowercase
- Max 255 characters
- No whitespace

---

### 3. Validate File Uploads

**Use for:** Document/file uploads from users

```typescript
export async function handleDocument(bot: any, msg: any) {
  // Throws ValidationError if invalid
  validateFile(msg.document);
  
  // File is safe to process
  const file = msg.document;
  await uploadToB2(file);
}
```

**Validation rules:**
- Max 50MB file size
- Allowed types: PDF, PowerPoint, Word, Images
- No suspicious filenames (../, etc.)
- Valid file extensions

---

### 4. Validate Callback Data

**Use for:** Inline keyboard callback data

```typescript
export async function handleCallback(bot: any, query: any) {
  // Validate callback data format
  validateCallbackData(query.data);
  
  // Process callback
  if (query.data.startsWith('level_')) {
    // Safe to use
  }
}
```

**Validation rules:**
- Max 64 characters (Telegram limit)
- Only alphanumeric, underscore, pipe, hyphen, colon, dot
- Prevents injection attempts

---

### 5. Sanitize Text for Display

**Use for:** Displaying user-generated content

```typescript
export async function showUserProfile(bot: any, chatId: number, user: any) {
  // Sanitize before displaying
  const safeName = sanitizeText(user.name, 100);
  const safeBio = sanitizeText(user.bio, 500);
  
  await bot.sendMessage(
    chatId,
    `Name: ${safeName}\nBio: ${safeBio}`,
    { parse_mode: 'Markdown' }
  );
}
```

---

## 🎯 Specific Validators

### Validate Resource Type

```typescript
import { validateResourceType } from '../middleware/validation.middleware.js';

export async function createResource(type: string) {
  // Ensures type is one of the allowed values
  const validType = validateResourceType(type);
  // validType is now: 'lecture-slide', 'handout', 'note', etc.
}
```

**Allowed types:**
- `lecture-slide` / `lecture_slide`
- `handout`
- `note`
- `module` / `modules`
- `reference-book` / `reference_books`
- `mid-exam` / `mid_exam`
- `final-exam` / `final_exam`
- `last-year-exam` / `last_year_exam`

---

### Validate Education Level

```typescript
import { validateLevel } from '../middleware/validation.middleware.js';

const level = validateLevel('high_school'); // ✅ Valid
const level = validateLevel('university');  // ✅ Valid
const level = validateLevel('middle');      // ❌ Throws ValidationError
```

---

### Validate Grade

```typescript
import { validateGrade } from '../middleware/validation.middleware.js';

const grade = validateGrade('Grade 11');  // ✅ Valid
const grade = validateGrade('Freshman');  // ✅ Valid
const grade = validateGrade('Grade 13');  // ❌ Throws ValidationError
```

---

### Validate Stream

```typescript
import { validateStream } from '../middleware/validation.middleware.js';

const stream = validateStream('natural'); // ✅ Valid
const stream = validateStream('social');  // ✅ Valid
const stream = validateStream('arts');    // ❌ Throws ValidationError
```

---

### Validate User Role

```typescript
import { validateRole } from '../middleware/validation.middleware.js';

const role = validateRole('admin');          // ✅ Valid
const role = validateRole('super_admin');    // ✅ Valid
const role = validateRole('hacker');         // ❌ Throws ValidationError
```

---

### Validate UUID

```typescript
import { validateUUID } from '../middleware/validation.middleware.js';

const id = validateUUID('550e8400-e29b-41d4-a716-446655440000', 'User ID');
// ✅ Valid UUID

const id = validateUUID('not-a-uuid', 'User ID');
// ❌ Throws: ValidationError('Invalid User ID format')
```

---

### Validate Pagination

```typescript
import { validatePagination } from '../middleware/validation.middleware.js';

const { page, limit, offset } = validatePagination('2', '20');
// Returns: { page: 2, limit: 20, offset: 20 }

// Defaults: page=1, limit=10
const { page, limit, offset } = validatePagination();
// Returns: { page: 1, limit: 10, offset: 0 }
```

---

## 🛡️ Security Features

### SQL Injection Prevention

Automatically detects and blocks SQL injection attempts:

```typescript
validateUserInput("'; DROP TABLE users; --");
// ❌ Throws: ValidationError('Invalid input detected')

validateUserInput("1' OR '1'='1");
// ❌ Throws: ValidationError('Invalid input detected')
```

**Detected patterns:**
- UNION SELECT
- INSERT INTO
- DROP TABLE
- SQL comments (`--`, `/*`)
- String concatenation attacks

---

### XSS Prevention

Automatically detects and blocks XSS attempts:

```typescript
validateUserInput("<script>alert('XSS')</script>");
// ❌ Throws: ValidationError('Invalid input detected')

validateUserInput("<img src=x onerror='alert(1)' />");
// ❌ Throws: ValidationError('Invalid input detected')
```

**Detected patterns:**
- `<script>` tags
- `<iframe>` tags
- `javascript:` URLs
- Event handlers (`onclick=`, `onerror=`, etc.)
- `<embed>` and `<object>` tags

---

## ⏱️ Rate Limiting

### Global Rate Limiter

Prevents abuse by limiting requests per user:

```typescript
import { rateLimiter } from '../middleware/validation.middleware.js';

export async function handleCommand(bot: any, msg: any) {
  const userId = msg.from.id.toString();
  
  const allowed = rateLimiter.check(userId);
  
  if (!allowed) {
    await bot.sendMessage(
      msg.chat.id,
      '⏳ Too many requests. Please wait a moment.'
    );
    return;
  }
  
  // Process command
}
```

**Default limits:**
- 20 requests per minute per user
- Automatic cleanup of old entries
- In-memory storage

---

### Rate Limit Middleware Wrapper

```typescript
import { withRateLimit } from '../middleware/validation.middleware.js';

// Wrap handler with rate limiting
export const handleBrowse = withRateLimit(
  async (bot: any, msg: any) => {
    // Handler code
  }
);
```

---

## 🔄 Middleware Wrappers

### Validate Callback Query

Automatically validates callback data before executing handler:

```typescript
import { validateCallbackQuery } from '../middleware/validation.middleware.js';

// Wrap callback handler
export const handleSafeCallback = validateCallbackQuery(
  async (bot: any, query: any) => {
    // query.data is now validated
    // Handler code
  }
);
```

---

### Validate Text Input

Automatically validates and sanitizes text before executing handler:

```typescript
import { validateTextInput } from '../middleware/validation.middleware.js';

// Wrap text handler with max length
export const handleSafeText = validateTextInput(
  async (bot: any, msg: any) => {
    // msg.text is now validated and sanitized
    // Handler code
  },
  500 // max 500 characters
);
```

---

### Validate File Upload

Automatically validates files before executing handler:

```typescript
import { validateFileUpload } from '../middleware/validation.middleware.js';

// Wrap file handler
export const handleSafeUpload = validateFileUpload(
  async (bot: any, msg: any) => {
    // msg.document is now validated
    // Handler code
  }
);
```

---

## 📋 Integration Examples

### Example 1: User Registration

```typescript
import { validateEmail, validateUsername, validateUserInput } from '../middleware/index.js';

export async function handleRegister(bot: any, msg: any, step: number, data: any) {
  if (step === 1) {
    // Validate name
    const name = validateUserInput(msg.text, 100);
    // Continue to next step...
  } else if (step === 2) {
    // Validate email
    const email = validateEmail(msg.text);
    // Continue to next step...
  } else if (step === 3) {
    // Validate username
    const username = validateUsername(msg.text);
    // Complete registration...
  }
}
```

---

### Example 2: Admin Resource Upload

```typescript
import { 
  validateFile, 
  validateResourceType, 
  validateUUID,
  withRateLimit 
} from '../middleware/index.js';

export const handleResourceUpload = withRateLimit(
  async (bot: any, msg: any) => {
    // Step 1: Validate file
    if (msg.document) {
      validateFile(msg.document);
      
      // Step 2: Ask for resource type
      await askForResourceType(bot, msg.chat.id);
    }
  }
);

export async function handleResourceTypeSelection(
  bot: any,
  query: any,
  type: string,
  subjectId: string
) {
  // Validate type and subject ID
  const validType = validateResourceType(type);
  const validSubjectId = validateUUID(subjectId, 'Subject ID');
  
  // Create resource
  await createResource(validType, validSubjectId);
}
```

---

### Example 3: Search with Pagination

```typescript
import { validateUserInput, validatePagination } from '../middleware/index.js';

export async function handleSearch(bot: any, query: any) {
  const parts = query.data.split('|');
  const searchTerm = parts[0];
  const pageStr = parts[1];
  
  // Validate search term
  const safeTerm = validateUserInput(searchTerm, 100);
  
  // Validate pagination
  const { page, limit, offset } = validatePagination(pageStr, 10);
  
  // Perform search
  const results = await searchResources(safeTerm, limit, offset);
  
  // Show results
  await showResults(bot, query.message.chat.id, results, page);
}
```

---

### Example 4: Admin User Management

```typescript
import { validateUUID, validateRole } from '../middleware/index.js';

export async function handleChangeRole(
  bot: any,
  query: any,
  userId: string,
  newRole: string
) {
  // Validate user ID
  const validUserId = validateUUID(userId, 'User ID');
  
  // Validate role
  const validRole = validateRole(newRole);
  
  // Update role
  await updateUserRole(validUserId, validRole);
  
  await bot.sendMessage(
    query.message.chat.id,
    `✅ User role updated to: ${validRole}`
  );
}
```

---

## 🧪 Testing Validation

### Test Invalid Inputs

```typescript
// Test SQL injection
try {
  validateUserInput("'; DROP TABLE users; --");
} catch (error) {
  console.log('✅ SQL injection blocked');
}

// Test XSS
try {
  validateUserInput("<script>alert('xss')</script>");
} catch (error) {
  console.log('✅ XSS attempt blocked');
}

// Test invalid email
try {
  validateEmail('not-an-email');
} catch (error) {
  console.log('✅ Invalid email rejected');
}

// Test file too large
try {
  validateFile({ file_size: 100 * 1024 * 1024 }); // 100MB
} catch (error) {
  console.log('✅ Large file rejected');
}
```

---

## 📝 Best Practices

### 1. Always Validate User Input ✅

```typescript
// ✅ Good
const safeText = validateUserInput(msg.text);
await saveToDatabase(safeText);

// ❌ Bad
await saveToDatabase(msg.text); // No validation!
```

---

### 2. Use Specific Validators ✅

```typescript
// ✅ Good
const email = validateEmail(input);
const role = validateRole(roleInput);

// ❌ Bad
const email = input.trim(); // No validation!
```

---

### 3. Sanitize Before Display ✅

```typescript
// ✅ Good
const safeName = sanitizeText(user.name);
await bot.sendMessage(chatId, `Hello ${safeName}!`);

// ❌ Bad
await bot.sendMessage(chatId, `Hello ${user.name}!`); // Could contain XSS
```

---

### 4. Apply Rate Limiting ✅

```typescript
// ✅ Good
export const handler = withRateLimit(myHandler);

// ❌ Bad
export const handler = myHandler; // No rate limiting
```

---

### 5. Validate Callback Data ✅

```typescript
// ✅ Good
validateCallbackData(query.data);
const parts = query.data.split('|');

// ❌ Bad
const parts = query.data.split('|'); // No validation
```

---

## 🚨 Common Mistakes

### Mistake 1: Not Validating Before Database Operations

```typescript
// ❌ Bad
await User.create({ email: msg.text });

// ✅ Good
const email = validateEmail(msg.text);
await User.create({ email });
```

---

### Mistake 2: Trusting Callback Data

```typescript
// ❌ Bad
const userId = query.data.replace('user_', '');
await deleteUser(userId);

// ✅ Good
validateCallbackData(query.data);
const userId = validateUUID(query.data.replace('user_', ''), 'User ID');
await deleteUser(userId);
```

---

### Mistake 3: No Rate Limiting on Heavy Operations

```typescript
// ❌ Bad
export async function handleSearch(bot: any, msg: any) {
  const results = await complexDatabaseQuery(msg.text);
}

// ✅ Good
export const handleSearch = withRateLimit(
  async (bot: any, msg: any) => {
    const safeTerm = validateUserInput(msg.text, 100);
    const results = await complexDatabaseQuery(safeTerm);
  }
);
```

---

## 📊 Validation Rules Reference

| Function | Max Length | Pattern | Additional Rules |
|----------|-----------|---------|------------------|
| `validateEmail` | 255 | `user@domain.com` | Lowercase, trimmed |
| `validateUsername` | 32 | `[a-zA-Z0-9_]{3,32}` | Min 3 chars |
| `validateCallbackData` | 64 | `[a-z0-9_\|-:.]+` | Telegram limit |
| `validateUserInput` | Custom | - | SQL/XSS check |
| `validateFile` | 50MB | - | MIME type check |
| `validateResourceType` | - | Enum | Predefined list |
| `validateLevel` | - | Enum | high_school/university |
| `validateGrade` | - | Enum | Grade 9-12, Freshman, Remedial |
| `validateStream` | - | Enum | natural/social |
| `validateRole` | - | Enum | student/admin/super_admin/content_manager |

---

## 🎯 Summary

✅ **Always validate** user input before processing  
✅ **Use specific validators** for different data types  
✅ **Sanitize** before displaying user content  
✅ **Apply rate limiting** to prevent abuse  
✅ **Check for injections** (SQL, XSS) automatically  
✅ **Validate files** before uploading  
✅ **Use middleware wrappers** for cleaner code  

**Your bot is now protected with comprehensive input validation! 🛡️**
