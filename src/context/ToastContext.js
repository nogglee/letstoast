import React, { createContext, useState } from 'react';
import ToastContainer from '../components/ToastContainer';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    setToasts((prev) => {
      if (prev.length === 0 || prev[prev.length - 1] !== message) {
        return [...prev, message];
      }
      return prev;
    });
  
    setTimeout(() => {
      setToasts((prev) => prev.filter((_, index) => index !== 0));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <ToastContainer toasts={toasts} setToasts={setToasts} /> 
      {children}
    </ToastContext.Provider>
  );
};