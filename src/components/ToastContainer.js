import React from 'react';
import Toast from './Toast';

const ToastContainer = ({ toasts, setToasts }) => {
  
  const removeToast = (index) => {
    setToasts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {toasts.map((message, index) => (
        <Toast 
          key={index} 
          message={message} 
          onClose={() => removeToast(index)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;