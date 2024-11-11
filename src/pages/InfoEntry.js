import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const InfoEntryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const timer = location.state;
  const { i18n } = useTranslation();
  
  const [name, setName] = useState('');
  const [customTimes, setCustomTimes] = useState({ green: '', yellow: '', red: '' });

  const handleStart = () => {
    const timerSettings = {
      ...timer,
      type: timer.id,
      times: timer.isCustom ? {
        green: parseInt(customTimes.green),
        yellow: parseInt(customTimes.yellow),
        red: parseInt(customTimes.red)
      } : undefined
    };
    
    localStorage.setItem('selectedTimer', JSON.stringify({
      name,
      ...timerSettings
    }));
    
    const queryParams = new URLSearchParams({
      name,
      type: timer.id
    });
    
    navigate(`/${i18n.language}/timer?${queryParams.toString()}`);
  };

  return (
    <div className="info-entry">
      <h2 className="title">연설자 이름을 입력해주세요.</h2>
      <div className='info-entry-inner'>
        <label className="label">이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          className="input-field"
        />
        {timer.isCustom && (
          <div className="custom-timer-settings">
            <label>
              Green Time:
              <input
                type="number"
                value={customTimes.green}
                onChange={(e) => setCustomTimes({ ...customTimes, green: e.target.value })}
                placeholder="초 단위로 입력"
                className="input-field"
              />
            </label>
            <label>
              Yellow Time:
              <input
                type="number"
                value={customTimes.yellow}
                onChange={(e) => setCustomTimes({ ...customTimes, yellow: e.target.value })}
                placeholder="초 단위로 입력"
                className="input-field"
              />
            </label>
            <label>
              Red Time:
              <input
                type="number"
                value={customTimes.red}
                onChange={(e) => setCustomTimes({ ...customTimes, red: e.target.value })}
                placeholder="초 단위로 입력"
                className="input-field"
              />
            </label>
          </div>
        )}
        <button onClick={handleStart} className="confirm-button">확인</button>
        <button onClick={() => navigate('/')} className="home-button">홈으로</button>
      </div>
    </div>
  );
};

export default InfoEntryPage;