// src/components/NewLogo.jsx
import React from 'react';

const NewLogo = (props) => (
  <img
    src="/logo.png"
    alt="Carnivore Couture Logo"
    className={props.className || "logo-image"}
    style={props.style}
  />
);

export default NewLogo;
