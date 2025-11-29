const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // For development, you can use Gmail or any SMTP service
  // For production, use services like SendGrid, AWS SES, etc.
  
  return nodemailer.createTransport({
    service: 'gmail', // or 'smtp.gmail.com'
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
  });
};

// Send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'Carnivore Couture',
        address: process.env.EMAIL_USER,
      },
      to: userEmail,
      subject: 'Welcome to Carnivore Couture! 🥩',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #dc2626, #b91c1c);
              color: white;
              padding: 40px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
              font-weight: 900;
              letter-spacing: 2px;
            }
            .content {
              padding: 40px 30px;
              color: #333;
            }
            .content h2 {
              color: #dc2626;
              font-size: 24px;
              margin-bottom: 20px;
            }
            .content p {
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 15px;
            }
            .features {
              background: #f9f9f9;
              border-left: 4px solid #dc2626;
              padding: 20px;
              margin: 25px 0;
            }
            .features h3 {
              color: #dc2626;
              margin-top: 0;
              font-size: 18px;
            }
            .features ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            .features li {
              margin: 8px 0;
              color: #555;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #dc2626, #b91c1c);
              color: white;
              padding: 15px 40px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              font-size: 16px;
              margin: 20px 0;
              text-align: center;
            }
            .footer {
              background: #1a1a1a;
              color: #999;
              padding: 30px;
              text-align: center;
              font-size: 14px;
            }
            .footer a {
              color: #dc2626;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>CARNIVORE COUTURE</h1>
              <p style="margin: 10px 0 0; font-size: 16px;">Premium Quality Meats</p>
            </div>
            
            <div class="content">
              <h2>Welcome, ${userName}! 🎉</h2>
              
              <p>We're thrilled to have you join the Carnivore Couture family! You've just taken the first step towards experiencing the finest selection of premium quality meats delivered fresh to your doorstep.</p>
              
              <div class="features">
                <h3>What You Can Expect:</h3>
                <ul>
                  <li>🥩 <strong>Premium Quality:</strong> Only the finest cuts of meat</li>
                  <li>🚚 <strong>Fresh Delivery:</strong> Delivered fresh daily to your door</li>
                  <li>⭐ <strong>Exclusive Deals:</strong> Special offers for members</li>
                  <li>💯 <strong>100% Satisfaction:</strong> Quality guaranteed</li>
                  <li>🕐 <strong>24/7 Support:</strong> We're here to help anytime</li>
                </ul>
              </div>
              
              <p>Ready to explore our selection? Browse our premium collection of fresh meats, seafood, and poultry.</p>
              
              <center>
                <a href="http://localhost:5173" class="cta-button">Start Shopping Now</a>
              </center>
              
              <p style="margin-top: 30px; font-size: 14px; color: #666;">
                <strong>Need help getting started?</strong><br>
                Contact our support team at support@carnivorecouture.com or call us at +91 1800-123-4567
              </p>
            </div>
            
            <div class="footer">
              <p><strong>CARNIVORE COUTURE</strong></p>
              <p>Premium Quality Meats | Fresh Daily Delivery</p>
              <p style="margin-top: 15px;">
                <a href="http://localhost:5173">Visit Website</a> | 
                <a href="#">Privacy Policy</a> | 
                <a href="#">Terms of Service</a>
              </p>
              <p style="margin-top: 20px; font-size: 12px;">
                © 2025 Carnivore Couture. All rights reserved.<br>
                You're receiving this email because you signed up for Carnivore Couture.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome to Carnivore Couture, ${userName}!

We're thrilled to have you join our family! You've just taken the first step towards experiencing the finest selection of premium quality meats.

What You Can Expect:
- Premium Quality: Only the finest cuts of meat
- Fresh Delivery: Delivered fresh daily to your door
- Exclusive Deals: Special offers for members
- 100% Satisfaction: Quality guaranteed
- 24/7 Support: We're here to help anytime

Start shopping now: http://localhost:5173

Need help? Contact us at support@carnivorecouture.com or call +91 1800-123-4567

© 2025 Carnivore Couture. All rights reserved.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't throw error - registration should succeed even if email fails
    return { success: false, error: error.message };
  }
};

// Send order confirmation email
const sendOrderConfirmation = async (userEmail, userName, orderDetails) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'Carnivore Couture',
        address: process.env.EMAIL_USER,
      },
      to: userEmail,
      subject: `Order Confirmation - #${orderDetails.orderId}`,
      html: `
        <h1>Thank you for your order, ${userName}!</h1>
        <p>Your order #${orderDetails.orderId} has been confirmed.</p>
        <p>Total: ₹${orderDetails.total}</p>
        <p>We'll send you another email when your order ships.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendWelcomeEmail,
  sendOrderConfirmation,
};
