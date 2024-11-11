import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TodayResults from '../components/TodayResults';
import { formatDateTime } from '../utils/dateUtils';

function Result() {
  const navigate = useNavigate();
  const [savedData, setSavedData] = useState(null);
  const [previousResults, setPreviousResults] = useState([]);
  const { i18n } = useTranslation();

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

      if (parsed.type === 'type1') {
        // 1분 타이머에 대한 추가 로직
        // 예: 타이머 종료 메시지 추가
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 py-8">
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
        {/* 재시작 할 수 있는 버튼 만들기
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
        </div> */}
      </div>
      <h2 className="text-xl font-bold mb-4">이전 기록</h2>
      <div className='flex px-4 w-full'>
        {previousResults.length > 0 && <TodayResults previousResults={previousResults} />}
      </div>
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