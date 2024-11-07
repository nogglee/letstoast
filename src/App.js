import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
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
        <Helmet>
          <html lang={i18n.language} />
          <title>{t('title')}</title>
          <meta name="description" content={t('description')} />
          
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://letstoast.vercel.app/" />
          <meta property="og:site_name" content={t('title')} />
          <meta property="og:title" content={t('title')} />
          <meta property="og:description" content={t('description')} />
          <meta property="og:image" content="%PUBLIC_URL%/og-image.png" />
          <meta property="og:locale" content={i18n.language} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://letstoast.vercel.app/" />
          <meta name="twitter:title" content={t('title')} />
          <meta name="twitter:description" content={t('description')} />
          <meta name="twitter:image" content="%PUBLIC_URL%/images/og-image.png" />
        </Helmet>

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