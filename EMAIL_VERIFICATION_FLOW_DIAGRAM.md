# Email Verification Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     EMAIL VERIFICATION SYSTEM FLOW                       │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   USER       │
│  REGISTERS   │
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────┐
│  BACKEND: POST /api/auth/register                               │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 1. Create user account                                     │ │
│  │ 2. Set isEmailVerified = false                            │ │
│  │ 3. Generate crypto token (32 bytes)                       │ │
│  │ 4. Set token expiry (24 hours)                            │ │
│  │ 5. Save user to MongoDB                                   │ │
│  │ 6. Send verification email                                │ │
│  │ 7. Return success response                                │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────┐
│  FRONTEND: RegisterPage                                          │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Shows success message:                                     │ │
│  │ "Registration successful!"                                 │ │
│  │ "Please check your email to verify your account"          │ │
│  │                                                            │ │
│  │ Redirects to /login after 4 seconds                      │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────┐
│  EMAIL SERVICE                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Sends branded email to user with:                         │ │
│  │ • Verification button                                     │ │
│  │ • Copy-paste link                                         │ │
│  │ • Expiry notice (24 hours)                               │ │
│  │                                                            │ │
│  │ Link: http://localhost:5173/verify-email?token=xxxxx     │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────┐
│   USER       │
│ CLICKS LINK  │
│  IN EMAIL    │
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────┐
│  FRONTEND: /verify-email?token=xxxxx                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ EmailVerificationPage Component:                          │ │
│  │                                                            │ │
│  │ 1. Shows loading animation                                │ │
│  │ 2. Extracts token from URL                                │ │
│  │ 3. Calls backend API                                      │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────┐
│  BACKEND: GET /api/auth/verify-email/:token                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 1. Find user by token                                     │ │
│  │ 2. Check token not expired                                │ │
│  │ 3. If valid:                                              │ │
│  │    • Set isEmailVerified = true                          │ │
│  │    • Delete verification token                           │ │
│  │    • Delete expiry date                                  │ │
│  │    • Save user                                            │ │
│  │    • Send welcome email                                   │ │
│  │    • Return success                                       │ │
│  │ 4. If invalid/expired:                                    │ │
│  │    • Return error                                         │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
       │
       ├─────── SUCCESS ─────┐         ├─────── ERROR ──────┐
       ▼                     │         ▼                    │
┌──────────────────┐         │  ┌──────────────────┐       │
│ Show success msg │         │  │ Show error msg   │       │
│ with checkmark   │         │  │ with X icon      │       │
│                  │         │  │                  │       │
│ "Email Verified  │         │  │ "Verification    │       │
│ Successfully!"   │         │  │ Failed"          │       │
│                  │         │  │                  │       │
│ Auto-redirect to │         │  │ Show resend      │       │
│ login (3s)       │         │  │ button           │       │
└──────────────────┘         │  └──────────────────┘       │
                             │                             │
       ┌─────────────────────┘                             │
       ▼                                                    │
┌──────────────┐                                           │
│   USER       │                                           │
│ TRIES LOGIN  │                                           │
└──────┬───────┘                                           │
       │                                                    │
       ▼                                                    │
┌─────────────────────────────────────────────────────────┐│
│  BACKEND: POST /api/auth/login                          ││
│  ┌────────────────────────────────────────────────────┐ ││
│  │ 1. Check email exists                              │ ││
│  │ 2. Check password correct                          │ ││
│  │ 3. Check if isEmailVerified = true                 │ ││
│  │                                                     │ ││
│  │ IF VERIFIED:                                        │ ││
│  │   • Generate JWT token                             │ ││
│  │   • Return user data                               │ ││
│  │   • Login successful                               │ ││
│  │                                                     │ ││
│  │ IF NOT VERIFIED:                                    │ ││
│  │   • Return 403 error                               │ ││
│  │   • "Please verify your email"                     │ ││
│  │   • requiresVerification: true                     │ ││
│  └────────────────────────────────────────────────────┘ ││
└─────────────────────────────────────────────────────────┘│
       │                                                    │
       ├───── VERIFIED ─────┐    ├─── NOT VERIFIED ────────┤
       ▼                    │    ▼                         │
┌──────────────────┐        │  ┌──────────────────┐       │
│ Login successful │        │  │ Show error msg   │       │
│ Redirect to home │        │  │ "Verify email    │       │
└──────────────────┘        │  │  before login"   │       │
                            │  │                  │       │
                            │  │ Show "Resend     │       │
                            │  │ Verification"    │◄──────┘
                            │  │ button           │
                            │  └────────┬─────────┘
                            │           │
                            │           │ User clicks
                            │           ▼
                            │  ┌───────────────────────────┐
                            │  │ POST /api/auth/           │
                            │  │ resend-verification       │
                            │  │                           │
                            │  │ 1. Generate new token     │
                            │  │ 2. Update expiry          │
                            │  │ 3. Send new email         │
                            │  └───────────────────────────┘
                            │           │
                            └───────────┴── Repeat flow ───┘

┌─────────────────────────────────────────────────────────────────┐
│                       DATABASE STATES                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  NEW USER (Just Registered):                                    │
│  {                                                               │
│    email: "user@example.com",                                   │
│    isEmailVerified: false,                                      │
│    emailVerificationToken: "abc123...",                         │
│    emailVerificationExpires: Date.now() + 24h                   │
│  }                                                               │
│                                                                  │
│  VERIFIED USER:                                                  │
│  {                                                               │
│    email: "user@example.com",                                   │
│    isEmailVerified: true,                                       │
│    emailVerificationToken: undefined,                           │
│    emailVerificationExpires: undefined                          │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      SECURITY FEATURES                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✓ Cryptographically secure tokens (crypto.randomBytes(32))    │
│  ✓ 24-hour token expiry                                         │
│  ✓ One-time use tokens (deleted after verification)            │
│  ✓ Login blocked until email verified                          │
│  ✓ Clear error messages with actionable steps                  │
│  ✓ Resend option with new token generation                     │
│  ✓ Password hashing (bcrypt)                                   │
│  ✓ JWT authentication                                           │
└─────────────────────────────────────────────────────────────────┘
```

## Key Points:

1. **Registration**: User account created but marked as unverified
2. **Email Sent**: Professional verification email with unique token
3. **Verification**: User clicks link, token validated, account verified
4. **Login**: Only verified users can login
5. **Resend**: Users can request new verification email if needed
6. **Security**: Tokens expire in 24 hours and are one-time use

## Timeline:

```
Time 0:00  → User registers
Time 0:01  → Verification email sent
Time 0:05  → User clicks verification link
Time 0:06  → Email verified successfully
Time 0:10  → User logs in successfully

OR if user doesn't verify:

Time 0:00  → User registers  
Time 0:01  → Verification email sent
Time 0:10  → User tries to login → BLOCKED
Time 0:11  → User clicks "Resend Verification Email"
Time 0:12  → New verification email sent
Time 0:15  → User clicks verification link
Time 0:16  → Email verified successfully
Time 0:20  → User logs in successfully
```
