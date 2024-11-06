import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Result() {
  const navigate = useNavigate();
  const [savedData, setSavedData] = useState(null);

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
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!savedData) return null;

  const timeClassName = savedData.isUnderGreen || savedData.isOverRed
    ? 'text-red-500'
    : 'text-black';

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">결과</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-xl mb-4">소요 시간:</p>
        <p className={`text-4xl font-bold ${timeClassName}`}>
          {savedData.time}
        </p>
        {savedData.isUnderGreen && (
          <p className="text-red-500 mt-2">최소 시간에 미달했습니다.</p>
        )}
        {savedData.isOverRed && (
          <p className="text-red-500 mt-2">최대 시간을 초과했습니다.</p>
        )}
      </div>
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