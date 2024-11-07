import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Result() {
  const navigate = useNavigate();
  const [savedData, setSavedData] = useState(null);
  const [previousResults, setPreviousResults] = useState([]);
  const { i18n } = useTranslation();

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

  useEffect(() => {
    const data = localStorage.getItem('savedTime');
    if (data) {
      const parsed = JSON.parse(data);
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
      navigate(`/${i18n.language}/`);
    }
  }, [navigate, i18n.language]);

  if (!savedData) return null;

  const timeClassName = savedData.isUnderGreen || savedData.isOverRed
    ? 'text-red-500'
    : 'text-black';

  console.log('Saved Data:', savedData);
  console.log('Previous Results:', previousResults);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold mb-8">결과</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 mb-8">
        <div className="mb-6 text-center">
          <p className="text-xl font-semibold">
            {localStorage.getItem('savedName') || '이름없음'} 님의 기록
          </p>
          <p className="text-lg text-gray-600">
            {formatDateTime(savedData.stopTime)}
          </p>
        </div>
        <p className={`text-4xl font-bold ${timeClassName} text-center`}>
          {savedData.time}
        </p>
        {savedData.isUnderGreen && (
          <p className="text-red-500 text-center mt-2">최소 시간에 미달했습니다.</p>
        )}
        {savedData.isOverRed && (
          <p className="text-red-500 text-center mt-2">최대 시간을 초과했습니다.</p>
        )}
        {/* <div className="mt-8">
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
        </div> */}
      </div>

      {previousResults.length > 1 && (
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">오늘의 기록</h2>
          <div className="space-y-4">
            {previousResults.slice(1).map((result, index) => (
              <div key={index} className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{result.name || '이름없음'}</p>
                  {result.type && result.type !== 'custom' && (
                    <span className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded">
                      {i18n.t(`type.${result.type}`)}
                    </span>
                  )}
                </div>
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
        onClick={() => navigate(`/${i18n.language}`)}
        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        처음으로 돌아가기
      </button>
    </div>
  );
}

export default Result;