# Running the ShopHub Application

## Prerequisites
- ✅ Meilisearch server running on port 7700
- ✅ Frontend dependencies installed (`npm install` in frontend/)
- ✅ Backend dependencies installed (`composer install` in backend/)

---

## Step 1: Start Backend (Laravel)

Open a terminal in the backend directory:

```bash
cd backend

# Add environment variables to .env if not already there:
# SCOUT_DRIVER=meilisearch
# MEILISEARCH_HOST=http://localhost:7700
# MEILISEARCH_KEY=your-master-key-here

# Start Laravel server
php artisan serve
```

Laravel will run on **http://localhost:8000**

---

## Step 2: Start Frontend (Next.js)

Open a NEW terminal in the frontend directory:

```bash
cd frontend

# Create .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Start Next.js development server
npm run dev
```

Next.js will run on **http://localhost:3000**

---

## Step 3: Verify Everything Works

1. **Meilisearch** - http://localhost:7700 (should show dashboard)
2. **Laravel API** - http://localhost:8000/api/v1/products (should return JSON)
3. **Next.js App** - http://localhost:3000 (should show ShopHub homepage)

---

## Testing Search

1. Go to http://localhost:3000
2. Type in the search bar (top navigation)
3. You should see autocomplete suggestions appear!
4. Press Enter to see full search results

---

## Troubleshooting

**Network Error in console?**
- Make sure Laravel backend is running (`php artisan serve`)
- Check backend/.env has `APP_URL=http://localhost:8000`
- Check frontend/.env.local has correct API URLs

**No search results?**
- Run `php artisan scout:import "App\Models\Product"` to index products
- Make sure Meilisearch is running

**CORS errors?**
- Check backend/bootstrap/app.php has CORS configured for `http://localhost:3000`
