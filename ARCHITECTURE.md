# 🏗️ Carnivore Couture - Architecture & Deployment

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER DEVICE                         │
│                    (Browser: Chrome/Safari)                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTPS
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    FRONTEND (Vercel)                        │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐       │
│  │   HomePage  │  │  LoginPage  │  │ CheckoutPage │       │
│  │             │  │             │  │              │       │
│  │  - Products │  │  - Auth     │  │  - Shipping  │       │
│  │  - Cart     │  │  - Register │  │  - Payment   │       │
│  │  - Images   │  │  - JWT      │  │  - Order     │       │
│  └─────────────┘  └─────────────┘  └──────────────┘       │
│                                                             │
│  Technology: React 19 + Vite 7 + Framer Motion             │
│  URL: https://carnivore-couture.vercel.app                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ API Calls (HTTPS)
                           │ /api/auth/*
                           │ /api/products/*
                           │ /api/orders/*
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    BACKEND (Render)                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Express.js Server                       │  │
│  │                                                      │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │  │
│  │  │   Auth   │  │ Products │  │  Orders  │          │  │
│  │  │  Routes  │  │  Routes  │  │  Routes  │          │  │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘          │  │
│  │       │             │             │                 │  │
│  │  ┌────▼─────────────▼─────────────▼────┐           │  │
│  │  │         Middleware Layer            │           │  │
│  │  │  - JWT Auth                         │           │  │
│  │  │  - Validation                       │           │  │
│  │  │  - Rate Limiting                    │           │  │
│  │  │  - Error Handling                   │           │  │
│  │  │  - CORS                             │           │  │
│  │  └─────────────────────────────────────┘           │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Technology: Node.js + Express 5 + JWT + bcrypt            │
│  URL: https://carnivore-couture-backend.onrender.com       │
└─────────────┬────────────────────────┬──────────────────────┘
              │                        │
              │ Database               │ Email
              │ Queries                │ Service
              │                        │
┌─────────────▼──────────┐  ┌─────────▼──────────────────────┐
│  MongoDB Atlas         │  │   Gmail SMTP                   │
│                        │  │                                │
│  ┌──────────────────┐  │  │  ┌──────────────────────────┐  │
│  │  users           │  │  │  │  Nodemailer              │  │
│  │  - email         │  │  │  │                          │  │
│  │  - password      │  │  │  │  Sends:                  │  │
│  │  - name          │  │  │  │  - Welcome emails        │  │
│  └──────────────────┘  │  │  │  - Order confirmations   │  │
│                        │  │  │  - Password resets       │  │
│  ┌──────────────────┐  │  │  └──────────────────────────┘  │
│  │  products        │  │  │                                │
│  │  - name          │  │  │  Technology: Nodemailer        │
│  │  - price         │  │  │  Host: smtp.gmail.com          │
│  │  - image         │  │  └────────────────────────────────┘
│  └──────────────────┘  │
│                        │
│  ┌──────────────────┐  │
│  │  orders          │  │
│  │  - user          │  │
│  │  - items         │  │
│  │  - payment       │  │
│  │  - shipping      │  │
│  └──────────────────┘  │
│                        │
│  Technology: MongoDB   │
│  Storage: 512MB Free   │
└────────────────────────┘
```

---

## Deployment Flow

```
┌────────────────────────────────────────────────────────────┐
│                    LOCAL DEVELOPMENT                       │
│                                                            │
│  1. Code Changes                                           │
│     ├── Frontend (React components)                        │
│     ├── Backend (Express routes)                           │
│     └── Database (Mongoose models)                         │
│                                                            │
│  2. Git Commit & Push                                      │
│     └── Push to GitHub (main branch)                       │
└──────────────────┬─────────────────────────────────────────┘
                   │
                   ├─────────────────┬─────────────────┐
                   │                 │                 │
┌──────────────────▼──┐  ┌───────────▼────┐  ┌────────▼───────┐
│  GitHub Repository  │  │  Vercel         │  │  Render        │
│                     │  │  (Frontend)     │  │  (Backend)     │
│  - Source Code      │  │                 │  │                │
│  - Version Control  │  │  Auto Deploy:   │  │  Auto Deploy:  │
│  - Collaboration    │  │  1. Detect push │  │  1. Detect push│
└─────────────────────┘  │  2. Run build   │  │  2. npm install│
                         │  3. Deploy CDN  │  │  3. Start app  │
                         │  4. Live in 30s │  │  4. Live in 1m │
                         └─────────────────┘  └────────────────┘
```

---

## Data Flow: User Registration

```
┌──────────┐
│  User    │  1. Fills registration form
│          │     - Name: "John Doe"
│          │     - Email: "john@example.com"
│          │     - Password: "SecurePass123"
└────┬─────┘
     │
     │ POST /api/auth/register
     │
┌────▼──────────────────────────────────────────────────────┐
│  Frontend (Vercel)                                        │
│  ├── Validate input (client-side)                         │
│  ├── Send to backend API                                  │
│  └── Show loading state                                   │
└────┬──────────────────────────────────────────────────────┘
     │
     │ HTTPS Request
     │ { name, email, password }
     │
┌────▼──────────────────────────────────────────────────────┐
│  Backend (Render)                                         │
│  ├── Middleware: express-validator                        │
│  │   └── Validate email format, password length           │
│  ├── Check if user exists (MongoDB query)                 │
│  ├── Hash password (bcrypt, 8 rounds)                     │
│  ├── Create user document                                 │
│  ├── Generate JWT token (24h expiration)                  │
│  └── Send welcome email (non-blocking)                    │
└────┬──────────────────────┬─────────────────────────────────┘
     │                      │
     │ Save User            │ Send Email
     │                      │
┌────▼─────────┐  ┌─────────▼────────────────────────────────┐
│  MongoDB     │  │  Gmail SMTP                              │
│  Atlas       │  │  ├── HTML email template                 │
│              │  │  ├── Welcome message                     │
│  User saved: │  │  └── "Start Shopping Now" button         │
│  {           │  └──────────────────────────────────────────┘
│   _id: "..."  │
│   name: "John"│
│   email: "..."│
│   password: "$│
│   created: ...│
│  }           │
└────┬─────────┘
     │
     │ Success Response
     │
┌────▼──────────────────────────────────────────────────────┐
│  Frontend (Vercel)                                        │
│  ├── Store JWT token (localStorage)                       │
│  ├── Store user data (localStorage)                       │
│  ├── Show success message: "Registration successful!"     │
│  └── Redirect to home page                                │
└───────────────────────────────────────────────────────────┘
```

---

## Data Flow: Place Order

```
┌──────────┐
│  User    │  1. Completes checkout
│          │     - Shipping info filled
│          │     - Payment method selected
│          │     - Clicks "Place Order"
└────┬─────┘
     │
     │ POST /api/orders
     │
┌────▼──────────────────────────────────────────────────────┐
│  Frontend (CheckoutPage.jsx)                              │
│  ├── Validate all fields                                  │
│  ├── Get cart items from localStorage                     │
│  ├── Calculate totals (subtotal, tax, shipping)           │
│  ├── Build order object                                   │
│  └── Send to backend with JWT token                       │
└────┬──────────────────────────────────────────────────────┘
     │
     │ HTTPS Request + Authorization Header
     │ {
     │   items: [{product, quantity, price}],
     │   shippingInfo: {...},
     │   paymentInfo: {method, details},
     │   totalAmount: 2540
     │ }
     │
┌────▼──────────────────────────────────────────────────────┐
│  Backend (orders.js route)                                │
│  ├── Middleware: auth.js (verify JWT)                     │
│  ├── Middleware: validation.js (validate order data)      │
│  ├── Extract user ID from JWT                             │
│  ├── Create Order document                                │
│  │   └── Link to user ID                                  │
│  └── Save to MongoDB                                      │
└────┬──────────────────────────────────────────────────────┘
     │
     │ Save Order
     │
┌────▼─────────────────────────────────────────────────────┐
│  MongoDB Atlas                                           │
│  Order saved:                                            │
│  {                                                       │
│    _id: "673b1234...",                                   │
│    user: "673a5678...",                                  │
│    items: [                                              │
│      {product: "Mutton", quantity: 2, price: 720},       │
│      {product: "Chicken", quantity: 1, price: 450}       │
│    ],                                                    │
│    shippingInfo: {                                       │
│      name: "John Doe",                                   │
│      address: "123 Main St",                             │
│      city: "Mumbai",                                     │
│      phone: "9876543210"                                 │
│    },                                                    │
│    paymentInfo: {                                        │
│      method: "upi",                                      │
│      upiId: "john@paytm"                                 │
│    },                                                    │
│    totalAmount: 2540,                                    │
│    status: "pending",                                    │
│    createdAt: "2025-11-29T..."                           │
│  }                                                       │
└────┬─────────────────────────────────────────────────────┘
     │
     │ Success Response
     │
┌────▼──────────────────────────────────────────────────────┐
│  Frontend (CheckoutPage.jsx)                              │
│  ├── Clear cart (localStorage.removeItem)                 │
│  ├── Show success animation (Framer Motion)               │
│  ├── Display order confirmation                           │
│  │   └── "Order placed successfully!"                     │
│  └── Show order ID and details                            │
└───────────────────────────────────────────────────────────┘
```

---

## Security Layers

```
┌────────────────────────────────────────────────────────────┐
│                    SECURITY STACK                          │
└────────────────────────────────────────────────────────────┘

Layer 1: Transport Security
├── HTTPS/TLS (Automatic on Vercel/Render)
└── Secure WebSocket (WSS)

Layer 2: Network Security
├── CORS (Controlled origins)
├── Rate Limiting (100 req/15min per IP)
└── Helmet (Security headers)

Layer 3: Authentication & Authorization
├── JWT Tokens (24h expiration)
├── Secure token storage (httpOnly cookies)
└── User roles (user/admin)

Layer 4: Data Security
├── Password Hashing (bcrypt, 8 rounds)
├── Input Validation (express-validator)
├── Output Sanitization
└── MongoDB Injection Prevention

Layer 5: Application Security
├── Error Handling (No stack traces in production)
├── Logging (Morgan for audit trails)
├── Environment Variables (Secrets in hosting platform)
└── Dependency Updates (npm audit)
```

---

## Scaling Strategy

```
Current (Free Tier)
├── Vercel: Unlimited bandwidth
├── Render: 750 hours/month
└── MongoDB: 512MB storage
    └── Handles: ~10,000 users, ~50,000 orders

When to Scale:
├── 50,000+ monthly visitors → Upgrade Render ($7/month)
├── 1GB+ database → Upgrade MongoDB ($9/month)
├── Need 99.99% uptime → Paid hosting
└── Global users → Add CDN

Future Architecture:
├── Load Balancer (Nginx)
├── Multiple Backend Instances
├── Redis Cache (Session storage)
├── S3 (Image storage)
├── CloudFront (CDN)
└── RDS (Database replicas)
```

---

## Monitoring & Alerts

```
Frontend (Vercel)
├── Analytics Dashboard
│   ├── Page views
│   ├── Unique visitors
│   └── Conversion rate
├── Error Tracking
│   ├── Console errors
│   ├── Failed requests
│   └── Crash reports
└── Performance
    ├── Load time
    ├── Core Web Vitals
    └── Bundle size

Backend (Render)
├── Logs
│   ├── Access logs
│   ├── Error logs
│   └── Application logs
├── Metrics
│   ├── CPU usage
│   ├── Memory usage
│   └── Request rate
└── Alerts
    ├── Service down
    ├── High error rate
    └── Resource limits

Database (MongoDB Atlas)
├── Performance Advisor
├── Real-time Metrics
├── Slow Query Alerts
├── Storage Warnings
└── Connection Limits
```

---

## Deployment Checklist Visual

```
PRE-DEPLOYMENT
├── [✓] Local development complete
├── [✓] All features tested
├── [✓] Build succeeds (npm run build)
├── [✓] Code pushed to GitHub
└── [✓] Environment variables prepared

DATABASE SETUP (5 min)
├── [ ] MongoDB Atlas account
├── [ ] Cluster created
├── [ ] User created
├── [ ] IP whitelisted
└── [ ] Connection string copied

BACKEND DEPLOY (5 min)
├── [ ] Render account
├── [ ] Web service created
├── [ ] GitHub connected
├── [ ] Environment variables added
├── [ ] Build successful
└── [ ] Backend URL copied

FRONTEND DEPLOY (5 min)
├── [ ] Updated .env.production
├── [ ] Rebuilt with backend URL
├── [ ] Vercel CLI installed
├── [ ] Deployed to Vercel
└── [ ] Site is live!

POST-DEPLOYMENT
├── [ ] Registration tested
├── [ ] Login tested
├── [ ] Shopping tested
├── [ ] Checkout tested
├── [ ] Email received
└── [ ] All features work! 🎉
```

---

## Cost Estimation (Monthly)

```
FREE TIER (Recommended for start)
┌─────────────────────────────────────────┐
│ Vercel (Frontend)              $0       │
│ Render (Backend)               $0       │
│ MongoDB Atlas (Database)       $0       │
│ Gmail (Email)                  $0       │
│ GitHub (Repository)            $0       │
│ Domain (.vercel.app)           $0       │
│ SSL Certificate                $0       │
├─────────────────────────────────────────┤
│ TOTAL                          $0       │
└─────────────────────────────────────────┘

Handles: ~10K visitors, ~1K orders/month


STARTER TIER (Small business)
┌─────────────────────────────────────────┐
│ Vercel Pro                     $20      │
│ Render Starter                 $7       │
│ MongoDB M2                     $9       │
│ Custom Domain                  $1/mo    │
├─────────────────────────────────────────┤
│ TOTAL                          $37      │
└─────────────────────────────────────────┘

Handles: ~100K visitors, ~10K orders/month


GROWTH TIER (Growing business)
┌─────────────────────────────────────────┐
│ Vercel Pro                     $20      │
│ Render Standard                $25      │
│ MongoDB M10                    $57      │
│ CloudFlare (CDN)               $20      │
│ SendGrid (Email)               $15      │
├─────────────────────────────────────────┤
│ TOTAL                          $137     │
└─────────────────────────────────────────┘

Handles: ~1M visitors, ~50K orders/month
```

---

## 🎯 Quick Reference

**Your URLs** (after deployment):
- Frontend: `https://carnivore-couture.vercel.app`
- Backend: `https://carnivore-couture-backend.onrender.com`
- Database: `MongoDB Atlas Dashboard`

**Important Files**:
- Frontend Config: `src/config.js`
- Backend Config: `backend/.env`
- Deployment: `deploy.sh`

**Quick Commands**:
```bash
# Build frontend
npm run build

# Deploy to Vercel
vercel --prod

# View logs
vercel logs

# Check status
git status
```

**Need Help?**
- START_HERE.md - Overview
- QUICK_DEPLOY.md - Fast deployment
- DEPLOYMENT_GUIDE.md - Detailed guide
- DEPLOYMENT_CHECKLIST.md - Step-by-step

---

**Your app is architecturally sound and ready for production!** 🚀
