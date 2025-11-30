# 🚀 Quick Reference - Carnivore Couture Deployment

## 📱 Instant Commands

```bash
# Start deployment
./deploy.sh

# Build frontend
npm run build

# Test locally
npm run preview

# Deploy to Vercel
vercel --prod

# Check status
git status
```

## 🌐 Platform URLs

| Platform | URL | Purpose |
|----------|-----|---------|
| **Vercel** | https://vercel.com | Frontend hosting |
| **Render** | https://render.com | Backend hosting |
| **MongoDB Atlas** | https://mongodb.com/cloud/atlas | Database |
| **GitHub** | https://github.com/Mahesharunaladi/carnivore-couture | Code repository |

## 📂 Key Files

| File | Description |
|------|-------------|
| `START_HERE.md` | **👈 Begin here!** Complete overview |
| `QUICK_DEPLOY.md` | 15-minute deployment guide |
| `deploy.sh` | Automated deployment script |
| `src/config.js` | API URL configuration |
| `.env.production` | Production environment variables |
| `vercel.json` | Vercel deployment config |

## 🔑 Environment Variables

### Backend (.env)
```bash
PORT=3001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/carnivore-couture
JWT_SECRET=your_32_character_random_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_gmail_app_password
NODE_ENV=production
```

### Frontend (.env.production)
```bash
VITE_API_URL=https://your-backend.onrender.com
```

## ⚡ Quick Deployment (15 min)

### Step 1: MongoDB Atlas (5 min)
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Add database user
4. Whitelist all IPs: `0.0.0.0/0`
5. Get connection string

### Step 2: Render Backend (5 min)
1. Go to https://render.com
2. New Web Service → Connect GitHub
3. Settings:
   - Root: `backend`
   - Build: `npm install`
   - Start: `npm start`
4. Add environment variables
5. Deploy

### Step 3: Vercel Frontend (5 min)
1. Update `.env.production` with backend URL
2. Run: `npm run build`
3. Run: `npm install -g vercel` (if needed)
4. Run: `vercel --prod`
5. Done!

## 💰 Cost: $0/month

- Vercel: Free (unlimited bandwidth)
- Render: Free (750 hours/month)
- MongoDB: Free (512MB storage)
- Gmail: Free
- SSL: Free (automatic)

## 🆘 Common Issues

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Backend won't start
- Check logs in Render dashboard
- Verify all environment variables
- Test MongoDB connection string

### Frontend can't reach backend
- Check CORS in `backend/server.js`
- Verify `VITE_API_URL` in Vercel
- Check browser console

### Emails not sending
- Generate Gmail App Password: https://myaccount.google.com/apppasswords
- Update `EMAIL_PASSWORD` in Render
- Restart backend service

## 📊 What's Included

✅ User authentication (JWT + bcrypt)
✅ Product catalog (8 items with images)
✅ Shopping cart (localStorage)
✅ Checkout (2-step, 3 payment methods)
✅ Email notifications (welcome emails)
✅ Order management (MongoDB)
✅ Responsive design (mobile-friendly)
✅ Security (rate limiting, CORS, validation)

## 📞 Support

- **Documentation**: See all .md files in project root
- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Docs**: https://docs.atlas.mongodb.com

## 🎯 Next Steps

1. **Deploy**: Choose your method (automated or manual)
2. **Test**: Register account, place order
3. **Share**: Get your live URL
4. **Monitor**: Check logs and metrics
5. **Scale**: Upgrade when needed

## 🔗 Quick Links

- **START_HERE.md** - Complete overview and guide
- **QUICK_DEPLOY.md** - Fast deployment tutorial
- **DEPLOYMENT_GUIDE.md** - Detailed instructions
- **ARCHITECTURE.md** - System diagrams
- **DEPLOYMENT_CHECKLIST.md** - Step-by-step list

---

**Ready to deploy? Run:** `./deploy.sh` **or open** `START_HERE.md`
