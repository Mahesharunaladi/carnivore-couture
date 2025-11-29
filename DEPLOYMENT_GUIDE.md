# 🚀 Carnivore Couture Deployment Guide

## Overview
This guide covers deploying your full-stack e-commerce application with:
- **Frontend**: React + Vite
- **Backend**: Express.js + MongoDB
- **Features**: Authentication, Cart, Checkout, Email notifications

---

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Ensure you have these configured:

**Backend (.env)**:
```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
NODE_ENV=production
```

### 2. Build the Frontend
```bash
cd /Users/mahesharunaladi/Downloads/carnivore-couture
npm run build
```

### 3. Test Production Build Locally
```bash
npm run preview
```

---

## 🌐 Deployment Options

## Option 1: Vercel (Frontend) + Render (Backend) [RECOMMENDED]

### A. Deploy Backend to Render

1. **Create account** at [render.com](https://render.com)

2. **Create a new Web Service**:
   - Connect your GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables** in Render Dashboard:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   NODE_ENV=production
   PORT=3001
   ```

4. **Note your backend URL**: `https://your-app-name.onrender.com`

### B. Deploy Frontend to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Update API URLs** in frontend code:
   - Create `.env.production` file:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

3. **Update fetch calls** to use environment variable:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
   fetch(`${API_URL}/api/auth/login`, ...)
   ```

4. **Deploy to Vercel**:
   ```bash
   cd /Users/mahesharunaladi/Downloads/carnivore-couture
   vercel
   ```

5. **Add environment variables** in Vercel Dashboard:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

6. **Redeploy** after adding env vars:
   ```bash
   vercel --prod
   ```

---

## Option 2: Netlify (Frontend) + Railway (Backend)

### A. Deploy Backend to Railway

1. **Create account** at [railway.app](https://railway.app)

2. **Create new project** → Deploy from GitHub repo

3. **Configure**:
   - Root Directory: `/backend`
   - Start Command: `npm start`

4. **Add Environment Variables**

5. **Generate Domain** in Railway settings

### B. Deploy Frontend to Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

---

## Option 3: DigitalOcean Droplet (Full Stack)

### Complete Server Setup

1. **Create Ubuntu Droplet** on DigitalOcean

2. **SSH into server**:
   ```bash
   ssh root@your_server_ip
   ```

3. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo apt-get install -y nginx
   ```

4. **Install MongoDB**:
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

5. **Clone repository**:
   ```bash
   git clone https://github.com/Mahesharunaladi/carnivore-couture.git
   cd carnivore-couture
   ```

6. **Setup Backend**:
   ```bash
   cd backend
   npm install
   nano .env  # Add your environment variables
   ```

7. **Setup Frontend**:
   ```bash
   cd ..
   npm install
   npm run build
   ```

8. **Install PM2** (Process Manager):
   ```bash
   sudo npm install -g pm2
   cd backend
   pm2 start server.js --name "carnivore-backend"
   pm2 startup
   pm2 save
   ```

9. **Configure Nginx**:
   ```bash
   sudo nano /etc/nginx/sites-available/carnivore-couture
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your_domain.com;

       # Frontend
       location / {
           root /root/carnivore-couture/dist;
           try_files $uri $uri/ /index.html;
       }

       # Backend API
       location /api {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/carnivore-couture /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

10. **Setup SSL with Certbot**:
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d your_domain.com
    ```

---

## Option 4: Heroku (Full Stack)

### Backend Deployment

1. **Install Heroku CLI**:
   ```bash
   brew tap heroku/brew && brew install heroku
   ```

2. **Login**:
   ```bash
   heroku login
   ```

3. **Create app**:
   ```bash
   cd backend
   heroku create carnivore-couture-backend
   ```

4. **Add MongoDB**:
   ```bash
   heroku addons:create mongolab:sandbox
   ```

5. **Set environment variables**:
   ```bash
   heroku config:set JWT_SECRET=your_secret
   heroku config:set EMAIL_USER=your_email
   heroku config:set EMAIL_PASSWORD=your_password
   ```

6. **Create Procfile** in backend:
   ```
   web: node server.js
   ```

7. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

### Frontend Deployment

Use Vercel or Netlify (see Option 1)

---

## 🗄️ MongoDB Atlas Setup (Cloud Database)

1. **Create account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a cluster** (Free tier available)

3. **Create database user**:
   - Database Access → Add New User
   - Username: `carnivore_admin`
   - Password: Generate secure password

4. **Whitelist IP addresses**:
   - Network Access → Add IP Address
   - Allow access from anywhere: `0.0.0.0/0` (for testing)

5. **Get connection string**:
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your database password
   - Use this in `MONGODB_URI` environment variable

---

## 🔧 Code Updates for Production

### 1. Update API URLs in Frontend

Create `src/config.js`:
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

### 2. Update all fetch calls:

**LoginPage.jsx**:
```javascript
import { API_URL } from '../config';
// ...
const response = await fetch(`${API_URL}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
```

Do the same for:
- RegisterPage.jsx
- CheckoutPage.jsx
- Any other components with API calls

### 3. Update CORS in Backend

**backend/server.js**:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-frontend-domain.vercel.app',
  'https://your-custom-domain.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### 4. Add production build script

Update **package.json**:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && vercel --prod"
  }
}
```

---

## 🚀 Quick Deploy Commands

### For Vercel + Render (Recommended):

```bash
# 1. Build frontend
npm run build

# 2. Deploy backend to Render (via GitHub)
# - Push code to GitHub
# - Connect repository in Render dashboard

# 3. Deploy frontend
vercel --prod
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend is accessible (test: `curl https://your-backend.com/api/health`)
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] Login functionality works
- [ ] Email notifications are sent
- [ ] Products display with images
- [ ] Add to cart works
- [ ] Checkout process completes
- [ ] Orders are saved to database
- [ ] HTTPS is enabled
- [ ] Environment variables are secure
- [ ] MongoDB connection is stable
- [ ] CORS is properly configured

