import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Result() {
  const navigate = useNavigate();
  const [savedData, setSavedData] = useState(null);
  const [previousResults, setPreviousResults] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('savedTime');
    if (data) {
      const parsed = JSON.parse(data);
      if (Date.now() > parsed.expiration) {
        localStorage.removeItem('savedTime');
        navigate('/');
        return;
      }
      setSavedData(parsed);
      
      const previousData = localStorage.getItem('previousResults') || '[]';
      const parsedPreviousData = JSON.parse(previousData);
      
      const isDuplicate = parsedPreviousData.some(
        item => item.stopTime === parsed.stopTime && item.name === parsed.name
      );
      
      if (!isDuplicate) {
        const updatedResults = [parsed, ...parsedPreviousData].slice(0, 10);
        localStorage.setItem('previousResults', JSON.stringify(updatedResults));
        setPreviousResults(updatedResults);
      } else {
        setPreviousResults([parsed, ...parsedPreviousData]);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const typeButtons = [
    { id: 'type1', label: '타입 1' },
    { id: 'type2', label: '타입 2' },
    { id: 'type3', label: '타입 3' },
    { id: 'custom', label: '커스텀' }
  ];

  const handleTypeSelect = (typeId) => {
    console.log('Selected type:', typeId);
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp || isNaN(timestamp)) return '-';
    const date = new Date(Number(timestamp));
    if (isNaN(date.getTime())) return '-';
    
    const year = date.getFullYear().toString().slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  if (!savedData) return null;

  const timeClassName = savedData.isUnderGreen || savedData.isOverRed
    ? 'text-red-500'
    : 'text-black';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold mb-8">결과</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 mb-8">
        <div className="mb-6 text-center">
          <p className="text-xl font-semibold">
            {savedData.name || '이름없음'} 님의 기록
          </p>
          <p className="text-lg text-gray-600">
            {formatDateTime(savedData.stopTime)}
          </p>
        </div>
        <p className="text-xl mb-4">소요 시간:</p>
        <p className={`text-4xl font-bold ${timeClassName} text-center`}>
          {savedData.time}
        </p>
        {savedData.isUnderGreen && (
          <p className="text-red-500 mt-2">최소 시간에 미달했습니다.</p>
        )}
        {savedData.isOverRed && (
          <p className="text-red-500 mt-2">최대 시간을 초과했습니다.</p>
        )}
        <div className="mt-8">
          <p className="text-lg mb-3 font-semibold">타입 선택:</p>
          <div className="grid grid-cols-2 gap-3">
            {typeButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => handleTypeSelect(button.id)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {previousResults.length > 1 && (
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">오늘의 기록</h2>
          <div className="space-y-4">
            {previousResults.slice(1).map((result, index) => (
              <div key={index} className="border-b pb-2">
                <p className="font-semibold">{result.name || '이름없음'}</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>소요 시간: {result.time}</span>
                  <span>{formatDateTime(result.stopTime)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        처음으로 돌아가기
      </button>
    </div>
  );
}

export default Result;