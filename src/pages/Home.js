import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import { ReactComponent as BookIcon } from '../assets/ico-book.svg';
import { ReactComponent as MapIcon } from '../assets/ico-map.svg';
import { ReactComponent as StarIcon } from '../assets/ico-star.svg';
import { ReactComponent as ArrowRightIcon } from '../assets/ico-arrow-right.svg';
import { useToast } from '../hooks/useToast';
import TodayResults from '../components/TodayResults';
import Modal from '../components/Modal';
import TimerList from '../components/TimerList';
import FAQList from '../components/FAQList';
import '../components/FlipCard.css';
import { isSameDay } from '../utils/dateUtils';

function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [customTimes, setCustomTimes] = useState({ green: 0, yellow: 0, red: 0 }); // 커스텀 시간
  const [isNameDisabled, setIsNameDisabled] = useState(true);
  const [previousResultsCount, setPreviousResultsCount] = useState(0); // 오늘의 기록 개수 상태 추가
  const [previousResults, setPreviousResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleFindLocationClick = () => {
    addToast(t('toast.clickFindLocation'));
  };

  const handleShowPreviousResults = () => {
    const previousData = localStorage.getItem('previousResults') || '[]';
    const parsedPreviousData = JSON.parse(previousData);
    setPreviousResults(parsedPreviousData);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const previousData = localStorage.getItem('previousResults') || '[]';
    const parsedPreviousData = JSON.parse(previousData);
    // 오늘 날짜의 결과만 필터링
    const todayResults = parsedPreviousData.filter(result => 
      result.stopTime && isSameDay(result.stopTime, new Date())
    );
    setPreviousResultsCount(todayResults.length);
  }, []);

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
            <div className='w-20 h-20 md:flex-0 md:w-1/2 bg-blue-600 rounded-lg flex flex-col gap-1 justify-center items-center p-2 md:flex-row md:justify-start md:py-3 md:px-5 md:gap-5 cursor-pointer' onClick={handleFindLocationClick}>
              <div><MapIcon /></div>
              <div className='font-500 text-body text-center text-xs text-white md:text-lg md:font-400'>{t('home-menu.01')}</div>
            </div>
            <div className='flex-1 md:flex-0 md:w-1/2 bg-blue-100 rounded-lg flex flex-row items-center px-5 py-3 cursor-pointer' onClick={handleShowPreviousResults}>
              <div><BookIcon /></div>
              <div className='w-full pl-5'>
                <div className='font-700 text-body text-sm text-black'>{t('home-menu.02')}</div>
                <div className='font-800 text-body text-2xl text-blue-500'>{previousResultsCount}{t('home-menu.02-1')}</div>
              </div>
              <div><ArrowRightIcon style={{ color: '#7185FA' }}/></div>
            </div>
          </div>
          <div className='w-full h-20 bg-blue-700 rounded-lg flex flex-row items-center px-5 py-3 cursor-pointer'>
            <div><StarIcon /></div>
            <div className='w-full pl-5'>
              <div className='font-700 text-body text-sm text-white'>{t('home-menu.03')}</div>
              <div className='font-200 text-body text-sm text-white'>{t('home-menu.03-1')}</div>
            </div>
            <div><ArrowRightIcon style={{ color: '#ffffff' }}/></div>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full rounded-t-[26px] bg-gray-100 overflow-hidden gap-3 pb-20'>
        <TimerList />
        <FAQList />
        
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        Content={<TodayResults previousResults={previousResults} />}
      />
    </div>
  );
}

export default Home;