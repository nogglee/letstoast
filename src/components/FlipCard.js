import React, { useState } from 'react';
import './FlipCard.css';

const FlipCard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`flip-card cursor-pointer ${isFlipped ? 'flipped' : ''}`} 
      onClick={handleClick}
    >
      <div className="flip-card-inner w-full h-full">
        <div className="flip-card-front bg-blue-100 rounded-lg p-4 flex items-center justify-center">
          <h3 className="text-lg font-medium text-center">{question}</h3>
        </div>
        <div className="flip-card-back bg-blue-500 text-white rounded-lg p-4 flex items-center justify-center">
          <p className="text-center">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
