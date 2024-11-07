import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  
  const changeLanguage = (lang) => {
    // 현재 경로에서 언어 코드만 변경
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(ko|en)/, `/${lang}`);
    
    i18n.changeLanguage(lang);
    navigate(newPath);
  };

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <button
        onClick={() => changeLanguage('ko')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'ko' 
            ? 'bg-primary-500 text-white' 
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        한국어
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'en' 
            ? 'bg-primary-500 text-white' 
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        English
      </button>
    </div>
  );
}

export default LanguageSelector;