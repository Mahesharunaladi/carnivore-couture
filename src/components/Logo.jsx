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
            />
            <path 
              d="M65 35c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"
              fill="#d11243"
            />
            <path 
              d="M35 35c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"
              fill="#d11243"
            />
            <path 
              d="M50 60c-8.3 0-15 6.7-15 15h30c0-8.3-6.7-15-15-15z"
              fill="#d11243"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Logo;
