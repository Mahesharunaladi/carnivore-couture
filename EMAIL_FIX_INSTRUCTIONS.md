# Email Verification Fix Instructions

## Current Issues
1. **403 Forbidden on Login** - Users cannot login because email verification is required but emails aren't being sent
2. **500 Error on Resend Verification** - Email service is not properly configured
3. **No verification codes received** - Email credentials are placeholder values

## Solution Options

### Option 1: Configure Real Email Service (RECOMMENDED)

#### Step 1: Get Gmail App Password
1. Go to your Google Account: https://myaccount.google.com/
2. Enable 2-Factor Authentication if not already enabled
3. Go to Security → 2-Step Verification → App passwords
4. Create a new app password for "Mail"
5. Copy the 16-character password

#### Step 2: Update .env file
Edit `/Users/mahesharunaladi/Downloads/carnivore-couture/backend/.env`:
```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
```

#### Step 3: Restart Backend Server
```bash
cd /Users/mahesharunaladi/Downloads/carnivore-couture/backend
npm start
```

---

### Option 2: Disable Email Verification (Quick Fix for Development)

This allows users to login immediately without email verification.

#### Changes needed:
1. Remove email verification requirement from login
2. Allow users to login without verifying email
3. Keep verification as optional feature

Would you like me to implement Option 2 for you now?

---

## Testing Email Configuration

After setting up real email credentials, test with:
```bash
cd /Users/mahesharunaladi/Downloads/carnivore-couture/backend
node test-email.js
```

---

## For Existing Users Who Can't Login

If you have users stuck without verification, run this to verify all users:
```bash
cd /Users/mahesharunaladi/Downloads/carnivore-couture/backend
node -e "const mongoose = require('mongoose'); const User = require('./models/User'); mongoose.connect('mongodb://localhost:27017/carnivore-couture').then(async () => { await User.updateMany({}, { isEmailVerified: true }); console.log('All users verified'); process.exit(0); });"
```
