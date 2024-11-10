import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReactComponent as InfoIcon } from '../assets/ico-info.svg'
import './TimerList.css'

const TimerList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const timers = [
    { id: 'preset1', title: t('timerList.title.01'), description: t('timerList.description.01'), isCustom: false, bgColor: '#269F7E', imageSrc: '/assets/img-book.png' },
    { id: 'preset2', title: t('timerList.title.02'), description: t('timerList.description.02'), isCustom: false, bgColor: '#DDAA2B', imageSrc: '/assets/img-bulb.png' },
    { id: 'preset3', title: t('timerList.title.03'), description: t('timerList.description.03'), isCustom: false, bgColor: '#373639', imageSrc: '/assets/img-pen.png' },
    { id: 'custom', title: t('timerList.title.04'), description: t('timerList.description.04'), isCustom: true, bgColor: '#DA4536', imageSrc: '/assets/img-clock.png' },
  ];

  const handleTimerSelect = (timer) => {
    navigate(`/info-entry`, { state: timer });
  };

  return (
    <div className='timer-section'>
      <h2 className='text-base font-600'>{t('timerList.title.00')}</h2>
      <div className="timer-list">
        {timers.map((timer) => (
          <div key={timer.id} className="timer-item" onClick={() => handleTimerSelect(timer)} style={{ backgroundColor: timer.bgColor }}>
            <div className='flex flex-col flex-grow gap-1.5 relative'>
              <p className='des'>{timer.description}</p>
              <h3 className='title'>{timer.title}</h3>
              <img
                src={timer.imageSrc}
                alt={timer.title}
                style={{position: 'absolute', left: '115px', width: '140px'}}
              />
            </div>
            <button id='view-rules'><InfoIcon />규칙 보기</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimerList;