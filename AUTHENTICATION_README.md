# Authentication System - Carnivore Couture

## Features Implemented ✅

### 1. **User Registration**
- Full-page registration form at `/register`
- Fields: Name, Email, Phone, Password, Confirm Password
- Password validation (minimum 6 characters)
- Password confirmation check
- Real-time error messages
- Success notification with auto-redirect
- Data stored in MongoDB database
- Password automatically hashed with bcrypt
- JWT token generated on successful registration

### 2. **User Login**
- Full-page login form at `/login`
- Fields: Email, Password
- "Remember me" checkbox
- "Forgot Password" link (placeholder)
- Real-time error messages
- Success notification with auto-redirect
- JWT token-based authentication
- Secure password verification

### 3. **User Session Management**
- User data stored in localStorage
- JWT token stored securely
- Automatic session persistence across page refreshes
- User name displayed in header when logged in
- Logout functionality to clear session

### 4. **UI/UX Enhancements**
- Split-screen design (form on left, hero image on right)
- Smooth animations with Framer Motion
- Loading states on buttons during API calls
- Error messages with red styling
- Success messages with green styling
- "Back to Home" button on both pages
- Easy navigation between login and register pages
- Disabled button states during loading
- Responsive design (mobile-friendly)

## API Endpoints

### Register
```
POST http://localhost:3001/api/auth/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "password": "password123"
}
Response: {
  "message": "Registration successful",
  "user": { ... },
  "token": "jwt-token-here"
}
```

### Login
```
POST http://localhost:3001/api/auth/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
Response: {
  "user": { ... },
  "token": "jwt-token-here"
}
```

### Get Profile
```
GET http://localhost:3001/api/auth/me
Headers: {
  "Authorization": "Bearer jwt-token-here"
}
Response: {
  user data without password
}
```

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  role: String (default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt before storing
2. **JWT Tokens**: Secure token-based authentication with 24h expiration
3. **Password Validation**: Minimum length requirements
4. **Email Uniqueness**: Prevents duplicate accounts
5. **Error Handling**: Secure error messages without exposing sensitive data

## How to Use

### For Users:
1. **Register**: Click "Login" in header → Click "Create Account" → Fill the form → Submit
2. **Login**: Click "Login" in header → Enter credentials → Submit
3. **View Profile**: After login, see your name in the header
4. **Logout**: Click "Logout" button in header

### For Developers:
1. **Start Backend**: `cd backend && npm start` (runs on port 3001)
2. **Start Frontend**: `npm run dev` (runs on port 5173)
3. **MongoDB**: Ensure MongoDB connection string is in backend/.env

## File Structure

```
src/
├── pages/
│   ├── HomePage.jsx (main page with user session)
│   ├── LoginPage.jsx (login form with API integration)
│   ├── RegisterPage.jsx (registration form with API integration)
│   └── Auth.css (authentication pages styling)
├── utils/
│   └── api.js (API utility functions)
└── App.jsx (routing configuration)

backend/
├── models/
│   └── User.js (user schema with password hashing)
├── routes/
│   └── auth.js (authentication endpoints)
├── middleware/
│   └── auth.js (JWT verification)
└── server.js (express server setup)
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=3001
```

## Testing

1. **Manual Testing**: Use the UI to register and login
2. **API Testing**: Use curl or Postman to test endpoints
3. **Database Check**: Verify users are stored in MongoDB

## Next Steps (Optional Enhancements)

- [ ] Email verification
- [ ] Password reset functionality
- [ ] OAuth integration (Google, Facebook)
- [ ] Profile editing
- [ ] Password strength indicator
- [ ] Account deletion
- [ ] Session timeout handling
- [ ] Protected routes
- [ ] Admin dashboard

---

**Status**: ✅ Fully Functional Registration & Login System
**Backend**: Running on http://localhost:3001
**Frontend**: Running on http://localhost:5173
**Database**: MongoDB Connected
