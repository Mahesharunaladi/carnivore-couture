require('dotenv').config();
const { sendWelcomeEmail } = require('./utils/emailService');

// Get email from command line argument or use default
const testEmail = process.argv[2] || 'test@example.com';
const testName = process.argv[3] || 'Test User';

console.log('==========================================');
console.log('Testing Email Service');
console.log('==========================================');
console.log('Sending welcome email to:', testEmail);
console.log('User name:', testName);
console.log('From:', process.env.EMAIL_USER);
console.log('==========================================\n');

async function testEmailService() {
  try {
    console.log('Attempting to send email...\n');
    
    const result = await sendWelcomeEmail(testEmail, testName);
    
    if (result.success) {
      console.log('✅ SUCCESS!');
      console.log('Email sent successfully!');
      console.log('Message ID:', result.messageId);
      console.log('\nCheck your inbox (and spam folder) at:', testEmail);
    } else {
      console.log('❌ FAILED');
      console.log('Error:', result.error);
      console.log('\nTroubleshooting tips:');
      console.log('1. Make sure EMAIL_USER and EMAIL_PASSWORD are set in .env');
      console.log('2. Use Gmail App Password (not your regular password)');
      console.log('3. Enable 2-Factor Authentication on Gmail');
      console.log('4. Generate App Password at: https://myaccount.google.com/apppasswords');
    }
  } catch (error) {
    console.log('❌ ERROR');
    console.error('Unexpected error:', error.message);
    console.error('Stack:', error.stack);
  }
  
  console.log('\n==========================================');
}

testEmailService();
