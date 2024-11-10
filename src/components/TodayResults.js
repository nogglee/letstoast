import React from 'react';
import { useTranslation } from 'react-i18next';

const TodayResults = ({ previousResults }) => {
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

  return (
    <div className="bg-white p-8 rounded-lg w-96">
      <h2 className="text-xl font-bold mb-4">오늘의 기록</h2>
      <div className="space-y-4">
        {previousResults.map((result, index) => (
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
  );
};

export default TodayResults;
