# 🔐 Login Troubleshooting Guide

## Issue Fixed: Login API Integration

I've updated the LoginPage to properly connect to the backend API. Here's what was changed:

### What Was Wrong
- The `handleSubmit` function was just logging data to console
- No API call was being made to the backend
- User credentials weren't being validated

### What's Fixed
- ✅ Full API integration with backend `/api/auth/login` endpoint
- ✅ Token and user data stored in localStorage
- ✅ Success/error message display
- ✅ Auto-redirect to home page after successful login
- ✅ Loading states during login process

## How to Test Login

### Step 1: Make Sure Servers Are Running
```bash
# Backend (Terminal 1)
cd backend
node server.js
# Should show: "Server is running on port 3001"

# Frontend (Terminal 2)
npm run dev
# Should show: "Local: http://localhost:5173/"
```

### Step 2: Use Existing Account
If you already registered with email `mahesharunaladi@gmail.com`:
- Email: `mahesharunaladi@gmail.com`
- Password: `12345678` (or whatever you used during registration)

### Step 3: Or Create New Account
1. Go to http://localhost:5173/register
2. Fill in all details
3. Click "Create Account"
4. You'll receive a welcome email (if configured)
5. After registration, you can login

### Step 4: Login
1. Go to http://localhost:5173/login
2. Enter your email and password
3. Click "Login"
4. If successful, you'll see a green success message
5. You'll be redirected to home page in 1.5 seconds
6. Your name will appear in the top-right corner

## Common Login Issues & Solutions

### Issue 1: "Invalid email or password"
**Cause**: Email not registered OR wrong password
**Solution**: 
- Make sure you registered first
- Check the backend terminal - if you see "E11000 duplicate key error", that email is already registered
- Try the email you used during registration
- Password is case-sensitive!

### Issue 2: "Unable to connect to server"
**Cause**: Backend not running OR wrong port
**Solution**:
```bash
# Check if backend is running
lsof -i :3001

# If nothing shows, start backend
cd backend
node server.js
```

### Issue 3: Login button doesn't work
**Cause**: Frontend server error
**Solution**:
```bash
# Restart frontend
pkill -9 -f "vite"
npm run dev
```

### Issue 4: Success message shows but not logged in
**Cause**: localStorage not being set properly
**Solution**:
- Open browser DevTools (F12)
- Go to Application > Local Storage > http://localhost:5173
- Check if `token` and `user` are stored
- If not, check browser console for errors

### Issue 5: "Email already registered" during login
**Cause**: This is a registration error, not login error
**Solution**: 
- The email is already in database
- Just use the login page instead of register
- Use the password you set during registration

## Checking Backend Status

### View MongoDB Users
```bash
# Connect to MongoDB
mongosh

# Switch to your database
use carnivore-couture

# List all users
db.users.find().pretty()

# Check specific user
db.users.findOne({email: "your@email.com"})

# Exit
exit
```

### Backend Logs
The backend terminal shows:
- ✅ `POST /api/auth/login` - Login attempt received
- ✅ Login successful response
- ❌ Error messages if login fails

## Testing Login Flow

### Manual Test
1. **Register** (if needed):
   ```
   POST http://localhost:3001/api/auth/register
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "password123",
     "phone": "1234567890"
   }
   ```

2. **Login**:
   ```
   POST http://localhost:3001/api/auth/login
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

3. **Expected Response**:
   ```json
   {
     "user": {
       "_id": "...",
       "name": "Test User",
       "email": "test@example.com",
       "role": "user"
     },
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }
   ```

## Browser Console Debugging

Open DevTools (F12) and check:

### Check Network Tab
1. Go to Network tab
2. Try to login
3. Look for request to `localhost:3001/api/auth/login`
4. Check:
   - Status: Should be 200
   - Response: Should have `user` and `token`
   - Headers: Should have `Content-Type: application/json`

### Check Console Tab
Look for:
- ❌ CORS errors → Backend CORS not configured
- ❌ 404 errors → Backend route not found
- ❌ Network errors → Backend not running
- ✅ No errors → Everything working!

### Check Application Tab
After successful login:
- Local Storage > http://localhost:5173
- Should see:
  - `token`: JWT token string
  - `user`: JSON object with user data

## Quick Fix Commands

### Reset Everything
```bash
# Stop all servers
pkill -9 node
pkill -9 -f vite

# Clear node modules and reinstall (if needed)
cd backend
rm -rf node_modules package-lock.json
npm install

cd ..
rm -rf node_modules package-lock.json
npm install

# Start fresh
cd backend
node server.js

# In new terminal
cd ..
npm run dev
```

### Clear Browser Data
1. Open DevTools (F12)
2. Go to Application > Storage
3. Click "Clear site data"
4. Refresh page

### Check User in Database
```bash
mongosh
use carnivore-couture
db.users.find({}, {email: 1, name: 1}).pretty()
```

## Login Flow (After Fix)

```
User enters credentials
        ↓
Click "Login" button
        ↓
Frontend makes POST to /api/auth/login
        ↓
Backend validates credentials
        ↓
Backend returns user + token
        ↓
Frontend stores in localStorage
        ↓
Shows success message
        ↓
Redirects to home (1.5 seconds)
        ↓
Home page shows user name in header
        ↓
User is logged in! ✅
```

## Success Indicators

You know login is working when:
- ✅ Success message appears (green with checkmark)
- ✅ Redirected to home page
- ✅ Your name appears in top-right corner
- ✅ Browser localStorage has `token` and `user`
- ✅ Backend logs show successful login
- ✅ Cart persists across page reloads

## Still Having Issues?

### Check These Files
1. **LoginPage.jsx** - Frontend login form (should have API call now)
2. **backend/routes/auth.js** - Login endpoint (should compare password with bcrypt)
3. **backend/models/User.js** - User schema (should have password hashing)

### Debug Steps
1. Console.log the formData before sending
2. Check network request payload
3. Check backend terminal for errors
4. Verify MongoDB is running: `mongosh`
5. Check if user exists in database

### Contact Backend
```bash
# Test backend directly with curl
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

If this returns user data, frontend is the issue.
If this returns error, backend is the issue.

## Your Current Status

Based on backend logs:
- ✅ Backend is running on port 3001
- ✅ MongoDB is connected
- ✅ User with email `mahesharunaladi@gmail.com` exists
- ✅ Login endpoint is configured

**You should now be able to login!** 🎉

Try logging in with:
- Email: `mahesharunaladi@gmail.com`
- Password: Whatever you used during registration

If you forgot your password, you'll need to either:
1. Register with a new email
2. Manually reset in database (see below)

### Reset Password in Database
```bash
mongosh
use carnivore-couture

# Generate new hashed password
# Use Node.js
node
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('newpassword123', 8);
console.log(hash);
// Copy the hash

# Update in MongoDB
db.users.updateOne(
  {email: "mahesharunaladi@gmail.com"},
  {$set: {password: "PASTE_HASH_HERE"}}
)
```

Then login with:
- Email: `mahesharunaladi@gmail.com`
- Password: `newpassword123`
