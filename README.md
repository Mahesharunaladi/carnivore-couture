# 🥩 Carnivore Couture

## Premium Meat E-commerce Platform

Carnivore Couture is a sophisticated e-commerce platform specializing in premium meat products. Built with modern technologies and best practices, it offers a seamless shopping experience for quality meat products.

**🌐 Live Demo**: [Deploy your own in 15 minutes!](#-quick-deployment)

![Carnivore Couture Logo](/public/logo3.png)

## 🚀 Features

### 🎨 Frontend
- **Modern UI/UX** - Built with React 19 + Vite for optimal performance
- **Responsive Design** - Fully responsive across all devices with dark theme
- **Dynamic Product Catalog** - 8 premium meat products with images
- **Interactive Shopping Cart** - Cart persistence with localStorage
- **User Authentication** - Secure login and registration with JWT
- **2-Step Checkout** - Shipping info + Multiple payment methods
- **Payment Options** - Card, UPI, and Digital Wallets (GPay/PhonePe/Paytm)
- **Smooth Animations** - Framer Motion for delightful UX
- **Email Notifications** - Welcome emails on registration

### ⚙️ Backend
- **Robust API** - RESTful architecture with Express.js
- **Secure Authentication** - JWT-based with bcrypt password hashing
- **Data Protection** - Input validation with express-validator
- **Rate Limiting** - API protection against abuse
- **Security** - CORS, Helmet, and security best practices
- **Database** - MongoDB with Mongoose ODM
- **Email Service** - Nodemailer with Gmail integration
- **Error Handling** - Comprehensive error management and logging

## 🛠 Tech Stack

### Frontend
- **React 19** - Latest UI library with concurrent features
- **Vite 7** - Lightning-fast build tool
- **React Router DOM v6** - Client-side routing
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8** - Elegant MongoDB ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing (8 rounds)
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
