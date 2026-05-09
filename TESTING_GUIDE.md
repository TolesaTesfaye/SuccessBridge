# 🧪 Testing Guide - Private Bucket with Signed URLs

## ✅ What You Just Uploaded

From your console log:
```javascript
{
  title: "try",
  description: "for try doc",
  educationLevel: "university",
  type: "modules",
  subject: "Math",
  tags: "",
  file: File { name: "cr7.jpg", size: 132508 },
  stream: "natural",
  universityId: "Haramaya University",
  category: "freshman"
}
```

**File**: `cr7.jpg` (132 KB image)  
**Type**: Module  
**Subject**: Math  
**Level**: University - Freshman

---

## 🔍 What to Check Now

### 1. Check Backend Logs (Render Dashboard)

Go to: **Render Dashboard** → **Your Service** → **Logs**

Look for these messages:

#### ✅ Successful Upload:
```
📤 Uploading to B2 with key: resources/1234567890-cr7.jpg
📊 File size: 132508 bytes
📄 Content type: image/jpeg
✅ File uploaded successfully to B2: https://f833.backblazeb2.com/file/successbridge-resources/resources/1234567890-cr7.jpg
```

#### ❌ Failed Upload:
```
❌ B2 upload error: [error message]
```

### 2. Check B2 Dashboard

1. Go to: https://secure.backblaze.com/b2_buckets.htm
2. Click **"Browse Files"**
3. Navigate to `resources/` folder
4. Look for a file with timestamp like: `1234567890-cr7.jpg`
5. ✅ If you see it, upload worked!

### 3. Check Frontend Response

In your browser console, look for:
```javascript
✅ Resource created successfully
{
  id: "uuid-here",
  title: "try",
  fileUrl: "https://f833.backblazeb2.com/file/successbridge-resources/resources/1234567890-cr7.jpg",
  ...
}
```

---

## 🎯 Test Download/Open

### Test 1: Open Button
1. Find the "try" resource in your resource list
2. Click **"Open"** button
3. **Expected**: New tab opens with the image
4. **What happens**: 
   - Backend generates signed URL
   - Browser redirects to signed URL
   - Image displays in new tab

### Test 2: Download Button
1. Click **"Download"** button on the same resource
2. **Expected**: File downloads to your computer
3. **What happens**:
   - Backend generates signed URL
   - Browser follows redirect
   - File downloads as `cr7.jpg`

### Test 3: Check Signed URL
1. After clicking Open/Download, check the URL in the new tab
2. Should look like:
```
https://s3.us-east-005.backblazeb2.com/successbridge-resources/resources/1234567890-cr7.jpg?
X-Amz-Algorithm=AWS4-HMAC-SHA256&
X-Amz-Credential=...&
X-Amz-Date=20250109T123456Z&
X-Amz-Expires=3600&
X-Amz-SignedHeaders=host&
X-Amz-Signature=abc123...
```

3. ✅ If you see `X-Amz-Signature`, signed URLs are working!

---

## 🐛 Troubleshooting

### Issue: Upload Failed

**Check Backend Logs for:**
```
❌ B2 upload error: InvalidAccessKeyId
```

**Solution:**
- Verify `B2_KEY_ID` in Render environment variables
- Verify `B2_APPLICATION_KEY` in Render environment variables
- Make sure application key has **Read and Write** access

---

### Issue: "Access Denied" When Opening/Downloading

**Check Backend Logs for:**
```
🔐 Generating signed URL for private bucket, key: resources/1234567890-cr7.jpg
❌ Failed to generate signed URL: [error]
```

**Possible Causes:**
1. B2 credentials incorrect
2. File doesn't exist in B2
3. Bucket name mismatch

**Solutions:**
1. Verify all B2 environment variables in Render
2. Check file exists in B2 Browse Files
3. Verify `B2_BUCKET_NAME` = `successbridge-resources`

---

### Issue: Download Opens in New Tab Instead of Downloading

**This is normal for images!**

Images (JPG, PNG, etc.) will open in the browser by default. To force download:

**Option 1**: Right-click → "Save Image As..."

**Option 2**: Update backend to force download for images (I can do this if needed)

---

### Issue: "Failed to fetch" Error

**Check:**
1. Is Render backend awake? (Check health endpoint)
2. Is CORS configured correctly?
3. Is frontend using correct API URL?

**Test Backend:**
```bash
curl https://successbridge-tolesa-api.onrender.com/api/health
```

Should return:
```json
{
  "status": "OK",
  "timestamp": "2025-01-09...",
  "database": "connected",
  "environment": "production"
}
```

---

## 📊 Expected Behavior Summary

### Upload Flow:
```
1. Admin selects file (cr7.jpg)
   ↓
2. Frontend sends to POST /api/resources
   ↓
3. Backend receives file in memory
   ↓
4. Backend uploads to B2 (private bucket)
   ↓
5. B2 returns success
   ↓
6. Backend saves metadata to database with B2 URL
   ↓
7. Frontend shows success message
```

### Download Flow:
```
1. User clicks "Download" or "Open"
   ↓
2. Frontend calls GET /api/resources/:id/download
   ↓
3. Backend extracts file key from stored URL
   ↓
4. Backend generates signed URL (valid 1 hour)
   ↓
5. Backend redirects (302) to signed URL
   ↓
6. Browser follows redirect
   ↓
7. File downloads/opens from B2
```

---

## ✅ Success Indicators

You'll know everything is working when:

- ✅ Upload shows success message
- ✅ File appears in B2 Browse Files
- ✅ File appears in resource list with thumbnail
- ✅ "Open" button opens file in new tab
- ✅ "Download" button downloads file
- ✅ URL contains `X-Amz-Signature` parameter
- ✅ No errors in browser console
- ✅ No errors in Render logs

---

## 🎯 Next Steps

### 1. Wait for Deployment (2-3 minutes)
- Frontend: Vercel auto-deploys from GitHub
- Backend: Render auto-deploys from GitHub
- Check deployment status in respective dashboards

### 2. Test the Upload You Just Made
- Find "try" resource in list
- Click "Open" - should show cr7.jpg image
- Click "Download" - should download the image

### 3. Upload Another Test File
- Try a PDF this time
- Verify upload succeeds
- Test download/open

### 4. Check Signed URL Expiration
- Download a file
- Copy the signed URL from browser
- Wait 1 hour
- Try opening the URL again
- Should get "Access Denied" (URL expired) ✅

---

## 📞 If You Need Help

**Share these with me:**

1. **Backend Logs** (from Render):
   - Copy the upload/download related logs
   - Look for ✅ or ❌ messages

2. **Browser Console** (F12):
   - Copy any error messages
   - Look for "Failed to fetch" or similar

3. **B2 Dashboard**:
   - Screenshot of Browse Files showing resources/ folder
   - Confirm files are being uploaded

4. **Test Results**:
   - Does upload work? ✅/❌
   - Does open work? ✅/❌
   - Does download work? ✅/❌
   - Do you see signed URLs? ✅/❌

---

**Current Status**: 
- ✅ Code deployed
- ✅ Private bucket configured
- ✅ Signed URLs implemented
- ⏳ Waiting for you to test!

**Your file**: `cr7.jpg` should be in B2 now. Let's test if you can download it! 🚀
