# 🚀 Quick Deployment Guide - Carnivore Couture

## Choose Your Deployment Method

### ⚡ FASTEST: One-Click Script (5 minutes)
```bash
cd /Users/mahesharunaladi/Downloads/carnivore-couture
./deploy.sh
```
The script will guide you through the entire process!

---

### 🌟 RECOMMENDED: Vercel + Render (Free & Easy)

#### Part 1: Deploy Backend to Render (5 minutes)

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Render.com**:
   - Sign up/login at https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `Mahesharunaladi/carnivore-couture`

3. **Configure Service**:
   - **Name**: `carnivore-couture-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   MONGODB_URI = mongodb+srv://...your_connection_string
   JWT_SECRET = your_random_secure_secret_key_here
   EMAIL_USER = mahesharunaladi@gmail.com
   EMAIL_PASSWORD = your_gmail_app_password
   NODE_ENV = production
   PORT = 3001
   ```

5. **Click "Create Web Service"**

6. **Copy your backend URL**: 
   - Will be like: `https://carnivore-couture-backend.onrender.com`
   - Keep this for frontend setup!

#### Part 2: Setup MongoDB Atlas (5 minutes)

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Create Free Cluster** (if you don't have one)
3. **Database Access** → Add User:
   - Username: `carnivore_admin`
   - Password: (generate secure password)
4. **Network Access** → Add IP:
   - IP Address: `0.0.0.0/0` (allow from anywhere)
5. **Connect** → Get connection string:
   - Example: `mongodb+srv://carnivore_admin:PASSWORD@cluster0.xxxxx.mongodb.net/carnivore-couture?retryWrites=true&w=majority`
   - Use this as `MONGODB_URI` in Render

#### Part 3: Deploy Frontend to Vercel (5 minutes)

1. **Update Frontend Config**:
   ```bash
   cd /Users/mahesharunaladi/Downloads/carnivore-couture
   echo "VITE_API_URL=https://carnivore-couture-backend.onrender.com" > .env.production
   ```
   (Replace with your actual Render backend URL)

2. **Build**:
   ```bash
   npm install
   npm run build
   ```

3. **Deploy to Vercel**:
   
   **Option A - CLI (Easiest)**:
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```
   
   **Option B - Web Dashboard**:
   - Go to https://vercel.com
   - Import Git Repository → Select `carnivore-couture`
   - Framework Preset: Vite
   - Environment Variables → Add:
     - Key: `VITE_API_URL`
     - Value: `https://carnivore-couture-backend.onrender.com`
   - Click "Deploy"

4. **Done!** Your site is live at `https://your-app.vercel.app`

---

## ✅ Post-Deployment Testing

1. **Visit your Vercel URL**
2. **Test Registration**: Create a new account
3. **Test Login**: Login with your account
4. **Test Shopping**: Add products to cart
5. **Test Checkout**: Complete an order
6. **Check Email**: Verify welcome email arrives

---

## 🔧 Update Code for Production

### Update API calls to use config:

**src/pages/LoginPage.jsx**:
```javascript
import { API_URL } from '../config';

// Change this:
const response = await fetch('http://localhost:3001/api/auth/login', {

// To this:
const response = await fetch(`${API_URL}/api/auth/login`, {
```

Do the same for:
- `src/pages/RegisterPage.jsx`
- `src/pages/CheckoutPage.jsx`

Then rebuild and redeploy:
```bash
npm run build
vercel --prod
```

---

## 💡 Troubleshooting

### Backend not starting on Render:
- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

### Frontend can't connect to backend:
- Check CORS settings in `backend/server.js`
- Verify `VITE_API_URL` in Vercel environment variables
- Check browser console for errors

### Images not showing:
- They should be! All images are in `/public` folder
- If issues, check browser console
- Verify build included public folder

### Emails not sending:
- Generate Gmail App Password: https://myaccount.google.com/apppasswords
- Update `EMAIL_PASSWORD` in Render
- Restart backend service

---

## 📊 Your Deployment Stack

```
┌─────────────────────────────────────┐
│   Vercel (Frontend - React + Vite) │
│   https://your-app.vercel.app       │
└──────────────┬──────────────────────┘
               │ API Calls
               ▼
┌─────────────────────────────────────┐
│   Render (Backend - Express.js)     │
│   https://...onrender.com            │
└──────────────┬──────────────────────┘
               │ Database
               ▼
┌─────────────────────────────────────┐
│   MongoDB Atlas (Cloud Database)     │
│   512MB Free Tier                    │
└─────────────────────────────────────┘
```

**Total Cost**: $0/month (all free tiers!)

---

## 🎯 Quick Commands Reference

```bash
# Build frontend
npm run build

# Test production build locally
npm run preview

# Deploy to Vercel
vercel --prod

# Check deployment status
vercel list

# View logs
vercel logs

# Push code changes
git add .
git commit -m "Update features"
git push origin main
```

---

## 📞 Need Help?

- **Full Guide**: See `DEPLOYMENT_GUIDE.md` for detailed instructions
- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

---

## 🎉 You're Ready to Deploy!

Total time: **~15 minutes** ⚡

Start with: `./deploy.sh` or follow the steps above!
