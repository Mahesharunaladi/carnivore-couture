# 🛒 Checkout Page - Carnivore Couture

## Overview
A fully functional checkout page with a 2-step process, order summary, and secure payment interface.

## Features

### ✨ Two-Step Checkout Process
1. **Step 1: Shipping Information**
   - Full name, email, phone
   - Complete address (address, city, state, ZIP code)
   - Auto-filled from user profile if logged in
   - Form validation

2. **Step 2: Payment Information**
   - Card number (formatted with spaces)
   - Cardholder name
   - Expiry date (MM/YY format)
   - CVV (3 digits)
   - Input formatting and validation

### 📦 Order Summary (Sticky Sidebar)
- Product thumbnails with names
- Quantity for each item
- Individual item prices
- Subtotal calculation
- Tax calculation (5%)
- Shipping cost (FREE over ₹1000)
- Final total amount
- Secure checkout badge

### 🎨 UI/UX Features
- **Dark Theme**: Consistent with Carnivore Couture branding
- **Animated Transitions**: Smooth step changes with Framer Motion
- **Progress Indicator**: Visual step tracker in header
- **Sticky Header**: Navigation always accessible
- **Success Animation**: Celebratory order confirmation
- **Responsive Design**: Works on all screen sizes
- **Loading States**: Processing indicator during order submission

### 🔒 Security Features
- User authentication required (JWT token)
- Secure data transmission
- Card information partially masked (only last 4 digits stored)
- Input validation at every step

## How It Works

### User Flow
1. **Add items to cart** → Click "Proceed to Checkout"
2. **Fill shipping information** → Click "Continue to Payment"
3. **Enter payment details** → Click "Place Order"
4. **Order confirmation** → Success message with order total
5. **Auto-redirect** → Returns to home page after 3 seconds

### Backend Integration
- **Endpoint**: `POST /api/orders`
- **Authentication**: Bearer token required
- **Order Storage**: MongoDB with full order details
- **Order Retrieval**: `GET /api/orders/my-orders` for user's order history

### Cart Persistence
- Cart items saved to `localStorage`
- Automatically loaded on checkout page
- Cleared after successful order placement

## File Structure

```
src/
  pages/
    CheckoutPage.jsx          # Main checkout component
    Checkout.css              # Checkout styling
  App.jsx                     # Added /checkout route

backend/
  routes/
    orders.js                 # Order API endpoints
  models/
    Order.js                  # Updated order schema
  server.js                   # Added order routes
```

## Order Schema

```javascript
{
  user: ObjectId,
  items: [{
    product: String,
    name: String,
    quantity: Number,
    price: Number,
    image: String
  }],
  shippingInfo: {
    fullName, email, phone,
    address, city, state, zipCode
  },
  paymentInfo: {
    cardLastFour: String,
    cardName: String
  },
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  status: String,        // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  paymentStatus: String, // 'pending', 'completed', 'failed'
  timestamps: true
}
```

## Usage

### Accessing Checkout
```javascript
// From HomePage cart sidebar
navigate('/checkout');
```

### Testing
1. Start backend: `cd backend && node server.js`
2. Start frontend: `npm run dev`
3. Add items to cart
4. Click "Proceed to Checkout"
5. Fill in test information:
   - Shipping: Any valid address
   - Payment: Card number `4111 1111 1111 1111` (test format)

### API Endpoints

#### Create Order
```bash
POST http://localhost:3001/api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [...],
  "shippingInfo": {...},
  "paymentInfo": {...},
  "subtotal": 1500,
  "tax": 75,
  "shipping": 0,
  "total": 1575
}
```

#### Get User Orders
```bash
GET http://localhost:3001/api/orders/my-orders
Authorization: Bearer <token>
```

#### Get Single Order
```bash
GET http://localhost:3001/api/orders/:orderId
Authorization: Bearer <token>
```

## Calculations

- **Subtotal**: Sum of all item prices × quantities
- **Tax**: 5% of subtotal
- **Shipping**: 
  - ₹50 if subtotal < ₹1000
  - FREE if subtotal ≥ ₹1000
- **Total**: Subtotal + Tax + Shipping

## Styling Highlights

### Colors
- Background: Pure black `#000`
- Primary: Red gradient `#dc2626` → `#ef4444`
- Success: Green gradient `#10b981` → `#059669`
- Text: White with various opacities
- Borders: `rgba(255, 255, 255, 0.1)`

### Animations
- Step transitions: Spring animation
- Success icon: Scale animation
- Button hovers: Scale 1.02
- Button taps: Scale 0.98

## Future Enhancements

### Planned Features
- [ ] Multiple payment methods (UPI, Net Banking, Wallets)
- [ ] Saved addresses for faster checkout
- [ ] Discount/coupon code support
- [ ] Gift wrapping option
- [ ] Delivery date selection
- [ ] Order confirmation email (already implemented in backend)
- [ ] Order tracking page
- [ ] Invoice generation (PDF)
- [ ] Real-time shipping cost calculation based on location
- [ ] Payment gateway integration (Razorpay, Stripe)

### Enhancements for Production
- Real payment gateway integration
- Address validation API
- PIN code serviceability check
- Estimated delivery date calculation
- Order cancellation flow
- Return/refund process
- Order modification (before processing)
- Guest checkout option
- Save card details (tokenization)
- 3D Secure authentication

## Troubleshooting

### Cart is empty on checkout
- Make sure items are added to cart on home page
- Check browser localStorage for `cartItems` key
- Verify cart persistence is working in HomePage

### Order placement fails
- Ensure backend server is running on port 3001
- Check MongoDB connection is active
- Verify user is logged in (token exists)
- Check browser console for error messages

### Styling issues
- Verify `Checkout.css` is in `/src/pages/` folder
- Clear browser cache
- Restart Vite dev server

## Success! 🎉

Your checkout page is now fully functional with:
- ✅ Beautiful 2-step checkout process
- ✅ Order summary with calculations
- ✅ Form validation and formatting
- ✅ Backend integration with MongoDB
- ✅ Success animation and confirmation
- ✅ Responsive design
- ✅ Cart persistence across sessions

**Test it out**: Add some products to your cart and complete a test order!
