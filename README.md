# 🥩 Carnivore Couture

## Premium Meat E-commerce Platform

Carnivore Couture is a full-stack e-commerce platform specializing in premium meat products. Built with modern technologies and best practices, it offers secure authentication, email verification, order management, and seamless shopping experience.

![Carnivore Couture](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Latest-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen)

---

## ✨ Key Features

- 🔐 **Secure JWT Authentication** with email verification
- � **Email Verification System** with 24-hour token expiry
- 💳 **Multiple Payment Methods** (Card, UPI, Wallets)
- 📱 **Fully Responsive** design for all devices
- ✉️ **Email Notifications** (Welcome, Verification, Order Confirmation)
- 🔒 **Industry-Standard Security** practices
- � **Real-time Cart Management**
- 💾 **Smart Data Persistence**

---

## 🚀 Core Features

### 🔐 Authentication & Security
- User registration with email verification
- Secure login with JWT tokens
- Password hashing with bcryptjs (8 rounds)
- Email verification required before login
- Resend verification email option
- 24-hour verification token expiry
- Protected API routes

### 📧 Email System
- **Verification Emails**: Professional branded templates with verification links
- **Welcome Emails**: Sent after email verification
- **Order Confirmations**: Automated order receipt emails
- Gmail SMTP integration
- HTML email templates with responsive design

### � E-commerce Features
- Product catalog management
- Shopping cart functionality
- Order processing and tracking
- Multiple payment method support
- Tax and shipping calculations
- Order history for users

### ⚙️ Backend Features
- **RESTful API Architecture**
  - Clean route organization
  - Middleware chain for validation
  - Error handling middleware
  - Request logging with Morgan
  
- **Security Features**
  - JWT authentication
  - Bcrypt password hashing
  - Rate limiting on API endpoints
  - CORS protection
  - Helmet.js for HTTP headers
  - Input validation & sanitization
  - Environment variable protection

- **Database Management**
  - MongoDB with Mongoose ODM
  - Schema validation
  - Relationship modeling
  - Efficient queries

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest | Runtime environment |
| **Express.js** | 5 | Web framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | 8 | MongoDB ODM |
| **JWT** | 9 | Token authentication |
| **bcryptjs** | 3 | Password hashing |
| **Nodemailer** | 7 | Email service |
| **Express Validator** | 7 | Input validation |
| **Helmet** | 8 | Security headers |
| **Morgan** | 1 | HTTP request logger |
| **CORS** | 2 | Cross-origin resource sharing |
| **dotenv** | 17 | Environment variables |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19 | UI Library |
| **Vite** | 7 | Build tool & dev server |
| **React Router DOM** | 6 | Client-side routing |
| **Framer Motion** | Latest | Animations |

---

## 📁 Project Structure

