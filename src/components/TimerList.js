import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReactComponent as InfoIcon } from '../assets/ico-info.svg'
import { useToast } from '../hooks/useToast';
import bookImage from '../assets/img-book.png';
import bulbImage from '../assets/img-bulb.png';
import penImage from '../assets/img-pen.png';
import clockImage from '../assets/img-clock.png';
import './TimerList.css'

const TimerList = () => {
  const { t, i18n } = useTranslation();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const timers = [
    { id: 'type1', title: t('timerList.title.01'), description: t('timerList.description.01'), isCustom: false, bgColor: '#269F7E', imageSrc: bookImage },
    { id: 'type2', title: t('timerList.title.02'), description: t('timerList.description.02'), isCustom: false, bgColor: '#DDAA2B', imageSrc: bulbImage },
    { id: 'type3', title: t('timerList.title.03'), description: t('timerList.description.03'), isCustom: false, bgColor: '#373639', imageSrc: penImage },
    { id: 'custom', title: t('timerList.title.04'), description: t('timerList.description.04'), isCustom: true, bgColor: '#DA4536', imageSrc: clockImage },
  ];

  const handleTimerSelect = (timer) => {
    navigate(`/${i18n.language}/info-entry`, { 
      state: {
        id: timer.id,
        title: timer.title,
        description: timer.description,
        isCustom: timer.isCustom,
        type: timer.id  // Timer.js의 typeSettings와 매칭되는 type
      }
    });
  };

  const handleViewRules = () => {
    addToast(t('toast.clickViewRules'));
  };

  return (
    <div className='timer-section'>
      <h2 className='text-base md:text-xl font-600'>{t('timerList.title.00')}</h2>
      <div className="timer-list scroll-hide">
        {timers.map((timer) => (
          <div key={timer.id} 
               className="timer-item" 
               onClick={() => handleTimerSelect(timer)} 
               style={{ backgroundColor: timer.bgColor }}>
            <div className='flex flex-col flex-grow gap-1.5 relative'>
              <p className='des'>{timer.description}</p>
              <h3 className='title'>{timer.title}</h3>
              <img
                src={timer.imageSrc}
                alt={timer.title}
              />
            </div>
            <button 
              id='view-rules' 
              onClick={(e) => {
                e.stopPropagation();  // 이벤트 전파 중지
                handleViewRules();
              }}
            >
              <InfoIcon className='md:w-5 md:h-5' />
              규칙 보기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimerList;