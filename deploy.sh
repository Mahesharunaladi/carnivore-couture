#!/bin/bash

# Carnivore Couture Deployment Script
# This script helps you deploy to Vercel (Frontend) + Render (Backend)

echo "🚀 Carnivore Couture Deployment Helper"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from the project root."
    exit 1
fi

echo "📦 Step 1: Installing dependencies..."
npm install
cd backend && npm install && cd ..

echo ""
echo "🏗️  Step 2: Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

echo ""
echo "🧪 Step 3: Testing production build locally..."
echo "Starting preview server on http://localhost:4173"
echo "Press Ctrl+C when you're done testing"
echo ""
npm run preview &
PREVIEW_PID=$!

# Wait for user to test
read -p "Press Enter when you're done testing (or Ctrl+C to abort)..."
kill $PREVIEW_PID 2>/dev/null

echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "BACKEND DEPLOYMENT (Render):"
echo "1. Go to https://render.com"
echo "2. Sign in with GitHub"
echo "3. Create New → Web Service"
echo "4. Connect your repository: Mahesharunaladi/carnivore-couture"
echo "5. Settings:"
echo "   - Root Directory: backend"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo "6. Add Environment Variables:"
echo "   MONGODB_URI=<your_mongodb_atlas_connection>"
echo "   JWT_SECRET=<generate_random_secure_key>"
echo "   EMAIL_USER=<your_gmail>"
echo "   EMAIL_PASSWORD=<your_gmail_app_password>"
echo "   NODE_ENV=production"
echo "7. Click 'Create Web Service'"
echo "8. Copy your backend URL (e.g., https://carnivore-couture-backend.onrender.com)"
echo ""

read -p "Have you deployed the backend? Enter your backend URL: " BACKEND_URL

if [ -z "$BACKEND_URL" ]; then
    echo "⚠️  No backend URL provided. You can deploy frontend later."
    echo "Remember to update .env.production with your backend URL"
    exit 0
fi

echo ""
echo "📝 Updating frontend configuration..."
echo "VITE_API_URL=$BACKEND_URL" > .env.production

echo ""
echo "🏗️  Rebuilding frontend with backend URL..."
npm run build

echo ""
echo "FRONTEND DEPLOYMENT (Vercel):"
echo "=============================="
echo ""
echo "Option A: Using Vercel CLI (Recommended)"
echo "-----------------------------------------"
echo "1. Install: npm install -g vercel"
echo "2. Deploy: vercel --prod"
echo "3. Follow the prompts"
echo ""
echo "Option B: Using Vercel Dashboard"
echo "--------------------------------"
echo "1. Go to https://vercel.com"
echo "2. Import your GitHub repository"
echo "3. Add environment variable: VITE_API_URL=$BACKEND_URL"
echo "4. Deploy!"
echo ""

read -p "Deploy to Vercel now using CLI? (y/n): " DEPLOY_NOW

if [ "$DEPLOY_NOW" = "y" ] || [ "$DEPLOY_NOW" = "Y" ]; then
    if command -v vercel &> /dev/null; then
        echo "🚀 Deploying to Vercel..."
        vercel --prod
    else
        echo "⚠️  Vercel CLI not found. Installing..."
        npm install -g vercel
        echo "✅ Vercel CLI installed. Run: vercel --prod"
    fi
else
    echo "📦 Build files are ready in the 'dist' folder"
    echo "You can deploy manually when ready!"
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
