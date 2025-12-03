import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMapPin, FiCreditCard, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items: cartItems, getCartTotal } = useCart();
  const [user, setUser] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'wallet'
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [upiInfo, setUpiInfo] = useState({
    upiId: '',
  });

  const [walletInfo, setWalletInfo] = useState({
    walletType: '', // 'paytm', 'phonepe', 'gpay'
    walletPhone: '',
  });

  useEffect(() => {
    // Check if cart is empty
    if (!cartItems || cartItems.length === 0) {
      // Redirect to home if cart is empty
      navigate('/');
    }

    // Load user info
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setShippingInfo(prev => ({
        ...prev,
        fullName: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
      }));
    }
  }, [navigate, cartItems]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discountedPrice || item.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.05; // 5% tax
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 1000 ? 0 : 50; // Free shipping over ₹1000
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e) => {
    let value = e.target.value;
    
    // Format card number with spaces
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiry date
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substr(0, 5);
    }

    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: value,
    });
  };

  const handleUpiChange = (e) => {
    setUpiInfo({
      ...upiInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleWalletChange = (e) => {
    setWalletInfo({
      ...walletInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateShipping = () => {
    const { fullName, email, phone, address, city, state, zipCode } = shippingInfo;
    return fullName && email && phone && address && city && state && zipCode;
  };

  const validatePayment = () => {
    if (paymentMethod === 'card') {
      const { cardNumber, cardName, expiryDate, cvv } = paymentInfo;
      return cardNumber.replace(/\s/g, '').length === 16 && 
             cardName && 
             expiryDate.length === 5 && 
             cvv.length === 3;
    } else if (paymentMethod === 'upi') {
      return upiInfo.upiId && upiInfo.upiId.includes('@');
    } else if (paymentMethod === 'wallet') {
      return walletInfo.walletType && walletInfo.walletPhone && walletInfo.walletPhone.length === 10;
    }
    return false;
  };

  const handleContinueToPayment = () => {
    if (validateShipping()) {
      setCurrentStep(2);
    } else {
      alert('Please fill in all shipping information');
    }
  };

  const handlePlaceOrder = async () => {
    if (!validatePayment()) {
      alert('Please fill in all payment information correctly');
      return;
    }

    setIsProcessing(true);

    try {
      const token = localStorage.getItem('token');
      
      let paymentDetails = {};
      
      if (paymentMethod === 'card') {
        paymentDetails = {
          method: 'card',
          cardLastFour: paymentInfo.cardNumber.slice(-4),
          cardName: paymentInfo.cardName,
        };
      } else if (paymentMethod === 'upi') {
        paymentDetails = {
          method: 'upi',
          upiId: upiInfo.upiId,
        };
      } else if (paymentMethod === 'wallet') {
        paymentDetails = {
          method: 'wallet',
          walletType: walletInfo.walletType,
          walletPhone: walletInfo.walletPhone,
        };
      }
      
      const orderData = {
        items: cartItems,
        shippingInfo,
        paymentInfo: paymentDetails,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        shipping: calculateShipping(),
        total: calculateTotal(),
      };

      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Clear cart
        localStorage.removeItem('cartItems');
        setOrderSuccess(true);
        
        // Redirect to success page after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        throw new Error('Order failed');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="checkout-success">
        <motion.div
          className="success-content"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          <motion.div
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FiCheck size={60} />
          </motion.div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your order. We'll send you a confirmation email shortly.</p>
          <p className="order-total">Total: ₹{calculateTotal().toLocaleString()}</p>
          <motion.button
            className="back-home-btn"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* Header */}
      <div className="checkout-header">
        <div className="checkout-container">
          <motion.button
            className="back-btn"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft /> Back to Shopping
          </motion.button>
          <h1>CARNIVORE COUTURE</h1>
          <div className="checkout-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <span>Shipping</span>
            </div>
            <div className="step-divider"></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span>Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="checkout-container">
        <div className="checkout-grid">
          {/* Left Column - Forms */}
          <div className="checkout-forms">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <motion.div
                className="checkout-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="section-header">
                  <FiMapPin />
                  <h2>Shipping Information</h2>
                </div>

                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      placeholder="123 Main Street, Apartment 4B"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      placeholder="Mumbai"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      placeholder="Maharashtra"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      placeholder="400001"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  className="continue-btn"
                  onClick={handleContinueToPayment}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue to Payment →
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <motion.div
                className="checkout-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="section-header">
                  <FiCreditCard />
                  <h2>Payment Information</h2>
                </div>

                {/* Payment Method Selection */}
                <div className="payment-method-selector">
                  <button
                    type="button"
                    className={`payment-method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <FiCreditCard />
                    <span>Card</span>
                  </button>
                  <button
                    type="button"
                    className={`payment-method-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <span className="upi-icon">⚡</span>
                    <span>UPI</span>
                  </button>
                  <button
                    type="button"
                    className={`payment-method-btn ${paymentMethod === 'wallet' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('wallet')}
                  >
                    <span className="wallet-icon">💳</span>
                    <span>Wallet</span>
                  </button>
                </div>

                {/* Card Payment */}
                {paymentMethod === 'card' && (
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Cardholder Name *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* UPI Payment */}
                {paymentMethod === 'upi' && (
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>UPI ID *</label>
                      <input
                        type="text"
                        name="upiId"
                        value={upiInfo.upiId}
                        onChange={handleUpiChange}
                        placeholder="yourname@upi"
                        required
                      />
                      <small className="form-hint">Enter your UPI ID (e.g., yourname@paytm, yourname@oksbi)</small>
                    </div>
                    <div className="upi-apps">
                      <span className="upi-app-label">Supported UPI Apps:</span>
                      <div className="upi-app-icons">
                        <span className="upi-app">Google Pay</span>
                        <span className="upi-app">PhonePe</span>
                        <span className="upi-app">Paytm</span>
                        <span className="upi-app">BHIM</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Wallet Payment */}
                {paymentMethod === 'wallet' && (
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Select Wallet *</label>
                      <div className="wallet-options">
                        <label className="wallet-option">
                          <input
                            type="radio"
                            name="walletType"
                            value="gpay"
                            checked={walletInfo.walletType === 'gpay'}
                            onChange={handleWalletChange}
                            required
                          />
                          <div className="wallet-card">
                            <span className="wallet-logo">G</span>
                            <span>Google Pay</span>
                          </div>
                        </label>
                        <label className="wallet-option">
                          <input
                            type="radio"
                            name="walletType"
                            value="phonepe"
                            checked={walletInfo.walletType === 'phonepe'}
                            onChange={handleWalletChange}
                            required
                          />
                          <div className="wallet-card">
                            <span className="wallet-logo phonepe">⚡</span>
                            <span>PhonePe</span>
                          </div>
                        </label>
                        <label className="wallet-option">
                          <input
                            type="radio"
                            name="walletType"
                            value="paytm"
                            checked={walletInfo.walletType === 'paytm'}
                            onChange={handleWalletChange}
                            required
                          />
                          <div className="wallet-card">
                            <span className="wallet-logo paytm">P</span>
                            <span>Paytm</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label>Registered Mobile Number *</label>
                      <input
                        type="tel"
                        name="walletPhone"
                        value={walletInfo.walletPhone}
                        onChange={handleWalletChange}
                        placeholder="9876543210"
                        maxLength="10"
                        required
                      />
                      <small className="form-hint">Enter the mobile number linked to your wallet</small>
                    </div>
                  </div>
                )}

                <div className="checkout-actions">
                  <motion.button
                    className="back-step-btn"
                    onClick={() => setCurrentStep(1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ← Back to Shipping
                  </motion.button>
                  
                  <motion.button
                    className="place-order-btn"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isProcessing ? 'Processing...' : `Place Order • ₹${calculateTotal().toLocaleString()}`}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-summary">
            <div className="summary-sticky">
              <h3>Order Summary</h3>

              <div className="summary-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="summary-item">
                    <img
                      src={`/product-${item.image}.jpg`}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = '/hero-meat (1).jpg';
                      }}
                    />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ₹{((item.discountedPrice || item.price) * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Tax (5%)</span>
                  <span>₹{calculateTax().toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>
                    {calculateShipping() === 0 ? (
                      <span className="free-shipping">FREE</span>
                    ) : (
                      `₹${calculateShipping()}`
                    )}
                  </span>
                </div>
                <div className="total-row total-final">
                  <span>Total</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <div className="secure-checkout">
                <FiCheck />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
