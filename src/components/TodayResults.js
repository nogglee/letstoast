import React from 'react';
import { useTranslation } from 'react-i18next';
import { isSameDay, formatDateTime } from '../utils/dateUtils';

const TodayResults = ({ previousResults }) => {
  const { t, i18n } = useTranslation();

  // 오늘 날짜의 결과만 필터링
  const todayResults = previousResults.filter(result => {
    if (!result.stopTime) return false;
    return isSameDay(result.stopTime, new Date());
  });

  const getBadgeColor = (type) => {
    switch (type) {
      case 'type1':
        return 'bg-[#BEE2D8] text-[#269F7E]';
      case 'type2':
        return 'bg-[#F5E5BF] text-[#DDAA2B]';
      case 'type3':
        return 'bg-[#C3C3C4] text-[#373639]';
      default:
        return 'bg-blue-100 text-blue-500';
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg w-full">
      <h2 className="text-xl font-bold mb-4">{t('home-menu.02')}</h2>
      <div className="space-y-4">
        {todayResults.map((result, index) => (
          <div key={index} className="border-b pb-2">
            <div className="flex justify-between items-center">
              <p className="font-semibold">{result.name || '이름없음'}</p>
              {result.type && result.type !== 'custom' && (
                <span className={`inline-block ${getBadgeColor(result.type)} text-xs font-semibold ml-2 px-2.5 py-0.5 rounded`}>
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
        {todayResults.length === 0 && (
          <p className="text-gray-500 text-center">오늘의 기록이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default TodayResults;
