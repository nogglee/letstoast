import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // 상태 관리: 이름과 타입
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && type) {
      // 입력된 이름과 타입을 query parameter로 다음 페이지에 전달
      navigate(`/timer?name=${name}&type=${type}`);
    } else {
      alert('이름과 타입을 선택해주세요');
    }
  };

  return (
    <div>
      <h2>{t('title')}</h2>

      <form onSubmit={handleSubmit}>
        {/* 이름 입력란 */}
        <label>
          {t('nameLabel')}: 
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('namePlaceholder')}
          />
        </label>

        {/* 타입 선택 */}
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

        {/* 제출 버튼 */}
        <button type="submit">{t('startButton')}</button>
      </form>
    </div>
  );
}

export default Home;