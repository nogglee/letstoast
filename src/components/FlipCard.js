import React, { useState } from 'react';
import './FlipCard.css';
import { ReactComponent as ArrowRightIcon } from '../assets/ico-arrow-right.svg';

const FlipCard = ({ question, answer, type }) => {
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
        <div className="flip-card-front bg-blue-100 rounded-lg p-4 flex flex-col items-start justify-start gap-4">
          <span className='text-sm font-500 text-blue-500'>{type}</span>
          <h3 className="text-xl md:text-2xl font-600 flex-grow text-black leading-relaxed">{question}</h3>
          <div className='flex felx-row justify-end w-full'>
            <span className='text-gray-600'>더 알아보기</span>
            <ArrowRightIcon className="ml-1"  style={{ color: '#515880' }} />
          </div>
        </div>
        <div className="flip-card-back bg-blue-500 text-white rounded-lg p-4 flex items-start justify-start overflow-y-auto">
          <p className="text-sm md:text-base font-500">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
