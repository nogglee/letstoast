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

  const [countdown, setCountdown] = useState(null);
  const [isSilentMode, setIsSilentMode] = useState(false);
  const [isCountdownStarted, setIsCountdownStarted] = useState(false); // 카운트다운 시작 여부 관리

  const typeSettings = {
    type1: [5, 6, 7, 7.5],
    type2: [1, 1.5, 2, 2.5],
    type3: [2, 2.5, 3, 3.5],
    custom: [customGreen || 5, customYellow || 6, customRed || 7, customRed + 1 || 8]
  };

  const [minTime, midTime, expireTime, maxTime] = typeSettings[type] || [5, 6, 7, 8];

  const totalMinutes = minutes + seconds / 60;

  useEffect(() => {
    if (isPaused || isSilentMode || isCountdownStarted) return; // isCountdownStarted 추가

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

    if (totalMinutes < minTime) {
      setStage('bg-gray-300');
    } else if (totalMinutes >= minTime && totalMinutes < midTime) {
      setStage('bg-green-500');
    } else if (totalMinutes >= midTime && totalMinutes < expireTime) {
      setStage('bg-yellow-500');
    } else if (totalMinutes >= expireTime && totalMinutes < maxTime) {
      setStage('bg-red-500');
    } else {
      setStage('bg-red-500 animate-blink');
    }

    return () => clearInterval(timer);
  }, [minutes, seconds, minTime, midTime, expireTime, maxTime, isPaused, isSilentMode, isCountdownStarted]);

  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleStop = () => {
    const currentTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    const stopTime = Date.now();
    const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
    const isUnderGreen = minutes < minTime;
    const isOverRed = minutes >= maxTime && seconds > 30;

    localStorage.setItem('savedTime', JSON.stringify({ 
      time: currentTime, 
      expiration: expirationTime,
      isUnderGreen,
      isOverRed,
      name,
      stopTime,
      type
    }));

    if (type === 'type1') {
      setIsSilentMode(true);
      setCountdown(null); // 준비 상태로 유지
      setMinutes(0); // 일반 타이머 초기화
      setSeconds(0); // 일반 타이머 초기화
    } else {
      navigate(`/${i18n.language}/result`);
    }
  };

  const handleCountdownStart = () => {
    setCountdown(60); // 침묵의 시간 카운트다운 시작
    setIsCountdownStarted(true); // 카운트다운이 시작되었음을 표시
  };

  useEffect(() => {
    let timer;
    if (countdown !== null && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      navigate(`/${i18n.language}/result`, {
        state: {
          time: '1:00',
          name: localStorage.getItem('savedName') || '이름없음',
          type: 'type1',
        }
      });
    }

    return () => clearInterval(timer);
  }, [countdown, navigate, i18n.language]);

  return (
    <div className={`timer-page ${stage} text-white flex flex-col w-full items-center justify-center h-screen`}>
      <h2 className="text-2xl font-bold">{isSilentMode ? '침묵의 시간' : `Timer for ${name}`}</h2>
      <p className="text-lg mb-4">{isSilentMode ? '' : (i18n.t(`type.${type}`) || i18n.t(`type.default`))}</p>
      <h1 className="text-6xl font-bold">
        {isSilentMode ? countdown : `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
      </h1>

      <div className="flex space-x-4 mt-8">
        {isSilentMode && !isCountdownStarted ? (
          <button
            onClick={handleCountdownStart}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            카운트다운 시작
          </button>
        ) : (
          !isSilentMode && !isCountdownStarted && (
            <>
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
            </>
          )
        )}
      </div>
    </div>
  );
}

export default Timer;