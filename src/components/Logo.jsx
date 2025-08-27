import React from 'react';
import logo from '/logo3.png';

const Logo = ({ className = '' }) => {
  return (
    <div className={`logo-container ${className}`}>
      <img 
        src={logo} 
        alt="Carnivore Couture Logo" 
        className="logo-image"
        loading="lazy"
      />
    </div>
  );
};

export default Logo;
