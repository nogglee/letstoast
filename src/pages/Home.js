import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [customTimes, setCustomTimes] = useState({ green: 0, yellow: 0, red: 0 }); // 커스텀 시간

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && type) {
      const queryParams = new URLSearchParams({
        name,
        type,
        ...customTimes, // 커스텀 시간 포함
      });
      navigate(`/timer?${queryParams.toString()}`);
    } else {
      alert('이름과 타입을 선택해주세요');
    }
  };

  const handleCustomTimeChange = (color, value) => {
    setCustomTimes((prev) => ({
      ...prev,
      [color]: value,
    }));
  };

  return (
    <div>
      <h2>{t('title')}</h2>

      <form onSubmit={handleSubmit}>
        <label>
          {t('nameLabel')}:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('namePlaceholder')}
          />
        </label>

        <label>
          {t('typeLabel')}:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">{t('selectType')}</option>
            <option value="type1">{t('type1')}</option>
            <option value="type2">{t('type2')}</option>
            <option value="type3">{t('type3')}</option>
            <option value="custom">{t('custom')}</option>
          </select>
        </label>

        {/* 커스텀 시간 입력 */}
        {type === 'custom' && (
          <div>
            <label>
              Green Time:
              <input
                type="number"
                value={customTimes.green}
                onChange={(e) => handleCustomTimeChange('green', e.target.value)}
                placeholder="분 단위로 입력"
              />
            </label>
            <label>
              Yellow Time:
              <input
                type="number"
                value={customTimes.yellow}
                onChange={(e) => handleCustomTimeChange('yellow', e.target.value)}
                placeholder="분 단위로 입력"
              />
            </label>
            <label>
              Red Time:
              <input
                type="number"
                value={customTimes.red}
                onChange={(e) => handleCustomTimeChange('red', e.target.value)}
                placeholder="분 단위로 입력"
              />
            </label>
          </div>
        )}

        <button type="submit">{t('startButton')}</button>
        <button type="button" onClick={() => navigate('/result')}>
          {t('resultButton')}
        </button>
      </form>
    </div>
  );
}

export default Home;