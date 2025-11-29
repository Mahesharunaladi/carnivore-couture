# 🎯 Deployment Checklist - Carnivore Couture

## Pre-Deployment

### 1. Code Preparation
- [x] All features working locally
- [x] Products display with images
- [x] Login/Registration works
- [x] Cart functionality works
- [x] Checkout process completes
- [ ] Update API URLs to use config file
- [ ] Test production build locally (`npm run build && npm run preview`)

### 2. Environment Setup
- [ ] MongoDB Atlas account created
- [ ] Database cluster created (free tier)
- [ ] Database user created with password
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Gmail App Password generated

### 3. Repository
- [ ] Code pushed to GitHub
- [ ] Repository is public (or has proper access)
- [ ] `.gitignore` includes `.env` files
- [ ] No sensitive data in code

---

## Backend Deployment (Render)

### Setup
- [ ] Render account created
- [ ] Web Service created
- [ ] GitHub repository connected
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`

### Environment Variables
- [ ] `MONGODB_URI` - MongoDB Atlas connection string
- [ ] `JWT_SECRET` - Random secure string (32+ characters)
- [ ] `EMAIL_USER` - Your Gmail address
- [ ] `EMAIL_PASSWORD` - Gmail App Password (16 characters)
- [ ] `NODE_ENV` - Set to `production`
- [ ] `PORT` - Set to `3001`

### Verification
- [ ] Service deployed successfully
- [ ] Logs show "Connected to MongoDB"
- [ ] Logs show "Server is running on port 3001"
- [ ] No error messages in logs
- [ ] Backend URL copied (e.g., https://...onrender.com)

---

## Frontend Deployment (Vercel)

### Code Updates
- [ ] Created `src/config.js` file
- [ ] Updated LoginPage.jsx to use API_URL
- [ ] Updated RegisterPage.jsx to use API_URL
- [ ] Updated CheckoutPage.jsx to use API_URL
- [ ] Created `.env.production` with backend URL
- [ ] Rebuilt: `npm run build`

### Vercel Setup
- [ ] Vercel account created
- [ ] Vercel CLI installed (`npm install -g vercel`)
- [ ] Logged in (`vercel login`)
- [ ] Project deployed (`vercel --prod`)

### OR Dashboard Deploy
- [ ] Repository imported to Vercel
- [ ] Framework preset: Vite
- [ ] Environment variable added: `VITE_API_URL`
- [ ] Build settings correct
- [ ] Deployed successfully

### Verification
- [ ] Frontend loads at Vercel URL
- [ ] No console errors
- [ ] Images display correctly
- [ ] Navigation works

---

## Integration Testing

### User Flow Testing
- [ ] Visit your deployed site
- [ ] Register new account
- [ ] Check email for welcome message
- [ ] Login with credentials
- [ ] Browse products
- [ ] Add products to cart
- [ ] View cart
- [ ] Proceed to checkout
- [ ] Fill shipping information
- [ ] Select payment method (test all 3)
- [ ] Complete order
- [ ] Verify success message
- [ ] Logout and login again

### API Testing
- [ ] Registration endpoint works
- [ ] Login endpoint works
- [ ] JWT tokens are issued
- [ ] Cart persists across sessions
- [ ] Orders save to database
- [ ] Email notifications send

### Cross-Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## Security Checklist

- [ ] No API keys in frontend code
- [ ] Environment variables in hosting platform only
- [ ] CORS properly configured
- [ ] JWT secret is secure
- [ ] Passwords hashed with bcrypt
- [ ] Email credentials secure
- [ ] HTTPS enabled (automatic on Vercel/Render)
- [ ] Rate limiting enabled
- [ ] Input validation working

---

## Performance Optimization

- [ ] Images optimized
- [ ] Build size acceptable (<500KB JS)
- [ ] No console errors/warnings
- [ ] Fast page load (<3 seconds)
- [ ] Smooth animations
- [ ] Responsive on mobile

---

## Documentation

- [ ] README.md updated with live URLs
- [ ] Deployment guides created
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Setup instructions clear

---

## Monitoring Setup (Optional but Recommended)

### Backend Monitoring
- [ ] Render dashboard bookmarked
- [ ] Email alerts configured
- [ ] Log retention understood

### Frontend Monitoring
- [ ] Vercel analytics enabled
- [ ] Error tracking setup
- [ ] Performance metrics reviewed

### Database Monitoring
- [ ] MongoDB Atlas alerts configured
- [ ] Storage usage checked
- [ ] Connection limit understood

---

## Post-Deployment

### Immediate Actions
- [ ] Test all features end-to-end
- [ ] Share live URL with team/users
- [ ] Monitor logs for first 24 hours
- [ ] Check email deliverability

### First Week
- [ ] Monitor server response times
- [ ] Check database growth
- [ ] Review any error logs
- [ ] Gather initial user feedback
- [ ] Fix any critical bugs

### Ongoing
- [ ] Regular backups (MongoDB Atlas automatic)
- [ ] Update dependencies monthly
- [ ] Monitor free tier limits
- [ ] Plan for scaling if needed

---

## Rollback Plan

If something goes wrong:

### Frontend Issues
```bash
# Rollback to previous deployment
vercel rollback
```

### Backend Issues
- Render keeps previous deployments
- Go to Dashboard → Deployments → Redeploy previous version

### Database Issues
- MongoDB Atlas has point-in-time restore
- Contact Atlas support if needed

---

## Support Resources

### Platform Support
- **Vercel**: https://vercel.com/support
- **Render**: https://render.com/docs
- **MongoDB Atlas**: support@mongodb.com

### Community Help
- Vercel Discord: https://vercel.com/discord
- Stack Overflow: Tag `vercel`, `render`, `mongodb`
- GitHub Issues: Create issue in your repository

---

## Cost Tracking

### Free Tier Limits

**Vercel (Frontend)**:
- ✅ Unlimited bandwidth
- ✅ 100GB-hours build time/month
- ✅ Automatic HTTPS
- ⚠️ Limit: 100 deployments/day

**Render (Backend)**:
- ✅ 750 hours/month (31 days free!)
- ✅ 512MB RAM
- ⚠️ Service sleeps after 15 min inactivity
- ⚠️ Cold starts take 30-60 seconds

**MongoDB Atlas (Database)**:
- ✅ 512MB storage
- ✅ Shared cluster
- ⚠️ Limit: 500 connections

### When to Upgrade

Upgrade if you exceed:
- 10,000+ monthly visitors
- 1GB+ database size
- Need 24/7 backend uptime
- Require faster response times

Cost: ~$20-30/month for all services

---

## 🎉 Deployment Complete!

Once all items are checked, your Carnivore Couture e-commerce site is:
- ✅ Live and accessible worldwide
- ✅ Secure with HTTPS
- ✅ Backed by cloud database
- ✅ Sending email notifications
- ✅ Processing orders
- ✅ Ready for customers!

**Share your live URL**: `https://your-app.vercel.app`

---

## Next Steps

1. **Custom Domain** (Optional): 
   - Buy domain from Namecheap/GoDaddy
   - Add to Vercel: Settings → Domains
   - Cost: ~$10-15/year

2. **Analytics** (Optional):
   - Add Google Analytics
   - Enable Vercel Analytics
   - Track user behavior

3. **Payment Gateway** (For real payments):
   - Integrate Razorpay/Stripe
   - Replace mock payment with real processing
   - Handle webhooks

4. **Marketing**:
   - SEO optimization
   - Social media sharing
   - Email marketing setup

---

**Your e-commerce platform is production-ready! 🚀**
