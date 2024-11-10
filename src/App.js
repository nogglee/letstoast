import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import Home from './pages/Home'; 
import Timer from './pages/Timer';
import Result from './pages/Result';
import { ToastProvider } from './context/ToastContext';

function App() {
  const { i18n } = useTranslation();
  
  React.useEffect(() => {
    const pathname = window.location.pathname;
    const langCode = pathname.split('/')[1];
    if (langCode && (langCode === 'ko' || langCode === 'en')) {
      i18n.changeLanguage(langCode);
    }
  }, [i18n]);

  return (
    <Router>
      <ToastProvider>
        <div className="flex justify-center min-h-screen">
          <Routes>
            <Route path="/:lang" element={<Home />} />
            <Route path="/:lang/timer" element={<Timer />} />
            <Route path="/:lang/result" element={<Result />} />
          </Routes>
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;