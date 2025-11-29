#!/bin/bash

echo "======================================"
echo "Carnivore Couture - Email Setup"
echo "======================================"
echo ""
echo "This script will help you configure email for the application."
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file first."
    exit 1
fi

echo "Current email configuration:"
grep "EMAIL_" .env || echo "No email configuration found"
echo ""

echo "To set up email with Gmail:"
echo ""
echo "1. Enable 2-Factor Authentication on your Gmail account"
echo "   Visit: https://myaccount.google.com/security"
echo ""
echo "2. Generate an App Password"
echo "   Visit: https://myaccount.google.com/apppasswords"
echo "   - Select 'Mail' and 'Other (Custom name)'"
echo "   - Name it 'Carnivore Couture'"
echo "   - Copy the 16-character password"
echo ""
echo "3. Update your .env file with:"
echo "   EMAIL_USER=your-email@gmail.com"
echo "   EMAIL_PASSWORD=your-16-char-app-password"
echo ""

read -p "Do you want to update the email configuration now? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter your Gmail address: " email_user
    read -p "Enter your App Password (16 chars): " email_password
    
    # Update .env file
    if grep -q "EMAIL_USER=" .env; then
        # Update existing
        sed -i.bak "s/EMAIL_USER=.*/EMAIL_USER=$email_user/" .env
        sed -i.bak "s/EMAIL_PASSWORD=.*/EMAIL_PASSWORD=$email_password/" .env
    else
        # Add new
        echo "" >> .env
        echo "# Email Configuration" >> .env
        echo "EMAIL_USER=$email_user" >> .env
        echo "EMAIL_PASSWORD=$email_password" >> .env
    fi
    
    echo ""
    echo "✅ Email configuration updated!"
    echo ""
    read -p "Do you want to test the email now? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter test email address: " test_email
        echo ""
        echo "Sending test email..."
        node test-email.js "$test_email" "Test User"
    fi
else
    echo ""
    echo "Email configuration skipped."
    echo "You can manually update the .env file later."
fi

echo ""
echo "======================================"
echo "Setup complete!"
echo "======================================"
