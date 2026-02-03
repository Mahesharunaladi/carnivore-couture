import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiMail } from 'react-icons/fi';
import './Auth.css';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const [resendEmail, setResendEmail] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. Please check your email for the correct link.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/api/auth/verify-email/${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully!');
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('Unable to verify email. Please try again later.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  const handleResendVerification = async (e) => {
    e.preventDefault();
    setIsResending(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resendEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Verification email sent! Please check your inbox.');
        setResendEmail('');
      } else if (data.emailNotConfigured) {
        alert('Email service is not configured. You can login without verification for now.');
      } else {
        alert(data.message || 'Failed to resend verification email.');
      }
    } catch (error) {
      console.error('Resend error:', error);
      alert('Unable to resend verification email. You may be able to login without verification.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <h1 className="brand-name">CARNIVORE COUTURE</h1>
          <p className="brand-tagline">Email Verification</p>
        </div>

        <div className="auth-content" style={{ textAlign: 'center', padding: '2rem' }}>
          {status === 'verifying' && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid rgba(220, 38, 38, 0.3)',
                  borderTop: '4px solid #dc2626',
                  borderRadius: '50%',
                  margin: '2rem auto'
                }}
              />
              <h2 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Verifying your email...</h2>
              <p style={{ color: '#666', marginTop: '0.5rem' }}>Please wait while we verify your email address.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <FiCheckCircle style={{ fontSize: '60px', color: '#10b981', margin: '1rem auto' }} />
              </motion.div>
              <h2 style={{ fontSize: '1.5rem', color: '#10b981', marginTop: '1rem' }}>
                Email Verified Successfully!
              </h2>
              <p style={{ color: '#666', marginTop: '0.5rem' }}>{message}</p>
              <p style={{ color: '#999', marginTop: '1rem', fontSize: '0.9rem' }}>
                Redirecting to login page...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <FiXCircle style={{ fontSize: '60px', color: '#dc2626', margin: '1rem auto' }} />
              </motion.div>
              <h2 style={{ fontSize: '1.5rem', color: '#dc2626', marginTop: '1rem' }}>
                Verification Failed
              </h2>
              <p style={{ color: '#666', marginTop: '0.5rem' }}>{message}</p>

              <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f9f9f9', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <FiMail /> Resend Verification Email
                </h3>
                <form onSubmit={handleResendVerification}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      marginBottom: '1rem'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isResending}
                    className="submit-button"
                    style={{ width: '100%' }}
                  >
                    {isResending ? 'Sending...' : 'Resend Verification Email'}
                  </button>
                </form>
              </div>

              <button
                onClick={() => navigate('/login')}
                style={{
                  marginTop: '1.5rem',
                  padding: '0.75rem 2rem',
                  background: '#1a1a1a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Go to Login
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
