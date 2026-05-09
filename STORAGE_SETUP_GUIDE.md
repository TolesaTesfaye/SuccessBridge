# 🗄️ SuccessBridge Storage Setup Guide

## 🎯 Overview

SuccessBridge uses **Backblaze B2** (S3-compatible) cloud storage for all resource files (PDFs, videos, images, documents). This guide covers the complete setup and configuration.

---

## 📋 Table of Contents

1. [Why Backblaze B2?](#why-backblaze-b2)
2. [Architecture Overview](#architecture-overview)
3. [Setup Instructions](#setup-instructions)
4. [Environment Variables](#environment-variables)
5. [File Upload Flow](#file-upload-flow)
6. [File Download Flow](#file-download-flow)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)
9. [Code Reference](#code-reference)

---

## 🌟 Why Backblaze B2?

- **Cost-Effective**: $0.005/GB/month (10x cheaper than AWS S3)
- **Free Tier**: 10GB storage + 1GB daily download free
- **S3-Compatible**: Works with AWS SDK (easy integration)
- **No Egress Fees**: First 3x your storage is free
- **Simple Setup**: No complex IAM policies
- **Reliable**: 99.9% uptime SLA

---

## 🏗️ Architecture Overview

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Frontend  │────────▶│   Backend   │────────▶│ Backblaze B2│
│  (React)    │         │  (Express)  │         │  (Storage)  │
└─────────────┘         └─────────────┘         └─────────────┘
      │                        │                        │
      │                        │                        │
      ▼                        ▼                        ▼
  Upload Form          Multer + AWS SDK         Public Files
  Download Button      Database (Metadata)      Direct Access
```

### Components

1. **Frontend**: Upload form with file selection
2. **Backend**: Express API with Multer middleware
3. **B2 Storage**: Cloud storage for actual files
4. **Database**: PostgreSQL stores metadata (title, URL, etc.)

---

## 🚀 Setup Instructions

### Step 1: Create Backblaze B2 Account

1. Go to [Backblaze B2 Sign Up](https://www.backblaze.com/b2/sign-up.html)
2. Create a free account (no credit card required for 10GB)
3. Verify your email address
4. Log in to the Backblaze dashboard

### Step 2: Create a Bucket

1. Click **"Buckets"** in the left sidebar
2. Click **"Create a Bucket"**
3. Configure bucket settings:
   - **Bucket Unique Name**: `successbridge-resources` (or your choice)
   - **Files in Bucket**: **Public** ⚠️ (IMPORTANT!)
   - **Default Encryption**: Disabled (or enable if needed)
   - **Object Lock**: Disabled
   - **Lifecycle Settings**: None (or configure as needed)
4. Click **"Create a Bucket"**
5. **Copy the Bucket ID** (you'll need this later)

### Step 3: Create Application Keys

1. Click **"App Keys"** in the left sidebar
2. Click **"Add a New Application Key"**
3. Configure key settings:
   - **Name of Key**: `successbridge-api`
   - **Allow access to Bucket(s)**: Select your bucket
   - **Type of Access**: **Read and Write**
   - **Allow List All Bucket Names**: Yes (optional)
   - **File name prefix**: Leave empty
   - **Duration**: Leave empty (no expiration)
4. Click **"Create New Key"**
5. **⚠️ IMPORTANT**: Copy both values immediately:
   - `keyID` → This is your `B2_KEY_ID`
   - `applicationKey` → This is your `B2_APPLICATION_KEY`
   - **You won't see the applicationKey again!**

### Step 4: Get Bucket Information

1. Go back to **"Buckets"**
2. Click on your bucket name
3. Note the **Endpoint** (e.g., `s3.us-west-004.backblazeb2.com`)
4. Note the **Region** (e.g., `us-west-004`)

### Step 5: Configure Environment Variables

#### Local Development (`.env` file)

Create or update `Server/.env`:

```env
# Backblaze B2 Storage Configuration
B2_KEY_ID=your_key_id_here
B2_APPLICATION_KEY=your_application_key_here
B2_BUCKET_NAME=successbridge-resources
B2_BUCKET_ID=your_bucket_id_here
B2_ENDPOINT=s3.us-west-004.backblazeb2.com
B2_REGION=us-west-004
```

#### Production (Render Dashboard)

1. Go to your Render dashboard
2. Select your backend service
3. Click **"Environment"** tab
4. Add each variable:
   - `B2_KEY_ID` = `your_key_id_here`
   - `B2_APPLICATION_KEY` = `your_application_key_here`
   - `B2_BUCKET_NAME` = `successbridge-resources`
   - `B2_BUCKET_ID` = `your_bucket_id_here`
   - `B2_ENDPOINT` = `s3.us-west-004.backblazeb2.com`
   - `B2_REGION` = `us-west-004`
5. Click **"Save Changes"** (will trigger auto-deploy)

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `B2_KEY_ID` | Application Key ID from B2 | `0051a2b3c4d5e6f7g8h9` |
| `B2_APPLICATION_KEY` | Application Key Secret | `K005abcdefghijklmnopqrstuvwxyz123456` |
| `B2_BUCKET_NAME` | Your bucket name | `successbridge-resources` |
| `B2_BUCKET_ID` | Bucket ID from B2 dashboard | `a1b2c3d4e5f6g7h8i9j0` |
| `B2_ENDPOINT` | S3-compatible endpoint | `s3.us-west-004.backblazeb2.com` |
| `B2_REGION` | Bucket region | `us-west-004` |

---

## 📤 File Upload Flow

```
1. Admin selects file in frontend form
   ↓
2. Frontend sends POST /api/resources with multipart/form-data
   ↓
3. Multer middleware captures file in memory (buffer)
   ↓
4. uploadToB2() function uploads buffer to B2 using AWS SDK
   ↓
5. B2 returns success, public URL is generated
   ↓
6. Resource metadata + fileUrl saved to PostgreSQL
   ↓
7. Frontend receives resource object with fileUrl
```

### Upload Endpoint

```
POST /api/resources
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

Body:
- file: <binary file>
- title: "Resource Title"
- description: "Resource description"
- type: "textbook" | "video" | "assignment" | "exam" | "note"
- educationLevel: "high_school" | "university"
- subject: "Mathematics"
- grade: "grade_12" | "freshman" | etc.
- stream: "natural" | "social" (optional)
- universityId: <uuid> (optional)
- departmentId: <uuid> (optional)
- tags: "math,algebra,calculus" (optional)
```

### File Constraints

- **Max Size**: 100MB
- **Allowed Types**: PDF, JPG, JPEG, PNG, GIF, MP4, MOV, AVI, DOC, DOCX, PPT, PPTX, XLS, XLSX
- **Storage**: Memory buffer (no local disk storage)

---

## 📥 File Download Flow

```
1. User clicks "Download" or "Open" button
   ↓
2. Frontend calls GET /api/resources/:id/download
   ↓
3. Backend fetches resource from database
   ↓
4. Backend sends 302 redirect to B2 public URL
   ↓
5. Browser downloads/displays file directly from B2
```

### Download Endpoint

```
GET /api/resources/:id/download

Response: 302 Redirect to B2 public URL
Location: https://f004.backblazeb2.com/file/successbridge-resources/resources/1234567890-file.pdf
```

### Public URL Format

```
https://f{bucket_id_prefix}.backblazeb2.com/file/{bucket_name}/{file_key}

Example:
https://f004.backblazeb2.com/file/successbridge-resources/resources/1705123456789-textbook.pdf
```

---

## 🧪 Testing

### Test 1: Upload a File (Local)

```bash
# Get admin token first
TOKEN="your_admin_jwt_token"

# Upload test file
curl -X POST http://localhost:5000/api/resources \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@test.pdf" \
  -F "title=Test Resource" \
  -F "description=Testing B2 upload" \
  -F "type=textbook" \
  -F "educationLevel=university" \
  -F "subject=Computer Science"
```

### Test 2: Download a File

```bash
# Get resource ID from upload response
RESOURCE_ID="uuid-from-upload-response"

# Test download (should redirect to B2 URL)
curl -L http://localhost:5000/api/resources/$RESOURCE_ID/download -o downloaded-file.pdf
```

### Test 3: Verify in B2 Dashboard

1. Go to Backblaze B2 dashboard
2. Click on your bucket
3. Click **"Browse Files"**
4. You should see `resources/` folder with uploaded files
5. Click on a file to get its public URL
6. Test the URL in your browser

### Test 4: Frontend Upload (Production)

1. Log in as admin
2. Go to Admin Dashboard → Resources → Upload
3. Fill in the form and select a file
4. Click "Upload"
5. Verify success message
6. Check resource appears in list
7. Click "Open" or "Download" to test access

---

## 🔧 Troubleshooting

### Issue: "Failed to upload file to B2"

**Possible Causes:**
- Invalid B2 credentials
- Bucket doesn't exist
- Incorrect region/endpoint
- Network connectivity issues

**Solutions:**
1. Verify all environment variables are set correctly
2. Check B2 dashboard that bucket exists
3. Test credentials with B2 CLI or API
4. Check backend logs for detailed error message

### Issue: "File not found" or 404 on download

**Possible Causes:**
- Bucket is not set to "Public"
- File was deleted from B2
- Incorrect fileUrl in database

**Solutions:**
1. Go to B2 dashboard → Buckets → Your bucket
2. Ensure "Files in Bucket" is set to **Public**
3. Check database: `SELECT fileUrl FROM resources WHERE id='...'`
4. Test the fileUrl directly in browser

### Issue: CORS errors when downloading

**Possible Causes:**
- B2 bucket CORS not configured
- Frontend domain not allowed

**Solutions:**
1. Go to B2 dashboard → Buckets → Your bucket → Bucket Settings
2. Add CORS rules:
```json
[
  {
    "corsRuleName": "allowAll",
    "allowedOrigins": ["*"],
    "allowedOperations": ["s3_get"],
    "allowedHeaders": ["*"],
    "exposeHeaders": [],
    "maxAgeSeconds": 3600
  }
]
```

### Issue: "File too large" error

**Possible Causes:**
- File exceeds 100MB limit
- Multer limit reached

**Solutions:**
1. Reduce file size or compress
2. Increase limit in `Server/src/middleware/b2Upload.ts`:
```typescript
limits: {
  fileSize: 200 * 1024 * 1024, // 200MB
}
```

### Issue: Slow uploads

**Possible Causes:**
- Large file size
- Slow network connection
- B2 region far from server

**Solutions:**
1. Use file compression
2. Choose B2 region closer to your server
3. Implement upload progress indicator
4. Consider chunked uploads for very large files

---

## 💻 Code Reference

### Key Files

| File | Purpose |
|------|---------|
| `Server/src/config/b2.ts` | B2 client configuration |
| `Server/src/middleware/b2Upload.ts` | Multer + B2 upload logic |
| `Server/src/routes/resources.ts` | Resource API routes |
| `Server/src/controllers/resourceController.ts` | Upload/download handlers |
| `Server/src/services/resourceService.ts` | Business logic |
| `Server/src/models/Resource.ts` | Database model |

### B2 Client Configuration

```typescript
// Server/src/config/b2.ts
import { S3Client } from '@aws-sdk/client-s3';

export const b2Client = new S3Client({
  region: process.env.B2_REGION || 'us-west-004',
  endpoint: `https://${process.env.B2_ENDPOINT}`,
  credentials: {
    accessKeyId: process.env.B2_KEY_ID || '',
    secretAccessKey: process.env.B2_APPLICATION_KEY || '',
  },
});
```

### Upload Function

```typescript
// Server/src/middleware/b2Upload.ts
export async function uploadToB2(
  reqOrData: Request | any,
  file: Express.Multer.File,
  folder: string = 'resources'
): Promise<string> {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(file.originalname);
  const key = `${folder}/${uniqueSuffix}${ext}`;

  const command = new PutObjectCommand({
    Bucket: B2_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await b2Client.send(command);
  return getB2PublicUrl(key);
}
```

### Public URL Generation

```typescript
// Server/src/middleware/b2Upload.ts
export function getB2PublicUrl(key: string): string {
  const bucketIdPrefix = B2_BUCKET_ID.substring(0, 4);
  return `https://f${bucketIdPrefix}.backblazeb2.com/file/${B2_BUCKET}/${key}`;
}
```

---

## ✅ Verification Checklist

- [ ] Backblaze B2 account created
- [ ] Bucket created and set to **Public**
- [ ] Application keys generated and saved
- [ ] Environment variables configured (local + Render)
- [ ] Backend deployed with B2 config
- [ ] Test file uploaded successfully
- [ ] Test file downloadable via public URL
- [ ] Frontend upload form working
- [ ] Frontend download/open buttons working
- [ ] Files visible in B2 dashboard
- [ ] No CORS errors
- [ ] No 404 errors on download

---

## 📊 Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| B2 Client | ✅ Configured | `Server/src/config/b2.ts` |
| Upload Middleware | ✅ Implemented | `Server/src/middleware/b2Upload.ts` |
| Resource Routes | ✅ Configured | `Server/src/routes/resources.ts` |
| Upload Controller | ✅ Working | `Server/src/controllers/resourceController.ts` |
| Download Controller | ✅ Working | Redirects to B2 public URL |
| Database Model | ✅ Ready | `Server/src/models/Resource.ts` |
| Frontend Upload | ✅ Working | Admin dashboard |
| Frontend Download | ✅ Working | Resource cards |

---

## 🎓 Best Practices

1. **Security**
   - Never commit B2 credentials to Git
   - Use environment variables for all secrets
   - Rotate application keys periodically
   - Use separate buckets for dev/staging/prod

2. **Performance**
   - Enable B2 CDN for faster downloads
   - Use appropriate file compression
   - Implement caching headers
   - Consider lazy loading for large files

3. **Cost Optimization**
   - Monitor storage usage in B2 dashboard
   - Set up lifecycle rules to delete old files
   - Use B2's free tier efficiently
   - Compress files before upload

4. **Reliability**
   - Implement retry logic for uploads
   - Add upload progress indicators
   - Handle network errors gracefully
   - Log all B2 operations for debugging

---

## 📞 Support

- **Backblaze B2 Docs**: https://www.backblaze.com/b2/docs/
- **AWS SDK for JavaScript**: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/
- **Multer Documentation**: https://github.com/expressjs/multer

---

**Last Updated**: January 2025  
**Storage Provider**: Backblaze B2  
**Status**: ✅ Fully Configured and Production-Ready
