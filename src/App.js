import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home'; // 새로 만든 Home 페이지를 불러오기

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

        {/* 언어 전환 버튼 */}
        <button onClick={() => changeLanguage('ko')}>한국어</button>
        <button onClick={() => changeLanguage('en')}>English</button>

        {/* 라우터 설정 */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 추가 기능 구현 후 다른 경로를 추가할 수 있습니다. */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;