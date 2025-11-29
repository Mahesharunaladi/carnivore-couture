# Email Setup Guide - Carnivore Couture

## Email Feature Overview

After user registration, a beautiful welcome email is automatically sent to the user with:
- Welcome message with their name
- List of features and benefits
- Call-to-action button to start shopping
- Contact information
- Professional branding

## Setup Instructions

### Option 1: Gmail (Recommended for Development)

#### Step 1: Create/Use Gmail Account
Use your existing Gmail account or create a new one for the application.

#### Step 2: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to "Security"
3. Enable "2-Step Verification"

#### Step 3: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Other (Custom name)"
3. Enter "Carnivore Couture" as the name
4. Click "Generate"
5. Copy the 16-character password (spaces don't matter)

#### Step 4: Update .env File
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

### Option 2: Other Email Services

#### SendGrid (Production Ready)
```javascript
// In emailService.js, replace createTransporter:
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

#### AWS SES (Amazon)
```javascript
const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 587,
  auth: {
    user: process.env.AWS_SES_USER,
    pass: process.env.AWS_SES_PASSWORD,
  },
});
```

#### Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## Testing the Email Feature

### Method 1: Register a Real User
1. Start the backend: `cd backend && npm start`
2. Start the frontend: `npm run dev`
3. Navigate to registration page
4. Fill the form with YOUR real email
5. Submit
6. Check your inbox (and spam folder)

### Method 2: Test with Terminal
```bash
# Test email sending
node -e "
const { sendWelcomeEmail } = require('./utils/emailService');
sendWelcomeEmail('your-email@gmail.com', 'Test User')
  .then(result => console.log('Result:', result))
  .catch(err => console.error('Error:', err));
"
```

### Method 3: Create Test Script
```javascript
// test-email.js
require('dotenv').config();
const { sendWelcomeEmail } = require('./utils/emailService');

async function testEmail() {
  try {
    const result = await sendWelcomeEmail(
      'your-email@gmail.com',
      'Test User'
    );
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Failed:', error);
  }
}

testEmail();
```

Run: `node test-email.js`

## Email Template Features

The welcome email includes:
- ✅ Professional HTML design
- ✅ Responsive layout
- ✅ Carnivore Couture branding
- ✅ Personalized greeting
- ✅ Feature highlights
- ✅ Call-to-action button
- ✅ Contact information
- ✅ Footer with links
- ✅ Plain text fallback

## Troubleshooting

### Error: "Invalid login credentials"
- Make sure you're using an App Password, not your Gmail password
- Verify 2FA is enabled on your Google account
- Check that EMAIL_USER and EMAIL_PASSWORD are set in .env

### Error: "Connection timeout"
- Check your internet connection
- Verify firewall isn't blocking SMTP ports
- Try using port 465 instead of 587

### Error: "Self-signed certificate"
Add this to transporter config:
```javascript
tls: {
  rejectUnauthorized: false
}
```

### Emails going to spam
- Add SPF, DKIM, and DMARC records to your domain
- Use a verified sender email
- Warm up your sending domain gradually
- Avoid spam trigger words

### Email not sending but no error
- Check the console logs for email status
- Verify EMAIL_USER and EMAIL_PASSWORD are correct
- Test with a simple mail client first
- Check Gmail "Less secure apps" settings (legacy accounts)

## Production Recommendations

1. **Use Professional Email Service**
   - SendGrid (12,000 free emails/month)
   - AWS SES (62,000 free emails/month)
   - Mailgun (5,000 free emails/month)

2. **Add Email Queue**
   - Use Bull or Bee-Queue for background processing
   - Retry failed emails
   - Rate limiting

3. **Add More Email Types**
   - Password reset
   - Order confirmation
   - Shipping notification
   - Newsletter

4. **Email Tracking**
   - Track open rates
   - Track click rates
   - Analytics integration

5. **Email Templates**
   - Use template engine (Handlebars, Pug)
   - Store templates in database
   - A/B testing

## Environment Variables Reference

```env
# Required for email functionality
EMAIL_USER=your-email@gmail.com          # Your Gmail address
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx       # 16-char App Password

# Optional
EMAIL_FROM_NAME=Carnivore Couture        # Sender name
EMAIL_SUPPORT=support@carnivorecouture.com
```

## Security Best Practices

1. ✅ **Never commit .env file** - Already in .gitignore
2. ✅ **Use App Passwords** - Not your actual Gmail password
3. ✅ **Rotate credentials** - Change passwords regularly
4. ✅ **Limit permissions** - Use dedicated email account
5. ✅ **Monitor usage** - Check for unusual activity

## Quick Setup Checklist

- [ ] Install nodemailer: `npm install nodemailer`
- [ ] Enable 2FA on Gmail
- [ ] Generate App Password
- [ ] Update .env with EMAIL_USER
- [ ] Update .env with EMAIL_PASSWORD
- [ ] Restart backend server
- [ ] Test with real email registration
- [ ] Check inbox/spam folder
- [ ] Verify email looks good on mobile

## Example Email Content

**Subject:** Welcome to Carnivore Couture! 🥩

**Preview:** We're thrilled to have you join the Carnivore Couture family...

**Key Sections:**
1. Header with logo and branding
2. Personalized greeting
3. Welcome message
4. Feature highlights box
5. Call-to-action button
6. Support information
7. Professional footer

## Support

If you encounter any issues:
1. Check the console logs for detailed errors
2. Verify all environment variables are set
3. Test with a simple email client
4. Check Gmail security settings
5. Review the troubleshooting section above

---

**Status**: ✅ Email Service Implemented
**Provider**: Gmail (configurable)
**Template**: HTML + Plain Text
**Trigger**: User Registration
**Async**: Non-blocking (registration succeeds even if email fails)
