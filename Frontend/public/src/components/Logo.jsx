import React from 'react';
import logo from '/logo3.png';

const Logo = ({ className = '', size = 'medium' }) => {
  return (
    <div className={`logo-container ${className} ${size}`}>
      <img 
        src={logo} 
        alt="Carnivore Couture" 
        className="logo-image"
      />
    </div>
  );
};

export default Logo;