---

## 🔍 Troubleshooting

### Images not loading:
- Ensure images are in `public` folder
- Rebuild frontend: `npm run build`
- Check Vercel/Netlify static file settings

### API calls failing:
- Verify CORS settings
- Check environment variables
- Confirm backend URL in frontend config

### Database connection errors:
- Verify MongoDB Atlas whitelist
- Check connection string format
- Ensure database user has proper permissions

### Email not sending:
- Confirm Gmail App Password is correct
- Check EMAIL_USER and EMAIL_PASSWORD env vars
- Verify 2FA is enabled on Gmail account

---

## 📱 Domain Setup (Optional)

### 1. Buy domain (Namecheap, GoDaddy, etc.)

### 2. Configure DNS:

**For Vercel**:
- Add A record: `@` → Vercel IP
- Add CNAME: `www` → `cname.vercel-dns.com`

**For custom backend**:
- Add A record: `api` → Backend server IP

### 3. Add custom domain in hosting platform

---

## 💰 Cost Estimates

| Platform | Cost | Notes |
|----------|------|-------|
| **Vercel** | Free | Hobby plan, unlimited bandwidth |
| **Netlify** | Free | 100GB bandwidth/month |
| **Render** | Free | 750 hours/month, sleeps after inactivity |
| **Railway** | $5/month | After free trial |
| **MongoDB Atlas** | Free | 512MB storage |
| **DigitalOcean** | $6/month | Basic droplet |
| **Heroku** | $7/month | Basic dyno (was free) |

**Recommended Setup**: Vercel (Free) + Render (Free) + MongoDB Atlas (Free) = **$0/month**

---

## 🎯 Next Steps

1. Choose your deployment platform
2. Setup MongoDB Atlas
3. Configure environment variables
4. Update API URLs in code
5. Build and deploy
6. Test all functionality
7. Setup custom domain (optional)
8. Monitor and scale as needed

---

## 📞 Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com

**Your app is production-ready! 🎉**
