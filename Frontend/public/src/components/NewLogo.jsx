import React from 'react';

const Logo = ({ className = '', size = 'medium' }) => {
  return (
    <div className={`logo-container ${className} ${size}`}>
      <div className="logo-text">CC</div>
    </div>
  );
};

export default Logo;
