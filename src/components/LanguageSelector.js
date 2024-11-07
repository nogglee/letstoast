import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import KoreanFlag from '../assets/ico-flag-ko.svg'; // 한국 국기 SVG 경로
import AmericanFlag from '../assets/ico-flag-us.svg'; // 미국 국기 SVG 경로


function LanguageSelector() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [isKorean, setIsKorean] = useState(i18n.language === 'ko');

  const changeLanguage = (lang) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(ko|en)/, `/${lang}`);
    
    i18n.changeLanguage(lang);
    navigate(newPath);
    setIsKorean(lang === 'ko');
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => changeLanguage('ko')}
        className="flex items-center"
      >
        <img 
          src={KoreanFlag} 
          alt="Korean Flag" 
          className={`flag-icon ${isKorean ? 'active' : ''} w-8 h-8 md:w-10 md:h-10`}
        />
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className="flex items-center"
      >
        <img 
          src={AmericanFlag} 
          alt="American Flag" 
          className={`flag-icon ${!isKorean ? 'active' : ''} w-8 h-8 md:w-10 md:h-10`}
        />
      </button>
    </div>
  );
}

export default LanguageSelector;