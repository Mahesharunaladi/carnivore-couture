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
- **Nodemailer** - Email service
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **Morgan** - HTTP request logging

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Mahesharunaladi/carnivore-couture.git
cd carnivore-couture
```

#### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

#### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start server
npm start
```

#### 4. Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

## 🌟 Key Features

### User Features
- User registration and authentication
- Browse products by category
- Advanced product filtering and search
- Shopping cart management
- Order placement and tracking
- User profile management
- Wishlist functionality
- Address management

### Admin Features
- Product management (CRUD operations)
- Order management
- User management
- Analytics dashboard
- Inventory management
- Category management

## 📱 Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interfaces
- Optimized images
- Flexible grids

## 🔒 Security Features
- JWT authentication
- Password hashing
- Input validation
- Rate limiting
- CORS protection
- XSS prevention
- Security headers
- Error handling

## 🏗 Project Structure
```
carnivore-couture/
├── src/
│   ├── components/
│   │   ├── Logo/
│   │   ├── ProductCard/
│   │   └── ...
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   └── App.jsx
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
└── README.md
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors
- Mahesh Arunaladi - Initial work

## 🙏 Acknowledgments
- Special thanks to all contributors
- Inspiration from various e-commerce platforms
- React and Node.js communities
   npm install
   ```

4. Create .env file
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:3000
   ```

5. Start the backend server
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. Open a new terminal and navigate to the project root
   ```bash
   cd carnivore-couture
   ```

2. Install frontend dependencies
   ```bash
   npm install
   ```

3. Start the frontend development server
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Technologies Used

### Frontend
- React 18
- Vite
- CSS3
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens
- Express Validator
- Helmet.js
- Morgan

## API Documentation

### Authentication Endpoints

```http
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
PATCH /api/auth/me
```

### Product Endpoints

```http
GET /api/products
GET /api/products/:id
POST /api/products     # Admin only
PATCH /api/products/:id # Admin only
DELETE /api/products/:id # Admin only
```

### Cart Endpoints

```http
GET /api/cart
POST /api/cart/add
PATCH /api/cart/update/:productId
DELETE /api/cart/remove/:productId
DELETE /api/cart/clear
```

### Order Endpoints

```http
POST /api/orders
GET /api/orders/my-orders
GET /api/orders/:id
PATCH /api/orders/:id/status # Admin only
PATCH /api/orders/:id/cancel
```

## 🚀 Quick Deployment

### Deploy in 15 Minutes (Free!)

Your app is **production-ready** and can be deployed for **$0/month** using:
- **Frontend**: Vercel (Free)
- **Backend**: Render (Free - 750 hours/month)
- **Database**: MongoDB Atlas (Free - 512MB)

#### Quick Start:
```bash
# Automated deployment
./deploy.sh

# OR Manual deployment
npm run build
vercel --prod
```

#### Detailed Guides:
- 📖 **[DEPLOY_NOW.md](DEPLOY_NOW.md)** - Quick visual guide
- ⚡ **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - 15-minute deployment
- 📚 **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete detailed guide
- ✅ **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Step-by-step checklist

**Platform Options:**
- ✅ Vercel + Render (Recommended - Free & Easy)
- ✅ Netlify + Railway (Alternative - Free)
- ✅ DigitalOcean Droplet (Full control - $6/month)
- ✅ Heroku (Easy but $7/month)

**Live in 3 Steps:**
1. Deploy backend to Render (5 min)
2. Setup MongoDB Atlas (5 min)
3. Deploy frontend to Vercel (5 min)

See **[DEPLOY_NOW.md](DEPLOY_NOW.md)** to get started!

## Security Features

- JWT-based authentication (24h token expiration)
- Request rate limiting (100 requests/15min)
- Input validation and sanitization
- Secure HTTP headers (Helmet)
- CORS configuration
- Password hashing with bcrypt (8 rounds)
- Error handling with proper status codes
- Request logging with Morgan

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - Fast deployment guide
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Deployment checklist
- **[PAYMENT_METHODS_README.md](PAYMENT_METHODS_README.md)** - Payment integration guide
- **[EMAIL_FIX_GUIDE.md](EMAIL_FIX_GUIDE.md)** - Email setup instructions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎯 Project Status

- ✅ **Frontend**: Complete with responsive design
- ✅ **Backend**: Complete with security features
- ✅ **Authentication**: JWT-based login/registration
- ✅ **Cart**: Persistent cart with localStorage
- ✅ **Checkout**: 2-step with multiple payment methods
- ✅ **Emails**: Welcome emails with HTML templates
- ✅ **Database**: MongoDB with Mongoose schemas
- ✅ **Deployment**: Ready to deploy (see guides)
- 🚧 **Payment Gateway**: Mock payment (integrate Razorpay/Stripe for production)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Mahesh Arunaladi**
- GitHub: [@Mahesharunaladi](https://github.com/Mahesharunaladi)

## Acknowledgments

- Built with modern web development best practices
- Focuses on security and scalability
- Implements a complete e-commerce solution
