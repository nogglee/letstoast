import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Timer() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const type = queryParams.get('type');

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [stage, setStage] = useState('bg-green-500');
  const [isPaused, setIsPaused] = useState(false); // 일시정지 상태 관리

  const typeSettings = {
    type1: [5, 6, 7],
    type2: [3, 4, 5],
    type3: [8, 9, 10],
    custom: [4, 5, 6]
  };
  const [greenTime, yellowTime, redTime] = typeSettings[type] || [5, 6, 7];

  // 타이머와 색상 변경 로직
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

  // 일시정지 기능
  const handlePause = () => {
    setIsPaused((prev) => !prev); // 일시정지 상태 토글
  };

  // 정지 기능 및 로컬 스토리지에 시간 저장
  const handleStop = () => {
    const currentTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    localStorage.setItem('savedTime', currentTime); // 시간 저장
    alert(`Time saved: ${currentTime}`);
  };

  return (
    <div className={`timer-page ${stage} text-white flex flex-col items-center justify-center h-screen`}>
      <h2 className="text-2xl font-bold">Timer for {name}</h2>
      <p className="text-lg mb-4">Type: {type}</p>
      <h1 className="text-6xl font-bold">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
      <p className="text-xl mt-4">Stage: {stage}</p>

      {/* 일시정지 및 정지 버튼 */}
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