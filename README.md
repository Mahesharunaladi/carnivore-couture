# 🥩 Carnivore Couture

## Premium Meat E-commerce Platform

Carnivore Couture is a sophisticated, full-stack e-commerce platform specializing in premium meat products. Built with modern technologies and best practices, it offers a seamless shopping experience with stunning animations, secure payments, and real-time cart management.

**🌐 Live Demo**: [Deploy your own in 15 minutes!](#-quick-deployment)

![Carnivore Couture](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Latest-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen)

---

## ✨ Key Highlights

- 🎨 **Modern Dark Theme UI** with smooth animations
- 🛒 **Real-time Cart Management** with Context API
- 🔐 **Secure JWT Authentication** 
- 💳 **Multiple Payment Methods** (Card, UPI, Wallets)
- 📱 **Fully Responsive** design for all devices
- 🎭 **Framer Motion Animations** throughout
- 💾 **Smart Cart Persistence** with localStorage
- ✉️ **Email Notifications** on registration
- 🔒 **Industry-Standard Security** practices

---

## 🚀 Features

### 🎨 Frontend Features
- **Stunning Product Cards** 
  - Hover-activated "Add to Cart" button with overlay
  - Animated badges (PREMIUM, BESTSELLER, POPULAR, FRESH)
  - Dynamic color gradients for each badge type
  - Success notification on cart addition
  - Image zoom on hover
  
- **Smart Shopping Cart**
  - Real-time cart updates using React Context
  - Cart badge with item count
  - Quantity controls (+/-) in cart
  - Remove items functionality
  - Cart persistence across sessions
  - Automatic price calculations

- **User Authentication**
  - Secure login and registration
  - JWT token-based authentication
  - Remember me functionality
  - Protected routes
  - User profile integration

- **Advanced Checkout Process**
  - 2-Step checkout flow
  - Shipping information form
  - Multiple payment options:
    - 💳 Credit/Debit Cards
    - 📱 UPI (Google Pay, PhonePe, Paytm)
    - 💰 Digital Wallets
  - Order summary with tax & shipping
  - Order confirmation with success animation

- **Smooth Animations**
  - Page transitions with Framer Motion
  - Product card animations
  - Cart slide-in/out animations
  - Button hover effects
  - Loading states

### ⚙️ Backend Features
- **RESTful API Architecture**
  - Clean route organization
  - Middleware chain for validation
  - Error handling middleware
  - Request logging with Morgan
  
- **Security Features**
  - JWT authentication
  - Bcrypt password hashing (8 rounds)
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

- **Email Service**
  - Nodemailer integration
  - Welcome emails on registration
  - Order confirmation emails
  - Gmail SMTP support

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19 | UI Library with concurrent features |
| **Vite** | 7 | Build tool & dev server |
| **React Router DOM** | 6 | Client-side routing |
| **Framer Motion** | Latest | Advanced animations |
| **React Icons** | Latest | Icon library |
| **CSS3** | - | Modern styling |

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

---

## 📁 Project Structure

```
carnivore-couture/
├── public/                      # Static assets
│   ├── product-*.jpg           # Product images
│   └── hero-meat (1).jpg       # Hero image
├── src/
│   ├── components/             # React components
│   │   ├── ProductCard.jsx    # Product card with animations
│   │   ├── AuthPage.jsx       # Authentication component
│   │   ├── Logo.jsx           # Logo component
│   │   └── Loading.jsx        # Loading states
│   ├── context/               # React Context
│   │   ├── CartContext.jsx    # Cart state management
│   │   └── AuthContext.jsx    # Auth state management
│   ├── pages/                 # Page components
│   │   ├── HomePage.jsx       # Main landing page
│   │   ├── CheckoutPage.jsx   # Checkout flow
│   │   ├── LoginPage.jsx      # Login page
│   │   └── RegisterPage.jsx   # Registration page
│   ├── utils/                 # Utilities
│   │   └── api.js            # API client
│   ├── App.jsx               # Main app component
│   ├── App.css               # Global styles
│   └── main.jsx              # Entry point
├── backend/
│   ├── models/               # Mongoose models
│   │   ├── User.js          # User schema
│   │   ├── Product.js       # Product schema
│   │   ├── Order.js         # Order schema
│   │   └── Cart.js          # Cart schema
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication routes
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

#### 2️⃣ Frontend Setup
```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev
```

#### 3️⃣ Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

#### 4️⃣ Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=3001

# Database
MONGODB_URI=mongodb://localhost:27017/carnivore-couture

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

**📧 Gmail Setup for Email Notifications:**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Step Verification
3. Generate an [App Password](https://myaccount.google.com/apppasswords)
4. Use the generated password in `EMAIL_PASSWORD`

#### 5️⃣ Start MongoDB

```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Windows
mongod

# Linux
sudo systemctl start mongod
```

#### 6️⃣ Start the Backend Server

```bash
# From the backend directory
node server.js
```

You should see:
```
Server is running on port 3001
Connected to MongoDB
```

#### 7️⃣ Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

---

## 🎯 Usage Guide

### Creating an Account

1. Click **"Login"** in the header
2. Select **"Create Account"**
3. Fill in your details:
   - Full Name
   - Email Address
   - Password (min 6 characters)
4. Click **"Create Account"**
5. Check your email for welcome message ✉️

### Shopping Experience

1. **Browse Products**: View 8 premium meat products on homepage
2. **Hover Over Product**: See "Add to Cart" button appear
3. **Add to Cart**: Click button → See success notification "✓ Added!"
4. **View Cart**: Click cart icon in header → Cart sidebar opens
5. **Manage Cart**: 
   - Adjust quantities with +/- buttons
   - Remove items with 🗑️ button
   - See real-time total updates

### Checkout Process

1. **Click "Proceed to Checkout"** from cart
2. **Step 1 - Shipping Information**:
   - Enter delivery address
   - Contact information
   - Click "Continue to Payment"
3. **Step 2 - Payment**:
   - Choose payment method:
     - 💳 Credit/Debit Card
     - 📱 UPI (Google Pay, PhonePe, Paytm)
     - 💰 Digital Wallet
   - Enter payment details
   - Review order summary
4. **Place Order**
5. **Success!** - Order confirmation displayed

---

## 🎨 Features Walkthrough

### Product Cards
- **Dynamic Badges**: Color-coded (PREMIUM: Purple, BESTSELLER: Pink, POPULAR: Blue, FRESH: Green)
- **Hover Animation**: Card lifts, image zooms, overlay appears
- **Add to Cart Button**: Appears on hover, changes to green "✓ Added!" on click
- **Success Notification**: 2-second popup confirms cart addition

### Shopping Cart
- **Real-time Updates**: Powered by React Context API
- **Cart Badge**: Shows item count in header
- **Quantity Controls**: Increment/decrement with validation
- **Price Display**: Shows discounted prices
- **Persistence**: Cart saved in localStorage
- **Slide Animation**: Smooth sidebar animation

### Checkout
- **2-Step Process**: Clear, guided flow
- **Multiple Payments**: 3 payment method options
- **Order Summary**: Real-time totals with tax & shipping
- **Form Validation**: Client-side validation for all inputs
- **Success Animation**: Celebratory confirmation screen

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login user | ❌ |
| `GET` | `/api/auth/profile` | Get user profile | ✅ |

**Example Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123",
  "phone": "1234567890"
}
```

**Example Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/orders` | Create new order | ✅ |
| `GET` | `/api/orders/:id` | Get order by ID | ✅ |
| `GET` | `/api/orders/user/:userId` | Get user's orders | ✅ |

**Example Order Request:**
```json
{
  "items": [
    {
      "id": "1",
      "name": "Premium Chicken Breast",
      "quantity": 2,
      "discountedPrice": 3750
    }
  ],
  "shippingInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
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
