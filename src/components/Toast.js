import React, { useEffect } from 'react';
import './Toast.css';
import { ReactComponent as ToastIcon } from '../assets/ico-toast.svg' 

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3초 후에 자동으로 닫힘

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [onClose]);

  return (
    <div className="toast text-base md:text-xl">
      <div><ToastIcon className='md:w-10 md:h-10'/></div>
      {message}
    </div>
  );
};

export default Toast;