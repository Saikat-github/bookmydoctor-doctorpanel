import React, { useState, useEffect } from 'react';

const StarryNight = ({ children }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          size: Math.random() < 0.3 ? 'w-1 h-1' : 'w-0.5 h-0.5'
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800">
        {/* Stars */}
        {stars.map((star, index) => (
          <div
            key={index}
            className={`absolute rounded-full bg-white opacity-0 animate-twinkle ${star.size}`}
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.animationDelay
            }}
          />
        ))}
      </div>
      
      {/* Render children */}
      {children}
    </div>
  );
};

// Add custom animation
const style = document.createElement('style');
style.textContent = `
  @keyframes twinkle {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
  .animate-twinkle {
    animation: twinkle 3s infinite;
  }
`;
document.head.appendChild(style);

export default StarryNight;