# TanStack Start + Vercel Deployment Guide

## ✅ Configuration Checklist

### 1. **Vercel Config** (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "trailingSlash": false
}
```

**What it does:**
- Routes all requests to `/index.html` (SPA routing)
- Sets build output to `dist` folder
- Removes trailing slashes from URLs
- Prevents 404 errors on page refresh

### 2. **Vite Config** (`vite.config.ts`)
```typescript
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
```

**Key settings:**
- `outDir: 'dist'` - matches Vercel's outputDirectory
- `assetsDir: 'assets'` - organizes static files
- Enable sourcemaps only in development

### 3. **TanStack Router Setup**

#### File-based routing structure:
```
src/routes/
├── __root.tsx          (root layout)
├── index.tsx           (home page /)
├── about.tsx           (about page /about)
├── products/
│   ├── index.tsx       (/products)
│   └── $id.tsx         (/products/:id)
└── _404.tsx            (catch-all for 404s)
```

#### Dynamic routes example:
```typescript
// src/routes/products/$id.tsx
import { useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$id')({
  component: ProductDetail,
})

function ProductDetail() {
  const { id } = useParams({ from: '/products/$id' })
  return <div>Product: {id}</div>
}
```

### 4. **Environment Variables** (if needed)
Create `.env` file:
```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=MyApp
```

Use in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 🚀 Deployment Steps

### Step 1: Prepare your project
```bash
# Install dependencies
npm install

# Test locally
npm run dev

# Test production build locally
npm run build
npm run preview
```

### Step 2: Push to Git
```bash
git add .
git commit -m "chore: prepare for vercel deployment"
git push origin main
```

### Step 3: Deploy to Vercel
```bash
# Option A: Using Vercel CLI
npm i -g vercel
vercel

# Option B: Connect GitHub repo in Vercel dashboard
# vercel.com > New Project > Import Git Repo
```

### Step 4: Verify deployment
- ✅ Check main URL loads
- ✅ Test page refresh on nested routes (e.g., `/about`, `/products/123`)
- ✅ Test invalid routes (should show 404)
- ✅ Check console for errors

## 🔧 Troubleshooting

### Issue: 404 on page refresh
**Solution:** Update `vercel.json` rewrites to route all traffic to `/index.html`

```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

### Issue: Assets not loading (404 for CSS/JS)
**Solution:** Check that build output directory is correct
```json
"outputDirectory": "dist"
```

### Issue: Dynamic routes not working
**Solution:** Ensure TanStack Router is properly configured with file-based routing:
- Use `createFileRoute()` for each route
- Name files with `$param` for dynamic segments
- Export `Route` from each file

### Issue: CSS/styling not applied
**Solution:** Verify Tailwind is built correctly:
```bash
npm run build
# Check dist/assets/index-*.css file exists
```

## 📦 Package Scripts Reference

```json
{
  "dev": "vite dev",           // Local development
  "build": "vite build",        // Production build
  "build:dev": "vite build --mode development",  // Dev build with sourcemaps
  "preview": "vite preview",    // Preview production build locally
  "lint": "eslint .",           // Code linting
  "format": "prettier --write ." // Code formatting
}
```

## 🎯 Best Practices

1. **Always test locally first**
   ```bash
   npm run build && npm run preview
   ```

2. **Use environment variables for API URLs**
   - Never hardcode production URLs

3. **Enable caching for assets**
   - Static files should have long cache times
   - HTML should not be cached

4. **Monitor Vercel deployment logs**
   - Check for build errors
   - Verify correct output directory

5. **Handle 404s gracefully**
   - Create a catch-all route
   - Provide navigation back to home

## 📚 Useful Links

- [TanStack Router Docs](https://tanstack.com/router/latest)
- [TanStack Start Docs](https://tanstack.com/start/latest)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Vite Config Reference](https://vitejs.dev/config/)

## ✨ Next Steps

1. Copy `vercel.json` to project root
2. Update `vite.config.ts` with configuration above
3. Set up file-based routing in `src/routes/`
4. Deploy to Vercel
5. Test all routes and verify no 404 errors