```
carnivore-couture/
├── backend/
│   ├── models/               # Mongoose models
│   │   ├── User.js          # User schema with email verification
│   │   ├── Product.js       # Product schema
│   │   ├── Order.js         # Order schema
│   │   └── Cart.js          # Cart schema
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication & verification routes
│   │   ├── products.js      # Product routes
│   │   ├── orders.js        # Order routes
│   │   └── cart.js          # Cart routes
│   ├── middleware/          # Custom middleware
│   │   ├── auth.js          # JWT verification
│   │   ├── validation.js    # Input validation
│   │   ├── rateLimiter.js   # Rate limiting
│   │   └── errorHandler.js  # Error handling
│   ├── utils/               # Backend utilities
│   │   └── emailService.js  # Email functionality
│   ├── server.js            # Express server
│   └── .env                 # Environment variables
├── src/                     # Frontend source
├── public/                  # Static assets
└── README.md

```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- ✅ **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- ✅ **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- ✅ **npm** or **yarn** package manager
- ✅ **Git** - [Download](https://git-scm.com/)

---

### 📦 Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Mahesharunaladi/carnivore-couture.git
cd carnivore-couture
```

#### 2️⃣ Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

#### 3️⃣ Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=3001

# Database
MONGODB_URI=mongodb://localhost:27017/carnivore-couture

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL (for email verification links)
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

**📧 Gmail Setup for Email Notifications:**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Step Verification
3. Generate an [App Password](https://myaccount.google.com/apppasswords)
4. Use the generated password in `EMAIL_PASSWORD`

#### 4️⃣ Start MongoDB

```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Windows
mongod

# Linux
sudo systemctl start mongod
```

#### 5️⃣ Start the Servers

```bash
# Terminal 1 - Start Backend (from backend directory)
cd backend
npm start

# Terminal 2 - Start Frontend (from root directory)
npm run dev
```

You should see:
```
Backend: Server is running on port 3001
Backend: Connected to MongoDB
Frontend: Local: http://localhost:5173
```

#### 6️⃣ Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login user | ❌ |
| `GET` | `/api/auth/verify-email/:token` | Verify email address | ❌ |
| `POST` | `/api/auth/resend-verification` | Resend verification email | ❌ |
| `GET` | `/api/auth/me` | Get user profile | ✅ |
| `PATCH` | `/api/auth/me` | Update user profile | ✅ |

**Example Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
```

**Example Register Response:**
```json
{
  "message": "Registration successful. Please check your email to verify your account.",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "isEmailVerified": false
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "requiresVerification": true
}
```

**Example Login Response (Unverified):**
```json
{
  "message": "Please verify your email before logging in. Check your inbox for the verification link.",
  "requiresVerification": true,
  "email": "john@example.com"
}
```

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/orders` | Create new order | ✅ |
| `GET` | `/api/orders/:id` | Get order by ID | ✅ |
| `GET` | `/api/orders/user/:userId` | Get user's orders | ✅ |

---

## 🔒 Security Features

| Feature | Implementation | Description |
|---------|---------------|-------------|
| **Authentication** | JWT | 24-hour token expiration |
| **Email Verification** | Crypto tokens | 24-hour verification token expiry |
| **Password Security** | bcryptjs | 8 rounds of hashing |
| **Rate Limiting** | express-rate-limit | 100 requests/15 minutes |
| **Input Validation** | express-validator | Sanitization & validation |
| **CORS** | cors middleware | Controlled origins |
| **Security Headers** | Helmet.js | XSS, clickjacking protection |
| **Error Handling** | Custom middleware | No sensitive data leakage |
| **Request Logging** | Morgan | HTTP request logging |

---

## 📧 Email Verification Flow

1. **User Registers** → Account created with `isEmailVerified: false`
2. **Verification Email Sent** → Contains unique token and verification link
3. **User Clicks Link** → Opens verification page
4. **Token Validated** → Backend verifies token and expiry
5. **Email Verified** → Account activated, welcome email sent
6. **User Can Login** → Access granted to platform

**Security Features:**
- Cryptographically secure tokens (32 bytes)
- 24-hour token expiry
- One-time use tokens (deleted after verification)
- Login blocked until email verified
- Resend verification option available

---

## 📚 Additional Documentation

| Document | Description |
|----------|-------------|
| **[EMAIL_VERIFICATION_GUIDE.md](EMAIL_VERIFICATION_GUIDE.md)** | Complete email verification implementation |
| **[EMAIL_VERIFICATION_QUICK_REFERENCE.md](EMAIL_VERIFICATION_QUICK_REFERENCE.md)** | Quick commands and troubleshooting |
| **[EMAIL_VERIFICATION_SUMMARY.md](EMAIL_VERIFICATION_SUMMARY.md)** | Implementation summary and checklist |
| **[EMAIL_VERIFICATION_FLOW_DIAGRAM.md](EMAIL_VERIFICATION_FLOW_DIAGRAM.md)** | Visual flow diagram |
| **[AUTHENTICATION_README.md](AUTHENTICATION_README.md)** | JWT authentication details |
| **[PAYMENT_METHODS_README.md](PAYMENT_METHODS_README.md)** | Payment integration guide |
| **[EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md)** | Email configuration |
| **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** | Deployment instructions |

---

## 🐛 Troubleshooting

### Common Issues:

**❌ MongoDB Connection Failed**
```bash
# Check if MongoDB is running
brew services list  # macOS
sudo systemctl status mongod  # Linux

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
```

**❌ Port Already in Use**
```bash
# Find process using port 3001
lsof -ti:3001

# Kill the process
kill -9 <PID>
```

**❌ Backend Not Responding**
```bash
# Check server logs
cd backend
npm start

# Should see:
# Server is running on port 3001
# Connected to MongoDB
```

**❌ Email Not Sending**
- Verify Gmail app password is correct
- Check 2-Step Verification is enabled
- Ensure `EMAIL_USER` and `EMAIL_PASSWORD` are set in `.env`
- Check backend console for email sending logs

**❌ Email Verification Not Working**
- Check verification link format: `http://localhost:5173/verify-email?token=xxx`
- Verify token hasn't expired (24 hours)
- Check backend logs for verification errors
- Use resend verification option if token expired

**❌ Can't Login After Registration**
- Users must verify email before login
- Check inbox for verification email
- Click "Resend Verification Email" if needed
- For testing, manually verify in MongoDB:
  ```bash
  mongosh
  use carnivore-couture
  db.users.updateOne(
    { email: "test@example.com" },
    { $set: { isEmailVerified: true } }
  )
  ```

---

## 🎯 Roadmap & Future Enhancements

- [ ] **Payment Gateway Integration**
  - Razorpay integration
  - Stripe integration
  - Payment verification

- [ ] **Admin Dashboard**
  - Product management
  - Order management
  - User analytics
  - Sales reports

- [ ] **Advanced Features**
  - Product reviews & ratings
  - Wishlist functionality
  - Order tracking
  - Push notifications
  - Password reset via email
  - Two-factor authentication

- [ ] **Testing**
  - Unit tests with Jest
  - Integration tests
  - E2E tests with Cypress

---

## � Deployment

### Recommended: Vercel + Render (Free Tier)

**Backend (Render)** - 750 hours/month free
- Automatic deployments from Git
- Free SSL
- Environment variables
- Health checks

**Database (MongoDB Atlas)** - 512MB free
- Managed MongoDB
- Automatic backups
- Global clusters

**Frontend (Vercel)** - Free Forever
- Automatic deployments
- Global CDN
- SSL certificates included

### Deployment Notes:
- Update `FRONTEND_URL` in backend `.env` to production domain
- Use professional email service (SendGrid/AWS SES) for production
- Set all environment variables in hosting platform
- Test email verification thoroughly before launch

### Detailed Deployment Guides:
- 📖 **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete step-by-step guide
- ⚡ **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - 15-minute quick deploy

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines:
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mahesh Arunaladi**

- 🐱 GitHub: [@Mahesharunaladi](https://github.com/Mahesharunaladi)
- 📧 Email: mahesharunaladi@gmail.com

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **MongoDB** - For the excellent database
- **Express.js** - For the powerful web framework
- **Open Source Community** - For inspiration and tools

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on [GitHub](https://github.com/Mahesharunaladi/carnivore-couture)!

---

<div align="center">

**Made with ❤️ and ☕ by Mahesh Arunaladi**

⭐ **Star this repo if you found it helpful!** ⭐

</div>
    "phone": "1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "paymentInfo": {
    "method": "card"
  },
  "subtotal": 7500,
  "tax": 375,
  "shipping": 0,
  "total": 7875
}
```

---

## 🔒 Security Features

| Feature | Implementation | Description |
|---------|---------------|-------------|
| **Authentication** | JWT | 24-hour token expiration |
| **Password Security** | bcryptjs | 8 rounds of hashing |
| **Rate Limiting** | express-rate-limit | 100 requests/15 minutes |
| **Input Validation** | express-validator | Sanitization & validation |
| **CORS** | cors middleware | Controlled origins |
| **Security Headers** | Helmet.js | XSS, clickjacking protection |
| **Error Handling** | Custom middleware | No sensitive data leakage |
| **Request Logging** | Morgan | HTTP request logging |

---

## 🚀 Deployment

Your application is **production-ready** and can be deployed for **FREE** using various platforms!

### Recommended: Vercel + Render (Free Tier)

**Frontend (Vercel)** - Free Forever
- Automatic deployments from Git
- Global CDN
- SSL certificates included
- Custom domains supported

**Backend (Render)** - 750 hours/month free
- Automatic deployments
- Free SSL
- Environment variables
- Health checks

**Database (MongoDB Atlas)** - 512MB free
- Managed MongoDB
- Automatic backups
- Global clusters

### Quick Deployment Steps:

1. **Deploy Backend to Render**
   ```bash
   # Push code to GitHub
   git push origin main
   
   # Connect Render to your repo
   # Set environment variables in Render dashboard
   ```

2. **Setup MongoDB Atlas**
   - Create free cluster
   - Get connection string
   - Whitelist all IPs (0.0.0.0/0)

3. **Deploy Frontend to Vercel**
   ```bash
   npm run build
   vercel --prod
   ```

### Detailed Deployment Guides:

- 📖 **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete step-by-step guide
- ⚡ **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - 15-minute quick deploy
- � **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Deployment checklist
- 🚀 **[DEPLOY_NOW.md](DEPLOY_NOW.md)** - Visual quick start

---

## 📚 Additional Documentation

| Document | Description |
|----------|-------------|
| **[AUTHENTICATION_README.md](AUTHENTICATION_README.md)** | JWT authentication details |
| **[PAYMENT_METHODS_README.md](PAYMENT_METHODS_README.md)** | Payment integration guide |
| **[EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md)** | Email configuration |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | System architecture overview |
| **[CHECKOUT_README.md](CHECKOUT_README.md)** | Checkout process details |

---

## 🐛 Troubleshooting

### Common Issues:

**❌ MongoDB Connection Failed**
```bash
# Check if MongoDB is running
brew services list  # macOS
sudo systemctl status mongod  # Linux

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
```

**❌ Port Already in Use**
```bash
# Find process using port 3001
lsof -ti:3001

# Kill the process
kill -9 <PID>
```

**❌ Backend Not Responding**
```bash
# Check server logs
cd backend
node server.js

# Should see:
# Server is running on port 3001
# Connected to MongoDB
```

**❌ Cart Not Working**
- Clear browser localStorage
- Check browser console for errors
- Verify backend is running on port 3001

**❌ Email Not Sending**
- Verify Gmail app password is correct
- Check 2-Step Verification is enabled
- Allow less secure apps in Gmail settings

---

## 🎯 Roadmap & Future Enhancements

- [ ] **Payment Gateway Integration**
  - Razorpay integration
  - Stripe integration
  - Payment verification

- [ ] **Admin Dashboard**
  - Product management
  - Order management
  - User analytics
  - Sales reports

- [ ] **Advanced Features**
  - Product reviews & ratings
  - Wishlist functionality
  - Order tracking
  - Push notifications
  - Social media login

- [ ] **Performance**
  - Image optimization
  - Lazy loading
  - Code splitting
  - PWA support

- [ ] **Testing**
  - Unit tests with Jest
  - Integration tests
  - E2E tests with Cypress

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines:
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You are free to:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Use privately

---

## 👨‍💻 Author

**Mahesh Arunaladi**

- 🐱 GitHub: [@Mahesharunaladi](https://github.com/Mahesharunaladi)
- 📧 Email: mahesharunaladi@gmail.com
- 💼 LinkedIn: [Connect with me](https://www.linkedin.com/in/mahesharunaladi)

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **MongoDB** - For the excellent database
- **Vercel** - For easy deployment
- **Framer Motion** - For beautiful animations
- **Open Source Community** - For inspiration and tools

---

## 📊 Project Stats

- **Total Components**: 15+
- **API Endpoints**: 10+
- **Database Models**: 4
- **Lines of Code**: 3000+
- **Development Time**: 2 weeks
- **Last Updated**: December 2025

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on [GitHub](https://github.com/Mahesharunaladi/carnivore-couture)!

---

## 📞 Support

Having issues? Here's how to get help:

1. **Check Documentation** - Review the guides in this repo
2. **Search Issues** - Someone may have had the same problem
3. **Open an Issue** - Describe your problem clearly
4. **Contact** - Reach out via email

---

<div align="center">

**Made with ❤️ and ☕ by Mahesh Arunaladi**

⭐ **Star this repo if you found it helpful!** ⭐

</div>
