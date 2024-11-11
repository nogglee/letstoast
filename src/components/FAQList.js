import React from 'react';
import { useTranslation } from 'react-i18next';
import FlipCard from './FlipCard';

const FAQList = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      type: t('faq.items.01.type'),
      question: t('faq.items.01.question'),
      answer: t('faq.items.01.answer')
    },
    {
      type: t('faq.items.02.type'),
      question: t('faq.items.02.question'),
      answer: t('faq.items.02.answer')
    },
    {
      type: t('faq.items.03.type'),
      question: t('faq.items.03.question'),
      answer: t('faq.items.03.answer')
    },
    {
      type: t('faq.items.04.type'),
      question: t('faq.items.04.question'),
      answer: t('faq.items.04.answer')
    }
  ];

  return (
    <div className="flip-card-section">
      <h2 className='text-base md:text-xl font-600'>{t('faq.title')}</h2>
      <div className='flip-card-list scroll-hide'>
        {faqs.map((faq, index) => (
          <FlipCard
            key={index}
            type={faq.type}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQList;
