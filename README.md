# Carnivore Couture

## Premium Meat E-commerce Platform

Carnivore Couture is a full-stack e-commerce platform specializing in premium meat products. Built with React + Vite for the frontend and Node.js + Express + MongoDB for the backend, it offers a modern, secure, and scalable solution for online meat retail.

## Features

### Frontend
- Responsive design for all device sizes
- Product showcase with dynamic filtering
- Real-time shopping cart management
- Secure user authentication
- Order tracking and history
- Admin dashboard for product management

### Backend
- RESTful API architecture
- JWT-based authentication
- Role-based access control
- Shopping cart persistence
- Order management system
- Secure payment processing
- Input validation and sanitization
- Rate limiting and security headers

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

#### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Mahesharunaladi/carnivore-couture.git
   ```

2. Navigate to the backend directory
   ```bash
   cd carnivore-couture/backend
   ```

3. Install dependencies
   ```bash
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
