# 🔧 Troubleshooting Checklist - Network Error Fixed

## ✅ What I Fixed

**Problem:** Search autocomplete returning "Network Error"
**Root Cause:** CORS `supports_credentials` was set to `false`

**Solution:** Updated `backend/config/cors.php`:
```php
'supports_credentials' => true,  // Changed from false
'allowed_origins' => [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
],
```

---

## 🚀 Complete Startup Checklist

Follow these steps in order:

### 1. Start Meilisearch Server
```bash
cd C:\meilisearch
./meilisearch.exe --master-key="your-master-key"
```
✅ Should show: "Meilisearch is running on http://localhost:7700"

### 2. Verify Backend .env
Check `backend/.env` has:
```env
SCOUT_DRIVER=meilisearch
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_KEY=your-master-key
APP_URL=http://localhost:8000
```

### 3. Start Laravel Backend
```bash
cd backend
php artisan serve
```
✅ Should show: "Server running on [http://localhost:8000]"

### 4. Create Frontend .env.local
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 5. Start Next.js Frontend
```bash
cd frontend
npm run dev
```
✅ Should show: "Ready on http://localhost:3000"

---

## ✅ Testing Search

1. Open http://localhost:3000
2. Look for the search bar in the navigation
3. Type any text (at least 2 characters)
4. **Autocomplete suggestions should appear!** 🎉

---

## 🔍 Quick Verification

Test the API directly:
```bash
# Test search endpoint
curl http://localhost:8000/api/v1/search/autocomplete?q=test&limit=5
```

Should return JSON with product suggestions.

---

## 💡 Common Issues

**Still getting Network Error?**
- Restart Laravel server after changing CORS
- Clear browser cache
- Check browser console for actual error message

**No results in autocomplete?**
- Run: `cd backend && php artisan scout:import "App\Models\Product"`
- Make sure you have products in the database

---

**Status:** CORS Fixed ✅  
**Ready to test!** The search should work now.
