# Meilisearch Setup Guide for ShopHub

## Prerequisites
- Laravel backend running
- PHP 8.1+ with Composer
- Windows with PowerShell or CMD

---

## Step 1: Download Meilisearch

**Option A: Download Binary (Recommended for Windows)**
1. Go to https://github.com/meilisearch/meilisearch/releases
2. Download the latest Windows binary: `meilisearch-windows-amd64.exe`
3. Move it to `C:\meilisearch\` or your preferred location
4. Rename to `meilisearch.exe`

**Option B: Using Chocolatey**
```powershell
choco install meilisearch
```

---

## Step 2: Start Meilisearch Server

Open a new terminal and run:
```bash
# Navigate to Meilisearch directory
cd C:\meilisearch

# Start server
./meilisearch.exe --master-key="your-master-key-here"
```

**Keep this terminal open!** Meilisearch runs on `http://localhost:7700`

---

## Step 3: Install Laravel Scout & Meilisearch

In your backend directory:
```bash
cd backend
composer require laravel/scout
composer require meilisearch/meilisearch-php http-interop/http-factory-guzzle
```

---

## Step 4: Configure Environment

Add to `backend/.env`:
```env
SCOUT_DRIVER=meilisearch
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_KEY=your-master-key-here
```

---

## Step 5: Publish Scout Config

```bash
php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
```

---

## Step 6: Index Products

After setup, run:
```bash
php artisan scout:import "App\Models\Product"
```

---

## Verify Installation

Open http://localhost:7700 in your browser - you should see the Meilisearch dashboard!

---

## Troubleshooting

**Port 7700 already in use?**
```bash
./meilisearch.exe --master-key="your-key" --http-addr="localhost:7701"
```
Then update `.env`: `MEILISEARCH_HOST=http://localhost:7701`

**Permission errors?**
Run PowerShell as Administrator

---

## Next Steps
After Meilisearch is running, I'll implement the search features! ✅
