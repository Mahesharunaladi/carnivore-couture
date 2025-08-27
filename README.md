# 🥩 Carnivore Couture

## Premium Meat E-commerce Platform

Carnivore Couture is a sophisticated e-commerce platform specializing in premium meat products. Built with modern technologies and best practices, it offers a seamless shopping experience for quality meat products.

![Carnivore Couture Logo](/public/logo3.png)

## 🚀 Features

### 🎨 Frontend
- **Modern UI/UX** - Built with React + Vite for optimal performance
- **Responsive Design** - Fully responsive across all devices
- **Dynamic Product Catalog** - Real-time filtering and search
- **Interactive Shopping Cart** - Seamless cart management
- **User Authentication** - Secure login and registration
- **Order Management** - Track orders and view history
- **Admin Dashboard** - Complete product and order management
- **Wishlist** - Save favorite items for later

### ⚙️ Backend
- **Robust API** - RESTful architecture with Express.js
- **Secure Authentication** - JWT-based user authentication
- **Data Protection** - Input validation and sanitization
- **Access Control** - Role-based permissions system
- **Performance** - Rate limiting and optimization
- **Security** - CORS, Helmet, and security best practices
- **Database** - MongoDB with Mongoose ODM
- **Error Handling** - Comprehensive error management

## 🛠 Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Icons** - Icon library
- **CSS3** - Styling with modern CSS features
- **Context API** - State management
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security headers

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

## Security Features

- JWT-based authentication
- Request rate limiting
- Input validation and sanitization
- Secure HTTP headers
- CORS configuration
- Error handling
- Request logging

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with modern web development best practices
- Focuses on security and scalability
- Implements a complete e-commerce solution
