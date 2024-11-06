import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home'; 
import Timer from './pages/Timer';
import Result from './pages/Result';

function App() {
  const { t, i18n } = useTranslation();

  // 언어 전환 함수
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Router>
      <div>
        <h1>{t('title')}</h1>
        <p>{t('welcomeMessage')}</p>

        <button onClick={() => changeLanguage('ko')}>한국어</button>
        <button onClick={() => changeLanguage('en')}>English</button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;