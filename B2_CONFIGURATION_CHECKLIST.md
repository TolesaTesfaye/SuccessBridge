# ✅ Backblaze B2 Configuration Checklist

## 📋 Your B2 Account Information

Based on your screenshot, here's what I can see:

- **Bucket Name**: `successbridge-resources` ✅
- **Bucket ID**: `f833725f1f4fc94199dc0511` ✅
- **Bucket ID Prefix**: `f833` (first 4 characters)
- **Region**: Appears to be `us-west-004` (from URL)
- **Files Uploaded**: Yes! (payments/ and resources/ folders exist)

---

## 🔐 Required Environment Variables for Render

You need to set these in your **Render Dashboard** → **Backend Service** → **Environment** tab:

### 1. B2_BUCKET_NAME
```
successbridge-resources
```

### 2. B2_BUCKET_ID
```
f833725f1f4fc94199dc0511
```
⚠️ **IMPORTANT**: This is the full bucket ID from your B2 dashboard

### 3. B2_REGION
```
us-west-004
```
(Or check your B2 bucket settings for the exact region)

### 4. B2_ENDPOINT
```
s3.us-west-004.backblazeb2.com
```
(Match this with your region)

### 5. B2_KEY_ID
```
[Your Application Key ID]
```
⚠️ Get this from: **B2 Dashboard** → **App Keys** → Copy the `keyID`

### 6. B2_APPLICATION_KEY
```
[Your Application Key Secret]
```
⚠️ Get this from: **B2 Dashboard** → **App Keys** → Copy the `applicationKey`
⚠️ **You can only see this ONCE when creating the key!**

---

## 🔍 How to Get Your Application Keys

### If You Already Have Keys:
1. Go to B2 Dashboard → **Application Keys**
2. Look for a key named `successbridge-api` or similar
3. Copy the **keyID** (this is `B2_KEY_ID`)
4. ⚠️ If you don't have the **applicationKey** saved, you'll need to create a new key

### If You Need to Create New Keys:
1. Go to B2 Dashboard → **Application Keys**
2. Click **"Add a New Application Key"**
3. Configure:
   - **Name**: `successbridge-api`
   - **Allow access to Bucket(s)**: Select `successbridge-resources`
   - **Type of Access**: **Read and Write**
4. Click **"Create New Key"**
5. **⚠️ IMMEDIATELY COPY BOTH VALUES:**
   - `keyID` → This is your `B2_KEY_ID`
   - `applicationKey` → This is your `B2_APPLICATION_KEY`
   - **You won't see the applicationKey again!**

---

## 🔧 How to Set Environment Variables in Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Select your backend service (e.g., `successbridge-tolesa-api`)
3. Click **"Environment"** tab in the left sidebar
4. For each variable:
   - Click **"Add Environment Variable"**
   - Enter **Key** (e.g., `B2_BUCKET_ID`)
   - Enter **Value** (e.g., `f833725f1f4fc94199dc0511`)
   - Click **"Save"**
5. After adding all variables, click **"Save Changes"**
6. Render will automatically redeploy your service

---

## ✅ Verification Steps

### Step 1: Check Bucket is Public
1. Go to B2 Dashboard → **Buckets**
2. Click on `successbridge-resources`
3. Check **"Files in Bucket"** setting
4. ⚠️ **Must be set to "Public"** for downloads to work
5. If not public:
   - Click **"Bucket Settings"**
   - Change to **"Public"**
   - Click **"Update Bucket"**

### Step 2: Test File URL
Based on your bucket ID, your file URLs should look like:
```
https://f833.backblazeb2.com/file/successbridge-resources/resources/[filename]
```

Example:
```
https://f833.backblazeb2.com/file/successbridge-resources/resources/1234567890-textbook.pdf
```

Try opening one of your existing files:
1. Go to B2 Dashboard → **Browse Files**
2. Navigate to `resources/` folder
3. Click on a file
4. Copy the public URL
5. Open in browser - should download/display

