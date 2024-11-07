import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Timer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const type = queryParams.get('type');

  const customGreen = parseInt(queryParams.get('green'), 10);
  const customYellow = parseInt(queryParams.get('yellow'), 10);
  const customRed = parseInt(queryParams.get('red'), 10);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [stage, setStage] = useState('bg-green-500');
  const [isPaused, setIsPaused] = useState(false);

  const typeSettings = {
    type1: [5, 6, 7],
    type2: [3, 4, 5],
    type3: [8, 9, 10],
    custom: [customGreen || 5, customYellow || 6, customRed || 7]
  };

  const [greenTime, yellowTime, redTime] = typeSettings[type] || [5, 6, 7];

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 59) {
          setMinutes((m) => m + 1);
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 1000);

    if (minutes >= greenTime) setStage('bg-yellow-500');
    if (minutes >= yellowTime) setStage('bg-red-500');
    if (minutes >= redTime && seconds > 30) setStage('bg-red-500 animate-blink');

    return () => clearInterval(timer);
  }, [minutes, seconds, greenTime, yellowTime, redTime, isPaused]);

  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleStop = () => {
    const currentTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    const stopTime = Date.now();
    const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
    const isUnderGreen = minutes < greenTime;
    const isOverRed = minutes >= redTime && seconds > 30;

    localStorage.setItem('savedTime', JSON.stringify({ 
      time: currentTime, 
      expiration: expirationTime,
      isUnderGreen,
      isOverRed,
      name,
      stopTime
    }));
    
    navigate(`/${i18n.language}/result`);
  };

  return (
    <div className={`timer-page ${stage} text-white flex flex-col items-center justify-center h-screen`}>
      <h2 className="text-2xl font-bold">Timer for {name}</h2>
      <p className="text-lg mb-4">Type: {type}</p>
      <h1 className="text-6xl font-bold">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
      <p className="text-xl mt-4">Stage: {stage}</p>

      <div className="flex space-x-4 mt-8">
        <button
          onClick={handlePause}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={handleStop}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default Timer;