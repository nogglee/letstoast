import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  // 언어 전환 함수
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('welcomeMessage')}</p>

      {/* 언어 전환 버튼 */}
      <button onClick={() => changeLanguage('ko')}>한국어</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
}

export default App;