### Step 3: Test Upload via Admin Dashboard
1. Log in to your app as admin
2. Go to **Admin Dashboard** → **Resources** → **Upload**
3. Fill in the form and select a test file
4. Click **"Upload"**
5. Check if:
   - ✅ Upload succeeds
   - ✅ File appears in B2 dashboard
   - ✅ File URL starts with `https://f833.backblazeb2.com/...`
   - ✅ File can be downloaded/opened

---

## 🐛 Troubleshooting

### Issue: "Failed to upload file to B2"

**Check:**
1. Are all 6 environment variables set in Render?
2. Is `B2_KEY_ID` correct?
3. Is `B2_APPLICATION_KEY` correct?
4. Does the application key have **Read and Write** access?
5. Is the key allowed to access `successbridge-resources` bucket?

**Solution:**
- Go to Render → Environment tab
- Verify all variables are set
- Check for typos
- If unsure, create a new application key

### Issue: "File not found" or 404 when downloading

**Check:**
1. Is bucket set to **Public**?
2. Is the file URL using the correct bucket ID prefix (`f833`)?
3. Does the file exist in B2 dashboard?

**Solution:**
- Make bucket public in B2 settings
- Verify file URL format: `https://f833.backblazeb2.com/file/successbridge-resources/...`
- Check file exists in B2 Browse Files

### Issue: CORS errors

**Check:**
1. Go to B2 Dashboard → Buckets → `successbridge-resources` → **Bucket Settings**
2. Scroll to **CORS Rules**

**Solution:**
Add this CORS rule:
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

---

## 📊 Current Status

Based on your screenshot:

| Item | Status | Notes |
|------|--------|-------|
| B2 Account | ✅ Created | Account: tolesatesfaye273 |
| Bucket Created | ✅ Done | Name: successbridge-resources |
| Bucket ID | ✅ Known | f833725f1f4fc94199dc0511 |
| Files Uploaded | ✅ Working | payments/ and resources/ folders exist |
| Code Updated | ✅ Fixed | Using dynamic bucket ID prefix |
| Env Variables | ⚠️ **TO DO** | Need to set in Render |
| Bucket Public | ⚠️ **TO CHECK** | Verify in B2 settings |
| Download Test | ⚠️ **TO TEST** | Test after env vars set |

---

## 🎯 Next Steps

### 1. Set Environment Variables in Render (5 minutes)
- [ ] `B2_BUCKET_NAME` = `successbridge-resources`
- [ ] `B2_BUCKET_ID` = `f833725f1f4fc94199dc0511`
- [ ] `B2_REGION` = `us-west-004`
- [ ] `B2_ENDPOINT` = `s3.us-west-004.backblazeb2.com`
- [ ] `B2_KEY_ID` = [Get from B2 App Keys]
- [ ] `B2_APPLICATION_KEY` = [Get from B2 App Keys]

### 2. Verify Bucket is Public (1 minute)
- [ ] Go to B2 → Buckets → successbridge-resources
- [ ] Check "Files in Bucket" = **Public**
- [ ] If not, change to Public

### 3. Test Upload (2 minutes)
- [ ] Wait for Render to redeploy (after setting env vars)
- [ ] Log in as admin
- [ ] Upload a test resource
- [ ] Verify file appears in B2
- [ ] Test download/open button

### 4. Test Download (1 minute)
- [ ] Click "Open" or "Download" on a resource
- [ ] File should open/download successfully
- [ ] Check URL starts with `https://f833.backblazeb2.com/...`

---

## 📞 Need Help?

If you encounter issues:

1. **Check Render Logs**
   - Go to Render Dashboard → Your Service → **Logs**
   - Look for B2-related errors
   - Share the error message

2. **Check Browser Console**
   - Open browser DevTools (F12)
   - Go to **Console** tab
   - Look for errors when uploading/downloading
   - Share the error message

3. **Test Backend Health**
   ```bash
   curl https://successbridge-tolesa-api.onrender.com/api/health
   ```

4. **Test B2 Directly**
   - Try opening a file URL directly in browser
   - Format: `https://f833.backblazeb2.com/file/successbridge-resources/resources/[filename]`

---

**Last Updated**: January 2025  
**Your Bucket**: successbridge-resources  
**Your Bucket ID**: f833725f1f4fc94199dc0511  
**Status**: ⚠️ Environment variables need to be set in Render
