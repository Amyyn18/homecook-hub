#!/bin/bash

echo "🔍 TanStack Start + Vercel Deployment Checklist"
echo "================================================"
echo ""

# Check if vercel.json exists
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json exists"
    cat vercel.json | grep -q "outputDirectory" && echo "   ✓ outputDirectory configured"
    cat vercel.json | grep -q "dist" && echo "   ✓ Points to 'dist' folder"
    cat vercel.json | grep -q "rewrites" && echo "   ✓ Rewrites configured for SPA routing"
else
    echo "❌ vercel.json not found - CREATE IT!"
fi

echo ""

# Check vite config
if [ -f "vite.config.ts" ] || [ -f "vite.config.js" ]; then
    echo "✅ vite.config found"
    if [ -f "vite.config.ts" ]; then
        grep -q "outDir.*dist" vite.config.ts && echo "   ✓ outDir set to 'dist'"
        grep -q "TanStackRouterVite" vite.config.ts && echo "   ✓ TanStack Router plugin loaded"
    fi
else
    echo "❌ vite.config not found"
fi

echo ""

# Check package.json scripts
echo "📦 Build Scripts:"
grep -q "\"build\":" package.json && echo "   ✓ build script exists"
grep -q "\"dev\":" package.json && echo "   ✓ dev script exists"
grep -q "\"preview\":" package.json && echo "   ✓ preview script exists"

echo ""

# Check for TanStack packages
echo "🔗 Dependencies Check:"
grep -q "@tanstack/react-router" package.json && echo "   ✓ @tanstack/react-router installed"
grep -q "@tanstack/react-start" package.json && echo "   ✓ @tanstack/react-start installed"
grep -q "@tanstack/router-plugin" package.json && echo "   ✓ @tanstack/router-plugin installed"

echo ""
echo "🚀 Ready to Deploy?"
echo "Run: npm run build && npm run preview"
echo "Then push to GitHub and deploy to Vercel!"
