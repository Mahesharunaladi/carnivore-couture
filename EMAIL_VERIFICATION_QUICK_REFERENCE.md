# Email Verification - Quick Reference

## 🚀 Quick Start

### 1. Setup Email (Required)
Edit `backend/.env`:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password
```

### 2. Start Servers
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
npm run dev
```

### 3. Test Flow
1. Register at `http://localhost:5173/register`
2. Check email for verification link
3. Click verification link
4. Login at `http://localhost:5173/login`

## 📧 Email Setup (Gmail)

1. **Enable 2FA**: Google Account → Security → 2-Step Verification
2. **Generate App Password**: 
   - Go to App passwords
   - Select "Mail" and your device
   - Copy the 16-character password
3. **Update .env**:
   ```env
   EMAIL_USER=yourname@gmail.com
   EMAIL_PASSWORD=abcd efgh ijkl mnop  # Remove spaces!
   ```

## 🔗 New Routes

| Route | Description |
|-------|-------------|
| `/verify-email?token=xxx` | Email verification page |
| `GET /api/auth/verify-email/:token` | Verify email endpoint |
| `POST /api/auth/resend-verification` | Resend verification email |

## ⚡ Quick Commands

### Manually Verify User (Dev Only)
```bash
mongosh
use carnivore-couture
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { isEmailVerified: true } }
)
```

### Check User Verification Status
```bash
mongosh
use carnivore-couture
db.users.findOne({ email: "user@example.com" })
```

### Reset All User Verifications (Testing)
```bash
mongosh
use carnivore-couture
db.users.updateMany({}, { $set: { isEmailVerified: false } })
```

## 🎯 User Flow

```
Register → Email Sent → Check Inbox → Click Link → Verified → Login
```

## ❌ Common Issues

| Problem | Solution |
|---------|----------|
| Email not sending | Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env` |
| Can't login after register | Must verify email first - check inbox |
| Verification link expired | Click "Resend Verification Email" on login page |
| "Connection refused" error | Backend not running - run `cd backend && npm start` |

## 🧪 Testing Without Email

Temporarily disable verification check in `backend/routes/auth.js`:

```javascript
// Comment out in login route:
/*
if (!user.isEmailVerified) {
  return res.status(403).json({ ... });
}
*/
```

## 📋 Verification Checklist

- [x] User model updated with verification fields
- [x] Email service configured with verification template
- [x] Registration sends verification email
- [x] Verification page created
- [x] Login blocks unverified users
- [x] Resend verification option added
- [x] Welcome email sent after verification

## 🔧 Environment Variables

Required in `backend/.env`:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/carnivore-couture
JWT_SECRET=your-super-secret-key-carnivore-couture
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## 📱 Production Notes

Before deploying:
- [ ] Change `FRONTEND_URL` to production domain
- [ ] Use professional email service (SendGrid/AWS SES)
- [ ] Update email templates with production URLs
- [ ] Test email delivery thoroughly
- [ ] Set up email monitoring

---

**All set! Email verification is ready to use.** ✅
