import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';

function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [customTimes, setCustomTimes] = useState({ green: 0, yellow: 0, red: 0 }); // 커스텀 시간
  const [isNameDisabled, setIsNameDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && type) {
      const queryParams = new URLSearchParams({
        name,
        type,
        ...customTimes, // 커스텀 시간 포함
      });

      // 이름과 타입을 로컬 스토리지에 저장
      localStorage.setItem('savedName', name);
      localStorage.setItem('savedType', type);
      
      // 타이머 페이지로 이동
      navigate(`/${i18n.language}/timer?${queryParams.toString()}`);
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

  const handleTypeSelect = (selectedType) => {
    setType(selectedType);
    setIsNameDisabled(false);
  };

  return (
    <div className="container min-h-screen flex flex-col items-center bg-blue-500">
      <Header />
      <div className='flex flex-col gap-5 w-full px-4 md:px-16'>
        <div className='flex flex-col text-white w-full py-5 md:gap-1'>
          <div className='font-body font-300 text-2xl md:text-3xl'>{t('home-headline.01')}</div>
          <div className='flex flex-row gap-1 md:gap-2'>
            <div className='font-body font-500 text-2xl md:text-3xl'>{t('home-headline.02')} nnn{t('home-headline.03')}</div>
            <div className='font-body font-300 text-2xl md:text-3xl'>{t('home-headline.04')}</div>
          </div>
          <div className='font-body font-300 text-2xl md:text-3xl'>{t('home-headline.05')}</div>
          <h1 className='font-title font-700 text-3xl md:text-4xl'>Let's Toast!</h1>
        </div>
        <div className='flex flex-col w-full py-5 gap-2.5'>
          <div className='flex flex-row gap-2.5'>
            <div className='flex-1 md:flex-0 md:w-1/2 bg-blue-100 rounded-lg'></div>
            <div className='w-20 h-20 md:flex-0 md:w-1/2 bg-blue-600 rounded-lg'></div>
          </div>
          <div className='w-full h-20 bg-blue-700 rounded-lg'></div>
        </div>
      </div>
      <div className='w-full rounded-t-[26px] bg-white py-10 px-4 md:px-16'>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {['type1', 'type2', 'type3', 'custom'].map((typeOption) => (
              <button
                key={typeOption}
                type="button"
                onClick={() => handleTypeSelect(typeOption)}
                className={`p-4 rounded-lg text-center transition-colors duration-200
                  ${type === typeOption 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {t(`type.${typeOption}`)}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">
              {t('nameLabel')}:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('namePlaceholder')}
                disabled={isNameDisabled}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm
                  ${isNameDisabled 
                    ? 'bg-gray-100 cursor-not-allowed' 
                    : 'focus:border-blue-500 focus:ring-blue-500'
                  }`}
              />
            </label>
          </div>

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

          <div className="flex gap-4 justify-center mt-8">
            <button
              type="submit"
              disabled={!name || !type}
              className={`px-6 py-2 rounded-lg font-medium
                ${(!name || !type)
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
              {t('startButton')}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/${i18n.language}/result`)}
              className="px-6 py-2 rounded-lg font-medium bg-gray-500 text-white hover:bg-gray-600"
            >
              {t('resultButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;